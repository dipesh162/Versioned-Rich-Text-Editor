// React
import React, { useState, useEffect, useRef } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor, Editor } from '@tiptap/react';

// Components
import MenuBar from './components/MenuBar';
import WordCount from './WordCount';
import BranchConnections from './components/BranchConnections';
import VersionIndicator from './components/VersionIndicator';

// Styles
import './App.css';
import './styles.scss';
import styles from './styles';
import BranchTimeline from './components/BranchTimeline';

// Define types
type Version = {
  version: number;
  content: string;
};

type Branch = {
  branchName: number;
  startPoint: number;
  versions: Version[];
  left: number;
  parentBranch: number;
};

type CurrentVersionIndex = {
  branchName: number;
  currentVersionIndex: number;
};

type Dimensions = {
  width: number;
  height: number;
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];

const branchWidth:number = 748
const branchSpacing = 40
const content: string = '<h2>Hi there</h2>'; // Initial content

function App(): JSX.Element {
  const [branches, setBranches] = useState<Branch[]>([
    { branchName: 1, startPoint: 1, versions: [{ version: 1, content }], left: 0, parentBranch: 0, }
  ]);
  const [currentBranch, setCurrentBranch] = useState<number>(1);
  const [currentVersionIndices, setCurrentVersionIndices] = useState<CurrentVersionIndex[]>([
    { branchName: 1, currentVersionIndex: 1 }
  ]);
  const [lastSavedContent, setLastSavedContent] = useState<string>(content);
  const [wordCount, setWordCount] = useState<number>(2);
  const [svgDimensions, setSvgDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  // Ref for slider container
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const editor = useEditor({
    extensions,
    content,
    slotBefore: <MenuBar />,
    onUpdate: ({ editor }: { editor: Editor }) => {
      const updatedContent = editor.getHTML();
      updateWordCount(updatedContent);
      saveVersion(updatedContent);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.chain().focus().run();
    }
  }, [editor]);

  useEffect(() => { 
    // const branch = branches.find(b => b.branchName === currentBranch);
    // if (branch) {
    //   const version = branch.versions[currentVersionIndices.find((cur=> cur.branchName === branch.branchName)).currentVersionIndex - 1];
    //   if (version) {
    //     editor.commands.setContent(version.content);
    //     updateWordCount(version.content);
    //   }
    //   calculateSvgDimensions();
    // }
    calculateSvgDimensions();

  }, [branches, currentVersionIndices]);

  useEffect(() => {
    if (sliderContainerRef.current) {
      setContainerDimensions({
        width: sliderContainerRef.current.clientWidth,
        height: sliderContainerRef.current.clientHeight,
      });
    }
  }, [sliderContainerRef.current]); // This will run when the container ref is available or changes.

  // Helper function to calculate SVG dimensions
  const calculateSvgDimensions = (): void => {
    let maxWidth = 0;
    let maxHeight = 0;
  
    branches.forEach((branch, index) => {
      // Calculate the left and top positions for each branch
      const left = branch.left || 0;
      const top = index * branchSpacing; // Vertical spacing of 40px per branch
  
      // Update maxWidth based on branch width and horizontal spacing
      maxWidth = Math.max(maxWidth, left + branchWidth + 30); // Add branch width (branchWidthpx) and padding (30px)
  
      // Update maxHeight based on vertical position and padding
      maxHeight = Math.max(maxHeight, top + branchSpacing); // Add vertical padding of 40px
    });
  
    // Set the calculated SVG dimensions
    setSvgDimensions({ width: maxWidth, height: maxHeight });
  };

  const updateWordCount = (content: string): void => {
    const cleanedContent = content
      .replace(/<[^>]+>/g, ' ') // Remove HTML tags
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+$/, ''); // Remove trailing whitespace

    const words = cleanedContent.split(' ').filter(Boolean);
    setWordCount(words.length);
  };

  const saveVersion = (content: string): void => {
    if (content!== lastSavedContent) {
      const branch = branches.find(b => b.branchName === currentBranch);
      if (branch) {
        const newVersion: Version = { version: branch.versions.length + 1, content };
        const updatedBranches = branches.map(b =>
          b.branchName === branch.branchName
            ? { ...b, versions: [...b.versions, newVersion] }
            : b
        );
        setBranches(updatedBranches);
        setCurrentVersionIndices(currentVersionIndices.map(ci =>
          ci.branchName === currentBranch
            ? { ...ci, currentVersionIndex: branch.versions.length + 1 }
            : ci
        ));
        setLastSavedContent(content);
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, branchName: number): void => {
    const newIndex = parseInt(e.target.value, 10);
    const branch = branches.find(b => b.branchName === branchName);
    const selectedContent = branch?.versions[newIndex - 1]?.content;

    if(currentBranch === branchName){

      // Update the current version index for the specific branch
      setCurrentVersionIndices(prevState =>
        prevState.map(ci =>
          ci.branchName === branchName
          ? { ...ci, currentVersionIndex: newIndex }
          : ci
        )
      );
      
      // const branch = branches.find(b => b.branchName === branchName);
      // const selectedContent:any = branch?.versions[newIndex - 1]?.content; // Adjusted to -1 since version index starts from 1
      if (selectedContent) {
        editor.commands.setContent(selectedContent); //
        updateWordCount(selectedContent);
      }
    } else {
      handleUpdateCurrentBranch(branchName, newIndex)
    }
  };

  const handleUpdateCurrentBranch = (branchName: number, newIndex: number): void => {
    setCurrentBranch(branchName)
    setCurrentVersionIndices(prev=> prev.map((cur)=> cur.branchName === branchName ? {...cur, currentVersionIndex: newIndex} : cur))
    editor.chain().focus().run();
  }

  const calculateLeftPos = (parentBranch: Branch): number => {
    const part = branchWidth/(branches.find((br)=> br.branchName === parentBranch.branchName)?.versions?.length || 1)
    let parentActiveIndex = 0
    let leftPos = 0
    const i = branches.length 
    if(i>0){
      parentActiveIndex = currentVersionIndices.find((cur)=> cur.branchName === parentBranch.branchName)?.currentVersionIndex || 1
      leftPos = part * (parentActiveIndex === 1 ? 0 : parentActiveIndex) + 30 + parentBranch.left
    }
    return leftPos
  }

  const createBranch = (versionIndex: number): void => {
    const parentBranch = branches.find(b => b.branchName === currentBranch);
    if (parentBranch) {
      const contentFromSelectedVersion = parentBranch.versions[versionIndex-1].content;
      const startPointFromSelectedVersion = parentBranch.versions[versionIndex-1].version;
      
      const newBranch: Branch = {
        branchName: branches.length + 1,
        startPoint: startPointFromSelectedVersion,
        versions: [{
          version: 1,
          content: contentFromSelectedVersion,
        }],
        parentBranch: parentBranch.branchName, // Add parentBranch reference
        left: calculateLeftPos(parentBranch)
      };

      setBranches([...branches, newBranch]);
      setCurrentVersionIndices([...currentVersionIndices, { branchName: newBranch.branchName, currentVersionIndex: 1 }]);
      setCurrentBranch(newBranch.branchName)

      // Focus the editor for the new branch
      editor.commands.setContent(contentFromSelectedVersion);
      editor.commands.focus();
    };
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLInputElement>, branchName: number): void => {
    const newIndex = parseInt((e.target as HTMLInputElement).value, 10);
    handleUpdateCurrentBranch(branchName, newIndex)
  };


  const handleTimelineNavigation = (direction: 'backward' | 'forward'): void => {
    const currentBranchData = branches.find(b => b.branchName === currentBranch);
    if (currentBranchData) {
      const maxVersionIndex = currentBranchData.versions.length;
      const newVersionIndex = direction === 'backward'
        ? Math.max(0, currentVersionIndices.find((curr)=> curr.branchName === currentBranch)?.currentVersionIndex - 1 || 0)
        : Math.min(maxVersionIndex, (currentVersionIndices.find((curr)=> curr.branchName === currentBranch)?.currentVersionIndex || 0) + 1);
      setCurrentVersionIndices(prevState =>
        prevState.map(ci =>
          ci.branchName === currentBranchData.branchName
            ? { ...ci, currentVersionIndex: newVersionIndex }
            : ci
        )
      );
      const selectedContent = currentBranchData.versions[newVersionIndex-1].content;
      if(selectedContent) updateWordCount(selectedContent);
    }
  };

  const backwardBtnDisabled = currentVersionIndices?.find(cur=> cur.branchName === currentBranch).currentVersionIndex === 1
  const forwardBtnDisabled = currentVersionIndices?.find(cur=> cur.branchName === currentBranch).currentVersionIndex === branches.find(b => b.branchName === currentBranch)?.versions.length
  const createBranchBtnDisabled = branches.find(
    (bran) =>
      bran.branchName === currentBranch &&
      bran.versions.length < 2
  )

  return (
    <>  
        <h2 style={{
              color: '#000000b5',
              fontSize: '28px',
              letterSpacing: '1px'
        }}>Versioned Rich Text Editor</h2>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              {editor && <MenuBar editor={editor} />}
              <EditorContent editor={editor} />
              <h2 style={styles.cardTitle}></h2>
            </div>
            <div style={styles.headerControls}>
              <WordCount wordCount={wordCount} />
              <div style={styles.editModeToggle}>
                <div style={styles.branchControls}>
                  <button 
                      disabled={createBranchBtnDisabled}
                      style={createBranchBtnDisabled ? {...styles.createBranchBtn, ...styles.createBtnDisabled} :{...styles.createBranchBtn}}
                    onClick={() => createBranch(currentVersionIndices.find(cur=> cur.branchName === currentBranch)?.currentVersionIndex)}>Create New Branch from Here</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.cardContent}>

          <div style={styles.timelineControls}>
            <div style={styles.buttonGroup}>
              <button style={backwardBtnDisabled ? { ...styles.button, ...styles.btnDisabled} : styles.button} onClick={() => handleTimelineNavigation('backward')} disabled={backwardBtnDisabled}>
                ← 
              </button>
              <button style={forwardBtnDisabled ? { ...styles.button, ...styles.btnDisabled} : styles.button} onClick={() => handleTimelineNavigation('forward')} disabled={forwardBtnDisabled}>
                →
              </button>
            </div>

            <VersionIndicator
              currentVersionIndices={currentVersionIndices}
              currentBranch={currentBranch}
            />

          </div>
          <div style={{...styles.sliderContainer,height: branches.length * branchSpacing }}>
              <svg width={svgDimensions.width} height={svgDimensions.height} style={styles.connections}>
                <BranchConnections
                  branches={branches}
                  branchWidth={branchWidth}
                  branchSpacing={branchSpacing}
                />
              </svg>
              <div ref={sliderContainerRef}>
                <BranchTimeline
                  branches={branches}
                  currentVersionIndices={currentVersionIndices}
                  containerDimensions={containerDimensions}
                  handleSliderChange={handleSliderChange}
                  handleTimelineClick={handleTimelineClick}
                />
              </div>
            </div>
        </div>
    </>
  );
}





export default App;
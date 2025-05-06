import React from 'react';
import styles from '../styles';

interface Branch {
  branchName: number;
  left: number;
  versions: { version: number; content: string }[];
}

interface BranchTimelineProps {
  branches: Branch[];
  currentVersionIndices: { branchName: number; currentVersionIndex: number }[];
  containerDimensions: { width: number; height: number };
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>, branchName: number) => void;
  handleTimelineClick: (e: React.MouseEvent<HTMLInputElement>, branchName: number) => void;
}

const BranchTimeline: React.FC<BranchTimelineProps> = ({
  branches,
  currentVersionIndices,
  containerDimensions,
  handleSliderChange,
  handleTimelineClick,
}) => {
  return (
    <>
      {branches.map((branch, i) => {
        const currentVersionIndex = currentVersionIndices?.find(ci => ci.branchName === branch.branchName)?.currentVersionIndex || 1;
        return (
          <input
            key={branch.branchName}
            type="range"
            min={1}
            max={branch.versions.length}
            value={currentVersionIndex}
            name={String(branch.branchName)}
            onChange={(e) => handleSliderChange(e, branch.branchName)}
            onClick={(e) => handleTimelineClick(e, branch.branchName)}
            style={{
              ...styles.input,
              top: containerDimensions.height + i * 40, // Adjust vertical position per branch
              left: `${branch.left}px`,
            }}
          />
        );
      })}
    </>
  );
};

export default BranchTimeline;

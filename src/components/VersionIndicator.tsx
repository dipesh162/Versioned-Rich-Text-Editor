import React from 'react';
import styles from '../styles';

interface VersionIndicatorProps {
  currentVersionIndices: { branchName: number; currentVersionIndex: number }[];
  currentBranch: number;
}

const VersionIndicator: React.FC<VersionIndicatorProps> = ({ currentVersionIndices, currentBranch }) => {
  const currentVersion = currentVersionIndices.find(current => current.branchName === currentBranch)?.currentVersionIndex;

  return (
    <div style={styles.versionIndicatorContainer}>
      <div style={styles.versionIndicator}></div>
      v {currentVersion}
    </div>
  );
};

export default VersionIndicator;
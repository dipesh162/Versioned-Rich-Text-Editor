// React
import React from 'react';

interface Branch {
  branchName: number;
  parentBranch?: number;
  startPoint: number;
  left: number;
  versions: { version: number; content: string }[];
}

interface BranchConnectionsProps {
  branches: Branch[];
  branchWidth: number;
  branchSpacing: number;
}

const BranchConnections: React.FC<BranchConnectionsProps> = ({ branches, branchWidth, branchSpacing }) => {
  const renderConnections = () =>
    branches.map(branch => {
      if (!branch.parentBranch) return null;

      const parentBranch = branches.find(b => b.branchName === branch.parentBranch);
      if (!parentBranch) return null;

      const parentY = branches.findIndex(b => b.branchName === parentBranch.branchName) * branchSpacing;
      const childY = branches.findIndex(b => b.branchName === branch.branchName) * branchSpacing;
      const parentVersionWidth = branchWidth / parentBranch.versions.length;
      const startX = parentBranch.left + (parentVersionWidth * (branch.startPoint - 1)) + 10;
      const endX = branch.left + 15;

      return (
        <line
          key={`connection-${branch.branchName}`}
          x1={startX}
          y1={parentY + 13}
          x2={endX}
          y2={childY + 13}
          stroke="#005BB5"
          strokeWidth="4"
        />
      );
    });

  return <>{renderConnections()}</>;
};

export default BranchConnections;

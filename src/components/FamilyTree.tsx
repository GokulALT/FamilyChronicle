'use client';

import { useFamily } from '@/hooks/useFamily';
import type { TreeNode } from '@/lib/types';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface FamilyTreeProps {
  onNodeClick: (node: TreeNode) => void;
}

const TreeNodeComponent = ({ node, onNodeClick }: { node: TreeNode, onNodeClick: (node: TreeNode) => void }) => {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <li className="shrink-0">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNodeClick(node)}
        className="relative flex flex-col items-center gap-1 cursor-pointer p-3 rounded-lg bg-gradient-to-br from-card to-accent/20 shadow-md border hover:shadow-xl transition-shadow duration-300"
      >
        <User className="h-8 w-8 text-secondary" />
        <p className="font-semibold font-headline text-center">{node.name}</p>
        {node.occupation && <p className="text-xs text-muted-foreground">{node.occupation}</p>}
      </motion.div>
      {hasChildren && <ul>{node.children.map(child => <TreeNodeComponent key={child.id} node={child} onNodeClick={onNodeClick} />)}</ul>}
    </li>
  );
};

export default function FamilyTree({ onNodeClick }: FamilyTreeProps) {
  const { familyTree } = useFamily();

  if (familyTree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
        <p className="text-lg mb-2">Your family tree is empty.</p>
        <p>Start by adding a family member using the form.</p>
      </div>
    );
  }

  return (
    <div className="tree-container">
      <div className="tree">
        <ul className="!pt-0">
          {familyTree.map(rootNode => (
            <TreeNodeComponent key={rootNode.id} node={rootNode} onNodeClick={onNodeClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}


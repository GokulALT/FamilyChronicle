'use client';

import { useFamily } from '@/hooks/useFamily';
import type { TreeNode } from '@/lib/types';
import { motion } from 'framer-motion';
import { User, Heart, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MaleIcon, FemaleIcon } from '@/components/GenderIcons';

interface FamilyTreeProps {
  onNodeClick: (node: TreeNode) => void;
}

const TreeNodeComponent = ({ node, onNodeClick }: { node: TreeNode; onNodeClick: (node: TreeNode) => void }) => {
  const hasChildren = node.children && node.children.length > 0;
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <li className="shrink-0">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNodeClick(node)}
        className="relative flex flex-col items-center gap-2 cursor-pointer p-4 rounded-xl bg-card border shadow-lg hover:shadow-primary/20 transition-all duration-300 w-48 text-center"
      >
        <Avatar className="h-16 w-16 mb-2 border-2 border-primary/50">
           <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">
             {node.gender === 'Male' && <MaleIcon className="h-8 w-8"/>}
             {node.gender === 'Female' && <FemaleIcon className="h-8 w-8"/>}
             {node.gender !== 'Male' && node.gender !== 'Female' && <User className="h-8 w-8"/>}
           </AvatarFallback>
        </Avatar>
        <p className="font-bold font-headline text-lg truncate w-full">{node.name}</p>
        {node.occupation && <p className="text-sm text-muted-foreground truncate w-full">{node.occupation}</p>}
      </motion.div>
      {hasChildren && <ul>{node.children.map(child => <TreeNodeComponent key={child.id} node={child} onNodeClick={onNodeClick} />)}</ul>}
    </li>
  );
};

export default function FamilyTree({ onNodeClick }: FamilyTreeProps) {
  const { familyTree } = useFamily();

  if (familyTree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 bg-card rounded-lg">
        <Users className="h-12 w-12 mb-4 text-primary" />
        <h3 className="text-xl font-headline mb-2">Your Family Tree is Empty</h3>
        <p>Start your chronicle by adding a family member using the 'Add Member' tab.</p>
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
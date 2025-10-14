'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { FamilyMember, TreeNode } from '@/lib/types';

interface FamilyContextType {
  members: FamilyMember[];
  addMember: (member: Omit<FamilyMember, 'id'>) => void;
  getMemberById: (id: string) => FamilyMember | undefined;
  familyTree: TreeNode[];
}

export const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const buildTree = (members: FamilyMember[]): TreeNode[] => {
  const memberMap: { [key: string]: TreeNode } = {};
  const roots: TreeNode[] = [];

  members.forEach(member => {
    memberMap[member.id] = { ...member, children: [] };
  });

  members.forEach(member => {
    if (member.parentId && memberMap[member.parentId]) {
      memberMap[member.parentId].children.push(memberMap[member.id]);
    } else {
      roots.push(memberMap[member.id]);
    }
  });

  return roots;
};


export const FamilyProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [familyTree, setFamilyTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem('familyMembers');
      if (savedMembers) {
        const parsedMembers = JSON.parse(savedMembers);
        setMembers(parsedMembers);
      }
    } catch (error) {
      console.error("Failed to load family members from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('familyMembers', JSON.stringify(members));
      setFamilyTree(buildTree(members));
    } catch (error) {
      console.error("Failed to save family members to localStorage", error);
    }
  }, [members]);

  const addMember = useCallback((memberData: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    setMembers(prevMembers => [...prevMembers, newMember]);
  }, []);

  const getMemberById = useCallback((id: string) => {
    return members.find(m => m.id === id);
  }, [members]);

  return (
    <FamilyContext.Provider value={{ members, addMember, getMemberById, familyTree }}>
      {children}
    </FamilyContext.Provider>
  );
};

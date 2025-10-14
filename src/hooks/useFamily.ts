'use client';

import { useContext } from 'react';
import { FamilyContext } from '@/contexts/FamilyContext';

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};

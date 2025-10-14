'use client';

import { useState } from 'react';
import type { TreeNode } from '@/lib/types';
import AddMemberForm from '@/components/AddMemberForm';
import FamilyTree from '@/components/FamilyTree';
import NameCardModal from '@/components/NameCardModal';
import MemberList from '@/components/MemberList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TreeNode | null>(null);

  const handleNodeClick = (node: TreeNode) => {
    setSelectedMember(node);
  };

  const handleModalClose = () => {
    setSelectedMember(null);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-8">
          <AddMemberForm />
          <MemberList />
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[80vh]">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">Family Tree</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                 <FamilyTree onNodeClick={handleNodeClick} />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedMember && (
        <NameCardModal member={selectedMember} isOpen={!!selectedMember} onClose={handleModalClose} />
      )}
    </div>
  );
}

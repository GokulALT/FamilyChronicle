'use client';

import { useState } from 'react';
import type { TreeNode } from '@/lib/types';
import AddMemberForm from '@/components/AddMemberForm';
import FamilyTree from '@/components/FamilyTree';
import NameCardModal from '@/components/NameCardModal';
import MemberList from '@/components/MemberList';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, GitMerge } from 'lucide-react';

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
      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tree">
            <GitMerge className="mr-2 h-4 w-4" />
            Family Tree
          </TabsTrigger>
          <TabsTrigger value="add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </TabsTrigger>
          <TabsTrigger value="list">
            <Users className="mr-2 h-4 w-4" />
            Family Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tree">
          <Card className="h-full min-h-[80vh]">
            <CardContent className="pt-6">
              <ScrollArea className="h-[75vh] w-full rounded-md border p-4">
                <FamilyTree onNodeClick={handleNodeClick} />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add">
           <Card className="h-full min-h-[80vh]">
             <CardContent className="pt-6">
                <AddMemberForm />
             </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="list">
           <Card className="h-full min-h-[80vh]">
             <CardContent className="pt-6">
               <MemberList />
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>

      {selectedMember && (
        <NameCardModal member={selectedMember} isOpen={!!selectedMember} onClose={handleModalClose} />
      )}
    </div>
  );
}

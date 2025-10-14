'use client';

import Link from 'next/link';
import { useFamily } from '@/hooks/useFamily';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from './ui/separator';

export default function MemberList() {
  const { members } = useFamily();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Family Members ({members.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {members.length > 0 ? (
            <ul className="space-y-2">
              {members.map((member, index) => (
                <li key={member.id}>
                  <Link href={`/members/${member.id}`}>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-accent transition-colors">
                      <span className="font-medium">{member.name}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                  {index < members.length - 1 && <Separator />}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center p-4">No members added yet.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

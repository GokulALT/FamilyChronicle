'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { TreeNode } from '@/lib/types';
import Link from 'next/link';
import { User, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';

interface NameCardModalProps {
  member: TreeNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function NameCardModal({ member, isOpen, onClose }: NameCardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            {member.name}
          </DialogTitle>
          <DialogDescription>
            Quick overview of {member.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {member.dob && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Born on {new Date(member.dob).toLocaleDateString()}</span>
            </div>
          )}
          {member.occupation && (
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>{member.occupation}</span>
            </div>
          )}
          {member.children.length > 0 && (
             <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">Children:</span>
              <div className="flex flex-wrap gap-2">
                {member.children.map(child => (
                  <Badge key={child.id} variant="secondary">{child.name}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button asChild variant="default">
            <Link href={`/members/${member.id}`} onClick={onClose}>
              View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

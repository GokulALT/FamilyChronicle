'use client';

import { useParams } from 'next/navigation';
import { useFamily } from '@/hooks/useFamily';
import { useEffect, useState } from 'react';
import type { FamilyMember } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Briefcase, Mail, Phone, MapPin, FileText, Users, Link as LinkIcon, Home, Heart } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | React.ReactNode }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};


export default function MemberProfilePage() {
  const params = useParams();
  const { getMemberById, members } = useFamily();
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [parent, setParent] = useState<FamilyMember | null>(null);
  const [children, setChildren] = useState<FamilyMember[]>([]);

  const avatarPlaceholder = PlaceHolderImages.find(p => p.id === 'avatar-placeholder');

  useEffect(() => {
    if (params.id) {
      const currentMember = getMemberById(params.id as string);
      if (currentMember) {
        setMember(currentMember);
        
        if (currentMember.parentId) {
          const parentMember = getMemberById(currentMember.parentId);
          setParent(parentMember || null);
        } else {
          setParent(null);
        }

        const childMembers = members.filter(m => m.parentId === currentMember.id);
        setChildren(childMembers);

      }
    }
  }, [params.id, getMemberById, members]);

  if (!member) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-headline">Member not found</h2>
        <p className="text-muted-foreground">The requested family member could not be located.</p>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/"><Home className="mr-2 h-4 w-4"/> Return to Tree</Link>
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="bg-accent/50 p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-card">
              {avatarPlaceholder && <AvatarImage src={avatarPlaceholder.imageUrl} data-ai-hint={avatarPlaceholder.imageHint} />}
              <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-4xl">{member.name}</CardTitle>
              {member.occupation && <CardDescription className="text-lg">{member.occupation}</CardDescription>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          
          <div className="space-y-2">
            <h3 className="font-headline text-xl border-b pb-2 mb-2 flex items-center gap-2"><User /> Personal Details</h3>
            <InfoRow icon={<Calendar size={20} />} label="Date of Birth" value={member.dob ? new Date(member.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined} />
            <InfoRow icon={member.gender === 'Male' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="16" x2="12" y2="22"></line><line x1="10" y1="20" x2="14" y2="20"></line></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="16" x2="12" y2="22"></line><line x1="10" y1="20" x2="14" y2="20"></line><line x1="12" y1="2" x2="12" y2="8"></line><line x1="10" y1="4" x2="14" y2="4"></line></svg>} label="Gender" value={member.gender} />
            <InfoRow icon={<Briefcase size={20} />} label="Occupation" value={member.occupation} />
          </div>

          <div className="space-y-2">
            <h3 className="font-headline text-xl border-b pb-2 mb-2 flex items-center gap-2"><LinkIcon /> Family Connections</h3>
            {parent && <InfoRow icon={<Users size={20} />} label="Parent" value={<Link href={`/members/${parent.id}`} className="text-primary hover:underline">{parent.name}</Link>} />}
            {member.relationType && parent && <InfoRow icon={<Heart size={20} />} label="Relation to Parent" value={member.relationType} />}
            {children.length > 0 && 
              <InfoRow 
                icon={<Users size={20} />} 
                label="Children" 
                value={
                  <div className="flex flex-wrap gap-2">
                    {children.map(child => <Link key={child.id} href={`/members/${child.id}`}><Badge variant="secondary" className="hover:bg-accent">{child.name}</Badge></Link>)}
                  </div>
                } 
              />
            }
          </div>

          <div className="space-y-2 md:col-span-2">
             <h3 className="font-headline text-xl border-b pb-2 mb-2 flex items-center gap-2"><Mail /> Contact & Notes</h3>
            <InfoRow icon={<Mail size={20} />} label="Email" value={member.email ? <a href={`mailto:${member.email}`} className="text-primary hover:underline">{member.email}</a> : undefined} />
            <InfoRow icon={<Phone size={20} />} label="Phone" value={member.phone} />
            <InfoRow icon={<MapPin size={20} />} label="Address" value={member.address} />
             {member.notes && <InfoRow icon={<FileText size={20} />} label="Notes" value={<p className="whitespace-pre-wrap">{member.notes}</p>} />}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

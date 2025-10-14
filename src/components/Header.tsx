'use client';

import Link from 'next/link';
import { Users, Download } from 'lucide-react';
import { useFamily } from '@/hooks/useFamily';
import { Button } from '@/components/ui/button';

export function Header() {
  const { members } = useFamily();

  const handleExport = () => {
    if (members.length === 0) {
      alert('No family data to export.');
      return;
    }

    const jsonData = JSON.stringify(members, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family-chronicle-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-foreground">
              Family Chronicle
            </h1>
          </Link>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { Users } from 'lucide-react';

export function Header() {
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
        </div>
      </div>
    </header>
  );
}

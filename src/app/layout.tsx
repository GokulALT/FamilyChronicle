import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FamilyProvider } from '@/contexts/FamilyContext';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Family Chronicle',
  description: 'Create and visualize your family history with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <FamilyProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </FamilyProvider>
      </body>
    </html>
  );
}

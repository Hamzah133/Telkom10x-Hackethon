import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'LearnForward',
  description: 'Advance your skills with LearnForward.',
  manifest: '/manifest.json',
  applicationName: 'LearnForward',
  appleWebApp: {
    capable: true,
    title: 'LearnForward',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#E8EAF6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ServiceWorkerRegistrar />
        <div className="relative flex flex-col min-h-dvh">
          <main className="flex-1 pb-24 px-4">{children}</main>
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

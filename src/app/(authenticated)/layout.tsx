"use client";
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(!authContext?.loading && !authContext?.user) {
      router.replace('/auth');
    }
  }, [authContext, router]);

  if (authContext?.loading || !authContext?.user) {
    return (
       <div className="flex h-screen items-center justify-center">
         <div className="text-center">
           <p>Loading...</p>
         </div>
       </div>
    )
  }

  return (
    <>
      <ServiceWorkerRegistrar />
      <div className="relative flex flex-col min-h-dvh">
        <main className="flex-1 pb-24 px-4">{children}</main>
        <BottomNav />
      </div>
    </>
  )
}

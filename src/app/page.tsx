"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

export default function HomePage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext?.loading) {
      return;
    }
    if (authContext?.user) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth');
    }
  }, [authContext, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p>Loading...</p>
      </div>
    </div>
  );
}

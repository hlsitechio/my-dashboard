"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure the token is properly stored
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-6">
        <p className="text-lg">Connecting to Spotify...</p>
      </Card>
    </div>
  );
}
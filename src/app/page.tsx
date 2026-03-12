"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeExperience } from '@/lib/encoding';
import { ExperienceData } from '@/lib/types';
import { Editor } from '@/components/Editor';
import { Viewer } from '@/components/Viewer';

function AppRouter() {
  const searchParams = useSearchParams();
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encodedData = searchParams.get('data');
    if (encodedData) {
      const decoded = decodeExperience(encodedData);
      if (decoded) {
        setExperienceData(decoded);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-pink-500 font-headline uppercase tracking-[0.5em]">
          Cargando Magia...
        </div>
      </div>
    );
  }

  if (experienceData) {
    return <Viewer data={experienceData} />;
  }

  return <Editor />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <AppRouter />
    </Suspense>
  );
}

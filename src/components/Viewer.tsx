"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { Typewriter } from './Typewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart } from 'lucide-react';

interface ViewerProps {
  data: ExperienceData;
  isPreview?: boolean;
}

export function Viewer({ data, isPreview = false }: ViewerProps) {
  const [stage, setStage] = useState<'intro' | 'message' | 'secret'>('intro');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="relative overflow-hidden flex items-center justify-center p-6 text-center">
      <ParticleCanvas type={data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 max-w-2xl w-full">
        {stage === 'intro' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
            <div className="flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setStage('message')}>
                <div className="absolute inset-0 bg-romantic-primary blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" />
                <Heart className="h-24 w-24 text-romantic-primary fill-current relative drop-shadow-2xl animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline tracking-tighter opacity-90">
              {data.title || "Una sorpresa para ti"}
            </h1>
            <p className="text-xl md:text-2xl text-romantic-primary font-medium tracking-wide">
              {data.name}
            </p>
            <button
              onClick={() => setStage('message')}
              className="mt-12 px-8 py-3 rounded-full border border-romantic-primary/30 hover:bg-romantic-primary/10 transition-all text-sm uppercase tracking-[0.3em] backdrop-blur-sm"
            >
              Abrir Carta
            </button>
          </div>
        )}

        {stage === 'message' && (
          <div className="space-y-12 py-12">
            <div className="prose prose-invert mx-auto">
              <div className="text-2xl md:text-4xl leading-relaxed font-light opacity-90 drop-shadow-sm min-h-[200px]">
                <Typewriter
                  text={data.message}
                  delay={40}
                  onComplete={() => {}}
                />
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
              <button
                onClick={() => setStage('secret')}
                className="group inline-flex flex-col items-center gap-4 text-romantic-primary/60 hover:text-romantic-primary transition-colors"
              >
                <div className="h-px w-12 bg-romantic-primary/20 group-hover:w-24 transition-all" />
                <span className="text-xs uppercase tracking-widest">Sigue bajando...</span>
              </button>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="text-4xl md:text-5xl italic opacity-80 py-12">
                "{data.secretMessage}"
             </div>
             <div className="flex justify-center gap-6">
               <Heart className="h-6 w-6 text-romantic-primary fill-current opacity-40 animate-bounce" />
               <Heart className="h-8 w-8 text-romantic-primary fill-current opacity-60 animate-bounce delay-100" />
               <Heart className="h-6 w-6 text-romantic-primary fill-current opacity-40 animate-bounce delay-200" />
             </div>
             <button
               onClick={() => setStage('intro')}
               className="text-xs uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
             >
               Volver al inicio
             </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-6 z-30 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-20 transform -rotate-90 origin-left">
          EternalPage • Made with Love
        </p>
      </div>
    </ThemeWrapper>
  );
}

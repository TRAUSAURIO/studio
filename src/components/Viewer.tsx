"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewerProps {
  data: ExperienceData;
  isPreview?: boolean;
}

export function Viewer({ data, isPreview = false }: ViewerProps) {
  const [stage, setStage] = useState<'intro' | 'opening' | 'message' | 'secret'>('intro');
  const [mounted, setMounted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenLetter = () => {
    setStage('opening');
    setTimeout(() => setStage('message'), 1500);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 3000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle}>
      <div className="lens-flare" />
      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full flex flex-col items-center">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-12 text-center animate-in fade-in zoom-in duration-1000">
            <h1 className="text-5xl md:text-7xl font-headline tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {data.title}
            </h1>
            
            <div 
              className={cn("envelope-3d", stage === 'opening' && "envelope-open")}
              onClick={handleOpenLetter}
            >
              <div className="envelope-base">
                <div className="wax-seal" />
              </div>
              <div className="envelope-flap" />
              <div className="letter-inner flex flex-col items-center justify-center">
                <p className="text-pink-600 font-cursive text-xl">Para {data.name}</p>
                <Heart className="text-pink-200 fill-current h-12 w-12 animate-pulse mt-4" />
              </div>
            </div>

            <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] animate-pulse">
              Toca para abrir la magia
            </p>
          </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-4xl px-4 py-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className={cn(
              "relative p-8 md:p-16 rounded-lg backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-1000 overflow-hidden",
              data.theme === 'parchment' ? "bg-parchment text-slate-900" : "bg-white/5 text-white"
            )}>
              {/* Glass Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 text-2xl md:text-4xl leading-relaxed min-h-[300px]">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-16 flex flex-col items-center gap-6">
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white/40"
                >
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <span className="relative text-[10px] uppercase tracking-[0.6em] text-white/60 group-hover:text-white transition-colors">
                    Revelar El Secreto
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-12 py-20 animate-in fade-in zoom-in duration-1000">
             <div className="relative inline-block">
               <div className="absolute inset-0 blur-3xl bg-romantic-accent/20 animate-pulse-slow" />
               <h2 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-[0_0_30px_rgba(244,114,182,0.5)] relative">
                 "{data.secretMessage}"
               </h2>
             </div>
             
             <div className="flex justify-center gap-12">
               <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow" />
               <Heart className="h-16 w-16 text-pink-500 fill-current animate-bounce" />
               <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow delay-300" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-20 text-[10px] uppercase tracking-[0.8em] text-white/20 hover:text-white/60 transition-all"
             >
               Volver al inicio
             </button>
          </div>
        )}
      </div>

      {/* Floating UI: Visualizer */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
        <div className="visualizer-container">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <p className="text-[8px] uppercase tracking-[0.5em] text-white font-light">
          Eternal Emotion Engine v2.6
        </p>
      </div>
    </ThemeWrapper>
  );
}

"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewerProps {
  data: ExperienceData;
  isPreview?: boolean;
}

export function Viewer({ data, isPreview = false }: ViewerProps) {
  const [stage, setStage] = useState<'intro' | 'opening' | 'message' | 'secret'>('intro');
  const [mounted, setMounted] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenLetter = () => {
    if (stage !== 'intro') return;
    setStage('opening');
    // La apertura 3D tarda aproximadamente 1.2s
    setTimeout(() => {
      setStage('message');
    }, 1500);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    // Explosión controlada
    setTimeout(() => setShowExplosion(false), 5000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      {/* Cinematic Lens Flares */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '15%', animationDelay: '0s' }} />
        <div className="flare" style={{ top: '65%', animationDelay: '5s', opacity: 0.4 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-4">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-12 text-center animate-in fade-in zoom-in duration-1000">
            <h1 className="text-5xl md:text-7xl font-headline tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
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
                <p className="text-pink-600 font-cursive text-xl">Dedicado a</p>
                <p className="text-slate-900 font-serif text-3xl font-bold mt-2 uppercase tracking-widest leading-none">{data.name}</p>
                <Heart className="text-rose-500 fill-current h-10 w-10 animate-pulse mt-8 opacity-40" />
              </div>
            </div>

            <p className="text-white/20 uppercase tracking-[0.8em] text-[9px] animate-pulse">
              Toca el sello para liberar el sentimiento
            </p>
          </div>
        )}

        {stage === 'opening' && (
           <div className="text-white text-center animate-pulse">
             <p className="text-[10px] uppercase tracking-[1em] font-light">Desenrollando tu historia...</p>
           </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <div className={cn(
              "relative p-8 md:p-16 rounded-2xl backdrop-blur-3xl border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden",
              data.theme === 'parchment' ? "bg-parchment text-slate-900" : "bg-black/30 text-white"
            )}>
              {/* Internal Cinematic reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30 pointer-events-none" />
              
              <div className="relative z-10 text-2xl md:text-4xl leading-relaxed min-h-[300px]">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-16 flex flex-col items-center">
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 transition-all hover:border-white/40 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[10px] uppercase tracking-[0.6em] text-white/50 group-hover:text-white transition-colors">
                    Revelar El Secreto
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-12 py-12 animate-in fade-in zoom-in duration-1000">
             <div className="relative inline-block scale-110">
               <div className="absolute inset-0 blur-[80px] bg-romantic-accent/30 animate-pulse rounded-full" />
               <h2 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-[0_0_60px_rgba(244,114,182,0.6)] relative leading-tight">
                 "{data.secretMessage}"
               </h2>
             </div>
             
             <div className="flex justify-center gap-12 pt-8">
               <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow opacity-60" />
               <div className="relative">
                 <Heart className="h-16 w-16 text-rose-500 fill-current animate-bounce" />
                 <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-30 animate-pulse" />
               </div>
               <Sparkles className="h-8 w-8 text-yellow-400 animate-spin-slow delay-300 opacity-60" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-20 text-[9px] uppercase tracking-[1em] text-white/10 hover:text-white/60 transition-all"
             >
               Cerrar carta eternamente
             </button>
          </div>
        )}
      </div>

      {/* Floating Status UI */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4 opacity-20 hover:opacity-100 transition-all duration-500">
        <div className="visualizer-container">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className="h-px w-8 bg-white/20" />
        <p className="text-[8px] uppercase tracking-[0.4em] text-white font-light">
          Emotion Engine v2026.01
        </p>
      </div>
    </ThemeWrapper>
  );
}

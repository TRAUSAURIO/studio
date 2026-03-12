"use client"

import React, { useState, useEffect, useRef } from 'react';
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
    setStage('opening');
    // Animación de apertura: sello se derrite, flap gira, carta sale
    setTimeout(() => {
      setStage('message');
    }, 1800);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 4000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle}>
      {/* Cinematic Lens Flares */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '20%', animationDelay: '0s' }} />
        <div className="flare" style={{ top: '70%', animationDelay: '4s', opacity: 0.5 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full flex flex-col items-center">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-16 text-center animate-in fade-in zoom-in duration-1000">
            <h1 className="text-5xl md:text-8xl font-headline tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
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
              <div className="letter-inner flex flex-col items-center justify-center border border-slate-100">
                <p className="text-pink-600 font-cursive text-2xl">Exclusivamente para</p>
                <p className="text-slate-800 font-serif text-3xl font-bold mt-2 uppercase tracking-widest">{data.name}</p>
                <Heart className="text-rose-500 fill-current h-12 w-12 animate-pulse mt-8 opacity-40" />
              </div>
            </div>

            <p className="text-white/30 uppercase tracking-[0.8em] text-[10px] animate-pulse">
              Toca el sello para liberar el sentimiento
            </p>
          </div>
        )}

        {stage === 'opening' && (
           <div className="text-white text-center animate-pulse">
             <p className="text-xs uppercase tracking-[1em] font-light">Abriendo tu corazón...</p>
           </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-5xl px-6 py-12 animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <div className={cn(
              "relative p-10 md:p-20 rounded-2xl backdrop-blur-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-1000 overflow-hidden",
              data.theme === 'parchment' ? "bg-parchment text-slate-900 border-amber-900/10" : "bg-black/30 text-white"
            )}>
              {/* Internal Cinematic Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
              
              <div className="relative z-10 text-3xl md:text-5xl leading-tight min-h-[400px]">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-24 flex flex-col items-center gap-8">
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-12 py-4 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white/50 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-xs uppercase tracking-[0.8em] text-white/60 group-hover:text-white transition-colors">
                    Revelar El Secreto
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-16 py-24 animate-in fade-in zoom-in duration-1000">
             <div className="relative inline-block scale-110">
               <div className="absolute inset-0 blur-[100px] bg-romantic-accent/40 animate-pulse-slow rounded-full" />
               <h2 className="text-7xl md:text-[10rem] font-cursive text-white drop-shadow-[0_0_50px_rgba(244,114,182,0.8)] relative leading-none">
                 "{data.secretMessage}"
               </h2>
             </div>
             
             <div className="flex justify-center gap-20">
               <Sparkles className="h-10 w-10 text-yellow-400 animate-spin-slow" />
               <div className="relative">
                 <Heart className="h-20 w-20 text-rose-500 fill-current animate-bounce" />
                 <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-40 animate-pulse" />
               </div>
               <Sparkles className="h-10 w-10 text-yellow-400 animate-spin-slow delay-300" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-32 text-[10px] uppercase tracking-[1em] text-white/20 hover:text-white/70 transition-all"
             >
               Cerrar carta eternamente
             </button>
          </div>
        )}
      </div>

      {/* Floating Status UI */}
      <div className="fixed bottom-10 left-10 z-50 flex items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-500">
        <div className="visualizer-container">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className="h-px w-12 bg-white/20" />
        <p className="text-[9px] uppercase tracking-[0.6em] text-white font-light">
          Emotion Engine v2026.04
        </p>
      </div>
    </ThemeWrapper>
  );
}

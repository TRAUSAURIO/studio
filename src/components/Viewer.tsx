"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Sparkles, Volume2, ChevronRight } from 'lucide-react';
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
    }, 1800);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    // Explosión controlada de partículas
    setTimeout(() => setShowExplosion(false), 5000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      {/* Cinematic Lighting */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '10%', animationDelay: '0s' }} />
        <div className="flare" style={{ top: '60%', animationDelay: '6s', opacity: 0.3 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-16 text-center animate-in fade-in zoom-in duration-1000">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-headline tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                {data.title}
              </h1>
              <p className="text-white/40 uppercase tracking-[1em] text-[10px] animate-pulse">
                Un mensaje eterno te espera
              </p>
            </div>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base">
                  <div className="wax-seal" />
                </div>
                <div className="envelope-flap" />
                <div className="letter-content rounded shadow-inner flex flex-col items-center justify-center">
                   <p className="text-pink-600 font-cursive text-xl">Dedicado a</p>
                   <p className="text-slate-900 font-serif text-3xl font-bold mt-2 uppercase tracking-widest leading-none">{data.name}</p>
                   <div className="w-12 h-px bg-slate-200 my-6" />
                   <Heart className="text-rose-500 fill-current h-8 w-8 animate-pulse opacity-40" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenLetter}
              className="group flex flex-col items-center gap-4 transition-all hover:scale-110"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-pink-500 transition-colors">
                <ChevronRight className="text-white group-hover:text-pink-500" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.6em] text-white/30 group-hover:text-white">Tocar para abrir</span>
            </button>
          </div>
        )}

        {stage === 'opening' && (
           <div className="text-white text-center animate-pulse">
             <div className="relative">
               <div className="absolute inset-0 blur-3xl bg-pink-500/20 rounded-full" />
               <p className="text-[12px] uppercase tracking-[1.5em] font-light relative">Revelando la esencia...</p>
             </div>
           </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-32 duration-1500 px-4">
            <div className={cn(
              "relative p-8 md:p-20 rounded-[2rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/40 backdrop-blur-2xl text-white"
            )}>
              {/* Internal Cinematic glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/40 pointer-events-none" />
              
              <div className="relative z-10 text-3xl md:text-5xl leading-[1.6] md:leading-[1.4] min-h-[400px]">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-20 flex flex-col items-center border-t border-white/5 pt-12">
                <p className="text-[9px] uppercase tracking-[0.8em] mb-8 opacity-30">Hay algo más que debo decirte</p>
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 transition-all hover:border-pink-500/50 active:scale-95 bg-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[10px] uppercase tracking-[0.8em] text-white/50 group-hover:text-white transition-colors flex items-center gap-4">
                    <Sparkles className="h-4 w-4 text-pink-400" /> REVELAR SECRETO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-16 py-12 animate-in fade-in zoom-in duration-1000 px-4">
             <div className="relative inline-block">
               <div className="absolute inset-0 blur-[120px] bg-romantic-accent/40 animate-pulse rounded-full" />
               <div className="relative flex flex-col items-center">
                 <p className="text-pink-400 uppercase tracking-[1em] text-[10px] mb-8">Lo que mi alma guarda</p>
                 <h2 className="text-7xl md:text-[12rem] font-cursive text-white drop-shadow-[0_0_80px_rgba(244,114,182,0.8)] leading-none italic">
                   "{data.secretMessage}"
                 </h2>
               </div>
             </div>
             
             <div className="flex justify-center items-center gap-16 pt-12">
               <div className="w-24 h-px bg-white/10" />
               <div className="relative">
                 <Heart className="h-24 w-24 text-rose-500 fill-current animate-bounce" />
                 <div className="absolute inset-0 bg-rose-500 rounded-full blur-3xl opacity-40 animate-pulse" />
               </div>
               <div className="w-24 h-px bg-white/10" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-32 px-10 py-3 rounded-full border border-white/5 text-[9px] uppercase tracking-[1em] text-white/20 hover:text-white/60 hover:bg-white/5 transition-all"
             >
               Cerrar carta eternamente
             </button>
          </div>
        )}
      </div>

      {/* Floating Status UI */}
      <div className="fixed bottom-10 left-10 z-50 flex items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-700">
        <div className="flex gap-1 items-end h-4">
          <div className="w-[2px] bg-white animate-[pulse_1s_infinite]" style={{ height: '40%' }} />
          <div className="w-[2px] bg-white animate-[pulse_1.2s_infinite]" style={{ height: '80%' }} />
          <div className="w-[2px] bg-white animate-[pulse_0.8s_infinite]" style={{ height: '60%' }} />
          <div className="w-[2px] bg-white animate-[pulse_1.5s_infinite]" style={{ height: '100%' }} />
        </div>
        <p className="text-[9px] uppercase tracking-[0.5em] text-white font-light border-l border-white/20 pl-6">
          Emotion Engine v2026.01
        </p>
      </div>
    </ThemeWrapper>
  );
}


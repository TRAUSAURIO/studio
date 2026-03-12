"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
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
    if (isPreview) {
      setStage('intro');
    }
  }, [data, isPreview]);

  const handleOpenLetter = () => {
    if (stage !== 'intro') return;
    setStage('opening');
    setTimeout(() => {
      setStage('message');
    }, 2000);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 6000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      {/* Cinematic Lighting Engine */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '5%', left: '-10%', animationDelay: '0s', opacity: 0.2 }} />
        <div className="flare" style={{ top: '70%', right: '-15%', animationDelay: '8s', opacity: 0.15 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* --- INTRO STAGE: THE ENVELOPE --- */}
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-16 text-center animate-in fade-in zoom-in duration-1000 w-full max-w-4xl">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-headline tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-float">
                {data.title}
              </h1>
              <div className="flex items-center justify-center gap-4 opacity-40">
                <div className="h-px w-12 bg-white" />
                <p className="text-white uppercase tracking-[1.2em] text-[9px] font-black">
                  Una Entrega de LoveLink
                </p>
                <div className="h-px w-12 bg-white" />
              </div>
            </div>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base">
                  <div className="wax-seal" />
                </div>
                <div className="envelope-flap" />
                <div className="letter-content rounded-sm shadow-2xl flex flex-col items-center justify-center text-center">
                   <p className="text-pink-600 font-cursive text-2xl">Dedicado con amor a</p>
                   <p className="text-slate-900 font-serif text-3xl md:text-4xl font-black mt-2 uppercase tracking-widest leading-none border-b-2 border-pink-50 pb-2">{data.name}</p>
                   <Heart className="text-rose-500 fill-current h-10 w-10 mt-6 animate-pulse opacity-30" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenLetter}
              className="group flex flex-col items-center gap-6 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-all bg-white/5 backdrop-blur-xl">
                <ChevronRight className="text-white group-hover:text-pink-500 transition-colors h-6 w-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.8em] text-white/40 group-hover:text-white font-black animate-pulse">Abrir Carta</span>
            </button>
          </div>
        )}

        {/* --- OPENING STAGE: TRANSITION --- */}
        {stage === 'opening' && (
           <div className="text-white text-center animate-blur-in flex flex-col items-center gap-6">
             <div className="relative">
               <div className="absolute inset-0 blur-[100px] bg-pink-500/30 rounded-full animate-pulse" />
               <div className="space-y-4 relative">
                 <p className="text-md uppercase tracking-[1.5em] font-black italic opacity-60">Sintonizando el alma...</p>
                 <div className="flex justify-center gap-3">
                    {[1,2,3].map(i => <Star key={i} className="h-3 w-3 fill-white opacity-20 animate-spin-slow" style={{ animationDelay: `${i*0.5}s` }} />)}
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* --- MESSAGE STAGE: THE LETTER --- */}
        {stage === 'message' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-20 duration-1200 px-4 flex flex-col items-center">
            <div className={cn(
              "relative w-full p-10 md:p-20 rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden transition-all duration-1000",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/40 backdrop-blur-3xl text-white"
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 text-2xl md:text-4xl lg:text-5xl leading-[1.7] md:leading-[1.6] min-h-[300px] font-medium text-center">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-16 flex flex-col items-center border-t border-white/5 pt-12">
                <p className="text-[9px] uppercase tracking-[1em] mb-10 opacity-20 font-black">Un Secreto por Revelar</p>
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-14 py-5 overflow-hidden rounded-full border border-white/10 transition-all hover:border-pink-500/40 active:scale-95 bg-white/5 backdrop-blur-xl shadow-xl shimmer-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[10px] uppercase tracking-[1em] text-white font-black group-hover:text-pink-200 transition-colors flex items-center gap-4">
                    <Sparkles className="h-5 w-5 text-pink-400" /> REVELAR
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- SECRET STAGE: THE CONFESSION --- */}
        {stage === 'secret' && (
          <div className="flex flex-col items-center justify-center text-center space-y-16 py-10 animate-in fade-in zoom-in duration-1500 px-6 w-full max-w-6xl h-full">
             <div className="relative flex flex-col items-center w-full">
               {/* Background Emotional Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[180px] bg-romantic-accent/40 animate-pulse rounded-full pointer-events-none" />
               
               <div className="relative flex flex-col items-center space-y-12 md:space-y-20">
                 <p className="text-pink-300 uppercase tracking-[2.5em] text-[10px] md:text-[13px] font-black opacity-60 leading-tight">
                   LO QUE EL CORAZÓN YA SABÍA
                 </p>
                 
                 <h2 className="text-6xl md:text-9xl lg:text-[14rem] font-cursive text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.6)] leading-tight italic select-none">
                   "{data.secretMessage}"
                 </h2>
               </div>
             </div>
             
             {/* Center Heart Decoration */}
             <div className="flex justify-center items-center gap-10 md:gap-20 pt-8 w-full max-w-3xl">
               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <div className="relative group flex flex-col items-center">
                 <Heart className="h-24 w-24 md:h-32 md:w-32 text-rose-500 fill-current animate-bounce group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-[80px] animate-pulse" />
               </div>
               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-20 px-10 py-4 rounded-full border border-white/5 text-[9px] uppercase tracking-[1.2em] text-white/30 hover:text-white/60 hover:bg-white/5 transition-all font-black shadow-lg"
             >
               Regresar al Inicio
             </button>
          </div>
        )}
      </div>

      {/* Persistent Status Branding */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-6 opacity-20 hover:opacity-100 transition-all duration-1000">
        <div className="flex gap-1 items-end h-4">
          {[0.4, 0.8, 0.6, 1.0, 0.5].map((h, i) => (
            <div key={i} className="w-[3px] bg-white animate-pulse" style={{ height: `${h*100}%`, animationDelay: `${i*0.3}s` }} />
          ))}
        </div>
        <p className="text-[8px] uppercase tracking-[0.6em] text-white font-black border-l border-white/20 pl-6">
          LoveLink Engine
        </p>
      </div>
    </ThemeWrapper>
  );
}

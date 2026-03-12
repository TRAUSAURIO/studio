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
      
      {/* Dynamic Cinematic Lighting */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '10%', left: '-10%', animationDelay: '0s', opacity: 0.2 }} />
        <div className="flare" style={{ top: '65%', right: '-10%', animationDelay: '7s', opacity: 0.15 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-16 text-center animate-in fade-in zoom-in duration-1200 w-full max-w-4xl">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-9xl font-headline tracking-tighter text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.4)] animate-float">
                {data.title}
              </h1>
              <div className="flex items-center justify-center gap-6 opacity-30">
                <div className="h-px w-16 bg-white" />
                <p className="text-white uppercase tracking-[1.5em] text-[10px] font-black">
                  Exclusividad Emocional
                </p>
                <div className="h-px w-16 bg-white" />
              </div>
            </div>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base">
                  <div className="wax-seal" />
                </div>
                <div className="envelope-flap" />
                <div className="letter-content rounded-sm shadow-inner flex flex-col items-center justify-center text-center">
                   <p className="text-pink-600 font-cursive text-3xl">Dedicado con amor a</p>
                   <p className="text-slate-900 font-serif text-4xl font-black mt-3 uppercase tracking-widest leading-none border-b-4 border-pink-50 pb-3">{data.name}</p>
                   <Heart className="text-rose-500 fill-current h-12 w-12 mt-8 animate-pulse opacity-40" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenLetter}
              className="group flex flex-col items-center gap-8 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-pink-500 transition-all bg-white/5 backdrop-blur-xl shadow-2xl">
                <ChevronRight className="text-white group-hover:text-pink-500 transition-colors h-8 w-8" />
              </div>
              <span className="text-[11px] uppercase tracking-[1em] text-white/50 group-hover:text-white font-black animate-pulse">Revelar el Mensaje</span>
            </button>
          </div>
        )}

        {stage === 'opening' && (
           <div className="text-white text-center animate-blur-in flex flex-col items-center gap-6">
             <div className="relative">
               <div className="absolute inset-0 blur-[120px] bg-pink-500/40 rounded-full animate-pulse" />
               <div className="space-y-6 relative">
                 <p className="text-lg uppercase tracking-[2.5em] font-black italic relative opacity-80">Trascendiendo el tiempo...</p>
                 <div className="flex justify-center gap-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-white opacity-20 animate-spin-slow" style={{ animationDelay: `${i*0.4}s` }} />)}
                 </div>
               </div>
             </div>
           </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-32 duration-1500 px-4 flex flex-col items-center">
            <div className={cn(
              "relative w-full p-12 md:p-24 rounded-[4rem] shadow-[0_80px_200px_rgba(0,0,0,1)] border border-white/5 overflow-hidden transition-all duration-1200",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/50 backdrop-blur-[40px] text-white"
            )}>
              {/* Internal Cinematic Glows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/70 pointer-events-none" />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 text-3xl md:text-5xl lg:text-6xl leading-[1.6] md:leading-[1.5] min-h-[400px] font-medium text-center">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-20 flex flex-col items-center border-t border-white/10 pt-16">
                <p className="text-[10px] uppercase tracking-[1.2em] mb-12 opacity-30 font-black">Una Verdad Final</p>
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-20 py-7 overflow-hidden rounded-full border border-white/15 transition-all hover:border-pink-500/60 active:scale-95 bg-white/5 backdrop-blur-2xl shadow-2xl shimmer-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[12px] uppercase tracking-[1.2em] text-white font-black group-hover:text-pink-100 transition-colors flex items-center gap-6">
                    <Sparkles className="h-6 w-6 text-pink-400" /> REVELAR SECRETO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-24 py-20 animate-in fade-in zoom-in duration-1200 px-6 w-full max-w-5xl">
             <div className="relative inline-block w-full">
               <div className="absolute inset-0 blur-[200px] bg-romantic-accent/60 animate-pulse rounded-full" />
               <div className="relative flex flex-col items-center">
                 <p className="text-pink-400 uppercase tracking-[2em] text-[12px] mb-16 font-black opacity-70">Lo que el corazón ya sabía</p>
                 <h2 className="text-7xl md:text-[15rem] font-cursive text-white drop-shadow-[0_0_120px_rgba(244,114,182,1)] leading-none italic select-none">
                   "{data.secretMessage}"
                 </h2>
               </div>
             </div>
             
             <div className="flex justify-center items-center gap-24 pt-16">
               <div className="w-40 h-px bg-white/20" />
               <div className="relative group">
                 <Heart className="h-32 w-32 text-rose-600 fill-current animate-bounce group-hover:scale-125 transition-transform" />
                 <div className="absolute inset-0 bg-rose-600 rounded-full blur-[100px] opacity-50 animate-pulse" />
               </div>
               <div className="w-40 h-px bg-white/20" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-40 px-14 py-5 rounded-full border border-white/10 text-[11px] uppercase tracking-[1.5em] text-white/40 hover:text-white hover:bg-white/10 transition-all font-black shadow-xl shimmer-btn"
             >
               Volver a la Eternidad
             </button>
          </div>
        )}
      </div>

      {/* Persistent Status Branding */}
      <div className="fixed bottom-12 left-12 z-50 flex items-center gap-10 opacity-30 hover:opacity-100 transition-all duration-1200">
        <div className="flex gap-2 items-end h-6">
          {[0.5, 0.9, 0.7, 1.0, 0.6, 1.2, 0.4].map((h, i) => (
            <div key={i} className="w-[4px] bg-white animate-pulse" style={{ height: `${h*100}%`, animationDelay: `${i*0.25}s` }} />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.8em] text-white font-black border-l border-white/40 pl-10 italic">
          LoveLink • Emotion Engine v2026.01
        </p>
      </div>
    </ThemeWrapper>
  );
}
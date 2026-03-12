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
    // Reiniciar stage si cambian los datos (para preview)
    if (isPreview) {
      setStage('intro');
    }
  }, [data, isPreview]);

  const handleOpenLetter = () => {
    if (stage !== 'intro') return;
    setStage('opening');
    // Animación 3D del sobre
    setTimeout(() => {
      setStage('message');
    }, 1800);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 5000);
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      {/* Cinematic Lighting Refined */}
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '5%', animationDelay: '0s', opacity: 0.2 }} />
        <div className="flare" style={{ top: '70%', animationDelay: '5s', opacity: 0.15 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-12 text-center animate-in fade-in zoom-in duration-1000">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-headline tracking-tighter text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] animate-float">
                {data.title}
              </h1>
              <div className="flex items-center justify-center gap-4 opacity-40">
                <div className="h-px w-12 bg-white" />
                <p className="text-white uppercase tracking-[1.2em] text-[10px] font-black">
                  Cápsula de Tiempo Emocional
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
                <div className="letter-content rounded-sm shadow-inner flex flex-col items-center justify-center">
                   <p className="text-pink-600 font-cursive text-2xl">Exclusivo para</p>
                   <p className="text-slate-900 font-serif text-3xl font-black mt-2 uppercase tracking-widest leading-none border-b-2 border-slate-100 pb-2">{data.name}</p>
                   <Heart className="text-rose-500 fill-current h-10 w-10 mt-6 animate-pulse opacity-50" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenLetter}
              className="group flex flex-col items-center gap-6 transition-all hover:scale-110 active:scale-95"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-all bg-white/5 backdrop-blur-md shadow-xl">
                <ChevronRight className="text-white group-hover:text-pink-500 transition-colors h-6 w-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.8em] text-white/40 group-hover:text-white font-bold animate-pulse">Inicia la Revelación</span>
            </button>
          </div>
        )}

        {stage === 'opening' && (
           <div className="text-white text-center animate-blur-in">
             <div className="relative">
               <div className="absolute inset-0 blur-[100px] bg-pink-500/30 rounded-full animate-pulse" />
               <div className="space-y-4 relative">
                 <p className="text-[14px] uppercase tracking-[2em] font-black italic relative opacity-80">Trascendiendo el tiempo...</p>
                 <div className="flex justify-center gap-2">
                    {[1,2,3].map(i => <Star key={i} className="h-3 w-3 fill-white opacity-20 animate-spin-slow" style={{ animationDelay: `${i*0.5}s` }} />)}
                 </div>
               </div>
             </div>
           </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-32 duration-1500 px-4">
            <div className={cn(
              "relative p-10 md:p-24 rounded-[3rem] shadow-[0_60px_180px_rgba(0,0,0,0.9)] border border-white/5 overflow-hidden transition-all duration-1000",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/40 backdrop-blur-3xl text-white"
            )}>
              {/* Brillo interno cinemático */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/60 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 text-3xl md:text-5xl lg:text-6xl leading-[1.5] md:leading-[1.4] min-h-[450px] font-medium italic">
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              <div className="mt-24 flex flex-col items-center border-t border-white/5 pt-16">
                <p className="text-[10px] uppercase tracking-[1em] mb-10 opacity-30 font-black">Una Verdad Final</p>
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-16 py-6 overflow-hidden rounded-full border border-white/10 transition-all hover:border-pink-500/50 active:scale-95 bg-white/5 backdrop-blur-xl shadow-2xl shimmer-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[11px] uppercase tracking-[1em] text-white font-black group-hover:text-pink-200 transition-colors flex items-center gap-5">
                    <Sparkles className="h-5 w-5 text-pink-400" /> REVELAR SECRETO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="text-center space-y-20 py-20 animate-in fade-in zoom-in duration-1000 px-4">
             <div className="relative inline-block">
               <div className="absolute inset-0 blur-[150px] bg-romantic-accent/50 animate-pulse rounded-full" />
               <div className="relative flex flex-col items-center">
                 <p className="text-pink-400 uppercase tracking-[1.5em] text-[11px] mb-12 font-black opacity-60">Lo que el corazón ya sabía</p>
                 <h2 className="text-7xl md:text-[14rem] font-cursive text-white drop-shadow-[0_0_100px_rgba(244,114,182,1)] leading-none italic select-none">
                   "{data.secretMessage}"
                 </h2>
               </div>
             </div>
             
             <div className="flex justify-center items-center gap-20 pt-16">
               <div className="w-32 h-px bg-white/20" />
               <div className="relative group">
                 <Heart className="h-28 w-28 text-rose-500 fill-current animate-bounce group-hover:scale-125 transition-transform" />
                 <div className="absolute inset-0 bg-rose-500 rounded-full blur-[80px] opacity-40 animate-pulse" />
               </div>
               <div className="w-32 h-px bg-white/20" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-40 px-12 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-[1.2em] text-white/30 hover:text-white hover:bg-white/10 transition-all font-black shadow-lg"
             >
               Volver a la Eternidad
             </button>
          </div>
        )}
      </div>

      {/* Floating Status UI (Luxury Detail) */}
      <div className="fixed bottom-12 left-12 z-50 flex items-center gap-8 opacity-40 hover:opacity-100 transition-all duration-1000">
        <div className="flex gap-1.5 items-end h-5">
          {[0.4, 0.8, 0.6, 1.0, 0.5, 0.9].map((h, i) => (
            <div key={i} className="w-[3px] bg-white animate-pulse" style={{ height: `${h*100}%`, animationDelay: `${i*0.2}s` }} />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.6em] text-white font-black border-l border-white/30 pl-8 italic">
          LoveLink Engine Premium v2026
        </p>
      </div>
    </ThemeWrapper>
  );
}

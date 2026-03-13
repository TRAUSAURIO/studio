"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

  // Font sizes with defaults for older encoded URLs
  const titleSize = data.titleFontSize || 64;
  const nameSize = data.nameFontSize || 32;
  const messageSize = data.messageFontSize || 24;
  const secretSize = data.secretFontSize || 128;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '5%', left: '-10%', animationDelay: '0s', opacity: 0.1 }} />
        <div className="flare" style={{ top: '70%', right: '-15%', animationDelay: '8s', opacity: 0.1 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* --- INTRO STAGE --- */}
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-10 text-center animate-in fade-in zoom-in duration-1000 w-full max-w-4xl">
            <div className="space-y-4">
              <h1 
                className="font-headline tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-float"
                style={{ fontSize: `${titleSize}px` }}
              >
                {data.title}
              </h1>
              <p className="text-white/40 uppercase tracking-[1em] text-[8px] font-black">
                LoveLink Experience
              </p>
            </div>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base">
                  <div className="wax-seal" />
                </div>
                <div className="envelope-flap" />
                <div className="letter-content rounded-sm shadow-2xl flex flex-col items-center justify-center text-center p-6">
                   <p className="text-pink-600 font-cursive text-xl">Para</p>
                   <p 
                    className="text-slate-900 font-serif font-black uppercase tracking-widest leading-tight border-b-2 border-pink-50/50 pb-1"
                    style={{ fontSize: `${nameSize}px` }}
                   >
                    {data.name}
                   </p>
                   {data.imageUrl && (
                     <div className="mt-4 relative w-32 h-32 md:w-40 md:h-40 rotate-[-2deg] border-4 border-white shadow-lg overflow-hidden">
                        <Image 
                          src={data.imageUrl} 
                          alt="Photo" 
                          fill 
                          className="object-cover" 
                          unoptimized 
                        />
                     </div>
                   )}
                   <Heart className="text-rose-500/20 fill-current h-8 w-8 mt-4 animate-pulse" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleOpenLetter}
              className="group flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-all bg-white/5 backdrop-blur-xl">
                <ChevronRight className="text-white group-hover:text-pink-500 h-5 w-5" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-black">Empezar</span>
            </button>
          </div>
        )}

        {/* --- MESSAGE STAGE --- */}
        {stage === 'message' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 px-4 flex flex-col items-center">
            <div className={cn(
              "relative w-full p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden transition-all",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/40 backdrop-blur-3xl text-white"
            )}>
              {data.imageUrl && (
                <div className="mb-10 flex justify-center">
                  <div className="relative w-48 h-48 md:w-72 md:h-72 border-[8px] border-white shadow-2xl rotate-1 overflow-hidden">
                    <Image 
                      src={data.imageUrl} 
                      alt="Moment" 
                      fill 
                      className="object-cover" 
                      unoptimized 
                    />
                  </div>
                </div>
              )}

              {data.showDate && (
                <div className="mb-6 flex items-center justify-center gap-2 opacity-60">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.4em] font-black">
                    {new Date(data.specialDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              )}

              <div 
                className="relative z-10 leading-relaxed font-medium text-center"
                style={{ fontSize: `${messageSize}px` }}
              >
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>

              {data.senderName && (
                <div className="mt-8 text-center animate-in fade-in duration-1000 delay-1000">
                  <p className="text-pink-500 font-cursive text-2xl">Con amor,</p>
                  <p className={cn(
                    "font-bold tracking-widest uppercase mt-1",
                    data.senderIsCursive ? "font-cursive text-3xl text-pink-400" : "font-serif text-white"
                  )}>
                    {data.senderName}
                  </p>
                </div>
              )}

              <div className="mt-12 flex flex-col items-center border-t border-white/10 pt-10">
                <button
                  onClick={handleSecretReveal}
                  className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 transition-all hover:border-pink-500/40 bg-white/5 backdrop-blur-xl shimmer-btn"
                >
                  <span className="relative text-[9px] uppercase tracking-[0.8em] text-white font-black flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-pink-400" /> REVELAR SECRETO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- SECRET STAGE --- */}
        {stage === 'secret' && (
          <div className="flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in zoom-in duration-1000 px-6 w-full max-w-6xl h-full">
             <div className="relative flex flex-col items-center w-full">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[120px] bg-romantic-accent/20 animate-pulse rounded-full pointer-events-none" />
               
               <div className="relative flex flex-col items-center space-y-8 md:space-y-12">
                 <p className="text-pink-300 uppercase tracking-[2.5em] text-[10px] md:text-[12px] font-black opacity-60">
                   LO QUE EL CORAZÓN YA SABÍA
                 </p>
                 
                 <h2 
                  className="font-cursive text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] leading-tight italic select-none"
                  style={{ fontSize: `${secretSize}px` }}
                 >
                   "{data.secretMessage}"
                 </h2>
               </div>
             </div>
             
             <div className="flex justify-center items-center gap-8 md:gap-16 pt-8 w-full max-w-2xl">
               <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <Heart 
                className="text-rose-500 fill-current animate-bounce" 
                style={{ 
                  width: `${64 + (data.confettiStrength || 50) * 0.8}px`,
                  height: `${64 + (data.confettiStrength || 50) * 0.8}px`
                }}
              />
               <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
             </div>

             <div className="flex flex-col items-center gap-4">
                {data.ambientSound && data.ambientSound !== 'none' && (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <div className="flex gap-1 items-end h-4">
                      {[0.4, 0.8, 0.6, 1.0, 0.5].map((h, i) => (
                        <div key={i} className="w-[3px] bg-white animate-pulse" style={{ height: `${h*100}%`, animationDelay: `${i*0.3}s` }} />
                      ))}
                    </div>
                    <p className="text-[8px] uppercase tracking-[0.6em] text-white font-black border-l border-white/20 pl-4">
                      {data.ambientSound} mode active
                    </p>
                  </div>
                )}

               <button
                 onClick={() => setStage('intro')}
                 className="mt-4 px-8 py-4 rounded-full border border-white/5 text-[8px] uppercase tracking-[1.2em] text-white/40 hover:text-white/80 transition-all font-black"
               >
                 Volver al Inicio
               </button>
             </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4 opacity-20">
        <p className="text-[7px] uppercase tracking-[0.5em] text-white font-black">
          LoveLink Engine • Premium 2026
        </p>
      </div>
    </ThemeWrapper>
  );
}

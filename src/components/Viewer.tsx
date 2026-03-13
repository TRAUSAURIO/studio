"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { AdUnit } from './AdUnit';
import { Heart, Sparkles, ChevronRight, Calendar, Volume2 } from 'lucide-react';
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

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '5%', left: '-10%', opacity: 0.1 }} />
        <div className="flare" style={{ top: '70%', right: '-15%', opacity: 0.1 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-10 text-center animate-in fade-in zoom-in duration-1000 w-full max-w-4xl">
            <h1 className="font-headline tracking-tighter text-white animate-float" style={{ fontSize: `${data.titleFontSize || 64}px` }}>
              {data.title}
            </h1>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base"><div className="wax-seal" /></div>
                <div className="envelope-flap" />
                <div className="letter-content text-center p-6">
                   <p className="text-pink-600 font-cursive text-xl">Para</p>
                   <p className="text-slate-900 font-serif font-black uppercase tracking-widest" style={{ fontSize: `${data.nameFontSize || 32}px` }}>
                    {data.name}
                   </p>
                </div>
              </div>
            </div>

            <button onClick={handleOpenLetter} className="group flex flex-col items-center gap-4 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl">
                <ChevronRight className="text-white h-5 w-5" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-black">Empezar</span>
            </button>
            {/* Ad in Intro - Sutil */}
            {!isPreview && <AdUnit slot="5566778899" className="mt-8 opacity-40 scale-75" />}
          </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 px-4 flex flex-col items-center">
            <div className={cn(
              "relative w-full p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden transition-all",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/40 backdrop-blur-3xl text-white"
            )}>
              {data.imageUrl && (
                <div className="mb-10 flex justify-center">
                  <div className="relative w-48 h-48 md:w-72 md:h-72 border-[8px] border-white shadow-2xl rotate-1 overflow-hidden">
                    <Image src={data.imageUrl} alt="Moment" fill className="object-cover" unoptimized />
                  </div>
                </div>
              )}

              <div className="relative z-10 leading-relaxed font-medium text-center" style={{ fontSize: `${data.messageFontSize || 24}px` }}>
                <CinematicTypewriter text={data.message} onComplete={() => {}} />
              </div>

              {/* Strategic Ad placement between message and secret reveal */}
              {!isPreview && <AdUnit slot="1122334455" className="my-12" />}

              {data.senderName && (
                <div className="mt-8 text-center">
                  <p className="text-pink-500 font-cursive text-2xl">Con amor,</p>
                  <p className={cn("font-bold tracking-widest uppercase mt-1", data.senderIsCursive ? "font-cursive text-3xl text-pink-400" : "font-serif text-white")}>
                    {data.senderName}
                  </p>
                </div>
              )}

              <div className="mt-12 flex flex-col items-center border-t border-white/10 pt-10">
                <button onClick={handleSecretReveal} className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 transition-all bg-white/5 backdrop-blur-xl shimmer-btn">
                  <span className="relative text-[9px] uppercase tracking-[0.8em] text-white font-black flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-pink-400" /> REVELAR SECRETO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in zoom-in duration-1000 px-6 w-full max-w-6xl h-full">
             <h2 className="font-cursive text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]" style={{ fontSize: `${data.secretFontSize || 128}px` }}>
               "{data.secretMessage}"
             </h2>
             <button onClick={() => setStage('intro')} className="mt-4 px-8 py-4 rounded-full border border-white/5 text-[8px] uppercase tracking-[1.2em] text-white/40 font-black">
               Volver al Inicio
             </button>
             {/* Ad at the very end */}
             {!isPreview && <AdUnit slot="9988776655" format="auto" className="mt-12 opacity-50" />}
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
}

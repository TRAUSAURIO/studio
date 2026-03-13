"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { AdUnit } from './AdUnit';
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
    if (isPreview) setStage('intro');
  }, [data, isPreview]);

  const handleOpenLetter = () => {
    if (stage !== 'intro') return;
    setStage('opening');
    setTimeout(() => setStage('message'), 2000);
  };

  const handleSecretReveal = () => {
    setStage('secret');
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 6000);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (!mounted) return null;

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle} className="p-0">
      <div className="film-grain" />
      <div className="lens-flare-container">
        <div className="flare" style={{ top: '10%', left: '5%', opacity: 0.1 }} />
      </div>

      <ParticleCanvas type={showExplosion ? 'glitter' : data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-10 text-center animate-in fade-in zoom-in duration-1000 w-full max-w-4xl">
            <h1 className="font-headline tracking-tighter text-white animate-float" style={{ fontSize: `${data.titleFontSize}px` }}>
              {data.title}
            </h1>
            
            <div className="envelope-container" onClick={handleOpenLetter}>
              <div className={cn("envelope-3d", stage === 'opening' && "envelope-open")}>
                <div className="envelope-base"><div className="wax-seal" /></div>
                <div className="envelope-flap" />
                <div className="letter-content text-center p-6">
                   <p className="text-pink-600 font-cursive text-xl">Para</p>
                   <p className="text-slate-900 font-serif font-black uppercase tracking-widest" style={{ fontSize: `${data.nameFontSize}px` }}>
                    {data.name}
                   </p>
                </div>
              </div>
            </div>

            <button onClick={handleOpenLetter} className="group flex flex-col items-center gap-4 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl">
                <ChevronRight className="text-white h-5 w-5" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-black">Empezar el viaje</span>
            </button>
            {!isPreview && <AdUnit slot="5566778899" className="mt-8 opacity-40 scale-75" />}
          </div>
        )}

        {stage === 'message' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000 px-4 flex flex-col items-center">
            <div className={cn(
              "relative w-full p-8 md:p-16 rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden transition-all",
              data.theme === 'parchment' ? "parchment-bg" : "bg-black/60 backdrop-blur-3xl text-white"
            )}>
              {data.showDate && data.specialDate && (
                <div className="mb-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-pink-500 font-bold opacity-70">
                   <Calendar className="h-3 w-3" /> {formatDate(data.specialDate)}
                </div>
              )}

              {data.imageUrl && (
                <div className="mb-12 flex justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 border-[10px] border-white shadow-2xl rotate-2 overflow-hidden rounded-sm">
                    <Image src={data.imageUrl} alt="Memory" fill className="object-cover" unoptimized />
                  </div>
                </div>
              )}

              <div className="relative z-10 leading-relaxed text-center" style={{ fontSize: `${data.messageFontSize}px` }}>
                <CinematicTypewriter text={data.message} />
              </div>

              {data.senderName && (
                <div className="mt-12 text-center animate-in fade-in duration-1000 delay-500">
                  <p className="text-pink-500 font-cursive text-2xl">Con amor,</p>
                  <p className={cn(
                    "font-bold tracking-widest uppercase mt-1", 
                    data.senderIsCursive ? "font-cursive text-4xl text-pink-400 normal-case" : "font-serif text-white text-lg"
                  )}>
                    {data.senderName}
                  </p>
                </div>
              )}

              <div className="mt-16 flex flex-col items-center border-t border-white/10 pt-12">
                <button onClick={handleSecretReveal} className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/20 transition-all bg-white/5 backdrop-blur-xl shimmer-btn">
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
             <div className="relative">
                <h2 className="font-cursive text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-float" style={{ fontSize: `${data.secretFontSize}px` }}>
                  "{data.secretMessage}"
                </h2>
                <div className="absolute -inset-10 bg-pink-500/20 blur-[100px] -z-10 rounded-full" />
             </div>
             <button onClick={() => setStage('intro')} className="mt-12 px-10 py-4 rounded-full border border-white/10 text-[8px] uppercase tracking-[1.5em] text-white/40 font-black hover:text-white hover:border-white/30 transition-all">
               Volver al Inicio
             </button>
             {!isPreview && <AdUnit slot="9988776655" className="mt-12 opacity-50" />}
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
}

"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData } from '@/lib/types';
import { ThemeWrapper } from './ThemeWrapper';
import { ParticleCanvas } from './ParticleCanvas';
import { CinematicTypewriter } from './CinematicTypewriter';
import { YouTubePlayer } from './YouTubePlayer';
import { Heart, Scroll, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewerProps {
  data: ExperienceData;
  isPreview?: boolean;
}

export function Viewer({ data, isPreview = false }: ViewerProps) {
  const [stage, setStage] = useState<'intro' | 'message' | 'secret'>('intro');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderDecorations = () => {
    switch (data.theme) {
      case 'parchment':
        return (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30">
             <div className="wax-seal" onClick={() => setStage('message')} />
          </div>
        );
      case 'golden-roses':
        return (
          <>
            <div className="rose-corner top-0 left-0" />
            <div className="rose-corner top-0 right-0 rotate-90" />
            <div className="rose-corner bottom-0 left-0 -rotate-90" />
            <div className="rose-corner bottom-0 right-0 rotate-180" />
          </>
        );
      case 'love-galaxy':
        return <div className="fixed inset-0 galaxy-bg pointer-events-none" />;
      case 'minimal-glow':
        return <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-accent/5 to-transparent pointer-events-none" />;
      default:
        return null;
    }
  };

  return (
    <ThemeWrapper theme={data.theme} fontStyle={data.fontStyle}>
      <ParticleCanvas type={data.particles} />

      {!isPreview && <YouTubePlayer videoId={data.youtubeId} />}

      <div className="relative z-20 w-full">
        {stage === 'intro' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-1000 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative group cursor-pointer" onClick={() => setStage('message')}>
                <div className="absolute inset-0 bg-romantic-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <Heart className="h-20 w-20 text-romantic-primary fill-current relative drop-shadow-2xl animate-pulse" />
              </div>
            </div>
            
            <h1 className={cn(
              "text-5xl md:text-7xl font-headline tracking-tighter",
              data.theme === 'minimal-glow' && "neon-glow"
            )}>
              {data.title || "Una sorpresa para ti"}
            </h1>
            
            <p className="text-2xl md:text-3xl font-cursive opacity-90">
              Para: {data.name}
            </p>

            <button
              onClick={() => setStage('message')}
              className="mt-12 px-10 py-4 rounded-full border border-romantic-primary/30 hover:bg-romantic-primary/10 transition-all text-sm uppercase tracking-[0.4em] backdrop-blur-md bg-white/5"
            >
              Abrir Corazón
            </button>
            
            {data.theme === 'parchment' && (
              <p className="text-xs uppercase tracking-widest opacity-40 mt-4 italic">
                Rómpelo para leer...
              </p>
            )}
          </div>
        )}

        {stage === 'message' && (
          <div className="space-y-12 py-12 px-4 max-w-3xl mx-auto">
            <div className={cn(
              "relative p-8 md:p-16 rounded-sm shadow-2xl transition-all duration-1000",
              data.theme === 'parchment' && "bg-parchment rotate-1",
              data.theme === 'golden-roses' && "bg-black/40 border-4 border-double border-romantic-primary backdrop-blur-md",
              data.theme === 'love-galaxy' && "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl",
              data.theme === 'minimal-glow' && "bg-transparent",
              data.theme === 'vintage-ink' && "bg-white/90 shadow-inner"
            )}>
              {renderDecorations()}
              
              <div className={cn(
                "text-2xl md:text-4xl leading-relaxed min-h-[350px]",
                data.theme === 'parchment' || data.theme === 'vintage-ink' ? "text-slate-900" : "text-white",
                data.theme === 'minimal-glow' && "neon-glow"
              )}>
                <CinematicTypewriter
                  text={data.message}
                  onComplete={() => {}}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
              <button
                onClick={() => setStage('secret')}
                className="group flex flex-col items-center gap-2 text-romantic-primary/60 hover:text-romantic-primary transition-all"
              >
                <div className="h-px w-16 bg-romantic-primary/30 group-hover:w-32 transition-all" />
                <span className="text-[10px] uppercase tracking-[0.5em]">El Secreto</span>
              </button>
            </div>
          </div>
        )}

        {stage === 'secret' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 text-center">
             <div className={cn(
                "text-5xl md:text-7xl font-cursive py-20",
                data.theme === 'minimal-glow' && "neon-glow"
             )}>
                "{data.secretMessage}"
             </div>
             
             <div className="flex justify-center gap-8">
               <Sparkles className="h-6 w-6 text-romantic-primary animate-pulse" />
               <Heart className="h-10 w-10 text-romantic-accent fill-current animate-bounce" />
               <Sparkles className="h-6 w-6 text-romantic-primary animate-pulse delay-150" />
             </div>

             <button
               onClick={() => setStage('intro')}
               className="mt-20 text-[10px] uppercase tracking-[0.6em] opacity-30 hover:opacity-100 transition-opacity"
             >
               Cerrar carta y volver al inicio
             </button>
          </div>
        )}
      </div>

      {/* Marca de agua elegante */}
      <div className="fixed bottom-8 left-8 z-30 pointer-events-none opacity-20">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-romantic-primary" />
          <p className="text-[8px] uppercase tracking-[0.8em] font-light">
            Eternal Experience
          </p>
        </div>
      </div>
    </ThemeWrapper>
  );
}

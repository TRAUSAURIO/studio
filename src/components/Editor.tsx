"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { ROMANTIC_TEMPLATES } from '@/lib/templates';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Heart, Share2, Wand2, Monitor, Smartphone, Palette, Sparkles, Music, Type, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';
import { cn } from '@/lib/utils';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [activeTab, setActiveTab] = useState<'content' | 'visual' | 'extra'>('content');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateField = (field: keyof ExperienceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadTemplate = (templateKey: string) => {
    const template = ROMANTIC_TEMPLATES[templateKey];
    if (template) {
      setIsTransitioning(true);
      setTimeout(() => {
        setData(template);
        setIsTransitioning(false);
        toast({
          title: "Atmósfera Aplicada",
          description: `El escenario '${templateKey}' se ha configurado con éxito.`,
        });
      }, 400);
    }
  };

  const copyUrl = () => {
    const url = getSharableUrl(data);
    navigator.clipboard.writeText(url);
    toast({
      title: "Enlace Eterno Copiado",
      description: "Tu mensaje está listo para ser descubierto.",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* --- NEON EDITOR SIDEBAR --- */}
      <div className="w-full md:w-[480px] p-6 md:p-10 overflow-y-auto h-screen border-r border-white/5 bg-[#020617] relative z-50 flex flex-col">
        
        {/* Logo Branding Premium */}
        <header className="mb-12 flex items-center gap-4 group">
          <div className="relative">
            <Heart className="h-8 w-8 text-pink-500 fill-current animate-pulse-slow group-hover:scale-125 transition-transform" />
            <div className="absolute inset-0 bg-pink-500/40 blur-2xl rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white neon-text-pink uppercase italic">LoveLink</h1>
            <p className="text-[9px] text-pink-400/60 uppercase tracking-[0.5em] font-bold">Emotion Engine v2026.01</p>
          </div>
        </header>

        {/* Cinematic Tabs Navigation */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-10 gap-1.5 border border-white/5 shadow-inner">
          {(['content', 'visual', 'extra'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 relative overflow-hidden",
                activeTab === tab 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-pink-500/20" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              {tab === 'content' && 'Escenarios'}
              {tab === 'visual' && 'Atmósfera'}
              {tab === 'extra' && 'Detalles'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 space-y-10 animate-blur-in">
          
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-3">
                  <Wand2 className="h-4 w-4" /> Selecciona una Obra
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(ROMANTIC_TEMPLATES).map((key) => (
                    <button
                      key={key}
                      onClick={() => loadTemplate(key)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all glass-card group relative overflow-hidden",
                        data.title === ROMANTIC_TEMPLATES[key].title ? "border-pink-500/50 bg-pink-500/10 ring-2 ring-pink-500/20" : "border-white/5"
                      )}
                    >
                      {data.title === ROMANTIC_TEMPLATES[key].title && (
                        <CheckCircle2 className="absolute top-2 right-2 h-3 w-3 text-pink-500" />
                      )}
                      <p className="text-[11px] font-black text-white capitalize mb-1">{key.replace('-', ' ')}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-pink-400 transition-colors">Premium</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <MessageSquare className="h-3 w-3 text-pink-500" /> Título de la Carta
                  </Label>
                  <Input
                    value={data.title}
                    onChange={e => updateField('title', e.target.value)}
                    className="bg-white/5 border-white/10 h-12 focus:border-pink-500/50 transition-all rounded-xl font-headline"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">👤 Dedicado a</Label>
                  <Input
                    value={data.name}
                    onChange={e => updateField('name', e.target.value)}
                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">✒️ Tu Mensaje</Label>
                  <Textarea
                    value={data.message}
                    onChange={e => updateField('message', e.target.value)}
                    className="min-h-[180px] bg-white/5 border-white/10 leading-relaxed resize-none rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-3xl space-y-6 border-white/10 shadow-2xl">
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Palette className="h-3 w-3 text-purple-400" /> Paleta de Colores
                  </Label>
                  <select 
                    value={data.theme} 
                    onChange={e => updateField('theme', e.target.value as ThemeType)}
                    className="w-full bg-black/40 border border-white/10 h-14 rounded-2xl px-5 text-sm focus:outline-none focus:border-purple-500 transition-all text-slate-200 cursor-pointer appearance-none hover:bg-black/60"
                  >
                    <option value="midnight-romance">🌑 Midnight Romance</option>
                    <option value="cinematic-love">🎬 Cinematic Love</option>
                    <option value="golden-hour">🌅 Golden Hour</option>
                    <option value="starlit-night">🌌 Noche Estrellada</option>
                    <option value="rose-garden">🌹 Jardín de Rosas</option>
                    <option value="romantic-aurora">🌈 Aurora Romántica</option>
                    <option value="parchment">📜 Ancient Parchment</option>
                    <option value="luxury-white">💎 Luxury White</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-yellow-400" /> Efectos de Partículas
                  </Label>
                  <select 
                    value={data.particles} 
                    onChange={e => updateField('particles', e.target.value as ParticleType)}
                    className="w-full bg-black/40 border border-white/10 h-14 rounded-2xl px-5 text-sm focus:outline-none focus:border-yellow-500 transition-all text-slate-200 cursor-pointer appearance-none hover:bg-black/60"
                  >
                    <option value="gold-dust">✨ Polvo Dorado</option>
                    <option value="hearts">💓 Corazones Pulsantes</option>
                    <option value="petals">🌸 Pétalos de Rosa</option>
                    <option value="stars">⭐ Estrellas Twinkling</option>
                    <option value="snow">❄️ Copos de Nieve</option>
                    <option value="glitter">💎 Brillos Cinematográficos</option>
                    <option value="sparks">🔥 Chispas Románticas</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Type className="h-3 w-3 text-blue-400" /> Caligrafía
                  </Label>
                  <select 
                    value={data.fontStyle} 
                    onChange={e => updateField('fontStyle', e.target.value as FontStyle)}
                    className="w-full bg-black/40 border border-white/10 h-14 rounded-2xl px-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-200 cursor-pointer appearance-none hover:bg-black/60"
                  >
                    <option value="cursive">🖋️ Escritura a Mano</option>
                    <option value="parchment">📜 Ancient Scroll</option>
                    <option value="serif">🏛️ Serif Clásica</option>
                    <option value="cinematic">🎥 Cinematic Glow</option>
                    <option value="clean">⚪ Minimal Clean</option>
                    <option value="glow">🔥 Romantic Blaze</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-3xl space-y-6 border-white/10 shadow-2xl">
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Heart className="h-3 w-3 text-red-500" /> Mensaje Secreto
                  </Label>
                  <Input
                    value={data.secretMessage}
                    onChange={e => updateField('secretMessage', e.target.value)}
                    placeholder="Lo que el alma susurra..."
                    className="bg-black/20 border-white/10 h-14 rounded-2xl px-5"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Music className="h-3 w-3 text-green-400" /> Banda Sonora (ID YouTube)
                  </Label>
                  <Input
                    value={data.youtubeId}
                    onChange={e => updateField('youtubeId', e.target.value)}
                    placeholder="L_jWHffIx5E"
                    className="bg-black/20 border-white/10 h-14 rounded-2xl px-5"
                  />
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={copyUrl}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs h-16 rounded-2xl shadow-2xl shadow-pink-500/30 active:scale-[0.98] transition-all flex gap-4 uppercase tracking-[0.2em] shimmer-btn"
                >
                  <Share2 className="h-5 w-5" /> GENERAR ENLACE ETERNO
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Footer Editor */}
        <footer className="mt-12 pt-8 flex items-center justify-between opacity-30 border-t border-white/5">
          <p className="text-[8px] uppercase tracking-[0.5em] font-black">Powered by LoveLink Engine</p>
          <div className="flex gap-5">
             <Monitor onClick={() => setIsMobileView(false)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-colors", !isMobileView && "text-pink-500 opacity-100 scale-125")} />
             <Smartphone onClick={() => setIsMobileView(true)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-colors", isMobileView && "text-pink-500 opacity-100 scale-125")} />
          </div>
        </footer>
      </div>

      {/* --- PREVIEW AREA CON TRANSICIÓN --- */}
      <div className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
        
        <div className={cn(
          "relative transition-all duration-1000 ease-in-out shadow-[0_0_120px_rgba(0,0,0,1)] border border-white/5 overflow-hidden",
          isMobileView ? "w-[375px] h-[720px] rounded-[3.5rem]" : "w-full h-full max-w-6xl rounded-[3rem]",
          isTransitioning && "scale-[0.98] opacity-50 blur-sm"
        )}>
          <Viewer data={data} isPreview={true} />
        </div>

        {/* Destellos de lente orbitales */}
        <div className="lens-flare-container">
          <div className="flare opacity-20" style={{ top: '20%', animationDelay: '-2s' }} />
          <div className="flare opacity-10" style={{ bottom: '10%', animationDelay: '-8s', height: '150px' }} />
        </div>
      </div>
    </div>
  );
}

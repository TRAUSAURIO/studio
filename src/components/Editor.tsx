"use client"

import React, { useState } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { ROMANTIC_TEMPLATES } from '@/lib/templates';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Heart, Share2, Wand2, Monitor, Smartphone, Palette, Sparkles, Music, Type, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';
import { cn } from '@/lib/utils';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [activeTab, setActiveTab] = useState<'content' | 'visual' | 'extra'>('content');
  const [isMobileView, setIsMobileView] = useState(false);

  const updateField = (field: keyof ExperienceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadTemplate = (templateKey: string) => {
    const template = ROMANTIC_TEMPLATES[templateKey];
    if (template) {
      setData(template);
      toast({
        title: "Escenografía Cargada",
        description: `Atmósfera '${templateKey}' aplicada con éxito.`,
      });
    }
  };

  const copyUrl = () => {
    const url = getSharableUrl(data);
    navigator.clipboard.writeText(url);
    toast({
      title: "Enlace Eterno Copiado",
      description: "La magia está lista para ser enviada.",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* --- NEON EDITOR SIDEBAR (40%) --- */}
      <div className="w-full md:w-[450px] p-6 md:p-8 overflow-y-auto h-screen border-r border-white/5 bg-[#020617] relative z-50">
        
        {/* Logo Branding */}
        <header className="mb-10 flex items-center gap-3">
          <div className="relative">
            <Heart className="h-7 w-7 text-pink-500 fill-current animate-pulse-slow" />
            <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white neon-text-pink">LoveLink</h1>
            <p className="text-[8px] text-pink-400 uppercase tracking-[0.4em] font-medium opacity-70">Emotion Engine v2026.01</p>
          </div>
        </header>

        {/* Cinematic Tabs */}
        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 gap-1">
          {(['content', 'visual', 'extra'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
                activeTab === tab 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white neon-border-active" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              {tab === 'content' && 'Contenido'}
              {tab === 'visual' && 'Visual'}
              {tab === 'extra' && 'Extra'}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Wand2 className="h-3 w-3 text-pink-500" /> Escenografías Curadas
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(ROMANTIC_TEMPLATES).slice(0, 6).map((key) => (
                    <button
                      key={key}
                      onClick={() => loadTemplate(key)}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all glass-card",
                        data.title === ROMANTIC_TEMPLATES[key].title ? "border-pink-500/50 bg-pink-500/10" : "border-white/5"
                      )}
                    >
                      <p className="text-[10px] font-bold text-white capitalize">{key.replace('-', ' ')}</p>
                      <p className="text-[8px] text-slate-500 uppercase">Premium</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <MessageSquare className="h-3 w-3 text-pink-400" /> Título de la Obra
                  </Label>
                  <Input
                    value={data.title}
                    onChange={e => updateField('title', e.target.value)}
                    className="bg-white/5 border-white/10 h-11 focus:border-pink-500/50 transition-all rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400">👤 Destinatario</Label>
                  <Input
                    value={data.name}
                    onChange={e => updateField('name', e.target.value)}
                    className="bg-white/5 border-white/10 h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400">✒️ Mensaje Literario</Label>
                  <Textarea
                    value={data.message}
                    onChange={e => updateField('message', e.target.value)}
                    className="min-h-[160px] bg-white/5 border-white/10 leading-relaxed resize-none rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="space-y-6">
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Palette className="h-3 w-3 text-purple-400" /> Atmósfera Cromática
                  </Label>
                  <select 
                    value={data.theme} 
                    onChange={e => updateField('theme', e.target.value as ThemeType)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-purple-500 transition-all text-slate-200"
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

                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-yellow-400" /> Partículas de Ambiente
                  </Label>
                  <select 
                    value={data.particles} 
                    onChange={e => updateField('particles', e.target.value as ParticleType)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-slate-200"
                  >
                    <option value="gold-dust">✨ Polvo Dorado</option>
                    <option value="hearts">💓 Corazones Pulsantes</option>
                    <option value="petals">🌸 Pétalos de Rosa</option>
                    <option value="stars">⭐ Estrellas Twinkling</option>
                    <option value="snow">❄️ Copos de Nieve</option>
                    <option value="glitter">💎 Brillos Cinematográficos</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Type className="h-3 w-3 text-blue-400" /> Tipografía de la Carta
                  </Label>
                  <select 
                    value={data.fontStyle} 
                    onChange={e => updateField('fontStyle', e.target.value as FontStyle)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-200"
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
            <div className="space-y-6">
              <div className="glass-card p-5 rounded-2xl space-y-5">
                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Heart className="h-3 w-3 text-red-500" /> Mensaje Secreto (Revelación)
                  </Label>
                  <Input
                    value={data.secretMessage}
                    onChange={e => updateField('secretMessage', e.target.value)}
                    placeholder="Lo que el alma calla..."
                    className="bg-black/20 border-white/10 h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Music className="h-3 w-3 text-green-400" /> Banda Sonora (YouTube ID)
                  </Label>
                  <Input
                    value={data.youtubeId}
                    onChange={e => updateField('youtubeId', e.target.value)}
                    placeholder="L_jWHffIx5E"
                    className="bg-black/20 border-white/10 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={copyUrl}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold h-14 rounded-2xl shadow-xl shadow-pink-500/20 active:scale-[0.98] transition-all flex gap-3"
                >
                  <Share2 className="h-5 w-5" /> GENERAR ENLACE ETERNO
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Footer */}
        <footer className="mt-auto pt-12 flex items-center justify-between opacity-30">
          <p className="text-[9px] uppercase tracking-[0.4em] font-light">Engine ©2026</p>
          <div className="flex gap-4">
             <Monitor onClick={() => setIsMobileView(false)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-colors", !isMobileView && "text-pink-500 opacity-100")} />
             <Smartphone onClick={() => setIsMobileView(true)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-colors", isMobileView && "text-pink-500 opacity-100")} />
          </div>
        </footer>
      </div>

      {/* --- PREVIEW AREA (60%) --- */}
      <div className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />
        
        <div className={cn(
          "relative transition-all duration-1000 ease-in-out shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/5 overflow-hidden",
          isMobileView ? "w-[375px] h-[667px] rounded-[3rem]" : "w-full h-full max-w-5xl rounded-[2.5rem]"
        )}>
          <Viewer data={data} isPreview={true} />
        </div>
      </div>
    </div>
  );
}

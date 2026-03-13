"use client"

import React, { useState } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, AmbientSoundType } from '@/lib/types';
import { ROMANTIC_TEMPLATES } from '@/lib/templates';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { 
  Heart, Share2, Wand2, Monitor, Smartphone, Palette, Sparkles, 
  Type, MessageSquare, Image as ImageIcon, User, 
  Calendar, Waves, Volume2, PenTool, Youtube, Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';
import { AdUnit } from './AdUnit';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [activeTab, setActiveTab] = useState<'content' | 'visual' | 'extra'>('content');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateField = (field: keyof ExperienceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleYoutubeLink = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : url;
    updateField('youtubeId', videoId);
  };

  const getIntensityLabel = (val: number) => {
    if (val < 20) return "Susurro de brillos...";
    if (val < 40) return "Suave brisa romántica...";
    if (val < 60) return "Lluvia de sentimientos...";
    if (val < 80) return "Intensa pasión...";
    return "¡Una tormenta de amor eterno!";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      <div className="w-full md:w-[460px] p-8 md:p-10 overflow-y-auto h-screen border-r border-white/5 bg-[#020617]/90 backdrop-blur-3xl relative z-50 flex flex-col">
        <header className="mb-12 flex flex-col items-center gap-3 group">
          <div className="relative">
            <Heart className="h-10 w-10 text-pink-500 fill-current animate-pulse-slow group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-pink-500/30 blur-2xl rounded-full" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter text-white neon-text-pink uppercase italic">LoveLink</h1>
            <p className="text-[9px] text-pink-400/50 uppercase tracking-[0.5em] font-bold">Emotion Engine v2026</p>
          </div>
        </header>

        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 gap-1 border border-white/5 shadow-inner">
          {(['content', 'visual', 'extra'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-[9px] uppercase tracking-[0.2em] font-black transition-all duration-500 relative overflow-hidden",
                activeTab === tab 
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-pink-500/20" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              {tab === 'content' && 'Escenarios'}
              {tab === 'visual' && 'Atmósfera'}
              {tab === 'extra' && 'Detalles'}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-8 animate-blur-in pb-10">
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
                      onClick={() => {
                        setData({ ...DEFAULT_EXPERIENCE, ...ROMANTIC_TEMPLATES[key] });
                        toast({ title: "Escenario Aplicado", description: `Configurado: ${key}` });
                      }}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all glass-card group relative overflow-hidden",
                        data.title === ROMANTIC_TEMPLATES[key].title ? "border-pink-500/50 bg-pink-500/10" : "border-white/5"
                      )}
                    >
                      <p className="text-[11px] font-black text-white capitalize mb-1">{key.replace('-', ' ')}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Curado</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">Título de la Carta</Label>
                  <Input value={data.title} onChange={e => updateField('title', e.target.value)} className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">Dedicado a</Label>
                  <Input value={data.name} onChange={e => updateField('name', e.target.value)} className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">Mensaje Secreto</Label>
                  <Input value={data.secretMessage} onChange={e => updateField('secretMessage', e.target.value)} placeholder="Lo que solo tú y yo sabemos..." className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold">Tu Mensaje Principal</Label>
                  <Textarea value={data.message} onChange={e => updateField('message', e.target.value)} className="min-h-[160px] bg-white/5 border-white/10 rounded-xl" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-3xl space-y-6 border-white/10 shadow-xl">
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Palette className="h-3 w-3 text-purple-400" /> Escenografía
                  </Label>
                  <select 
                    value={data.theme} 
                    onChange={e => updateField('theme', e.target.value as ThemeType)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm text-slate-200"
                  >
                    <option value="midnight-romance">🌑 Midnight Romance</option>
                    <option value="cinematic-love">🎬 Cinematic Love</option>
                    <option value="golden-hour">🌅 Golden Hour</option>
                    <option value="parchment">📜 Ancient Parchment</option>
                    <option value="luxury-white">💎 Luxury White</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-yellow-400" /> Partículas
                  </Label>
                  <select 
                    value={data.particles} 
                    onChange={e => updateField('particles', e.target.value as ParticleType)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm text-slate-200"
                  >
                    <option value="gold-dust">✨ Polvo Dorado</option>
                    <option value="hearts">💓 Corazones</option>
                    <option value="petals">🌸 Pétalos</option>
                    <option value="stars">⭐ Estrellas</option>
                  </select>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-8 border-white/10 shadow-xl">
                <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                  <Type className="h-4 w-4" /> Tipografía Volumétrica
                </Label>
                {[
                  { label: "Título", field: "titleFontSize", min: 20, max: 120 },
                  { label: "Nombre", field: "nameFontSize", min: 12, max: 80 },
                  { label: "Mensaje", field: "messageFontSize", min: 14, max: 48 },
                  { label: "Secreto", field: "secretFontSize", min: 40, max: 200 },
                ].map(item => (
                  <div key={item.field} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] text-slate-400 uppercase font-bold">{item.label}</Label>
                      <span className="text-[10px] text-pink-500 font-mono">{(data as any)[item.field]}px</span>
                    </div>
                    <Slider 
                      value={[(data as any)[item.field]]} 
                      min={item.min} max={item.max} step={1}
                      onValueChange={([val]) => updateField(item.field as any, val)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="glass-card p-6 rounded-3xl space-y-8 border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 pointer-events-none" />
                
                {/* Firma del Remitente */}
                <div className="space-y-6 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <PenTool className="h-4 w-4" /> La Firma Eterna
                  </Label>
                  <div className="space-y-4">
                    <Input
                      value={data.senderName}
                      onChange={e => updateField('senderName', e.target.value)}
                      placeholder="De: Mi corazón, siempre tuyo..."
                      className="bg-black/40 border-white/10 h-14 rounded-xl px-4 italic placeholder:text-slate-600"
                    />
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-slate-400 uppercase font-bold">Estilo Manuscrito</Label>
                        <p className="text-[8px] text-slate-500 italic">Simula el trazo de tinta real</p>
                      </div>
                      <Switch 
                        checked={data.senderIsCursive} 
                        onCheckedChange={val => updateField('senderIsCursive', val)}
                      />
                    </div>
                  </div>
                </div>

                {/* Fecha Memorable */}
                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Fecha de Nuestra Historia
                  </Label>
                  <div className="space-y-4">
                    <Input
                      type="date"
                      value={data.specialDate}
                      onChange={e => updateField('specialDate', e.target.value)}
                      className="bg-black/40 border-white/10 h-14 rounded-xl px-4 text-slate-200"
                    />
                    <div className="flex flex-wrap gap-2">
                      {['Hoy', 'Primer Beso', 'Aniversario'].map(chip => (
                        <Button 
                          key={chip}
                          variant="outline" 
                          className="h-8 text-[8px] uppercase tracking-widest border-white/10 bg-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 rounded-full"
                          onClick={() => {
                            const date = new Date().toISOString().split('T')[0];
                            updateField('specialDate', date);
                            updateField('showDate', true);
                          }}
                        >
                          {chip}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 px-2">
                       <Switch checked={data.showDate} onCheckedChange={val => updateField('showDate', val)} />
                       <span className="text-[10px] text-slate-400 uppercase font-bold">Mostrar fecha poéticamente</span>
                    </div>
                  </div>
                </div>

                {/* Intensidad de Explosión */}
                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <Volume2 className="h-4 w-4" /> Intensidad de Sentimientos
                  </Label>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                       <span className="text-[9px] text-slate-500 italic">{getIntensityLabel(data.confettiStrength)}</span>
                       <span className="text-[10px] font-mono text-pink-500">{data.confettiStrength}%</span>
                    </div>
                    <Slider 
                      value={[data.confettiStrength]} 
                      min={0} max={100} step={5}
                      onValueChange={([val]) => updateField('confettiStrength', val)}
                      className="premium-slider"
                    />
                  </div>
                </div>

                {/* Banda Sonora */}
                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <Youtube className="h-4 w-4" /> Banda Sonora (YouTube Link)
                  </Label>
                  <div className="space-y-3">
                    <Input
                      placeholder="Pega aquí el enlace de YouTube..."
                      value={data.youtubeId ? `https://www.youtube.com/watch?v=${data.youtubeId}` : ''}
                      onChange={e => handleYoutubeLink(e.target.value)}
                      className="bg-black/40 border-white/10 h-14 rounded-xl px-4"
                    />
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                         <Waves className="h-4 w-4 text-blue-400" />
                      </div>
                      <select 
                        value={data.ambientSound}
                        onChange={e => updateField('ambientSound', e.target.value as AmbientSoundType)}
                        className="bg-transparent text-[10px] uppercase font-bold tracking-widest outline-none text-slate-400 flex-1"
                      >
                        <option value="none">Sin Ambiente</option>
                        <option value="heartbeat">💓 Latidos Suaves</option>
                        <option value="rain">🌧️ Lluvia Romántica</option>
                        <option value="wind">🍃 Viento Nocturno</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <AdUnit slot="999888777" className="opacity-40" />

              <Button 
                onClick={() => {
                  const url = getSharableUrl(data);
                  navigator.clipboard.writeText(url);
                  toast({ title: "Enlace Eterno Copiado", description: "Envía esta magia ahora mismo." });
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 h-16 rounded-2xl shadow-xl shadow-pink-500/20 flex gap-3 uppercase tracking-[0.2em] font-black text-xs shimmer-btn"
              >
                <Share2 className="h-5 w-5" /> GENERAR ENLACE ETERNO
              </Button>
            </div>
          )}
        </div>

        <footer className="mt-8 pt-6 flex flex-col items-center gap-4 opacity-40 border-t border-white/5">
          <Link href="/privacy" className="text-[8px] uppercase tracking-widest hover:text-pink-500">Privacidad</Link>
          <div className="flex gap-6">
             <Monitor onClick={() => setIsMobileView(false)} className={cn("h-4 w-4 cursor-pointer", !isMobileView && "text-pink-500")} />
             <Smartphone onClick={() => setIsMobileView(true)} className={cn("h-4 w-4 cursor-pointer", isMobileView && "text-pink-500")} />
          </div>
          <p className="text-[7px] uppercase tracking-[0.4em] font-black">LoveLink Engine 2026</p>
        </footer>
      </div>

      <div className="flex-1 relative bg-[#01040f] flex items-center justify-center p-4 md:p-12 overflow-hidden">
        <div className={cn(
          "relative transition-all duration-700 ease-in-out shadow-2xl border border-white/5 overflow-hidden",
          isMobileView ? "w-[360px] h-[740px] rounded-[3rem]" : "w-full h-full max-w-6xl rounded-[2.5rem]"
        )}>
          <Viewer data={data} isPreview={true} />
        </div>
      </div>
    </div>
  );
}

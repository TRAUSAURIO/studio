"use client"

import React, { useState } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle, AmbientSoundType } from '@/lib/types';
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
  Music, Type, MessageSquare, Image as ImageIcon, User, 
  Calendar, Waves, Volume2, PenTool, Check
} from 'lucide-react';
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
        setData({
          ...DEFAULT_EXPERIENCE,
          ...template,
        });
        setIsTransitioning(false);
        toast({
          title: "Atmósfera Aplicada",
          description: `El escenario '${templateKey}' se ha configurado con éxito.`,
        });
      }, 500);
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

  const getIntensityLabel = (val: number) => {
    if (val < 20) return "Susurro";
    if (val < 40) return "Suave";
    if (val < 60) return "Medio";
    if (val < 80) return "Intenso";
    return "Tormenta de Amor";
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
                      onClick={() => loadTemplate(key)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all glass-card group relative overflow-hidden",
                        data.title === ROMANTIC_TEMPLATES[key].title ? "border-pink-500/50 bg-pink-500/10 ring-2 ring-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.1)]" : "border-white/5"
                      )}
                    >
                      <p className="text-[11px] font-black text-white capitalize mb-1">{key.replace('-', ' ')}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-pink-400 transition-colors">Curado</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/5">
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
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <User className="h-3 w-3 text-pink-500" /> Dedicado a
                  </Label>
                  <Input
                    value={data.name}
                    onChange={e => updateField('name', e.target.value)}
                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <ImageIcon className="h-3 w-3 text-blue-400" /> Imagen de Portada (URL)
                  </Label>
                  <Input
                    value={data.imageUrl}
                    placeholder="https://images.unsplash.com/..."
                    onChange={e => updateField('imageUrl', e.target.value)}
                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">✒️ Tu Mensaje</Label>
                  <Textarea
                    value={data.message}
                    onChange={e => updateField('message', e.target.value)}
                    className="min-h-[160px] bg-white/5 border-white/10 leading-relaxed resize-none rounded-xl text-sm p-4"
                  />
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
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-purple-500 transition-all text-slate-200"
                  >
                    <option value="midnight-romance">🌑 Midnight Romance</option>
                    <option value="cinematic-love">🎬 Cinematic Love</option>
                    <option value="golden-hour">🌅 Golden Hour</option>
                    <option value="starlit-night">🌌 Noche Estrellada</option>
                    <option value="rose-garden">🌹 Jardín de Rosas</option>
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
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-slate-200"
                  >
                    <option value="gold-dust">✨ Polvo Dorado</option>
                    <option value="hearts">💓 Corazones</option>
                    <option value="petals">🌸 Pétalos</option>
                    <option value="stars">⭐ Estrellas</option>
                    <option value="snow">❄️ Nieve</option>
                    <option value="glitter">💎 Brillos</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Type className="h-3 w-3 text-blue-400" /> Caligrafía
                  </Label>
                  <select 
                    value={data.fontStyle} 
                    onChange={e => updateField('fontStyle', e.target.value as FontStyle)}
                    className="w-full bg-black/40 border border-white/10 h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-200"
                  >
                    <option value="cursive">🖋️ Cursiva Elegante</option>
                    <option value="parchment">📜 Pergamino</option>
                    <option value="serif">🏛️ Serif Clásica</option>
                    <option value="cinematic">🎥 Cinematic</option>
                    <option value="clean">⚪ Limpio</option>
                  </select>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl space-y-8 border-white/10 shadow-xl">
                <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                  <Type className="h-4 w-4" /> Tamaños de Fuente
                </Label>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-slate-400 uppercase font-bold">Título</Label>
                    <span className="text-[10px] text-pink-500 font-mono">{data.titleFontSize}px</span>
                  </div>
                  <Slider 
                    value={[data.titleFontSize]} 
                    min={20} max={120} step={1}
                    onValueChange={([val]) => updateField('titleFontSize', val)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-slate-400 uppercase font-bold">Dedicado a</Label>
                    <span className="text-[10px] text-pink-500 font-mono">{data.nameFontSize}px</span>
                  </div>
                  <Slider 
                    value={[data.nameFontSize]} 
                    min={12} max={80} step={1}
                    onValueChange={([val]) => updateField('nameFontSize', val)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-slate-400 uppercase font-bold">Mensaje Principal</Label>
                    <span className="text-[10px] text-pink-500 font-mono">{data.messageFontSize}px</span>
                  </div>
                  <Slider 
                    value={[data.messageFontSize]} 
                    min={10} max={48} step={1}
                    onValueChange={([val]) => updateField('messageFontSize', val)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-slate-400 uppercase font-bold">Mensaje Secreto</Label>
                    <span className="text-[10px] text-pink-500 font-mono">{data.secretFontSize}px</span>
                  </div>
                  <Slider 
                    value={[data.secretFontSize]} 
                    min={40} max={300} step={2}
                    onValueChange={([val]) => updateField('secretFontSize', val)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-3xl space-y-8 border-white/10 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 pointer-events-none" />
                
                <div className="space-y-6 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <PenTool className="h-4 w-4" /> La Firma
                  </Label>
                  <div className="space-y-3">
                    <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                      De: Mi corazón, siempre tuyo…
                    </Label>
                    <Input
                      value={data.senderName}
                      onChange={e => updateField('senderName', e.target.value)}
                      placeholder="Tu nombre o pseudónimo..."
                      className="bg-black/40 border-white/10 h-14 rounded-xl px-4 italic focus:ring-2 focus:ring-pink-500/20"
                    />
                    {data.senderName && (
                      <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/5 animate-in fade-in slide-in-from-top-1">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Vista previa firma:</p>
                        <p className={cn(
                          "text-lg",
                          data.senderIsCursive ? "font-cursive text-pink-400" : "font-serif text-white"
                        )}>
                          {data.senderName}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <Label className="text-[11px] text-slate-300 font-bold flex items-center gap-2 cursor-pointer">
                      <Type className="h-4 w-4 text-purple-400" /> ¿Firma manuscrita?
                    </Label>
                    <Switch 
                      checked={data.senderIsCursive} 
                      onCheckedChange={checked => updateField('senderIsCursive', checked)} 
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Fecha Memorable
                  </Label>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 mb-4">
                    <Label className="text-[11px] text-slate-300 font-bold cursor-pointer">Mostrar fecha en la carta</Label>
                    <Switch 
                      checked={data.showDate} 
                      onCheckedChange={checked => updateField('showDate', checked)} 
                    />
                  </div>

                  {data.showDate && (
                    <div className="space-y-4 animate-in fade-in zoom-in-95">
                      <Input
                        type="date"
                        value={data.specialDate}
                        onChange={e => updateField('specialDate', e.target.value)}
                        className="bg-black/40 border-white/10 h-14 rounded-xl px-4 text-slate-200"
                      />
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Hoy', val: new Date().toISOString().split('T')[0] },
                          { label: 'Aniversario', val: data.specialDate },
                          { label: 'San Valentín', val: '2025-02-14' }
                        ].map((chip) => (
                          <button
                            key={chip.label}
                            onClick={() => updateField('specialDate', chip.val)}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest hover:bg-pink-500/10 hover:border-pink-500/30 transition-all"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-pink-400 font-medium italic text-center py-2 bg-pink-500/5 rounded-lg">
                        "Nuestro momento • {new Date(data.specialDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> La Revelación
                    </Label>
                    <span className="text-[10px] text-pink-500 font-mono font-bold bg-pink-500/10 px-2 py-1 rounded">
                      {data.confettiStrength}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                      <Heart className="h-3 w-3 text-red-500" /> Mensaje Secreto
                    </Label>
                    <Input
                      value={data.secretMessage}
                      onChange={e => updateField('secretMessage', e.target.value)}
                      placeholder="Lo que el alma susurra..."
                      className="bg-black/40 border-white/10 h-14 rounded-xl px-4 italic"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">
                      <span>Susurro</span>
                      <span className="text-pink-400">Tormenta de Amor</span>
                    </div>
                    <Slider 
                      value={[data.confettiStrength]} 
                      min={0} max={100} step={1}
                      onValueChange={([val]) => updateField('confettiStrength', val)}
                      className="premium-slider"
                    />
                    <p className="text-[9px] text-slate-500 text-center italic">
                      "{getIntensityLabel(data.confettiStrength)}: Una explosión {data.confettiStrength > 80 ? 'épica' : 'sutil'} de sentimientos."
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5 relative">
                  <Label className="text-[10px] uppercase tracking-[0.3em] text-pink-500/80 font-black flex items-center gap-2">
                    <Waves className="h-4 w-4" /> Ambiente Inmersivo
                  </Label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {(['none', 'heartbeat', 'rain', 'wind'] as const).map((sound) => (
                      <button
                        key={sound}
                        onClick={() => updateField('ambientSound', sound)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                          data.ambientSound === sound 
                            ? "border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.1)]" 
                            : "border-white/5 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            data.ambientSound === sound ? "bg-pink-500 animate-pulse" : "bg-slate-600"
                          )} />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                            {sound === 'none' && 'Silencio'}
                            {sound === 'heartbeat' && 'Latidos'}
                            {sound === 'rain' && 'Lluvia'}
                            {sound === 'wind' && 'Viento'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                    <Volume2 className="h-4 w-4 text-yellow-500 shrink-0" />
                    <p className="text-[8px] text-yellow-200/60 uppercase tracking-widest leading-relaxed">
                      El sonido se activará tras la primera interacción del destinatario por políticas de seguridad del navegador.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={copyUrl}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs h-16 rounded-2xl shadow-xl shadow-pink-500/30 flex gap-3 uppercase tracking-[0.2em] shimmer-btn"
                >
                  <Share2 className="h-5 w-5" /> GENERAR ENLACE ETERNO
                </Button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-8 pt-6 flex flex-col items-center gap-4 opacity-40 border-t border-white/5">
          <div className="flex gap-6">
             <Monitor onClick={() => setIsMobileView(false)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-all", !isMobileView && "text-pink-500 scale-110")} />
             <Smartphone onClick={() => setIsMobileView(true)} className={cn("h-4 w-4 cursor-pointer hover:text-pink-500 transition-all", isMobileView && "text-pink-500 scale-110")} />
          </div>
          <p className="text-[7px] uppercase tracking-[0.4em] font-black text-center">LoveLink Engine • Premium 2026</p>
        </footer>
      </div>

      <div className="flex-1 relative bg-[#01040f] flex items-center justify-center p-4 md:p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 pointer-events-none" />
        
        <div className={cn(
          "relative transition-all duration-700 ease-in-out shadow-2xl border border-white/5 overflow-hidden flex items-center justify-center",
          isMobileView ? "w-[360px] h-[740px] rounded-[3rem]" : "w-full h-full max-w-6xl rounded-[2.5rem]",
          isTransitioning && "scale-95 opacity-50 blur-sm"
        )}>
          <Viewer data={data} isPreview={true} />
        </div>
      </div>
    </div>
  );
}

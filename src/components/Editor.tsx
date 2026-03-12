"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { ROMANTIC_TEMPLATES } from '@/lib/templates';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Share2, Eye, Music, Sparkles, Wand2, Monitor, Smartphone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';
import { cn } from '@/lib/utils';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [showPreview, setShowPreview] = useState(false);
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
        description: `Se ha aplicado el diseño '${templateKey}' con éxito.`,
      });
    }
  };

  const copyUrl = () => {
    const url = getSharableUrl(data);
    navigator.clipboard.writeText(url);
    toast({
      title: "Enlace Eterno Generado",
      description: "La URL ha sido copiada al portapapeles.",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Editor (40%) */}
      <div className="w-full md:w-[420px] lg:w-[480px] p-6 md:p-8 overflow-y-auto h-screen border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl z-50">
        <header className="mb-10 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-700 rounded-xl shadow-xl shadow-pink-500/10">
            <Heart className="h-6 w-6 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">LoveLink</h1>
            <p className="text-[9px] text-pink-400 uppercase tracking-[0.4em] font-medium">Emotion Engine v2026</p>
          </div>
        </header>

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full bg-black/20 p-1 rounded-lg">
            <TabsTrigger value="content" className="text-xs uppercase tracking-widest py-2">Contenido</TabsTrigger>
            <TabsTrigger value="visual" className="text-xs uppercase tracking-widest py-2">Visual</TabsTrigger>
            <TabsTrigger value="extra" className="text-xs uppercase tracking-widest py-2">Extra</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-4">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Escenografías Curadas</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(ROMANTIC_TEMPLATES).map((key) => (
                  <button
                    key={key}
                    onClick={() => loadTemplate(key)}
                    className={cn(
                      "p-4 rounded-xl border transition-all text-left group relative overflow-hidden",
                      data.title === ROMANTIC_TEMPLATES[key].title 
                        ? "bg-pink-500/10 border-pink-500/50 shadow-lg shadow-pink-500/5" 
                        : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                    )}
                  >
                    <p className="text-[11px] font-bold capitalize text-white mb-0.5">{key.replace('-', ' ')}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Diseño Curado</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <Label className="text-xs text-slate-400">Título de la Obra</Label>
                <Input
                  value={data.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="Nuestra Eternidad..."
                  className="bg-black/20 border-white/10 h-12 focus:border-pink-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-400">Destinatario</Label>
                <Input
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                  placeholder="Su nombre..."
                  className="bg-black/20 border-white/10 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-400">Mensaje Literario</Label>
                <Textarea
                  value={data.message}
                  onChange={e => updateField('message', e.target.value)}
                  placeholder="Escribe desde el alma..."
                  className="min-h-[180px] bg-black/20 border-white/10 leading-relaxed resize-none"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Atmósfera Cromática</Label>
              <Select value={data.theme} onValueChange={v => updateField('theme', v as ThemeType)}>
                <SelectTrigger className="bg-black/20 border-white/10 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cinematic-love">🎬 Cinematic Love</SelectItem>
                  <SelectItem value="luxury-white">💎 Luxury White</SelectItem>
                  <SelectItem value="midnight-romance">🌑 Midnight Romance</SelectItem>
                  <SelectItem value="golden-hour">🌅 Golden Hour</SelectItem>
                  <SelectItem value="deep-passion">🌹 Deep Passion</SelectItem>
                  <SelectItem value="starlight-indigo">🌌 Starlight Indigo</SelectItem>
                  <SelectItem value="parchment">📜 Ancient Parchment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Partículas de Ambiente</Label>
              <Select value={data.particles} onValueChange={v => updateField('particles', v as ParticleType)}>
                <SelectTrigger className="bg-black/20 border-white/10 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petals">Pétalos de Rosa</SelectItem>
                  <SelectItem value="hearts">Corazones Pulsantes</SelectItem>
                  <SelectItem value="stars">Estrellas Twinkling</SelectItem>
                  <SelectItem value="glitter">Polvo Dorado</SelectItem>
                  <SelectItem value="snow">Nieve Cinematic</SelectItem>
                  <SelectItem value="sparks">Chispas de Luz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Tipografía de la Carta</Label>
              <Select value={data.fontStyle} onValueChange={v => updateField('fontStyle', v as FontStyle)}>
                <SelectTrigger className="bg-black/20 border-white/10 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cursive">Escritura a Mano Elegante</SelectItem>
                  <SelectItem value="serif">Serif Clásica (Playfair)</SelectItem>
                  <SelectItem value="sans">Minimalista Moderno</SelectItem>
                  <SelectItem value="mono">Vintage Typewriter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="extra" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Mensaje Secreto (Revelación)</Label>
              <Input
                value={data.secretMessage}
                onChange={e => updateField('secretMessage', e.target.value)}
                placeholder="Un último detalle impactante..."
                className="bg-black/20 border-white/10 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Banda Sonora (YouTube ID)</Label>
              <Input
                value={data.youtubeId}
                onChange={e => updateField('youtubeId', e.target.value)}
                placeholder="ID de Video..."
                className="bg-black/20 border-white/10 h-12"
              />
            </div>

            <div className="pt-6">
              <Button 
                onClick={copyUrl}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold h-14 shadow-2xl shadow-pink-600/20 active:scale-95 transition-all"
              >
                GENERAR ENLACE ETERNO
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-auto pt-10 flex items-center justify-between opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-[0.5em]">Emotion Engine ©2026</p>
          <div className="flex gap-4">
             <button onClick={() => setIsMobileView(false)}><Monitor className={cn("h-4 w-4", !isMobileView && "text-pink-500")} /></button>
             <button onClick={() => setIsMobileView(true)}><Smartphone className={cn("h-4 w-4", isMobileView && "text-pink-500")} /></button>
          </div>
        </footer>
      </div>

      {/* Main Preview Area (60%) */}
      <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-4 md:p-12">
        <div className={cn(
          "relative transition-all duration-700 ease-in-out shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden",
          isMobileView ? "w-[375px] h-[667px] rounded-[3rem]" : "w-full h-full max-w-5xl rounded-[2.5rem]"
        )}>
          <Viewer data={data} isPreview={true} />
          
          <div className="absolute top-6 right-6 z-50 flex gap-2">
             <Button
               variant="secondary"
               size="sm"
               className="rounded-full bg-black/40 backdrop-blur-md text-white border-white/10"
               onClick={() => setShowPreview(!showPreview)}
             >
               {showPreview ? "Cerrar Preview" : "Ver Película"}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

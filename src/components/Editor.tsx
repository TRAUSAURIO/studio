"use client"

import React, { useState } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { ROMANTIC_TEMPLATES } from '@/lib/templates';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Share2, Eye, Music, Sparkles, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';
import { cn } from '@/lib/utils';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof ExperienceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadTemplate = (templateKey: string) => {
    const template = ROMANTIC_TEMPLATES[templateKey];
    if (template) {
      setData(template);
      toast({
        title: "Plantilla Aplicada",
        description: "Hemos cargado el diseño y el copy emocional.",
      });
    }
  };

  const copyUrl = () => {
    const url = getSharableUrl(data);
    navigator.clipboard.writeText(url);
    toast({
      title: "¡Enlace Mágico Copiado!",
      description: "Compártelo ahora con esa persona especial.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Editor */}
      <div className="w-full md:w-[480px] p-6 md:p-8 overflow-y-auto h-screen border-r border-slate-800 bg-slate-900/80 backdrop-blur-2xl">
        <header className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-700 rounded-xl shadow-xl shadow-pink-500/20">
            <Heart className="h-6 w-6 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">LoveLink</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">Cinematic Experiences v2026</p>
          </div>
        </header>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-slate-800/50 p-1">
            <TabsTrigger value="templates" title="Plantillas"><Wand2 className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="settings">Extra</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <Label className="text-slate-400 uppercase text-[10px] tracking-widest">Selecciona una Escenografía</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(ROMANTIC_TEMPLATES).map((key) => (
                <button
                  key={key}
                  onClick={() => loadTemplate(key)}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800 transition-all text-left group"
                >
                  <Sparkles className="h-4 w-4 text-pink-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xs font-semibold capitalize">{key.replace('-', ' ')}</p>
                  <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">Diseño Curado</p>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-2">
              <Label>Título de la Experiencia</Label>
              <Input
                value={data.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="Ej: Nuestra Eternidad..."
                className="bg-slate-800 border-slate-700 focus:ring-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Nombre del Destinatario</Label>
              <Input
                value={data.name}
                onChange={e => updateField('name', e.target.value)}
                placeholder="Su nombre..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Mensaje Emocional</Label>
              <Textarea
                value={data.message}
                onChange={e => updateField('message', e.target.value)}
                placeholder="Deja que tu corazón hable..."
                className="min-h-[180px] bg-slate-800 border-slate-700 focus:ring-pink-500 leading-relaxed"
              />
              <p className="text-[10px] text-slate-500 italic">El mensaje aparecerá con el efecto "Ink Reveal".</p>
            </div>

            <div className="space-y-2">
              <Label>Revelación Final (El Secreto)</Label>
              <Input
                value={data.secretMessage}
                onChange={e => updateField('secretMessage', e.target.value)}
                placeholder="Un último detalle impactante..."
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            <div className="space-y-2">
              <Label>Atmósfera</Label>
              <Select value={data.theme} onValueChange={v => updateField('theme', v as ThemeType)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cinematic-love">🎬 Cinematic Love (Gold & Indigo)</SelectItem>
                  <SelectItem value="golden-hour">🌅 Golden Hour (Sunset Vibes)</SelectItem>
                  <SelectItem value="midnight-romance">🌑 Midnight Romance (Deep Blue)</SelectItem>
                  <SelectItem value="parchment">📜 Parchment (Antiguo)</SelectItem>
                  <SelectItem value="golden-roses">🌹 Golden Roses</SelectItem>
                  <SelectItem value="love-galaxy">🌌 Love Galaxy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Partículas de Ambiente</Label>
              <Select value={data.particles} onValueChange={v => updateField('particles', v as ParticleType)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hearts">Corazones Pulsantes</SelectItem>
                  <SelectItem value="stars">Estrellas Twinkling</SelectItem>
                  <SelectItem value="petals">Pétalos Realistas</SelectItem>
                  <SelectItem value="snow">Nieve Cinematic</SelectItem>
                  <SelectItem value="glitter">Polvo Dorado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipografía Cinematográfica</Label>
              <Select value={data.fontStyle} onValueChange={v => updateField('fontStyle', v as FontStyle)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cursive">Escritura a Mano Elegante</SelectItem>
                  <SelectItem value="serif">Serif Dramática (Playfair)</SelectItem>
                  <SelectItem value="sans">Minimalista Moderno</SelectItem>
                  <SelectItem value="mono">Vintage Typewriter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-2">
              <Label>Banda Sonora (YouTube ID)</Label>
              <Input
                value={data.youtubeId}
                onChange={e => updateField('youtubeId', e.target.value)}
                placeholder="ID de YouTube..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 mt-8 overflow-hidden">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-pink-400" /> Compartir Emoción
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold h-12 shadow-lg shadow-pink-600/20 transition-all active:scale-95" onClick={copyUrl}>
                  GENERAR ENLACE ETERNO
                </Button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                  Toda la información se codifica en la URL.<br/>Privacidad total, emoción garantizada.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative bg-[#020617] overflow-hidden group">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
           <Button
            variant="secondary"
            className="rounded-full shadow-2xl opacity-80 group-hover:opacity-100 transition-all bg-black/60 text-white border-white/10 backdrop-blur-md px-6"
            onClick={() => setShowPreview(!showPreview)}
           >
            {showPreview ? <><Music className="mr-2 h-4 w-4" /> Resetear Vista</> : <><Eye className="mr-2 h-4 w-4" /> Previsualizar Película</>}
           </Button>
        </div>

        <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
          <div className="w-full h-full max-w-7xl rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black relative border border-white/10">
             <Viewer data={data} isPreview={true} />
             
             {/* Dynamic Overlay Hint */}
             {!showPreview && (
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-white text-xs uppercase tracking-[0.8em] font-light">Modo Edición</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

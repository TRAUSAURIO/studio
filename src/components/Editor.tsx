"use client"

import React, { useState, useEffect } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Share2, Eye, Sparkles, Music, Type } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Viewer } from './Viewer';

export function Editor() {
  const [data, setData] = useState<ExperienceData>(DEFAULT_EXPERIENCE);
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof ExperienceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const copyUrl = () => {
    const url = getSharableUrl(data);
    navigator.clipboard.writeText(url);
    toast({
      title: "¡Enlace copiado!",
      description: "Ahora puedes enviarlo a esa persona especial.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Editor */}
      <div className="w-full md:w-[450px] p-6 md:p-8 overflow-y-auto h-screen border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <header className="mb-8 flex items-center gap-3">
          <div className="p-2 bg-pink-500 rounded-lg shadow-lg shadow-pink-500/20">
            <Heart className="h-6 w-6 text-white fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">EternalPage</h1>
        </header>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-slate-800/50">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="settings">Extra</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-2">
              <Label>Título Principal</Label>
              <Input
                value={data.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="Escribe un título..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Nombre de la persona</Label>
              <Input
                value={data.name}
                onChange={e => updateField('name', e.target.value)}
                placeholder="Su nombre..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Mensaje Principal</Label>
              <Textarea
                value={data.message}
                onChange={e => updateField('message', e.target.value)}
                placeholder="Escribe tus palabras aquí..."
                className="min-h-[120px] bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Mensaje Secreto (aparece al final)</Label>
              <Input
                value={data.secretMessage}
                onChange={e => updateField('secretMessage', e.target.value)}
                placeholder="Un último detalle..."
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-6">
            <div className="space-y-2">
              <Label>Tema Visual</Label>
              <Select value={data.theme} onValueChange={v => updateField('theme', v as ThemeType)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starry-night">Noche Estrellada</SelectItem>
                  <SelectItem value="rose-garden">Jardín de Rosas</SelectItem>
                  <SelectItem value="aurora">Aurora Romántica</SelectItem>
                  <SelectItem value="galaxy">Galaxia de Amor</SelectItem>
                  <SelectItem value="minimalist">Minimalista Elegante</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Partículas</Label>
              <Select value={data.particles} onValueChange={v => updateField('particles', v as ParticleType)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hearts">Corazones</SelectItem>
                  <SelectItem value="stars">Estrellas</SelectItem>
                  <SelectItem value="petals">Pétalos</SelectItem>
                  <SelectItem value="snow">Copo de Nieve</SelectItem>
                  <SelectItem value="glitter">Brillos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estilo de Fuente</Label>
              <Select value={data.fontStyle} onValueChange={v => updateField('fontStyle', v as FontStyle)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serif">Elegante (Serif)</SelectItem>
                  <SelectItem value="sans">Limpio (Sans)</SelectItem>
                  <SelectItem value="mono">Máquina de Escribir</SelectItem>
                  <SelectItem value="cursive">Manuscrito (Cursiva)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-2">
              <Label>ID de Video YouTube (Música)</Label>
              <div className="flex gap-2">
                <Input
                  value={data.youtubeId}
                  onChange={e => updateField('youtubeId', e.target.value)}
                  placeholder="ID del video..."
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <p className="text-xs text-slate-400">Pega el ID que aparece después de v= en el enlace de YouTube.</p>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mt-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Compartir Experiencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" onClick={copyUrl}>
                  Generar enlace único
                </Button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                  Sin bases de datos • Privacidad total • Solo tu enlace
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-auto pt-8 border-t border-slate-800 hidden md:block">
          <p className="text-xs text-slate-500 italic">"Las mejores cosas se comparten directamente."</p>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden group">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
           <Button
            variant="secondary"
            className="rounded-full shadow-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowPreview(!showPreview)}
           >
            {showPreview ? <><Music className="mr-2 h-4 w-4" /> Detener Previsualización</> : <><Eye className="mr-2 h-4 w-4" /> Previsualizar Pantalla Completa</>}
           </Button>
        </div>

        {/* Real-time small preview or full viewer depending on screen size / preference */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-full h-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl shadow-black/50 bg-black relative">
             <Viewer data={data} isPreview={true} />
          </div>
        </div>

        {/* Mobile preview toggle overlay if needed, but the current layout is good */}
      </div>
    </div>
  );
}

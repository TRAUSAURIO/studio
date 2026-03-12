"use client"

import React, { useState } from 'react';
import { ExperienceData, DEFAULT_EXPERIENCE, ThemeType, ParticleType, FontStyle } from '@/lib/types';
import { getSharableUrl } from '@/lib/encoding';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Share2, Eye, Music } from 'lucide-react';
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
              <Label>Título de la Carta</Label>
              <Input
                value={data.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="Escribe un título..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Nombre de tu Persona Especial</Label>
              <Input
                value={data.name}
                onChange={e => updateField('name', e.target.value)}
                placeholder="Su nombre..."
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Mensaje de Amor (con pausa dramática)</Label>
              <Textarea
                value={data.message}
                onChange={e => updateField('message', e.target.value)}
                placeholder="Escribe tus palabras aquí..."
                className="min-h-[150px] bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Frase Final (El Secreto)</Label>
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
              <Label>Escenografía Cinematográfica</Label>
              <Select value={data.theme} onValueChange={v => updateField('theme', v as ThemeType)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parchment">📜 Pergamino con Sello de Cera</SelectItem>
                  <SelectItem value="golden-roses">🌹 Marco de Rosas Doradas</SelectItem>
                  <SelectItem value="love-galaxy">🌌 Galaxia Amorosa</SelectItem>
                  <SelectItem value="minimal-glow">✨ Minimalismo Neón</SelectItem>
                  <SelectItem value="vintage-ink">🖋 Vintage Tinta Azul</SelectItem>
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
                  <SelectItem value="hearts">Corazones Voladores</SelectItem>
                  <SelectItem value="stars">Estrellas Fugaces</SelectItem>
                  <SelectItem value="petals">Pétalos Caídos</SelectItem>
                  <SelectItem value="snow">Nieve Suave</SelectItem>
                  <SelectItem value="glitter">Brillo Mágico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipografía</Label>
              <Select value={data.fontStyle} onValueChange={v => updateField('fontStyle', v as FontStyle)}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cursive">Escritura a Mano (Recomendado)</SelectItem>
                  <SelectItem value="serif">Elegante Clásico</SelectItem>
                  <SelectItem value="sans">Moderno Limpio</SelectItem>
                  <SelectItem value="mono">Máquina de Escribir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-2">
              <Label>ID de Música (YouTube)</Label>
              <Input
                value={data.youtubeId}
                onChange={e => updateField('youtubeId', e.target.value)}
                placeholder="ID de YouTube..."
                className="bg-slate-800 border-slate-700"
              />
              <p className="text-[10px] text-slate-500 italic">Recomendamos: L_jWHffIx5E (Romantic Lofi)</p>
            </div>

            <Card className="bg-slate-800/30 border-slate-700 mt-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Generar Carta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold" onClick={copyUrl}>
                  OBTENER ENLACE MÁGICO
                </Button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest leading-relaxed">
                  Tu carta se codifica en el enlace.<br/>Nadie más puede verla sin él.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden group">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
           <Button
            variant="secondary"
            className="rounded-full shadow-2xl opacity-70 group-hover:opacity-100 transition-opacity bg-black/50 text-white border-white/10"
            onClick={() => setShowPreview(!showPreview)}
           >
            {showPreview ? <><Music className="mr-2 h-4 w-4" /> Parar</> : <><Eye className="mr-2 h-4 w-4" /> Previsualizar</>}
           </Button>
        </div>

        <div className="w-full h-full flex items-center justify-center p-2 md:p-8">
          <div className="w-full h-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl shadow-black/80 bg-black relative border border-white/5">
             <Viewer data={data} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

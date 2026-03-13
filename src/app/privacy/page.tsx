import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 md:p-24 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver a LoveLink
        </Link>
        
        <header className="space-y-4 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold text-white font-headline tracking-tighter">Política de Privacidad</h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest">Última actualización: Mayo 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Información Legal</h2>
            <p>LoveLink es una plataforma estática que genera experiencias románticas basadas en parámetros codificados en la URL. No almacenamos sus mensajes ni imágenes en bases de datos externas.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Uso de Cookies y AdSense</h2>
            <p>Este sitio utiliza Google AdSense para mostrar anuncios. Google, como proveedor tercero, utiliza cookies para mostrar anuncios basados en las visitas anteriores del usuario a este sitio web o a otros sitios web.</p>
            <p>El uso de cookies de publicidad permite a Google y a sus socios mostrar anuncios basados en las visitas realizadas por los usuarios a sus sitios o a otros sitios de Internet.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Publicidad Personalizada</h2>
            <p>Los usuarios pueden inhabilitar la publicidad personalizada consultando la <Link href="https://www.google.com/settings/ads" className="text-blue-400 underline">Configuración de anuncios</Link>.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Protección de Datos</h2>
            <p>Toda la información que usted introduce en el editor se codifica localmente en su navegador para generar el enlace compartido. LoveLink no tiene acceso a estos datos privados.</p>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/10 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          LoveLink • Experiencias Digitales de Confianza
        </footer>
      </div>
    </div>
  );
}

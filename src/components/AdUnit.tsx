"use client"

import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Componente premium para unidades de AdSense.
 * Maneja la inicialización segura en React para evitar errores de hidratación.
 */
export function AdUnit({ slot, format = 'auto', className, style }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container my-8 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client="ca-pub-4736226727290201"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <style jsx>{`
        .ad-container {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .ad-container::before {
          content: 'ANUNCIO';
          position: absolute;
          top: -10px;
          left: 10px;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 2px;
          background: #020617;
          padding: 0 5px;
        }
      `}</style>
    </div>
  );
}

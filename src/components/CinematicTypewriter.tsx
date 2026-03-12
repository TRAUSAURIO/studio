"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

interface CinematicTypewriterProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

/**
 * CinematicTypewriter - Un efecto de máquina de escribir ultra romántico
 * con velocidad variable, partículas de corazones y cursor dorado.
 */
export function CinematicTypewriter({ text, onComplete, className }: CinematicTypewriterProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Referencias para la lógica de tiempo y requestAnimationFrame
  const requestRef = useRef<number>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const currentDelayRef = useRef<number>(150); // Delay inicial lento

  // Función para crear partículas de corazones al terminar una palabra
  const spawnHearts = useCallback((x: number, y: number) => {
    const newHearts: Heart[] = Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map(() => ({
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 40,
      y: y,
      size: Math.random() * 10 + 10,
      rotation: (Math.random() - 0.5) * 45
    }));
    setHearts(prev => [...prev, ...newHearts]);
    
    // Limpiar corazones después de que termine la animación
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)));
    }, 3000);
  }, []);

  const animate = (time: number) => {
    if (!lastUpdateTimeRef.current) lastUpdateTimeRef.current = time;
    const deltaTime = time - lastUpdateTimeRef.current;

    if (deltaTime >= currentDelayRef.current && currentIndex < text.length) {
      const char = text[currentIndex];
      
      setDisplayedText(prev => [...prev, char]);
      setCurrentIndex(prev => prev + 1);
      
      // Lógica de aceleración: Empezamos lento y aceleramos suavemente
      // hasta un mínimo de 30ms por carácter.
      if (currentDelayRef.current > 35) {
        currentDelayRef.current -= 4;
      }

      // Si es el final de una palabra o signo de puntuación, disparamos corazones
      if (char === ' ' || char === '.' || char === '!' || char === '?') {
        const cursorElement = containerRef.current?.querySelector('.cinematic-cursor');
        if (cursorElement) {
          const rect = cursorElement.getBoundingClientRect();
          const parentRect = containerRef.current?.getBoundingClientRect();
          if (parentRect) {
            spawnHearts(rect.left - parentRect.left, rect.top - parentRect.top);
          }
        }
        // Pausa dramática en puntuación
        if (char !== ' ') currentDelayRef.current += 100;
      }

      lastUpdateTimeRef.current = time;
    }

    if (currentIndex < text.length) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [currentIndex, text]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Sistema de Partículas de Corazones */}
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="floating-heart text-pink-400 fill-current opacity-60"
          style={{
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      {/* Renderizado de letras con animación individual */}
      <span className="relative">
        {displayedText.map((char, i) => (
          <span key={i} className="letter-appear">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {currentIndex < text.length && <span className="cinematic-cursor" />}
      </span>
    </div>
  );
}

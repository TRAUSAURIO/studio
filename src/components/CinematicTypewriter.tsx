"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface CinematicTypewriterProps {
  text: string;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CinematicTypewriter({ text, onComplete, className, style }: CinematicTypewriterProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const requestRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const currentDelayRef = useRef<number>(180);

  const spawnHearts = useCallback((x: number, y: number) => {
    const newHearts: Heart[] = Array.from({ length: 3 }).map(() => ({
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
      size: Math.random() * 12 + 8,
    }));
    setHearts(prev => [...prev, ...newHearts]);
    
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
      
      if (currentDelayRef.current > 40) {
        currentDelayRef.current -= 4;
      }

      if (['.', '!', '?', ',', ';'].includes(char)) {
        currentDelayRef.current += 500;
        
        const cursor = containerRef.current?.querySelector('.cinematic-cursor');
        if (cursor) {
          const rect = cursor.getBoundingClientRect();
          const parentRect = containerRef.current?.getBoundingClientRect();
          if (parentRect) {
            spawnHearts(rect.left - parentRect.left, rect.top - parentRect.top);
          }
        }
      } else if (char === ' ') {
        currentDelayRef.current += 80;
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
  }, [currentIndex, text, onComplete]);

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full", className)} style={style}>
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="floating-heart text-pink-500 fill-current opacity-60 blur-[1px] absolute pointer-events-none"
          style={{
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
            animation: 'float 3s ease-out forwards'
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      <span className="relative inline-block w-full">
        {displayedText.map((char, i) => (
          <span 
            key={i} 
            className="ink-reveal-char relative"
            style={{ animationDelay: `${i * 5}ms` }}
          >
            <span className="relative">
               {char === ' ' ? '\u00A0' : char}
               <span className="absolute inset-0 blur-[6px] opacity-20 text-romantic-accent pointer-events-none">
                 {char === ' ' ? '' : char}
               </span>
            </span>
          </span>
        ))}
        {currentIndex < text.length && (
          <span className="cinematic-cursor w-[3px] h-[1.1em] bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,1)] absolute inline-block ml-1 animate-pulse align-middle" />
        )}
      </span>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

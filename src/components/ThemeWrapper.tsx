"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import { THEMES } from '@/lib/themes';
import { ThemeType, FontStyle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ThemeWrapperProps {
  theme: ThemeType;
  fontStyle: FontStyle;
  children: ReactNode;
  className?: string;
}

export function ThemeWrapper({ theme, fontStyle, children, className }: ThemeWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = THEMES[theme];

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
    cursive: 'font-cursive',
  }[fontStyle];

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-1000 ease-in-out flex items-center justify-center p-4",
        fontClass,
        className
      )}
      style={{
        background: colors.background,
        color: colors.text,
        '--romantic-primary': colors.primary,
        '--romantic-accent': colors.accent,
      } as React.CSSProperties}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap');
        :root {
          --romantic-primary: ${colors.primary};
          --romantic-accent: ${colors.accent};
        }
        .font-cursive {
          font-family: 'Great Vibes', cursive;
        }
      `}</style>
      
      {/* El Sobre/Carta */}
      <div className={cn(
        "w-full max-w-4xl transition-all duration-1000",
        isOpen ? "envelope-open-anim" : "opacity-0 scale-95"
      )}>
        {children}
      </div>
    </div>
  );
}

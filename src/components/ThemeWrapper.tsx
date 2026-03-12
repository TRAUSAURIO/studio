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
  const [mounted, setMounted] = useState(false);
  const colors = THEMES[theme];

  useEffect(() => {
    setMounted(true);
  }, []);

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
    cursive: 'font-cursive',
  }[fontStyle];

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-1000 ease-in-out flex items-center justify-center p-6 relative overflow-hidden",
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
      {/* Background Overlay for Cinematic Themes */}
      {colors.overlay && (
        <div className="fixed inset-0 pointer-events-none z-0" style={{ background: colors.overlay }} />
      )}
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap');
        :root {
          --romantic-primary: ${colors.primary};
          --romantic-accent: ${colors.accent};
        }
        .font-cursive {
          font-family: 'Great Vibes', cursive;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="w-full max-w-6xl relative z-10">
        {children}
      </div>
    </div>
  );
}

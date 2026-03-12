"use client"

import React, { ReactNode } from 'react';
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
  const colors = THEMES[theme];

  const fontClass = {
    serif: 'font-serif italic',
    sans: 'font-sans',
    mono: 'font-mono',
    cursive: 'font-cursive',
  }[fontStyle];

  return (
    <div
      className={cn("min-h-screen transition-all duration-1000 ease-in-out", fontClass, className)}
      style={{
        background: colors.background,
        color: colors.text,
        '--romantic-primary': colors.primary,
        '--romantic-accent': colors.accent,
      } as React.CSSProperties}
    >
      <style jsx global>{`
        :root {
          --romantic-primary: ${colors.primary};
          --romantic-accent: ${colors.accent};
        }
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
      {children}
    </div>
  );
}

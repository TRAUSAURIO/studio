"use client"

import React, { useEffect, useRef } from 'react';
import { ParticleType } from '@/lib/types';

interface ParticleCanvasProps {
  type: ParticleType;
}

export function ParticleCanvas({ type }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      waveOffset: number;

      constructor() {
        this.reset();
        this.y = Math.random() * canvas!.height;
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = -20;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = Math.random() * 0.5 + 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.waveOffset = Math.random() * Math.PI * 2;
        this.color = this.getColor();
      }

      getColor() {
        const p = Math.random();
        switch (type) {
          case 'petals':
            return p > 0.5 ? '#fb7185' : '#e11d48';
          case 'hearts':
            return p > 0.5 ? '#f472b6' : '#ec4899';
          case 'stars':
            return '#ffffff';
          case 'snow':
            return '#f1f5f9';
          case 'gold-dust':
            return '#fbbf24';
          case 'glitter':
            return '#38bdf8';
          case 'sparks':
            return '#fdba74';
          default:
            return '#ffffff';
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (type === 'petals') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 1.5, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'hearts') {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size, -this.size, -this.size * 2, this.size / 3, 0, this.size);
          ctx.bezierCurveTo(this.size * 2, this.size / 3, this.size, -this.size, 0, 0);
          ctx.fill();
        } else if (type === 'stars' || type === 'gold-dust') {
          const s = this.size * (1 + Math.sin(Date.now() * 0.005 + this.waveOffset) * 0.4);
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos((i * 90) / 180 * Math.PI) * s, Math.sin((i * 90) / 180 * Math.PI) * s);
            ctx.lineTo(Math.cos((45 + i * 90) / 180 * Math.PI) * s * 0.3, Math.sin((45 + i * 90) / 180 * Math.PI) * s * 0.3);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      update() {
        const drift = Math.sin(Date.now() * 0.001 + this.waveOffset) * 0.5;
        this.x += this.speedX + drift;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas!.height + 20) {
          this.reset();
        }
        if (this.x > canvas!.width + 20) this.x = -20;
        if (this.x < -20) this.x = canvas!.width + 20;
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 100);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

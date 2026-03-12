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
    let particles: any[] = [];

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
      color: string;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = this.getColor();
      }

      getColor() {
        switch (type) {
          case 'hearts': return `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${this.opacity})`;
          case 'stars': return `rgba(255, 255, ${Math.random() * 100 + 155}, ${this.opacity})`;
          case 'petals': return `rgba(255, ${Math.random() * 50 + 150}, ${Math.random() * 50 + 150}, ${this.opacity})`;
          case 'snow': return `rgba(255, 255, 255, ${this.opacity})`;
          case 'glitter': return `rgba(255, 215, 0, ${this.opacity})`;
          default: return `rgba(255, 255, 255, ${this.opacity})`;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (type === 'hearts') {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size, -this.size, -this.size * 2, this.size / 3, 0, this.size);
          ctx.bezierCurveTo(this.size * 2, this.size / 3, this.size, -this.size, 0, 0);
          ctx.fill();
        } else if (type === 'stars') {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * this.size,
                      -Math.sin((18 + i * 72) / 180 * Math.PI) * this.size);
            ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * this.size * 0.5,
                      -Math.sin((54 + i * 72) / 180 * Math.PI) * this.size * 0.5);
          }
          ctx.closePath();
          ctx.fill();
        } else if (type === 'petals') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas!.height) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
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

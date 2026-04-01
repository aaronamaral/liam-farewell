"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "star" | "heart";
}

const COLORS = [
  "#F59E0B",
  "#F97316",
  "#EF4444",
  "#EC4899",
  "#D946EF",
  "#FBBF24",
  "#FB923C",
];

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 40;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const shapes: Particle["shape"][] = ["circle", "star", "heart"];
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * -0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) {
      ctx.beginPath();
      const s = size * 0.6;
      ctx.moveTo(x, y + s * 0.3);
      ctx.bezierCurveTo(x, y - s * 0.3, x - s, y - s * 0.3, x - s, y + s * 0.1);
      ctx.bezierCurveTo(x - s, y + s * 0.6, x, y + s, x, y + s);
      ctx.bezierCurveTo(x, y + s, x + s, y + s * 0.6, x + s, y + s * 0.1);
      ctx.bezierCurveTo(x + s, y - s * 0.3, x, y - s * 0.3, x, y + s * 0.3);
      ctx.fill();
    }

    function drawStar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          drawStar(ctx, 0, 0, p.size);
        } else {
          drawHeart(ctx, 0, 0, p.size);
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

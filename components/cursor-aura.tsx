"use client";

import { useEffect, useRef } from "react";

const FOLLOW_EASING = 0.22;
const HEADER_ACTIVE_HEIGHT = 220;
const CANVAS_SIZE = 360;
const HALF = CANVAS_SIZE / 2;
const MAX_HISTORY = 18;
const MAX_PARTICLES = 12;
const EMIT_INTERVAL_MS = 34;

type TrailPoint = {
  t: number;
  x: number;
  y: number;
};

type Particle = {
  life: number;
  maxLife: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

export function CursorAura() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shell || !canvas || !ctx || !hasFinePointer || reducedMotion) {
      return;
    }

    let rafId = 0;
    let lastEmit = 0;
    let visible = false;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let dpr = 1;
    let smoothedSpeed = 0;
    let lastAngle = -Math.PI / 3;

    const target = { x: viewportWidth * 0.5, y: viewportHeight * 0.25 };
    const current = { x: target.x, y: target.y };

    let trail: TrailPoint[] = [];
    let particles: Particle[] = [];

    root.classList.add("has-cursor-aura");

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(CANVAS_SIZE * dpr);
      canvas.height = Math.floor(CANVAS_SIZE * dpr);
      canvas.style.width = `${CANVAS_SIZE}px`;
      canvas.style.height = `${CANVAS_SIZE}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
    };

    const setPointerVars = () => {
      const xRatio = (current.x / viewportWidth) * 100;
      const headerStrength = clamp(1 - current.y / HEADER_ACTIVE_HEIGHT, 0, 1);

      root.style.setProperty("--pointer-x-ratio", `${xRatio.toFixed(3)}%`);
      root.style.setProperty("--pointer-y", `${current.y.toFixed(2)}px`);
      root.style.setProperty("--pointer-x", `${current.x.toFixed(2)}px`);
      root.style.setProperty("--header-pointer-opacity", headerStrength.toFixed(3));
      root.style.setProperty("--cursor-opacity", visible ? "1" : "0");
    };

    const emitParticles = (motion: number, timestamp: number) => {
      if (motion < 0.16 || timestamp - lastEmit < EMIT_INTERVAL_MS) {
        return;
      }

      lastEmit = timestamp;
      const tailAngle = lastAngle + Math.PI;
      const count = 1 + Math.round(motion);

      for (let index = 0; index < count; index += 1) {
        const spread = (Math.random() - 0.5) * (0.26 + motion * 0.38);
        const direction = tailAngle + spread;
        const energy = 0.45 + Math.random() * 0.9 + motion * 1.2;
        const curl = (Math.random() - 0.5) * (0.18 + motion * 0.4);
        const lifespan = 12 + Math.random() * 8;

        particles.push({
          life: lifespan,
          maxLife: lifespan,
          size: 0.5 + Math.random() * 0.9,
          vx: Math.cos(direction) * energy + Math.cos(direction + Math.PI / 2) * curl,
          vy: Math.sin(direction) * energy + Math.sin(direction + Math.PI / 2) * curl,
          x: current.x,
          y: current.y
        });
      }

      if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(particles.length - MAX_PARTICLES);
      }
    };

    const updateParticles = () => {
      particles = particles.filter((particle) => {
        particle.life -= 1;
        if (particle.life <= 0) {
          return false;
        }

        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.x += particle.vx;
        particle.y += particle.vy;
        return true;
      });
    };

    const draw = (timestamp: number, motion: number) => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      if (!visible) {
        return;
      }

      const localTrail = trail.map((point) => ({
        x: point.x - current.x + HALF,
        y: point.y - current.y + HALF
      }));

      const localParticles = particles.map((particle) => ({
        life: particle.life,
        maxLife: particle.maxLife,
        size: particle.size,
        x: particle.x - current.x + HALF,
        y: particle.y - current.y + HALF
      }));

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      if (motion > 0.085 && localTrail.length > 2) {
        drawCurvedPlume(ctx, localTrail, motion);
      }

      drawParticles(ctx, localParticles);
      drawHead(ctx, HALF, HALF, motion, timestamp);
      ctx.restore();
    };

    const loop = (timestamp: number) => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const rawSpeed = Math.hypot(dx, dy);

      current.x += dx * FOLLOW_EASING;
      current.y += dy * FOLLOW_EASING;
      smoothedSpeed = lerp(smoothedSpeed, rawSpeed, 0.18);

      if (smoothedSpeed > 0.3) {
        lastAngle = Math.atan2(dy, dx);
      }

      const motion = clamp((smoothedSpeed - 0.18) / 11.5, 0, 1);
      const desiredHistory = Math.max(2, Math.round(lerp(2, MAX_HISTORY, motion)));

      trail.unshift({ t: timestamp, x: current.x, y: current.y });
      trail = trail.filter((point, index) => index < desiredHistory && timestamp - point.t < 360);

      emitParticles(motion, timestamp);
      updateParticles();
      setPointerVars();

      shell.style.transform = `translate3d(${current.x - HALF}px, ${current.y - HALF}px, 0)`;
      draw(timestamp, motion);

      rafId = window.requestAnimationFrame(loop);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      visible = true;
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const handlePointerLeave = () => {
      visible = false;
      trail = [];
      particles = [];
      root.style.setProperty("--header-pointer-opacity", "0");
    };

    resizeCanvas();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("resize", resizeCanvas);

    rafId = window.requestAnimationFrame(loop);

    return () => {
      root.classList.remove("has-cursor-aura");
      root.style.removeProperty("--pointer-x-ratio");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--header-pointer-opacity");
      root.style.removeProperty("--cursor-opacity");

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("resize", resizeCanvas);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="cursor-aura-layer" aria-hidden="true">
      <div ref={shellRef} className="cursor-aura-shell">
        <canvas ref={canvasRef} className="cursor-aura-canvas" />
      </div>
    </div>
  );
}

function drawCurvedPlume(
  ctx: CanvasRenderingContext2D,
  trail: Array<{ x: number; y: number }>,
  motion: number
) {
  const path = [...trail].reverse();
  const tail = path[0];
  const head = path[path.length - 1];
  drawPlumeMist(ctx, path, motion);
  drawPlumeDust(ctx, path, motion);

  const coreGradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
  coreGradient.addColorStop(0, "rgba(255, 236, 212, 0)");
  coreGradient.addColorStop(0.36, `rgba(255, 232, 208, ${0.08 + motion * 0.06})`);
  coreGradient.addColorStop(0.74, `rgba(240, 245, 255, ${0.16 + motion * 0.1})`);
  coreGradient.addColorStop(1, "rgba(255, 255, 255, 0.98)");

  ctx.save();
  ctx.beginPath();
  traceSmoothPath(ctx, path);
  ctx.strokeStyle = coreGradient;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 0.8 + motion * 0.8;
  ctx.shadowBlur = 5 + motion * 6;
  ctx.shadowColor = "rgba(255, 234, 208, 0.18)";
  ctx.stroke();
  ctx.restore();
}

function drawHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  motion: number,
  timestamp: number
) {
  const glowRadius = 3.2 + motion * 8.2;
  const sparkleRadius = 1.1 + motion * 3.1;
  const twinkle = 0.74 + Math.sin(timestamp * 0.007) * 0.06;

  const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
  glow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
  glow.addColorStop(0.22, "rgba(255, 244, 232, 0.88)");
  glow.addColorStop(0.52, `rgba(255, 217, 180, ${0.08 + motion * 0.14})`);
  glow.addColorStop(1, "rgba(255, 184, 126, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  if (motion > 0.14) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${twinkle * Math.min(1, motion * 1.2)})`;
    ctx.lineWidth = 0.65;
    ctx.lineCap = "round";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(219, 238, 255, 0.32)";
    ctx.beginPath();
    ctx.moveTo(x - sparkleRadius, y);
    ctx.lineTo(x + sparkleRadius, y);
    ctx.moveTo(x, y - sparkleRadius);
    ctx.lineTo(x, y + sparkleRadius);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.beginPath();
  ctx.arc(x, y, 1.45 + motion * 0.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Array<{ life: number; maxLife: number; size: number; x: number; y: number }>
) {
  for (const particle of particles) {
    const life = particle.life / particle.maxLife;
    const alpha = life * life * 0.7;
    const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3.4);
    gradient.addColorStop(0, `rgba(255, 247, 236, ${alpha})`);
    gradient.addColorStop(0.58, `rgba(255, 220, 188, ${alpha * 0.42})`);
    gradient.addColorStop(1, "rgba(255, 220, 188, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 3.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlumeMist(
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  motion: number
) {
  const sampleCount = 8 + Math.round(motion * 4);

  for (let index = 0; index < sampleCount; index += 1) {
    const t = sampleCount === 1 ? 0 : index / (sampleCount - 1);
    const point = samplePathPoint(points, t);
    const angle = samplePathAngle(points, t);
    const tailWeight = Math.pow(1 - t, 1.06);
    const spread = 4 + tailWeight * (18 + motion * 18);
    const length = spread * (1.4 + tailWeight * 0.95);
    const drift = tailWeight * tailWeight * (9 + motion * 16);
    const x = point.x - Math.cos(angle) * drift;
    const y = point.y - Math.sin(angle) * drift;
    const alpha = (0.03 + tailWeight * 0.055) * (0.66 + motion * 0.34);

    drawPlumePuff(ctx, x, y, angle, length, spread, alpha);
    drawPlumePuff(ctx, x, y, angle, length * 0.72, spread * 0.56, alpha * 0.88);
  }
}

function drawPlumeDust(
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  motion: number
) {
  const dustCount = 18 + Math.round(motion * 18);

  for (let index = 0; index < dustCount; index += 1) {
    const seed = (index + 1) * 17.371;
    const t = Math.pow(randomUnit(seed), 1.85) * 0.9;
    const point = samplePathPoint(points, t);
    const angle = samplePathAngle(points, t);
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const normalX = -dirY;
    const normalY = dirX;
    const tailWeight = Math.pow(1 - t, 1.14);
    const lateralSpread = 4 + tailWeight * (20 + motion * 30);
    const backwardSpread = 6 + tailWeight * (18 + motion * 28);
    const lateral = (randomUnit(seed + 2.1) - 0.5) * lateralSpread;
    const backward = randomUnit(seed + 4.7) * backwardSpread;
    const swirl = (randomUnit(seed + 8.3) - 0.5) * tailWeight * 6;
    const size = 0.35 + randomUnit(seed + 12.6) * (1.1 + tailWeight * 1.15);
    const alpha = (0.025 + tailWeight * 0.12) * (0.46 + randomUnit(seed + 16.2) * 0.34);
    const x = point.x + normalX * (lateral + swirl) - dirX * backward;
    const y = point.y + normalY * (lateral - swirl) - dirY * backward;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4.4);

    gradient.addColorStop(0, `rgba(255, 250, 244, ${alpha})`);
    gradient.addColorStop(0.56, `rgba(255, 228, 198, ${alpha * 0.45})`);
    gradient.addColorStop(1, "rgba(255, 228, 198, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 4.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlumePuff(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
  alpha: number
) {
  const radius = Math.max(1, width);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(Math.max(1, length / radius), 1);

  const gradient = ctx.createRadialGradient(radius * 0.34, 0, 0, 0, 0, radius);
  gradient.addColorStop(0, `rgba(255, 249, 240, ${alpha})`);
  gradient.addColorStop(0.28, `rgba(255, 234, 210, ${alpha * 0.72})`);
  gradient.addColorStop(0.66, `rgba(255, 220, 188, ${alpha * 0.22})`);
  gradient.addColorStop(1, "rgba(255, 220, 188, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function samplePathPoint(
  points: Array<{ x: number; y: number }>,
  t: number
) {
  if (points.length === 1) {
    return points[0];
  }

  const clampedT = clamp(t, 0, 1);
  const floatIndex = clampedT * (points.length - 1);
  const index = Math.floor(floatIndex);
  const nextIndex = Math.min(points.length - 1, index + 1);
  const blend = floatIndex - index;
  const current = points[index];
  const next = points[nextIndex];

  return {
    x: lerp(current.x, next.x, blend),
    y: lerp(current.y, next.y, blend)
  };
}

function samplePathAngle(points: Array<{ x: number; y: number }>, t: number) {
  const previous = samplePathPoint(points, Math.max(0, t - 0.08));
  const next = samplePathPoint(points, Math.min(1, t + 0.08));
  return Math.atan2(next.y - previous.y, next.x - previous.x);
}

function traceSmoothPath(ctx: CanvasRenderingContext2D, points: Array<{ x: number; y: number }>) {
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const midX = (current.x + next.x) * 0.5;
    const midY = (current.y + next.y) * 0.5;
    ctx.quadraticCurveTo(current.x, current.y, midX, midY);
  }

  const penultimate = points[points.length - 2];
  const last = points[points.length - 1];
  ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
}

function getPathAngle(points: Array<{ x: number; y: number }>, index: number) {
  const previous = points[Math.max(0, index - 1)] ?? points[index];
  const next = points[Math.min(points.length - 1, index + 1)] ?? points[index];
  return Math.atan2(next.y - previous.y, next.x - previous.x);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function randomUnit(seed: number) {
  const sine = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return sine - Math.floor(sine);
}

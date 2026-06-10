import { useRef, useEffect } from "react";

const schemes = [
  { primary: "#c4b5fd", accent: "#a78bfa", glow: "#ddd6fe" },
  { primary: "#93c5fd", accent: "#60a5fa", glow: "#bfdbfe" },
  { primary: "#fdba74", accent: "#fb923c", glow: "#fed7aa" },
  { primary: "#6ee7b7", accent: "#34d399", glow: "#a7f3d0" },
];

interface Props { colorIndex?: number; className?: string; }

export default function ParticleNetwork({ colorIndex = 0, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indexRef = useRef(colorIndex);
  indexRef.current = colorIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── size the canvas ── */
    const size = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const w = p.clientWidth;
      const h = p.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    const ro = new ResizeObserver(() => size());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    /* wait 2 frames so layout is guaranteed */
    let dims = { w: 0, h: 0 };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const d = size();
        if (d) dims = d;
      });
    });

    /* ── particles ── */
    const COUNT = 100;
    interface P { x: number; y: number; vx: number; vy: number; r: number; ph: number; }
    const particles: P[] = [];
    const init = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: 2 + Math.random() * 4,
          ph: Math.random() * Math.PI * 2,
        });
      }
    };

    let anim = 0;
    let lastW = 0, lastH = 0;
    const draw = () => {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      if (w < 10 || h < 10) { anim = requestAnimationFrame(draw); return; }
      if (w !== lastW || h !== lastH) { init(w, h); lastW = w; lastH = h; }

      const scheme = schemes[indexRef.current];
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.003;

      // ── GLOW (MASSIVE) ──
      for (const p of particles) {
        const pulse = 1 + Math.sin(t + p.ph) * 0.3;
        const r = p.r * 12 * pulse;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grd.addColorStop(0, scheme.glow + "BB");     // 73% opacity
        grd.addColorStop(0.25, scheme.glow + "66");  // 40%
        grd.addColorStop(0.5, scheme.glow + "14");   // 8%
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
      }

      // ── LINES (THICK, BRIGHT) ──
      const MAX = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX) {
            const a = (1 - dist / MAX) * 0.7;
            ctx.strokeStyle = scheme.accent + Math.round(a * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── PARTICLES (BIG, BRIGHT) ──
      for (const p of particles) {
        ctx.fillStyle = scheme.primary + "F5"; // 96% opacity
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        // white hot core
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2); ctx.fill();
      }

      // ── MOVE ──
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.998; p.vy *= 0.998;
        p.vx += (Math.random() - 0.5) * 0.025;
        p.vy += (Math.random() - 0.5) * 0.025;
        const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (s > 1) { p.vx = (p.vx / s); p.vy = (p.vy / s); }
        if (p.x < -30) p.x = w + 30; if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30; if (p.y > h + 30) p.y = -30;
      }

      anim = requestAnimationFrame(draw);
    };
    anim = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(anim); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", display: "block" }} />;
}

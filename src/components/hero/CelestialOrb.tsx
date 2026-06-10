import { useRef, useEffect } from "react";

const palette = [
  [255, 107, 53],   // vibrate orange
  [139, 92, 246],   // vivid purple
  [232, 213, 183],  // warm gold
  [64, 160, 255],   // bright blue
  [255, 140, 90],   // coral
  [168, 124, 255],  // lavender
  [255, 180, 100],  // amber
  [80, 180, 255],   // sky blue
];

export default function CelestialOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 320;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    canvas.width = size;
    canvas.height = size;

    const blobs = Array.from({ length: 8 }, (_, i) => ({
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: 0.004 + Math.random() * 0.007,
      speedY: 0.003 + Math.random() * 0.006,
      amplitude: 40 + Math.random() * 60,
      color: palette[i],
      baseRadius: 50 + Math.random() * 90,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.018,
    }));

    let time = 0;
    let animId = 0;

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, size, size);

      // Clip to circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Dark base
      ctx.fillStyle = "#06060c";
      ctx.fillRect(0, 0, size, size);

      // Draw blobs with additive-like blending
      for (const blob of blobs) {
        const bx = cx + Math.sin(time * blob.speedX + blob.phaseX) * blob.amplitude;
        const by = cy + Math.cos(time * blob.speedY + blob.phaseY) * blob.amplitude * 0.75;
        const br = blob.baseRadius + Math.sin(time * blob.pulseSpeed + blob.pulsePhase) * 20;
        const [r, g, b] = blob.color;

        // Core
        const core = ctx.createRadialGradient(bx, by, 0, bx, by, br * 0.6);
        core.addColorStop(0, `rgba(${r},${g},${b},0.7)`);
        core.addColorStop(0.4, `rgba(${r},${g},${b},0.4)`);
        core.addColorStop(1, "transparent");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(bx, by, br * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer glow
        const glow = ctx.createRadialGradient(bx, by, br * 0.3, bx, by, br);
        glow.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle depth overlay
      const depth = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius);
      depth.addColorStop(0, "rgba(0,0,0,0)");
      depth.addColorStop(0.75, "rgba(0,0,0,0.15)");
      depth.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = depth;
      ctx.fillRect(0, 0, size, size);

      // Bright highlight spot
      const hl = ctx.createRadialGradient(cx * 0.7, cy * 0.55, 0, cx, cy, radius * 0.8);
      hl.addColorStop(0, "rgba(255,255,255,0.15)");
      hl.addColorStop(0.3, "rgba(255,255,255,0.04)");
      hl.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hl;
      ctx.fillRect(0, 0, size, size);

      ctx.restore();

      // Rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(232,213,183,0.1)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Orbit ring 1 */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{
          animation: "orb-rotate 25s linear infinite",
          border: "1px solid rgba(232,213,183,0.06)",
          transform: "rotateX(65deg)",
        }}
      />
      {/* Orbit ring 2 */}
      <div
        className="absolute -inset-4 rounded-full pointer-events-none"
        style={{
          animation: "orb-rotate-reverse 18s linear infinite",
          border: "1px solid rgba(139,92,246,0.06)",
          transform: "rotateX(35deg) rotateY(15deg)",
        }}
      />
      {/* Canvas orb */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-full"
        style={{
          filter: "drop-shadow(0 0 50px rgba(139,92,246,0.2)) drop-shadow(0 0 100px rgba(64,160,255,0.12))",
        }}
      />
      {/* Outer glow */}
      <div
        className="absolute -inset-20 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(64,160,255,0.05) 35%, transparent 65%)",
          filter: "blur(30px)",
          animation: "orb-pulse 5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

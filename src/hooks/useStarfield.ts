import { useRef, useEffect, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

interface NebulaParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function useStarfield(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const starsRef = useRef<Star[]>([]);
  const nebulaRef = useRef<NebulaParticle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    // Deep layer: 200 distant stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }
    // Mid layer: 80 larger stars with more twinkle
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5 + 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }
    // Near layer: 30 bright stars
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.3 + 0.7,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.3 + 0.5,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }
    starsRef.current = stars;
  }, []);

  const initNebula = useCallback((width: number, height: number) => {
    const particles: NebulaParticle[] = [];
    const colors = [
      "rgba(26, 58, 92, ALPHA)",     // star-blue
      "rgba(45, 27, 105, ALPHA)",    // nebula-purple
      "rgba(74, 45, 143, ALPHA)",    // nebula-purple-light
      "rgba(139, 92, 246, ALPHA)",   // accent-purple
      "rgba(255, 107, 53, ALPHA)",   // accent-orange
    ];
    for (let i = 0; i < 60; i++) {
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 120 + 40,
        color: colorTemplate,
        alpha: Math.random() * 0.08 + 0.02,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 1000,
        maxLife: 1000,
      });
    }
    nebulaRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
      initNebula(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;

      // Draw nebula particles
      for (const p of nebulaRef.current) {
        p.life++;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        const lifeRatio = Math.sin((p.life / p.maxLife) * Math.PI);
        const alpha = p.alpha * lifeRatio;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        const color = p.color.replace("ALPHA", alpha.toFixed(3));
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw stars with drift + parallax
      for (const star of starsRef.current) {
        // Apply drift
        star.x += star.vx;
        star.y += star.vy;
        // Wrap
        if (star.x < -20) star.x = canvas.width + 20;
        if (star.x > canvas.width + 20) star.x = -20;
        if (star.y < -20) star.y = canvas.height + 20;
        if (star.y > canvas.height + 20) star.y = -20;

        const parallaxX = star.x + mx * star.z * 50;
        const parallaxY = star.y + my * star.z * 50;

        // Wrap around
        const sx = ((parallaxX % canvas.width) + canvas.width) % canvas.width;
        const sy = ((parallaxY % canvas.height) + canvas.height) % canvas.height;

        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;

        ctx.fillStyle = `rgba(232, 213, 183, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow for larger stars
        if (star.size > 2) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 3);
          glow.addColorStop(0, `rgba(232, 213, 183, ${alpha * 0.4})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Occasional shooting star
      if (Math.random() < 0.005) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.5;
        const len = Math.random() * 100 + 50;
        const grad = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.5);
        grad.addColorStop(0, "rgba(232, 213, 183, 0.9)");
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.5);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, initStars, initNebula]);
}

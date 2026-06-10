import { useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  progress: number;
}

const colors = [
  "rgba(232, 213, 183, ALPHA)",
  "rgba(255, 107, 53, ALPHA)",
  "rgba(139, 92, 246, ALPHA)",
  "rgba(192, 192, 192, ALPHA)",
];

const zhCN = [
  "你好", "我是刘家烨", "今日心情如何",
  "我希望你开心，因为我很开心", "欢迎来到我的天地", "随便逛逛",
];
const zhTW = [
  "你好", "我是劉家燁", "今日心情如何",
  "我希望你開心，因為我很開心", "歡迎來到我的天地", "隨便逛逛",
];
const en = [
  "Hello", "I'm Liu Jiaye", "How are you today",
  "I hope you're happy, because I am", "Welcome to my world", "Feel free to explore",
];

function getPhrases(lang: string) {
  if (lang === "zh-HK") return zhTW;
  if (lang === "en") return en;
  return zhCN;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function TextReassemble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { i18n } = useTranslation();
  const particlesRef = useRef<Particle[]>([]);
  const phaseRef = useRef<"assemble" | "hold" | "disassemble">("assemble");
  const phraseIndexRef = useRef(0);
  const holdTimerRef = useRef(0);
  const rafRef = useRef(0);
  const prevLangRef = useRef(i18n.language);

  const sampleTextPixels = useCallback(
    (text: string, width: number, height: number) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext("2d");
      if (!octx) return [];

      octx.clearRect(0, 0, width, height);

      const fontSize = text.length > 10 ? 48 : 72;
      octx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "PingFang SC", sans-serif`;
      octx.fillStyle = "white";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, width / 2, height / 2);

      const imageData = octx.getImageData(0, 0, width, height);
      const pixels: { x: number; y: number }[] = [];
      const step = 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData.data[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            pixels.push({ x, y });
          }
        }
      }

      return pixels;
    },
    []
  );

  const initParticlesForText = useCallback(
    (text: string, width: number, height: number) => {
      const pixelPositions = sampleTextPixels(text, width, height);
      if (pixelPositions.length === 0) return;

      const targetCount = Math.min(pixelPositions.length, 1500);
      const step = Math.max(1, Math.floor(pixelPositions.length / targetCount));
      const sampledPixels = pixelPositions.filter((_, i) => i % step === 0);

      const newParticles: Particle[] = [];

      for (const pixel of sampledPixels) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = width * (0.3 + Math.random() * 0.7);

        newParticles.push({
          x: width / 2 + Math.cos(angle) * distance,
          y: height / 2 + Math.sin(angle) * distance,
          targetX: pixel.x,
          targetY: pixel.y,
          originX: width / 2 + Math.cos(angle) * distance,
          originY: height / 2 + Math.sin(angle) * distance,
          size: Math.random() * 2.5 + 1,
          color,
          progress: 0,
        });
      }

      particlesRef.current = newParticles;
      phaseRef.current = "assemble";
    },
    [sampleTextPixels]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let started = false;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      width = w;
      height = h;
      canvas.width = width;
      canvas.height = height;

      if (!started) {
        started = true;
        initParticlesForText(getPhrases(i18n.language)[0], width, height);
        prevLangRef.current = i18n.language;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Language change detection
      if (prevLangRef.current !== i18n.language) {
        prevLangRef.current = i18n.language;
        phraseIndexRef.current = 0;
        initParticlesForText(getPhrases(i18n.language)[0], width, height);
      }

      const particles = particlesRef.current;
      const speed = 0.008;
      let allDone = true;

      for (const p of particles) {
        if (phaseRef.current === "assemble") {
          p.progress = Math.min(1, p.progress + speed);
          const eased = easeOutCubic(p.progress);
          p.x = p.originX + (p.targetX - p.originX) * eased;
          p.y = p.originY + (p.targetY - p.originY) * eased;
          if (p.progress < 1) allDone = false;
        } else if (phaseRef.current === "disassemble") {
          p.progress = Math.max(0, p.progress - speed);
          const eased = easeOutCubic(p.progress);
          p.x = p.originX + (p.targetX - p.originX) * eased;
          p.y = p.originY + (p.targetY - p.originY) * eased;
          if (p.progress > 0) allDone = false;
        } else {
          const t = Date.now() * 0.001;
          const idx = particles.indexOf(p);
          p.x += Math.sin(t + idx * 0.1) * 0.1;
          p.y += Math.cos(t + idx * 0.13) * 0.1;
        }

        const alpha = phaseRef.current === "hold" ? 1 : p.progress;
        const colorStr = p.color.replace("ALPHA", alpha.toFixed(2));
        ctx.fillStyle = colorStr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Phase transitions
      if (phaseRef.current === "assemble" && allDone && particles.length > 0) {
        phaseRef.current = "hold";
        holdTimerRef.current = Date.now();
      }

      if (phaseRef.current === "hold" && Date.now() - holdTimerRef.current > 2500) {
        phaseRef.current = "disassemble";
      }

      if (phaseRef.current === "disassemble" && allDone && particles.length > 0) {
        const phrases = getPhrases(i18n.language);
        phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
        initParticlesForText(phrases[phraseIndexRef.current], width, height);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [initParticlesForText]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 md:h-40"
      style={{ display: "block" }}
    />
  );
}

import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ============ Black stars canvas for white page ============ */
function BlackStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.03 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = 0.3 + Math.sin(Date.now() * 0.004 * s.speed * 100 + s.phase) * 0.3;
        ctx.fillStyle = `rgba(0,0,0,${Math.max(0.1, alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ============ Wave stripes ============ */
function WaveLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <path d="M0 150 C 200 50, 300 300, 500 200 S 700 100, 900 250 S 1100 150, 1300 280 S 1400 120, 1440 200" fill="none" stroke="#000" strokeWidth="1.2" opacity="0.5">
        <animate attributeName="d" values="M0 150 C 200 50, 300 300, 500 200 S 700 100, 900 250 S 1100 150, 1300 280 S 1400 120, 1440 200;M0 180 C 200 280, 300 80, 500 250 S 700 220, 900 150 S 1100 280, 1300 160 S 1400 250, 1440 170;M0 150 C 200 50, 300 300, 500 200 S 700 100, 900 250 S 1100 150, 1300 280 S 1400 120, 1440 200" dur="6s" repeatCount="indefinite" />
      </path>
      <path d="M0 300 C 180 200, 220 400, 380 280 S 580 350, 780 260 S 980 380, 1180 300 S 1380 400, 1440 320" fill="none" stroke="#000" strokeWidth="0.9" opacity="0.4">
        <animate attributeName="d" values="M0 300 C 180 200, 220 400, 380 280 S 580 350, 780 260 S 980 380, 1180 300 S 1380 400, 1440 320;M0 330 C 180 420, 220 220, 380 340 S 580 260, 780 340 S 980 280, 1180 370 S 1380 280, 1440 350;M0 300 C 180 200, 220 400, 380 280 S 580 350, 780 260 S 980 380, 1180 300 S 1380 400, 1440 320" dur="8s" repeatCount="indefinite" />
      </path>
      <path d="M0 480 C 150 380, 280 580, 450 450 S 650 520, 800 420 S 1000 550, 1200 460 S 1350 560, 1440 500" fill="none" stroke="#000" strokeWidth="1" opacity="0.45">
        <animate attributeName="d" values="M0 480 C 150 380, 280 580, 450 450 S 650 520, 800 420 S 1000 550, 1200 460 S 1350 560, 1440 500;M0 510 C 150 600, 280 400, 450 520 S 650 420, 800 520 S 1000 440, 1200 540 S 1350 440, 1440 530;M0 480 C 150 380, 280 580, 450 450 S 650 520, 800 420 S 1000 550, 1200 460 S 1350 560, 1440 500" dur="10s" repeatCount="indefinite" />
      </path>
      <path d="M0 630 C 200 520, 320 720, 500 580 S 720 680, 900 560 S 1080 700, 1280 600 S 1400 700, 1440 650" fill="none" stroke="#000" strokeWidth="0.8" opacity="0.38">
        <animate attributeName="d" values="M0 630 C 200 520, 320 720, 500 580 S 720 680, 900 560 S 1080 700, 1280 600 S 1400 700, 1440 650;M0 660 C 200 750, 320 540, 500 650 S 720 580, 900 650 S 1080 580, 1280 680 S 1400 580, 1440 680;M0 630 C 200 520, 320 720, 500 580 S 720 680, 900 560 S 1080 700, 1280 600 S 1400 700, 1440 650" dur="12s" repeatCount="indefinite" />
      </path>
      <path d="M0 750 C 160 660, 300 820, 480 720 S 680 800, 850 700 S 1050 820, 1250 740 S 1400 820, 1440 780" fill="none" stroke="#000" strokeWidth="0.7" opacity="0.35">
        <animate attributeName="d" values="M0 750 C 160 660, 300 820, 480 720 S 680 800, 850 700 S 1050 820, 1250 740 S 1400 820, 1440 780;M0 780 C 160 850, 300 680, 480 780 S 680 700, 850 780 S 1050 700, 1250 820 S 1400 700, 1440 820;M0 750 C 160 660, 300 820, 480 720 S 680 800, 850 700 S 1050 820, 1250 740 S 1400 820, 1440 780" dur="9s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/* ============ Main Bio component ============ */
export default function Bio() {
  const { i18n } = useTranslation();
  const frameRef = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);

  // Mouse tracking with spring physics for organic 3D feel
  const [mouseRaw, setMouseRaw] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(0, { stiffness: 80, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 25 });

  useEffect(() => {
    mouseX.set(mouseRaw.x);
    mouseY.set(mouseRaw.y);
  }, [mouseRaw, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouseRaw({ x, y });
  };

  // Scroll-driven shrink for the white frame
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      setShowOverlay(rect.top > -80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });

  // Page 4 scroll
  const { scrollYProgress: page4Scroll } = useScroll({
    target: page4Ref,
    offset: ["start end", "end start"],
  });

  const whiteScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const whiteOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  const frameColor = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    ["rgba(255,255,255,0)", "rgba(245,240,232,0.95)"]
  );
  const borderColor = useTransform(
    scrollYProgress,
    [0.08, 0.3],
    ["rgba(200,200,200,0)", "rgba(180,175,165,0.5)"]
  );

  return (
    <>
      {/* ===== PAGE 3: White page with character + shrink effect ===== */}
      <section ref={frameRef} className="relative z-10 min-h-[200vh]" style={{ scrollSnapAlign: "none" }}>
        {/* Sticky white container */}
        <div className="sticky top-0 h-screen overflow-hidden" onMouseMove={handleMouseMove}>
          {/* Gray background */}
          <motion.div
            className="absolute inset-0 bg-[#E0E0DE]"
            style={{ opacity: whiteOpacity }}
          />

          {/* Black stars */}
          <motion.div style={{ opacity: whiteOpacity }}>
            <BlackStars />
          </motion.div>

          {/* Wave lines */}
          <WaveLines />

          {/* PNG1 - parallax on mouse */}
          <motion.img
            src={`/关于我1 ${i18n.language === "zh-HK" ? "繁" : i18n.language === "en" ? "英" : "中"}.png`}
            alt=""
            className="absolute top-1/2 left-1/2 pointer-events-none z-30"
            style={{
              width: "100vw",
              maxWidth: "2000px",
              height: "auto",
              x: useTransform(mouseX, [-1, 1], ["-55%", "-45%"]),
              y: useTransform(mouseY, [-1, 1], ["-55%", "-45%"]),
              translateY: useTransform(scrollYProgress, [0, 0.04], [0, -80]),
              opacity: showOverlay ? 1 : 0,
            }}
          />

          {/* PNG2 - parallax on mouse */}
          <motion.img
            src={`/关于我2 ${i18n.language === "zh-HK" ? "繁" : i18n.language === "en" ? "英" : "中"}.png`}
            alt=""
            className="absolute top-1/2 left-1/2 pointer-events-none z-30"
            style={{
              width: "100vw",
              maxWidth: "2000px",
              height: "auto",
              x: useTransform(mouseX, [-1, 1], ["-48%", "-52%"]),
              y: useTransform(mouseY, [-1, 1], ["-52%", "-48%"]),
              opacity: showOverlay ? 0 : 1,
              transition: "opacity 1s ease-out",
            }}
          />

          {/* Shrinking frame */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            style={{
              scale: whiteScale,
              backgroundColor: frameColor,
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: borderColor as any,
              borderRadius: "16px",
            }}
          >
            {/* Character with pseudo-3D — rotation + specular light */}
            <motion.div
              className="relative h-[85vh] w-auto flex items-end justify-center pointer-events-none"
              style={{
                rotateX: useTransform(mouseY, [-1, 1], [4, -4]),
                rotateY: useTransform(mouseX, [-1, 1], [-4, 4]),
                filter: useTransform(
                  mouseX,
                  [-1, 0, 1],
                  [
                    "drop-shadow(-6px 3px 16px rgba(0,0,0,0.18))",
                    "drop-shadow(0px 0px 12px rgba(0,0,0,0.12))",
                    "drop-shadow(6px 3px 16px rgba(0,0,0,0.18))"
                  ]
                ),
              }}
            >
              <img
                src="/人物.png"
                alt=""
                className="h-full w-auto max-w-none object-contain object-bottom pointer-events-none"
                style={{ filter: "contrast(1.15) brightness(0.95)" }}
              />
              {/* Specular light — shifts with mouse */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 50%,
                    rgba(255,255,255,0.06) 0%,
                    transparent 55%)
                  `,
                  left: useTransform(mouseX, [-1, 1], ["-15%", "15%"]),
                  top: useTransform(mouseY, [-1, 1], ["-10%", "10%"]),
                  mixBlendMode: "overlay" as React.CSSProperties["mixBlendMode"],
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PAGE 4: Numbers → split → PNG → scroll to page 5 ===== */}
      <section id="bio" ref={page4Ref} className="relative z-10 min-h-[400vh]" style={{ scrollSnapAlign: "none" }}>
        {/* 背景1 background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url(/背景1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/30 to-space-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-space-black/60 via-transparent to-space-black/60" />

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 30% — static, then splits left */}
            <motion.div
              className="absolute flex items-end"
              style={{
                left: useTransform(page4Scroll, [0.35, 0.55], ["38%", "10%"]),
                top: "50%",
                x: "-50%",
                y: "-50%",
                scale: useTransform(page4Scroll, [0.35, 0.55], [1, 0.6]),
              }}
            >
              <span className="text-gold text-[10rem] md:text-[14rem] font-black leading-none tracking-tight">30</span>
              <span className="text-gold/50 text-3xl md:text-5xl font-bold ml-1">%</span>
            </motion.div>

            {/* / separator — fades during split */}
            <motion.div
              className="absolute text-silver/15 text-3xl md:text-5xl font-light tracking-[0.3em]"
              style={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                opacity: useTransform(page4Scroll, [0.35, 0.45], [1, 0]),
              }}
            >
              /
            </motion.div>

            {/* 70% — static, then splits right */}
            <motion.div
              className="absolute flex items-end"
              style={{
                left: useTransform(page4Scroll, [0.35, 0.55], ["62%", "90%"]),
                top: "50%",
                x: "-50%",
                y: "-50%",
                scale: useTransform(page4Scroll, [0.35, 0.55], [1, 0.6]),
              }}
            >
              <span className="text-accent-orange text-[10rem] md:text-[14rem] font-black leading-none tracking-tight">70</span>
              <span className="text-accent-orange/50 text-3xl md:text-5xl font-bold ml-1">%</span>
            </motion.div>

            {/* PNG3 — fades in after split */}
            <motion.img
              src={`/关于我3 ${i18n.language === "zh-HK" ? "繁" : i18n.language === "en" ? "英" : "中"}.png`}
              alt=""
              className="absolute pointer-events-none z-20"
              style={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                width: "95vw",
                maxWidth: "1200px",
                height: "auto",
                opacity: useTransform(page4Scroll, [0.55, 0.75], [0, 1]),
                scale: useTransform(page4Scroll, [0.55, 0.75], [0.9, 1]),
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styled from "styled-components";

/* ============ Canvas twinkling starfield ============ */
function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.scrollWidth;
        canvas.height = parent.scrollHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    // Also observe parent size changes
    const observer = new ResizeObserver(resize);
    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = 0.3 + Math.sin(Date.now() * 0.002 * s.speed * 100 + s.phase) * 0.35;
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.1, alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
}

interface Capability {
  id: number;
  hasImage: boolean;
  accent: string;
  img?: string;
}

const capabilities: Capability[] = [
  { id: 1, hasImage: true, accent: "#e8d5b7", img: "/other skills/1.png" },
  { id: 2, hasImage: false, accent: "#8b5cf6" },
  { id: 3, hasImage: true, accent: "#ff6b35", img: "/other skills/2.jpg" },
  { id: 4, hasImage: false, accent: "#e8d5b7" },
  { id: 5, hasImage: true, accent: "#ff6b35", img: "/other skills/3.jpg" },
  { id: 6, hasImage: false, accent: "#8b5cf6" },
  { id: 7, hasImage: true, accent: "#e8d5b7", img: "/other skills/4.jpg" },
  { id: 8, hasImage: false, accent: "#e8d5b7" },
];

const floatingIcons = [
  { svg: "M4 16h16M4 16V4h16v12M9 20h6", label: "laptop" },
  { svg: "M5 10l2-4h10l2 4M5 10h14M5 10v7a1 1 0 001 1h12a1 1 0 001-1v-7M8 18v-3M16 18v-3M9 7h6", label: "car" },
  { svg: "M15.5 3.5L8.5 20.5M5 6.5l2.5-3M19 6.5l-2.5-3M7 10l-3 2M17 10l3 2M12 6v2", label: "pen" },
  { svg: "M3 7h2l1-3h12l1 3h2l-1 11H4L3 7zm5 6a4 4 0 108 0 4 4 0 00-8 0zm4 3v3", label: "camera" },
  { svg: "M9 18V5l12-2v13M9 9a3 3 0 000 6M21 11a3 3 0 000 6", label: "music" },
  { svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "package" },
  { svg: "M4 6h16M4 12h16M4 18h16M8 6v12M16 6v12", label: "layout" },
  { svg: "M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4l3 3", label: "clock" },
];

function OrbitalDecoration() {
  return (
    <div className="orbital-deco" aria-hidden="true">
      <div className="orbit-ring large" />
      <div className="orbit-ring medium" />
      <div className="orbit-ring small" />
      <div className="central-dot" />
    </div>
  );
}

export default function Capabilities() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <StyledWrapper ref={sectionRef}>
      <section className="cap-section">
        {/* Animated starfield background */}
        <StarfieldCanvas />

        {/* Orbital decorations */}
        <OrbitalDecoration />

        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-line" />
          <h2 className="header-title">
            <span className="title-cn">{t("cap_title")}</span>
          </h2>
          {/* Icon row below title */}
          <div className="header-icons">
            {floatingIcons.map((icon, i) => (
              <span key={i} className="header-icon-item" style={{ animationDelay: `${i * 0.3}s` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon.svg} />
                </svg>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="cap-grid">
          {capabilities.map((cap, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={cap.id}
                className={`cap-row ${isLeft ? "row-left" : "row-right"}`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
              >
                {/* Image */}
                {cap.hasImage && cap.img && (
                  <div
                    className="cap-image"
                    style={{
                      borderColor: `${cap.accent}15`,
                      background: `linear-gradient(135deg, ${cap.accent}06, ${cap.accent}02)`,
                      boxShadow: `0 0 40px ${cap.accent}08, inset 0 0 40px ${cap.accent}03`,
                    }}
                  >
                    <img
                      src={cap.img}
                      alt={t(`cap_${cap.id}_title`)}
                      className="cap-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
                    />
                  </div>
                )}

                {/* Text block */}
                <div className={`cap-text ${!cap.hasImage ? "no-image" : ""}`}>
                  <span className="cap-num" style={{ color: `${cap.accent}50` }}>
                    {String(cap.id).padStart(2, "0")}
                  </span>
                  <h3 className="cap-title" style={{ color: "#e0e0e0" }}>
                    {t(`cap_${cap.id}_title`)}
                  </h3>
                  <p className="cap-subtitle" style={{ color: `${cap.accent}90` }}>
                    {t(`cap_${cap.id}_sub`)}
                  </p>
                  <p className="cap-desc" style={{ color: "#909098" }}>
                    {t(`cap_${cap.id}_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom closing line */}
        <motion.div
          className="section-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="footer-line" />
          <span className="footer-text">{t("cap_footer")}</span>
          <div className="footer-line" />
        </motion.div>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cap-section {
    position: relative;
    z-index: 10;
    min-height: 100vh;
    padding: 100px 32px 80px;
    background: #06060c;
    overflow: hidden;
  }

  /* Canvas starfield */
  .starfield-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  /* Orbital decoration */
  .orbital-deco {
    position: absolute;
    top: 50%;
    right: -80px;
    transform: translateY(-50%);
    width: 400px;
    height: 400px;
    pointer-events: none;
    opacity: 0.5;
  }
  .orbit-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  .orbit-ring.large {
    width: 380px;
    height: 380px;
    border: 1px solid rgba(232,213,183,0.12);
    animation: orbit-spin 40s linear infinite;
  }
  .orbit-ring.medium {
    width: 280px;
    height: 280px;
    border: 1px dashed rgba(139,92,246,0.15);
    animation: orbit-spin 28s linear infinite reverse;
  }
  .orbit-ring.small {
    width: 180px;
    height: 180px;
    border: 1px solid rgba(255,107,53,0.15);
    animation: orbit-spin 20s linear infinite;
  }
  .central-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(232,213,183,0.5);
    box-shadow: 0 0 30px rgba(232,213,183,0.2), 0 0 60px rgba(139,92,246,0.1);
  }
  @keyframes orbit-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Header */
  .section-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .header-line {
    width: 40px;
    height: 1px;
    background: rgba(255,255,255,0.2);
    margin: 0 auto 20px;
  }
  .header-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }
  .title-cn {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 900;
    color: #e0e0e0;
    letter-spacing: 0.2em;
    font-family: var(--font-display), sans-serif;
  }
  .title-en {
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.5em;
    font-family: var(--font-display), sans-serif;
  }
  .header-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.15em;
  }

  /* Header icons */
  .header-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .header-icon-item {
    width: 28px;
    height: 28px;
    color: rgba(255,255,255,0.45);
    animation: icon-pulse 3s ease-in-out infinite;
  }

  .header-icon-item svg {
    width: 100%;
    height: 100%;
  }

  @keyframes icon-pulse {
    0%, 100% { opacity: 0.6; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-4px); }
  }

  /* Grid */
  .cap-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .cap-row {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .row-left {
    flex-direction: row;
  }

  .row-right {
    flex-direction: row-reverse;
  }

  /* Image placeholder */
  .cap-image {
    width: 160px;
    height: 160px;
    min-width: 160px;
    border-radius: 20px;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.4s ease;
  }

  .cap-image:hover {
    transform: scale(1.04);
    border-color: rgba(255,255,255,0.1);
  }

  .image-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .image-inner svg {
    width: 60px;
    height: 60px;
  }

  .image-inner span {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2em;
    font-family: monospace;
  }

  /* Text */
  .cap-text {
    flex: 1;
    padding: 8px 0;
  }

  .cap-text.no-image {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .cap-num {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    font-family: monospace;
    margin-bottom: 8px;
    display: block;
  }

  .cap-title {
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 800;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
    font-family: var(--font-display), sans-serif;
    line-height: 1.2;
  }

  .cap-subtitle {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    margin-bottom: 10px;
    font-family: var(--font-display), sans-serif;
  }

  .cap-desc {
    font-size: 14px;
    line-height: 1.7;
    letter-spacing: 0.03em;
    max-width: 480px;
  }

  .row-right .cap-desc {
    text-align: right;
    margin-left: auto;
  }

  .row-right .cap-num,
  .row-right .cap-title,
  .row-right .cap-subtitle {
    text-align: right;
  }

  /* Footer */
  .section-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 72px;
  }
  .footer-line {
    width: 48px;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }
  .footer-text {
    font-size: 10px;
    font-weight: 600;
    color: rgba(255,255,255,0.12);
    letter-spacing: 0.4em;
    font-family: var(--font-display), sans-serif;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .cap-section { padding: 72px 20px 56px; }
    .cap-row, .row-right { flex-direction: column; gap: 20px; }
    .cap-image { width: 120px; height: 120px; min-width: 120px; }
    .row-right .cap-desc,
    .row-right .cap-num,
    .row-right .cap-title,
    .row-right .cap-subtitle { text-align: left; }
    .cap-text.no-image { text-align: left; }
    .section-header { margin-bottom: 40px; }
    .cap-grid { gap: 28px; }
  }
`;

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Card Data
   ================================================================ */
const TOTAL = 10;
const imgs = [
  `${import.meta.env.BASE_URL}skills/1 (1).jpg`, `${import.meta.env.BASE_URL}skills/1 (2).jpg`, `${import.meta.env.BASE_URL}skills/1 (3).jpg`, `${import.meta.env.BASE_URL}skills/1 (4).jpg`,
  `${import.meta.env.BASE_URL}skills/1 (5).jpg`, `${import.meta.env.BASE_URL}skills/1 (6).jpg`, `${import.meta.env.BASE_URL}skills/1（7）.jpg`, `${import.meta.env.BASE_URL}skills/1（8）.jpg`,
  `${import.meta.env.BASE_URL}skills/1 (9).png`, `${import.meta.env.BASE_URL}skills/1（10）.png`,
];
const accents = ["#00e5ff", "#d500f9", "#00e676", "#ff9100", "#448aff", "#ff4081", "#b2ff59", "#ffd740", "#7c4dff", "#18ffff"];

/* ================================================================
   Main
   ================================================================ */
export default function Works() {
  const { t } = useTranslation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [isPortrait, setIsPortrait] = useState<Record<number, boolean>>({});
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setBgPos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
  }, []);

  const onImgLoad = useCallback((id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsPortrait((prev) => {
      if (prev[id] !== undefined) return prev;
      return { ...prev, [id]: img.naturalHeight > img.naturalWidth };
    });
  }, []);

  /* ── ScrollTrigger: pin + scrub + snap ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const allCards = wrap.querySelectorAll<HTMLElement>(".deck-card");
      gsap.set(allCards, { autoAlpha: 0, x: 0 });
      gsap.set(allCards[0], { autoAlpha: 1 });

      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: `+=${(TOTAL - 1) * 20}%`,
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (TOTAL - 1),
          duration: 0.15,
          ease: "power1.out",
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (TOTAL - 1));
          if (idx < 0 || idx >= TOTAL) return;
          const prev = activeRef.current;
          if (idx === prev) return;
          const dir = idx > prev ? 1 : -1;
          activeRef.current = idx;
          setActive(idx);

          const outDir = idx % 2 === 0 ? -1 : 1;
          if (dir > 0) {
            /* Throw current OUT to side */
            gsap.to(allCards[prev], { xPercent: outDir * 120, rotateZ: outDir * 20, rotateY: outDir * 12, autoAlpha: 0, scale: 0.85, duration: 0.65, ease: "power3.in", overwrite: "auto" });
            /* Bring next IN from opposite side */
            gsap.fromTo(allCards[idx], { xPercent: -outDir * 100, rotateZ: -outDir * 15, rotateY: -outDir * 10, autoAlpha: 0, scale: 0.9 }, { xPercent: 0, rotateZ: 0, rotateY: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out", overwrite: "auto" });
          } else {
            /* Sink current OUT */
            gsap.to(allCards[prev], { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: "power2.in", overwrite: "auto" });
            /* Fly previous IN from the side */
            gsap.fromTo(allCards[idx], { xPercent: outDir * 100, rotateZ: outDir * 15, rotateY: outDir * 10, autoAlpha: 0, scale: 0.9 }, { xPercent: 0, rotateZ: 0, rotateY: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out", overwrite: "auto" });
          }
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  const currentAccent = accents[active];

  return (
    <div
      id="deck-root"
      ref={wrapRef}
      className="deck-wrapper"
      onMouseMove={onMouseMove}
      style={{
        scrollSnapAlign: "none",
        "--accent": currentAccent,
        "--accent-glow": `${currentAccent}44`,
        "--bg-x": `${bgPos.x}px`,
        "--bg-y": `${bgPos.y}px`,
      } as React.CSSProperties}
    >
      <Styles />
      <div className="deck-bg" style={{ background: `radial-gradient(ellipse at center, ${currentAccent}18 0%, transparent 55%)` }} />

      <div className="deck-stage">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="deck-card"
            style={{
              borderColor: i === active ? `${accents[i]}66` : "transparent",
              boxShadow: i === active
                ? `0 0 40px ${accents[i]}33, 0 0 80px ${accents[i]}11, 0 20px 60px rgba(0,0,0,0.5)`
                : "none",
              pointerEvents: i === active ? "auto" : "none",
            }}
          >
            <div className={`card-layout ${isPortrait[i] ? "layout-portrait" : "layout-landscape"}`}>
              <div className="card-img-wrap">
                <img src={imgs[i]} alt={t(`work_card_${i + 1}_title`)} className="card-img" onLoad={(e) => onImgLoad(i, e)} />
              </div>
              <div className="card-text-area">
                <h2 className="card-title" style={{ color: accents[i] }}>{t(`work_card_${i + 1}_title`)}</h2>
                <p className="card-desc">{t(`work_card_${i + 1}_desc`)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot nav */}
      <div className="deck-dots">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            className={`deck-dot ${i === active ? "active" : ""}`}
            onClick={() => {
              const st = ScrollTrigger.getAll().find((t) => t.vars.trigger === wrapRef.current);
              if (st) {
                const progress = TOTAL > 1 ? i / (TOTAL - 1) : 0;
                const scrollPos = st.start + progress * (st.end - st.start);
                window.scrollTo({ top: scrollPos, behavior: "smooth" });
              }
            }}
            style={{
              borderColor: i === active ? accents[i] : "rgba(255,255,255,0.12)",
              background: i === active ? accents[i] : "transparent",
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="deck-counter">
        <span style={{ color: currentAccent }}>{String(active + 1).padStart(2, "0")}</span>
        <span className="ct-slash">/</span>
        {String(TOTAL).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ================================================================
   Styles
   ================================================================ */
function Styles() {
  return (
    <style>{`
      #deck-root.deck-wrapper {
        position: relative; width: 100%; height: 100vh; overflow: hidden;
        background: #06060c; cursor: default; user-select: none;
      }
      .deck-wrapper::before {
        content: ""; position: absolute; inset: 0; z-index: 0;
        background: url(${import.meta.env.BASE_URL}背景3.jpg) center/120% no-repeat;
        pointer-events: none;
        -webkit-mask-image: linear-gradient(to right, transparent, rgba(0,0,0,0.3));
        mask-image: linear-gradient(to right, transparent, rgba(0,0,0,0.3));
        transform: translate(var(--bg-x, 0px), var(--bg-y, 0px));
        transition: transform 0.3s ease-out;
      }
      }
      .deck-bg {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        transition: background 0.8s ease;
      }
      .deck-stage {
        position: absolute; inset: 0; z-index: 10;
        display: flex; align-items: center; justify-content: center;
      }
      .deck-card {
        position: absolute;
        max-width: 55vw; max-height: 80vh; width: auto;
        border-radius: 18px; border: 1px solid;
        background: rgba(10,10,18,0.92);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        overflow: hidden;
        transition: box-shadow 0.6s, border-color 0.6s, transform 0.35s ease;
      }
      .deck-card:hover { transform: scale(1.06) !important; }
      .card-layout { display: flex; }
      .layout-landscape { flex-direction: column; }
      .layout-landscape .card-img-wrap { width: 100%; flex: 0 0 auto; max-height: 55vh; }
      .layout-landscape .card-text-area { padding: 20px 24px; display: block; flex-shrink: 0; }
      .layout-portrait { flex-direction: row; }
      .layout-portrait .card-img-wrap { width: 45%; flex-shrink: 0; }
      .layout-portrait .card-text-area { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; justify-content: center; }
      .card-img-wrap { overflow: hidden; background: #000; }
      .card-img { width: 100%; height: 100%; object-fit: contain; display: block; }
      .card-text-area {
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .card-title {
        font-size: clamp(19px, 2.9vw, 29px); font-weight: 800;
        margin: 0 0 6px; letter-spacing: 0.04em;
        font-family: var(--font-display), "PingFang SC", "Microsoft YaHei", sans-serif;
        line-height: 1.15;
      }
      .card-desc {
        font-size: 12px; color: rgba(255,255,255,0.5); margin: 0;
        line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
        font-weight: 400;
      }
      .deck-dots {
        position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
        display: flex; flex-direction: column; gap: 6px; z-index: 30;
      }
      .deck-dot {
        width: 6px; height: 6px; border-radius: 50%;
        border: 1px solid; cursor: pointer; padding: 0;
        transition: all 0.4s;
      }
      .deck-dot.active { height: 24px; border-radius: 3px; }
      .deck-counter {
        position: absolute; top: 28px; left: 28px; z-index: 30;
        font-size: 14px; font-weight: 700; letter-spacing: 0.25em;
        font-family: monospace; color: rgba(255,255,255,0.12);
      }
      .ct-slash { margin: 0 2px; }
      @media (max-width: 767px) {
        .layout-portrait { flex-direction: column !important; }
        .layout-portrait .card-img-wrap { width: 100% !important; }
        .deck-card { max-width: 85vw; max-height: 75vh; }
      }
    `}</style>
  );
}

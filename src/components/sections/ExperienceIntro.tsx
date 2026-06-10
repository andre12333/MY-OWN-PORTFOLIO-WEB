import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 15;
const framePaths = Array.from({ length: FRAME_COUNT }, (_, i) => `/png动画/未命名作品-${i + 1}.png`);

export default function ExperienceIntro() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const isEn = i18n.language === "en";
  const title = t("exp_intro_title", "我做过什么");

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  /* ---- PNG 帧动画（播放一次，进入页面时重播）---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = framePaths.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    let frame = 0;
    let last = performance.now();
    const interval = 1000 / 12;
    let raf = 0;
    let stopped = false;

    const draw = (now: number) => {
      if (now - last >= interval && !stopped) {
        last = now;
        const img = images[frame];
        if (img.complete && img.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          const sw = img.naturalWidth * scale;
          const sh = img.naturalHeight * scale;
          const sx = (cw - sw) / 2;
          const sy = (ch - sh) / 2;
          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(img, sx, sy, sw, sh);
        }
        frame++;
        if (frame >= FRAME_COUNT) {
          stopped = true;
        }
      }
      if (!stopped) raf = requestAnimationFrame(draw);
    };

    const startAnim = () => {
      frame = 0;
      stopped = false;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* 每次进入视口重播 */
    const st = ScrollTrigger.create({
      trigger: canvas,
      start: "top 75%",
      onEnter: startAnim,
      onEnterBack: startAnim,
    });

    startAnim();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.querySelectorAll(".title-char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "restart none restart none",
        },
      });

      if (titleChars) {
        tl.fromTo(titleChars,
          { autoAlpha: 0, y: 80, rotationX: -50 },
          { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.9, stagger: { each: 0.06, from: "center" }, ease: "power3.out" },
          "-=0.6"
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom top",
        onLeave: () => {
          gsap.to(titleRef.current, { autoAlpha: 0, y: -40, duration: 0.4, ease: "power2.in" });
        },
        onEnterBack: () => {
          gsap.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#3D4F5D", scrollSnapAlign: "start" }}
      onMouseMove={onMouseMove}
    >
      <Styles mouseX={mouse.x} mouseY={mouse.y} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, opacity: 1 }}
      />

      {/* 底部渐变遮罩：底部70%透明 → 往上100%不透明 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: "linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(61,79,93,0.7) 90%, rgba(61,79,93,0.85) 100%)" }}
      />

      <div className="halftone-layer" />

      <div className="text-layer">
        <h1 ref={titleRef} className="exp-title">
          {isEn
            ? title.split(" ").map((word, i, arr) => (
                <span key={i} className="title-char inline-block" style={{
                  color: "#AEBFC9",
                  fontWeight: word.toLowerCase() === "done" ? 800 : 300,
                  fontStyle: word.toLowerCase() === "done" ? "normal" : "italic",
                  marginRight: i < arr.length - 1 ? "0.3em" : "0",
                }}>
                  {word}
                </span>
              ))
            : title.split("").map((c, i) => (
                <span key={i} className="title-char inline-block" style={{ color: "#AEBFC9" }}>
                  {c === " " ? " " : c}
                </span>
              ))
          }
        </h1>
      </div>

      <p className="exp-disclaimer">{t("exp_disclaimer", "项目经历只统计到2026年6月前，本人保证所有项目、经历、奖项真实性")}</p>
    </section>
  );
}

function Styles({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const sx = (mouseX - 0.5) * 8;
  const sy = (mouseY - 0.5) * 8;
  return (
    <style>{`
      .halftone-layer {
        position:absolute;inset:-20px;pointer-events:none;z-index:1;
        background-image:radial-gradient(circle,#CDD3D3 1.5px,transparent 1.5px);
        background-size:20px 20px;opacity:0.25;
        transform:translate(${sx}px,${sy}px);transition:transform 0.5s ease-out;
      }
      .text-layer{
        position:absolute;inset:0;z-index:10;
        display:flex;align-items:center;justify-content:center;pointer-events:none;
      }
      .exp-title{
        font-size:clamp(4rem,12vw,10rem);font-weight:800;
        letter-spacing:0.08em;line-height:1.1;margin:0;text-align:center;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
        perspective:800px;
      }
      .exp-disclaimer {
        position:absolute;bottom:20px;right:24px;z-index:11;
        font-size:10px;color:rgba(174,191,201,0.5);
        letter-spacing:0.04em;text-align:right;max-width:340px;
        white-space:pre-line;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
        font-weight:400;
      }
      .title-char{cursor:default;transition:transform 0.2s ease}
      .title-char:hover{transform:translateY(-10px)}
    `}</style>
  );
}

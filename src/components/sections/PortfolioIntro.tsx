import { useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { WebGLShader } from "../ui/web-gl-shader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* HSL → RGB string */
function hslToRgb(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return `${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)}`;
}

export default function PortfolioIntro() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const glitchTimer = useRef<ReturnType<typeof setTimeout>>();

  const isZh = i18n.language !== "en";

  /* ── Mouse → 3D tilt ── */
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      rotationX: (my - 0.5) * 18,
      rotationY: (mx - 0.5) * 22,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  /* ── Continuous hue cycle + RGB shift ── */
  useEffect(() => {
    const state = { hue: 0, shift: 12 };

    const tween = gsap.to(state, {
      hue: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    const shiftTween = gsap.to(state, {
      shift: 22,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onRepeat: () => {
        state.shift = gsap.utils.random(8, 24);
      },
    });

    const update = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const h = state.hue;
      const s = state.shift;
      el.style.setProperty("--s", String(Math.round(s)));
      el.style.setProperty("--c1", hslToRgb(h, 1, 0.55));          // main hue — max sat
      el.style.setProperty("--c2", hslToRgb(h + 150, 1, 0.52));   // offset ~150° — max sat
      el.style.setProperty("--c3", hslToRgb(h + 210, 1, 0.55));   // offset ~210° — max sat
    };

    gsap.ticker.add(update);
    return () => {
      tween.kill();
      shiftTween.kill();
      gsap.ticker.remove(update);
    };
  }, []);

  /* ── Glitch burst ── */
  const glitchBurst = useCallback(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!l1) return;
    const chars = l1.querySelectorAll(".gchar");
    const tl = gsap.timeline();
    tl.to(chars, { x: "random(-8, 8)", y: "random(-3, 3)", skewX: "random(-5, 5)", duration: 0.05, stagger: { amount: 0.06, from: "random" } })
      .to(chars, { x: 0, y: 0, skewX: 0, duration: 0.04, stagger: { amount: 0.04, from: "random" } });
    if (l2 && !isZh) { tl.to(l2, { x: "random(-5, 5)", duration: 0.04 }, 0).to(l2, { x: 0, duration: 0.03 }); }
    if (l3 && !isZh) { tl.to(l3, { autoAlpha: "random(0, 0.3)", duration: 0.03 }, 0).to(l3, { autoAlpha: 1, duration: 0.02 }); }
    return tl;
  }, [isZh]);

  /* ── Entrance ── */
  useEffect(() => {
    const l1 = line1Ref.current;
    if (!l1) return;

    ctxRef.current?.revert();

    const ctx = gsap.context(() => {
      const chars = l1.querySelectorAll(".gchar");
      gsap.set(chars, { autoAlpha: 0, z: -200, rotationX: -80 });

      const tl = gsap.timeline({ defaults: { ease: "back.out(1.4)" } });
      tl.to(chars, {
        autoAlpha: 1, z: 0, rotationX: 0,
        duration: 1.1,
        stagger: { each: 0.07, from: "center" },
      });

      if (!isZh) {
        const l2 = line2Ref.current;
        const l3 = line3Ref.current;
        if (l2) {
          tl.fromTo(l2,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" },
            "-=0.5"
          );
        }
        if (l3) {
          tl.fromTo(l3,
            { autoAlpha: 0, scale: 0.9, filter: "blur(6px)" },
            { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
            "-=0.6"
          );
        }
      }

      tl.call(() => glitchBurst(), [], "-=0.1");

      const scheduleGlitch = (): ReturnType<typeof setTimeout> => {
        const delay = 3 + Math.random() * 8;
        return setTimeout(() => { glitchBurst(); glitchTimer.current = scheduleGlitch(); }, delay * 1000);
      };
      glitchTimer.current = scheduleGlitch();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom top",
        onLeave: () => gsap.to(containerRef.current, { autoAlpha: 0, y: -40, scale: 0.95, duration: 0.5, ease: "power2.in" }),
        onEnterBack: () => gsap.to(containerRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }),
      });
    }, sectionRef);

    ctxRef.current = ctx;
    return () => ctx.revert();
  }, [i18n.language, isZh, glitchBurst]);

  useEffect(() => {
    return () => { if (glitchTimer.current) clearTimeout(glitchTimer.current); };
  }, []);

  const title = t("portfolio_intro_title", "作品集");
  const subtitle = t("portfolio_intro_subtitle", "PORTFOLIO");
  const hint = t("portfolio_intro_hint", "向下滚动 · EXPLORE WORKS");

  const titleFontSize = isZh
    ? "clamp(10rem, 28vw, 22rem)"
    : "clamp(7rem, 19.6vw, 15.4rem)";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ scrollSnapAlign: "start", perspective: "1200px" }}
      onMouseMove={onMouseMove}
    >
      <WebGLShader />

      <div
        ref={containerRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{
          transformStyle: "preserve-3d",
          "--s": "14",
          "--c1": "255, 0, 80",
          "--c2": "0, 200, 255",
          "--c3": "120, 255, 0",
        } as React.CSSProperties}
      >
        {/* Line 1 — title with cycling RGB split */}
        <h1 ref={line1Ref} className="flex justify-center" style={{ transformStyle: "preserve-3d", marginBottom: isZh ? 0 : "1.5rem" }}>
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="gchar inline-block font-black"
              style={{
                fontSize: titleFontSize,
                color: "#ffffff",
                letterSpacing: isZh ? "0.08em" : "0.04em",
                textShadow: `
                  calc(var(--s) * 1px) calc(var(--s) * -0.5px) 0 rgba(var(--c1), 1),
                  calc(var(--s) * -0.9px) calc(var(--s) * 0.6px) 0 rgba(var(--c2), 1),
                  0px 0px 6px rgba(var(--c1), 0.7),
                  0px 0px 6px rgba(var(--c2), 0.7),
                  0 12px 20px rgba(0,0,0,0.5),
                  0 0 60px rgba(var(--c3), 0.35)
                `,
                transformStyle: "preserve-3d",
                lineHeight: 0.9,
              }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>

        {/* Line 2 — en only */}
        {!isZh && (
          <p
            ref={line2Ref}
            className="mb-12 font-mono whitespace-nowrap text-center"
            style={{
              fontSize: "clamp(1.2rem, 4vw, 2rem)",
              letterSpacing: "1em",
              color: "rgba(255,255,255,0.45)",
              textShadow: `
                calc(var(--s) * 0.4px) calc(var(--s) * -0.2px) 0 rgba(var(--c1), 0.5),
                calc(var(--s) * -0.4px) calc(var(--s) * 0.2px) 0 rgba(var(--c2), 0.5),
                0 0 15px rgba(var(--c2), 0.25)
              `,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Line 3 — en only */}
        {!isZh && (
          <p
            ref={line3Ref}
            className="font-display text-center"
            style={{
              fontSize: "1.1rem",
              letterSpacing: "0.6em",
              color: "rgba(255,255,255,0.3)",
              textShadow: "0 0 5px rgba(255,255,255,0.15)",
            }}
          >
            {hint}
          </p>
        )}
      </div>
    </section>
  );
}

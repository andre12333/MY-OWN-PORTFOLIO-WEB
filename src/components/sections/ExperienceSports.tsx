import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

/* All images in one flat track — chapter boundaries marked by array index */
const SPACER_IDX = [5, 11]; // spacer positions in the array (after ch1 images, after ch2 images)
const ALL_IMAGES = [
  /* Ch1: 汤尤杯 (5) */
  { src: "/经历/体育/2024年汤姆斯杯暨尤伯杯世界羽毛球团体锦标赛/微信图片_20260528200834_533_2.jpg" },
  { src: "/经历/体育/2024年汤姆斯杯暨尤伯杯世界羽毛球团体锦标赛/微信图片_20260528200945_534_2.jpg" },
  { src: "/经历/体育/2024年汤姆斯杯暨尤伯杯世界羽毛球团体锦标赛/微信图片_20260528200946_535_2.jpg" },
  { src: "/经历/体育/2024年汤姆斯杯暨尤伯杯世界羽毛球团体锦标赛/微信图片_20260528200949_536_2.jpg" },
  { src: "/经历/体育/2024年汤姆斯杯暨尤伯杯世界羽毛球团体锦标赛/微信图片_20260528200951_537_2.jpg" },
  { src: "", spacer: true },
  /* Ch2: FIBA (6) */
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195445_504_2.jpg" },
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195446_505_2.jpg" },
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195447_506_2.jpg" },
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195450_507_2.jpg" },
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195452_508_2.jpg" },
  { src: "/经历/体育/FIBA亚洲女子篮球联赛/微信图片_20260528195609_509_2.jpg" },
  { src: "", spacer: true },
  /* Ch3: 篮球赛 (2) */
  { src: "/经历/体育/Wishtoday · 问鼎中原篮球赛/77491b2b2850a2494fe13315178c2607.jpg" },
  { src: "/经历/体育/Wishtoday · 问鼎中原篮球赛/微信图片_20260528204451_540_2.jpg" },
  { src: "", spacer: true },
  /* Ch4: 村BA (4) */
  { src: "/经历/体育/大地流彩・2025 年全国和美乡村篮球大赛（村 BA）中部赛区（湖北）/4be74cf1050bf257e02925febf3bdb4b.jpg" },
  { src: "/经历/体育/大地流彩・2025 年全国和美乡村篮球大赛（村 BA）中部赛区（湖北）/b88bd3d7e75ffd54d00fcc5af9cf8e01.jpg" },
  { src: "/经历/体育/大地流彩・2025 年全国和美乡村篮球大赛（村 BA）中部赛区（湖北）/微信图片_20260528193857_480_2.jpg" },
  { src: "/经历/体育/大地流彩・2025 年全国和美乡村篮球大赛（村 BA）中部赛区（湖北）/微信图片_20260528193858_481_2.jpg" },
  { src: "", spacer: true },
  /* Ch5: 为爱麦跑 (2) */
  { src: "/经历/体育/为爱麦跑 · 成都站（第八届）/微信图片_20260528200315_521_2.jpg" },
  { src: "/经历/体育/为爱麦跑 · 成都站（第八届）/微信图片_20260528200316_522_2.jpg" },
  { src: "", spacer: true },
  /* Ch6: 宙斯嘉年华 (3) */
  { src: "/经历/体育/周楷恒 · 宙斯嘉年华篮球赛/微信图片_20260528194315_491_2.jpg" },
  { src: "/经历/体育/周楷恒 · 宙斯嘉年华篮球赛/微信图片_20260528194316_492_2.jpg" },
  { src: "/经历/体育/周楷恒 · 宙斯嘉年华篮球赛/微信图片_20260528194318_493_2.jpg" },
  { src: "", spacer: true },
  /* Ch7: F4 (10) */
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194127_483_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194128_484_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194130_485_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194132_486_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194134_487_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194136_488_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260528194137_489_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260607224103_576_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260607224104_577_2.jpg" },
  { src: "/经历/体育/国际汽联 F4 中国锦标赛/微信图片_20260607224105_578_2.jpg" },
];

export default function ExperienceSports() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language !== "en";
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [chapter, setChapter] = useState(0);
  const maxScroll = useRef(0);
  const scrollXRef = useRef(0);
  const chapterRef = useRef(0);
  const isSwitching = useRef(false);

  scrollXRef.current = scrollX;
  chapterRef.current = chapter;

  /* Calc max scroll */
  const calcMax = () => {
    const track = trackRef.current;
    if (!track) return;
    recalcSpacer();
    maxScroll.current = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth || window.innerWidth * 0.66) + 40);
  };

  useEffect(() => {
    requestAnimationFrame(() => { calcMax(); });
    window.addEventListener("resize", calcMax);
    return () => window.removeEventListener("resize", calcMax);
  }, []);

  /* Spacer positions: after index 4 (ch1→ch2) and after index 11 (ch2→ch3) */
  let spacerX: number[] = [];
  const detectChapter = (x: number) => {
    for (let i = spacerX.length - 1; i >= 0; i--) {
      if (x > spacerX[i]) return i + 1;
    }
    return 0;
  };
  const recalcSpacer = () => {
    const track = trackRef.current;
    if (!track) return;
    const GAP = 20;
    spacerX = [];
    let acc = 0;
    for (let i = 0; i < ALL_IMAGES.length; i++) {
      const child = track.children[i] as HTMLElement;
      if (ALL_IMAGES[i].spacer) {
        spacerX.push(acc + (child?.offsetWidth || 1300) * 0.5);
      }
      acc += (child?.offsetWidth || (ALL_IMAGES[i].spacer ? 1300 : 0)) + GAP;
    }
  };

  /* Observer */
  useEffect(() => {
    const wrap = sectionRef.current;
    if (!wrap) return;

    const obs = Observer.create({
      target: wrap,
      type: "wheel,touch",
      wheelSpeed: 1,
      tolerance: 5,
      preventDefault: true,
      onChange: (self) => {
        const dir = self.deltaY > 0 ? 1 : -1;
        const cur = scrollXRef.current;

        /* Boundary: prev page */
        if (dir < 0 && cur <= 0) {
          const ps = wrap.previousElementSibling;
          if (ps) ps.scrollIntoView({ behavior: "smooth" });
          return;
        }
        /* Boundary: next page */
        if (dir > 0 && cur >= maxScroll.current - 5) {
          const ns = wrap.nextElementSibling;
          if (ns) ns.scrollIntoView({ behavior: "smooth" });
          return;
        }

        const newX = cur + self.deltaY * 2;
        const clamped = Math.max(0, Math.min(maxScroll.current, newX));
        setScrollX(clamped);
        scrollXRef.current = clamped;

        if (trackRef.current) {
          gsap.to(trackRef.current, { x: -clamped, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        }

        /* Update chapter based on scroll position */
        const newCh = detectChapter(clamped);
        if (newCh !== chapterRef.current && !isSwitching.current) {
          isSwitching.current = true;
          chapterRef.current = newCh;
          gsap.to(textRef.current, { autoAlpha: 0, duration: 0.2, onComplete: () => {
            setChapter(newCh);
            gsap.to(textRef.current, { autoAlpha: 1, duration: 0.3, onComplete: () => {
              isSwitching.current = false;
            }});
          }});
        }
      },
    });

    return () => obs.kill();
  }, []);

  const chIdx = chapter + 1;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#3D4F5D", scrollSnapAlign: "start" }}
    >
      <Styles />
      <div className="halftone-layer" />

      <div className="sports-big-text">
        <h2 className="sports-text" style={isZh ? { fontSize: "clamp(19rem,51vw,58rem)" } : undefined}>
          {t("exp_sports", "体育")}
        </h2>
      </div>

      <div ref={glassRef} className="glass-panel">
        <div ref={textRef} className="glass-inner">
          <h3 className="card-title">{t(`exp_sports_${chIdx}_title`)}</h3>
          <span className="card-role">{t(`exp_sports_${chIdx}_role`)}</span>
          <p className="card-desc">{t(`exp_sports_${chIdx}_desc`)}</p>
        </div>
      </div>

      <div className="content-area">
        <div className="img-strip-wrap">
          <div ref={trackRef} className="img-strip-track">
            {ALL_IMAGES.map((img, i) => (
              img.spacer ? (
                <div key={i} className="chapter-gap" />
              ) : (
                <div key={i} className="img-slot">
                  <img src={img.src} alt="" className="exp-img" />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Styles() {
  return (
    <style>{`
      .halftone-layer {
        position:absolute;inset:-20px;pointer-events:none;z-index:1;
        background-image:radial-gradient(circle,#CDD3D3 1.5px,transparent 1.5px);
        background-size:20px 20px;opacity:0.2;
      }
      .sports-big-text {
        position:absolute;inset:0;z-index:3;
        display:flex;align-items:center;justify-content:center;
        pointer-events:none;overflow:hidden;
      }
      .sports-text {
        font-size:clamp(10rem,26vw,29rem);font-weight:900;
        letter-spacing:-0.05em;color:#A6B2BA;
        margin:0;line-height:1;text-align:center;white-space:nowrap;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .glass-panel {
        position:absolute;top:5%;left:3%;z-index:20;
        width:33.333%;height:90%;
        background:rgba(174,191,201,0.1);
        backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
        border-radius:32px;
        border:1px solid rgba(205,211,211,0.15);
        box-shadow:inset 0 0 80px rgba(255,255,255,0.03),0 20px 60px rgba(0,0,0,0.3);
      }
      .glass-inner {
        padding:28px 24px;height:100%;
        display:flex;flex-direction:column;justify-content:center;
        overflow-y:auto;
      }
      .content-area {
        position:absolute;top:0;right:0;z-index:5;
        width:66.666%;height:100%;
        padding:40px 30px;display:flex;align-items:center;
      }
      .glass-panel .card-title {
        font-size:clamp(1.8rem,4.2vw,2.7rem);font-weight:700;
        color:#FFFFFF;margin:0 0 8px;line-height:1.3;
        letter-spacing:0.04em;text-align:center;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .glass-panel .card-role {
        display:block;text-align:center;font-size:18px;font-weight:600;
        color:#8B00FF;letter-spacing:0.12em;margin-bottom:16px;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .glass-panel .card-desc {
        font-size:21px;color:#E8D800;line-height:1.75;margin:0;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;font-weight:400;
        font-style:italic;
      }
      .img-strip-wrap {width:100%;height:100%;overflow:hidden;display:flex;align-items:center;}
      .img-strip-track {display:flex;gap:20px;height:76%;align-items:center;padding:0 20px;will-change:transform;}
      .img-slot {height:100%;flex-shrink:0;display:flex;align-items:center;}
      .exp-img {height:100%;width:auto;object-fit:contain;border-radius:12px;display:block;transition:transform 0.35s ease;}
      .exp-img:hover {transform:scale(1.1);}
      .chapter-gap {width:1300px;flex-shrink:0;height:100%;}
    `}</style>
  );
}

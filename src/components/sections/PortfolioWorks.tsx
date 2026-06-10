import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Data
   ================================================================ */
const WORK = {
  poster: "/作品集1/海报.jpg",
  horizontalImages: Array.from({ length: 9 }, (_, i) => `/作品集1/${i + 1}.png`),
  bilibili: "BV1xx411c7XG",
  youtube: "",
};

function getBilibiliEmbed(bvid: string) {
  return `//player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&danmaku=0`;
}

/* ================================================================
   Interface 1: Card Grid
   ================================================================ */
function CardView() {
  const { t } = useTranslation();
  const [hz, setHz] = useState(0);
  const imgs = WORK.horizontalImages;

  /* auto-scroll every 3s */
  useEffect(() => {
    if (imgs.length <= 1) return;
    const t = setInterval(() => setHz((p) => (p + 1) % imgs.length), 3000);
    return () => clearInterval(t);
  }, [imgs.length]);

  return (
    <section className="cards-page">
      <div className="card-stage">
        {/* TL: Title + Category */}
        <div className="card-tile tile-tl">
          <div className="tile-inner">
            <h1 className="tile-title">{t("work_1_title")}</h1>
            <p className="tile-cat">{t("work_1_category")}</p>
          </div>
        </div>

        {/* TC: Poster (vertical 9:16, no play button) */}
        <div className="card-tile tile-poster">
          <div className="poster-box">
            <img src={WORK.poster} alt="" className="poster-img" />
          </div>
        </div>

        {/* TR: Horizontal images (16:9, scrollable) */}
        <div className="card-tile tile-horiz">
          <div className="horiz-box">
            <div className="horiz-track" style={{ transform: `translateX(-${hz * 100}%)` }}>
              {imgs.map((img, i) => <img key={i} src={img} alt="" className="horiz-img" />)}
            </div>
            <div className="horiz-nav">
              {imgs.map((_, i) => (
                <button key={i} className={`horiz-dot ${i === hz ? "a" : ""}`} onClick={() => setHz(i)} />
              ))}
              <button className="horiz-arr" onClick={() => setHz((hz + 1) % imgs.length)}>→</button>
            </div>
          </div>
        </div>

        {/* 4: Awards (row 2, col 3) */}
        <div className="card-tile tile-awards">
          <div className="tile-inner" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <span className="award-icon">🏆</span>
            <span className="award-text">{t("work_1_awards")}</span>
          </div>
        </div>

        {/* 5: Roles (row 3, cols 1-2) */}
        <div className="card-tile tile-bl">
          <div className="tile-inner">
            <h3 className="tile-label">Role</h3>
            <ul className="tile-roles">
              <li>{t("work_1_role_1")}</li>
              <li>{t("work_1_role_2")}</li>
              <li>{t("work_1_role_3")}</li>
            </ul>
          </div>
        </div>

        {/* 6: Description (row 3, col 3) */}
        <div className="card-tile tile-br">
          <div className="tile-inner tile-scroll">
            <p className="tile-desc">{t("work_1_reflection")}</p>
            <p className="tile-desc">{t("work_1_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Interface 2: Video
   ================================================================ */
function VideoView() {
  const { t } = useTranslation();
  const [play, setPlay] = useState(false);
  const src = WORK.bilibili ? getBilibiliEmbed(WORK.bilibili) : null;

  return (
    <section className="video-page">
      <div className="video-wrap">
        <div className="video-box">
          {play && src ? (
            <iframe src={src} className="video-iframe" allowFullScreen allow="autoplay; encrypted-media" title={t("work_1_title")} />
          ) : (
            <button className="video-trigger" onClick={() => setPlay(true)}>
              <img src={WORK.poster} alt="" className="video-cover" />
              <div className="video-play-btn">
                <svg viewBox="0 0 24 24" fill="white" width="56" height="56"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </button>
          )}
        </div>
        <h2 className="video-title">{t("work_1_title")}</h2>
        <p className="video-cat">{t("work_1_category")}</p>
        {/* Platform links */}
        <div className="video-links">
          <a href={WORK.bilibili ? `https://www.bilibili.com/video/${WORK.bilibili}` : "#"} target="_blank" rel="noreferrer" className="vid-link-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="vid-link-icon"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.348 1.47-3.773 1.56H5.333c-1.51-.09-2.769-.616-3.773-1.56C.556 20.125.036 18.876 0 17.367v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.263-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746 0-1.387.27-1.92.813-.533.542-.8 1.182-.8 1.92v7.387c0 .738.267 1.378.8 1.92.533.542 1.174.813 1.92.813h13.334c.746 0 1.387-.271 1.92-.813.533-.542.8-1.182.8-1.92V9.973c0-.738-.267-1.378-.8-1.92-.533-.542-1.174-.813-1.92-.813zm1.16 3.573c.32 0 .596.116.827.347.23.23.347.506.347.827 0 .32-.116.595-.347.826a1.126 1.126 0 01-.827.347c-.32 0-.596-.116-.827-.347a1.126 1.126 0 01-.347-.826c0-.32.116-.596.347-.827.23-.23.507-.347.827-.347zm5.547 0c.32 0 .596.116.827.347.23.23.347.506.347.827 0 .32-.116.595-.347.826a1.126 1.126 0 01-.827.347c-.32 0-.596-.116-.827-.347a1.126 1.126 0 01-.347-.826c0-.32.116-.596.347-.827.23-.23.507-.347.827-.347z"/></svg>
            <span>Bilibili</span>
          </a>
          <a href={WORK.youtube ? `https://youtube.com/watch?v=${WORK.youtube}` : "https://www.youtube.com"} target="_blank" rel="noreferrer" className="vid-link-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="vid-link-icon"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Main — GSAP: cards slide left, video slides in from right
   ================================================================ */
export default function PortfolioWorks() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cards = cardsRef.current;
    const video = videoRef.current;
    const bg = bgRef.current;
    if (!wrap || !cards || !video) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      gsap.set(video, { xPercent: 100 });
      tl.to(cards, { xPercent: -100, ease: "power3.inOut" }, 0)
        .to(video, { xPercent: 0, ease: "power3.inOut" }, 0);
      if (bg) tl.to(bg, { xPercent: -50, ease: "power3.inOut" }, 0);
    }, wrap);

    /* Card entrance: fade in on enter */
    const tiles = wrap.querySelectorAll(".card-tile");
    const entranceTween = gsap.fromTo(tiles,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => { ctx.revert(); entranceTween.kill(); };
  }, []);

  return (
    <>
      <Styles />
      <div ref={wrapRef} className="portfolio-works-wrap">
        <div ref={bgRef} className="shared-bg">
          <img src="/作品集1/作品集背景1.jpg" alt="" />
        </div>
        <div ref={cardsRef} className="page-card">
          <CardView />
        </div>
        <div ref={videoRef} className="page-video">
          <VideoView />
        </div>
      </div>
    </>
  );
}

/* ================================================================
   Styles
   ================================================================ */
function Styles() {
  return (
    <style>{`
      .portfolio-works-wrap { position:relative; overflow:hidden; height:100vh; }
      .shared-bg {
        position:absolute; top:0; left:0; z-index:0;
        width:200%; height:100%;
        will-change:transform;
        opacity:0.5;
      }
      .shared-bg img {
        width:100%; height:100%;
        object-fit:fill;
        display:block;
      }
      .page-card {
        position:relative; z-index:1;
        width:100%; height:100vh;
        display:flex; align-items:center; justify-content:center;
      }
      .page-video {
        position:absolute; top:0; left:0; z-index:2;
        width:100%; height:100vh;
        display:flex; align-items:center; justify-content:center;
        will-change:transform;
      }

      /* ── Card grid ── */
      .cards-page { width:100%; max-width:1400px; padding:20px; transform:scale(0.9); transform-origin:center center; }
      .card-stage {
        display:grid;
        grid-template-columns:0.75fr 0.8fr 1.45fr;
        grid-template-rows:auto auto auto;
        gap:12px; width:100%;
      }

      /* ── Tiles ── */
      .card-tile {
        border-radius:16px; background:#B2B0AC;
        border:1px solid rgba(0,0,0,0.05); overflow:hidden; cursor:default;
        box-shadow:0 1px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5);
        transition: transform 0.35s cubic-bezier(0.25,0.1,0.25,1);
      }
      .card-tile:hover {
        transform: scale(1.03);
        box-shadow:0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5);
      }
      .tile-inner { padding:24px; height:100%; display:flex; flex-direction:column; }

      /* ── TL: title (row 1-2, col 1) ── */
      .tile-tl { grid-row: 1 / 3; grid-column: 1; }
      .tile-tl .tile-inner { justify-content:center; align-items:center; text-align:center; }
      .tile-title {
        font-size:clamp(3rem,7vw,4.4rem); font-weight:800; color:#2a2a2a;
        letter-spacing:0.02em; line-height:1.15; margin:0 0 6px;
        font-family:var(--font-display),"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .tile-cat {
        font-size:11px; font-weight:400; color:rgba(0,0,0,0.4);
        letter-spacing:0.18em; margin:0;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
      }

      /* ── Poster card (9:16, contain, row 1-2 col 2) ── */
      .tile-poster { padding:0 !important; grid-row: 1 / 3; grid-column: 2; }
      .poster-box {
        width:100%; height:100%;
      }
      .poster-img {
        width:100%; height:100%; object-fit:cover;
      }

      /* ── Horiz images card (row 1, col 3) ── */
      .tile-horiz { padding:0 !important; aspect-ratio:16/9; grid-row: 1; grid-column: 3; }
      .horiz-box { width:100%; height:100%; position:relative; overflow:hidden; background:#000; }
      .horiz-track {
        display:flex; height:100%;
        transition:transform 0.5s cubic-bezier(0.25,0.1,0.25,1);
      }
      .horiz-img {
        flex-shrink:0; width:100%; height:100%; object-fit:cover;
      }
      .horiz-nav {
        position:absolute; bottom:10px; right:14px;
        display:flex; align-items:center; gap:5px;
      }
      .horiz-dot {
        width:5px; height:5px; border-radius:50%;
        border:none; background:rgba(0,0,0,0.2);
        cursor:pointer; padding:0; transition:all 0.3s;
      }
      .horiz-dot.a { background:#555; width:15px; border-radius:3px; }
      .horiz-arr { background:none; border:none; color:rgba(0,0,0,0.5); cursor:pointer; font-size:13px; padding:2px 4px; }

      /* ── BL: roles (row 3, col 1) ── */
      .tile-bl { grid-row: 3; grid-column: 1; }
      .tile-label {
        font-size:9px; font-weight:500; color:rgba(0,0,0,0.25);
        letter-spacing:0.28em; margin:0 0 12px;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
      }
      .tile-roles { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:4px; }
      .tile-roles li {
        font-size:15px; font-weight:500; color:rgba(0,0,0,0.7);
        letter-spacing:0.03em;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
      }

      /* ── Awards (row 2, col 3) ── */
      .tile-awards { grid-row: 2; grid-column: 3; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:6px; }
      .tile-awards .award-icon { font-size:18px; }
      .tile-awards .award-text {
        font-size:12px; font-weight:400; color:#1a1a1a;
        letter-spacing:0.02em; line-height:1.5; white-space:pre-line;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
      }

      /* ── BR: desc (row 3, cols 2-3) ── */
      .tile-br { grid-row: 3; grid-column: 2 / 4; }
      .tile-scroll { overflow-y:auto; }
      .tile-scroll::-webkit-scrollbar { width:3px; }
      .tile-scroll::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.08); border-radius:2px; }
      .tile-desc {
        font-size:13px; line-height:1.7; color:#1a1a1a; margin:0;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif; font-weight:400;
      }

      /* ── Video page ── */
      .video-wrap { max-width:900px; width:100%; display:flex; flex-direction:column; align-items:center; }
      .video-box {
        width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden;
        background:#B2B0AC; border:1px solid rgba(0,0,0,0.04);
        box-shadow:0 20px 50px rgba(0,0,0,0.08);
      }
      .video-iframe { width:100%; height:100%; border:none; }
      .video-trigger { width:100%; height:100%; position:relative; border:none; padding:0; cursor:pointer; background:#dcd8d2; }
      .video-cover { width:100%; height:100%; object-fit:cover; opacity:0.7; transition:opacity 0.4s; }
      .video-trigger:hover .video-cover { opacity:0.45; }
      .video-play-btn { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; transition:transform 0.3s; }
      .video-trigger:hover .video-play-btn { transform:scale(1.08); }
      .video-title {
        margin-top:22px; font-size:clamp(1.4rem,2.5vw,2rem);
        font-weight:800; color:#e8e8e8; letter-spacing:0.02em;
        font-family:var(--font-display),"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .video-cat {
        font-size:11px; font-weight:400; color:rgba(255,255,255,0.35); letter-spacing:0.18em; margin-top:3px;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
      }
      .video-links {
        display:flex; gap:10px; margin-top:20px;
      }
      .vid-link-btn {
        display:inline-flex; align-items:center; gap:6px;
        padding:8px 16px; border-radius:8px;
        font-size:12px; font-weight:500; text-decoration:none;
        color:#1a1a1a; background:#B2B0AC;
        letter-spacing:0.03em;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
        transition:all 0.3s;
      }
      .vid-link-btn:hover {
        background:#9a9894; color:#000;
      }
      .vid-link-icon { width:18px; height:18px; flex-shrink:0; }
    `}</style>
  );
}

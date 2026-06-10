import { useTranslation } from "react-i18next";

/* 把 logo 放到 public/合作伙伴/ 下，在此列出文件名 */
const LOGOS: string[] = [
  "1/1.png",
  "1/11.png",
  "1/2.png",
  "1/22.png",
  "1/3.png",
  "1/33.png",
  "1/99.png",
  "1/a.png",
  "1/l.png",
  "1/logo 2.png",
  "1/s.png",
  "1/w.png",
  "1/z.png",
  "1/未标-1.png",
  "1/未标题-1.png",
  "1/未题-1.png",
];

export default function PartnerMarquee() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center gap-6"
      style={{ height: "50vh", background: "linear-gradient(to bottom, #3D4F5D 0%, #3D4F5D 40%, transparent 100%)", scrollSnapAlign: "start" }}
    >
      <Styles />
      <div className="halftone-layer" />

      <h3 className="partner-title">{t("partner_title", "合作企业")}</h3>

      <div className="marquee-track-wrap">
        <div className="marquee-track">
          {LOGOS.concat(LOGOS).map((logo, i) => (
            <div key={i} className="logo-slot">
              <img src={`${import.meta.env.BASE_URL}合作伙伴/${logo}`} alt="" className="logo-img" />
            </div>
          ))}
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
      .partner-title {
        font-size:clamp(2rem,5vw,3.5rem);font-weight:700;
        color:#CDD3D3;letter-spacing:0.1em;margin:0;z-index:2;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .marquee-track-wrap {
        width:100%;overflow:hidden;z-index:2;
      }
      .marquee-track {
        display:flex;gap:96px;align-items:center;
        animation:partnerScroll 40s linear infinite;
        width:max-content;
      }
      .marquee-track:hover {
        animation-play-state:paused;
      }
      .logo-slot {
        flex-shrink:0;display:flex;align-items:center;justify-content:center;
        height:128px;
      }
      .logo-img {
        height:100%;width:auto;object-fit:contain;
        filter:grayscale(30%) brightness(1.1);
        transition:filter 0.3s ease;
      }
      .logo-img:hover {
        filter:grayscale(0%) brightness(1);
      }
      @keyframes partnerScroll {
        0% { transform:translateX(0); }
        100% { transform:translateX(-50%); }
      }
    `}</style>
  );
}

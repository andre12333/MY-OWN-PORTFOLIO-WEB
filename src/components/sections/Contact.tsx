import { useState } from "react";
import { useTranslation } from "react-i18next";

const contactImgs: Record<string, string> = {
  "zh-CN": "/联系 中.png",
  "zh-HK": "/联系 繁.png",
  en: "/联系 英.png",
};

const cards = [
  {
    key: "phone",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone & Email",
    color: "#4A5568",
    qr: false,
    lines: ["+86 18848820612", "1311894455@qq.com", "L1311894455@outlook.com"],
  },
  {
    key: "wechat",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    label: "WeChat",
    color: "#07C160",
    qr: true,
    qrSrc: "/contact/1 (1).jpg",
    lines: ["18848820612"],
  },
  {
    key: "instagram",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    label: "Instagram",
    color: "#E1306C",
    qr: true,
    qrSrc: "/contact/2.jpg",
    lines: ["@JIAYE519"],
  },
  {
    key: "telegram",
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.49 8.17l-1.83 8.63c-.14.6-.49.75-1 .47l-2.75-2.03-1.33 1.28c-.15.15-.27.27-.56.27l.2-2.8 5.1-4.6c.22-.2-.05-.3-.34-.12l-6.3 3.97-2.71-.85c-.59-.18-.6-.59.12-.87l10.6-4.08c.49-.18.92.12.76.87z"/>
      </svg>
    ),
    label: "Telegram",
    color: "#0088CC",
    qr: true,
    qrSrc: "/contact/3.jpg",
    lines: ["+86 18848820612", "https://t.me/iamyeqwq"],
  },
];

export default function Contact() {
  const { i18n } = useTranslation();
  const src = contactImgs[i18n.language] || contactImgs["zh-CN"];
  const [open, setOpen] = useState<string | null>(null);

  const activeCard = cards.find((c) => c.key === open);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      <Styles />

      {/* 背景图 */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* 星星 */}
      <div className="star-overlay" />

      {/* 2×2 按钮网格 */}
      <div className="contact-zone">
        <div className="contact-grid">
          {cards.map((card) => (
            <button
              key={card.key}
              className="contact-card-btn"
              style={{
                background: card.color,
                boxShadow: open === card.key ? `0 0 40px ${card.color}88` : `0 8px 24px ${card.color}33`,
              }}
              onClick={() => setOpen(open === card.key ? null : card.key)}
            >
              <span className="contact-card-icon">{card.icon}</span>
              <span className="contact-card-label">{card.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 弹窗 */}
      {activeCard && (
        <div className="modal-backdrop" onClick={() => setOpen(null)}>
          <div
            className="modal-panel"
            style={{ borderColor: activeCard.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setOpen(null)}>✕</button>
            <div className="modal-icon" style={{ color: activeCard.color }}>
              {activeCard.icon}
            </div>
            <h3 className="modal-title" style={{ color: activeCard.color }}>
              {activeCard.label}
            </h3>

            {activeCard.qr ? (
              <div className="modal-body">
                {"qrSrc" in activeCard && activeCard.qrSrc ? (
                  <img src={activeCard.qrSrc as string} alt="QR" className="qr-img" />
                ) : (
                  <div className="qr-placeholder">QR 码</div>
                )}
                {activeCard.lines.map((line, i) => (
                  <span key={i} className="modal-text">{line}</span>
                ))}
              </div>
            ) : (
              <div className="modal-body">
                {activeCard.lines.map((line, i) => (
                  <a
                    key={i}
                    href={i === 0 ? `tel:${line}` : `mailto:${line}`}
                    className="modal-link"
                  >
                    {line}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Styles() {
  return (
    <style>{`
      .star-overlay {
        position:absolute;inset:0;z-index:2;pointer-events:none;
        background-image:
          radial-gradient(3px 3px at 8% 12%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 22% 28%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 38% 6%, rgba(255,255,255,0.6), transparent),
          radial-gradient(3px 3px at 52% 42%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 68% 18%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 82% 52%, rgba(255,255,255,0.6), transparent),
          radial-gradient(3px 3px at 12% 68%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 28% 56%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 48% 72%, rgba(255,255,255,0.6), transparent),
          radial-gradient(3px 3px at 62% 82%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 78% 68%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 4% 48%, rgba(255,255,255,0.7), transparent),
          radial-gradient(3px 3px at 42% 28%, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 88% 38%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 18% 88%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 58% 12%, rgba(255,255,255,0.6), transparent),
          radial-gradient(3px 3px at 32% 78%, rgba(255,255,255,0.7), transparent),
          radial-gradient(2px 2px at 72% 32%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 92% 72%, rgba(255,255,255,0.6), transparent),
          radial-gradient(3px 3px at 52% 58%, rgba(255,255,255,0.7), transparent);
      }

      /* 2x2 网格 */
      .contact-zone {
        position:absolute;z-index:10;
        left:5%;bottom:8%;width:58%;height:52%;
        display:flex;align-items:center;justify-content:center;
      }
      .contact-grid {
        display:grid;grid-template-columns:1fr 1fr;gap:24px;
        width:100%;height:100%;
      }

      /* 按钮 */
      .contact-card-btn {
        display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;
        border-radius:24px;border:none;
        cursor:pointer;transition:all 0.35s ease;
        padding:28px;color:#fff;
      }
      .contact-card-btn:hover {
        transform:translateY(-6px) scale(1.04);
        filter:brightness(1.1);
      }
      .contact-card-icon {
        display:flex;transition:transform 0.3s ease;color:#fff;
      }
      .contact-card-btn:hover .contact-card-icon {
        transform:scale(1.15);
      }
      .contact-card-label {
        font-size:17px;font-weight:700;letter-spacing:0.08em;color:#fff;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }

      /* 弹窗遮罩 */
      .modal-backdrop {
        position:absolute;inset:0;z-index:50;
        background:rgba(0,0,0,0.7);
        backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        display:flex;align-items:center;justify-content:center;
        animation:modalFadeIn 0.25s ease both;
      }
      .modal-panel {
        position:relative;
        width:min(520px,80vw);padding:48px 40px;
        border-radius:28px;border:2px solid;
        background:rgba(10,10,26,0.95);
        backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
        display:flex;flex-direction:column;align-items:center;gap:24px;
        animation:modalZoomIn 0.35s ease both;
      }
      .modal-close {
        position:absolute;top:14px;right:18px;
        background:none;border:none;color:rgba(255,255,255,0.4);
        font-size:22px;cursor:pointer;padding:4px 8px;
        transition:color 0.3s;
      }
      .modal-close:hover { color:#fff; }
      .modal-icon { display:flex; }
      .modal-icon svg { width:48px;height:48px; }
      .modal-title {
        font-size:24px;font-weight:700;margin:0;letter-spacing:0.06em;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .modal-body {
        display:flex;flex-direction:column;align-items:center;gap:16px;
      }
      .modal-link {
        font-size:22px;color:#CDD3D3;text-decoration:none;
        transition:color 0.3s ease;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .modal-link:hover { color:#FFD700; }
      .modal-text {
        font-size:20px;color:#CDD3D3;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .qr-placeholder {
        width:200px;height:200px;border-radius:16px;
        background:rgba(255,255,255,0.06);border:2px dashed rgba(255,255,255,0.15);
        display:flex;align-items:center;justify-content:center;
        color:rgba(255,255,255,0.25);font-size:14px;
        font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
      }
      .qr-img {
        width:200px;height:200px;object-fit:contain;border-radius:16px;
        background:#fff;padding:8px;
      }

      @keyframes modalFadeIn {
        from { opacity:0; }
        to { opacity:1; }
      }
      @keyframes modalZoomIn {
        from { opacity:0; transform:scale(0.9) translateY(20px); }
        to { opacity:1; transform:scale(1) translateY(0); }
      }
    `}</style>
  );
}

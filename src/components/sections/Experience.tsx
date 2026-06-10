import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import gsap from "gsap";

const TOTAL_COMPONENTS = 4;
const NODES_PER_COMPONENT = 6;

interface CourseData {
  name: string;
  gpa: number;
  score: number;
  desc: string;
}

const courses: CourseData[] = [
  { name: "艺术概论", gpa: 3.9, score: 89, desc: "讲授艺术基础理论与各类艺术形态特征，培养影视相关专业的审美能力和艺术赏析素养。" },
  { name: "视听语言", gpa: 4.2, score: 92, desc: "系统学习镜头、构图、蒙太奇和声画关系等核心知识，是视频创作与影片解读的专业基础课程。" },
  { name: "影视名片赏析（电影）", gpa: 3.9, score: 89, desc: "赏析国内外经典电影名作，拆解镜头语言与叙事结构，撰写相关论文。" },
  { name: "影视评论 1", gpa: 3.7, score: 87, desc: "学习影视评论的基本框架与分析角度，训练从专业视角评析影片主题、镜头与人物表达。" },
  { name: "图像处理与设计基础", gpa: 3.7, score: 87, desc: "学习PS相关使用，学习图片修图、版式设计、色彩搭配等技能，为视觉制作打基础。" },
  { name: "计算机应用基础", gpa: 3.7, score: 87, desc: "掌握计算机基础操作、办公软件使用，满足影视专业文案整理、文件排版与日常办公需求。" },
  { name: "影视评论 2", gpa: 3.6, score: 86, desc: "进阶学习影视批评理论，结合不同类型影片进行深度分析写作，提升文字表达与影视思辨能力。" },
  { name: "电视编辑", gpa: 4.2, score: 92, desc: "学习影视剪辑原理、镜头组接、转场运用与节奏把控，熟练完成电视节目与视频成片剪辑制作。" },
  { name: "影视导演基础", gpa: 3.6, score: 86, desc: "了解导演工作全流程，学习分镜头脚本、场面调度与现场拍摄统筹，拍摄短片，建立影视叙事创作思维。" },
  { name: "广播电视节目形态研究", gpa: 3.6, score: 86, desc: "研究综艺、访谈、专题等各类广电节目形态，分析节目模式、制作特点与行业发展趋势。" },
  { name: "超现实实验影像赏析", gpa: 4.5, score: 95, desc: "赏析先锋超现实实验影像作品，学习非常规视听表达手法，激发创意影像创作灵感。" },
  { name: "电视节目策划", gpa: 3.8, score: 88, desc: "讲授电视节目选题构思、创意策划、流程设计与方案撰写方法，具备节目原创策划基础能力。" },
  { name: "纪录片创作", gpa: 4.2, score: 92, desc: "掌握纪录片选题、实地拍摄、叙事结构搭建与后期剪辑，完成纪实类影像作品创作。" },
  { name: "影视编剧创作", gpa: 4.2, score: 92, desc: "学习故事构思、人物塑造、情节编排与剧本写作技巧，培养影视脚本原创和改编创作能力。" },
  { name: "照明艺术", gpa: 3.8, score: 88, desc: "学习影视布光原理、光影造型与色彩灯光设计，掌握拍摄中营造氛围、塑造人物的用光技巧。" },
  { name: "电影摄影", gpa: 4.0, score: 90, desc: "系统学习摄影机操作、构图取景、运镜方式与光影运用，具备专业影视画面拍摄与影像把控能力。" },
  { name: "电视节目制作", gpa: 4.2, score: 92, desc: "涵盖前期策划、中期拍摄、后期剪辑包装全流程，掌握完整电视节目标准化制作流程，拍摄新闻专题片。" },
  { name: "短视频创作", gpa: 3.7, score: 87, desc: "针对新媒体平台，学习短视频脚本、拍摄、剪辑与风格定位，适配自媒体短视频创作需求，拍摄、运营抖音账号。" },
  { name: "电视节目导播", gpa: 4.1, score: 91, desc: "掌握多机位直播切换、现场调度与节目把控技巧，具备晚会、综艺等节目的导播统筹能力及制作能力。" },
  { name: "化妆造型", gpa: 3.6, score: 86, desc: "学习影视人物基础妆容与造型设计，适配影视拍摄、节目录制中的人物形象塑造工作。" },
  { name: "真人秀节目创作", gpa: 3.5, score: 85, desc: "解析真人秀节目叙事逻辑、环节设置与纪实拍摄手法，掌握真人秀策划与后期剪辑创作要点，制作一档可持续真人秀。" },
  { name: "欧美流行音乐文化", gpa: 3.9, score: 89, desc: "梳理欧美流行音乐发展历程与风格流派，提升音乐审美，为影视配乐、节目配乐提供参考。" },
  { name: "美式腰旗橄榄球（进阶）", gpa: 4.3, score: 93, desc: "学习腰旗橄榄球规则、技术动作与团队战术，锻炼身体素质、团队协作与竞技意识。" },
  { name: "网球基础训练", gpa: 4.6, score: 96, desc: "掌握网球基础击球、步法移动和竞赛规则，培养专注力、协调性与持之以恒的运动习惯。" },
];

const iconPaths: Record<string, string> = {
  edit: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
  motion: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  film: "M2 12h2l3-8 3 16 3-12 3 4h2",
  music: "M9 18V5l12-2v13 M9 9a3 3 0 000 6 M21 11a3 3 0 000 6",
  commercial: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 14l4-4-4-4v8z",
  experimental: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z M12 9a3 3 0 100 6 3 3 0 000-6z",
};

const catIcons = ["edit", "motion", "film", "music", "commercial", "experimental"];

function gpaBadge(gpa: number) {
  if (gpa > 3.7) return { bg: "#e8d5b7", text: "#0a0a0f" };
  return { bg: "#ff6b35", text: "#0a0a0f" };
}

/* ============ One orbital slide ============ */
function OrbitalSlide({ slideIndex, active }: { slideIndex: number; active: boolean }) {
  const { t } = useTranslation();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const animRef = useRef(0);

  useEffect(() => {
    if (!active || !autoRotate) return;
    const t = setInterval(() => setRotationAngle((p) => ((p + 0.2) % 360)), 50);
    return () => clearInterval(t);
  }, [active, autoRotate]);

  const handleToggle = (idx: number) => {
    if (expandedIdx === idx) {
      setExpandedIdx(null);
      setAutoRotate(true);
    } else {
      setExpandedIdx(idx);
      setAutoRotate(false);
      const target = 270 - (idx / NODES_PER_COMPONENT) * 360;
      cancelAnimationFrame(animRef.current);
      const s = rotationAngle, t0 = performance.now();
      const animate = (t1: number) => {
        const p = Math.min(1, (t1 - t0) / 600);
        setRotationAngle(s + ((target - s) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }
  };

  const getNodePos = (idx: number) => {
    const angle = ((idx / NODES_PER_COMPONENT) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 200 * Math.cos(rad),
      y: 200 * Math.sin(rad),
      zIndex: Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2))),
    };
  };

  return (
    <div className="slide-inner" onClick={() => { setExpandedIdx(null); setAutoRotate(true); }}>
      {/* Center orb */}
      <div className="center-orb">
        <div className="center-ring ring-1" />
        <div className="center-ring ring-2" />
        <div className="center-ring ring-3" />
        <div className="center-core">
          <div className="core-glow" />
          <div className="core-inner" />
        </div>
      </div>
      <div className="orbit-ring orbit-1" />
      <div className="orbit-ring orbit-2" />

      {/* Nodes */}
      {Array.from({ length: NODES_PER_COMPONENT }).map((_, idx) => {
        const pos = getNodePos(idx);
        const isExpanded = expandedIdx === idx;
        const nodeNum = slideIndex * NODES_PER_COMPONENT + idx + 1;
        const iconKey = catIcons[idx];
        const course = courses[slideIndex * NODES_PER_COMPONENT + idx];
        const badge = gpaBadge(course.gpa);

        return (
          <div
            key={idx}
            className={`node-wrapper ${isExpanded ? "expanded" : ""}`}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex: isExpanded ? 300 : pos.zIndex,
              opacity: isExpanded ? 1 : pos.opacity,
            }}
            onClick={(e) => { e.stopPropagation(); handleToggle(idx); }}
          >
            <div className={`energy-ring ${isExpanded ? "pulse" : ""}`} style={{ width: 70, height: 70 }} />
            <div
              className={`node-btn ${isExpanded ? "active" : ""}`}
              style={{
                background: isExpanded ? badge.bg : "#0a0a0f",
                borderColor: isExpanded ? badge.bg : "rgba(232,213,183,0.45)",
                color: isExpanded ? badge.text : "rgba(232,213,183,0.75)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="node-icon">
                <path d={iconPaths[iconKey] || "M12 2a10 10 0 100 20 10 10 0 000-20z"} />
              </svg>
            </div>
            <div className={`node-label ${isExpanded ? "label-active" : ""}`}>{t(`course_${nodeNum}_name`, course.name)}</div>

            {isExpanded && (
              <div className="expanded-card" onClick={(e) => e.stopPropagation()}>
                <div className="card-connector" />
                <div className="card-header">
                  <span className="card-status" style={{ background: badge.bg, color: badge.text }}>{course.gpa.toFixed(1)}</span>
                </div>
                <h3 className="card-title">{t(`course_${nodeNum}_name`, course.name)}</h3>
                <p className="card-content">{t(`course_${nodeNum}_desc`, course.desc)}</p>
                <div className="energy-bar-wrap">
                  <span className="e-label">分数</span>
                  <span className="e-val">{course.score}%</span>
                  <div className="e-track"><div className="e-fill" style={{ width: `${course.score}%` }} /></div>
                </div>
                <div className="related-wrap">
                  <span className="related-label">关联项目</span>
                  <div className="related-btns">
                    <button className="related-btn" onClick={(e) => { e.stopPropagation(); handleToggle((idx + 1) % 6); }}>
                      {t(`course_${nodeNum + 1 > slideIndex * 6 + 6 ? slideIndex * 6 + 1 : nodeNum + 1}_name`)} →
                    </button>
                    <button className="related-btn" onClick={(e) => { e.stopPropagation(); handleToggle((idx + 2) % 6); }}>
                      {t(`course_${nodeNum + 2 > slideIndex * 6 + 6 ? slideIndex * 6 + 2 : nodeNum + 2}_name`)} →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ============ Main section ============ */
export default function Experience() {
  const { t, i18n } = useTranslation();
  const [slideIdx, setSlideIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const isEn = i18n.language === "en";
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { y: 60, autoAlpha: 0, scale: 0.9 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [i18n.language]);

  const next = () => { if (slideIdx < TOTAL_COMPONENTS - 1) { setDirection(1); setSlideIdx((p) => p + 1); } };
  const prev = () => { if (slideIdx > 0) { setDirection(-1); setSlideIdx((p) => p - 1); } };

  return (
    <StyledWrapper>
      <section className="exp-section">
        {/* Left: vertical title */}
        <div className={`left-title ${isEn ? "rotated" : ""}`}>
          <span ref={titleRef}>{t("exp_title", "核心课程")}</span>
        </div>

        {/* Slide area - shifted right */}
        <div className="slide-area">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slideIdx}
              custom={direction}
              initial={{ x: direction * 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 120, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <OrbitalSlide slideIndex={slideIdx} active={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons - right side, stacked */}
        <div className="nav-stack">
          <button className="nav-btn-stack" onClick={prev} disabled={slideIdx === 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="nav-btn-stack" onClick={next} disabled={slideIdx === TOTAL_COMPONENTS - 1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="dots">
          {Array.from({ length: TOTAL_COMPONENTS }).map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > slideIdx ? 1 : -1); setSlideIdx(i); }} className={`dot ${i === slideIdx ? "active" : ""}`} />
          ))}
        </div>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .exp-section { position:relative; z-index:10; min-height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden; cursor:default; }
  .exp-content { display:flex; align-items:center; justify-content:center; width:100%; height:100%; }

  /* Left title */
  .left-title { position:absolute; left:40px; top:0; bottom:0; display:flex; align-items:center; z-index:80; }
  .left-title span { font-size:clamp(80px, 16vw, 180px); font-weight:900; letter-spacing:.12em; color:rgba(255,255,255,0.38); writing-mode:vertical-lr; font-family:var(--font-display); line-height:1; }
  .left-title.rotated span { font-size:clamp(60px, 12vw, 130px); letter-spacing:.06em; color:rgba(255,255,255,0.3); }

  /* Slide area - shifted right 1/3, scaled 1.4x */
  .slide-area { position:relative; width:500px; height:500px; margin-left:10%; transform:scale(1.4); }

  /* Center orb */
  .center-orb { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:120px; height:120px; display:flex; align-items:center; justify-content:center; z-index:50; }
  .center-core { width:20px; height:20px; border-radius:50%; background:radial-gradient(circle at 40% 35%, #fff 0%, #e8d5b7 30%, #8b5cf6 70%, #2d1b69 100%); position:relative; box-shadow:0 0 15px rgba(232,213,183,.75),0 0 40px rgba(139,92,246,.53),0 0 80px rgba(139,92,246,.23); }
  .core-inner { position:absolute; inset:-4px; border-radius:50%; background:radial-gradient(circle at 40% 35%, rgba(255,255,255,.6), transparent 60%); }
  .core-glow { position:absolute; inset:-14px; border-radius:50%; background:radial-gradient(circle, rgba(139,92,246,.23), transparent 70%); animation:orb-breathe 3s ease-in-out infinite; }
  @keyframes orb-breathe { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.6);opacity:1} }
  .center-ring { position:absolute; border-radius:50%; pointer-events:none; }
  .ring-1 { width:50px; height:50px; border:1px solid rgba(232,213,183,.38); animation:r-spin 30s linear infinite; }
  .ring-2 { width:72px; height:72px; border:1px dashed rgba(139,92,246,.33); animation:r-spin 22s linear infinite reverse; }
  .ring-3 { width:96px; height:96px; border:1px solid rgba(255,107,53,.27); animation:r-spin 35s linear infinite; border-radius:42% 58% 52% 48%; }
  @keyframes r-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .orbit-ring { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); border-radius:50%; pointer-events:none; }
  .orbit-1 { width:400px; height:400px; border:1px solid rgba(232,213,183,.08); }
  .orbit-2 { width:460px; height:460px; border:1px dashed rgba(139,92,246,.06); }

  /* Nodes */
  .node-wrapper { position:absolute; left:50%; top:50%; display:flex; flex-direction:column; align-items:center; transition:transform .7s ease, opacity .7s ease; cursor:pointer; }
  .energy-ring { position:absolute; border-radius:50%; background:radial-gradient(circle, rgba(255,107,53,.18) 0%, rgba(139,92,246,.09) 40%, transparent 70%); pointer-events:none; transition:all .5s; }
  .energy-ring.pulse { animation:ep 1.5s ease-in-out infinite; }
  @keyframes ep { 0%,100%{transform:scale(1);opacity:.75} 50%{transform:scale(1.3);opacity:.95} }
  .node-btn { width:40px; height:40px; border-radius:50%; border:2px solid; display:flex; align-items:center; justify-content:center; transition:all .3s; position:relative; z-index:2; }
  .node-btn.active { transform:scale(1.4); box-shadow:0 0 20px rgba(255,107,53,.4), 0 0 40px rgba(139,92,246,.2); }
  .node-icon { width:16px; height:16px; }
  .node-label { position:absolute; top:44px; white-space:nowrap; font-size:10px; font-weight:600; letter-spacing:.05em; color:rgba(255,107,53,.83); transition:all .3s; max-width:140px; overflow:hidden; text-overflow:ellipsis; }
  .node-label.label-active { color:rgba(255,107,53,.98); transform:scale(1.1); text-shadow:0 0 10px rgba(255,107,53,.6); }

  /* Expanded card */
  .expanded-card { position:absolute; top:60px; left:50%; transform:translateX(-50%); width:260px; background:rgba(10,10,15,.95); backdrop-filter:blur(20px); border:1px solid rgba(232,213,183,.23); border-radius:16px; padding:20px; z-index:10; box-shadow:0 20px 60px rgba(0,0,0,.5); }
  .card-connector { position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:1px; height:10px; background:rgba(232,213,183,.45); }
  .card-header { display:flex; justify-content:flex-start; align-items:center; margin-bottom:8px; }
  .card-status { font-size:11px; font-weight:700; padding:2px 10px; border-radius:4px; letter-spacing:.1em; font-family:monospace; }
  .card-title { font-size:16px; font-weight:700; color:rgba(232,213,183,.95); margin-bottom:8px; letter-spacing:.05em; line-height:1.3; }
  .card-content { font-size:12px; color:rgba(192,192,192,.9); line-height:1.6; }
  .energy-bar-wrap { margin-top:16px; padding-top:12px; border-top:1px solid rgba(232,213,183,.12); display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
  .e-label { font-size:10px; color:rgba(192,192,192,.6); text-transform:uppercase; letter-spacing:.1em; }
  .e-val { font-size:11px; color:rgba(232,213,183,.9); font-family:monospace; margin-left:auto; }
  .e-track { width:100%; height:4px; background:rgba(255,255,255,.08); border-radius:2px; overflow:hidden; }
  .e-fill { height:100%; border-radius:2px; background:linear-gradient(90deg, rgba(139,92,246,.8), rgba(232,213,183,.8)); transition:width .8s; }
  .related-wrap { margin-top:12px; padding-top:12px; border-top:1px solid rgba(232,213,183,.12); }
  .related-label { font-size:10px; color:rgba(192,192,192,.6); text-transform:uppercase; letter-spacing:.1em; }
  .related-btns { display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
  .related-btn { font-size:10px; padding:4px 8px; border:1px solid rgba(232,213,183,.23); border-radius:4px; background:transparent; color:rgba(192,192,192,.9); cursor:pointer; transition:all .3s; }
  .related-btn:hover { border-color:rgba(232,213,183,.6); color:rgba(232,213,183,.95); background:rgba(232,213,183,.08); }

  /* Nav - right side stacked */
  .nav-stack { position:absolute; right:50px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:12px; z-index:70; }
  .nav-btn-stack { width:40px; height:40px; border-radius:50%; border:1px solid rgba(139,92,246,.45); background:rgba(139,92,246,.12); backdrop-filter:blur(10px); color:rgba(139,92,246,.9); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .3s; }
  .nav-btn-stack:hover:not(:disabled) { border-color:rgba(255,107,53,.9); color:rgba(255,107,53,1); background:rgba(255,107,53,.15); box-shadow:0 0 16px rgba(255,107,53,.3); }
  .nav-btn-stack:disabled { opacity:.23; cursor:not-allowed; }
  .nav-btn-stack svg { width:18px; height:18px; }
  .dots { position:absolute; bottom:60px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:80; }
  .dot { width:8px; height:8px; border-radius:50%; border:1px solid rgba(255,107,53,.45); background:transparent; cursor:pointer; transition:all .4s; padding:0; }
  .dot.active { background:rgba(255,107,53,.95); border-color:rgba(255,107,53,.95); width:24px; border-radius:4px; box-shadow:0 0 10px rgba(255,107,53,.6); }
`;

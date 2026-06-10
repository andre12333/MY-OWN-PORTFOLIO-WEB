import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import CelestialOrb from "./CelestialOrb";

const allPhrases = [
  // 简体中文
  "你好",
  "我是刘家烨",
  "今日心情如何",
  "我希望你开心，因为我很开心",
  "欢迎来到我的天地",
  "随便逛逛",
  // 繁體中文
  "你好",
  "我是劉家燁",
  "今日心情如何",
  "我希望你開心，因為我很開心",
  "歡迎來到我的天地",
  "隨便逛逛",
  // English
  "Hello",
  "I'm Liu Jiaye",
  "How are you today",
  "I hope you're happy, because I am",
  "Welcome to my world",
  "Feel free to explore",
];

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(Math.floor(Math.random() * allPhrases.length));
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 30);
    mouseY.set(y * 20);
  };

  const nextPhrase = useCallback(() => {
    setPhraseIdx((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * allPhrases.length);
      } while (next === prev && allPhrases.length > 1);
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(nextPhrase, 3500);
    return () => clearInterval(timer);
  }, [nextPhrase]);

  const currentPhrase = allPhrases[phraseIdx];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background portrait photo with mouse parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <div
          className="absolute w-full h-full opacity-[0.35]"
          style={{
            backgroundImage: "url(/主页.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(20%) brightness(1.1) contrast(1.05)",
            transform: "scale(1.2)",
          }}
        />
        {/* Gradient overlays to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-space-black/60 via-transparent to-space-black/60" />
      </motion.div>

      {/* Decorative top line */}
      <motion.div
        className="absolute top-32 left-1/2 -translate-x-1/2 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold/40 text-[10px] tracking-[0.4em] font-display">
          PORTFOLIO
        </span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </motion.div>

      {/* Name */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-gold mb-3 mt-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        LIU JIAYE
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-silver/40 text-xs md:text-sm tracking-[0.3em] font-display mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        VISUAL STORYTELLER
      </motion.p>

      {/* Celestial Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      >
        <CelestialOrb />
      </motion.div>

      {/* Decorative ring around orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border border-gold/5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, delay: 1 }}
        />
      </div>

      {/* Cycling text */}
      <div className="mt-14 h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIdx}
            className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.08em] text-silver/80 text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {currentPhrase}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="w-8 h-px bg-accent-purple/40" />
        <div className="w-1 h-1 rounded-full bg-accent-orange/60" />
        <div className="w-8 h-px bg-accent-orange/40" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-silver/25 text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-4 h-7 rounded-full border border-silver/15 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-1.5 bg-silver/30 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

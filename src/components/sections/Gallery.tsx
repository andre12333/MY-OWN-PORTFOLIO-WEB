import { useRef } from "react";
import { motion } from "framer-motion";

const page2Files = [
  "1 (1).jpg", "1 (2).jpg", "1 (3).jpg", "1 (4).jpg",
  "2 (1).jpg", "2 (2).jpg", "2 (3).jpg", "2 (4).jpg",
  "3 (1).jpg", "3 (2).jpg", "3 (3).jpg", "3 (4).jpg",
];

const allImages = page2Files.map((file) => ({
  src: `/page2/${file}`,
}));

// 3 rows, each row has 4 images, duplicated for seamless loop
const rows = [
  allImages.slice(0, 4),
  allImages.slice(4, 8),
  allImages.slice(8, 12),
];

// CSS for the marquee animation
const marqueeStyle = `
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes scroll-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.marquee-track {
  display: flex;
  width: fit-content;
}
.marquee-paused .marquee-track {
  animation-play-state: paused !important;
}
`;

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="relative z-10 min-h-screen flex flex-col px-4 py-6">
      <style>{marqueeStyle}</style>

      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-6 pl-2 shrink-0"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-8 h-px bg-gold/40" />
        <span className="text-gold/40 text-[11px] tracking-[0.4em] font-display">
          SELECTED WORKS
        </span>
      </motion.div>

      {/* 3 rows */}
      <div ref={containerRef} className="flex-1 flex flex-col gap-5 overflow-hidden">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="marquee-row group flex-1 overflow-hidden rounded-lg"
            onMouseEnter={(e) => e.currentTarget.classList.add("marquee-paused")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("marquee-paused")}
          >
            <div
              className="marquee-track h-full gap-5"
              style={{
                animation: `${rowIdx % 2 === 0 ? "scroll-left" : "scroll-right"} ${60 + rowIdx * 15}s linear infinite`,
              }}
            >
              {/* Original set */}
              {row.map((img, i) => (
                <div
                  key={`a-${i}`}
                  className="relative group/item cursor-pointer rounded-lg overflow-hidden border border-white/[0.03] hover:border-gold/20 transition-all duration-500 shrink-0 h-full"
                  style={{ width: "calc((100vw - 2rem - 60px) / 4)" }}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover/item:scale-105"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {row.map((img, i) => (
                <div
                  key={`b-${i}`}
                  className="relative group/item cursor-pointer rounded-lg overflow-hidden border border-white/[0.03] hover:border-gold/20 transition-all duration-500 shrink-0 h-full"
                  style={{ width: "calc((100vw - 2rem - 60px) / 4)" }}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover/item:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-20"
        style={{ background: "linear-gradient(to right, rgba(10,10,15,0.6), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-20"
        style={{ background: "linear-gradient(to left, rgba(10,10,15,0.6), transparent)" }}
      />
    </section>
  );
}

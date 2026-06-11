import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [processedSrc, setProcessedSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Remove dark/black pixels
        if (r < 40 && g < 40 && b < 40) {
          data[i + 3] = 0;
        } else if (r + g + b < 120) {
          // Near-black: fade alpha proportionally
          const darkness = (r + g + b) / 120;
          data[i + 3] = Math.round(data[i + 3] * darkness);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
    img.src = `${import.meta.env.BASE_URL}卡通形象.png`;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setOffset({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 min-h-screen flex flex-col items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Title */}
      <motion.div
        className="mt-24 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle title="关于我" subtitle="ABOUT ME" accent="purple" />
      </motion.div>

      {/* Character - centered bottom, upper body only */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-[95vw] max-w-[700px]"
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), ${offset.y * 0.6}px)`,
          transition: "transform 0.2s ease-out",
          clipPath: "inset(0 0 52% 0)",
        }}
      >
        {processedSrc && (
          <img
            src={processedSrc}
            alt=""
            className="w-full h-auto object-contain pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 50px rgba(139,92,246,0.2)) drop-shadow(0 0 100px rgba(26,58,92,0.12))",
            }}
          />
        )}
      </motion.div>

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}

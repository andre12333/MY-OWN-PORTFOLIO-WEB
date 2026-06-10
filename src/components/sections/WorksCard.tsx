import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface WorksCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  index: number;
}

export default function WorksCard({ title, category, description, tags, image, index }: WorksCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = (mousePos.y - 0.5) * -12;
  const rotateY = (mousePos.x - 0.5) * 12;
  const lightX = mousePos.x * 100;
  const lightY = mousePos.y * 100;

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        perspective: "1000px",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative glass rounded-xl overflow-hidden border border-gold/10"
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.03 : 1,
          boxShadow: isHovered
            ? "0 20px 60px rgba(139,92,246,0.2), 0 0 120px rgba(26,58,92,0.15)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Hover light effect */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 rounded-xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(232,213,183,0.12) 0%, transparent 50%)`,
          }}
        />

        {/* Image area */}
        <div
          className="h-48 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: image
              ? `url(${image})`
              : `linear-gradient(135deg, rgba(26,58,92,0.6), rgba(45,27,105,0.4))`,
          }}
        >
          {!image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] tracking-wider rounded-full bg-space-black/70 backdrop-blur text-gold border border-gold/20">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <h3 className="text-lg font-display font-medium text-silver mb-2">
            {title}
          </h3>
          <p className="text-silver/50 text-sm leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] tracking-wider rounded-md bg-space-black/40 text-silver/40 border border-silver/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: "inset 0 0 0 1px rgba(232,213,183,0.3)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

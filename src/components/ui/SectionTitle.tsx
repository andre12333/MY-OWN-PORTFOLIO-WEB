import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  accent?: "orange" | "purple" | "gold";
}

export default function SectionTitle({ title, subtitle, accent = "gold" }: SectionTitleProps) {
  const accentColors = {
    orange: "from-accent-orange to-accent-orange-light",
    purple: "from-accent-purple to-accent-purple-light",
    gold: "from-gold to-gold-light",
  };

  return (
    <div className="flex flex-col items-center mb-16">
      <motion.span
        className="text-xs tracking-[0.3em] text-silver/50 mb-3 font-display"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {subtitle}
      </motion.span>
      <motion.h2
        className="text-4xl md:text-5xl font-display font-semibold text-silver mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`h-0.5 w-16 bg-gradient-to-r ${accentColors[accent]} rounded-full`}
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}

import type { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

export default function GlowBorder({ children, className = "", borderRadius = "rounded-xl" }: GlowBorderProps) {
  return (
    <div className={`relative ${borderRadius} ${className}`}>
      <div className="glow-border rounded-xl" />
      {children}
    </div>
  );
}

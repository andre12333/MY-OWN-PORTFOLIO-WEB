import { useRef, useEffect, useState } from "react";

interface Props {
  src: string;
}

export default function CutoutPortrait({ src }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Target: full height of viewport, crop to upper body
      const targetH = window.innerHeight;
      const ratio = img.width / img.height;
      const targetW = targetH * ratio;

      canvas.width = targetW;
      canvas.height = targetH;

      // Draw full image, scaled to viewport height
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Check if image has transparency
      const imageData = ctx.getImageData(0, 0, targetW, targetH);
      let hasAlpha = false;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 250) { hasAlpha = true; break; }
      }

      if (!hasAlpha) {
        // Background removal: sample 4 corners to detect bg color
        const corners = [
          imageData.data.slice(0, 4),
          imageData.data.slice((targetW - 1) * 4, (targetW - 1) * 4 + 4),
          imageData.data.slice((targetH - 1) * targetW * 4, (targetH - 1) * targetW * 4 + 4),
          imageData.data.slice(((targetH - 1) * targetW + targetW - 1) * 4, ((targetH - 1) * targetW + targetW - 1) * 4 + 4),
        ];

        const bgR = corners.reduce((s, c) => s + c[0], 0) / 4;
        const bgG = corners.reduce((s, c) => s + c[1], 0) / 4;
        const bgB = corners.reduce((s, c) => s + c[2], 0) / 4;
        const threshold = 80;

        for (let i = 0; i < imageData.data.length; i += 4) {
          const dr = Math.abs(imageData.data[i] - bgR);
          const dg = Math.abs(imageData.data[i + 1] - bgG);
          const db = Math.abs(imageData.data[i + 2] - bgB);
          if (dr < threshold && dg < threshold && db < threshold) {
            imageData.data[i + 3] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }
    };
    img.src = src;
  }, [src]);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  return (
    <div
      className="absolute inset-0 flex items-start justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-auto max-w-none object-cover object-top pointer-events-none"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: "transform 0.15s ease-out",
          filter: "drop-shadow(0 0 40px rgba(139,92,246,0.15))",
        }}
      />
    </div>
  );
}

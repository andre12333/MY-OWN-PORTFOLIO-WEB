import { useRef, useEffect } from "react";

interface PixelPortraitProps {
  src: string;
  pixelSize?: number;
  className?: string;
}

export default function PixelPortrait({ src, pixelSize = 4, className = "" }: PixelPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Calculate dimensions to fill the canvas
      const targetW = canvas.width;
      const targetH = canvas.height;

      // Small resolution for pixelation
      const smallW = Math.floor(targetW / pixelSize);
      const smallH = Math.floor(targetH / pixelSize);

      // Draw image small
      const offscreen = document.createElement("canvas");
      offscreen.width = smallW;
      offscreen.height = smallH;
      const octx = offscreen.getContext("2d");
      if (!octx) return;

      // Scale to fit, crop to center square-ish
      const imgRatio = img.width / img.height;
      const canvasRatio = smallW / smallH;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;

      if (imgRatio > canvasRatio) {
        sw = img.height * canvasRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / canvasRatio;
        sy = (img.height - sh) / 2;
      }

      octx.drawImage(img, sx, sy, sw, sh, 0, 0, smallW, smallH);

      // Color grading: pull image data and tint toward site palette
      const imageData = octx.getImageData(0, 0, smallW, smallH);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Shift toward purplish-blue tint
        data[i] = r * 0.75;
        data[i + 1] = g * 0.7;
        data[i + 2] = Math.min(255, b * 1.1 + 15);

        // Slight contrast boost
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = Math.min(255, data[i] + (data[i] - avg) * 0.3);
        data[i + 1] = Math.min(255, data[i + 1] + (data[i + 1] - avg) * 0.3);
        data[i + 2] = Math.min(255, data[i + 2] + (data[i + 2] - avg) * 0.3);
      }

      octx.putImageData(imageData, 0, 0);

      // Scale up pixelated result
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, smallW, smallH, 0, 0, targetW, targetH);
    };
    img.src = src;
  }, [src, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={500}
      className={className}
      style={{
        imageRendering: "pixelated",
        filter: "drop-shadow(0 0 40px rgba(139,92,246,0.2)) drop-shadow(0 0 80px rgba(26,58,92,0.15))",
      }}
    />
  );
}

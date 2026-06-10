import { useRef } from "react";
import { useStarfield } from "../../hooks/useStarfield";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarfield(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}

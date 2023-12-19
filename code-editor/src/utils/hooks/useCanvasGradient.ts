import { RefObject, useEffect } from "react";

interface CanvasMotion {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

interface ColorCoordinates {
  x: number;
  y: number;
  time: number;
}

const G = ({ x, y, time }: ColorCoordinates) =>
  Math.floor(
    192 +
      (64 * Math.sin(x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3))) /
        300
  );

const B = ({ x, y, time }: ColorCoordinates) =>
  Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time));

export const useCanvasGradient = (canvasRef: RefObject<HTMLCanvasElement>) => {
  let time = 0;
  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");

      const color = ({ x, y, r, g, b }: CanvasMotion) => {
        if (canvasContext) {
          canvasContext.fillStyle = `rgb(${r},${g},${b})`;
          canvasContext.fillRect(x, y / 2, 10, 10);
        }
      };

      const startAnimation = () => {
        for (let x = 0; x <= 30; x += 1) {
          for (let y = 0; y <= 30; y += 1) {
            color({
              x: x * 10,
              y: y * 10,
              r: 0,
              g: G({ x, y, time }),
              b: B({ x, y, time }),
            });
          }
        }
        time += 0.025;
        window.requestAnimationFrame(startAnimation);
      };
      startAnimation();
    }
  }, [canvasRef.current]);
};

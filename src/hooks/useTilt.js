import { useRef, useState, useCallback, useEffect } from "react";

export function useTilt({ maxTilt = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.1s ease-out",
  });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (isTouch.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt * 2;
      const rotateY = (x - 0.5) * maxTilt * 2;

      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
      });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [maxTilt, scale]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    });
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return { ref, style, glowPos, handleMove, handleLeave };
}

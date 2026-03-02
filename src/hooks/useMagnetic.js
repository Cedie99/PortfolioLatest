import { useRef, useState, useCallback, useEffect } from "react";

export function useMagnetic({ strength = 0.3, radius = 40 } = {}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (isTouch.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius + rect.width / 2) {
        const pullX = distX * strength;
        const pullY = distY * strength;
        setTransform(`translate(${pullX}px, ${pullY}px)`);
      }
    },
    [strength, radius]
  );

  const handleLeave = useCallback(() => {
    setTransform("translate(0px, 0px)");
  }, []);

  return {
    ref,
    style: {
      transform,
      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };
}

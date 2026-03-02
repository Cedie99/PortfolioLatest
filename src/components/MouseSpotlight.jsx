import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function MouseSpotlight() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { stiffness: 200, damping: 30 });
  const y = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [x, y, visible]);

  if (!visible || isDark) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[5]"
      style={{
        x,
        y,
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
        background:
          "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}

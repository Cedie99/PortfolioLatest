import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounter({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = typeof value === "number" ? value : parseInt(value, 10);
  const isNumber = !isNaN(numericValue) && numericValue > 0;

  useEffect(() => {
    if (!inView || !isNumber) return;

    const duration = 1200;
    const startTime = Date.now();
    const target = numericValue;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, numericValue, isNumber]);

  if (!isNumber) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const digits = String(inView ? displayValue : 0).split("");

  return (
    <span ref={ref} className={`inline-flex ${className}`} aria-label={String(numericValue)}>
      {digits.map((digit, i) => (
        <motion.span
          key={`${i}-${digits.length}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: i * 0.06,
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      ))}
    </span>
  );
}

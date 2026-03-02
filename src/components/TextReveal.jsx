import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TextReveal({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const text = typeof children === "string" ? children : "";

  // Split into words, then characters, preserving spaces
  const words = text.split(" ");

  let charIndex = 0;

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-pre">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  delay: i * 0.02,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </h2>
  );
}

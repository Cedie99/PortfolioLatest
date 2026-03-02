import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScanLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="max-w-6xl mx-auto lg:ml-[80px] relative h-px overflow-hidden">
      {/* Base line (fades in after scan) */}
      <motion.div
        className="absolute inset-0 section-line"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
      />

      {/* Scan beam */}
      {inView && (
        <motion.div
          className="absolute top-0 h-full w-24"
          initial={{ left: "-96px" }}
          animate={{ left: "100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.6) 40%, rgba(56,189,248,0.8) 60%, transparent)",
              boxShadow: "0 0 12px rgba(56,189,248,0.3)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

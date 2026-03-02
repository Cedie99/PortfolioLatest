import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { useMagnetic } from "../hooks/useMagnetic";

const ROLES = [
  "Software Engineer.",
  "System Architect.",
  "Interface Designer.",
];

const ease = [0.16, 1, 0.3, 1];

function HexagonPatch() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Rotating dashed outer ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-[110%] h-[110%] slow-rotate opacity-20">
          <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[380px]" fill="none">
        {/* Outer hex */}
        <motion.polygon
          points="200,40 340,110 340,250 200,320 60,250 60,110"
          stroke="url(#hex-grad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease }}
        />
        {/* Middle hex */}
        <motion.polygon
          points="200,80 300,130 300,230 200,280 100,230 100,130"
          stroke="rgba(56,189,248,0.12)"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.3, ease }}
        />
        {/* Inner hex */}
        <motion.polygon
          points="200,120 260,150 260,210 200,240 140,210 140,150"
          stroke="rgba(56,189,248,0.3)"
          strokeWidth="0.5"
          fill="rgba(56,189,248,0.02)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.6, ease }}
        />
        {/* Center crosshair */}
        <motion.line x1="200" y1="155" x2="200" y2="205" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        <motion.line x1="175" y1="180" x2="225" y2="180" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        {/* Center dot */}
        <motion.circle cx="200" cy="180" r="2" fill="#38bdf8" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8 }} />
        {/* Vertex accents */}
        {[
          [200, 40], [340, 110], [340, 250], [200, 320], [60, 250], [60, 110],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#38bdf8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 1 + i * 0.08, duration: 0.3 }}
          />
        ))}
        {/* Connecting data lines from vertices */}
        <motion.line x1="200" y1="40" x2="200" y2="80" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        <motion.line x1="340" y1="250" x2="300" y2="230" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
        <motion.line x1="60" y1="110" x2="100" y2="130" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} />
        <defs>
          <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.4)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.05)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Signal strength bars */}
      <div className="absolute bottom-6 right-6 flex items-end gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            className="w-[3px] bg-sky-400/30 rounded-sm"
            style={{ height: `${level * 5 + 2}px` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2 + level * 0.1, ease }}
          />
        ))}
      </div>

      {/* Data label */}
      <motion.div
        className="absolute top-6 left-6 font-mono text-[8px] text-sky-400/20 tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        MISSION PATCH
      </motion.div>
    </div>
  );
}

function MagneticLink({ children, ...props }) {
  const magnetic = useMagnetic({ strength: 0.25, radius: 40 });
  return (
    <a
      {...props}
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={magnetic.style}
    >
      {children}
    </a>
  );
}

export default function IdentityBrief() {
  const { displayText } = useTypewriter(ROLES, {
    typeSpeed: 70,
    deleteSpeed: 40,
    pauseDuration: 2500,
  });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: hexagon slow, text mid, telemetry fast
  const hexY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const telemetryY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={sectionRef} id="identity" className="relative min-h-screen flex items-center px-6 lg:pl-[80px] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center py-24 lg:py-0">
        {/* Left: Text content (60%) */}
        <motion.div className="lg:col-span-3 space-y-8" style={{ y: textY }}>
          {/* Name */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-px bg-sky-400/30" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                Dossier // Jhon Cedrick Ignacio
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease }}
              className="text-[clamp(2.5rem,8vw,6.5rem)] font-black tracking-[-0.05em] leading-[0.85] text-zinc-900 dark:text-gray-100"
            >
              JHON CEDRICK
              <br />
              <span className="text-zinc-300 dark:text-zinc-600">/</span> IGNACIO
            </motion.h1>
          </div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, ease }}
            className="h-8 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 signal-pulse" />
            <span className="font-mono text-sm md:text-base text-sky-400 typewriter-cursor">
              {displayText}
            </span>
          </motion.div>

          {/* Telemetry readouts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, ease }}
            className="flex flex-wrap gap-x-10 gap-y-4 py-6 border-t border-b border-zinc-200 dark:border-zinc-700"
            style={{ y: telemetryY }}
          >
            {[
              { label: "COORDINATES", value: "14.8°N, 120.9°E" },
              { label: "STATUS", value: "AVAILABLE", signal: true },
              { label: "CLEARANCE", value: "FULL-STACK" },
              { label: "CURRENT OP", value: "ELEVORA TECH" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {item.label}
                </p>
                <p className={`font-mono text-[11px] font-bold tracking-wider ${item.signal ? "text-signal" : "text-zinc-700 dark:text-gray-200"}`}>
                  {item.signal && <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal mr-2 signal-pulse" />}
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA — magnetic hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, ease }}
            className="flex items-center gap-6"
          >
            <MagneticLink
              href="#systems"
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-sky-400/30 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400/5 hover:border-sky-400/50 transition-all"
            >
              <span>Review Dossier</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticLink>
            <MagneticLink
              href="/Ignacio, Jhon Cedrick S. CV.pdf"
              download
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              Download CV →
            </MagneticLink>
          </motion.div>
        </motion.div>

        {/* Right: Mission Patch (40%) — parallax slower */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="lg:col-span-2 hidden lg:flex items-center justify-center"
          style={{ y: hexY }}
        >
          <HexagonPatch />
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useTheme } from "../hooks/useTheme";

const SECTIONS = [
  { id: "identity", letter: "I", label: "Identity" },
  { id: "systems", letter: "S", label: "Systems" },
  { id: "missions", letter: "M", label: "Missions" },
  { id: "operations", letter: "F", label: "Field Ops" },
  { id: "training", letter: "T", label: "Training" },
  { id: "telemetry", letter: "L", label: "Telemetry" },
  { id: "signal", letter: "X", label: "Signal" },
];

const MOBILE_SECTIONS = [
  { id: "identity", letter: "I" },
  { id: "systems", letter: "S" },
  { id: "missions", letter: "M" },
  { id: "signal", letter: "X" },
];

function MagneticButton({ children, onClick, className, style }) {
  const magnetic = useMagnetic({ strength: 0.35, radius: 30 });
  return (
    <button
      ref={magnetic.ref}
      onClick={onClick}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className={className}
      style={{ ...magnetic.style, ...style }}
    >
      {children}
    </button>
  );
}

export default function MissionNav({ onCommsOpen }) {
  const [activeSection, setActiveSection] = useState("identity");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      const sectionIds = SECTIONS.map((s) => s.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: Fixed left vertical nav */}
      <nav className="fixed left-0 top-0 bottom-0 w-[60px] z-50 hidden lg:flex flex-col items-center justify-between py-8 border-r border-black/[0.05] dark:border-white/[0.05] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-[12px]">
        {/* Progress line */}
        <div className="absolute left-1/2 top-16 bottom-24 w-px bg-black/5 dark:bg-white/5 -translate-x-1/2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-sky-400 absolute left-1/2 -translate-x-1/2 nav-active-dot"
            style={{ top: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Logo mark */}
        <div className="relative z-10">
          <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest">JCI</span>
        </div>

        {/* Section indicators */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <MagneticButton
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group relative flex items-center justify-center"
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-sky-400/10 border border-sky-400/30"
                      : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold transition-colors duration-300 ${
                      isActive ? "text-sky-400" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                    }`}
                  >
                    {section.letter}
                  </span>
                </motion.div>

                {/* Expanded label on active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -4, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, x: -4, width: 0 }}
                      className="absolute left-full ml-2 px-2 py-0.5 rounded bg-sky-400/10 border border-sky-400/20 whitespace-nowrap overflow-hidden"
                    >
                      <span className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                        {section.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MagneticButton>
            );
          })}
        </div>

        {/* Theme toggle + COMMS trigger */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <MagneticButton
            onClick={toggleTheme}
            className="group w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-sky-400/30 hover:bg-sky-400/5 transition-all"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-zinc-400 group-hover:text-sky-400 transition-colors" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-sky-400 transition-colors" />
            )}
          </MagneticButton>
          <MagneticButton
            onClick={onCommsOpen}
            className="group w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:border-signal hover:bg-signal/5 transition-all"
          >
            <span className="font-mono text-[9px] font-bold text-zinc-400 group-hover:text-signal transition-colors">
              TX
            </span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-signal signal-pulse" />
          </MagneticButton>
        </div>
      </nav>

      {/* Mobile: Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-around px-4 py-3 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-[20px]">
          {MOBILE_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="relative flex items-center justify-center w-10 h-10"
              >
                <span
                  className={`font-mono text-xs font-bold transition-colors ${
                    isActive ? "text-sky-400" : "text-zinc-400"
                  }`}
                >
                  {section.letter}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-sky-400"
                  />
                )}
              </button>
            );
          })}

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-10 h-10"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-zinc-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {/* Mobile COMMS */}
          <button
            onClick={onCommsOpen}
            className="relative flex items-center justify-center w-10 h-10"
          >
            <span className="font-mono text-xs font-bold text-zinc-400">TX</span>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-signal signal-pulse" />
          </button>
        </div>
      </nav>
    </>
  );
}

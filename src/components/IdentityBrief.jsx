import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { useMagnetic } from "../hooks/useMagnetic";
import { Github, Linkedin } from "lucide-react";

const ROLES = [
  "Software Engineer.",
  "System Architect.",
  "Interface Designer.",
];

const ease = [0.16, 1, 0.3, 1];

const STACK_PILLS = [
  ["Next.js", "React", "TypeScript"],
  ["Laravel", "PostgreSQL", "AI/LLMs"],
];

function BehanceIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.887 2.406 1.887.857 0 1.4-.3 1.855-.725l2.495 1.867zM15.97 12.5h4.826c-.13-1.073-.775-1.846-2.355-1.846-1.435 0-2.228.75-2.471 1.846zM6 10.5c1.084 0 1.87.37 1.87 1.334 0 .766-.397 1.29-1.332 1.457v.038c1.038.092 1.854.668 1.854 1.857C8.392 16.617 7.15 17 5.698 17H1V8h4.573c1.29 0 2.427.463 2.427 1.725C7 10.15 6.64 10.5 6 10.5zm-2.742-.55V11h1.226c.627 0 1.031-.213 1.031-.683 0-.543-.38-.667-.976-.667H3.258zm0 3.217v1.354H4.72c.726 0 1.138-.25 1.138-.803 0-.506-.43-.75-1.186-.75H3.258z"/>
    </svg>
  );
}

function AgentProfileCard({ hexY }) {
  const sections = [
    {
      label: "CURRENT OPERATION",
      content: (
        <div className="space-y-0.5">
          <p className="font-mono text-[11px] font-bold text-zinc-700 dark:text-gray-200 tracking-wider">Oracle Petroleum Corporation</p>
          <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">Full Stack Developer Intern</p>
          <p className="font-mono text-[10px] text-zinc-400">Mar 2026 – Present</p>
        </div>
      ),
    },
    {
      label: "EDUCATION",
      content: (
        <div className="space-y-0.5">
          <p className="font-mono text-[11px] font-bold text-zinc-700 dark:text-gray-200 tracking-wider">BS Information Technology</p>
          <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">PUP Sta. Maria • 2022–2026</p>
        </div>
      ),
    },
    {
      label: "PRIMARY STACK",
      content: (
        <div className="space-y-1.5">
          {STACK_PILLS.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-1">
              {row.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded px-2 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "ACHIEVEMENT",
      content: (
        <div className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/5 rounded px-2.5 py-1.5">
          <span className="text-amber-500 text-[10px]">🏆</span>
          <span className="font-mono text-[10px] text-amber-500 font-bold tracking-wide">PSC10 Regional Top 15/74</span>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      style={{ y: hexY }}
    >
      {/* Faint slow-rotate ring behind card for continuity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[110%] h-[110%] slow-rotate opacity-10">
          <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Agent Profile Card */}
      <div className="corner-brackets relative w-full max-w-[360px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease }}
          className="rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/40 dark:bg-zinc-900/50 backdrop-blur-sm p-6 space-y-5"
        >
          {/* Card header */}
          <div className="pb-3 border-b border-sky-400/20">
            <p className="font-mono text-[9px] tracking-[0.3em] text-sky-400 uppercase font-bold">
              Agent Profile // JCI-2026
            </p>
          </div>

          {/* Sections with stagger */}
          {sections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15, ease }}
              className="space-y-1.5"
            >
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
                {section.label}
              </p>
              {section.content}
            </motion.div>
          ))}

          {/* Footer: clearance + progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, ease }}
            className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 uppercase">Clearance: Full-Stack</p>
              <p className="font-mono text-[9px] text-sky-400">80%</p>
            </div>
            <div className="h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-700/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-400/40"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1.6, duration: 1, ease }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
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

  const hexY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const telemetryY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={sectionRef} id="identity" className="relative min-h-screen flex items-center px-6 lg:pl-[80px] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center py-24 lg:py-0">

        {/* Left: Text content (60%) */}
        <motion.div className="lg:col-span-3 space-y-6" style={{ y: textY }}>

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

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, ease }}
            className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w"
          >
            Full Stack Developer &amp; UI/UX Designer based in Sta. Maria, Bulacan 🇵🇭. I build scalable systems, engineer system architectures, optimize performance, and craft expressive interfaces.
          </motion.p>

          {/* Telemetry readouts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, ease }}
            className="flex flex-wrap gap-x-10 gap-y-4 py-5 border-t border-b border-zinc-200 dark:border-zinc-700"
            style={{ y: telemetryY }}
          >
            {[
              { label: "COORDINATES", value: "14.8°N, 120.9°E" },
              { label: "STATUS", value: "AVAILABLE", signal: true },
              { label: "CLEARANCE", value: "FULL-STACK" },
              { label: "CURRENT OP", value: "ORACLE PETROLEUM CORP" },
              { label: "SINCE", value: "2022" },
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

          {/* Stats row */}
          <div className="flex gap-8 md:gap-12">
            {[
              { value: "04", label: "MISSIONS" },
              { value: "04", label: "ROLES" },
              { value: "05+", label: "CERTS" },
              { value: "2022", label: "SINCE" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 + i * 0.15, ease }}
                className="flex flex-col"
              >
                <span className="font-mono text-2xl font-black text-zinc-900 dark:text-gray-100 leading-none">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 mt-1 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticLink
              href="#missions"
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-sky-400/30 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400/5 hover:border-sky-400/50 transition-all"
            >
              <span>View Missions</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticLink>
            <MagneticLink
              href="/Jhon Cedrick S. Ignacio - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all"
            >
              <span>Download CV</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-y-0.5 transition-transform">
                <path d="M6 2v6M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticLink>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, ease }}
            className="flex items-center gap-5"
          >
            <a
              href="https://github.com/Cedie99"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-sky-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/jhon-cedrick-ignacio-127944326/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-sky-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.behance.net/johnceignacio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-sky-400 transition-colors"
              aria-label="Behance"
            >
              <BehanceIcon size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Agent Profile Card (40%) */}
        <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
          <AgentProfileCard hexY={hexY} />
        </div>
      </div>
    </section>
  );
}

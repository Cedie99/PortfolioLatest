import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import TextReveal from "./TextReveal";
import { useOutsideClick } from "../hooks/useOutsideClick";
import budgetByaheVideo from "../assets/bb.mp4";
import safezoneVid from "../assets/safezone.mp4";
import bbDesign from "../assets/bbdesign.png";
import streamingApp from "../assets/streamingapp.png";
import appliance from "../assets/appliance.png";
import vodka from "../assets/vodka.png";

const ease = [0.16, 1, 0.3, 1];

const WEB_MISSIONS = [
  {
    designation: "MSN-001",
    codename: "Budget Byahe",
    year: "2025–2026",
    status: "DEPLOYED",
    statusColor: "#4ade80",
    description:
      "A specialized fare calculation and routing application designed for the public transport network in Santa Maria, Bulacan. Integrates Google Maps for real-time routing and Groq API for AI-powered fare suggestions.",
    achievement: "Regional Pitching Top 15/74 @ PSC10",
    stack: ["React", "Laravel", "MySQL", "Firebase", "Google Maps", "Groq AI"],
    video: budgetByaheVideo,
    link: "https://budgetbyahe.com",
  },
  {
    designation: "MSN-002",
    codename: "SafeZone PH",
    year: "2025–2026",
    status: "IN DEVELOPMENT",
    statusColor: "#f59e0b",
    description:
      "A community-focused system built for reporting local issues directly to authorities. Designed as a community impact project to improve local safety reporting.",
    achievement: "Community Impact Project",
    stack: ["React", "Laravel", "MySQL"],
    video: safezoneVid,
    link: null,
  },
];

const DESIGN_PROJECTS = [
  {
    title: "Streaming Application",
    category: "UI/UX — Mobile",
    image: streamingApp,
    link: "https://www.behance.net/gallery/235138429/Streaming-Application-User-Interface",
  },
  {
    title: "Budget Byahe",
    category: "UI/UX — SaaS",
    image: bbDesign,
    link: "https://budgetbyahe.com",
  },
  {
    title: "Online Shopping App",
    category: "Mobile — E-commerce",
    image: vodka,
    link: "https://www.behance.net/gallery/235139681/Product-Showcase",
  },
  {
    title: "Appliance Warehouse",
    category: "UI/UX — Redesign",
    image: appliance,
    link: "https://www.figma.com/proto/Z3LV3SO7SILcz4XmQcTABN/Application-Warehouse---Copy?node-id=1-5863&p=f&t=mGeCV0bSWwhT4yv4-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
];

function MissionCard({ mission, onSelect, id }) {
  return (
    <motion.div
      layoutId={`card-${mission.designation}-${id}`}
      onClick={() => onSelect(mission)}
      className="group p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 rounded-xl cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 transition-colors"
    >
      {/* Video thumbnail */}
      <motion.div
        layoutId={`video-${mission.designation}-${id}`}
        className="w-full md:w-48 h-32 md:h-28 rounded-lg overflow-hidden shrink-0 relative"
        style={{ border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <video
          src={mission.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
        />
        {/* Monitor overlay label */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-sky-400/50" />
          <span className="font-mono text-[8px] font-bold text-white/60 tracking-widest drop-shadow-sm">
            {mission.designation}
          </span>
        </div>
      </motion.div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <motion.span
            layoutId={`designation-${mission.designation}-${id}`}
            className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest"
          >
            {mission.designation}
          </motion.span>
          <span className="w-4 h-px bg-black/10 dark:bg-white/10" />
          <motion.span
            layoutId={`status-${mission.designation}-${id}`}
            className="font-mono text-[10px] font-bold tracking-widest"
            style={{ color: mission.statusColor }}
          >
            {mission.status}
          </motion.span>
        </div>
        <motion.h3
          layoutId={`title-${mission.designation}-${id}`}
          className="text-xl md:text-2xl font-black tracking-[-0.03em] text-zinc-900 dark:text-gray-100 group-hover:text-sky-400 transition-colors"
        >
          {mission.codename}
        </motion.h3>
        <motion.p
          layoutId={`year-${mission.designation}-${id}`}
          className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest"
        >
          {mission.year}
        </motion.p>
      </div>

      {/* CTA */}
      <motion.div
        layoutId={`cta-${mission.designation}-${id}`}
        className="shrink-0"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/30 font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400 group-hover:bg-sky-400/5 group-hover:border-sky-400/50 transition-all">
          View Mission
        </span>
      </motion.div>
    </motion.div>
  );
}

function ExpandedMission({ mission, onClose, id }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 grid place-items-center z-[110] p-4 md:p-8">
      <motion.div
        layoutId={`card-${mission.designation}-${id}`}
        ref={modalRef}
        className="w-full max-w-[550px] h-full md:h-auto md:max-h-[90vh] flex flex-col bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15)]"
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <X className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
        </motion.button>

        {/* Video — morphs from thumbnail */}
        <motion.div
          layoutId={`video-${mission.designation}-${id}`}
          className="w-full aspect-video shrink-0 relative overflow-hidden"
        >
          <video
            ref={videoRef}
            src={mission.video}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
          {/* Scanline overlay for cinematic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)",
            }}
          />
          {/* Monitor label */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-sky-400/60" />
            <span className="font-mono text-[9px] font-bold text-white/70 tracking-widest drop-shadow-sm">
              {mission.designation} // LIVE FEED
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Designation + Status */}
          <div className="flex items-center gap-2">
            <motion.span
              layoutId={`designation-${mission.designation}-${id}`}
              className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest"
            >
              {mission.designation}
            </motion.span>
            <span className="w-6 h-px bg-black/10 dark:bg-white/10" />
            <motion.span
              layoutId={`status-${mission.designation}-${id}`}
              className="font-mono text-[10px] font-bold tracking-widest"
              style={{ color: mission.statusColor }}
            >
              {mission.status}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h3
            layoutId={`title-${mission.designation}-${id}`}
            className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100 leading-[0.95]"
          >
            {mission.codename}
          </motion.h3>

          {/* Year */}
          <motion.p
            layoutId={`year-${mission.designation}-${id}`}
            className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest"
          >
            {mission.year}
          </motion.p>

          {/* Description — fades in */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.35, ease }}
            className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed"
          >
            {mission.description}
          </motion.p>

          {/* Achievement — fades in */}
          {mission.achievement && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.35, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-amber-500/20 bg-amber-500/5"
            >
              <span className="font-mono text-[10px] font-bold text-amber-500 tracking-wider">
                {mission.achievement}
              </span>
            </motion.div>
          )}

          {/* Tech stack — fades in */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25, duration: 0.35, ease }}
            className="flex flex-wrap gap-1.5"
          >
            {mission.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded bg-zinc-50 dark:bg-zinc-800"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA — morphs from card button */}
          <motion.div
            layoutId={`cta-${mission.designation}-${id}`}
            className="pt-2"
          >
            {mission.link ? (
              <a
                href={mission.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-400/10 border border-sky-400/20 font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400 hover:bg-sky-400/15 hover:border-sky-400/40 transition-all"
              >
                View Live Deployment
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                In Development
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function DesignMarquee() {
  // Quadruple for dense grid (4 images × 4 = 16 → 4 per column)
  const allImages = [
    ...DESIGN_PROJECTS,
    ...DESIGN_PROJECTS,
    ...DESIGN_PROJECTS,
    ...DESIGN_PROJECTS,
  ];
  const cols = 4;
  const groupSize = Math.ceil(allImages.length / cols);
  const columns = Array.from({ length: cols }, (_, i) =>
    allImages.slice(i * groupSize, (i + 1) * groupSize)
  );

  return (
    <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50">
      {/* Gradient overlays for fading edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-deep via-deep/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-deep via-deep/80 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-1/6 bg-gradient-to-r from-deep to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-1/6 bg-gradient-to-l from-deep to-transparent" />
      </div>

      {/* 3D perspective container */}
      <div
        className="flex w-full h-full items-center justify-center"
        style={{ transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)" }}
      >
        <div className="w-full overflow-hidden scale-[1.15] sm:scale-125">
          <div className="relative grid h-full w-full origin-center grid-cols-2 sm:grid-cols-4 gap-6">
            {columns.map((col, idx) => (
              <motion.div
                key={idx}
                animate={{ y: idx % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: idx % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center gap-6 relative"
              >
                {/* Vertical grid line */}
                <div className="absolute left-0 top-0 h-full w-px bg-zinc-200/60 dark:bg-zinc-700/60" />

                {col.map((project, imgIdx) => (
                  <a
                    key={imgIdx}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    {/* Horizontal grid line */}
                    <div className="absolute top-0 left-0 w-full h-px bg-zinc-200/60 dark:bg-zinc-700/60" />
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={project.image}
                      alt={project.title}
                      className="aspect-[970/700] w-full max-w-[320px] rounded-lg object-cover shadow-lg ring-1 ring-zinc-200/50 dark:ring-zinc-700/50 hover:shadow-xl transition-shadow duration-300"
                      loading="lazy"
                    />
                    {/* Title on hover */}
                    <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-black/70 backdrop-blur-sm rounded-md px-3 py-1.5">
                        <p className="font-mono text-[10px] font-bold text-white truncate">
                          {project.title}
                        </p>
                        <p className="font-mono text-[8px] text-white/60 truncate">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissionLog() {
  const [active, setActive] = useState(null);
  const id = useId();

  // Lock body scroll + escape key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setActive(null);
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <section id="missions" className="px-6 lg:pl-[80px] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="pt-24 md:pt-40 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-sky-400/30" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              // Mission Log
            </p>
          </div>
          <TextReveal className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100 mb-4">
            Launched Missions
          </TextReveal>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg">
            Deployed applications and active projects in the field.
          </p>
        </motion.div>

        {/* Backdrop overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[105]"
              onClick={() => setActive(null)}
            />
          )}
        </AnimatePresence>

        {/* Expanded modal */}
        <AnimatePresence>
          {active && (
            <ExpandedMission
              mission={active}
              onClose={() => setActive(null)}
              id={id}
            />
          )}
        </AnimatePresence>

        {/* Mission card list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="space-y-2 mb-16"
        >
          {WEB_MISSIONS.map((mission) => (
            <MissionCard
              key={mission.designation}
              mission={mission}
              onSelect={setActive}
              id={id}
            />
          ))}
        </motion.div>

        {/* Design Projects — 3D Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-700"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-2">
                // Design Ops
              </p>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-gray-100">
                Interface Designs
              </h3>
            </div>
            <a
              href="https://www.behance.net/johnceignacio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-sky-400 transition-colors"
            >
              Behance →
            </a>
          </div>

          <DesignMarquee />
        </motion.div>
      </div>
    </section>
  );
}

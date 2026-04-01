import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import TextReveal from "./TextReveal";
import { useOutsideClick } from "../hooks/useOutsideClick";
import budgetByaheVideo from "../assets/bb.mp4";
import safezoneVid from "../assets/safezone.mp4";
import interviewmyself from "../assets/interviewmyself.mp4";
import meshdb from "../assets/meshdb.mp4";
import bbDesign from "../assets/bbdesign.png";
import streamingApp from "../assets/streamingapp.png";
import appliance from "../assets/appliance.png";
import vodka from "../assets/vodka.png";

const ease = [0.16, 1, 0.3, 1];

const WEB_MISSIONS = [
  {
    designation: "MSN-004",
    codename: "Mesh DB",
    year: "2026",
    status: "DEPLOYED",
    statusColor: "#4ade80",
    description:
      "A community knowledge platform for the web hosting industry, similar to Crunchbase but focused on hosting ecosystem entities.",
    achievement: "Hosting Ecosystem Intelligence Platform",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "NextAuth", "Drizzle"],
    video: meshdb,
    link: "https://mesh-db.vercel.app/",
  },
  {
    designation: "MSN-003",
    codename: "InterviewMyself",
    year: "2026",
    status: "DEPLOYED",
    statusColor: "#4ade80",
    description:
      "AI-powered interview portfolios. Create personalized interview portfolios that showcase your perfect fit for any role—without changing how you prepare.",
    achievement: "AI-Powered Interview Portfolio Platform",
    stack: ["Next.js", "TypeScript", "Prisma ORM with PostgreSQL", "Inngest", "BetterAuth", "Vercel AI SDK"],
    video: interviewmyself,
    link: "https://interviewmyself.vercel.app/",
  },
  {
    designation: "MSN-002",
    codename: "Budget Byahe",
    year: "2025–2026",
    status: "DEPLOYED",
    statusColor: "#4ade80",
    description:
      "A specialized fare calculation and routing application designed for the public transport network in Santa Maria, Bulacan.",
    achievement: "Regional Pitching Top 15/74 @ PSC10",
    stack: ["React", "Laravel", "MySQL", "Firebase", "Google Maps", "Groq AI"],
    video: budgetByaheVideo,
    link: "https://budgetbyahe.com",
  },
  {
    designation: "MSN-001",
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.1 },
  }),
};

function MissionCard({ mission, onVideoSelect, id, index }) {
  const isDeployed = mission.status === "DEPLOYED";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col md:flex-row rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60 bg-white/50 dark:bg-zinc-900/50 hover:border-sky-400/30 dark:hover:border-sky-400/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.07)]"
    >
      {/* Video thumbnail — ~45% width on desktop */}
      <motion.div
        layoutId={`video-${mission.designation}-${id}`}
        className="relative md:w-[45%] shrink-0 aspect-video cursor-pointer overflow-hidden bg-zinc-900"
        onClick={() => onVideoSelect(mission)}
      >
        <video
          src={mission.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.018) 2px, rgba(0,0,0,0.018) 4px)",
          }}
        />
        {/* Monitor label */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 animate-pulse" />
          <span className="font-mono text-[8px] font-bold text-white/75 tracking-widest">
            {mission.designation} // LIVE
          </span>
        </div>
        {/* Expand hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-lg px-3 py-1.5">
            <span className="font-mono text-[9px] font-bold text-white/80 tracking-widest">
              ▶ EXPAND
            </span>
          </div>
        </div>
      </motion.div>

      {/* Info panel */}
      <div className="flex-1 p-5 md:p-7 flex flex-col gap-4">
        {/* Designation + status + year */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest">
              {mission.designation}
            </span>
            <span className="w-4 h-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: mission.statusColor,
                  boxShadow: isDeployed
                    ? `0 0 6px ${mission.statusColor}80`
                    : "none",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                className="font-mono text-[10px] font-bold tracking-widest"
                style={{ color: mission.statusColor }}
              >
                {mission.status}
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest">
            {mission.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black tracking-[-0.03em] text-zinc-900 dark:text-gray-100 group-hover:text-sky-400 transition-colors duration-300 leading-tight">
          {mission.codename}
        </h3>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {mission.description}
        </p>

        {/* Achievement badge */}
        {mission.achievement && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.25, duration: 0.4, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-amber-500/25 bg-amber-500/5 w-fit"
          >
            <span className="text-[10px]">🏆</span>
            <span className="font-mono text-[10px] font-bold text-amber-500 tracking-wider">
              {mission.achievement}
            </span>
          </motion.div>
        )}

        {/* Stack pills + CTA */}
        <div className="flex items-end justify-between gap-4 mt-auto flex-wrap">
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03, delayChildren: index * 0.1 + 0.3 } },
            }}
          >
            {mission.stack.map((tech) => (
              <motion.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                }}
                className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded bg-zinc-50 dark:bg-zinc-800/60"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {mission.link ? (
            <a
              href={mission.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-400/10 border border-sky-400/25 font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400 hover:bg-sky-400/15 hover:border-sky-400/50 transition-all"
            >
              Visit Project
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              In Dev
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({ mission, onClose, id }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 grid place-items-center z-[110] p-4 md:p-10">
      <motion.div
        layoutId={`video-${mission.designation}-${id}`}
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_30px_80px_-12px_rgba(0,0,0,0.5)]"
      >
        {/* Close */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        {/* Video */}
        <div className="w-full aspect-video relative bg-black">
          <video
            ref={videoRef}
            src={mission.video}
            muted
            loop
            playsInline
            autoPlay
            controls
            className="w-full h-full object-contain"
          />
          {/* Bottom title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] font-bold text-white/50 tracking-widest">
                {mission.designation}
              </span>
              <span className="w-3 h-px bg-white/20" />
              <span
                className="font-mono text-[9px] font-bold tracking-widest"
                style={{ color: mission.statusColor }}
              >
                {mission.status}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {mission.codename}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DesignMarquee() {
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
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-deep via-deep/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-deep via-deep/80 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-1/6 bg-gradient-to-r from-deep to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-1/6 bg-gradient-to-l from-deep to-transparent" />
      </div>

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
                <div className="absolute left-0 top-0 h-full w-px bg-zinc-200/60 dark:bg-zinc-700/60" />
                {col.map((project, imgIdx) => (
                  <a
                    key={imgIdx}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-zinc-200/60 dark:bg-zinc-700/60" />
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={project.image}
                      alt={project.title}
                      className="aspect-[970/700] w-full max-w-[320px] rounded-lg object-cover shadow-lg ring-1 ring-zinc-200/50 dark:ring-zinc-700/50 hover:shadow-xl transition-shadow duration-300"
                      loading="lazy"
                    />
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
  const [activeVideo, setActiveVideo] = useState(null);
  const id = useId();

  const deployedCount = WEB_MISSIONS.filter((m) => m.status === "DEPLOYED").length;
  const inDevCount = WEB_MISSIONS.filter((m) => m.status !== "DEPLOYED").length;
  const latestYear = Math.max(...WEB_MISSIONS.map((m) => parseInt(m.year.split("–").pop())));

  const missionStats = [
    { label: "TOTAL MISSIONS", value: String(WEB_MISSIONS.length).padStart(2, "0") },
    { label: "DEPLOYED", value: String(deployedCount).padStart(2, "0") },
    { label: "IN DEV", value: String(inDevCount).padStart(2, "0") },
    { label: "LATEST", value: String(latestYear) },
  ];

  // Lock scroll + escape key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setActiveVideo(null);
    }
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeVideo]);

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
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mb-8">
            Deployed applications and active projects in the field.
          </p>

          {/* Mission stats row */}
          <div className="flex flex-wrap gap-6 md:gap-10 border-t border-zinc-200 dark:border-zinc-700 pt-6">
            {missionStats.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {label}:
                </span>
                <span className="font-mono text-sm font-black text-zinc-900 dark:text-gray-100">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Backdrop overlay */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-[3px] z-[105]"
              onClick={() => setActiveVideo(null)}
            />
          )}
        </AnimatePresence>

        {/* Video modal */}
        <AnimatePresence>
          {activeVideo && (
            <VideoModal
              mission={activeVideo}
              onClose={() => setActiveVideo(null)}
              id={id}
            />
          )}
        </AnimatePresence>

        {/* Mission cards */}
        <div className="space-y-4 mb-16">
          {WEB_MISSIONS.map((mission, i) => (
            <MissionCard
              key={mission.designation}
              mission={mission}
              onVideoSelect={setActiveVideo}
              id={id}
              index={i}
            />
          ))}
        </div>

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

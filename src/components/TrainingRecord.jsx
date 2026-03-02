import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import TextReveal from "./TextReveal";

const ease = [0.16, 1, 0.3, 1];

const CERTIFICATIONS = [
  {
    date: "2026.01",
    title: "Salesforce Virtual Internship",
    issuer: "SmartBridge & Salesforce",
    badge: "Agentblazer Champion",
    description: "8-week intensive program covering Apex, LWC (Lightning Web Components), Agentforce, and Declarative Automation.",
    type: "internship",
    color: "#f59e0b",
  },
  {
    date: "2025.11",
    title: "Philippine Startup Challenge 10",
    issuer: "Budget Byahe",
    badge: "Top 15/74",
    description: "Pitched a smart fare calculation and routing app for Bulacan, reaching the regional pitching stage.",
    type: "hackathon",
    color: "#f59e0b",
  },
  {
    date: "2025.09",
    title: "AWS Cloud Practitioner",
    issuer: "Udemy",
    badge: null,
    description: "Mastered fundamental AWS cloud infrastructure, security, and core architectural services.",
    type: "certification",
    color: "#ec4899",
  },
  {
    date: "2025.04",
    title: "Master AI for Web Apps",
    issuer: "Simplilearn | SkillUp",
    badge: null,
    description: "Deepened technical initiative in integrating AI models into modern web ecosystems.",
    type: "certification",
    color: "#10b981",
  },
  {
    date: "2025.04",
    title: "Frontend Development Libraries",
    issuer: "freeCodeCamp",
    badge: null,
    description: "Completed 300 hours of coursework mastering React, Redux, SaaS, and Bootstrap.",
    type: "certification",
    color: "#6366f1",
  },
  {
    date: "2025.04",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    badge: null,
    description: "Verified student-level credential for proficiency in threat identification and online safety.",
    type: "certification",
    color: "#ef4444",
  },
];

function TimelineNode({ cert, index }) {
  const [expanded, setExpanded] = useState(false);
  const nodeRef = useRef(null);
  const nodeInView = useInView(nodeRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, ease }}
      className="group relative pl-8"
    >
      {/* Timeline node dot */}
      <div
        className="absolute left-0 top-4 w-3 h-3 rounded-full border-2 transition-all duration-500 z-10"
        style={{
          borderColor: nodeInView ? cert.color : "rgba(0,0,0,0.1)",
          backgroundColor: nodeInView ? cert.color : "transparent",
          animation: nodeInView ? "node-pulse 2s ease-in-out 1" : "none",
        }}
      />

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-3 flex items-baseline gap-3 md:gap-4 transition-colors"
      >
        {/* Date */}
        <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-wider shrink-0 w-16">
          [{cert.date}]
        </span>

        {/* Title */}
        <span className="text-sm font-bold text-zinc-900 dark:text-gray-100 tracking-tight group-hover:text-sky-400 transition-colors flex-shrink-0">
          {cert.title}
        </span>

        {/* Dot leaders */}
        <span className="flex-1 border-b border-dotted border-zinc-200 dark:border-zinc-700 relative top-[-4px] hidden md:block min-w-8" />

        {/* Issuer */}
        <span className="font-mono text-[10px] text-zinc-400 tracking-wider shrink-0 hidden md:block">
          {cert.issuer}
        </span>

        {/* Badge */}
        {cert.badge && (
          <>
            <span className="flex-shrink-0 hidden md:block border-b border-dotted border-zinc-200 dark:border-zinc-700 w-4 relative top-[-4px]" />
            <span className="font-mono text-[10px] font-bold tracking-wider shrink-0 hidden lg:block" style={{ color: cert.color }}>
              {cert.badge}
            </span>
          </>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">
              {/* Mobile-only issuer + badge */}
              <p className="font-mono text-[10px] text-zinc-400 tracking-wider md:hidden">
                {cert.issuer} {cert.badge && `— ${cert.badge}`}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xl">
                {cert.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineContainer({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Background track line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
      {/* Animated progress fill */}
      <motion.div
        className="absolute left-[5px] top-0 w-px bg-sky-400/60 origin-top"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />
      {children}
    </div>
  );
}

export default function TrainingRecord() {
  return (
    <section id="training" className="py-24 md:py-40 px-6 lg:pl-[80px] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-sky-400/30" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              // Training Record
            </p>
          </div>
          <TextReveal className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100">
            Education
          </TextReveal>
        </motion.div>

        {/* Education Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="mb-16 py-8 md:py-12 px-6 md:px-10 border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg shadow-sm card-glow relative overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400/30 via-sky-400/10 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[10px] font-bold text-sky-400/60 tracking-widest">
                PRIMARY INSTITUTION
              </p>
              <h3 className="text-xl md:text-3xl font-black tracking-[-0.03em] text-zinc-900 dark:text-gray-100">
                Polytechnic University of the Philippines
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Sta. Maria, Bulacan Campus
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <span className="font-mono text-xs font-bold text-zinc-900 dark:text-gray-100 tracking-wider">
                BS Information Technology
              </span>
              <span className="font-mono text-[10px] text-zinc-400 tracking-widest">
                2022 — 2026
              </span>
            </div>
          </div>

          {/* Coursework */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Web Development",
                "UI/UX Design",
                "Software Engineering",
                "Database Management Systems",
                "Operating Systems",
                "Cybersecurity",
              ].map((course) => (
                <span
                  key={course}
                  className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Capstone */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Capstone
            </span>
            <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
              Budget Byahe: Smart Fare System
            </span>
            <span className="font-mono text-[10px] text-zinc-300 dark:text-zinc-600">—</span>
            <span className="font-mono text-[10px] text-zinc-400">
              React // Laravel // GCP // Groq AI
            </span>
          </div>
        </motion.div>

        {/* Certification Log Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
            Credential Log
          </p>
          <TimelineContainer>
            {CERTIFICATIONS.map((cert, i) => (
              <TimelineNode key={cert.title} cert={cert} index={i} />
            ))}
          </TimelineContainer>
        </motion.div>
      </div>
    </section>
  );
}

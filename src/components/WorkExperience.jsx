import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Workflow,
  Palette,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const experiences = [
  {
    company: "SmartBridge",
    role: "Salesforce Developer Intern",
    type: "Remote",
    period: "Sept 2025 — Dec 2025",
    color: "#3b82f6",
    icon: Workflow,
    highlights: [
      "Built automated workflows using Salesforce Flows, reducing manual data entry errors",
      "Architected custom objects and validation rules to ensure high data integrity across the CRM ecosystem",
      "Built and tested automation using Process Builder/Flows to improve operational efficiency",
    ],
    tools: ["Salesforce", "Apex", "Flows", "Process Builder"],
  },
  {
    company: "Appliance Warehouse",
    role: "UI/UX Designer",
    type: "Freelance",
    period: "Nov 2025 — Dec 2025",
    color: "#10b981",
    icon: Palette,
    link: "https://www.behance.net/johnceignacio",
    highlights: [
      "Redesigned e-commerce checkout flows, improving layout hierarchy and accessibility",
      "Enhanced conversion potential by optimizing CTA visibility and eliminating visual clutter",
      "Developed design system (typography & components) ensuring visual consistency across all pages",
      "Improved page layout consistency and readability across 100% of core pages",
    ],
    tools: ["Figma", "UI/UX", "Design Systems", "Usability Testing"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function ExperienceCard({ experience, index }) {
  const Icon = experience.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="group relative p-6 md:p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-zinc-900/40 hover:border-white/10"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none rounded-[2rem]"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${experience.color}, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${experience.color}40, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 shrink-0"
              style={{ backgroundColor: `${experience.color}10` }}
            >
              <Icon
                className="w-5 h-5 md:w-6 md:h-6"
                style={{ color: experience.color }}
              />
            </motion.div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                {experience.company}
              </h3>
              <p
                className="text-sm md:text-base font-semibold mt-1"
                style={{ color: experience.color }}
              >
                {experience.role}
              </p>
            </div>
          </div>

          {experience.link && (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              {experience.period}
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-1.5 text-zinc-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              {experience.type}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-3 mb-6">
          {experience.highlights.map((highlight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: experience.color }}
              />
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tools/Skills */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
          {experience.tools.map((tool) => (
            <span
              key={tool}
              className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-300 transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkExperience() {
  return (
    <section
      className="py-20 md:py-40 bg-black px-6 relative overflow-hidden"
      id="experience"
    >
      {/* Background decorations */}
      <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.03)]"
          >
            <Building2 className="w-3 h-3 text-sky-400" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-zinc-100">
              Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight"
          >
            Work Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed px-2"
          >
            Professional roles where I've applied my skills in real-world
            environments, from CRM automation to e-commerce design systems.
          </motion.p>
        </div>

        {/* Experience Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} experience={exp} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-zinc-900/30 backdrop-blur-md text-zinc-400 hover:text-white hover:border-white/20 hover:bg-zinc-900/50 transition-all duration-300"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
              View Projects
            </span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

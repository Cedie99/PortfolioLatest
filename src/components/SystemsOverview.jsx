import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import TiltCard from "./TiltCard";
import SkillMarquee from "./SkillMarquee";

const ease = [0.16, 1, 0.3, 1];

const SYSTEMS = [
  {
    name: "Frontend",
    color: "#38bdf8",
    skills: [
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/18181b" },
      { name: "React", icon: "https://cdn.simpleicons.org/react/0ea5e9" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06b6d4" },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/18181b" },
    ],
  },
  {
    name: "Backend & Database",
    color: "#4ade80",
    skills: [
      { name: "tRPC", icon: "https://cdn.simpleicons.org/trpc/2596be" },
      { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/ff2d20" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/18181b" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169e1" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479a1" },
      { name: "Inngest", icon: null },
    ],
  },
  {
    name: "Cloud & Deployment",
    color: "#f59e0b",
    skills: [
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/18181b" },
      { name: "GCP", icon: "https://cdn.simpleicons.org/googlecloud/4285f4" },
      { name: "Azure", icon: "https://cdn.simpleicons.org/microsoftazure/0078d4" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/f05032" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/18181b" },
    ],
  },
  {
    name: "Design & Tooling",
    color: "#a78bfa",
    skills: [
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/f24e1e" },
      { name: "Devswarm", icon: null },
      { name: "Cursor", icon: null },
      { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007acc" },
      { name: "UI/UX Design", icon: null },
      { name: "Design Systems", icon: null },
    ],
  },
];

const AI_SKILLS = [
  { name: "OpenAI API", icon: "https://cdn.simpleicons.org/openai/18181b" },
  { name: "Anthropic Claude", icon: "https://cdn.simpleicons.org/anthropic/18181b" },
  { name: "Groq AI", icon: null },
  { name: "Prompt Engineering", icon: null },
  { name: "AI Agent Integration", icon: null },
];

const PILLARS = [
  {
    num: "01",
    title: "Scalable Logic",
    desc: "Prioritizing data integrity and back-end efficiency. Foundations that grow with the user base, regardless of the stack.",
  },
  {
    num: "02",
    title: "Expressive Fluidity",
    desc: "Motion isn't decoration — it's communication. Interfaces that respond with organic, human-centric movement.",
  },
  {
    num: "03",
    title: "Fortified Integrity",
    desc: "Security woven into the architecture. Rooted in the CIA triad to ensure accountability at every layer.",
  },
];

function SystemModule({ system, index }) {
  return (
    <TiltCard maxTilt={6}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease }}
      className="group relative p-6 border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg shadow-sm card-glow overflow-hidden"
    >
      {/* Left color accent */}
      <div
        className="absolute top-0 left-0 w-[2px] h-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        style={{ backgroundColor: system.color }}
      />
      {/* Hover glow */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${system.color}08, transparent 70%)` }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {system.name}
            </span>
          </div>
          <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500">
            {system.skills.length} tools
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {system.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 rounded"
            >
              {skill.icon && (
                <img src={skill.icon} alt="" className="w-3.5 h-3.5 opacity-60 dark:invert" loading="lazy" />
              )}
              <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </TiltCard>
  );
}

export default function SystemsOverview() {
  return (
    <section id="systems" className="py-24 md:py-40 px-6 lg:pl-[80px] relative">
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
              // Systems Overview
            </p>
          </div>
          <TextReveal className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100 mb-6">
            Onboard Systems
          </TextReveal>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Jhon Cedrick Ignacio is a Software Engineer who architects systems that bridge the gap
            between complex logic and human emotion. His approach is technology-agnostic — focusing
            on the most efficient path to a seamless user journey. Currently engineering full-stack
            SaaS features with a T3-inspired stack at Elevora Technologies.
          </p>
        </motion.div>

        {/* System Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {SYSTEMS.map((system, i) => (
            <SystemModule key={system.name} system={system} index={i} />
          ))}
        </div>

        {/* Skill Marquee Ticker */}
        <SkillMarquee />

        {/* AI & LLMs Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="mb-16 p-6 border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg shadow-sm card-glow relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 w-full h-[2px] opacity-40"
            style={{ background: "linear-gradient(90deg, #f59e0b, #38bdf8, #a78bfa)" }}
          />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">
            AI & LLM Integration
          </p>
          <div className="flex flex-wrap gap-2">
            {AI_SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors rounded"
              >
                {skill.icon && (
                  <img src={skill.icon} alt="" className="w-3.5 h-3.5 opacity-60 dark:invert" loading="lazy" />
                )}
                <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="border-t border-zinc-200 dark:border-zinc-700 pt-10"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
            Core Protocols
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease }}
                className="group space-y-3 p-5 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors rounded-lg"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-2xl font-bold text-sky-400/15 group-hover:text-sky-400/25 transition-colors">
                    {pillar.num}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-gray-100 tracking-tight">{pillar.title}</h3>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

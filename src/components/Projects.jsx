import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";

import budgetByaheImg from '../assets/budgetbyahe.png'
import budgetByaheVideo from '../assets/bb.mp4';
import safezoneVid from '../assets/safezone.mp4';

const webProjects = [
  {
    title: "Budget Byahe",
    description: "A specialized fare calculation and routing application designed for the public transport network in Santa Maria, Bulacan. It integrates Google Maps for routing and Groq API for AI suggestions.",
    tags: ["React", "Laravel", "MySQL", "Firebase", "Google Maps", "Groq AI"],
    stats: "Regional Pitching Top 15/74 @ PSC10",
    image: "", // budgetByaheImg
    video: budgetByaheVideo, // budgetByaheVideo
    link: "https://budgetbyahe.com", 
    className: "md:col-span-1",
  },
  {
    title: "SafeZone PH",
    description: "A community-focused system built for reporting local issues directly to authorities.",
    tags: ["React", "Laravel", "MySQL"],
    stats: "Community Impact Project",
    video: safezoneVid, // safezoneVid
    link: "https://my-safezone-link.com",
    className: "md:col-span-1",
  }
];

function ProjectCard({ project, type }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }} // Subtle lift on hover
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative p-5 rounded-3xl bg-zinc-900/30 border border-white/10 overflow-hidden flex flex-col min-h-[520px] transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50 ${project.className}`}
    >
      {/* OVERLAY LINK 
          This makes the whole card clickable without nesting <a> tags around 
          block elements which can be semantically messy.
      */}
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`View ${project.title} project`}
      />

      {/* 1. THE STAGE */}
      <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-zinc-950/50 border border-white/5 flex items-center justify-center p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
        
        {/* Floating Badge */}
        <div className="absolute top-2 right-2 z-40 flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-tighter">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            View Project
        </div>

        {/* The Preview Media */}
        <motion.div className="relative z-20 w-full h-full shadow-2xl rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
            {project.video ? (
                <video
                    src={project.video}
                    poster={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            ) : project.image ? (
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain p-1" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <Code2 className="w-6 h-6 text-zinc-700" />
                </div>
            )}
        </motion.div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="relative z-10 flex flex-col flex-1 px-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>
        
        <p className="text-[10px] text-zinc-500 font-medium mb-3 uppercase tracking-wider">
           {type === 'web' ? '2025 - 2026' : project.role}
        </p>

        <p className="text-zinc-400 text-xs leading-relaxed mb-5 font-light line-clamp-3">
          {project.description}
        </p>

        {/* 3. TECH STACK PILLS */}
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5 relative z-40">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-semibold px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-300 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.05),
              transparent 80%
            )
          `,
        }}
      />
    </motion.div>
  );
}

const SectionHeader = ({ icon: Icon, title, subtitle, themeColor }) => (
  <div className="mb-16 relative">
    <div className="flex items-center gap-4 mb-4">
      <div 
        className="p-3 rounded-2xl backdrop-blur-xl border border-white/10"
        style={{ backgroundColor: `${themeColor}15` }} 
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: themeColor }} 
        />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
        {title}
      </h2>
    </div>
    <p className="text-zinc-500 text-lg max-w-2xl font-light pl-2">
      {subtitle}
    </p>
    <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
  </div>
);

export default function ProjectsSection() {
  return (
    <section className="py-40 bg-black text-white px-6 relative" id="work">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-40">
          <SectionHeader 
            icon={Code2} 
            title="Web Development Projects" 
            subtitle="Building robust backends and interactive frontends with a focus on performance and scalability."
            themeColor="#3b82f6" 
            />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webProjects.map((p, i) => <ProjectCard key={i} project={p} type="web" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
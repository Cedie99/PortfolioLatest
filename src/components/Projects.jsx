import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";

import budgetByaheVideo from '../assets/bb.mp4';
import safezoneVid from '../assets/safezone.mp4';

const webProjects = [
  {
    title: "Budget Byahe",
    description: "A specialized fare calculation and routing application designed for the public transport network in Santa Maria, Bulacan. It integrates Google Maps for routing and Groq API for AI suggestions.",
    tags: ["React", "Laravel", "MySQL", "Firebase", "Google Maps", "Groq AI"],
    stats: "Regional Pitching Top 15/74 @ PSC10",
    image: "", 
    video: budgetByaheVideo, 
    link: "https://budgetbyahe.com", 
    className: "lg:col-span-1",
  },
  {
    title: "SafeZone PH",
    description: "A community-focused system built for reporting local issues directly to authorities.",
    tags: ["React", "Laravel", "MySQL"],
    stats: "Community Impact Project",
    video: safezoneVid, 
    link: "https://my-safezone-link.com",
    className: "lg:col-span-1",
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
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`group relative p-4 md:p-6 rounded-[2rem] bg-zinc-900/30 border border-white/10 overflow-hidden flex flex-col min-h-fit md:min-h-[520px] transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50 ${project.className}`}
    >
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`View ${project.title} project`}
      />

      {/* 1. THE STAGE - Adjusted aspect for mobile */}
      <div className="relative w-full h-44 md:h-48 mb-6 rounded-2xl overflow-hidden bg-zinc-950/50 border border-white/5 flex items-center justify-center p-2 md:p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
        
        <div className="absolute top-2 right-2 z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[8px] md:text-[9px] font-black text-white uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>

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
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>
        
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">
            {type === 'web' ? '2025 - 2026' : project.role}
          </p>
          {project.stats && (
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight">
              {project.stats}
            </span>
          )}
        </div>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-medium line-clamp-4 md:line-clamp-3">
          {project.description}
        </p>

        {/* 3. TECH STACK PILLS - Improved touch spacing */}
        <div className="mt-auto pt-4 flex flex-wrap gap-2 relative z-40">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 border border-white/5 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Spotlight Effect - Desktop Only for Performance */}
      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(56,189,248,0.07),
              transparent 80%
            )
          `,
        }}
      />
    </motion.div>
  );
}

const SectionHeader = ({ icon: Icon, title, subtitle, themeColor }) => (
  <div className="mb-12 md:mb-20 relative">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
      <div 
        className="w-14 h-14 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${themeColor}15` }} 
      >
        <Icon 
          className="w-7 h-7" 
          style={{ color: themeColor }} 
        />
      </div>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
        {title}
      </h2>
    </div>
    <p className="text-zinc-500 text-base md:text-xl max-w-3xl font-medium leading-relaxed">
      {subtitle}
    </p>
    <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
  </div>
);

export default function ProjectsSection() {
  return (
    <section className="py-20 md:py-40 bg-black text-white px-6 relative overflow-hidden" id="work">
      {/* Background Glows - Adjusted for better mobile spread */}
      <div className="absolute top-0 left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] md:blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-600/10 rounded-full blur-[100px] md:blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-32">
          <SectionHeader 
            icon={Code2} 
            title="Web Development" 
            subtitle="Building robust backends and interactive frontends with a focus on performance and scalability."
            themeColor="#3b82f6" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {webProjects.map((p, i) => <ProjectCard key={i} project={p} type="web" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
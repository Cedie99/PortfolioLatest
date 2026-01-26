import React, { useRef, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  Cloud, 
  FileCheck,
  Code2
} from "lucide-react";

const achievements = [
  {
    type: "certification",
    title: "Salesforce Virtual Internship",
    issuer: "SmartBridge & Salesforce",
    date: "Jan 2026",
    description: "8-week intensive program covering Apex, LWC, Agentforce, and Declarative Automation.",
    achievement: "Agentblazer Champion",
    icon: Award,
    color: "#f59e0b",
  },
  {
    type: "hackathon",
    title: "Philippine Startup Challenge 10",
    project: "Budget Byahe",
    achievement: "Regional Pitching - Top 15",
    date: "Nov 2025",
    description: "Pitched a smart fare calculation and routing app for Bulacan, reaching the regional stage.",
    icon: Trophy,
    color: "#f59e0b",
  },
  {
    type: "certification",
    title: "[UDEMY] AWS Cloud Practitioner",
    issuer: "Udemy",
    date: "Sept 2025",
    description: "Mastered fundamental AWS cloud infrastructure, security, and core architectural services.",
    icon: Cloud,
    color: "#ec4899",
  },
  {
    type: "certification",
    title: "Master AI for Web Apps",
    issuer: "Simplilearn | SkillUp",
    date: "Apr 2025",
    description: "Deepened technical initiative in integrating AI models into modern web ecosystems.",
    icon: BrainCircuit,
    color: "#10b981",
  },
  {
    type: "certification",
    title: "Frontend Development Libraries",
    issuer: "freeCodeCamp",
    date: "Apr 2025",
    description: "Completed 300 hours of coursework mastering React, Redux, SaaS, and Bootstrap.",
    icon: Code2,
    color: "#6366f1",
  },
  {
    type: "certification",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Apr 2025",
    description: "Verified student-level credential for proficiency in threat identification and online safety.",
    icon: ShieldCheck,
    color: "#ef4444",
  },
];

function RoadmapItem({ item, index }) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    /* Reduced margin-bottom from 32 to 20 to save vertical space */
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full mb-20 last:mb-0">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-950 z-20 absolute left-0 md:left-1/2 md:-ml-5 transition-all duration-500 group-hover:scale-110 group-hover:border-white/40 shadow-2xl">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0.5 }}
          whileInView={{ scale: [1, 1.2, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-2.5 h-2.5 rounded-full" 
          style={{ 
            backgroundColor: item.color,
            boxShadow: `0 0 15px ${item.color}` 
          }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "circOut" }}
        /* Reduced width from 45% to 40% and padding from 8 to 6 */
        className="w-[calc(100%-3.5rem)] md:w-[40%] p-6 rounded-[2rem] bg-zinc-900/20 border border-white/5 backdrop-blur-xl relative overflow-hidden group/card hover:bg-zinc-900/40 transition-all duration-500 ml-auto md:ml-0"
      >
        {item.type === "certification" && (
          <div className="absolute top-4 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <FileCheck className="w-2.5 h-2.5 text-zinc-400" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Verified</span>
          </div>
        )}

        <div 
          className="absolute -inset-px opacity-0 group-hover/card:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner"
              style={{ color: item.color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-0.5">
                {item.date}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight pr-12 md:pr-0">
                {item.title}
              </h3>
            </div>
          </div>

          {item.achievement && (
            <div 
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
              style={{ 
                backgroundColor: `${item.color}10`, 
                borderColor: `${item.color}30`, 
                color: item.color 
              }}
            >
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
              {item.achievement}
            </div>
          )}

          <p className="text-zinc-400 text-xs leading-relaxed font-medium mb-4">
            {item.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            {item.project && (
              <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <span className="text-[8px] font-black uppercase text-zinc-500">Project</span>
                <span className="text-[10px] text-zinc-200 font-bold tracking-tight">{item.project}</span>
              </div>
            )}
            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest ml-auto">{item.issuer}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AchievementsRoadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stars = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`,
  })), []);

  return (
    <section ref={containerRef} className="py-40 bg-black px-6 relative overflow-hidden" id="about">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full opacity-30"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--delay': star.delay,
              '--duration': star.duration,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Chronicle</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Milestone Roadmap
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-medium tracking-tight">
            A documentation of technical evolution, competitive success, and industry recognition.
          </p>
        </div>

        <div className="relative pt-12">
          <div className="absolute left-5 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[1.5px] bg-zinc-900" />
          
          <motion.div 
            style={{ scaleY }}
            className="absolute left-5 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 origin-top z-10" 
          />

          <div className="relative">
            {achievements.map((item, index) => (
              <RoadmapItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
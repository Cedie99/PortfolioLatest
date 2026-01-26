import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, MapPin, Zap, BrainCircuit } from "lucide-react";

export default function Education() {
  return (
    <section className="py-32 bg-black px-6 relative overflow-hidden" id="education">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#800000]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#800000] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <GraduationCap className="w-3 h-3" />
            Academic Journey
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Education & Studies
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main University Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          >
            {/* Grid Beam Effect */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 rounded-2xl bg-[#800000]/10 border border-[#800000]/20">
                  <School className="w-8 h-8 text-[#800000]" />
                </div>
                <span className="text-zinc-500 text-sm font-medium tracking-tighter">2022 — PRESENT</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.1]">
                Polytechnic University <br /> of the Philippines
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-lg font-light">
                <MapPin className="w-4 h-4" /> Sta. Maria, Bulacan
              </div>
            </div>

            <div className="relative z-10 mt-12 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold">BS Information Technology</span>
            </div>
          </motion.div>

          {/* Core Skills Bento Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 flex flex-col"
          >
            <div className="p-3 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
              <BrainCircuit className="w-5 h-5 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold text-white mb-6 tracking-tight">Technical Mastery</h4>
            <ul className="space-y-4">
              {['Web Development', 'UI/UX Design', 'Systems Analysis', 'Database Management', 'Information Security'].map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-zinc-400 text-sm group">
                  <div className="h-1 w-1 rounded-full bg-blue-500 group-hover:w-3 transition-all" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Capstone Focus Bento Card */}
<motion.div 
  whileHover={{ y: -5 }}
  className="md:col-span-3 p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/40 to-black border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
>
  <div className="flex items-center gap-6">
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
      <Zap className="w-6 h-6 text-amber-500" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white tracking-tight">Capstone Project</h4>
      <p className="text-zinc-500 text-sm mt-1">Budget Byahe: Smart Fare Calculation & Routing System</p>
    </div>
  </div>

  <div className="h-px md:h-12 w-full md:w-px bg-zinc-800" />

  {/* UPDATED DIV BELOW */}
  <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4">
    {['React', 'Laravel', 'MySQL', 'Firebase', 'Google Maps API', 'Groq AI'].map(tech => (
      <span 
        key={tech} 
        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-4 py-2 border border-white/5 rounded-full bg-white/5 whitespace-nowrap"
      >
        {tech}
      </span>
    ))}
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
}
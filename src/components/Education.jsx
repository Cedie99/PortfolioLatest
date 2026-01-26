import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, MapPin, Zap, BrainCircuit } from "lucide-react";

export default function Education() {
  return (
    <section className="py-20 md:py-32 bg-black px-6 relative overflow-hidden" id="education">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#800000]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#800000] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4"
          >
            <GraduationCap className="w-3 h-3" />
            Academic Journey
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white">
            Education & Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Main University Card */}
          <motion.div 
            className="md:col-span-2 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/20 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[320px] md:min-h-[400px]"
          >
            <div className="absolute inset-0 opacity-10 md:opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6 md:mb-10">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#800000]/10 border border-[#800000]/20">
                  <School className="w-6 h-6 md:w-8 md:h-8 text-[#800000]" />
                </div>
                <span className="text-zinc-500 text-xs md:text-sm font-medium tracking-tighter">2022 — PRESENT</span>
              </div>
              <h3 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                Polytechnic University <br className="hidden md:block" /> of the Philippines
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-sm md:text-lg font-light">
                <MapPin className="w-4 h-4" /> Sta. Maria, Bulacan
              </div>
            </div>
            <div className="relative z-10 mt-8 md:mt-12 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-white text-[10px] md:text-xs font-semibold">BS Information Technology</span>
            </div>
          </motion.div>

          {/* Core Skills - Stacked on Mobile */}
          <motion.div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/20 border border-white/5 flex flex-col">
            <div className="p-3 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4 md:mb-6">
              <BrainCircuit className="w-5 h-5 text-blue-500" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight">Relevant Coursework</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {['Web Development', 'UI/UX Design', 'Software Engineering', 'Database Management', 'Cybersecurity'].map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-zinc-400 text-[11px] md:text-sm">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Capstone Project - Improved Wrapping */}
          <motion.div className="md:col-span-3 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-zinc-900/40 to-black border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">Capstone Project</h4>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">Budget Byahe: Smart Fare System</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {['React', 'Laravel', 'Google Cloud Platform', 'Groq AI'].map(tech => (
                <span key={tech} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-1.5 border border-white/5 rounded-full bg-white/5">
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
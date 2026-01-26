import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Cpu, 
  Orbit, 
  Fingerprint,
  Zap,
  Activity,
  ArrowUpRight
} from "lucide-react";

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={containerRef} className="bg-black py-40 px-6 relative overflow-hidden" id="about">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-40">
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-zinc-900/50 backdrop-blur-md text-sky-400 text-[10px] font-black uppercase tracking-[0.4em]"
            >
              <Zap className="w-3 h-3 fill-sky-400" />
              About Me
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[1] lg:max-w-4xl">
              Defining <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500 italic">Digital Boundless </span>.
            </h2>

            <p className="text-zinc-400 text-xl md:text-3xl leading-tight max-w-4xl font-medium tracking-tight">
              I am <span className="text-white">Cedrick</span>. I am a Web Developer and UI/UX Designer. I don't just write code; I architect systems that bridge the gap between <span className="text-emerald-400">complex logic</span> and <span className="text-sky-400">human emotion</span>. My approach is technology-agnostic—focusing on the most efficient path to a seamless user journey.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            {/* Live Agnostic Status Card */}
            <motion.div 
              style={{ y }}
              className="p-10 rounded-[3rem] bg-zinc-900/10 border border-white/10 backdrop-blur-3xl relative group overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Activity className="text-sky-400 w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">System Status</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-xl leading-tight">Currently Exploring</h4>
                  <div className="flex flex-wrap gap-2">
                    {['SaaS Architecture', 'Scalable Systems', 'UX Motion'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium italic">
                    "Tools change, principles remain. I build for the next generation of the web."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-zinc-900 pt-20">
          <Pillar 
            title="Scalable Logic" 
            desc="Prioritizing data integrity and back-end efficiency. I build foundations that grow with the user base, regardless of the stack."
            icon={<Cpu className="w-5 h-5" />}
            number="01"
          />
          <Pillar 
            title="Expressive Fluidity" 
            desc="Motion isn't decoration; it's communication. I design interfaces that respond with organic, human-centric movement."
            icon={<Orbit className="w-5 h-5" />}
            number="02"
          />
          <Pillar 
            title="Fortified Integrity" 
            desc="Security is woven into the architecture. Deeply rooted in the CIA triad to ensure accountability and safety at every layer."
            icon={<Fingerprint className="w-5 h-5" />}
            number="03"
          />
        </div>

      </div>
    </section>
  );
}

function Pillar({ title, desc, icon, number }) {
  return (
    <div className="relative group cursor-default">
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-all duration-500">
          {icon}
        </div>
        <span className="text-sky-500 font-mono text-xs font-black tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
          {number}
        </span>
      </div>
      <h4 className="text-white font-bold text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-500">
        {title}
      </h4>
      <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
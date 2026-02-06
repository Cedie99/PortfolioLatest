import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  Orbit,
  Fingerprint,
  Zap,
  Activity
} from "lucide-react";

const headingWords = ["Defining", "Digital", "Boundless."];

const pillarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const desktopY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={containerRef}
      className="bg-black py-20 md:py-40 px-6 relative overflow-hidden"
      id="about"
    >
      <div className="absolute top-0 left-0 md:left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-500/5 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-500/5 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-40">
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-zinc-900/50 backdrop-blur-md text-sky-400 text-[10px] font-black uppercase tracking-[0.4em]"
            >
              <Zap className="w-3 h-3 fill-sky-400" />
              About Me
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] lg:max-w-4xl">
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={i === 0 ? "" : ""}
                >
                  {i === 0 && <>{word} <br /></>}
                  {i > 0 && (
                    <span className={i > 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500 italic" : ""}>
                      {word}{" "}
                    </span>
                  )}
                </motion.span>
              ))}
            </h2>

            <p className="text-zinc-400 text-lg md:text-2xl lg:text-3xl leading-snug max-w-4xl font-medium tracking-tight">
              I am <span className="text-white">Cedrick</span>. I am a Web Developer and UI/UX Designer. I don't just write code; I architect systems that bridge the gap between <span className="text-emerald-400">complex logic</span> and <span className="text-sky-400">human emotion</span>. My approach is technology-agnostic—focusing on the most efficient path to a seamless user journey.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            {/* Status Card with animated gradient border */}
            <motion.div
              style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? desktopY : y }}
              className="relative p-[1px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
            >
              {/* Animated conic border */}
              <div className="absolute inset-[-2px] bg-[conic-gradient(from_0deg,transparent,rgba(56,189,248,0.3),transparent,rgba(16,185,129,0.3),transparent)] animate-[spin_6s_linear_infinite] rounded-[2rem] md:rounded-[3rem]" />

              <div className="relative p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-zinc-950/90 backdrop-blur-3xl noise-texture shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] md:rounded-[3rem]" />

                <div className="relative z-10 space-y-6 md:space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Activity className="text-sky-400 w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-500">System Status</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-lg md:text-xl leading-tight">Currently Exploring</h4>
                    <div className="flex flex-wrap gap-2">
                      {['SaaS Architecture', 'Scalable Systems', 'UX Motion'].map((tag) => (
                        <span key={tag} className="text-[9px] md:text-[10px] font-bold text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-wider">
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
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pillars Grid - Staggered entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 border-t border-zinc-900 pt-16 md:pt-20"
        >
          <Pillar
            title="Scalable Logic"
            desc="Prioritizing data integrity and back-end efficiency. I build foundations that grow with the user base, regardless of the stack."
            icon={<Cpu className="w-5 h-5" />}
            number="01"
            index={0}
          />
          <Pillar
            title="Expressive Fluidity"
            desc="Motion isn't decoration; it's communication. I design interfaces that respond with organic, human-centric movement."
            icon={<Orbit className="w-5 h-5" />}
            number="02"
            index={1}
          />
          <Pillar
            title="Fortified Integrity"
            desc="Security is woven into the architecture. Deeply rooted in the CIA triad to ensure accountability and safety at every layer."
            icon={<Fingerprint className="w-5 h-5" />}
            number="03"
            index={2}
          />
        </motion.div>

      </div>
    </section>
  );
}

function Pillar({ title, desc, icon, number, index }) {
  return (
    <motion.div
      custom={index}
      variants={pillarVariants}
      className="relative group cursor-default p-6 rounded-2xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-500"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-t-2xl" />

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-all duration-500">
          {icon}
        </div>
        <span className="text-sky-500 font-mono text-xs font-black tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
          {number}
        </span>
      </div>
      <h4 className="text-white font-bold text-xl md:text-2xl mb-3 md:mb-4 group-hover:translate-x-2 transition-transform duration-500">
        {title}
      </h4>
      <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
        {desc}
      </p>
    </motion.div>
  );
}

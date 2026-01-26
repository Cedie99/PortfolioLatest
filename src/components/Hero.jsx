import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-start items-center text-center px-4 pt-32 pb-40 relative overflow-hidden bg-black">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + "px",
              height: Math.random() * 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* REFINED SPOTLIGHT */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)] blur-3xl pointer-events-none" />
      
      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* Announcement Badge */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <div className="group relative inline-flex items-center justify-center rounded-full p-[1px] mb-8 overflow-hidden">
                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_25%,#f59e0b_50%,transparent_75%,transparent_100%)]" />
                <div className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 backdrop-blur-xl text-zinc-400 text-xs transition-all duration-300 group-hover:bg-zinc-900/90">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                  <span className="tracking-tight font-medium">Available for new opportunities</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </motion.div>

        {/* Updated Heading with Expanded Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl px-4 flex flex-col items-center"
        >
          {/* CHANGED: Swapped maroon shades for blue/sky palette */}
          <span className="text-sky-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6 bg-sky-500/5 px-4 py-1.5 rounded-full border border-sky-500/20">
            Cedie // Systems & Design
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.25] text-white">
            Bridging the gap between robust architecture and expressive motion.
          </h1>
        </motion.div>

        {/* Updated Description with Expanded Width */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 text-zinc-400 text-base md:text-xl max-w-3xl leading-relaxed font-normal px-6"
        >
          I engineer next-generation applications with a focus on 
          <span className="text-zinc-100"> speed</span>, 
          <span className="text-zinc-100"> scalability</span>, and 
          <span className="text-zinc-100"> polished user journeys</span>.
        </motion.p>

        {/* CTA Button Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 relative group"
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-100 transition-colors z-10 shadow-xl"
          >
            See My Works
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
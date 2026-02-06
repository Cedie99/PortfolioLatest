import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" },
  }),
};

function AnimatedHeading() {
  const words = [
    { text: "Bridging", className: "text-white" },
    { text: "the", className: "text-white" },
    { text: "gap", className: "text-white" },
    { text: "between", className: "text-white" },
    { text: "robust", className: "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white" },
    { text: "architecture", className: "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white" },
    { text: "and", className: "text-white" },
    { text: "expressive", className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white" },
    { text: "motion.", className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white" },
  ];

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] flex flex-wrap justify-center gap-x-[0.3em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          className={word.className}
        >
          {word.text}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-start items-center text-center px-4 pt-32 pb-40 relative overflow-hidden bg-black">

      {/* --- BACKGROUND: Gradient Orbs --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/15 blur-[120px] float-slow gradient-shift" />
        <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px] float-slow gradient-shift" style={{ animationDelay: "-7s" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px] float-slow gradient-shift" style={{ animationDelay: "-14s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Spotlight */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] blur-3xl pointer-events-none" />

      {/* --- CONTENT --- */}
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

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl px-4 flex flex-col items-center"
        >
          <span className="text-sky-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6 bg-sky-500/5 px-4 py-1.5 rounded-full border border-sky-500/20">
            Cedie // Systems & Design
          </span>
          <AnimatedHeading />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-zinc-400 text-base md:text-xl max-w-3xl leading-relaxed font-normal px-6"
        >
          I engineer next-generation applications with a focus on
          <span className="text-zinc-100"> speed</span>,
          <span className="text-zinc-100"> scalability</span>, and
          <span className="text-zinc-100"> polished user journeys</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shimmer-btn relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-100 transition-colors z-10 shadow-xl"
            >
              See My Works
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          <motion.a
            href="/Jhon Cedrick Ignacio - Resume.pdf"
            download="Jhon Cedrick Ignacio - Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}

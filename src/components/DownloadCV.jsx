import { motion } from "framer-motion";
import { Download, Terminal, Github, Cpu } from "lucide-react"; // Replaced icon

export default function DownloadCV() {
  return (
    <section className="bg-black py-20 md:py-48 px-6 relative overflow-hidden" id="cv">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full opacity-[0.03] md:opacity-[0.02] overflow-hidden whitespace-nowrap">
        <h2 className="text-[25vw] md:text-[18vw] font-black text-white leading-none uppercase tracking-tighter">
          ENGINEER
        </h2>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-[-10%] md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-500/10 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] md:right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/10 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Engineering Narrative */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-zinc-900/50 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]"
            >
              <Cpu className="w-3.5 h-3.5" />
              Curriculum Vitae
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[1.1] md:leading-[0.9]">
              Compiled <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-white to-zinc-500 italic">Protocols</span>.
            </h2>

            <p className="text-zinc-400 md:text-zinc-500 text-lg md:text-2xl leading-tight max-w-xl font-medium tracking-tight">
              The formal documentation of a <span className="text-white font-bold">Web Development</span> journey: bridging the gap between <span className="text-white font-bold">complex backend logic</span> and <span className="text-white font-bold">scalable systems</span>.
            </p>

            <div className="flex flex-row flex-wrap gap-4 pt-4">
              {/* CV Download Button - Icon Only on Mobile */}
              <motion.a
                href="/Jhon Cedrick Ignacio - Resume.pdf" 
                download="Jhon Cedrick Ignacio - Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center bg-white rounded-2xl md:rounded-full text-black transition-all hover:bg-sky-400 
                           w-14 h-14 md:w-auto md:px-10 md:py-5 shadow-2xl"
              >
                <Download className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em] ml-4">Download CV</span>
                <div className="absolute inset-0 rounded-2xl md:rounded-full bg-sky-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </motion.a>
              
              {/* GIT HISTORY BUTTON - Now with GitHub Icon */}
              <motion.a 
                href="https://github.com/Cedie99" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-2xl md:rounded-full border border-white/10 text-white transition-all group
                           w-14 h-14 md:w-auto md:px-8 md:py-5"
              >
                <Github className="w-5 h-5 md:w-4 md:h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="hidden md:block text-[11px] font-black uppercase tracking-widest ml-3">Git History</span>
              </motion.a>
            </div>
          </div>

          {/* System Artifact Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative w-full"
          >
            <div className="aspect-square sm:aspect-[3/4] rounded-[2rem] md:rounded-[3rem] bg-zinc-900/10 border border-white/10 backdrop-blur-3xl p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
              
              <div className="h-full flex flex-col justify-between relative z-10 text-left">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Terminal className="text-sky-400 w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active_State</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Education Profile</p>
                    <h4 className="text-white text-xl md:text-2xl font-bold tracking-tight leading-tight">Polytechnic University <br /> of the Philippines</h4>
                    <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em]">BS Information Technology</p>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest shrink-0">Expertise</span>
                      <span className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded text-right">
                        Full-Stack Web Dev
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
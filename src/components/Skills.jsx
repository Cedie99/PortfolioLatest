import { motion } from "framer-motion";
import azure from "../assets/azure.svg";

const categories = [
  {
    label: "Languages & Database",
    skills: [
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/white", color: "#E34F26" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css/white", color: "#1572B6" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/white", color: "#F7DF1E" },
      { name: "PHP", icon: "https://cdn.simpleicons.org/php/white", color: "#777BB4" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/white", color: "#4479A1" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/white", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/white", color: "#1572B6" },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/white", color: "#1572B6" },
      { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/white", color: "#FF2D20" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white", color: "#339933" },
    ],
  },
  {
    label: "Tools & Design",
    skills: [
      { name: "Git", icon: "https://cdn.simpleicons.org/git/white", color: "#F05032" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/white", color: "#ffffff" },
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/white", color: "#F24E1E" },
    ],
  },
  {
    label: "Cloud Platforms",
    skills: [
      { name: "GCP", icon: "https://cdn.simpleicons.org/googlecloud/white", color: "#F05032" },
      { name: "Microsoft Azure", icon: azure, color: "#F05032" },
    ],
  },
];

const allSkillNames = categories.flatMap((cat) => cat.skills.map((s) => s.name));

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

export default function SkillsSection() {
  return (
    <section className="bg-black py-32 px-6 relative overflow-hidden" id="skills">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/20"
          >
            Capabilities
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Technical Ecosystem
          </h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="text-zinc-700 text-xs font-black tracking-widest uppercase">0{idx + 1}</span>
                <div className="h-px flex-1 bg-zinc-800/50" />
                <p className="text-zinc-400 text-[11px] uppercase tracking-[0.3em] font-bold">
                  {cat.label}
                </p>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-3 sm:grid-cols-4 gap-6"
              >
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={skillItemVariants}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="flex flex-col items-center gap-4 group cursor-default"
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                        style={{ backgroundColor: skill.color }}
                      />

                      <div className="relative p-5 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:bg-zinc-800/50 flex items-center justify-center">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>

                    <span className="text-zinc-600 group-hover:text-white text-[10px] font-bold tracking-widest transition-colors uppercase">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skills Marquee */}
        <div className="mt-20 overflow-hidden border-t border-b border-white/5 py-4">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...allSkillNames, ...allSkillNames].map((name, i) => (
              <span
                key={i}
                className="mx-6 text-zinc-600 text-[11px] font-bold uppercase tracking-[0.3em] inline-block"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

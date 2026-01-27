import { motion } from "framer-motion";
import { ExternalLink, Palette, Layers, Eye } from "lucide-react";
import bbDesign from "../assets/bbdesign.png";
import streamingApp from "../assets/streamingapp.png";
import appliance from "../assets/appliance.png";
import vodka from "../assets/vodka.png";

const designProjects = [
  {
    title: "Streaming Application",
    category: "UI/UX Design • Mobile Application",
    image: streamingApp,
    link: "https://www.behance.net/gallery/235138429/Streaming-Application-User-Interface",
    span: "md:col-span-2",
  },
  {
    title: "Budget Byahe",
    category: "UI/UX Design • SaaS",
    image: bbDesign,
    link: "https://budgetbyahe.com",
    span: "md:col-span-1",
  },
  {
    title: "Online Shopping App",
    category: "Mobile App Design • E-commerce",
    image: vodka,
    link: "https://www.behance.net/gallery/235139681/Product-Showcase",
    span: "md:col-span-1",
  },
  {
    title: "Appliance Warehouse",
    category: "UI/UX Design • Website Redesign",
    image: appliance,
    link: "https://www.figma.com/proto/Z3LV3SO7SILcz4XmQcTABN/Application-Warehouse---Copy?node-id=1-5863&p=f&t=mGeCV0bSWwhT4yv4-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    span: "md:col-span-2",
  },
];

export default function BehanceSection() {
  return (
    <section className="bg-black py-20 md:py-32 px-6 relative overflow-hidden" id="design">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6"
            >
              <Palette className="w-3 h-3" />
              Design Showcase
            </motion.div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Visual Narrative & <br className="hidden md:block" /> Digital Craft
            </h2>
          </div>
          
          {/* ADAPTIVE ICON-ONLY BUTTON */}
          <div className="flex items-end">
            <motion.a
              href="https://www.behance.net/johnceignacio"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center rounded-2xl bg-zinc-900 text-white ring-1 ring-white/10 transition-all hover:bg-zinc-800 hover:ring-sky-500/50 
                         w-14 h-14 md:w-auto md:h-auto md:px-7 md:py-4"
            >
              {/* Desktop Text - Hidden on Mobile */}
              <span className="hidden md:block text-[11px] font-bold uppercase tracking-widest mr-3">
                Explore Behance
              </span>
              
              {/* Icon - Always Visible */}
              <ExternalLink className="w-5 h-5 md:w-4 md:h-4 text-zinc-400 group-hover:text-sky-400 transition-colors" />
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </motion.a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {designProjects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${project.span} group relative aspect-[4/3] sm:aspect-video md:aspect-auto md:h-[450px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900 border border-white/5 block`}
            >
              <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <span className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                    <Eye className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">View Project</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{project.title}</h3>
                <p className="text-zinc-400 text-xs md:text-sm font-medium mt-1">{project.category}</p>
              </div>

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 md:via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

              <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-1000 ease-out">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 md:opacity-100 group-hover:opacity-40 transition-opacity duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Layers className="w-12 h-12 text-white/5" />
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Context Line */}
        <div className="mt-12 md:mt-16 flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start border-t border-white/5 pt-8">
          {['Typography', 'Grid Systems', 'Interaction', 'Visual Identity'].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{tag}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
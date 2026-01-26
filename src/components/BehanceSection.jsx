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
    image: streamingApp, // Replace with your project image
    link: "https://www.behance.net/gallery/235138429/Streaming-Application-User-Interface", // Replace with specific link
    span: "md:col-span-2",
  },
  {
    title: "Budget Byahe",
    category: "UI/UX Design • SaaS",
    image: bbDesign, // Replace with your project image
    link: "https://budgetbyahe.com",
    span: "md:col-span-1",
  },
  {
    title: "Online Shopping App",
    category: "Mobile App Design • E-commerce",
    image: vodka, // Replace with your project image
    link: "https://www.behance.net/gallery/235139681/Product-Showcase",
    span: "md:col-span-1",
  },
  {
    title: "Appliance Warehouse",
    category: "UI/UX Design • Website Redesign",
    image: appliance, // Replace with your project image
    link: "https://www.behance.net/your-profile",
    span: "md:col-span-2",
  },
];

export default function BehanceSection() {
  return (
    <section className="bg-black py-32 px-6 relative overflow-hidden" id="design">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Palette className="w-3 h-3" />
              Design Showcase
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none">
              Visual Narrative & <br /> Digital Craft
            </h2>
          </div>
          
          <motion.a
            href="https://www.behance.net/johnceignacio"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-white/5 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all group"
          >
            Explore me on Behance
            <ExternalLink className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designProjects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${project.span} group relative aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5`}
            >
              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="p-2 rounded-lg bg-white/10 backdrop-blur-md">
                    <Eye className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">View Project</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                <p className="text-zinc-400 text-sm font-medium">{project.category}</p>
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

             {/* Background Image Layer */}
              <div className="absolute inset-0 bg-zinc-800 group-hover:scale-110 transition-transform duration-700 ease-out">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-100 group-hover:opacity-40 transition-opacity" 
                  />
                ) : (
                  /* Fallback if no image is provided */
                  <div className="w-full h-full flex items-center justify-center">
                    <Layers className="w-12 h-12 text-white/5" />
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Context Line */}
        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 justify-center md:justify-start">
          {['Typography', 'Grid Systems', 'Interaction', 'Visual Identity'].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">{tag}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
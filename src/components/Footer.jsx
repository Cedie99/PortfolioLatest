import { ArrowUp, Github, Linkedin, Palette } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const links = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/Cedie99", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jhon-cedrick-ignacio-127944326/", icon: Linkedin },
    { name: "Behance", href: "https://www.behance.net/johnceignacio", icon: Palette },
  ];

  return (
    <footer className="relative pt-12 pb-8 bg-black/50 backdrop-blur-md">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Quick nav */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to top</span>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 group-hover:-translate-y-0.5 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-zinc-600 text-[10px] tracking-widest uppercase">
            &copy; 2026 Cedie | Systems & Designs.
          </p>
          <p className="text-zinc-700 text-[10px] tracking-wider">
            Powered by Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}

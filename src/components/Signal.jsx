import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";
import TextReveal from "./TextReveal";
import { useMagnetic } from "../hooks/useMagnetic";

const ease = [0.16, 1, 0.3, 1];

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Cedie99", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jhon-cedrick-ignacio-127944326/", icon: Linkedin },
  { name: "Behance", href: "https://www.behance.net/johnceignacio", icon: ExternalLink },
];

function MagneticWrapper({ children, as: Component = "div", ...props }) {
  const magnetic = useMagnetic({ strength: 0.25, radius: 40 });
  return (
    <Component
      {...props}
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={{ ...magnetic.style, ...(props.style || {}) }}
    >
      {children}
    </Component>
  );
}

export default function Signal() {
  const form = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_pp2gv4q",
        "template_frqacre",
        form.current,
        "cKMFBGZjYTXdyzjd_"
      );
      setSent(true);
      form.current?.reset();
      setTimeout(() => {
        setSent(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      console.error("EmailJS error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="signal" className="relative min-h-screen flex items-center justify-center px-6 lg:pl-[80px] overflow-hidden">
      {/* Radar sweep background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-[0.06]">
          <div
            className="w-full h-full rounded-full radar-sweep"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(56,189,248,0.5) 8%, transparent 16%)",
            }}
          />
        </div>
        {/* Concentric rings */}
        {[160, 280, 400, 520].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-black/[0.04] dark:border-white/[0.04]"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ))}
        {/* Center crosshair */}
        <div className="absolute w-px h-6 bg-sky-400/10" />
        <div className="absolute w-6 h-px bg-sky-400/10" />
        <div className="absolute w-2 h-2 rounded-full border border-sky-400/10" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="space-y-6 mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-sky-400/30" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              // Signal
            </p>
            <span className="w-8 h-px bg-sky-400/30" />
          </div>
          <TextReveal className="text-5xl md:text-8xl font-black tracking-[-0.05em] text-zinc-900 dark:text-gray-100 leading-[0.85]">
            TRANSMIT SIGNAL
          </TextReveal>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
            Ready for collaboration, new challenges, or just a conversation about building the future of the web.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticWrapper as="a"
            href="/Jhon Cedrick S. Ignacio - Resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v9M3 7l4 4 4-4M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Dossier
          </MagneticWrapper>
          <MagneticWrapper as="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-3 px-8 py-4 border border-sky-400/30 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400/5 transition-colors rounded"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal signal-pulse" />
            {showForm ? "Close Comms" : "Open Comms"}
          </MagneticWrapper>
        </motion.div>

        {/* Contact Form (collapsible) */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-16"
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4 text-left"
            >
              <div>
                <label className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                  Callsign
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-900 dark:text-gray-100 placeholder:text-zinc-400 focus:outline-none focus:border-sky-400/30 transition-colors font-mono rounded"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                  Frequency
                </label>
                <input
                  type="email"
                  name="reply_to"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-900 dark:text-gray-100 placeholder:text-zinc-400 focus:outline-none focus:border-sky-400/30 transition-colors font-mono rounded"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                  Transmission
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-900 dark:text-gray-100 placeholder:text-zinc-400 focus:outline-none focus:border-sky-400/30 transition-colors font-mono resize-none rounded"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-sky-400/10 border border-sky-400/20 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-sky-400/15 transition-colors disabled:opacity-40 rounded"
              >
                {sent ? "✓ SIGNAL TRANSMITTED" : sending ? "TRANSMITTING..." : "TRANSMIT"}
              </button>
            </form>
          </motion.div>
        )}

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, ease }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-gray-100 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                  {social.name}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <p className="font-mono text-[10px] text-zinc-400 tracking-widest">
            2026 // JCI SYSTEMS
          </p>
        </div>
      </div>
    </section>
  );
}

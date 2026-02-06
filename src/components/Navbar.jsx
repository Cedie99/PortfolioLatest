import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  User,
  Mail,
  X,
  Send,
  CheckCircle2,
  Github,
  Linkedin
} from "lucide-react";
import emailjs from "@emailjs/browser";

// --- MESSAGE MODAL COMPONENT ---
const MessageModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    const SERVICE_ID = "service_pp2gv4q";
    const TEMPLATE_ID = "template_frqacre";
    const PUBLIC_KEY = "cKMFBGZjYTXdyzjd_";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          e.target.reset();
        }, 2500);
      }, (error) => {
        console.error("EmailJS Error:", error.text);
        setStatus("error");
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-950/50 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center text-center p-6"
                >
                  <motion.div
                    initial={{ rotate: -45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Message Received!</h3>
                  <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-[250px]">I'll get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Let's connect.</h2>
                <p className="text-zinc-500 text-sm mt-1">Send a message for collaborations.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
                <input
                  required
                  name="from_name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Email Address</label>
                <input
                  required
                  name="reply_to"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  rows={3}
                  placeholder="What's on your mind?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none text-sm"
                />
              </div>

              <motion.button
                disabled={status === "sending"}
                whileHover={{ scale: 1.01, backgroundColor: "#f4f4f5" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 sm:py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-xl sm:rounded-2xl mt-4 flex items-center justify-center gap-3 disabled:opacity-50 transition-colors"
              >
                {status === "sending" ? "Transmitting..." : "Send Message"}
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "education", "work", "behance", "achievements", "github", "cv"];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const navItems = [
    { name: "Work", href: "#work", sectionId: "work", icon: <Briefcase className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />, isExternal: false },
    { name: "About", href: "#about", sectionId: "about", icon: <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />, isExternal: false },
    {
      name: "GitHub",
      href: "https://github.com/Cedie99",
      icon: <Github className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
      isExternal: true
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jhon-cedrick-ignacio-127944326/",
      icon: <Linkedin className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
      isExternal: true
    },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div className="fixed bottom-6 sm:bottom-10 left-0 right-0 flex justify-center z-50 px-4">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto flex items-center gap-1 p-1.5 sm:p-2 bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-auto max-w-full"
        >
          {/* Logo Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full group transition-all shrink-0"
          >
             <svg viewBox="0 0 100 100" className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-none stroke-current" strokeWidth="14" strokeLinecap="round">
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} d="M75 30 C75 15, 25 15, 25 50 C25 85, 75 85, 75 70" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} d="M55 20 V65 C55 80, 40 80, 35 75" />
             </svg>
          </motion.button>

          <div className="h-6 w-[1px] bg-white/10 mx-1 shrink-0" />

          {/* Navigation Links */}
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = !item.isExternal && activeSection === item.sectionId;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  className={`relative p-2.5 sm:px-4 sm:py-3 rounded-full transition-all flex items-center gap-2 group shrink-0 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] hidden xl:block">
                    {item.name}
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-1 shrink-0" />

          {/* Contact Trigger with pulse ring */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-all border border-white/5 shrink-0"
          >
            <span className="absolute inset-0 rounded-full border-2 border-sky-400/40 animate-ping opacity-50" />
            <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px] relative z-10" />
          </motion.button>
        </motion.nav>
      </div>

      <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;

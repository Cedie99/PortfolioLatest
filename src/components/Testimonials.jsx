import { motion } from "framer-motion";
import { Quote, MessageSquare, Users } from "lucide-react";

const testimonials = [
  {
    name: "PSC10 Panel Judge",
    role: "Philippine Startup Challenge 10",
    content: "Budget Byahe demonstrates a strong understanding of real-world transportation problems. The technical execution with React and Laravel is impressive for a student-led project.",
    accent: "#f59e0b",
  },
  {
    name: "Capstone Adviser",
    role: "PUP Faculty",
    content: "Cedrick consistently delivers work that exceeds expectations. His ability to integrate AI tools into web applications shows a forward-thinking approach to development.",
    accent: "#38bdf8",
  },
  {
    name: "SmartBridge Mentor",
    role: "Salesforce Internship Program",
    content: "A dedicated learner who quickly grasped Apex and Lightning Web Components. His Agentblazer Champion achievement was well-deserved given his initiative throughout the program.",
    accent: "#10b981",
  },
  {
    name: "Team Collaborator",
    role: "Budget Byahe Project",
    content: "Working with Cedrick is always productive. He has a rare combination of strong backend thinking and an eye for clean, user-friendly interfaces.",
    accent: "#a78bfa",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="relative p-6 md:p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 backdrop-blur-sm group hover:border-white/10 transition-all duration-500 flex flex-col"
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${testimonial.accent}, transparent)` }}
      />

      {/* Quote icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-white/5"
        style={{ backgroundColor: `${testimonial.accent}10` }}
      >
        <Quote className="w-4 h-4" style={{ color: testimonial.accent }} />
      </div>

      {/* Content */}
      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 flex-1 font-medium italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white/80"
          style={{ backgroundColor: `${testimonial.accent}20` }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-white text-sm font-bold">{testimonial.name}</p>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${testimonial.accent}, transparent 70%)` }}
      />
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-black py-20 md:py-32 px-6 relative overflow-hidden" id="testimonials">
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Users className="w-3 h-3" />
            Testimonials
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            What People Say
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg font-medium">
            Feedback from mentors, judges, and collaborators I've worked with.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-2 text-zinc-600"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Want to share feedback? Use the contact form below.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import TextReveal from "./TextReveal";

const ease = [0.16, 1, 0.3, 1];

const OPERATIONS = [
  {
    company: "Elevora Technologies",
    role: "Junior Software Engineer",
    type: "Full-time",
    period: "Feb 2026 — Present",
    active: true,
    highlights: [
      "Building and shipping end-to-end SaaS product features across the full stack using a T3-inspired architecture (Next.js, tRPC, Prisma, TypeScript)",
      "Designing and maintaining relational data models in PostgreSQL, writing type-safe database queries through Prisma ORM",
      "Implementing event-driven background workflows with Inngest to handle async operations like notifications, syncs, and scheduled tasks",
      "Deploying and managing production services on Vercel's edge infrastructure with CI/CD pipelines for fast, reliable releases",
    ],
    tools: ["Next.js", "tRPC", "Prisma", "Inngest", "PostgreSQL", "Vercel", "TypeScript"],
  },
  {
    company: "SmartBridge",
    role: "Salesforce Developer Intern",
    type: "Remote",
    period: "Nov 2025 — Dec 2025",
    active: false,
    highlights: [
      "Built automated workflows using Salesforce Flows, reducing manual data entry errors",
      "Architected custom objects and validation rules to ensure high data integrity across the CRM ecosystem",
      "Built and tested automation using Process Builder/Flows to improve operational efficiency",
    ],
    tools: ["Salesforce", "Apex", "Flows", "Process Builder"],
  },
  {
    company: "Appliance Warehouse",
    role: "UI/UX Designer",
    type: "Freelance",
    period: "Nov 2025 — Dec 2025",
    active: false,
    link: "https://www.behance.net/johnceignacio",
    highlights: [
      "Redesigned e-commerce checkout flows, improving layout hierarchy and accessibility",
      "Enhanced conversion potential by optimizing CTA visibility and eliminating visual clutter",
      "Developed design system (typography & components) ensuring visual consistency across all pages",
      "Improved page layout consistency and readability across 100% of core pages",
    ],
    tools: ["Figma", "UI/UX", "Design Systems", "Usability Testing"],
  },
];

function OperationEntry({ operation, isOpen, onToggle, index }) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
      <button
        onClick={onToggle}
        className="w-full py-6 px-4 flex items-start justify-between gap-4 text-left group"
      >
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-gray-100 tracking-tight group-hover:text-sky-400 transition-colors">
              {operation.company}
            </h3>
            {operation.active && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-signal/20 bg-signal/5">
                <span className="w-1 h-1 rounded-full bg-signal signal-pulse" />
                <span className="font-mono text-[9px] font-bold text-signal tracking-wider">ACTIVE</span>
              </span>
            )}
          </div>
          <p className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-wider">
            {operation.role} <span className="text-zinc-300 dark:text-zinc-600">—</span> {operation.type}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 pt-1">
          <span className="font-mono text-[10px] text-zinc-400 tracking-wider hidden sm:block">
            {operation.period}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 md:pl-8 space-y-4">
              {/* Period on mobile */}
              <p className="font-mono text-[10px] text-zinc-400 tracking-wider sm:hidden">
                {operation.period}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                {operation.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 mt-2 shrink-0" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 pt-2">
                {operation.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Link */}
              {operation.link && (
                <a
                  href={operation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-[10px] font-bold text-sky-400/60 hover:text-sky-400 transition-colors tracking-widest uppercase"
                >
                  View Portfolio →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FieldOperations() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="operations" className="py-24 md:py-40 px-6 lg:pl-[80px] relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-sky-400/30" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                  // Field Operations
                </p>
              </div>
              <TextReveal className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100 mb-4">
                Work Experience
              </TextReveal>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                Professional deployments where engineering skills meet real-world environments.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
              className="pt-4 space-y-3"
            >
              {[
                { label: "TOTAL OPS", value: OPERATIONS.length.toString().padStart(2, "0") },
                { label: "ACTIVE", value: OPERATIONS.filter((o) => o.active).length.toString().padStart(2, "0") },
                { label: "STATUS", value: "DEPLOYED", signal: true },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 tracking-widest w-20">
                    {stat.label}
                  </span>
                  <span className={`font-mono text-xs font-bold ${stat.signal ? "text-signal" : "text-zinc-700 dark:text-gray-200"}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Accordion entries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease }}
            className="lg:col-span-3 border-t border-zinc-200 dark:border-zinc-700"
          >
            {OPERATIONS.map((op, i) => (
              <OperationEntry
                key={op.company}
                operation={op}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

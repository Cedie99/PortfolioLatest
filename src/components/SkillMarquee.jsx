const ALL_SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "tRPC", "Laravel", "Node.js", "Prisma", "PostgreSQL", "MySQL",
  "Vercel", "GCP", "Azure", "Git", "Figma", "OpenAI", "Claude AI",
  "Groq AI", "Inngest", "Firebase", "Salesforce",
];

function MarqueeRow({ skills, reverse = false, speed = "40s" }) {
  const items = [...skills, ...skills]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden group">
      <div
        className={`flex items-center gap-4 whitespace-nowrap w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400/60 dark:text-zinc-500/60">
              {skill}
            </span>
            <span className="text-sky-400/20 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillMarquee() {
  const row1 = ALL_SKILLS;
  const row2 = [...ALL_SKILLS].reverse();

  return (
    <div className="space-y-3 py-8">
      <MarqueeRow skills={row1} speed="50s" />
      <MarqueeRow skills={row2} reverse speed="60s" />
    </div>
  );
}

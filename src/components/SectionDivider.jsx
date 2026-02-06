export default function SectionDivider({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center py-4 ${className}`}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute w-1.5 h-1.5 rotate-45 bg-white/20 border border-white/10" />
    </div>
  );
}

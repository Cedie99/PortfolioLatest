import { useTilt } from "../hooks/useTilt";

export default function TiltCard({ children, className = "", maxTilt = 8 }) {
  const { ref, style, glowPos, handleMove, handleLeave } = useTilt({ maxTilt });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
      style={style}
    >
      {/* Light reflection overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(56,189,248,0.06) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

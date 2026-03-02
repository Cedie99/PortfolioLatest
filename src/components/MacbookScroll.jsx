import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * MacbookScroll — 3-phase hero landing.
 * Phase 1: Lid opens on scroll.
 * Phase 2: Zoom into the screen — keyboard fades, laptop scales up to fill viewport.
 * Phase 3: Screen dissolves, revealing actual portfolio content below.
 */
export function MacbookScroll({ title }) {
  const ref = useRef(null);
  const iframeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync dark mode from parent → iframe in real-time
  useEffect(() => {
    const syncTheme = () => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const isDark = document.documentElement.classList.contains("dark");
      doc.documentElement.classList.toggle("dark", isDark);
    };

    const iframe = iframeRef.current;
    if (iframe) iframe.addEventListener("load", syncTheme);

    // Watch parent <html> class changes
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      if (iframe) iframe.removeEventListener("load", syncTheme);
    };
  }, []);

  /* ── Phase 1 — Lid opens (scroll 0 → 0.3) ── */
  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* ── Phase 2 — Zoom into screen (scroll 0.35 → 0.7) ── */
  const zoomScale = useTransform(
    scrollYProgress,
    [0.35, 0.7],
    [1, isMobile ? 8 : 5]
  );
  // Shift upward so the screen (not laptop center) stays centered during zoom
  const zoomY = useTransform(scrollYProgress, [0.35, 0.7], [0, isMobile ? -200 : -160]);
  const baseOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);
  const screenGlow = useTransform(scrollYProgress, [0.4, 0.55], [0, 0.8]);

  /* ── Phase 3 — Dissolve into portfolio (scroll 0.7 → 0.85) ── */
  const macOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  return (
    <div ref={ref} style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Title */}
        <motion.h2
          style={{ translateY: titleY, opacity: titleOpacity }}
          className="absolute top-[12%] z-20 text-center font-mono text-3xl font-bold text-zinc-800 dark:text-white"
        >
          {title || (
            <span>
              <span className="text-sky-400">[</span> Flagship Project{" "}
              <span className="text-sky-400">]</span>
            </span>
          )}
        </motion.h2>

        {/* Responsive scale wrapper — keeps MacBook sized correctly per breakpoint */}
        <div className="scale-[0.35] sm:scale-[0.5] md:scale-100">
          {/* Zoom + fade animation wrapper */}
          <motion.div
            style={{ scale: zoomScale, y: zoomY, opacity: macOpacity }}
            className="flex flex-col items-center [perspective:800px]"
          >
            {/* ── Lid ── */}
            <div className="relative [perspective:800px]">
              {/* Back of closed lid */}
              <div
                style={{
                  transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                  transformOrigin: "bottom",
                  transformStyle: "preserve-3d",
                }}
                className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
              >
                <div
                  style={{
                    boxShadow:
                      "0px 2px 0px 2px var(--neutral-900, #171717) inset",
                  }}
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
                >
                  <span className="text-white">
                    <AcesLogo />
                  </span>
                </div>
              </div>

              {/* Screen — opens on scroll */}
              <motion.div
                style={{
                  scaleX,
                  scaleY,
                  rotateX: rotate,
                  transformStyle: "preserve-3d",
                  transformOrigin: "top",
                }}
                className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
              >
                <div className="absolute inset-0 rounded-lg bg-[#272729]" />
                {/* Live portfolio content inside the screen */}
                <iframe
                  ref={iframeRef}
                  src="/?embed=true"
                  title="Portfolio preview"
                  className="absolute inset-0 h-full w-full rounded-lg border-0"
                  style={{ pointerEvents: "none" }}
                />
                {/* Glow overlay that intensifies as we zoom in */}
                <motion.div
                  style={{ opacity: screenGlow }}
                  className="absolute inset-[3px] rounded-lg bg-gradient-to-br from-sky-400/30 via-emerald-400/10 to-violet-400/20"
                />
              </motion.div>
            </div>

            {/* ── Base / Keyboard ── */}
            <motion.div
              style={{ opacity: baseOpacity }}
              className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]"
            >
              <div className="relative h-10 w-full">
                <div className="absolute inset-x-0 mx-auto h-4 w-[80%]" />
              </div>
              <div className="relative flex">
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
                <div className="mx-auto h-full w-[80%]">
                  <Keypad />
                </div>
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
              </div>
              <Trackpad />
              <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ===== Sub-components (unchanged) ===== */

function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    />
  );
}

function Keypad() {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      {/* Function row */}
      <Row>
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          esc
        </KBtn>
        {Array.from({ length: 12 }, (_, i) => (
          <KBtn key={i}>
            <span className="text-[5px]">{`F${i + 1}`}</span>
          </KBtn>
        ))}
        <KBtn>
          <span className="text-[5px]">pwr</span>
        </KBtn>
      </Row>

      {/* Number row */}
      <Row>
        {["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map(
          (k) => (
            <KBtn key={k}>{k}</KBtn>
          )
        )}
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          del
        </KBtn>
      </Row>

      {/* QWERTY row */}
      <Row>
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          tab
        </KBtn>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"].map(
          (k) => (
            <KBtn key={k}>{k}</KBtn>
          )
        )}
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          \
        </KBtn>
      </Row>

      {/* Home row */}
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          caps
        </KBtn>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"].map(
          (k) => (
            <KBtn key={k}>{k}</KBtn>
          )
        )}
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          return
        </KBtn>
      </Row>

      {/* Shift row */}
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          shift
        </KBtn>
        {["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"].map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          shift
        </KBtn>
      </Row>

      {/* Bottom row */}
      <Row>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <span className="text-[5px] block">fn</span>
          <span className="text-[5px] block">🌐</span>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <span className="text-[5px] block">⌃</span>
          <span className="text-[5px] block">ctrl</span>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <OptionKey className="h-[6px] w-[6px]" />
          <span className="text-[5px] block">alt</span>
        </KBtn>
        <KBtn className="w-[2.5rem]" childrenClassName="h-full justify-between py-[4px]">
          <span className="text-[5px] block">⌘</span>
          <span className="text-[5px] block">cmd</span>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn className="w-[2.5rem]" childrenClassName="h-full justify-between py-[4px]">
          <span className="text-[5px] block">⌘</span>
          <span className="text-[5px] block">cmd</span>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <OptionKey className="h-[6px] w-[6px]" />
          <span className="text-[5px] block">alt</span>
        </KBtn>
        <KBtn className="w-[1.2rem] h-3 self-end mb-[2px]">
          <span className="text-[5px] block">◀</span>
        </KBtn>
        <div className="flex flex-col items-center justify-end">
          <KBtn className="w-[1.2rem] h-3 mb-[1px]">
            <span className="text-[5px] block">▲</span>
          </KBtn>
          <KBtn className="w-[1.2rem] h-3">
            <span className="text-[5px] block">▼</span>
          </KBtn>
        </div>
        <KBtn className="w-[1.2rem] h-3 self-end mb-[2px]">
          <span className="text-[5px] block">▶</span>
        </KBtn>
      </Row>
    </div>
  );
}

function KBtn({ className, children, childrenClassName, backlit }) {
  return (
    <div
      className={cn(
        "rounded-[4px] p-[0.5px]",
        "shadow-[0_0_0_0.5px_rgba(0,0,0,0.8),_0_1px_0_0_rgba(255,255,255,0.03)_inset,_0_-1px_0_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          childrenClassName
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function OptionKey({ className }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 14 14"
      className={cn("h-[6px] w-[6px] text-neutral-200", className)}
    >
      <path
        d="M1 1h3.5l4 10H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 1H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AcesLogo() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MacbookScroll;

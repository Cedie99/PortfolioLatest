import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import MissionNav from "./components/MissionNav";
import IdentityBrief from "./components/IdentityBrief";
import SystemsOverview from "./components/SystemsOverview";
import MissionLog from "./components/MissionLog";
import FieldOperations from "./components/FieldOperations";
import TrainingRecord from "./components/TrainingRecord";
import LiveTelemetry from "./components/LiveTelemetry";
import Signal from "./components/Signal";
import Chatbot from "./components/Chatbot";
import ScanLine from "./components/ScanLine";
import MouseSpotlight from "./components/MouseSpotlight";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax offsets for ambient orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <SmoothScroll>
      <main className="noise-overlay bg-deep min-h-screen relative selection:bg-sky-400/10 selection:text-zinc-900 dark:selection:text-zinc-100">
        {/* Fixed ambient background with parallax orbs */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="grid-bg absolute inset-0 opacity-50" />
          <motion.div
            className="ambient-glow w-[500px] h-[500px] bg-sky-500/[0.06] absolute top-[-10%] left-[-5%]"
            style={{ y: orbY1 }}
          />
          <motion.div
            className="ambient-glow w-[600px] h-[600px] bg-emerald-500/[0.04] absolute bottom-[-10%] right-[-10%]"
            style={{ y: orbY2 }}
          />
          <motion.div
            className="ambient-glow w-[400px] h-[400px] bg-violet-500/[0.04] absolute top-[40%] right-[-5%]"
            style={{ y: orbY3 }}
          />
        </div>

        <MouseSpotlight />
        <MissionNav onCommsOpen={() => setChatOpen(true)} />

        <div className="relative z-10">
          <IdentityBrief />

          <SystemsOverview />
          <ScanLine />
          <MissionLog />
          <ScanLine />
          <FieldOperations />
          <ScanLine />
          <TrainingRecord />
          <ScanLine />
          <LiveTelemetry />
          <ScanLine />
          <Signal />
        </div>

        <Chatbot externalOpen={chatOpen} onExternalClose={() => setChatOpen(false)} />
      </main>
    </SmoothScroll>
  );
}

export default App;

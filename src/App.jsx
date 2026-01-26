import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import BehanceSection from "./components/BehanceSection";
import AboutSection from "./components/AboutSection";
import DownloadCV from "./components/DownloadCV";
import SmoothScroll from "./components/SmoothScroll"; 

function App() {
  return (
    <SmoothScroll>
      <main className="bg-black min-h-screen relative selection:bg-white/10 selection:text-white">
        {/* Fixed Background Layer - Stays static while content glides */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 glow pointer-events-none" />
          <div className="absolute inset-0 dots-pattern opacity-20 pointer-events-none" />
          
          {/* Subtle Ambient Moving Light (Optional for that Phased feel) */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/10 blur-[120px] rounded-full animate-pulse" />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />
          
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <AboutSection />
          </section>


          <section id="skills">
            <Skills />
          </section>

          <section id="education">
            <Education />
          </section>

          <section id="work">
            <Projects />
          </section>

          <section id="behance">
            <BehanceSection />
          </section>

           <section id="achievements">
            <Achievements />
          </section>

          <section id="cv">
            <DownloadCV />
          </section>
          

          <footer className="py-20 text-center border-t border-white/5 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-zinc-500 text-xs tracking-widest uppercase">
                © 2026 Cedie | Systems & Designs.
              </p>
             
            </div>
          </footer>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
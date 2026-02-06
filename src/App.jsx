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
import ScrollProgress from "./components/ScrollProgress";
import SectionDivider from "./components/SectionDivider";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Testimonials from "./components/Testimonials";
import GitHubActivity from "./components/GitHubActivity";

function App() {
  return (
    <SmoothScroll>
      <main className="bg-black min-h-screen relative selection:bg-white/10 selection:text-white">
        <ScrollProgress />

        {/* Fixed Background Layer */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 glow pointer-events-none" />
          <div className="absolute inset-0 dots-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full float-slow pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full float-slow pointer-events-none" style={{ animationDelay: "-10s" }} />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />

          <section id="home">
            <Hero />
          </section>

          <SectionDivider />

          <section id="about">
            <AboutSection />
          </section>

          <SectionDivider />

          <section id="skills">
            <Skills />
          </section>

          <SectionDivider />

          <section id="education">
            <Education />
          </section>

          <SectionDivider />

          <section id="work">
            <Projects />
          </section>

          <SectionDivider />

          <section id="behance">
            <BehanceSection />
          </section>

          <SectionDivider />

          <section id="testimonials">
            <Testimonials />
          </section>

          <SectionDivider />

          <section id="achievements">
            <Achievements />
          </section>

          <SectionDivider />

          <section id="github">
            <GitHubActivity />
          </section>

          <SectionDivider />

          <section id="cv">
            <DownloadCV />
          </section>

          <Footer />
        </div>

        <Chatbot />
      </main>
    </SmoothScroll>
  );
}

export default App;

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CapabilityStrip } from "./components/CapabilityStrip";
import { ProcessSection } from "./components/ProcessSection";
import { ParallaxShowcase } from "./components/ParallaxShowcase";
import { WorkSpotlight } from "./components/WorkSpotlight";
import { MetricsSection } from "./components/MetricsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { getWorkById } from "./config/site.config";

export default function App() {
  const [activeWorkId, setActiveWorkId] = useState<string | null>(null);
  const activeWork = getWorkById(activeWorkId);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  return (
    <>
      <motion.div
        aria-hidden
        className="scroll-progress"
        style={{ scaleX: smoothProgress }}
      />

      <div ref={pageRef} className="page-shell">
        <Header />
        <main>
          <Hero />
          <CapabilityStrip />
          <ProcessSection />
          <ParallaxShowcase
            selectedId={activeWorkId}
            onSelectProject={setActiveWorkId}
          />
          <WorkSpotlight active={activeWork} />
          <MetricsSection />
          <CTASection />
        </main>
        <Footer />
      </div>

      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), #a78bfa);
          transform-origin: 0 50%;
          z-index: 200;
          opacity: 0.85;
          pointer-events: none;
        }
        .page-shell {
          min-height: 100vh;
          position: relative;
        }
      `}</style>
    </>
  );
}

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";

const panels = [
  {
    tag: "Atlas",
    title: "Telemetry console",
    tone: "linear-gradient(145deg, #1a2230, #0f141c)",
  },
  {
    tag: "Northwind",
    title: "Commerce rhythm",
    tone: "linear-gradient(145deg, #1c2520, #0e1210)",
  },
  {
    tag: "Helio",
    title: "Brand launch",
    tone: "linear-gradient(145deg, #241a28, #100c12)",
  },
];

export function ParallaxShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xBack = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const xMid = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const yFloat = useTransform(scrollYProgress, [0, 0.5, 1], ["-4%", "0%", "4%"]);

  return (
    <section ref={ref} id="work" className="showcase" aria-labelledby="work-heading">
      <div className="showcase-head">
        <Reveal direction="right">
          <p className="section-eyebrow">Selected work</p>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h2 id="work-heading" className="section-title">
            Layers that drift at different speeds.
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <p className="section-lede showcase-lede">
            Parallax rows below respond to scroll — backgrounds slide gently while cards stay
            readable. Original labels and palettes; no borrowed identities.
          </p>
        </Reveal>
      </div>

      <div className="showcase-stage">
        <motion.div
          className="showcase-bg showcase-bg--a"
          style={reduceMotion ? undefined : { x: xBack, y: yFloat }}
          aria-hidden
        />
        <motion.div
          className="showcase-bg showcase-bg--b"
          style={reduceMotion ? undefined : { x: xMid }}
          aria-hidden
        />

        <div className="showcase-rail">
          {panels.map((p, i) => (
            <Reveal key={p.tag} direction="up" delay={0.06 * i} amount={0.2}>
              <article
                className="showcase-card"
                style={{ background: p.tone }}
              >
                <span className="showcase-tag">{p.tag}</span>
                <h3 className="showcase-card-title">{p.title}</h3>
                <p className="showcase-card-meta">Case study · Motion &amp; UI</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .showcase {
          padding: 4rem 1.5rem 5rem;
          overflow: hidden;
        }
        .showcase-head {
          max-width: 640px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }
        .showcase-head .section-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent);
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .showcase-head .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 400;
          line-height: 1.15;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .showcase-lede {
          margin: 0 auto;
          color: var(--text-muted);
          line-height: 1.65;
          font-size: 1rem;
        }
        .showcase-stage {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 0;
        }
        .showcase-bg {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .showcase-bg--a {
          width: min(90%, 520px);
          height: 280px;
          left: 5%;
          top: 10%;
          background: radial-gradient(circle, rgba(110, 231, 197, 0.5), transparent 70%);
        }
        .showcase-bg--b {
          width: min(80%, 420px);
          height: 240px;
          right: 0;
          bottom: 5%;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.45), transparent 70%);
        }
        .showcase-rail {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .showcase-rail {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }
        .showcase-card {
          min-height: 200px;
          padding: 1.5rem;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .showcase-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(110, 231, 197, 0.35);
        }
        .showcase-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 0.75rem;
        }
        .showcase-card-title {
          margin: 0 0 0.35rem;
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .showcase-card-meta {
          margin: 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.55);
        }
      `}</style>
    </section>
  );
}

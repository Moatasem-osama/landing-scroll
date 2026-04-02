import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const rotateOrb = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const scaleGlow = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 1.12]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero-parallax hero-parallax--deep"
        style={reduceMotion ? undefined : { y: ySlow }}
        aria-hidden
      />
      <motion.div
        className="hero-parallax hero-parallax--grid"
        style={reduceMotion ? undefined : { y: yMid }}
        aria-hidden
      />
      <motion.div
        className="hero-orb-wrap"
        style={
          reduceMotion
            ? undefined
            : { y: yFast, rotate: rotateOrb, scale: scaleGlow }
        }
        aria-hidden
      >
        <div className="hero-orb" />
      </motion.div>

      <div className="hero-inner">
        <Reveal direction="right" delay={0.05}>
          <p className="hero-eyebrow">Studio for product &amp; brand</p>
        </Reveal>
        <Reveal direction="up" delay={0.12}>
          <h1 id="hero-title" className="hero-title">
            Calm motion.
            <span className="hero-title-accent"> Bold depth.</span>
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="hero-lede">
            We shape interfaces that breathe with scroll — layered parallax,
            crisp reveals, and motion that respects attention. Built for teams
            who care how every pixel arrives on screen.
          </p>
        </Reveal>
        <Reveal direction="left" delay={0.28}>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              View selected work
            </a>
            <a href="#process" className="btn btn-ghost">
              How we collaborate
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          padding: calc(var(--header-h) + 4rem) 1.5rem 5rem;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
        }
        .hero-parallax {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-parallax--deep {
          background:
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(110, 231, 197, 0.14), transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(167, 139, 250, 0.12), transparent 50%);
        }
        .hero-parallax--grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 75% 70% at 50% 40%, black 20%, transparent 75%);
          opacity: 0.55;
        }
        .hero-orb-wrap {
          position: absolute;
          right: -8%;
          top: 18%;
          width: min(52vw, 440px);
          aspect-ratio: 1;
          z-index: 1;
        }
        @media (max-width: 767px) {
          .hero-orb-wrap {
            right: -25%;
            top: 10%;
            width: 70vw;
            opacity: 0.65;
          }
        }
        .hero-orb {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from 200deg,
            rgba(110, 231, 197, 0.35),
            rgba(167, 139, 250, 0.45),
            rgba(110, 231, 197, 0.2),
            rgba(167, 139, 250, 0.35)
          );
          filter: blur(0px);
          box-shadow:
            inset 0 0 80px rgba(255, 255, 255, 0.08),
            0 40px 120px rgba(0, 0, 0, 0.45);
        }
        .hero-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--accent);
          margin: 0 0 1.25rem;
          font-weight: 600;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2.75rem, 6vw, 4.25rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 1.25rem;
        }
        .hero-title-accent {
          display: block;
          font-style: italic;
          color: var(--text-muted);
        }
        .hero-lede {
          margin: 0 0 2rem;
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 520px;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.35rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), #8bdaa8);
          color: var(--bg-deep);
          box-shadow: 0 12px 32px rgba(110, 231, 197, 0.22);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
        }
        .btn-ghost {
          border: 1px solid var(--line);
          color: var(--text);
          background: transparent;
        }
        .btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </section>
  );
}

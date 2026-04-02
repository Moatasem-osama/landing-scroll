import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section ref={ref} id="contact" className="cta" aria-labelledby="cta-heading">
      <motion.div
        className="cta-parallax"
        style={reduceMotion ? undefined : { y, rotate }}
        aria-hidden
      />
      <div className="cta-inner">
        <Reveal direction="up">
          <h2 id="cta-heading" className="cta-title">
            Let&apos;s build a scroll you&apos;re proud to demo.
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <p className="cta-copy">
            Share your timeline, audience, and ambitions — we&apos;ll reply with a concise plan
            for motion, structure, and implementation.
          </p>
        </Reveal>
        <Reveal direction="left" delay={0.18}>
          <div className="cta-row">
            <a href="mailto:hello@lumenaxis.studio" className="btn btn-primary cta-btn">
              hello@lumenaxis.studio
            </a>
            <span className="cta-note">Typically same-week response.</span>
          </div>
        </Reveal>
      </div>
      <style>{`
        .cta {
          position: relative;
          margin: 2rem 1.5rem 4rem;
          padding: 4rem 1.5rem;
          border-radius: calc(var(--radius) * 1.25);
          overflow: hidden;
          background: var(--bg-elevated);
          border: 1px solid var(--line);
        }
        .cta-parallax {
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(circle at 30% 40%, rgba(110, 231, 197, 0.12), transparent 45%),
            radial-gradient(circle at 70% 60%, rgba(167, 139, 250, 0.14), transparent 45%);
          pointer-events: none;
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 560px;
        }
        .cta-title {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .cta-copy {
          margin: 0 0 1.75rem;
          color: var(--text-muted);
          line-height: 1.65;
          font-size: 1rem;
        }
        .cta-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .cta-btn {
          text-decoration: none;
        }
        .cta-note {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.35rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), #8bdaa8);
          color: var(--bg-deep);
          box-shadow: 0 12px 32px rgba(110, 231, 197, 0.22);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

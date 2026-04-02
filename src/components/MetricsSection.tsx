import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stats = [
  { value: "24", suffix: "ms", label: "Interaction budget target" },
  { value: "60", suffix: "fps", label: "Smooth scroll on mid devices" },
  { value: "1×", suffix: "", label: "Reveal per element (no replay noise)" },
];

export function MetricsSection() {
  return (
    <section className="metrics" aria-label="Studio metrics">
      <div className="metrics-inner">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={0.07 * i}>
            <motion.div
              className="metric"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <p className="metric-value">
                {s.value}
                <span className="metric-suffix">{s.suffix}</span>
              </p>
              <p className="metric-label">{s.label}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <style>{`
        .metrics {
          padding: 2rem 1.5rem 4rem;
        }
        .metrics-inner {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .metrics-inner {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .metric {
          text-align: center;
          padding: 2rem 1rem;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
        }
        .metric-value {
          margin: 0 0 0.35rem;
          font-family: var(--font-serif);
          font-size: clamp(2.25rem, 4vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--accent);
        }
        .metric-suffix {
          font-size: 0.55em;
          color: var(--text-muted);
          margin-left: 0.1em;
        }
        .metric-label {
          margin: 0;
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}

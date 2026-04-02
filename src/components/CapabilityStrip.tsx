import { Reveal } from "./Reveal";

const items = [
  { title: "Product UI", detail: "Systems that scale with your narrative." },
  { title: "Motion design", detail: "Scroll choreography, not decoration." },
  { title: "Frontend craft", detail: "Sharp React builds, performance first." },
];

export function CapabilityStrip() {
  return (
    <section className="strip" aria-label="Capabilities">
      <div className="strip-inner">
        {items.map((item, i) => (
          <Reveal key={item.title} direction="up" delay={i * 0.08}>
            <article className="strip-card">
              <h2 className="strip-title">{item.title}</h2>
              <p className="strip-detail">{item.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <style>{`
        .strip {
          padding: 3rem 1.5rem 4rem;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: linear-gradient(180deg, transparent, var(--accent-dim) 50%, transparent);
        }
        .strip-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .strip-inner {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
        }
        .strip-card {
          height: 100%;
          padding: 1.5rem 1.35rem;
          border-radius: var(--radius);
          background: var(--bg-elevated);
          border: 1px solid var(--line);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .strip-card:hover {
          border-color: rgba(110, 231, 197, 0.25);
          transform: translateY(-3px);
        }
        .strip-title {
          margin: 0 0 0.5rem;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .strip-detail {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}

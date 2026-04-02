import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Frame the story",
    body: "We map journeys, constraints, and the moments that deserve motion.",
  },
  {
    n: "02",
    title: "Design in depth",
    body: "Layered layouts, typography rhythm, and parallax that supports reading.",
  },
  {
    n: "03",
    title: "Ship smoothly",
    body: "React implementation with careful handoff — motion that stays crisp on mobile.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="process" aria-labelledby="process-heading">
      <div className="process-inner">
        <div className="process-intro">
          <Reveal direction="right">
            <p className="section-eyebrow">Process</p>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <h2 id="process-heading" className="section-title">
              Intentional beats, measured pace.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="section-lede">
              Scroll is a timeline. We choreograph entrances once, honor reduced motion,
              and keep parallax subtle enough to stay immersive — never noisy.
            </p>
          </Reveal>
        </div>
        <ol className="process-steps">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={0.08 * i}
            >
              <li className="process-step">
                <span className="process-n">{s.n}</span>
                <div>
                  <h3 className="process-step-title">{s.title}</h3>
                  <p className="process-step-body">{s.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
      <style>{`
        .process {
          padding: 5rem 1.5rem;
        }
        .process-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .process-intro {
          margin-bottom: 3rem;
        }
        .section-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent);
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 400;
          line-height: 1.15;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .section-lede {
          margin: 0;
          max-width: 520px;
          color: var(--text-muted);
          line-height: 1.65;
          font-size: 1rem;
        }
        .process-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .process-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.25rem;
          padding: 1.5rem 1.35rem;
          border-radius: var(--radius);
          background: var(--bg-elevated);
          border: 1px solid var(--line);
          align-items: start;
        }
        .process-n {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent);
        }
        .process-step-title {
          margin: 0 0 0.35rem;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .process-step-body {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.92rem;
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}

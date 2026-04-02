import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Reveal direction="up" amount={0.4}>
          <p className="footer-brand">Lumen Axis</p>
        </Reveal>
        <Reveal direction="up" delay={0.06} amount={0.4}>
          <p className="footer-meta">
            © {new Date().getFullYear()} · Crafted as a scroll study — original layout &
            content.
          </p>
        </Reveal>
      </div>
      <style>{`
        .site-footer {
          padding: 2.5rem 1.5rem 3rem;
          border-top: 1px solid var(--line);
        }
        .site-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .site-footer-inner {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .footer-brand {
          margin: 0;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .footer-meta {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </footer>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const backdrop = useTransform(
    scrollY,
    [0, 72],
    ["rgba(10, 12, 16, 0)", "rgba(10, 12, 16, 0.82)"],
  );
  const borderOpacity = useTransform(scrollY, [0, 48], [0, 1]);
  const borderColor = useTransform(
    borderOpacity,
    (o) => `rgba(255, 255, 255, ${o * 0.08})`,
  );
  const blurPx = useTransform(scrollY, [0, 72], [0, 12]);
  const backdropFilter = useTransform(blurPx, (b) => `saturate(1.2) blur(${b}px)`);

  return (
    <motion.header
      className="site-header"
      style={{
        backgroundColor: backdrop,
        borderBottomColor: borderColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <div className="site-header-inner">
        <a href="#" className="logo-mark">
          <span className="logo-dot" aria-hidden />
          Lumen Axis
        </a>
        <nav className="site-nav" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="site-nav-link">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-cta">
          Start a project
        </a>
      </div>
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid transparent;
        }
        .site-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: var(--header-h);
        }
        .logo-mark {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          font-size: 1rem;
        }
        .logo-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), #a78bfa);
          box-shadow: 0 0 16px rgba(110, 231, 197, 0.45);
        }
        .site-nav {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .site-nav {
            display: flex;
          }
        }
        .site-nav-link {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .site-nav-link:hover {
          color: var(--text);
        }
        .header-cta {
          display: none;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          background: var(--text);
          color: var(--bg-deep);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @media (min-width: 768px) {
          .header-cta {
            display: inline-flex;
          }
        }
        .header-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </motion.header>
  );
}

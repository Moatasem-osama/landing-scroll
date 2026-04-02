import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import type { WorkProject } from "../config/site.config";
import { QUOTE_API_URL, parseQuotePayload } from "../config/site.config";

type ApiQuote = { quote: string; author: string } | null;

type Props = {
  active: WorkProject | undefined;
};

export function WorkSpotlight({ active }: Props) {
  const [quote, setQuote] = useState<ApiQuote>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuote(null);
    setError(null);
  }, [active?.id]);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(QUOTE_API_URL);
      if (!res.ok) throw new Error(String(res.status));
      const parsed = parseQuotePayload(await res.json());
      if (!parsed) throw new Error("empty");
      setQuote(parsed);
    } catch {
      setError("تعذر جلب البيانات. تحقق من الاتصال أو حاول لاحقًا.");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const embedSrc = active
    ? `https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0&modestbranding=1`
    : "";

  return (
    <section
      id="work-spotlight"
      className="spotlight"
      aria-labelledby="spotlight-heading"
      tabIndex={-1}
    >
      <div className="spotlight-inner">
        <Reveal direction="right">
          <p className="section-eyebrow">Spotlight</p>
        </Reveal>
        <Reveal direction="up" delay={0.06}>
          <h2 id="spotlight-heading" className="section-title">
            تفاصيل المشروع والفيديو
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <p className="section-lede spotlight-lede">
            اختر كارتًا من القسم أعلاه للانتقال إلى هنا — يتغيّر الفيديو والنص حسب المشروع.
            غيّر الفيديوهات والنصوص من ملف واحد:{" "}
            <code className="spotlight-code">src/config/site.config.ts</code> ثم ارفع على GitHub.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              className="spotlight-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="spotlight-meta">
                <span className="spotlight-tag">{active.tag}</span>
                <h3 className="spotlight-project-title">{active.title}</h3>
                <p className="spotlight-blurb">{active.blurb}</p>
              </div>

              <div className="spotlight-video-wrap">
                <iframe
                  className="spotlight-iframe"
                  title={`YouTube: ${active.title}`}
                  src={embedSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="spotlight-api">
                <p className="spotlight-api-label">تجربة API (طلب حقيقي)</p>
                <button
                  type="button"
                  className="spotlight-api-btn"
                  onClick={fetchQuote}
                  disabled={loading}
                >
                  {loading ? "جاري الجلب…" : "جلب اقتباس عشوائي (DummyJSON)"}
                </button>
                {error && <p className="spotlight-api-error" role="alert">{error}</p>}
                {quote && (
                  <blockquote className="spotlight-quote">
                    <p>&ldquo;{quote.quote}&rdquo;</p>
                    <footer>— {quote.author}</footer>
                  </blockquote>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="spotlight-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              لم يُختر مشروع بعد — اضغط على أحد الكروت في &ldquo;Selected work&rdquo;.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .spotlight {
          scroll-margin-top: calc(var(--header-h) + 1rem);
          padding: 2rem 1.5rem 4rem;
          border-top: 1px solid var(--line);
          background: linear-gradient(180deg, transparent, rgba(110, 231, 197, 0.04) 40%, transparent);
        }
        .spotlight-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .spotlight .section-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent);
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .spotlight .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3.5vw, 2.35rem);
          font-weight: 400;
          line-height: 1.15;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
        }
        .spotlight-lede {
          margin: 0 0 2rem;
          color: var(--text-muted);
          line-height: 1.65;
          font-size: 0.95rem;
        }
        .spotlight-code {
          font-size: 0.82em;
          padding: 0.12em 0.35em;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          font-family: ui-monospace, monospace;
        }
        .spotlight-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .spotlight-meta {
          text-align: left;
        }
        .spotlight-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .spotlight-project-title {
          margin: 0.35rem 0 0.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .spotlight-blurb {
          margin: 0;
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .spotlight-video-wrap {
          position: relative;
          width: 100%;
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--line);
          aspect-ratio: 16 / 9;
          background: #000;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
        }
        .spotlight-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .spotlight-api {
          padding: 1.25rem 1.35rem;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: var(--bg-elevated);
        }
        .spotlight-api-label {
          margin: 0 0 0.65rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
        }
        .spotlight-api-btn {
          padding: 0.6rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(110, 231, 197, 0.45);
          background: rgba(110, 231, 197, 0.12);
          color: var(--text);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .spotlight-api-btn:hover:not(:disabled) {
          background: rgba(110, 231, 197, 0.22);
          transform: translateY(-1px);
        }
        .spotlight-api-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .spotlight-api-error {
          margin: 0.75rem 0 0;
          font-size: 0.88rem;
          color: #f87171;
        }
        .spotlight-quote {
          margin: 1rem 0 0;
          padding: 0.75rem 0 0;
          border-top: 1px solid var(--line);
          font-style: italic;
          color: var(--text-muted);
        }
        .spotlight-quote p {
          margin: 0 0 0.35rem;
          font-size: 0.95rem;
          line-height: 1.55;
        }
        .spotlight-quote footer {
          font-size: 0.85rem;
          font-style: normal;
          color: var(--accent);
        }
        .spotlight-empty {
          margin: 0;
          padding: 2rem 1rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
          border: 1px dashed var(--line);
          border-radius: var(--radius);
        }
      `}</style>
    </section>
  );
}

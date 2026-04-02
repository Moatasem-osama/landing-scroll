/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ملف الإعداد الوحيد — عدّل هنا فقط ثم ارفع على GitHub
 *  Netlify / GitHub Pages يعيدان البناء تلقائياً بعد كل push على الفرع الرئيسي
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  فيديو يوتيوب: من الرابط youtube.com/watch?v=المعرّف  انسخ المعرّف فقط (مثلاً M7lc1UVf-VE)
 *
 *  API الاقتباس (اختياري بدون تعديل الكود):
 *  - أنشئ ملف .env في جذر المشروع:
 *      VITE_QUOTE_API_URL=https://dummyjson.com/quotes/random
 *  - على Netlify: Site configuration → Environment variables → أضف نفس المفتاح
 */

/** عنوان طلب الاقتباس العشوائي (يمكن تجاوزه بـ VITE_QUOTE_API_URL) */
export const QUOTE_API_URL =
  (import.meta.env.VITE_QUOTE_API_URL as string | undefined)?.trim() ||
  "https://dummyjson.com/quotes/random";

export type WorkProject = {
  id: string;
  tag: string;
  title: string;
  tone: string;
  youtubeId: string;
  blurb: string;
};

/**
 * الكروت + الفيديوهات + النصوص — أضف أو احذف عناصر من المصفوفة كما تحب
 * (لو غيّرت العدد، الشبكة تتكيف تلقائياً على الشاشات الصغيرة)
 */
export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "atlas",
    tag: "Atlas",
    title: "Telemetry console",
    tone: "linear-gradient(145deg, #1a2230, #0f141c)",
    youtubeId: "M7lc1UVf-VE",
    blurb:
      "لوحة مراقبة حية: تدفق البيانات، تنبيهات، وطبقات UI تتحرك مع السياق. استبدل youtubeId أعلاه بفيديوك.",
  },
  {
    id: "northwind",
    tag: "Northwind",
    title: "Commerce rhythm",
    tone: "linear-gradient(145deg, #1c2520, #0e1210)",
    youtubeId: "aqz-KE-bpKQ",
    blurb:
      "تجربة تسوق سلسة: جداول، فلاتر، وحركة خفيفة. زر «جلب اقتباس» يستدعي API من QUOTE_API_URL.",
  },
  {
    id: "helio",
    tag: "Helio",
    title: "Brand launch",
    tone: "linear-gradient(145deg, #241a28, #100c12)",
    youtubeId: "LXb3EKWsInQ",
    blurb:
      "هوية بصرية وهبوط واحد: فيديو تعريفي، قصة قصيرة، ودعوة واضحة للتحويل.",
  },
];

export function getWorkById(id: string | null): WorkProject | undefined {
  if (!id) return undefined;
  return WORK_PROJECTS.find((p) => p.id === id);
}

/**
 * تحويل ردّ الـ API إلى نص عرض — يدعم شكل DummyJSON و Advice Slip.
 * لو استخدمت API بشكل مختلف، عدّل هذه الدالة في نفس الملف فقط.
 */
export function parseQuotePayload(data: unknown): { quote: string; author: string } | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;

  if (typeof o.quote === "string") {
    return {
      quote: o.quote,
      author: typeof o.author === "string" ? o.author : "—",
    };
  }

  const slip = o.slip;
  if (slip && typeof slip === "object") {
    const s = slip as Record<string, unknown>;
    if (typeof s.advice === "string") {
      return { quote: s.advice, author: "Advice Slip" };
    }
  }

  return null;
}

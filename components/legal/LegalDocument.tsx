import { SUPPORT_EMAIL } from '@/lib/constants';

export interface LegalSection {
  heading: string;
  body: string;
}

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Renders a legal document (privacy / terms). Body text may contain newlines
 * and simple "• " bullet lines, which are split into paragraphs / list items.
 * Bare emails and URLs are linkified.
 */
function renderBody(body: string) {
  const blocks = body.split('\n').filter((l) => l.trim().length > 0);
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (bullets.length) {
      out.push(
        <ul key={key} className="list-disc pl-5 space-y-1.5 my-2">
          {bullets.map((b, i) => (
            <li key={i}>{linkify(b.replace(/^•\s*/, ''))}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };

  blocks.forEach((line, i) => {
    if (line.trim().startsWith('•')) {
      bullets.push(line);
    } else {
      flush(`ul-${i}`);
      out.push(
        <p key={`p-${i}`} className="my-2">
          {linkify(line)}
        </p>,
      );
    }
  });
  flush('ul-end');
  return out;
}

function linkify(text: string): React.ReactNode {
  const parts = text.split(/(\S+@\S+\.\S+|https?:\/\/\S+)/g);
  return parts.map((part, i) => {
    if (/^\S+@\S+\.\S+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-[var(--color-primary)] hover:underline">
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline break-words"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <main className="pt-20 pb-20">
      <div className="bg-white border-b border-[var(--color-gray-100)]">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-2">
            {title}
          </h1>
          <p className="text-sm text-[var(--color-gray-400)]">Last updated: {updated}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 md:px-8 py-10 text-[var(--color-gray-600)] leading-relaxed">
        <p className="text-base text-[var(--color-gray-800)] mb-8">{intro}</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-[var(--color-gray-900)] mb-2">{s.heading}</h2>
              <div className="text-[15px]">{renderBody(s.body)}</div>
            </section>
          ))}
        </div>

        <p className="mt-12 pt-6 border-t border-[var(--color-gray-100)] text-sm text-[var(--color-gray-400)]">
          Questions about this document? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[var(--color-primary)] hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </article>
    </main>
  );
}

export default LegalDocument;

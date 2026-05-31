import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ExternalLink, BookOpen } from 'lucide-react';
import { UNIVERSITIES, getUniversity } from '@/data/cutoffs';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return UNIVERSITIES.map(u => ({ university: u.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ university: string }>;
}): Promise<Metadata> {
  const { university: id } = await params;
  const uni = getUniversity(id);
  if (!uni) return {};

  return {
    title: `${uni.shortName} Cut-Off Mark 2025/2026 — ${uni.name} | PassVerse`,
    description: `${uni.name} (${uni.shortName}) JAMB cut-off mark for 2025/2026 is ${uni.generalCutoff}. View departmental cut-offs for all courses including Medicine, Law, Engineering and more.`,
    keywords: [
      `${uni.shortName} cut-off mark`,
      `${uni.shortName} JAMB score`,
      `${uni.name} admission requirements 2025`,
    ],
    alternates: {
      canonical: `https://passverse.com.ng/cut-off/${uni.id}`,
    },
    openGraph: {
      title: `${uni.shortName} Cut-Off Mark 2025/2026 | PassVerse`,
      description: `${uni.name} JAMB cut-off mark for 2025/2026 is ${uni.generalCutoff}. Departmental cut-offs included.`,
      url: `https://passverse.com.ng/cut-off/${uni.id}`,
      type: 'website',
    },
  };
}

function cutoffDot(score: number) {
  if (score >= 250) return <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" aria-label="Very high" />;
  if (score >= 200) return <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" aria-label="Competitive" />;
  return <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0" aria-label="Moderate" />;
}

function generalCutoffColor(score: number) {
  if (score >= 200) return 'text-[#4169E1]';
  if (score >= 170) return 'text-[#f5a623]';
  return 'text-[#1D9E75]';
}

function typeBadge(type: string) {
  const map: Record<string, string> = {
    federal: 'bg-blue-900/40 text-blue-300 border border-blue-700/40',
    state:   'bg-amber-900/40 text-amber-300 border border-amber-700/40',
    private: 'bg-teal-900/40 text-teal-300 border border-teal-700/40',
  };
  return map[type] ?? '';
}

function buildAdvice(generalCutoff: number, maxDept: number): { range: string; advice: string }[] {
  const items: { range: string; advice: string }[] = [];

  if (generalCutoff <= 160) {
    items.push({
      range: `${generalCutoff}–${generalCutoff + 19}`,
      advice: 'You meet the minimum cut-off. Focus on a strong Post-UTME performance to secure admission.',
    });
  }

  items.push({
    range: `${Math.max(generalCutoff, 170)}–199`,
    advice: 'Competitive for many programmes. A strong Post-UTME score will make a big difference.',
  });

  items.push({
    range: '200–249',
    advice: 'You qualify for most programmes. High-demand courses like Engineering and Accounting are within reach.',
  });

  if (maxDept >= 250) {
    items.push({
      range: '250+',
      advice: 'Excellent score. You are competitive for the most sought-after courses including Medicine, Law and Pharmacy.',
    });
  }

  return items;
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const { university: id } = await params;
  const uni = getUniversity(id);
  if (!uni) notFound();

  const hasDepts = uni.departments.length > 0;
  const maxDept = hasDepts ? Math.max(...uni.departments.map(d => d.cutoff)) : uni.generalCutoff;
  const adviceItems = buildAdvice(uni.generalCutoff, maxDept);

  const typeLabel = uni.type === 'federal' ? 'Federal University' : uni.type === 'state' ? 'State University' : 'Private University';

  return (
    <main className="min-h-screen bg-[#1a1a2e] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">

        {/* Back link */}
        <Link
          href="/cut-off"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to all universities
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', typeBadge(uni.type))}>
              {typeLabel}
            </span>
            <span className="text-xs text-slate-500">{uni.state} State · {uni.session}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            🎓 {uni.shortName} Cut-Off Mark 2025/2026
          </h1>
          <p className="text-slate-300">{uni.name} · {uni.state} State · {typeLabel}</p>
        </div>

        {/* General cut-off card */}
        <div className="rounded-2xl border border-[#1e3a5f] bg-[#16213e] p-8 mb-6 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-2">
            General JAMB Cut-Off
          </p>
          <p className={cn('text-7xl font-black tabular-nums mb-2', generalCutoffColor(uni.generalCutoff))}>
            {uni.generalCutoff}
          </p>
          <p className="text-slate-400 text-sm mb-4">{uni.session} Session</p>
          {uni.postUtmeRequired && (
            <div className="inline-flex items-center gap-2 text-sm font-medium text-teal-400 bg-teal-900/30 border border-teal-700/40 rounded-full px-4 py-1.5">
              <CheckCircle size={14} />
              Post-UTME Required
            </div>
          )}
        </div>

        {/* Note */}
        {uni.note && (
          <div className="rounded-xl border border-amber-700/40 bg-amber-900/20 p-4 mb-8 flex gap-3">
            <span className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true">⚠️</span>
            <p className="text-amber-200 text-sm leading-relaxed">{uni.note}</p>
          </div>
        )}

        {/* Departmental table */}
        {hasDepts && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-5">Departmental Cut-Off Marks</h2>
            <div className="rounded-xl border border-[#1e3a5f] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#16213e] border-b border-[#1e3a5f]">
                    <th className="text-left px-5 py-3.5 text-slate-400 font-semibold">Course</th>
                    <th className="text-left px-5 py-3.5 text-slate-400 font-semibold hidden sm:table-cell">Faculty</th>
                    <th className="text-right px-5 py-3.5 text-slate-400 font-semibold">Cut-Off</th>
                  </tr>
                </thead>
                <tbody>
                  {uni.departments.map((dept, i) => (
                    <tr
                      key={dept.course}
                      className={cn(
                        'border-b border-[#1e3a5f] last:border-0 transition-colors',
                        i % 2 === 0 ? 'bg-[#1a1a2e]' : 'bg-[#16213e]/60',
                      )}
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-white">{dept.course}</p>
                        {dept.note && <p className="text-xs text-slate-500 mt-0.5">{dept.note}</p>}
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden sm:table-cell">{dept.faculty}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <span className="font-bold text-white tabular-nums">{dept.cutoff}</span>
                          {cutoffDot(dept.cutoff)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> ≥ 250 Very high
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> 200–249 Competitive
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" /> &lt; 200 Moderate
              </span>
            </div>
          </section>
        )}

        {/* What this means for you */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5">What This Means For You</h2>
          <div className="space-y-3">
            {adviceItems.map(item => (
              <div
                key={item.range}
                className="flex gap-4 rounded-xl border border-[#1e3a5f] bg-[#16213e] p-4"
              >
                <div className="shrink-0 bg-[#1e3a5f] rounded-lg px-3 py-1.5 text-center min-w-[80px]">
                  <p className="text-xs text-slate-400 font-semibold">Score</p>
                  <p className="text-sm font-bold text-[#4169E1] tabular-nums">{item.range}</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed self-center">{item.advice}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/practice"
            className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-[#4169E1] hover:bg-[#3457C8] text-white font-semibold px-6 py-4 transition-colors"
          >
            <BookOpen size={18} />
            Practice JAMB Questions
          </Link>
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 rounded-xl border border-[#1e3a5f] bg-[#16213e] hover:border-[#4169E1] text-slate-200 hover:text-white font-semibold px-6 py-4 transition-all"
          >
            <ExternalLink size={18} />
            Visit {uni.shortName} Website
          </a>
        </div>
      </div>
    </main>
  );
}

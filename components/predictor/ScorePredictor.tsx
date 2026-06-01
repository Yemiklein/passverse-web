'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, ArrowLeft, Share2, BookOpen, Smartphone } from 'lucide-react';
import { UNIVERSITIES, type University } from '@/data/cutoffs';
import { cn } from '@/lib/utils';

// ── Subject list ──────────────────────────────────────────────────────────────

const SUBJECTS = [
  { value: 'english',       label: 'English Language',            compulsory: true },
  { value: 'mathematics',   label: 'Mathematics' },
  { value: 'biology',       label: 'Biology' },
  { value: 'physics',       label: 'Physics' },
  { value: 'chemistry',     label: 'Chemistry' },
  { value: 'commerce',      label: 'Commerce' },
  { value: 'accounting',    label: 'Accounting' },
  { value: 'economics',     label: 'Economics' },
  { value: 'government',    label: 'Government' },
  { value: 'geography',     label: 'Geography' },
  { value: 'literature',    label: 'Literature in English' },
  { value: 'crk',           label: 'Christian Religious Knowledge' },
  { value: 'irk',           label: 'Islamic Religious Knowledge' },
  { value: 'history',       label: 'History' },
  { value: 'civiledu',      label: 'Civic Education' },
  { value: 'currentaffairs', label: 'Current Affairs' },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface SubjectEntry {
  subject: string;
  score: string;
}

interface PredictionResult {
  predicted: number;
  lower: number;
  upper: number;
  rating: Rating;
  subjects: { label: string; score: number }[];
  universities: University[];
}

// ── Rating logic ──────────────────────────────────────────────────────────────

interface Rating {
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
}

function getRating(score: number): Rating {
  if (score >= 300) return { label: 'Excellent',          emoji: '🏆', color: 'text-[#4169E1]', borderColor: 'border-[#4169E1]' };
  if (score >= 250) return { label: 'Very Good',          emoji: '🌟', color: 'text-[#1D9E75]', borderColor: 'border-[#1D9E75]' };
  if (score >= 200) return { label: 'Good',               emoji: '👍', color: 'text-[#f5a623]', borderColor: 'border-[#f5a623]' };
  if (score >= 150) return { label: 'Fair',               emoji: '⚠️', color: 'text-[#f59e0b]', borderColor: 'border-[#f59e0b]' };
  return               { label: 'Needs Improvement',   emoji: '📚', color: 'text-[#e94560]', borderColor: 'border-[#e94560]' };
}

// ── Score bar colour ──────────────────────────────────────────────────────────

function barColor(pct: number): string {
  if (pct < 40) return 'bg-[#e94560]';
  if (pct < 60) return 'bg-[#f5a623]';
  return 'bg-[#1D9E75]';
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1500): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return value;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="mt-1.5 h-1.5 rounded-full bg-[#0f3460] overflow-hidden">
      <motion.div
        className={cn('h-full rounded-full', barColor(score))}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

function SubjectRow({
  index,
  entry,
  usedSubjects,
  onChange,
}: {
  index: number;
  entry: SubjectEntry;
  usedSubjects: Set<string>;
  onChange: (field: 'subject' | 'score', value: string) => void;
}) {
  const isLocked = index === 0;
  const scoreNum = parseInt(entry.score, 10);
  const validScore = !isNaN(scoreNum) && scoreNum >= 0 && scoreNum <= 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 w-16 shrink-0">Subject {index + 1}</span>

        {/* Subject select */}
        <div className="relative flex-1">
          <select
            value={entry.subject}
            onChange={e => onChange('subject', e.target.value)}
            disabled={isLocked}
            className={cn(
              'w-full appearance-none rounded-lg px-3 py-2.5 text-sm text-white pr-8',
              'bg-[#0f3460] border border-[#1e3a5f] focus:outline-none focus:border-[#4169E1] transition-colors',
              isLocked && 'opacity-70 cursor-not-allowed',
            )}
          >
            {SUBJECTS.map(s => (
              <option
                key={s.value}
                value={s.value}
                disabled={s.value !== entry.subject && usedSubjects.has(s.value)}
              >
                {s.label}{s.compulsory ? ' (compulsory)' : ''}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
        </div>

        {/* Score input */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="number"
            min={0}
            max={100}
            value={entry.score}
            onChange={e => onChange('score', e.target.value)}
            placeholder="0"
            className={cn(
              'w-16 rounded-lg px-2 py-2.5 text-sm text-right font-mono text-white',
              'bg-[#0f3460] border border-[#1e3a5f] focus:outline-none focus:border-[#4169E1] transition-colors',
              entry.score && !validScore && 'border-[#e94560]',
            )}
          />
          <span className="text-xs text-slate-500">/100</span>
        </div>
      </div>

      {/* Progress bar */}
      {validScore && <ScoreBar score={scoreNum} />}
    </div>
  );
}

// ── University grouped result ─────────────────────────────────────────────────

function UniversityGroup({
  label,
  universities,
  predicted,
}: {
  label: string;
  universities: University[];
  predicted: number;
}) {
  if (universities.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className="flex-1 h-px bg-[#1e3a5f]" />
        {label}
        <span className="flex-1 h-px bg-[#1e3a5f]" />
      </h4>
      <div className="space-y-1.5">
        {universities.map(u => {
          const isHighlighted = predicted >= 200 && u.generalCutoff >= 200;
          return (
            <div
              key={u.id}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm',
                isHighlighted
                  ? 'bg-[#1e3a5f]/60 border-[#4169E1]/40'
                  : 'bg-[#16213e] border-[#1e3a5f]',
              )}
            >
              <CheckCircle size={14} className="text-[#1D9E75] shrink-0" />
              <span className="font-semibold text-white flex-1">{u.shortName}</span>
              <span className="text-slate-400 text-xs">{u.name.length > 28 ? u.name.slice(0, 28) + '…' : u.name}</span>
              <span className="text-slate-400 text-xs tabular-nums ml-auto">Cut-off: {u.generalCutoff}</span>
              <Link
                href={`/cut-off/${u.id}`}
                className="text-[#4169E1] hover:underline text-xs shrink-0 ml-2"
              >
                View →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const INITIAL_ENTRIES: SubjectEntry[] = [
  { subject: 'english',     score: '' },
  { subject: 'mathematics', score: '' },
  { subject: 'biology',     score: '' },
  { subject: 'chemistry',   score: '' },
];

export function ScorePredictor() {
  const [entries, setEntries]     = useState<SubjectEntry[]>(INITIAL_ENTRIES);
  const [phase, setPhase]         = useState<'input' | 'loading' | 'result'>('input');
  const [result, setResult]       = useState<PredictionResult | null>(null);
  const [toast, setToast]         = useState<string | null>(null);
  const [howOpen, setHowOpen]     = useState(false);

  // Derived
  const usedSubjects = new Set(entries.map(e => e.subject));
  const allFilled = entries.every(e => {
    const n = parseInt(e.score, 10);
    return !isNaN(n) && n >= 0 && n <= 100;
  });

  function updateEntry(index: number, field: 'subject' | 'score', value: string) {
    setEntries(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
  }

  function predict() {
    if (!allFilled) return;
    setPhase('loading');

    setTimeout(() => {
      const scores = entries.map(e => parseInt(e.score, 10));
      const predicted = scores.reduce((a, b) => a + b, 0);
      const lower = Math.round(predicted * 0.9);
      const upper = Math.min(Math.round(predicted * 1.1), 400);

      const matched = UNIVERSITIES
        .filter(u => u.generalCutoff <= predicted)
        .sort((a, b) => b.generalCutoff - a.generalCutoff)
        .slice(0, 10);

      setResult({
        predicted,
        lower,
        upper,
        rating: getRating(predicted),
        subjects: entries.map((e, i) => ({
          label: SUBJECTS.find(s => s.value === e.subject)?.label ?? e.subject,
          score: scores[i],
        })),
        universities: matched,
      });
      setPhase('result');
    }, 800);
  }

  async function share() {
    if (!result) return;
    const text = `I scored ${result.predicted}/400 on PassVerse JAMB Score Predictor! ${result.rating.emoji}\nThat puts me in the ${result.rating.label} range.\nTry it yourself: passverse.com.ng/score-predictor`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ text }); return; } catch { /* fell through */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied to clipboard!');
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast('Copy failed');
      setTimeout(() => setToast(null), 2000);
    }
  }

  const federalUnis  = result?.universities.filter(u => u.type === 'federal')  ?? [];
  const stateUnis    = result?.universities.filter(u => u.type === 'state')    ?? [];
  const privateUnis  = result?.universities.filter(u => u.type === 'private')  ?? [];

  // Next tier gap
  const nextTier = result
    ? UNIVERSITIES
        .filter(u => u.generalCutoff > result.predicted)
        .sort((a, b) => a.generalCutoff - b.generalCutoff)[0]
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1D9E75] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ── Phase: Input ── */}
        {(phase === 'input' || phase === 'loading') && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* How it works accordion */}
            <div className="mb-6 rounded-xl border border-[#1e3a5f] bg-[#16213e] overflow-hidden">
              <button
                onClick={() => setHowOpen(v => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
              >
                <span>How does the predictor work?</span>
                <ChevronDown
                  size={16}
                  className={cn('text-slate-400 transition-transform duration-200', howOpen && 'rotate-180')}
                />
              </button>
              <AnimatePresence>
                {howOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 grid grid-cols-3 gap-4 text-center">
                      {[
                        { icon: '📝', step: '1. Enter Scores', desc: 'Input your practice percentage for each subject' },
                        { icon: '🔮', step: '2. Get Prediction', desc: 'We calculate your estimated JAMB total ±10% variance' },
                        { icon: '🎓', step: '3. See Universities', desc: 'Discover which universities you qualify for' },
                      ].map(item => (
                        <div key={item.step} className="space-y-1.5">
                          <p className="text-2xl">{item.icon}</p>
                          <p className="text-xs font-semibold text-white">{item.step}</p>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input card */}
            <div className="rounded-2xl border border-[#1e3a5f] bg-[#16213e] p-6 md:p-8">
              <p className="text-sm text-slate-400 mb-6">
                Select your 4 JAMB subjects and enter your practice score (0–100) for each:
              </p>

              <div className="space-y-5">
                {entries.map((entry, i) => (
                  <SubjectRow
                    key={i}
                    index={i}
                    entry={entry}
                    usedSubjects={usedSubjects}
                    onChange={(field, value) => updateEntry(i, field, value)}
                  />
                ))}
              </div>

              <p className="mt-5 text-xs text-slate-500 italic">
                Note: English Language is compulsory for all JAMB UTME candidates.
              </p>

              <button
                onClick={predict}
                disabled={!allFilled || phase === 'loading'}
                className={cn(
                  'mt-6 w-full rounded-xl py-4 font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2',
                  allFilled && phase !== 'loading'
                    ? 'bg-[#4169E1] hover:bg-[#3457C8] cursor-pointer shadow-lg hover:shadow-[#4169E1]/30'
                    : 'bg-[#1e3a5f] cursor-not-allowed text-slate-500',
                )}
              >
                {phase === 'loading' ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Predicting...
                  </>
                ) : (
                  '🔮 Predict My Score →'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Phase: Results ── */}
        {phase === 'result' && result && (
          <ResultView
            result={result}
            federalUnis={federalUnis}
            stateUnis={stateUnis}
            privateUnis={privateUnis}
            nextTier={nextTier}
            onEdit={() => { setPhase('input'); setResult(null); }}
            onShare={share}
          />
        )}

      </AnimatePresence>
    </div>
  );
}

// ── Result view (separate to keep ScorePredictor readable) ────────────────────

function ResultView({
  result,
  federalUnis,
  stateUnis,
  privateUnis,
  nextTier,
  onEdit,
  onShare,
}: {
  result: PredictionResult;
  federalUnis: University[];
  stateUnis: University[];
  privateUnis: University[];
  nextTier: University | null;
  onEdit: () => void;
  onShare: () => void;
}) {
  const displayed = useCountUp(result.predicted, 1500);
  const hasAny = federalUnis.length + stateUnis.length + privateUnis.length > 0;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Back + share row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Edit Scores
        </button>
        <button
          onClick={onShare}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4169E1] hover:text-white transition-colors"
        >
          <Share2 size={14} />
          Share My Result
        </button>
      </div>

      {/* Score card */}
      <div className={cn(
        'rounded-2xl border-2 bg-[#16213e] p-8 text-center',
        result.rating.borderColor,
      )}>
        <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-4">
          Your Predicted JAMB Score
        </p>
        <p className="text-7xl font-black text-white tabular-nums mb-1">
          {displayed}
          <span className="text-3xl font-semibold text-slate-500"> / 400</span>
        </p>
        <p className={cn('text-2xl font-bold mt-2', result.rating.color)}>
          {result.rating.label} {result.rating.emoji}
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Likely range: <span className="font-semibold text-white">{result.lower} – {result.upper}</span>
        </p>
      </div>

      {/* Subject breakdown */}
      <div className="rounded-2xl border border-[#1e3a5f] bg-[#16213e] p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Subject Breakdown</h3>
        <div className="space-y-4">
          {result.subjects.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">{s.label}</span>
                <span className="text-white font-bold tabular-nums">{s.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-[#0f3460] overflow-hidden">
                <motion.div
                  className={cn('h-full rounded-full', barColor(s.score))}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.score}%` }}
                  transition={{ duration: 0.6, delay: i * 0.07 + 0.2, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* University matches */}
      <div className="rounded-2xl border border-[#1e3a5f] bg-[#16213e] p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          Universities You Likely Qualify For
        </h3>
        <p className="text-xs text-slate-500 mb-5">Based on predicted score of {result.predicted}</p>

        {hasAny ? (
          <div className="space-y-5">
            <UniversityGroup label="Federal Universities" universities={federalUnis} predicted={result.predicted} />
            <UniversityGroup label="State Universities"   universities={stateUnis}   predicted={result.predicted} />
            <UniversityGroup label="Private Universities" universities={privateUnis} predicted={result.predicted} />
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-2xl mb-2">📚</p>
            <p className="text-slate-300 font-semibold mb-1">Keep pushing!</p>
            <p className="text-slate-400 text-sm">
              Your predicted score is below 140. With consistent practice, you can reach the required cut-off for admission.
            </p>
          </div>
        )}

        {/* Gap hint */}
        {nextTier && (
          <div className="mt-4 rounded-lg border border-amber-700/40 bg-amber-900/20 px-4 py-3 flex gap-2.5">
            <span className="text-amber-400 shrink-0">⚠️</span>
            <p className="text-amber-200 text-xs leading-relaxed">
              You need <span className="font-bold">{nextTier.generalCutoff - result.predicted} more marks</span> to qualify for{' '}
              <span className="font-bold">{nextTier.shortName}</span> (cut-off: {nextTier.generalCutoff}).
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-[#16213e] to-[#0f3460] border border-[#1e3a5f] p-6 text-center">
        <p className="text-lg font-bold text-white mb-1">Want to improve your score?</p>
        <p className="text-slate-400 text-sm mb-5">
          Practice past questions in CBT mode on PassVerse
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/practice"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4169E1] hover:bg-[#3457C8] text-white font-semibold px-6 py-3 transition-colors"
          >
            <BookOpen size={16} />
            Practice Now
          </Link>
          <a
            href="#download"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1e3a5f] bg-[#16213e] hover:border-[#4169E1] text-slate-200 hover:text-white font-semibold px-6 py-3 transition-all"
          >
            <Smartphone size={16} />
            Download the App
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-600 text-center leading-relaxed px-4">
        This prediction is based on your practice performance and is intended as a guide only.
        Actual JAMB scores depend on exam conditions, question difficulty, and other factors.
        Use this tool to identify areas for improvement.
      </p>
    </motion.div>
  );
}

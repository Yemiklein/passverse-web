'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EXAM_DATES, UPCOMING_EXAMS, type ExamDate } from '@/data/examDates';

// ── Types ────────────────────────────────────────────────────────────────────

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  compact?: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getTimeRemaining(targetDate: string): TimeRemaining {
  const total = new Date(targetDate).getTime() - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getDaysColor(days: number): string {
  if (days <= 7) return '#e94560';
  if (days <= 30) return '#f5a623';
  return '#ffffff';
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DigitPill({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-9 rounded-md font-mono text-base font-bold bg-[#0f3460] text-[#eaeaea]">
      {value}
    </span>
  );
}

function ClockDisplay({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  const hh = pad(hours);
  const mm = pad(minutes);
  const ss = pad(seconds);
  return (
    <div className="flex items-center gap-1" aria-label={`${hh} hours ${mm} minutes ${ss} seconds`}>
      <DigitPill value={hh[0]} />
      <DigitPill value={hh[1]} />
      <span className="text-[#4169E1] font-bold text-lg leading-none">:</span>
      <DigitPill value={mm[0]} />
      <DigitPill value={mm[1]} />
      <span className="text-[#4169E1] font-bold text-lg leading-none">:</span>
      <DigitPill value={ss[0]} />
      <DigitPill value={ss[1]} />
    </div>
  );
}

// Skeleton shown server-side to avoid hydration mismatch
function CardSkeleton() {
  return (
    <div className="rounded-xl bg-[#16213e] border border-[#1e3a5f] p-5 animate-pulse">
      <div className="h-4 w-24 bg-[#1e3a5f] rounded mb-3" />
      <div className="h-12 w-16 bg-[#1e3a5f] rounded mb-2" />
      <div className="h-4 w-20 bg-[#1e3a5f] rounded mb-4" />
      <div className="h-8 w-36 bg-[#1e3a5f] rounded mb-4" />
      <div className="h-8 w-28 bg-[#1e3a5f] rounded" />
    </div>
  );
}

function CompactSkeleton() {
  return (
    <div className="flex gap-4 py-4 px-6 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-4 w-16 bg-[#1e3a5f] rounded" />
          <div className="h-6 w-10 bg-[#1e3a5f] rounded" />
        </div>
      ))}
    </div>
  );
}

// ── Ongoing card (WAEC overall) ───────────────────────────────────────────────

function OngoingCard({ exam, index }: { exam: ExamDate; index: number }) {
  const papers = EXAM_DATES.filter(
    (e) => e.id !== exam.id && e.color === exam.color && e.status === 'upcoming',
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className="rounded-xl bg-[#16213e] border border-[#1e3a5f] overflow-hidden"
      style={{ borderLeft: `3px solid ${exam.color}` }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <span className="text-xl" aria-hidden="true">{exam.icon}</span>
            <p className="font-bold text-sm mt-1" style={{ color: exam.color }}>
              {exam.name}
            </p>
            <p className="text-xs text-[#64748b] mt-0.5">{exam.description}</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[#1D9E75]/20 text-[#1D9E75] flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" aria-hidden="true" />
            LIVE
          </span>
        </div>

        {/* Upcoming papers */}
        <div className="space-y-2 mb-4">
          {papers.slice(0, 3).map((paper) => {
            const t = getTimeRemaining(paper.date);
            return (
              <div key={paper.id} className="flex items-center justify-between text-sm">
                <span className="text-[#94a3b8]">{paper.icon} {paper.shortName}</span>
                <span className="text-white font-semibold">
                  {t.days > 0 ? `${t.days}d ${pad(t.hours)}h` : t.total > 0 ? `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}` : 'Today!'}
                </span>
              </div>
            );
          })}
        </div>

        <Link
          href={exam.practiceUrl}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: exam.color }}
        >
          Practice Now →
        </Link>
      </div>
    </motion.div>
  );
}

// ── Regular countdown card ────────────────────────────────────────────────────

function CountdownCard({ exam, index }: { exam: ExamDate; index: number }) {
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining(exam.date));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining(exam.date)), 1000);
    return () => clearInterval(id);
  }, [exam.date]);

  const regTime = exam.registrationDeadline ? getTimeRemaining(exam.registrationDeadline) : null;
  const isExpired = time.total <= 0;
  const isUrgent = !isExpired && time.days <= 7;
  const daysColor = isExpired ? '#64748b' : getDaysColor(time.days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={
        isUrgent
          ? { opacity: 1, y: 0, scale: [1, 1.02, 1] }
          : { opacity: 1, y: 0 }
      }
      transition={
        isUrgent
          ? { duration: 0.45, ease: 'easeOut', delay: index * 0.08, scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }
          : { duration: 0.45, ease: 'easeOut', delay: index * 0.08 }
      }
      className="rounded-xl bg-[#16213e] overflow-hidden"
      style={{
        border: `1px solid ${isUrgent ? exam.color : '#1e3a5f'}`,
        borderLeft: `3px solid ${isExpired ? '#334155' : exam.color}`,
        opacity: isExpired ? 0.6 : 1,
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-xl" aria-hidden="true">{exam.icon}</span>
            <p className="font-bold text-sm mt-1" style={{ color: isExpired ? '#64748b' : exam.color }}>
              {exam.name}
            </p>
            <p className="text-xs text-[#64748b] mt-0.5">{exam.description}</p>
          </div>
          {isExpired && (
            <span className="text-xs font-semibold text-[#22c55e] flex items-center gap-1 flex-shrink-0">
              ✓ Done
            </span>
          )}
        </div>

        {isExpired ? (
          <p className="text-[#64748b] text-sm mb-4">Exam completed</p>
        ) : (
          <>
            {/* Days */}
            {time.days > 0 && (
              <motion.div
                key={time.days}
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-1"
              >
                <span
                  className="text-5xl font-extrabold leading-none"
                  style={{ color: daysColor }}
                  aria-label={`${time.days} days remaining`}
                >
                  {time.days}
                </span>
                <span className="text-[#94a3b8] text-sm ml-2">days</span>
              </motion.div>
            )}

            {/* Clock */}
            <div className="mb-4">
              <ClockDisplay hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
              <div className="flex gap-1 mt-1 ml-0.5 text-[10px] text-[#475569]">
                <span className="w-8 text-center">HH</span>
                <span className="w-2" />
                <span className="w-8 text-center">MM</span>
                <span className="w-2" />
                <span className="w-8 text-center">SS</span>
              </div>
            </div>

            {/* Registration deadline */}
            {regTime && regTime.total > 0 && (
              <p className="text-xs text-[#f5a623] mb-3">
                📅 Registration closes in {regTime.days > 0 ? `${regTime.days} days` : 'less than 24h'}
              </p>
            )}
          </>
        )}

        <Link
          href={exam.practiceUrl}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: isExpired ? '#334155' : exam.color }}
        >
          Practice Now →
        </Link>
      </div>
    </motion.div>
  );
}

// ── Compact strip (homepage) ──────────────────────────────────────────────────

function CompactStrip() {
  const [times, setTimes] = useState<TimeRemaining[]>(() =>
    UPCOMING_EXAMS.slice(0, 3).map((e) => getTimeRemaining(e.date)),
  );

  useEffect(() => {
    const id = setInterval(
      () => setTimes(UPCOMING_EXAMS.slice(0, 3).map((e) => getTimeRemaining(e.date))),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  const exams = UPCOMING_EXAMS.slice(0, 3);

  return (
    <div className="w-full bg-[#0f172a] border-t border-b border-[#1e3a5f]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center gap-0 divide-x divide-[#1e3a5f]">
          {exams.map((exam, i) => {
            const t = times[i];
            const isOngoing = exam.status === 'ongoing';
            return (
              <Link
                key={exam.id}
                href="/countdown"
                className="flex items-center gap-3 px-5 py-4 hover:bg-[#16213e] transition-colors group flex-1 min-w-[160px]"
                aria-label={`${exam.name}: ${isOngoing ? 'ongoing' : `${t.days} days remaining`}`}
              >
                <span className="text-lg flex-shrink-0" aria-hidden="true">{exam.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: exam.color }}>
                    {exam.shortName}
                  </p>
                  {isOngoing ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse flex-shrink-0" />
                      <span className="text-xs text-[#1D9E75] font-semibold">ONGOING</span>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-white">
                      {t.days > 0
                        ? `${t.days}d ${pad(t.hours)}h`
                        : t.total > 0
                        ? `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`
                        : 'Today!'}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}

          <Link
            href="/countdown"
            className="flex items-center gap-1.5 px-5 py-4 text-xs font-semibold text-[#64748b] hover:text-[#4169E1] transition-colors whitespace-nowrap"
          >
            All countdowns →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ExamCountdown({ compact = false }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (compact) {
    if (!mounted) return <CompactSkeleton />;
    return <CompactStrip />;
  }

  // Full widget
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {UPCOMING_EXAMS.map((exam, i) =>
        exam.status === 'ongoing' ? (
          <OngoingCard key={exam.id} exam={exam} index={i} />
        ) : (
          <CountdownCard key={exam.id} exam={exam} index={i} />
        ),
      )}
    </div>
  );
}

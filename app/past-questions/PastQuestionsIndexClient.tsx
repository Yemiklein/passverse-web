'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ExamMeta, SubjectMeta } from '@/lib/pastQuestions';
import { cn } from '@/lib/utils';

interface Props {
  exams: ExamMeta[];
  subjects: SubjectMeta[];
}

const examColorStyles: Record<string, { card: string; activeCard: string; badge: string; heading: string }> = {
  blue: {
    card:       'border-[var(--color-gray-100)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
    activeCard: 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white',
    badge:      'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
    heading:    'text-[var(--color-primary)]',
  },
  teal: {
    card:       'border-[var(--color-gray-100)] hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]',
    activeCard: 'bg-[var(--color-teal)] border-[var(--color-teal)] text-white',
    badge:      'bg-[var(--color-teal-light)] text-[var(--color-teal-dark)]',
    heading:    'text-[var(--color-teal)]',
  },
  amber: {
    card:       'border-[var(--color-gray-100)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]',
    activeCard: 'bg-[var(--color-amber)] border-[var(--color-amber)] text-white',
    badge:      'bg-[var(--color-amber-light)] text-[var(--color-amber-dark)]',
    heading:    'text-[var(--color-amber)]',
  },
  coral: {
    card:       'border-[var(--color-gray-100)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral)]',
    activeCard: 'bg-[var(--color-coral)] border-[var(--color-coral)] text-white',
    badge:      'bg-[var(--color-coral-light)] text-[var(--color-coral-dark)]',
    heading:    'text-[var(--color-coral)]',
  },
  purple: {
    card:       'border-[var(--color-gray-100)] hover:border-purple-500 hover:text-purple-600',
    activeCard: 'bg-purple-600 border-purple-600 text-white',
    badge:      'bg-purple-100 text-purple-800',
    heading:    'text-purple-600',
  },
};

export function PastQuestionsIndexClient({ exams, subjects }: Props) {
  const [activeExam, setActiveExam] = useState<string>(exams[0].key);

  function scrollToExam(key: string) {
    setActiveExam(key);
    const el = document.getElementById(`exam-${key}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

      {/* Exam selector */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6 text-center">
          Choose Your Exam
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {exams.map((exam) => {
            const styles = examColorStyles[exam.color] ?? examColorStyles.blue;
            const isActive = activeExam === exam.key;
            return (
              <button
                key={exam.key}
                onClick={() => scrollToExam(exam.key)}
                aria-pressed={isActive}
                aria-label={`Show ${exam.label} subjects`}
                className={cn(
                  'flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2',
                  'min-w-[130px] text-center cursor-pointer transition-all duration-200',
                  isActive ? styles.activeCard : `bg-white text-[var(--color-gray-600)] ${styles.card}`,
                )}
              >
                <span className="text-2xl" aria-hidden="true">{exam.icon}</span>
                <div>
                  <p className="font-bold text-sm">{exam.label}</p>
                  <p className={cn('text-xs', isActive ? 'text-white/80' : 'text-[var(--color-gray-400)]')}>
                    {exam.totalQuestions.toLocaleString()} questions
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subjects section per exam */}
      <div className="space-y-16">
        {exams.map((exam) => {
          const styles = examColorStyles[exam.color] ?? examColorStyles.blue;
          const examSubjects = subjects.filter((s) => s.examTypes.includes(exam.key as import('@/lib/pastQuestions').ExamType));

          return (
            <section
              key={exam.key}
              id={`exam-${exam.key}`}
              aria-labelledby={`heading-${exam.key}`}
              className="scroll-mt-24"
            >
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <span className="text-3xl" aria-hidden="true">{exam.icon}</span>
                <div>
                  <h2
                    id={`heading-${exam.key}`}
                    className={cn('text-2xl font-extrabold', styles.heading)}
                  >
                    {exam.label} Past Questions
                  </h2>
                  <p className="text-sm text-[var(--color-gray-400)] mt-0.5">
                    {exam.fullName} · {exam.yearRange} · {exam.totalQuestions.toLocaleString()} questions
                  </p>
                </div>
              </div>

              {/* Subject grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {examSubjects.map((subject, i) => (
                  <motion.div
                    key={subject.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.04 }}
                  >
                    <Link
                      href={`/past-questions/${exam.key}/${subject.key}`}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl border bg-white',
                        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group',
                        styles.card,
                      )}
                    >
                      <span className="text-xl flex-shrink-0" aria-hidden="true">{subject.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-gray-900)] group-hover:text-inherit leading-snug truncate">
                          {subject.label}
                        </p>
                        <p className="text-xs text-[var(--color-gray-400)] mt-0.5">View questions →</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-8 text-white text-center">
        <p className="text-3xl mb-3" aria-hidden="true">📱</p>
        <h2 className="text-2xl font-extrabold mb-2">
          Practice all 26,000+ questions on PassVerse
        </h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          AI explanations for every answer. Track your score. Study offline. Free to download.
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.passverse"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[var(--color-primary)] hover:opacity-90 transition-opacity"
        >
          Download PassVerse Free →
        </a>
      </div>
    </div>
  );
}

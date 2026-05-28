'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { PastQuestion } from '@/lib/pastQuestions';
import { cn } from '@/lib/utils';

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

interface Props {
  questions: PastQuestion[];
}

export function QuestionAccordion({ questions }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-3">
      {questions.map((q, index) => {
        const isOpen      = openId === q.id;
        const contentId   = `question-content-${q.id}`;
        const triggerId   = `question-trigger-${q.id}`;

        return (
          <div
            key={q.id}
            className="rounded-xl border border-[var(--color-gray-100)] bg-white overflow-hidden"
          >
            {/* Question trigger */}
            <button
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(q.id)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-[var(--color-gray-50)] transition-colors duration-150"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-[var(--color-gray-900)] leading-relaxed">
                {q.question}
              </span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={cn(
                  'flex-shrink-0 text-[var(--color-gray-400)] transition-transform duration-200 mt-0.5',
                  isOpen && 'rotate-180',
                )}
              />
            </button>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-[var(--color-gray-100)] pt-3">
                    {/* Options */}
                    <div className="space-y-2 mb-4">
                      {OPTION_LABELS.map((label) => {
                        const isCorrect = q.answer === label;
                        return (
                          <div
                            key={label}
                            className={cn(
                              'flex items-start gap-3 p-3 rounded-lg text-sm',
                              isCorrect
                                ? 'bg-emerald-50 border border-emerald-200'
                                : 'bg-[var(--color-gray-50)] border border-transparent',
                            )}
                          >
                            <span
                              className={cn(
                                'flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center',
                                isCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-[var(--color-gray-200)] text-[var(--color-gray-600)]',
                              )}
                              aria-label={isCorrect ? `Option ${label} — correct answer` : `Option ${label}`}
                            >
                              {label}
                            </span>
                            <span className={cn(
                              'flex-1 leading-snug',
                              isCorrect ? 'font-semibold text-emerald-800' : 'text-[var(--color-gray-700)]',
                            )}>
                              {q.options[label]}
                            </span>
                            {isCorrect && (
                              <span className="flex-shrink-0 text-emerald-600 text-xs font-semibold" aria-hidden="true">
                                ✓ Correct
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="rounded-lg bg-[var(--color-primary-light)] p-3 text-sm text-[var(--color-primary-dark)]">
                        <span className="font-semibold">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

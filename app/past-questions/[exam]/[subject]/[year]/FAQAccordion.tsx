'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen    = openIndex === index;
        const contentId = `faq-content-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <div
            key={index}
            className="rounded-xl border border-[var(--color-gray-100)] bg-white overflow-hidden"
          >
            <button
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-[var(--color-gray-50)] transition-colors duration-150"
            >
              <span className="font-semibold text-[var(--color-gray-900)] text-sm leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={cn(
                  'flex-shrink-0 text-[var(--color-gray-400)] transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
              />
            </button>

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
                  <div className="px-5 pb-5 text-sm text-[var(--color-gray-600)] leading-relaxed border-t border-[var(--color-gray-100)] pt-4">
                    {faq.answer}
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

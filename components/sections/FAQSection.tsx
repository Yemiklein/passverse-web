'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const faqs = [
  {
    question: 'Is PassVerse really free?',
    answer:
      'Yes, the free plan gives you access to the 3 most recent years of past questions with no credit card required. Download and start practising immediately.',
  },
  {
    question: 'Which exams does PassVerse cover?',
    answer:
      'PassVerse covers JAMB (UTME), WAEC (WASSCE), GCE (O\'Level), Post-UTME, and NECO — all in one app.',
  },
  {
    question: 'Does it work without internet?',
    answer:
      'Yes, once you\'ve practised a subject online, questions are saved to your device for offline access. Perfect for areas with poor network coverage.',
  },
  {
    question: 'How does the AI explanation work?',
    answer:
      'After answering a question, tap "Show Explanation" to get a detailed breakdown of why the answer is correct. Premium users can also ask 3 follow-up questions per answer.',
  },
  {
    question: 'How is the score prediction calculated?',
    answer:
      'PassVerse analyses your accuracy per subject, practice trends and mock exam scores to generate a predicted score range with a confidence level so you know where you stand before exam day.',
  },
] as const;

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion    = useReducedMotion();

  return (
    <AnimatedSection delay={index * 0.08} direction="up">
      <div className="border-b border-[var(--color-gray-100)]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-5 text-left gap-4 group"
        >
          <span className="font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors duration-150">
            {question}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
            className="flex-shrink-0 text-[var(--color-gray-400)]"
            aria-hidden="true"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-[var(--color-gray-600)] leading-relaxed text-sm">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export function FAQSection() {
  return (
    <SectionWrapper>
      <div className="max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--color-gray-600)]">
            Everything you need to know about PassVerse
          </p>
        </AnimatedSection>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} {...faq} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default FAQSection;

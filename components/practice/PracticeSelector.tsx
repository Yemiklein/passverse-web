'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion'
import { ChevronLeft, X, Check } from 'lucide-react'
import {
  EXAM_TYPES,
  SUBJECT_LABELS,
  SUBJECT_ICONS,
  getSubjectsForExam,
  getYearsForSubject,
  getQuestionsForQuiz,
  type PracticeQuestion,
} from '@/data/practiceQuestions'

// ── Helpers ──────────────────────────────────────────────────────────────────

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

const EXAM_LABELS: Record<string, string> = {
  JAMB:     'JAMB UTME',
  WAEC:     'WAEC / WASSCE',
  NECO:     'NECO SSCE',
  POST_UTME: 'Post-UTME',
}

const OPTION_COLORS: Record<string, string> = {
  A: 'bg-[#4169E1]',
  B: 'bg-[#1D9E75]',
  C: 'bg-[#EF9F27]',
  D: 'bg-[#D85A30]',
}

// ── Score ring SVG ────────────────────────────────────────────────────────────

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (pct / 100) * circumference
  const ringColor = pct >= 70 ? '#1D9E75' : pct >= 50 ? '#EF9F27' : '#D85A30'

  return (
    <div className="flex flex-col items-center">
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={70} cy={70} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={10} />
        <circle
          cx={70}
          cy={70}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <text x={70} y={65} textAnchor="middle" dominantBaseline="middle" fontSize={22} fontWeight="bold" fill="#0F172A">
          {score}/{total}
        </text>
        <text x={70} y={88} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#475569">
          {pct}%
        </text>
      </svg>
    </div>
  )
}

// ── Floating particles ────────────────────────────────────────────────────────

function FloatingParticles({ reduced }: { reduced: boolean }) {
  const particles = [
    { emoji: '📚', top: '10%', left: '8%',  delay: 0,    dur: 6 },
    { emoji: '✏️',  top: '20%', left: '85%', delay: 1.5,  dur: 7 },
    { emoji: '⭐',  top: '70%', left: '12%', delay: 0.8,  dur: 5 },
    { emoji: '🎯',  top: '60%', left: '88%', delay: 2,    dur: 8 },
    { emoji: '📚',  top: '40%', left: '92%', delay: 0.3,  dur: 6.5 },
    { emoji: '✏️',  top: '80%', left: '75%', delay: 1,    dur: 7.5 },
  ]

  if (reduced) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-20 select-none"
          style={{
            top: p.top,
            left: p.left,
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-16px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

type View = 'selector' | 'quiz' | 'results'

interface SessionAnswer {
  question_id: string
  selected: string
  is_correct: boolean
}

export default function PracticeSelector() {
  const prefersReduced = useReducedMotion()
  const fast: Transition = prefersReduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' as const }
  const withDelay = (delay: number): Transition =>
    prefersReduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' as const, delay }
  const stagger = (i: number): Transition => withDelay(i * 0.07)

  // Selector state
  const [selectedExam,    setSelectedExam]    = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedYear,    setSelectedYear]    = useState<number | null>(null)

  // Quiz state
  const [view,            setView]            = useState<View>('selector')
  const [questions,       setQuestions]       = useState<PracticeQuestion[]>([])
  const [currentIndex,    setCurrentIndex]    = useState(0)
  const [selectedAnswer,  setSelectedAnswer]  = useState<string | null>(null)
  const [hasAnswered,     setHasAnswered]     = useState(false)
  const [sessionAnswers,  setSessionAnswers]  = useState<SessionAnswer[]>([])
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [expandedReview,  setExpandedReview]  = useState<string | null>(null)

  // ── Handlers ──────────────────────────────────────────────────────────────

  function startQuiz() {
    if (!selectedExam || !selectedSubject || !selectedYear) return
    const qs = getQuestionsForQuiz(selectedExam, selectedSubject, selectedYear, 10)
    setQuestions(qs)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setSessionAnswers([])
    setBannerDismissed(false)
    setView('quiz')
  }

  function handleAnswer(option: string) {
    if (hasAnswered) return
    const q = questions[currentIndex]
    const correct = q.answer === option
    setSelectedAnswer(option)
    setHasAnswered(true)
    setSessionAnswers(prev => [...prev, { question_id: q.id, selected: option, is_correct: correct }])
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
      setHasAnswered(false)
    } else {
      setView('results')
    }
  }

  function tryAgain() {
    if (!selectedExam || !selectedSubject || !selectedYear) return
    const qs = getQuestionsForQuiz(selectedExam, selectedSubject, selectedYear, 10)
    setQuestions(qs)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setSessionAnswers([])
    setBannerDismissed(false)
    setExpandedReview(null)
    setView('quiz')
  }

  function backToSelector() {
    setView('selector')
    setExpandedReview(null)
  }

  // ── Computed ──────────────────────────────────────────────────────────────

  const subjects   = selectedExam    ? getSubjectsForExam(selectedExam)                          : []
  const years      = selectedSubject ? getYearsForSubject(selectedExam, selectedSubject)          : []
  const score      = sessionAnswers.filter(a => a.is_correct).length
  const total      = sessionAnswers.length
  const pct        = total > 0 ? Math.round((score / total) * 100) : 0
  const currentQ   = questions[currentIndex]
  const progressPct = questions.length > 0
    ? ((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100
    : 0

  function scoreMessage() {
    if (pct >= 90) return "Excellent! 🎉 You're ready for exam day."
    if (pct >= 70) return 'Great work! 👍 Keep practising to score higher.'
    if (pct >= 50) return '📚 Good effort. Review your weak areas.'
    return 'Keep going! 💪 Practice makes perfect.'
  }

  // ── Render: Quiz ──────────────────────────────────────────────────────────

  if (view === 'quiz' && currentQ) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-16">
        {/* Sticky header */}
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={backToSelector}
              className="flex items-center gap-1 text-sm text-[#475569] hover:text-[#4169E1] transition-colors min-h-[44px]"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            <span className="text-sm text-[#475569] truncate max-w-[180px] sm:max-w-none text-center">
              {SUBJECT_LABELS[selectedSubject] ?? selectedSubject} · {EXAM_LABELS[selectedExam] ?? selectedExam} · {selectedYear}
            </span>
            <span className="text-sm font-semibold bg-[#EEF2FF] text-[#4169E1] rounded-full px-3 py-1">
              Q{currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="h-[3px] bg-[#E2E8F0]">
            <div
              className="h-full bg-[#4169E1] transition-[width] duration-400 ease-[ease]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">
          {/* Banner */}
          {!bannerDismissed && (
            <div className="flex items-center justify-between bg-[#EEF2FF] rounded-xl px-4 py-3 gap-3">
              <p className="text-sm text-[#4169E1]">
                You're seeing 10 of 40 questions.{' '}
                <span className="font-medium">Download PassVerse for the full set + AI explanations.</span>
              </p>
              <button
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss"
                className="shrink-0 text-[#4169E1] hover:text-[#1E3A8A] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={fast}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex items-start gap-3 mb-5">
                <span className="shrink-0 bg-[#4169E1] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  Q{currentIndex + 1}
                </span>
                <p className="text-lg font-medium text-[#0F172A] leading-relaxed">
                  {decodeHtml(currentQ.question)}
                </p>
              </div>

              <div className="space-y-3 mt-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.index
                  const isCorrect  = opt.index === currentQ.answer

                  let optionClass = 'bg-white border-[#E2E8F0] hover:bg-[#EEF2FF] hover:border-[#4169E1]'
                  let iconRight: React.ReactNode = null

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionClass = 'bg-[#E1F5EE] border-[#1D9E75]'
                      iconRight = <Check size={18} className="text-[#1D9E75] shrink-0" />
                    } else if (isSelected) {
                      optionClass = 'bg-[#FAECE7] border-[#D85A30]'
                      iconRight = <X size={18} className="text-[#D85A30] shrink-0" />
                    } else {
                      optionClass = 'bg-white border-[#E2E8F0]'
                    }
                  }

                  return (
                    <button
                      key={opt.index}
                      onClick={() => handleAnswer(opt.index)}
                      disabled={hasAnswered}
                      className={`w-full flex items-center gap-3 rounded-xl py-4 px-5 border text-left transition-colors duration-150 min-h-[44px] ${optionClass} ${hasAnswered ? 'pointer-events-none' : ''}`}
                    >
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${OPTION_COLORS[opt.index] ?? 'bg-[#475569]'}`}>
                        {opt.index}
                      </span>
                      <span className="flex-1 text-[#0F172A]">{decodeHtml(opt.value)}</span>
                      {iconRight}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={fast}
                className="flex justify-center"
              >
                <button
                  onClick={nextQuestion}
                  className="bg-[#4169E1] text-white rounded-full py-3 px-8 font-semibold shadow-md hover:bg-[#1E3A8A] transition-colors min-h-[44px]"
                >
                  {currentIndex < questions.length - 1 ? 'Next Question →' : 'See My Results →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // ── Render: Results ───────────────────────────────────────────────────────

  if (view === 'results') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-8">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={fast}
            className="space-y-6"
          >
            {/* Score */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <ScoreRing score={score} total={total} />
              <p className="mt-4 text-lg font-semibold text-[#0F172A]">{scoreMessage()}</p>
            </div>

            {/* Review */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold text-[#0F172A] mb-4">Review Your Answers</h2>
              <div className="space-y-2">
                {questions.map((q, idx) => {
                  const ans    = sessionAnswers[idx]
                  const isOpen = expandedReview === q.id
                  const correct = ans?.is_correct

                  return (
                    <div key={q.id} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedReview(isOpen ? null : q.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left min-h-[44px] hover:bg-[#F8FAFC] transition-colors"
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${correct ? 'bg-[#1D9E75]' : 'bg-[#D85A30]'}`}>
                          {correct ? '✓' : '✗'}
                        </span>
                        <span className="flex-1 text-sm text-[#0F172A] truncate">
                          {decodeHtml(q.question).slice(0, 80)}{q.question.length > 80 ? '…' : ''}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: prefersReduced ? 0 : 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-2 border-t border-[#E2E8F0] pt-3">
                              <p className="text-sm font-medium text-[#0F172A]">{decodeHtml(q.question)}</p>
                              {q.options.map(opt => {
                                const isUserAnswer  = ans?.selected === opt.index
                                const isRightAnswer = opt.index === q.answer
                                let cls = 'text-[#475569]'
                                if (isRightAnswer) cls = 'text-[#1D9E75] font-semibold'
                                if (isUserAnswer && !isRightAnswer) cls = 'text-[#D85A30] line-through'
                                return (
                                  <p key={opt.index} className={`text-sm ${cls}`}>
                                    {opt.index}. {decodeHtml(opt.value)}
                                    {isRightAnswer && ' ✓'}
                                    {isUserAnswer && !isRightAnswer && ' ✗'}
                                  </p>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={tryAgain}
                className="border-2 border-[#4169E1] text-[#4169E1] bg-white rounded-full py-3 px-8 font-semibold hover:bg-[#EEF2FF] transition-colors min-h-[44px]"
              >
                Try Again
              </button>
              <button
                onClick={backToSelector}
                className="border-2 border-[#E2E8F0] text-[#475569] bg-white rounded-full py-3 px-8 font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]"
              >
                Choose Different Subject
              </button>
            </div>

            {/* App CTA */}
            <div className="bg-gradient-to-br from-[#4169E1] to-[#1E3A8A] rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">You just scratched the surface</h2>
              <p className="text-white/80 text-sm mb-5">
                The PassVerse app has 26,675 questions, AI explanations, mock exams, score prediction, offline mode and daily streaks.
              </p>
              <ul className="text-left text-white text-sm space-y-1.5 mb-6 inline-block">
                {[
                  '26,675 past questions (JAMB, WAEC, NECO, Post-UTME)',
                  'AI explanations for every answer',
                  'Timed mock exam simulation',
                  'Score prediction engine',
                  'Daily streaks & leaderboards',
                  'Works offline',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#1D9E75]">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div>
                {/* TODO: replace with Play Store URL */}
                <a
                  href="#"
                  className="inline-block bg-white text-[#4169E1] font-semibold rounded-full py-3 px-8 hover:bg-[#EEF2FF] transition-colors min-h-[44px]"
                >
                  Download Free on Google Play
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // ── Render: Selector ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] to-[#2845AF] pt-32 pb-16 px-4 overflow-hidden">
        <FloatingParticles reduced={!!prefersReduced} />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fast}
          >
            Practice Past Questions Online — Free
          </motion.h1>
          <motion.p
            className="mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={withDelay(0.15)}
          >
            Choose your exam, subject and year.
            <br />
            No account needed. 10 free questions per session.
          </motion.p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Step 1 — Exam type */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">
            Step 1: Choose your exam
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXAM_TYPES.map((exam, i) => {
              const active = selectedExam === exam
              return (
                <motion.button
                  key={exam}
                  initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={withDelay(i * 0.07)}
                  whileInView={{ opacity: 1 }}
                  onClick={() => {
                    setSelectedExam(exam)
                    setSelectedSubject('')
                    setSelectedYear(null)
                  }}
                  className={`rounded-2xl border py-4 px-4 text-sm font-semibold transition-all duration-150 min-h-[56px] ${
                    active
                      ? 'bg-[#4169E1] text-white border-[#4169E1] shadow-md scale-[1.02]'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] shadow-sm hover:bg-[#EEF2FF] hover:border-[#4169E1]/30'
                  }`}
                >
                  {EXAM_LABELS[exam] ?? exam}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Step 2 — Subject */}
        <AnimatePresence>
          {selectedExam && subjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={fast}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">
                Step 2: Choose subject
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {subjects.map((sub, i) => {
                  const active = selectedSubject === sub
                  return (
                    <motion.button
                      key={sub}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={withDelay(i * 0.04)}
                      onClick={() => {
                        setSelectedSubject(sub)
                        setSelectedYear(null)
                      }}
                      className={`flex flex-col items-center gap-2 rounded-2xl border py-4 px-3 transition-all duration-150 min-h-[80px] ${
                        active
                          ? 'border-2 border-[#1D9E75] bg-[#E1F5EE] text-[#0F6E56]'
                          : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#E1F5EE]/40 hover:border-[#1D9E75]/30'
                      }`}
                    >
                      <span className="text-2xl">{SUBJECT_ICONS[sub] ?? '📖'}</span>
                      <span className="text-xs font-semibold text-center leading-tight">
                        {SUBJECT_LABELS[sub] ?? sub}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 — Year */}
        <AnimatePresence>
          {selectedSubject && years.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={fast}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">
                Step 3: Choose year
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {years.map((year, i) => {
                  const active = selectedYear === year
                  return (
                    <motion.button
                      key={year}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={withDelay(i * 0.04)}
                      onClick={() => setSelectedYear(year)}
                      className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold border transition-colors min-h-[44px] ${
                        active
                          ? 'bg-[#4169E1] text-white border-[#4169E1]'
                          : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#4169E1]'
                      }`}
                    >
                      {year}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start CTA */}
        <AnimatePresence>
          {selectedYear && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                onClick={startQuiz}
                className="w-full max-w-sm bg-[#4169E1] text-white rounded-full py-4 text-lg font-semibold shadow-lg hover:bg-[#1E3A8A] transition-colors min-h-[56px]"
              >
                Start Practice →
              </button>
              <p className="text-xs text-[#475569] text-center">
                No account needed · 10 free questions · Download the app for all questions
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

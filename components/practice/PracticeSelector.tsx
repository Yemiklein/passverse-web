'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion'
import {
  EXAM_TYPES,
  SUBJECT_LABELS,
  SUBJECT_ICONS,
  getSubjectsForExam,
  getYearsForSubject,
  getQuestionsForQuiz,
  type PracticeQuestion,
} from '@/data/practiceQuestions'

// ── Constants ─────────────────────────────────────────────────────────────────

const QUIZ_DURATION = 720 // 12 minutes for 10 questions

const J = {
  bg:             '#1a1a2e',
  panel:          '#16213e',
  sidebar:        '#0f3460',
  accent:         '#e94560',
  yellow:         '#f5a623',
  text:           '#eaeaea',
  textMuted:      '#94a3b8',
  border:         '#1e3a5f',
  optionBg:       '#1e3a5f',
  optionHover:    '#254a7a',
  optionSelected: '#1a2f5e',
  answered:       '#22c55e',
  unanswered:     '#475569',
  flagged:        '#f5a623',
  correct:        '#22c55e',
  wrong:          '#e94560',
} as const

const EXAM_LABELS: Record<string, string> = {
  JAMB:      'JAMB UTME',
  WAEC:      'WAEC / WASSCE',
  NECO:      'NECO SSCE',
  POST_UTME: 'Post-UTME',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function formatTime(s: number): string {
  const h   = Math.floor(s / 3600)
  const m   = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

function formatTimeUsed(s: number): string {
  const m   = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

// ── Types ─────────────────────────────────────────────────────────────────────

type View = 'selector' | 'quiz' | 'results'

interface SessionAnswer {
  question_id: string
  selected:    string
  is_correct:  boolean
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PracticeSelector() {
  const prefersReduced = useReducedMotion()
  const fast: Transition     = prefersReduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' as const }
  const withDelay = (d: number): Transition =>
    prefersReduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' as const, delay: d }

  // ── Selector state ────────────────────────────────────────────────────────
  const [selectedExam,    setSelectedExam]    = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedYear,    setSelectedYear]    = useState<number | null>(null)

  // ── View ──────────────────────────────────────────────────────────────────
  const [view, setView] = useState<View>('selector')

  // ── Quiz state ────────────────────────────────────────────────────────────
  const [questions,    setQuestions]    = useState<PracticeQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction,    setDirection]    = useState<1 | -1>(1)
  const [answers,      setAnswers]      = useState<Record<number, string>>({})
  const [flagged,      setFlagged]      = useState<Set<number>>(new Set())
  const [timeLeft,     setTimeLeft]     = useState(QUIZ_DURATION)
  const [timeUsed,     setTimeUsed]     = useState(0)
  const [showConfirm,  setShowConfirm]  = useState(false)

  // ── Results state ─────────────────────────────────────────────────────────
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([])
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  // Stable refs so the timer callback always sees latest answers/questions
  const answersRef   = useRef(answers)
  const questionsRef = useRef(questions)
  useEffect(() => { answersRef.current   = answers   }, [answers])
  useEffect(() => { questionsRef.current = questions }, [questions])

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (view !== 'quiz') return
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id)
          const a  = answersRef.current
          const qs = questionsRef.current
          const computed: SessionAnswer[] = qs.map((q, i) => ({
            question_id: q.id,
            selected:    a[i] ?? '',
            is_correct:  (a[i] ?? '') === q.answer,
          }))
          setTimeout(() => {
            setTimeUsed(QUIZ_DURATION)
            setSessionAnswers(computed)
            setView('results')
          }, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [view])

  // ── Handlers ──────────────────────────────────────────────────────────────

  function startQuiz() {
    if (!selectedExam || !selectedSubject || !selectedYear) return
    const qs = getQuestionsForQuiz(selectedExam, selectedSubject, selectedYear, 10)
    setQuestions(qs)
    setCurrentIndex(0)
    setDirection(1)
    setAnswers({})
    setFlagged(new Set())
    setTimeLeft(QUIZ_DURATION)
    setTimeUsed(0)
    setSessionAnswers([])
    setExpandedReview(null)
    setShowConfirm(false)
    setView('quiz')
  }

  function handleAnswer(option: string) {
    setAnswers(prev => ({ ...prev, [currentIndex]: option }))
  }

  function goTo(index: number) {
    if (index === currentIndex) return
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  function goNext() { if (currentIndex < questions.length - 1) goTo(currentIndex + 1) }
  function goPrev() { if (currentIndex > 0) goTo(currentIndex - 1) }

  function toggleFlag() {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(currentIndex)) next.delete(currentIndex)
      else next.add(currentIndex)
      return next
    })
  }

  function confirmSubmit() {
    const elapsed = QUIZ_DURATION - timeLeft
    const computed: SessionAnswer[] = questions.map((q, i) => ({
      question_id: q.id,
      selected:    answers[i] ?? '',
      is_correct:  (answers[i] ?? '') === q.answer,
    }))
    setTimeUsed(elapsed)
    setSessionAnswers(computed)
    setShowConfirm(false)
    setView('results')
  }

  function tryAgain() {
    if (!selectedExam || !selectedSubject || !selectedYear) return
    const qs = getQuestionsForQuiz(selectedExam, selectedSubject, selectedYear, 10)
    setQuestions(qs)
    setCurrentIndex(0)
    setDirection(1)
    setAnswers({})
    setFlagged(new Set())
    setTimeLeft(QUIZ_DURATION)
    setTimeUsed(0)
    setSessionAnswers([])
    setExpandedReview(null)
    setShowConfirm(false)
    setView('quiz')
  }

  function backToSelector() {
    setView('selector')
    setExpandedReview(null)
    setShowConfirm(false)
  }

  // ── Computed ──────────────────────────────────────────────────────────────

  const subjects      = selectedExam    ? getSubjectsForExam(selectedExam)                 : []
  const years         = selectedSubject ? getYearsForSubject(selectedExam, selectedSubject) : []
  const score         = sessionAnswers.filter(a => a.is_correct).length
  const total         = sessionAnswers.length
  const pct           = total > 0 ? Math.round((score / total) * 100) : 0
  const currentQ      = questions[currentIndex]
  const answeredCount = Object.keys(answers).length

  const timerColor = timeLeft < 60 ? J.accent : timeLeft < 300 ? J.yellow : J.text
  const timerPulse = !prefersReduced && timeLeft < 60 && view === 'quiz'

  function scoreMessage() {
    if (pct >= 90) return "Excellent! 🎉 You're ready for exam day."
    if (pct >= 70) return 'Great work! 👍 Keep practising to score higher.'
    if (pct >= 50) return '📚 Good effort. Review your weak areas.'
    return 'Keep going! 💪 Practice makes perfect.'
  }

  const slideVariants = {
    enter:  (dir: number) => ({ x: prefersReduced ? 0 : dir * 80,  opacity: prefersReduced ? 1 : 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: prefersReduced ? 0 : dir * -80, opacity: prefersReduced ? 1 : 0 }),
  }

  // ── Render: Quiz ──────────────────────────────────────────────────────────

  if (view === 'quiz' && currentQ) {
    const isFlagged     = flagged.has(currentIndex)
    const currentAnswer = answers[currentIndex]

    return (
      <div style={{ background: J.bg, color: J.text }}>

        {/* Submit confirmation overlay */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              style={{ background: 'rgba(0,0,0,0.75)' }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1,    opacity: 1 }}
                exit={{ scale: 0.92,    opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="w-full max-w-sm rounded-2xl p-7"
                style={{ background: J.panel, border: `1px solid ${J.border}` }}
              >
                <h2 className="text-lg font-bold mb-3" style={{ color: J.text }}>
                  Submit Examination?
                </h2>
                <p className="text-sm mb-1" style={{ color: J.textMuted }}>
                  Answered:{' '}
                  <strong style={{ color: J.answered }}>{answeredCount}</strong>
                  {' '}/ {questions.length}
                </p>
                {answeredCount < questions.length && (
                  <p className="text-sm mb-3" style={{ color: J.accent }}>
                    {questions.length - answeredCount} question
                    {questions.length - answeredCount !== 1 ? 's' : ''} unanswered.
                  </p>
                )}
                <p className="text-sm mb-6" style={{ color: J.textMuted }}>
                  You cannot change answers after submission.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 rounded-xl py-3 text-sm font-semibold"
                    style={{ background: J.optionBg, color: J.text, border: `1px solid ${J.border}` }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSubmit}
                    className="flex-1 rounded-xl py-3 text-sm font-bold hover:opacity-90 transition-opacity"
                    style={{ background: '#f5a623', color: '#1a1a2e' }}
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top bar ── */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6"
          style={{ height: 56, background: J.panel, borderBottom: `1px solid ${J.border}` }}
        >
          <span className="text-sm font-bold tracking-wider uppercase select-none" style={{ color: J.text }}>
            PassVerse CBT
          </span>
          <span className="hidden sm:block text-xs font-medium truncate max-w-xs" style={{ color: J.textMuted }}>
            {(SUBJECT_LABELS[selectedSubject] ?? selectedSubject).toUpperCase()} — {selectedExam} {selectedYear}
          </span>
          <motion.span
            className="text-sm font-bold"
            animate={timerPulse ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
            transition={timerPulse ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } : {}}
            style={{ fontFamily: 'monospace', color: timerColor }}
          >
            ⏱ {formatTime(timeLeft)}
          </motion.span>
        </header>

        {/* ── Body: question panel + sidebar ── */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 112px)' }}>

          {/* Question panel */}
          <main
            className="flex-1 p-5 sm:p-8"
            style={{ background: J.bg }}
          >
            <p className="text-sm mb-5" style={{ color: J.textMuted }}>
              Question {currentIndex + 1} of {questions.length}
            </p>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Question text */}
                <p
                  className="mb-8 leading-relaxed font-medium"
                  style={{ fontSize: 18, color: J.text }}
                >
                  {decodeHtml(currentQ.question)}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map(opt => {
                    const isSelected = currentAnswer === opt.index
                    return (
                      <motion.button
                        key={opt.index}
                        onClick={() => handleAnswer(opt.index)}
                        whileTap={prefersReduced ? {} : { scale: 0.985 }}
                        className="w-full flex items-center gap-4 rounded-xl text-left transition-colors duration-150"
                        style={{
                          padding: '14px 18px',
                          background:  isSelected ? J.optionSelected : J.optionBg,
                          border:      isSelected ? '1px solid #4169E1' : `1px solid ${J.border}`,
                          borderLeft:  isSelected ? '3px solid #4169E1' : `1px solid ${J.border}`,
                        }}
                        onMouseEnter={e => {
                          if (!isSelected)
                            (e.currentTarget as HTMLButtonElement).style.background = J.optionHover
                        }}
                        onMouseLeave={e => {
                          if (!isSelected)
                            (e.currentTarget as HTMLButtonElement).style.background = J.optionBg
                        }}
                      >
                        <span
                          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ background: isSelected ? '#4169E1' : J.sidebar, color: J.text }}
                        >
                          {opt.index}
                        </span>
                        <span style={{ color: J.text }}>{decodeHtml(opt.value)}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Sidebar */}
          <aside
            className="shrink-0 md:w-64 p-4 flex flex-col gap-4 border-t md:border-t-0 md:border-l"
            style={{ background: J.sidebar, borderColor: J.border }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: J.textMuted }}>
                Question Panel
              </p>

              {/* Mobile: horizontal scroll strip */}
              <div className="md:hidden flex gap-1.5 overflow-x-auto pb-1">
                {questions.map((_, i) => {
                  const isAns  = i in answers
                  const isFlag = flagged.has(i)
                  const isCur  = i === currentIndex
                  const bg = isFlag ? J.flagged : isAns ? J.answered : J.unanswered
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="shrink-0 rounded-lg text-xs font-bold flex items-center justify-center text-white"
                      style={{ width: 32, height: 32, background: bg,
                        outline: isCur ? '2px solid white' : 'none', outlineOffset: 2 }}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>

              {/* Desktop: 5-column grid */}
              <div className="hidden md:grid gap-2" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
                {questions.map((_, i) => {
                  const isAns  = i in answers
                  const isFlag = flagged.has(i)
                  const isCur  = i === currentIndex
                  const bg = isFlag ? J.flagged : isAns ? J.answered : J.unanswered
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="rounded-lg text-xs font-bold flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      style={{ width: 36, height: 36, background: bg,
                        outline: isCur ? '2px solid white' : 'none', outlineOffset: 2 }}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>

              {/* Legend — desktop only */}
              <div className="hidden md:flex flex-col gap-1.5 mt-4">
                {([
                  { color: J.answered,   label: 'Answered'   },
                  { color: J.unanswered, label: 'Unanswered' },
                  { color: J.flagged,    label: 'Flagged'    },
                ] as const).map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-xs" style={{ color: J.textMuted }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flag button */}
            <button
              onClick={toggleFlag}
              className="rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                border:     `1px solid ${J.flagged}`,
                color:      J.flagged,
                background: isFlagged ? `${J.flagged}22` : 'transparent',
              }}
            >
              {isFlagged ? '◈ Unflag Question' : '◇ Flag Question'}
            </button>
          </aside>
        </div>

        {/* ── Bottom nav ── */}
        <footer
          className="sticky bottom-0 z-30 flex items-center justify-between px-4 sm:px-6"
          style={{ height: 56, background: J.panel, borderTop: `1px solid ${J.border}` }}
        >
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-sm font-semibold rounded-lg px-4 py-2 transition-opacity disabled:opacity-30"
            style={{ color: J.text, background: '#1e3a5f', border: '1px solid #4169E1' }}
          >
            ◀ Previous
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm font-bold rounded-lg px-5 py-2 hover:opacity-90 transition-opacity"
            style={{ background: '#f5a623', color: '#1a1a2e' }}
          >
            Submit Exam
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-1 text-sm font-semibold rounded-lg px-4 py-2 transition-opacity disabled:opacity-30"
            style={{ color: '#fff', background: '#4169E1', border: '1px solid #4169E1' }}
          >
            Next ▶
          </button>
        </footer>
      </div>
    )
  }

  // ── Render: Results ───────────────────────────────────────────────────────

  if (view === 'results') {
    const answeredInResults = sessionAnswers.filter(a => a.selected !== '').length
    const scoreBarColor = pct >= 70 ? J.answered : pct >= 50 ? J.yellow : J.accent

    return (
      <div style={{ background: J.bg, color: J.text, minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={fast}
            className="space-y-6"
          >
            {/* Title */}
            <div className="text-center">
              <h1
                className="text-2xl font-extrabold tracking-widest uppercase"
                style={{ color: J.accent }}
              >
                Examination Complete
              </h1>
              <p className="text-sm mt-1" style={{ color: J.textMuted }}>
                {(SUBJECT_LABELS[selectedSubject] ?? selectedSubject).toUpperCase()} — {selectedExam} {selectedYear}
              </p>
            </div>

            {/* Score card */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: J.panel, border: `1px solid ${J.border}` }}
            >
              <div className="text-5xl font-extrabold mb-1" style={{ color: J.text }}>
                {score}
                <span style={{ color: J.textMuted, fontSize: 28 }}> / {total}</span>
              </div>
              <div className="text-3xl font-bold mb-5" style={{ color: scoreBarColor }}>
                {pct}%
              </div>

              {/* Progress bar */}
              <div
                className="w-full rounded-full overflow-hidden mb-5"
                style={{ height: 12, background: J.border }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: scoreBarColor }}
                />
              </div>

              <div className="flex justify-center gap-10 text-sm mb-4">
                <div>
                  <p style={{ color: J.textMuted }}>Time Used</p>
                  <p className="font-bold" style={{ fontFamily: 'monospace', color: J.text }}>
                    {formatTimeUsed(timeUsed)}
                  </p>
                </div>
                <div>
                  <p style={{ color: J.textMuted }}>Answered</p>
                  <p className="font-bold" style={{ color: J.text }}>
                    {answeredInResults} / {total}
                  </p>
                </div>
              </div>

              <p className="font-semibold" style={{ color: J.text }}>{scoreMessage()}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={tryAgain}
                className="rounded-full py-3 px-8 font-bold text-sm text-white hover:opacity-90 transition-opacity"
                style={{ background: J.accent }}
              >
                Try Again
              </button>
              <button
                onClick={backToSelector}
                className="rounded-full py-3 px-8 font-semibold text-sm hover:opacity-80 transition-opacity"
                style={{ border: `1px solid ${J.border}`, color: J.textMuted, background: J.optionBg }}
              >
                Change Subject
              </button>
            </div>

            {/* App CTA */}
            <div
              className="rounded-2xl p-7 text-center"
              style={{ background: J.sidebar, border: `1px solid ${J.border}` }}
            >
              <h2 className="text-lg font-bold mb-2" style={{ color: J.text }}>
                You just scratched the surface
              </h2>
              <p className="text-sm mb-4" style={{ color: J.textMuted }}>
                The PassVerse app has 26,675 questions, AI explanations, mock exams, score prediction,
                offline mode and daily streaks.
              </p>
              <ul className="text-left text-sm space-y-1.5 mb-5 inline-block">
                {[
                  '26,675 past questions (JAMB, WAEC, NECO, Post-UTME)',
                  'AI explanations for every answer',
                  'Timed mock exam simulation',
                  'Score prediction engine',
                  'Daily streaks & leaderboards',
                  'Works offline',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2" style={{ color: J.textMuted }}>
                    <span style={{ color: J.answered }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href="#"
                  className="inline-block rounded-full py-3 px-8 font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ background: J.accent }}
                >
                  Download Free on Google Play
                </a>
              </div>
            </div>

            {/* Answer review */}
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${J.border}` }}>
              <div
                className="px-6 py-4"
                style={{ background: J.panel, borderBottom: `1px solid ${J.border}` }}
              >
                <h2 className="font-bold" style={{ color: J.text }}>Review Answers</h2>
              </div>

              <div style={{ background: J.bg }}>
                {questions.map((q, idx) => {
                  const ans     = sessionAnswers[idx]
                  const isOpen  = expandedReview === q.id
                  const correct = ans?.is_correct

                  return (
                    <div key={q.id} style={{ borderBottom: `1px solid ${J.border}` }}>
                      <button
                        onClick={() => setExpandedReview(isOpen ? null : q.id)}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:opacity-90 transition-opacity min-h-[52px]"
                      >
                        <span
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: correct ? J.correct : J.wrong }}
                        >
                          {correct ? '✓' : '✗'}
                        </span>
                        <span className="flex-1 text-sm truncate" style={{ color: J.text }}>
                          {idx + 1}. {decodeHtml(q.question).slice(0, 80)}
                          {q.question.length > 80 ? '…' : ''}
                        </span>
                        <span style={{ color: J.textMuted, fontSize: 11 }}>
                          {isOpen ? '▲' : '▼'}
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
                            <div
                              className="px-5 pb-5 pt-3 space-y-2"
                              style={{ borderTop: `1px solid ${J.border}`, background: J.panel }}
                            >
                              <p className="text-sm font-medium mb-3" style={{ color: J.text }}>
                                {decodeHtml(q.question)}
                              </p>
                              {q.options.map(opt => {
                                const isUser  = ans?.selected === opt.index
                                const isRight = opt.index === q.answer
                                const bg     = isRight ? `${J.correct}22` : isUser ? `${J.wrong}22` : 'transparent'
                                const border = isRight ? `1px solid ${J.correct}` : isUser ? `1px solid ${J.wrong}` : `1px solid ${J.border}`
                                const color  = isRight ? J.correct : isUser ? J.wrong : J.textMuted

                                return (
                                  <div
                                    key={opt.index}
                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm"
                                    style={{ background: bg, border, color }}
                                  >
                                    <span
                                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                      style={{ background: isRight ? J.correct : isUser ? J.wrong : J.unanswered }}
                                    >
                                      {opt.index}
                                    </span>
                                    <span className="flex-1">{decodeHtml(opt.value)}</span>
                                    {isRight && (
                                      <span className="font-bold shrink-0" style={{ color: J.correct }}>✓ Correct</span>
                                    )}
                                    {isUser && !isRight && (
                                      <span className="font-bold shrink-0" style={{ color: J.wrong }}>✗ Your answer</span>
                                    )}
                                  </div>
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
          </motion.div>
        </div>
      </div>
    )
  }

  // ── Render: Selector ──────────────────────────────────────────────────────

  return (
    <div style={{ background: J.bg, minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${J.sidebar} 0%, ${J.bg} 100%)` }}
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: J.text }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fast}
          >
            Practice Past Questions Online — Free
          </motion.h1>
          <motion.p
            className="mt-4 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: J.textMuted }}
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: J.textMuted }}>
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
                  onClick={() => {
                    setSelectedExam(exam)
                    setSelectedSubject('')
                    setSelectedYear(null)
                  }}
                  className="rounded-2xl py-4 px-4 text-sm font-semibold transition-all duration-150 min-h-[56px]"
                  style={{
                    background: active ? J.accent : J.panel,
                    color:      active ? '#fff'   : J.text,
                    border:     active ? `2px solid ${J.accent}` : `1px solid ${J.border}`,
                    boxShadow:  active ? `0 0 14px ${J.accent}55` : 'none',
                  }}
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
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: J.textMuted }}>
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
                      onClick={() => { setSelectedSubject(sub); setSelectedYear(null) }}
                      className="flex flex-col items-center gap-2 rounded-2xl py-4 px-3 transition-all duration-150 min-h-[80px]"
                      style={{
                        background: active ? J.optionSelected : J.panel,
                        border:     active ? `2px solid ${J.accent}` : `1px solid ${J.border}`,
                        boxShadow:  active ? `0 0 10px ${J.accent}44` : 'none',
                      }}
                    >
                      <span className="text-2xl">{SUBJECT_ICONS[sub] ?? '📖'}</span>
                      <span
                        className="text-xs font-semibold text-center leading-tight"
                        style={{ color: active ? J.text : J.textMuted }}
                      >
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
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: J.textMuted }}>
                Step 3: Choose year
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {years.map((year, i) => {
                  const active = selectedYear === year
                  return (
                    <motion.button
                      key={year}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={withDelay(i * 0.04)}
                      onClick={() => setSelectedYear(year)}
                      className="shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-150 min-h-[44px]"
                      style={{
                        background: active ? J.accent : J.panel,
                        color:      active ? '#fff'   : J.textMuted,
                        border:     active ? `1px solid ${J.accent}` : `1px solid ${J.border}`,
                      }}
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
                className="w-full max-w-sm rounded-full py-4 text-lg font-bold text-white min-h-[56px] hover:opacity-90 transition-opacity"
                style={{ background: J.accent }}
              >
                Start Practice →
              </button>
              <p className="text-xs text-center" style={{ color: J.textMuted }}>
                No account needed · 10 free questions · Download the app for all questions
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </div>
  )
}

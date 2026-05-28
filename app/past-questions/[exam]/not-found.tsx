import Link from 'next/link';
import { EXAMS } from '@/lib/pastQuestions';

export default function ExamNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
        <h1 className="text-2xl font-extrabold text-[var(--color-gray-900)] mb-3">
          Exam not found
        </h1>
        <p className="text-[var(--color-gray-600)] mb-8">
          That exam doesn&apos;t exist in our system. Pick one of the available exams below.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {EXAMS.map((exam) => (
            <Link
              key={exam.key}
              href={`/past-questions/${exam.key}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-gray-100)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all duration-200"
            >
              <span className="text-2xl" aria-hidden="true">{exam.icon}</span>
              <span className="text-sm font-semibold text-[var(--color-gray-900)]">{exam.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/past-questions"
          className="rounded-full bg-[var(--color-primary)] text-white font-semibold px-6 py-3 text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          ← All Past Questions
        </Link>
      </div>
    </div>
  );
}

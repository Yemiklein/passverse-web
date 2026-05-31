'use client';

import { useState } from 'react';
import type { PracticeQuestion } from '@/data/practiceQuestions';

interface Props {
  questions: PracticeQuestion[];
  exam: string;
  subject: string;
  year: string;
  examLabel: string;
  subjectLabel: string;
}

const LINE_H = 5;       // mm per line at 10pt
const MARGIN_L = 20;
const MARGIN_R = 20;
const MARGIN_TOP = 25;
const MARGIN_BOTTOM = 22;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

export function DownloadButton({
  questions,
  exam,
  subject,
  year,
  examLabel,
  subjectLabel,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');

      // ── COVER PAGE ──────────────────────────────────────────────────────────
      doc.setFillColor(26, 26, 46);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(40);
      doc.text('PASSVERSE', PAGE_W / 2, 80, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(13);
      doc.setTextColor(180, 180, 210);
      doc.text("Nigeria's #1 Exam Prep App", PAGE_W / 2, 93, { align: 'center' });

      doc.setDrawColor(65, 105, 225);
      doc.setLineWidth(0.6);
      doc.line(MARGIN_L + 20, 103, PAGE_W - MARGIN_R - 20, 103);

      doc.setTextColor(65, 105, 225);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text(
        `${examLabel} ${subjectLabel.toUpperCase()}`,
        PAGE_W / 2,
        122,
        { align: 'center' },
      );

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text(`${year} Past Questions`, PAGE_W / 2, 137, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.setTextColor(180, 180, 210);
      doc.text('& Answers', PAGE_W / 2, 150, { align: 'center' });

      doc.setFontSize(12);
      doc.setTextColor(130, 130, 170);
      doc.text(
        `${questions.length} Questions  |  Free Download`,
        PAGE_W / 2,
        170,
        { align: 'center' },
      );

      doc.setFontSize(11);
      doc.setTextColor(130, 130, 170);
      doc.text('passverse.com.ng', PAGE_W / 2, PAGE_H - 28, { align: 'center' });

      // ── QUESTION PAGES ───────────────────────────────────────────────────────
      const headerLabel = `PassVerse · ${examLabel} ${subjectLabel} ${year}`;

      function addHeader(pageNum: number) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(110, 110, 130);
        doc.text(headerLabel, MARGIN_L, 12);
        doc.text(`Page ${pageNum}`, PAGE_W - MARGIN_R, 12, { align: 'right' });
        doc.setDrawColor(210, 210, 220);
        doc.setLineWidth(0.25);
        doc.line(MARGIN_L, 15.5, PAGE_W - MARGIN_R, 15.5);
      }

      let pageNum = 2;
      doc.addPage();
      addHeader(pageNum);
      let y = MARGIN_TOP;

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];

        const qLines = doc.splitTextToSize(q.question, CONTENT_W);
        const optLines = q.options.flatMap((opt) =>
          doc.splitTextToSize(`  ${opt.index}.  ${opt.value}`, CONTENT_W - 6),
        );
        const blockH = 7 + qLines.length * LINE_H + optLines.length * LINE_H + 8;

        if (y + blockH > PAGE_H - MARGIN_BOTTOM) {
          pageNum++;
          doc.addPage();
          addHeader(pageNum);
          y = MARGIN_TOP;
        }

        // Question number
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 70);
        doc.text(`Question ${i + 1}`, MARGIN_L, y);
        y += 5.5;

        // Question text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(20, 20, 50);
        doc.text(qLines, MARGIN_L, y);
        y += qLines.length * LINE_H + 2;

        // Options
        for (const opt of q.options) {
          const wrapped = doc.splitTextToSize(
            `  ${opt.index}.  ${opt.value}`,
            CONTENT_W - 6,
          );
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(40, 40, 90);
          doc.text(wrapped, MARGIN_L + 3, y);
          y += wrapped.length * LINE_H;
        }

        // Separator
        y += 2;
        doc.setDrawColor(215, 215, 225);
        doc.setLineWidth(0.2);
        doc.line(MARGIN_L, y, PAGE_W - MARGIN_R, y);
        y += 6;
      }

      // ── ANSWER KEY PAGE ─────────────────────────────────────────────────────
      pageNum++;
      doc.addPage();
      addHeader(pageNum);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(30, 30, 70);
      doc.text('ANSWER KEY', MARGIN_L, MARGIN_TOP);

      const COLS = 4;
      const COL_W = CONTENT_W / COLS;
      const ROW_H = 7;
      const ansStartY = MARGIN_TOP + 12;

      for (let i = 0; i < questions.length; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const ax = MARGIN_L + col * COL_W;
        const ay = ansStartY + row * ROW_H;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 70);
        doc.text(`${i + 1}.  ${questions[i].answer}`, ax, ay);
      }

      const ctaY = ansStartY + Math.ceil(questions.length / COLS) * ROW_H + 14;

      doc.setDrawColor(65, 105, 225);
      doc.setLineWidth(0.4);
      doc.line(MARGIN_L, ctaY, PAGE_W - MARGIN_R, ctaY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 110);
      doc.text('Practice these questions interactively at:', MARGIN_L, ctaY + 9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(65, 105, 225);
      doc.text('passverse.com.ng/practice', MARGIN_L, ctaY + 15.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 120);
      const cta2 = doc.splitTextToSize(
        'Download the PassVerse App for full CBT simulation, AI explanations, and 26,000+ questions.',
        CONTENT_W,
      );
      doc.text(cta2, MARGIN_L, ctaY + 24);

      doc.save(`passverse-${exam}-${subject}-${year}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setLoading(false);
    }
  }

  if (questions.length === 0) return null;

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      aria-label={`Download ${examLabel} ${subjectLabel} ${year} past questions as PDF`}
      className="inline-flex items-center gap-2 rounded-full bg-[#4169E1] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating PDF…
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}

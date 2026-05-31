export interface ExamDate {
  id: string;
  name: string;
  shortName: string;
  date: string;
  endDate?: string;
  description: string;
  color: string;
  icon: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationDeadline?: string;
  practiceUrl: string;
}

export const EXAM_DATES: ExamDate[] = [
  {
    id: 'waec-2026',
    name: 'WAEC WASSCE 2026',
    shortName: 'WAEC',
    date: '2026-04-21',
    endDate: '2026-06-19',
    description: 'West African Senior School Certificate Examination',
    color: '#1D9E75',
    icon: '📝',
    status: 'ongoing',
    practiceUrl: '/practice',
  },
  {
    id: 'waec-maths-2026',
    name: 'WAEC Mathematics 2026',
    shortName: 'WAEC Maths',
    date: '2026-06-03',
    description: 'WAEC Mathematics Paper (Essay & Objective)',
    color: '#1D9E75',
    icon: '🔢',
    status: 'upcoming',
    practiceUrl: '/practice',
  },
  {
    id: 'waec-english-2026',
    name: 'WAEC English 2026',
    shortName: 'WAEC English',
    date: '2026-06-10',
    description: 'WAEC English Language Paper',
    color: '#1D9E75',
    icon: '📖',
    status: 'upcoming',
    practiceUrl: '/practice',
  },
  {
    id: 'neco-2026',
    name: 'NECO SSCE 2026',
    shortName: 'NECO',
    date: '2026-07-07',
    description: 'National Examinations Council SSCE',
    color: '#7C3AED',
    icon: '🎓',
    status: 'upcoming',
    practiceUrl: '/practice',
  },
  {
    id: 'jamb-2027',
    name: 'JAMB UTME 2027',
    shortName: 'JAMB',
    date: '2027-04-16',
    description: 'Unified Tertiary Matriculation Examination',
    color: '#4169E1',
    icon: '🏆',
    status: 'upcoming',
    registrationDeadline: '2027-02-28',
    practiceUrl: '/practice',
  },
];

// Derived helpers
export const UPCOMING_EXAMS = EXAM_DATES.filter(
  (e) => e.status === 'upcoming' || e.status === 'ongoing',
);

export const COMPACT_EXAMS = UPCOMING_EXAMS.slice(0, 3);

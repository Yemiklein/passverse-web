export type UniversityType = 'federal' | 'state' | 'private'

export interface DepartmentalCutoff {
  course: string
  faculty: string
  cutoff: number
  note?: string
}

export interface University {
  id: string
  name: string
  shortName: string
  type: UniversityType
  state: string
  generalCutoff: number
  session: string
  postUtmeRequired: boolean
  website: string
  departments: DepartmentalCutoff[]
  note?: string
}

export const UNIVERSITIES: University[] = [

  // ── TOP 10 FEDERAL UNIVERSITIES (with departmental data) ──────────────

  {
    id: 'unilag',
    name: 'University of Lagos',
    shortName: 'UNILAG',
    type: 'federal',
    state: 'Lagos',
    generalCutoff: 200,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://unilag.edu.ng',
    note: 'UNILAG uses an aggregate system combining UTME (60%) + Post-UTME (40%). Meeting the cut-off does not guarantee admission.',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Clinical Sciences', cutoff: 280, note: 'Top percentile required' },
      { course: 'Law', faculty: 'Law', cutoff: 260 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 260 },
      { course: 'Nursing Science', faculty: 'Clinical Sciences', cutoff: 250 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 240 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 230 },
      { course: 'Accounting', faculty: 'Business Administration', cutoff: 220 },
      { course: 'Economics', faculty: 'Social Sciences', cutoff: 220 },
      { course: 'Architecture', faculty: 'Environmental Sciences', cutoff: 220 },
      { course: 'Mass Communication', faculty: 'Social Sciences', cutoff: 210 },
      { course: 'Education', faculty: 'Education', cutoff: 200 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 200 },
    ],
  },

  {
    id: 'ui',
    name: 'University of Ibadan',
    shortName: 'UI',
    type: 'federal',
    state: 'Oyo',
    generalCutoff: 200,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://ui.edu.ng',
    note: 'UI is highly competitive. Scores above 220 are recommended for most programmes.',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 280, note: 'One of the most competitive in Nigeria' },
      { course: 'Law', faculty: 'Law', cutoff: 260 },
      { course: 'Dentistry', faculty: 'Dentistry', cutoff: 270 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 250 },
      { course: 'Nursing', faculty: 'Medicine', cutoff: 240 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 230 },
      { course: 'Engineering (all)', faculty: 'Technology', cutoff: 220 },
      { course: 'Economics', faculty: 'Social Sciences', cutoff: 220 },
      { course: 'Accounting', faculty: 'Management Sciences', cutoff: 220 },
      { course: 'Education', faculty: 'Education', cutoff: 200 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 200 },
    ],
  },

  {
    id: 'oau',
    name: 'Obafemi Awolowo University',
    shortName: 'OAU',
    type: 'federal',
    state: 'Osun',
    generalCutoff: 200,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://oauife.edu.ng',
    note: 'OAU Ile-Ife is highly competitive. Medicine and Law are the most sought-after programmes.',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Clinical Sciences', cutoff: 280 },
      { course: 'Law', faculty: 'Law', cutoff: 260 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 250 },
      { course: 'Dentistry', faculty: 'Dentistry', cutoff: 260 },
      { course: 'Architecture', faculty: 'Environmental Design', cutoff: 230 },
      { course: 'Engineering (all)', faculty: 'Technology', cutoff: 220 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 230 },
      { course: 'Accounting', faculty: 'Administration', cutoff: 220 },
      { course: 'Economics', faculty: 'Administration', cutoff: 220 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 200 },
    ],
  },

  {
    id: 'abu',
    name: 'Ahmadu Bello University',
    shortName: 'ABU',
    type: 'federal',
    state: 'Kaduna',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://abu.edu.ng',
    note: 'ABU Zaria is the largest university in Nigeria. Catchment area applies for some programmes.',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 260 },
      { course: 'Law', faculty: 'Law', cutoff: 240 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 240 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 220 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 210 },
      { course: 'Accounting', faculty: 'Administration', cutoff: 200 },
      { course: 'Architecture', faculty: 'Environmental Design', cutoff: 210 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'unn',
    name: 'University of Nigeria, Nsukka',
    shortName: 'UNN',
    type: 'federal',
    state: 'Enugu',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://unn.edu.ng',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 260 },
      { course: 'Law', faculty: 'Law', cutoff: 240 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 240 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 210 },
      { course: 'Computer Science', faculty: 'Physical Sciences', cutoff: 210 },
      { course: 'Accounting', faculty: 'Business Administration', cutoff: 200 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'uniben',
    name: 'University of Benin',
    shortName: 'UNIBEN',
    type: 'federal',
    state: 'Edo',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://uniben.edu.ng',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 260 },
      { course: 'Law', faculty: 'Law', cutoff: 240 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 240 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 210 },
      { course: 'Computer Science', faculty: 'Physical Sciences', cutoff: 210 },
      { course: 'Accounting', faculty: 'Management Sciences', cutoff: 200 },
      { course: 'Architecture', faculty: 'Environmental Sciences', cutoff: 210 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'unilorin',
    name: 'University of Ilorin',
    shortName: 'UNILORIN',
    type: 'federal',
    state: 'Kwara',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://unilorin.edu.ng',
    note: 'UNILORIN uses 50% JAMB + 50% Post-UTME aggregate for admission.',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 260, note: 'Very competitive' },
      { course: 'Law', faculty: 'Law', cutoff: 230, note: 'Typically 230–250' },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 240 },
      { course: 'Nursing Science', faculty: 'Medicine', cutoff: 220 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 200 },
      { course: 'Computer Science', faculty: 'Communication & Information Sciences', cutoff: 210 },
      { course: 'Accounting', faculty: 'Management Sciences', cutoff: 200 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'uniport',
    name: 'University of Port Harcourt',
    shortName: 'UNIPORT',
    type: 'federal',
    state: 'Rivers',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://uniport.edu.ng',
    departments: [
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 250 },
      { course: 'Law', faculty: 'Law', cutoff: 230 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 230 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 200 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 200 },
      { course: 'Accounting', faculty: 'Management Sciences', cutoff: 190 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'futa',
    name: 'Federal University of Technology, Akure',
    shortName: 'FUTA',
    type: 'federal',
    state: 'Ondo',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://futa.edu.ng',
    note: 'FUTA specialises in technology programmes. No Law or Medicine offered.',
    departments: [
      { course: 'Computer Science', faculty: 'Science', cutoff: 220 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 210 },
      { course: 'Architecture', faculty: 'Environmental Technology', cutoff: 200 },
      { course: 'Quantity Surveying', faculty: 'Environmental Technology', cutoff: 200 },
      { course: 'Physics', faculty: 'Science', cutoff: 190 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  {
    id: 'futo',
    name: 'Federal University of Technology, Owerri',
    shortName: 'FUTO',
    type: 'federal',
    state: 'Imo',
    generalCutoff: 160,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://futo.edu.ng',
    departments: [
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 200 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 190 },
      { course: 'Architecture', faculty: 'Environmental Technology', cutoff: 190 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 160 },
    ],
  },

  // ── ADDITIONAL FEDERAL UNIVERSITIES (institution-level only) ───────────

  { id: 'atbu', name: 'Abubakar Tafawa Balewa University', shortName: 'ATBU', type: 'federal', state: 'Bauchi', generalCutoff: 170, session: '2025/2026', postUtmeRequired: true, website: 'https://atbu.edu.ng', departments: [] },
  { id: 'buk', name: 'Bayero University Kano', shortName: 'BUK', type: 'federal', state: 'Kano', generalCutoff: 180, session: '2025/2026', postUtmeRequired: true, website: 'https://buk.edu.ng', departments: [] },
  { id: 'futminna', name: 'Federal University of Technology, Minna', shortName: 'FUTMINNA', type: 'federal', state: 'Niger', generalCutoff: 150, session: '2025/2026', postUtmeRequired: true, website: 'https://futminna.edu.ng', departments: [] },
  { id: 'fupre', name: 'Federal University of Petroleum Resources, Effurun', shortName: 'FUPRE', type: 'federal', state: 'Delta', generalCutoff: 170, session: '2025/2026', postUtmeRequired: true, website: 'https://fupre.edu.ng', departments: [] },
  { id: 'fugashua', name: 'Federal University Gashua', shortName: 'FUGASHUA', type: 'federal', state: 'Yobe', generalCutoff: 140, session: '2025/2026', postUtmeRequired: true, website: 'https://fugashua.edu.ng', departments: [] },
  { id: 'fulafia', name: 'Federal University, Lafia', shortName: 'FULAFIA', type: 'federal', state: 'Nasarawa', generalCutoff: 170, session: '2025/2026', postUtmeRequired: true, website: 'https://fulafia.edu.ng', departments: [] },
  { id: 'fulokoja', name: 'Federal University, Lokoja', shortName: 'FULOKOJA', type: 'federal', state: 'Kogi', generalCutoff: 170, session: '2025/2026', postUtmeRequired: true, website: 'https://fulokoja.edu.ng', departments: [] },
  { id: 'funai', name: 'Alex Ekwueme University, Ndufu-Alike', shortName: 'FUNAI', type: 'federal', state: 'Ebonyi', generalCutoff: 150, session: '2025/2026', postUtmeRequired: true, website: 'https://funai.edu.ng', departments: [] },
  { id: 'fuoye', name: 'Federal University, Oye-Ekiti', shortName: 'FUOYE', type: 'federal', state: 'Ekiti', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://fuoye.edu.ng', departments: [] },

  // ── POPULAR STATE UNIVERSITIES ─────────────────────────────────────────

  {
    id: 'lasu',
    name: 'Lagos State University',
    shortName: 'LASU',
    type: 'state',
    state: 'Lagos',
    generalCutoff: 180,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://lasu.edu.ng',
    departments: [
      { course: 'Law', faculty: 'Law', cutoff: 220 },
      { course: 'Medicine & Surgery', faculty: 'Medicine', cutoff: 250 },
      { course: 'Pharmacy', faculty: 'Pharmacy', cutoff: 220 },
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 200 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 200 },
      { course: 'Accounting', faculty: 'Management Sciences', cutoff: 190 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 180 },
    ],
  },

  { id: 'lasustech', name: 'Lagos State University of Science and Technology', shortName: 'LASUSTECH', type: 'state', state: 'Lagos', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://lasustech.edu.ng', departments: [] },
  { id: 'aaua', name: 'Adekunle Ajasin University, Akungba', shortName: 'AAUA', type: 'state', state: 'Ondo', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://aaua.edu.ng', departments: [] },
  { id: 'aau', name: 'Ambrose Alli University, Ekpoma', shortName: 'AAU', type: 'state', state: 'Edo', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://aauekpoma.edu.ng', departments: [] },
  { id: 'bsum', name: 'Benue State University', shortName: 'BSUM', type: 'state', state: 'Benue', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://bsum.edu.ng', departments: [] },
  { id: 'eksu', name: 'Ekiti State University', shortName: 'EKSU', type: 'state', state: 'Ekiti', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://eksu.edu.ng', departments: [] },
  { id: 'kwasu', name: 'Kwara State University', shortName: 'KWASU', type: 'state', state: 'Kwara', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://kwasu.edu.ng', departments: [] },
  { id: 'rsust', name: 'Rivers State University', shortName: 'RSU', type: 'state', state: 'Rivers', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://rsu.edu.ng', departments: [] },
  { id: 'absu', name: 'Abia State University, Uturu', shortName: 'ABSU', type: 'state', state: 'Abia', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://absu.edu.ng', departments: [] },
  { id: 'aksu', name: 'Akwa Ibom State University', shortName: 'AKSU', type: 'state', state: 'Akwa Ibom', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://aksu.edu.ng', departments: [] },
  { id: 'uniosun', name: 'Osun State University', shortName: 'UNIOSUN', type: 'state', state: 'Osun', generalCutoff: 160, session: '2025/2026', postUtmeRequired: true, website: 'https://uniosun.edu.ng', departments: [] },

  // ── POPULAR PRIVATE UNIVERSITIES ───────────────────────────────────────

  {
    id: 'covenant',
    name: 'Covenant University',
    shortName: 'CU',
    type: 'private',
    state: 'Ogun',
    generalCutoff: 150,
    session: '2025/2026',
    postUtmeRequired: true,
    website: 'https://covenantuniversity.edu.ng',
    note: 'Private university with additional institutional screening.',
    departments: [
      { course: 'Engineering (all)', faculty: 'Engineering', cutoff: 200 },
      { course: 'Computer Science', faculty: 'Science', cutoff: 180 },
      { course: 'Law', faculty: 'Law', cutoff: 180 },
      { course: 'All Other Courses', faculty: 'Various', cutoff: 150 },
    ],
  },
  { id: 'babcock', name: 'Babcock University', shortName: 'BABCOCK', type: 'private', state: 'Ogun', generalCutoff: 150, session: '2025/2026', postUtmeRequired: true, website: 'https://babcock.edu.ng', departments: [] },
  { id: 'pau', name: 'Pan-Atlantic University', shortName: 'PAU', type: 'private', state: 'Lagos', generalCutoff: 150, session: '2025/2026', postUtmeRequired: true, website: 'https://pau.edu.ng', departments: [] },
  { id: 'afe-babalola', name: 'Afe Babalola University', shortName: 'ABUAD', type: 'private', state: 'Ekiti', generalCutoff: 150, session: '2025/2026', postUtmeRequired: true, website: 'https://abuad.edu.ng', departments: [] },
]

export const getUniversity = (id: string) =>
  UNIVERSITIES.find(u => u.id === id)

export const getUniversitiesByType = (type: UniversityType) =>
  UNIVERSITIES.filter(u => u.type === type)

export const searchUniversities = (query: string) =>
  UNIVERSITIES.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.shortName.toLowerCase().includes(query.toLowerCase())
  )

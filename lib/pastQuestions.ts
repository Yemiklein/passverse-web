export type ExamType = 'jamb' | 'waec' | 'gce' | 'neco' | 'post-utme';

export interface PastQuestion {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface SubjectMeta {
  key: string;
  label: string;
  icon: string;
  examTypes: ExamType[];
}

export interface ExamMeta {
  key: ExamType;
  label: string;
  fullName: string;
  icon: string;
  color: string;
  totalQuestions: number;
  yearRange: string;
}

export const EXAMS: ExamMeta[] = [
  {
    key: 'jamb',
    label: 'JAMB',
    fullName: 'Joint Admissions and Matriculation Board (UTME)',
    icon: '🎓',
    color: 'blue',
    totalQuestions: 13955,
    yearRange: '2001 – 2025',
  },
  {
    key: 'waec',
    label: 'WAEC',
    fullName: 'West African Examinations Council (WASSCE)',
    icon: '📜',
    color: 'teal',
    totalQuestions: 7160,
    yearRange: '2001 – 2025',
  },
  {
    key: 'gce',
    label: 'GCE',
    fullName: "General Certificate of Education (O'Level)",
    icon: '📋',
    color: 'amber',
    totalQuestions: 3200,
    yearRange: '2001 – 2025',
  },
  {
    key: 'neco',
    label: 'NECO',
    fullName: 'National Examinations Council',
    icon: '📗',
    color: 'coral',
    totalQuestions: 2800,
    yearRange: '2001 – 2025',
  },
  {
    key: 'post-utme',
    label: 'Post-UTME',
    fullName: 'Post-UTME Screening Examination',
    icon: '🏫',
    color: 'purple',
    totalQuestions: 5560,
    yearRange: '2010 – 2025',
  },
];

export const SUBJECTS: SubjectMeta[] = [
  { key: 'english',       label: 'English Language',              icon: '📝', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'mathematics',   label: 'Mathematics',                   icon: '🔢', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'biology',       label: 'Biology',                       icon: '🧬', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'physics',       label: 'Physics',                       icon: '⚡', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'chemistry',     label: 'Chemistry',                     icon: '🧪', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'economics',     label: 'Economics',                     icon: '📈', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'government',    label: 'Government',                    icon: '🏛️', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'commerce',      label: 'Commerce',                      icon: '💼', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'accounting',    label: 'Accounting',                    icon: '📊', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'geography',     label: 'Geography',                     icon: '🌍', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'literature',    label: 'Literature in English',         icon: '📚', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'crk',           label: 'Christian Religious Knowledge', icon: '✝️', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'irk',           label: 'Islamic Religious Knowledge',   icon: '☪️', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'history',       label: 'History',                       icon: '🏺', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'civiledu',      label: 'Civic Education',               icon: '🗳️', examTypes: ['jamb', 'waec', 'gce', 'neco'] },
  { key: 'currentaffairs',label: 'Current Affairs',               icon: '📰', examTypes: ['jamb', 'neco'] },
];

export const YEARS = Array.from({ length: 25 }, (_, i) => 2025 - i);

export const SAMPLE_QUESTIONS: Record<string, PastQuestion[]> = {
  'jamb-mathematics': [
    {
      id: 'jamb-math-1',
      question: 'If 2x − 3 = 7, find the value of x.',
      options: { A: '2', B: '5', C: '−2', D: '10' },
      answer: 'B',
      explanation: 'Adding 3 to both sides: 2x = 10. Dividing by 2: x = 5.',
    },
    {
      id: 'jamb-math-2',
      question: 'Find the gradient of the straight line 4y = 8x + 12.',
      options: { A: '3', B: '−2', C: '2', D: '4' },
      answer: 'C',
      explanation: 'Dividing both sides by 4: y = 2x + 3. The gradient (coefficient of x) is 2.',
    },
    {
      id: 'jamb-math-3',
      question: 'The sum of the interior angles of a polygon is 1080°. How many sides does it have?',
      options: { A: '6', B: '8', C: '10', D: '7' },
      answer: 'B',
      explanation: 'Using (n − 2) × 180° = 1080°: n − 2 = 6, so n = 8 sides.',
    },
    {
      id: 'jamb-math-4',
      question: 'Simplify log₂8 + log₂4.',
      options: { A: '4', B: '6', C: '5', D: '3' },
      answer: 'C',
      explanation: 'log₂8 = 3 (since 2³ = 8) and log₂4 = 2 (since 2² = 4). Total = 3 + 2 = 5.',
    },
    {
      id: 'jamb-math-5',
      question: 'What is 15% of ₦8,000?',
      options: { A: '₦1,200', B: '₦800', C: '₦1,500', D: '₦1,000' },
      answer: 'A',
      explanation: '15 ÷ 100 × 8,000 = ₦1,200.',
    },
  ],

  'jamb-english': [
    {
      id: 'jamb-eng-1',
      question: 'Choose the word most nearly opposite in meaning to "verbose".',
      options: { A: 'Talkative', B: 'Concise', C: 'Lengthy', D: 'Eloquent' },
      answer: 'B',
      explanation: '"Verbose" means using more words than needed. "Concise" — brief and to the point — is its antonym.',
    },
    {
      id: 'jamb-eng-2',
      question: 'In the sentence "The committee has submitted its report", what is the subject?',
      options: { A: 'report', B: 'committee', C: 'submitted', D: 'its' },
      answer: 'B',
      explanation: 'The subject performs the verb\'s action. "The committee" is the noun that performs the action of submitting.',
    },
    {
      id: 'jamb-eng-3',
      question: 'Select the sentence with the correct use of the apostrophe.',
      options: { A: "Its' time to go", B: "The boys' team won", C: "The boys team won", D: "Its time to go" },
      answer: 'B',
      explanation: '"boys\'" correctly shows possession by a plural noun ending in \'s\'. "Its" (without apostrophe) is the possessive pronoun; "it\'s" means "it is".',
    },
    {
      id: 'jamb-eng-4',
      question: 'Choose the correct word: "The principal _____ the student for his bravery."',
      options: { A: 'complement', B: 'commended', C: 'commented', D: 'comprehended' },
      answer: 'B',
      explanation: '"Commend" means to formally praise. "Complement" means to complete, "commented" means to remark, "comprehended" means to understand.',
    },
    {
      id: 'jamb-eng-5',
      question: 'Identify the figure of speech in: "The stars danced in the sky."',
      options: { A: 'Simile', B: 'Alliteration', C: 'Personification', D: 'Metaphor' },
      answer: 'C',
      explanation: 'Personification attributes a human quality (dancing) to a non-human thing (stars).',
    },
  ],

  'jamb-biology': [
    {
      id: 'jamb-bio-1',
      question: 'Which cell organelle is responsible for protein synthesis?',
      options: { A: 'Mitochondria', B: 'Nucleus', C: 'Ribosome', D: 'Golgi apparatus' },
      answer: 'C',
      explanation: 'Ribosomes read mRNA strands and assemble amino acids into proteins. They are found free in the cytoplasm and on the rough ER.',
    },
    {
      id: 'jamb-bio-2',
      question: 'Which blood group is known as the universal donor?',
      options: { A: 'A', B: 'B', C: 'AB', D: 'O' },
      answer: 'D',
      explanation: 'Blood group O negative lacks A, B, and Rh antigens, so it can be given to patients of any blood group in emergency situations.',
    },
    {
      id: 'jamb-bio-3',
      question: 'How many chromosomes are found in a normal human body cell?',
      options: { A: '23', B: '46', C: '44', D: '48' },
      answer: 'B',
      explanation: 'Human somatic (body) cells are diploid and contain 46 chromosomes arranged in 23 homologous pairs.',
    },
    {
      id: 'jamb-bio-4',
      question: 'The process by which plants manufacture their own food using sunlight is called:',
      options: { A: 'Respiration', B: 'Transpiration', C: 'Photosynthesis', D: 'Osmosis' },
      answer: 'C',
      explanation: 'Photosynthesis uses chlorophyll, sunlight, CO₂, and water to produce glucose and oxygen. The equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.',
    },
    {
      id: 'jamb-bio-5',
      question: 'Which part of the nephron is primarily responsible for reabsorbing glucose, amino acids, and water?',
      options: { A: 'Glomerulus', B: "Bowman's capsule", C: 'Loop of Henle', D: 'Proximal convoluted tubule' },
      answer: 'D',
      explanation: 'The proximal convoluted tubule reabsorbs ~65% of filtered water and virtually all glucose and amino acids back into the bloodstream.',
    },
  ],

  'jamb-physics': [
    {
      id: 'jamb-phy-1',
      question: 'A body is said to be in equilibrium when the resultant of all forces acting on it is:',
      options: { A: 'Equal to gravity', B: 'Zero', C: 'At its maximum', D: 'Equal to friction' },
      answer: 'B',
      explanation: 'For translational equilibrium, the vector sum of all forces (net force) must equal zero — the body neither accelerates nor decelerates.',
    },
    {
      id: 'jamb-phy-2',
      question: 'Which of the following is a vector quantity?',
      options: { A: 'Speed', B: 'Mass', C: 'Temperature', D: 'Velocity' },
      answer: 'D',
      explanation: 'Velocity has both magnitude and direction — it is a vector. Speed, mass, and temperature have magnitude only (scalars).',
    },
    {
      id: 'jamb-phy-3',
      question: 'A wave has a frequency of 50 Hz and a wavelength of 4 m. What is its speed?',
      options: { A: '12.5 m/s', B: '54 m/s', C: '200 m/s', D: '46 m/s' },
      answer: 'C',
      explanation: 'Wave speed v = frequency × wavelength = 50 Hz × 4 m = 200 m/s.',
    },
    {
      id: 'jamb-phy-4',
      question: "Newton's Third Law of Motion states that for every action there is:",
      options: { A: 'A greater reaction', B: 'No reaction', C: 'An equal and opposite reaction', D: 'A proportional reaction' },
      answer: 'C',
      explanation: "Newton's Third Law: forces always act in equal and opposite pairs on two different bodies. If A exerts a force on B, B exerts an equal force back on A.",
    },
    {
      id: 'jamb-phy-5',
      question: 'What is the SI unit of electric current?',
      options: { A: 'Volt', B: 'Watt', C: 'Ohm', D: 'Ampere' },
      answer: 'D',
      explanation: 'The ampere (A) is the SI base unit of electric current, defined as one coulomb of charge flowing per second.',
    },
  ],

  'jamb-chemistry': [
    {
      id: 'jamb-chem-1',
      question: 'What is the atomic number of Carbon?',
      options: { A: '6', B: '12', C: '14', D: '8' },
      answer: 'A',
      explanation: 'Atomic number = number of protons. Carbon has 6 protons. (12 is its mass number — the sum of protons and neutrons.)',
    },
    {
      id: 'jamb-chem-2',
      question: 'In a neutralisation reaction, an acid reacts with a base to form:',
      options: { A: 'Salt only', B: 'Water only', C: 'Salt and water', D: 'Acid and a new base' },
      answer: 'C',
      explanation: 'Neutralisation: Acid + Base → Salt + Water. Both products form simultaneously in every neutralisation reaction.',
    },
    {
      id: 'jamb-chem-3',
      question: 'The pH of a neutral solution at 25°C is:',
      options: { A: '0', B: '7', C: '14', D: '1' },
      answer: 'B',
      explanation: 'At 25°C, a neutral solution has [H⁺] = [OH⁻] = 10⁻⁷ mol/L, giving pH = −log(10⁻⁷) = 7.',
    },
    {
      id: 'jamb-chem-4',
      question: 'Which element has the chemical symbol Fe?',
      options: { A: 'Fluorine', B: 'Francium', C: 'Iron', D: 'Fermium' },
      answer: 'C',
      explanation: 'Fe comes from "Ferrum", the Latin name for Iron. Iron is a transition metal with atomic number 26.',
    },
    {
      id: 'jamb-chem-5',
      question: 'Which of the following is the correct IUPAC name for CH₃CH₂OH?',
      options: { A: 'Methanol', B: 'Propanol', C: 'Ethanol', D: 'Butanol' },
      answer: 'C',
      explanation: 'CH₃CH₂OH has a two-carbon chain (eth-) with a hydroxyl group (-ol), making it ethanol. Methanol has 1C, propanol 3C, butanol 4C.',
    },
  ],

  'waec-mathematics': [
    {
      id: 'waec-math-1',
      question: 'Find the value of x if 3x + 6 = 21.',
      options: { A: '9', B: '5', C: '3', D: '7' },
      answer: 'B',
      explanation: 'Subtract 6 from both sides: 3x = 15. Divide by 3: x = 5.',
    },
    {
      id: 'waec-math-2',
      question: 'The simple interest on ₦5,000 at 8% per annum for 3 years is:',
      options: { A: '₦1,200', B: '₦1,500', C: '₦2,000', D: '₦400' },
      answer: 'A',
      explanation: 'SI = (P × R × T) ÷ 100 = (5,000 × 8 × 3) ÷ 100 = 120,000 ÷ 100 = ₦1,200.',
    },
    {
      id: 'waec-math-3',
      question: 'What is the area of a circle with diameter 14 cm? (Take π = 22/7)',
      options: { A: '44 cm²', B: '154 cm²', C: '88 cm²', D: '616 cm²' },
      answer: 'B',
      explanation: 'Radius = 14 ÷ 2 = 7 cm. Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm².',
    },
    {
      id: 'waec-math-4',
      question: 'Factorise completely: x² − 5x + 6.',
      options: { A: '(x − 2)(x − 3)', B: '(x + 2)(x + 3)', C: '(x − 2)(x + 3)', D: '(x + 2)(x − 3)' },
      answer: 'A',
      explanation: 'Find two numbers that multiply to +6 and add to −5: those are −2 and −3. So x² − 5x + 6 = (x − 2)(x − 3).',
    },
    {
      id: 'waec-math-5',
      question: 'Convert 110₂ (base 2) to base 10.',
      options: { A: '8', B: '5', C: '6', D: '4' },
      answer: 'C',
      explanation: '110₂ = (1 × 2²) + (1 × 2¹) + (0 × 2⁰) = 4 + 2 + 0 = 6.',
    },
  ],

  'waec-biology': [
    {
      id: 'waec-bio-1',
      question: 'Which of the following is an example of asexual reproduction?',
      options: { A: 'Fertilisation', B: 'Budding', C: 'Pollination', D: 'Meiosis' },
      answer: 'B',
      explanation: 'Budding (seen in yeast and hydra) involves a new organism growing as an outgrowth of the parent — no gamete fusion occurs.',
    },
    {
      id: 'waec-bio-2',
      question: 'In humans, gas exchange takes place in the:',
      options: { A: 'Trachea', B: 'Bronchi', C: 'Alveoli', D: 'Diaphragm' },
      answer: 'C',
      explanation: 'Alveoli are tiny air sacs in the lungs with thin walls and a rich blood supply. Oxygen diffuses in and CO₂ diffuses out across their walls.',
    },
    {
      id: 'waec-bio-3',
      question: 'Which of the following is NOT a function of the kidney?',
      options: { A: 'Excretion of urea', B: 'Regulation of blood pressure', C: 'Production of insulin', D: 'Filtration of blood' },
      answer: 'C',
      explanation: 'Insulin is produced by the beta cells of the pancreatic islets of Langerhans — not the kidney. The kidney handles excretion, filtration, and osmoregulation.',
    },
    {
      id: 'waec-bio-4',
      question: 'The transfer of pollen grains from the anther to the stigma of a flower is called:',
      options: { A: 'Fertilisation', B: 'Germination', C: 'Pollination', D: 'Dispersal' },
      answer: 'C',
      explanation: 'Pollination is the transfer of pollen from the anther (male) to the stigma (female). Fertilisation — fusion of gametes — occurs after successful pollination.',
    },
    {
      id: 'waec-bio-5',
      question: 'Which nutrient class provides the most energy per gram?',
      options: { A: 'Carbohydrates', B: 'Proteins', C: 'Vitamins', D: 'Fats' },
      answer: 'D',
      explanation: 'Fats yield approximately 9 kcal/g. Carbohydrates and proteins each yield approximately 4 kcal/g. Vitamins do not yield energy.',
    },
  ],

  'waec-english': [
    {
      id: 'waec-eng-1',
      question: 'Choose the option that best fills the gap: "She was so tired that she _____ asleep immediately."',
      options: { A: 'fall', B: 'fallen', C: 'fell', D: 'falls' },
      answer: 'C',
      explanation: 'The sentence is in the simple past tense ("was"). "Fell" is the past tense of "fall" and is the correct form here.',
    },
    {
      id: 'waec-eng-2',
      question: 'In the sentence "Running is good for health", the word "Running" is a:',
      options: { A: 'Verb', B: 'Gerund', C: 'Participle', D: 'Infinitive' },
      answer: 'B',
      explanation: 'A gerund is a verb form (ending in -ing) used as a noun. "Running" is the subject of the sentence — it functions as a noun, making it a gerund.',
    },
    {
      id: 'waec-eng-3',
      question: 'The word "gregarious" most nearly means:',
      options: { A: 'Aggressive', B: 'Generous', C: 'Sociable', D: 'Intelligent' },
      answer: 'C',
      explanation: '"Gregarious" describes a person who enjoys the company of others — sociable and fond of group activities.',
    },
    {
      id: 'waec-eng-4',
      question: 'Select the option that correctly replaces the underlined word: "His comportment was exemplary."',
      options: { A: 'behaviour', B: 'appearance', C: 'clothing', D: 'speech' },
      answer: 'A',
      explanation: '"Comportment" refers to how a person behaves and carries themselves — their behaviour or manner.',
    },
    {
      id: 'waec-eng-5',
      question: 'Identify the literary device in: "The pen is mightier than the sword."',
      options: { A: 'Personification', B: 'Simile', C: 'Hyperbole', D: 'Metaphor' },
      answer: 'D',
      explanation: 'This is a metaphor: the pen (writing/ideas) is directly compared to the sword (physical force) without using "like" or "as".',
    },
  ],
};

// Subject-specific study tips
export const STUDY_TIPS: Record<string, string[]> = {
  mathematics: [
    'Ensure you can solve linear equations, quadratic equations, and geometry without a calculator — JAMB does not permit calculators.',
    'Practise timed sessions: JAMB Mathematics is 40 questions in 60 minutes — about 90 seconds per question.',
    'Memorise key formulae for area, volume, trigonometry, and statistics. No formula sheet is provided.',
    'Work through at least 10 years of past questions, focusing on Algebra, Statistics, and Trigonometry — the highest-weighted topics.',
  ],
  english: [
    'Read English newspapers (The Punch, Vanguard) daily to build vocabulary and comprehension speed.',
    'Focus on Lexis & Structure — it carries the most marks in JAMB English. Learn synonyms, antonyms, and correct usage.',
    'Practise summary writing: identify the main idea of each paragraph and condense it in your own words.',
    'Review common figures of speech (simile, metaphor, personification, irony) and practise identifying them in context.',
  ],
  biology: [
    'Draw and label key structures from memory: cell organelles, the nephron, the heart, and flower structure.',
    'Focus on classification of organisms, genetics, and ecology — these form approximately 40% of JAMB Biology questions.',
    'Know the difference between mitosis and meiosis in detail: purpose, stages, and outcome.',
    'Use the PassVerse app for instant explanations — Biology has many subtle MCQ traps that benefit from AI clarification.',
  ],
  physics: [
    'Know your SI units: every JAMB Physics question either directly tests or requires correct units.',
    'Practise numerical problems daily — at least 50% of the paper involves calculations for speed, force, pressure, and waves.',
    "Understand Newton's Three Laws in depth; they underpin a large portion of mechanics questions every year.",
    'Commit the key formulae to memory: v = fλ (waves), V = IR (electricity), s = ut + ½at² (motion).',
  ],
  chemistry: [
    'Memorise the first 20 elements with their symbols and the periodic table trends (electronegativity, ionisation energy).',
    'Organic Chemistry (hydrocarbons, alcohols, esters, polymers) accounts for about 25% of JAMB Chemistry — do not skip it.',
    'Master mole calculations: molar mass, stoichiometry, and concentration problems appear in every paper.',
    'Revisit acid-base reactions, redox reactions, and electrolysis — reliable sources of 5–8 marks per year.',
  ],
  economics: [
    'Understand the four factors of production (land, labour, capital, entrepreneurship) and their rewards (rent, wages, interest, profit).',
    'Study demand and supply curves: practise identifying shifts vs. movements along the curve from written descriptions.',
    'Learn Nigerian economic history — the oil boom, structural adjustment programmes, and recent monetary policies feature regularly.',
    'Master the few quantitative areas: GDP calculation, index numbers, and price elasticity of demand.',
  ],
  government: [
    "Know the three arms of government (executive, legislature, judiciary) and their specific powers under Nigeria's 1999 Constitution.",
    'Study the evolution of Nigerian constitutions: Richards (1946), Macpherson (1951), Lyttleton (1954), and the 1999 Constitution.',
    'Understand key concepts deeply: federalism, separation of powers, rule of law, and fundamental human rights.',
    'Distinguish clearly between different systems of government: democracy, monarchy, oligarchy, and theocracy.',
  ],
  commerce: [
    'Understand the chain of distribution from producer to consumer and the role of each intermediary.',
    'Learn all forms of business ownership (sole proprietorship, partnership, limited liability company, cooperative) and their features.',
    'Study trade documentation: invoice, bill of lading, letter of credit, and proforma invoice.',
    'Revise banking services, insurance principles, and the functions of the stock exchange.',
  ],
  accounting: [
    'Practise preparing Trial Balance, Trading Account, Profit & Loss Account, and Balance Sheet from incomplete records.',
    'Understand the double-entry principle: every transaction has an equal debit and credit entry.',
    'Know the distinction between capital expenditure and revenue expenditure — a common exam trick.',
    'Master bank reconciliation statements and the correction of errors — these appear on almost every paper.',
  ],
  default: [
    'Start with the most recent 5 years of past questions, then work backwards through the archive.',
    'Track which topics you get wrong, then revise those areas specifically rather than re-reading everything.',
    'Use the PassVerse app to study offline on your phone — questions are cached after the first load.',
    'Simulate exam conditions: set a timer and avoid checking answers until you have completed all questions.',
  ],
};

// About section content per subject
export const SUBJECT_ABOUT: Record<string, { description: string; topics: string[] }> = {
  mathematics: {
    description:
      'JAMB Mathematics tests candidates on the full SS1–SS3 curriculum with 40 questions in 60 minutes. Questions assess problem-solving ability, numerical reasoning, and application of mathematical concepts. No calculator is permitted.',
    topics: ['Algebra & Equations', 'Trigonometry', 'Statistics & Probability', 'Numbers & Numeration', 'Mensuration', 'Coordinate Geometry'],
  },
  english: {
    description:
      'JAMB Use of English is a compulsory subject for all candidates with 60 questions — the most of any JAMB subject. It tests reading comprehension, vocabulary, oral English, and lexis & structure. A strong performance here significantly boosts your aggregate score.',
    topics: ['Lexis & Structure', 'Reading Comprehension', 'Oral English', 'Summary Writing', 'Register & Varieties', 'Figures of Speech'],
  },
  biology: {
    description:
      'JAMB Biology covers cell biology, genetics, ecology, evolution, and human physiology with 40 questions. Questions test both factual recall and the ability to interpret diagrams and experimental data. Essential for Medicine, Pharmacy, and Nursing candidates.',
    topics: ['Cell Structure & Function', 'Genetics & Heredity', 'Ecology & Environment', 'Human Physiology', 'Classification of Organisms', 'Plant Biology'],
  },
  physics: {
    description:
      'JAMB Physics tests mechanics, waves, electricity, magnetism, and modern physics with 40 questions. About half the paper involves numerical calculations. Physics is compulsory for Engineering, Computer Science, and all physical sciences.',
    topics: ['Mechanics & Motion', 'Waves & Sound', 'Electricity & Magnetism', 'Heat & Temperature', 'Light & Optics', 'Atomic Physics'],
  },
  chemistry: {
    description:
      'JAMB Chemistry covers atomic structure, chemical bonding, chemical reactions, and organic chemistry with 40 questions. Strong performance is required for Medicine, Pharmacy, Biochemistry, and all Engineering programmes.',
    topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Acid-Base Reactions', 'Redox & Electrochemistry', 'The Mole Concept'],
  },
  economics: {
    description:
      'JAMB Economics tests micro and macroeconomics, Nigerian economic history, and quantitative reasoning with 40 questions. Popular among Arts and Social Sciences candidates and often the deciding factor for admission into Business Administration.',
    topics: ['Demand & Supply', 'National Income', 'Money & Banking', 'International Trade', 'Nigerian Economic History', 'Index Numbers'],
  },
  government: {
    description:
      'JAMB Government tests political theory, Nigerian constitutional history, comparative government, and international relations. It is compulsory for Law, Political Science, and Public Administration candidates.',
    topics: ['Nigerian Constitution', 'Arms of Government', 'Political Parties', 'Federalism', 'Foreign Policy', 'International Organisations'],
  },
  default: {
    description:
      'This subject is tested across multiple Nigerian examinations. Questions draw from the standard secondary school curriculum and assess both foundational knowledge and the ability to apply concepts to new situations.',
    topics: ['Core Curriculum Topics', 'Applied Concepts', 'Problem Solving', 'Critical Thinking'],
  },
};

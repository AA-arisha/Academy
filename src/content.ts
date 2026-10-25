/** Edit all site content, contact details and form settings here. */
export const CONFIG = {
  name: '[Academy Name]',
  email: '[academy@email.com]',
  whatsapp: '[+92 000 0000000]',
  instagram: '[Instagram URL]',
  /** Set to a form-service URL (e.g. Formspree) or your backend. Empty = form is not connected. */
  formEndpoint: '',
};
export type Tint = 'p' | 'b' | 'l' | 'v';
export type Format = 'Online' | 'In person';
export interface Tutor { id: string; name: string; tint: Tint; subjects: string[]; curricula: string; format: Format }
export interface Service { key: string; title: string; icon: string; tint: Tint; desc: string; items: string[] }
export const TUTORS: Tutor[] = [
  { id: 'arisha', name: 'Arisha', tint: 'v', subjects: ['IGCSE / O Level Computer Science', 'Mathematics', 'Physics'], curricula: 'Cambridge IGCSE & O Level', format: 'Online' },
  { id: 'iqra', name: 'Iqra', tint: 'b', subjects: ['IGCSE / O Level Biology', 'Physics', 'Mathematics', 'Chemistry'], curricula: 'Cambridge IGCSE & O Level', format: 'Online' },
  { id: 'fiza', name: 'Fiza', tint: 'p', subjects: ['IGCSE / O Level Business', 'Accounting', 'Economics'], curricula: 'Cambridge IGCSE & O Level', format: 'Online' },
  { id: 'khadija', name: 'Khadija', tint: 'l', subjects: ['Principles of Commerce', 'Commercial Geography', 'Banking', 'Accounting'], curricula: 'AKU Board', format: 'In person' },
  { id: 'muniza', name: 'Muniza', tint: 'p', subjects: ['Admission test preparation: Alpha, BVS, Mama Parsi and other schools', 'Personalised guidance & interview preparation'], curricula: 'AKU Board, Cambridge, Sindh Board · Grades 5–9', format: 'In person' },
  { id: 'ambreen', name: 'Ambreen', tint: 'b', subjects: ['Pre-primary education', 'Primary Grades 1–5'], curricula: 'Primary years', format: 'In person' },
];
export const SERVICES: Service[] = [
  { key: 'cam', title: 'Cambridge IGCSE & O Level', icon: '🔬', tint: 'b', desc: 'Subject-focused support for Cambridge students, online.', items: ['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Business', 'Accounting', 'Economics'] },
  { key: 'aku', title: 'AKU Board & Commerce', icon: '📒', tint: 'l', desc: 'Commerce subjects taught in person.', items: ['Principles of Commerce', 'Commercial Geography', 'Banking', 'Accounting'] },
  { key: 'adm', title: 'School Admission Preparation', icon: '✏️', tint: 'p', desc: 'Test and interview preparation with personal guidance.', items: ['Alpha, BVS, Mama Parsi and other schools', 'Personalised guidance', 'Interview preparation', 'Classes for Grades 5–9'] },
  { key: 'pri', title: 'Primary & Early Learning', icon: '🌱', tint: 'v', desc: 'Gentle, foundational support for young learners.', items: ['Pre-primary', 'Grades 1–5', 'Foundational academic support'] },
];
export const COMMITMENTS: [string, string, string][] = [
  ['🎯', 'Subject-specific tutors', 'Each tutor teaches the subjects they specialise in.'],
  ['🧩', 'Personalised support', 'Lessons shaped around the learner’s goals.'],
  ['📘', 'Curriculum-aware teaching', 'Teaching matched to the board or curriculum.'],
  ['🔀', 'Online and in person', 'Formats vary by tutor and are listed clearly.'],
  ['👤', 'Individual attention', 'Focused learning goals for each student.'],
  ['🌍', 'Local and international', 'Support for students in Pakistan and online overseas.'],
];
export const FAQS: [string, string][] = [
  ['Which curricula do you cover?', 'Cambridge IGCSE & O Level, AKU Board, Sindh Board, school admission preparation and primary education. Each tutor covers specific subjects, so not every tutor teaches every curriculum.'],
  ['Do you offer online classes?', 'Yes. Arisha, Iqra and Fiza teach Cambridge subjects online.'],
  ['Are in-person classes available?', 'Yes, through Khadija, Muniza and Ambreen. Venue details are to be confirmed.'],
  ['Can I choose a particular tutor?', 'Yes. Tell us your preference in the enquiry form and we will check availability.'],
  ['Do you teach international students?', 'We offer online Cambridge IGCSE and O Level tutoring. Availability depends on the tutor and your time zone.'],
  ['How do I enquire about fees and schedules?', 'Send an enquiry. Fees and schedules are confirmed directly with the relevant tutor.'],
  ['How are classes arranged?', 'We coordinate your enquiry, then class arrangements are confirmed with the tutor.'],
];
export const NAV: [string, string][] = [['/', 'Home'], ['/services', 'Subjects & Services'], ['/tutors', 'Meet Our Tutors'], ['/about', 'About Us'],['/contact', 'Contact']];

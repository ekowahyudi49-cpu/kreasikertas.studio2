export type PromptCategory =
  | 'beranda'
  | 'worksheet_essay'
  | 'gunting_tempel'
  | 'papercraft'
  | 'mewarnai'
  | 'lkpd'
  | 'flashcard'
  | 'maze'
  | 'matching'
  | 'tracing'
  | 'favorit'
  | 'bonus'
  | 'login'
  | 'order_hero'
  | 'admin_panel';

export type GradeLevel =
  | 'TK A'
  | 'TK B'
  | 'SD Kelas 1'
  | 'SD Kelas 2'
  | 'SD Kelas 3'
  | 'SD Kelas 4'
  | 'SD Kelas 5'
  | 'SD Kelas 6';

export type QuestionCount = 5 | 10 | 15 | 20 | 25 | 30;
export type PaperSize = 'Legal' | 'A4' | 'A5';
export type Orientation = 'Portrait' | 'Landscape';
export type ContentLanguage = 'Indonesia' | 'Inggris';

export interface GuruInput {
  schoolName: string;
  teacherName: string;
  grade: GradeLevel;
  subject: string;
  theme: string;
  questionCount: QuestionCount;
  paperSize: PaperSize;
  orientation: Orientation;
  language: ContentLanguage;
  targetAI?: string; // ChatGPT, Claude, Midjourney, Canva AI, dll.
  notes?: string;
}

export interface GeneratedPromptResult {
  id: string;
  title: string;
  category: PromptCategory;
  categoryName: string;
  promptText: string;
  summary: string;
  visualKeywords: string[];
  recommendedModel: string;
  metadata: GuruInput;
  createdAt: string;
}

export interface SavedPromptItem {
  id: string;
  userId: string;
  title: string;
  category: PromptCategory;
  promptText: string;
  schoolName: string;
  teacherName: string;
  grade: string;
  subject: string;
  theme: string;
  questionCount: number;
  paperSize: string;
  orientation: string;
  language: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  schoolName: string;
  teacherName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BonusPromptItem {
  id: string;
  code: string;
  title: string;
  category: string;
  targetLevel: string;
  theme: string;
  promptText: string;
  recommendedAI: string;
  tags: string[];
}

export interface BuyerOrder {
  id: string; // e.g. ORD-HERO-9090-XXXX
  buyerName: string;
  linkedEmail: string;
  whatsappNumber: string;
  schoolName: string;
  packageType: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
  status: 'Pending' | 'Dikonfirmasi' | 'Selesai';
  createdAt: string;
  accessCode: string;
}


import React, { useState } from 'react';
import {
  GuruInput,
  GradeLevel,
  QuestionCount,
  PaperSize,
  Orientation,
  ContentLanguage,
  PromptCategory,
} from '../types';
import {
  Wand2,
  Sparkles,
  School,
  User,
  GraduationCap,
  BookOpen,
  Tag,
  Hash,
  Maximize2,
  RotateCw,
  Globe2,
  Check,
} from 'lucide-react';

interface GuruInputFormProps {
  currentCategory: PromptCategory;
  categoryTitle: string;
  initialValues: GuruInput;
  onGenerate: (input: GuruInput) => void;
  isGenerating?: boolean;
}

export const GuruInputForm: React.FC<GuruInputFormProps> = ({
  currentCategory,
  categoryTitle,
  initialValues,
  onGenerate,
  isGenerating = false,
}) => {
  const [formData, setFormData] = useState<GuruInput>(initialValues);

  const gradeOptions: GradeLevel[] = [
    'TK A',
    'TK B',
    'SD Kelas 1',
    'SD Kelas 2',
    'SD Kelas 3',
    'SD Kelas 4',
    'SD Kelas 5',
    'SD Kelas 6',
  ];

  const quickSubjects = [
    'Bahasa Inggris',
    'IPAS',
    'Matematika',
    'Bahasa Indonesia',
    'PAI & Budi Pekerti',
    'Seni Rupa & Prakarya',
    'Pendidikan Pancasila',
  ];

  const quickThemes = [
    'Animals (Hewan)',
    'Fruits & Vegetables',
    'Solar System (Tata Surya)',
    'Transportasi',
    'Profesi & Cita-Cita',
    'Lingkungan Sehat',
    'Tubuh Manusia',
    'Budaya Nusantara',
  ];

  const questionOptions: QuestionCount[] = [5, 10, 15, 20, 25, 30];
  const sizeOptions: PaperSize[] = ['A4', 'Legal', 'A5'];
  const orientationOptions: Orientation[] = ['Portrait', 'Landscape'];
  const languageOptions: ContentLanguage[] = ['Indonesia', 'Inggris'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form
      id="guru-prompt-generator-form"
      onSubmit={handleSubmit}
      className="p-5 sm:p-6 rounded-2xl bg-[#0f1512] border border-emerald-800/60 shadow-xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-emerald-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Parameter Guru: <span className="text-emerald-400">{categoryTitle}</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sesuaikan identitas sekolah dan kebutuhan materi. Prompt Bahasa Indonesia siap pakai akan digenerate instan.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-[11px] font-semibold self-start sm:self-center">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preset Guru Terverifikasi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Sekolah */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <School className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nama Sekolah</span>
          </label>
          <input
            type="text"
            id="input-school-name"
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            placeholder="Contoh: SD Muhammadiyah 16 Surabaya"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141b18] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            required
          />
        </div>

        {/* Nama Guru / Kreator */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nama Guru / Kreator</span>
          </label>
          <input
            type="text"
            id="input-teacher-name"
            value={formData.teacherName}
            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
            placeholder="Contoh: Eko Wahyudi"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141b18] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            required
          />
        </div>
      </div>

      {/* Tingkat Kelas */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tingkat Kelas Siswa (TK A – SD Kelas 6)</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-bold">{formData.grade}</span>
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {gradeOptions.map((gr) => (
            <button
              type="button"
              key={gr}
              onClick={() => setFormData({ ...formData, grade: gr })}
              className={`px-2 py-2 rounded-xl text-xs font-semibold transition text-center border ${
                formData.grade === gr
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-950'
                  : 'bg-[#141b18] border-emerald-950/60 text-slate-300 hover:border-emerald-700 hover:text-white'
              }`}
            >
              {gr}
            </button>
          ))}
        </div>
      </div>

      {/* Mata Pelajaran & Tema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mata Pelajaran */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mata Pelajaran</span>
          </label>
          <input
            type="text"
            id="input-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Bahasa Inggris, IPAS, dll."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141b18] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            required
          />
          {/* Quick choices */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickSubjects.slice(0, 4).map((qs) => (
              <button
                type="button"
                key={qs}
                onClick={() => setFormData({ ...formData, subject: qs })}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition"
              >
                + {qs}
              </button>
            ))}
          </div>
        </div>

        {/* Tema */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tema Pembelajaran</span>
          </label>
          <input
            type="text"
            id="input-theme"
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            placeholder="Animals, Fruits, Solar System, dll."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141b18] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            required
          />
          {/* Quick choices */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickThemes.slice(0, 4).map((qt) => (
              <button
                type="button"
                key={qt}
                onClick={() => setFormData({ ...formData, theme: qt })}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition"
              >
                + {qt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Baris Pilihan Teknis: Jumlah Soal, Ukuran, Orientasi, Bahasa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#141b18]/70 border border-emerald-950">
        {/* Jumlah Soal */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
            <Hash className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jumlah Soal</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {questionOptions.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => setFormData({ ...formData, questionCount: q })}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  formData.questionCount === q
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : 'bg-[#0f1512] text-slate-300 hover:bg-emerald-950/60 border border-emerald-950'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Ukuran Kertas */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ukuran Kertas</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {sizeOptions.map((sz) => (
              <button
                type="button"
                key={sz}
                onClick={() => setFormData({ ...formData, paperSize: sz })}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  formData.paperSize === sz
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : 'bg-[#0f1512] text-slate-300 hover:bg-emerald-950/60 border border-emerald-950'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Orientasi */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
            <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Orientasi</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {orientationOptions.map((or) => (
              <button
                type="button"
                key={or}
                onClick={() => setFormData({ ...formData, orientation: or })}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  formData.orientation === or
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : 'bg-[#0f1512] text-slate-300 hover:bg-emerald-950/60 border border-emerald-950'
                }`}
              >
                {or}
              </button>
            ))}
          </div>
        </div>

        {/* Bahasa Konten */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bahasa Konten</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {languageOptions.map((lng) => (
              <button
                type="button"
                key={lng}
                onClick={() => setFormData({ ...formData, language: lng })}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  formData.language === lng
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : 'bg-[#0f1512] text-slate-300 hover:bg-emerald-950/60 border border-emerald-950'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tombol Eksekusi Generator Prompt */}
      <button
        type="submit"
        id="btn-generate-prompt"
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950 transition-all border border-emerald-400/40 active:scale-[0.99] cursor-pointer"
      >
        <Wand2 className="w-5 h-5 text-emerald-100" />
        <span>{isGenerating ? 'Menyusun Prompt...' : 'GENERATE PROMPT BAHASA INDONESIA'}</span>
      </button>
    </form>
  );
};

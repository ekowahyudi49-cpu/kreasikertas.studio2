import React from 'react';
import { PromptCategory, GuruInput } from '../types';
import {
  FileText,
  Scissors,
  Box,
  Palette,
  BookOpen,
  Layers,
  Compass,
  GitCompare,
  PenTool,
  Gift,
  Star,
  Sparkles,
  ArrowRight,
  Printer,
  Copy,
  Download,
  School,
  CheckCircle2,
  LogIn,
} from 'lucide-react';

interface BerandaViewProps {
  onSelectCategory: (cat: PromptCategory) => void;
  guruInput: GuruInput;
  savedCount: number;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onSelectCategory,
  guruInput,
  savedCount,
}) => {
  const categoryCards = [
    {
      id: 'worksheet_essay' as PromptCategory,
      title: 'Worksheet Essay',
      desc: 'Hasilkan 5–30 butir soal essay bertingkat LOTS hingga HOTS lengkap dengan narasi stimulus dan rubrik penskoran.',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      tag: '5-30 Soal',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'gunting_tempel' as PromptCategory,
      title: 'Gunting Tempel',
      desc: 'Prompt aktivitas craft cut & paste melatih motorik halus dengan garis potong putus-putus dan area perekat bertanda lem.',
      icon: <Scissors className="w-5 h-5 text-emerald-400" />,
      tag: 'Motorik Halus',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'papercraft' as PromptCategory,
      title: 'Papercraft 3D',
      desc: 'Pola lipatan kertas 3D (rumah adat, kendaraan, hewan) dengan folding tabs dan panduan perakitan presisi.',
      icon: <Box className="w-5 h-5 text-emerald-400" />,
      tag: 'Origami & 3D',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'mewarnai' as PromptCategory,
      title: 'Coloring Worksheet',
      desc: 'Halaman mewarnai edukatif dengan garis outline tebal bersih, ramah tinta printer, dan menyisipkan fakta sains unik.',
      icon: <Palette className="w-5 h-5 text-emerald-400" />,
      tag: 'Coloring Pages',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'lkpd' as PromptCategory,
      title: 'LKPD Lengkap',
      desc: 'Modul Lembar Kerja Peserta Didik terpadu: Capaian Pembelajaran, studi kasus, investigasi mandiri/kelompok, dan refleksi.',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      tag: 'Kurikulum Merdeka',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'flashcard' as PromptCategory,
      title: 'Flashcard 2 Sisi',
      desc: 'Kartu pintar bergambar bolak-balik: visual kosakata tematik, panduan pengucapan dwibahasa, dan kuis tanya-jawab.',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      tag: 'Bilingual Card',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'maze' as PromptCategory,
      title: 'Maze & Puzzle',
      desc: 'Labirin tematik berliku dengan pos teka-teki logika, rute petualangan sains, dan kunci rute penjelajahan.',
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      tag: 'Logika Spasial',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'matching' as PromptCategory,
      title: 'Matching Worksheet',
      desc: 'Lembar kerja menghubungkan garis dua kolom: gambar ke kosakata, siluet bayangan, sebab-akibat, atau lawan kata.',
      icon: <GitCompare className="w-5 h-5 text-emerald-400" />,
      tag: 'Hubungkan Garis',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'tracing' as PromptCategory,
      title: 'Tracing Garis & Huruf',
      desc: 'Latihan pra-menulis anak: pola garis putus-putus, abjad besar/kecil dengan panah arah goresan, dan angka urut.',
      icon: <PenTool className="w-5 h-5 text-emerald-400" />,
      tag: 'Pra-Menulis',
      color: 'from-emerald-900/50 to-emerald-950/70',
    },
    {
      id: 'bonus' as PromptCategory,
      title: 'Bonus 3000+ Prompt',
      desc: 'Katalog kurasi ribuan prompt siap pakai: Proyek STEM, pop-up card, busy book, permainan papan, dan kalender belajar.',
      icon: <Gift className="w-5 h-5 text-emerald-400" />,
      tag: 'Koleksi Premium',
      color: 'from-emerald-800/60 to-emerald-950/80',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1912] via-[#09120e] to-[#041f16] border border-emerald-700/50 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>KREASIKERTAS.STUDIO • Khusus Guru Kreatif</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Generator Prompt Edukasi <span className="text-emerald-400">Bahasa Indonesia</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Hasilkan lembar kerja, papercraft, LKPD, dan media belajar kertas berkualitas tinggi secara instan.
            Setiap prompt disusun terstruktur, siap disalin (<strong>COPY PROMPT</strong>) dan dapat diunduh langsung sebagai <strong>PDF Siap Cetak</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCategory('worksheet_essay')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/80 transition"
            >
              <span>Mulai Buat Worksheet Essay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectCategory('bonus')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141e19] hover:bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 font-bold text-xs sm:text-sm transition"
            >
              <Gift className="w-4 h-4" />
              <span>Jelajahi 3000+ Prompt Premium</span>
            </button>
            <button
              onClick={() => onSelectCategory('login')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1a13] hover:bg-emerald-950 text-white border border-emerald-600/70 font-bold text-xs sm:text-sm transition shadow-md"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Halaman Login</span>
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-900/50 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>10 Kategori Spesialis</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Copy Prompt 1-Klik</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Export PDF Instan</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Simpan ke Cloud Firestore</span>
          </div>
        </div>
      </div>

      {/* Grid Menu Kategori */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Pilih Kategori Kebutuhan Guru</h2>
            <p className="text-xs text-slate-400">Pilih menu di bawah ini untuk menghasilkan prompt Bahasa Indonesia yang tepat sasaran.</p>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-emerald-400">
            Preset: {guruInput.schoolName} ({guruInput.teacherName})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              role="button"
              tabIndex={0}
              className={`group p-5 rounded-2xl bg-gradient-to-br ${cat.color} border border-emerald-800/50 hover:border-emerald-500/80 transition-all shadow-lg hover:shadow-emerald-950/60 cursor-pointer flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-black/40 border border-emerald-800/60 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    {cat.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-900/40 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span>Buka Generator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

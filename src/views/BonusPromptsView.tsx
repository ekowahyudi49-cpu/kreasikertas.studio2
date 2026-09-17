import React, { useState } from 'react';
import { BONUS_PROMPT_CATALOG } from '../data/bonusPrompts';
import { BonusPromptItem, GuruInput } from '../types';
import {
  Gift,
  Search,
  Copy,
  Check,
  Download,
  Sparkles,
  Tag,
  GraduationCap,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { downloadPromptAsPDF } from '../services/pdfGenerator';

interface BonusPromptsViewProps {
  guruInput: GuruInput;
}

export const BonusPromptsView: React.FC<BonusPromptsViewProps> = ({ guruInput }) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(BONUS_PROMPT_CATALOG.flatMap((item) => item.tags))
  );

  const filteredItems = BONUS_PROMPT_CATALOG.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.theme.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.promptText.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());

    const matchTag =
      selectedTag === 'all' || item.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  const handleCopy = async (item: BonusPromptItem) => {
    try {
      await navigator.clipboard.writeText(item.promptText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPDF = (item: BonusPromptItem) => {
    downloadPromptAsPDF({
      id: item.id,
      title: item.title,
      category: 'bonus',
      categoryName: item.category,
      promptText: item.promptText,
      summary: item.title,
      visualKeywords: item.tags,
      recommendedModel: item.recommendedAI,
      metadata: {
        ...guruInput,
        theme: item.theme,
        subject: item.category,
      },
      createdAt: new Date().toLocaleDateString('id-ID'),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#0d1612] to-[#080e0b] border border-emerald-700/60 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-600/50 text-emerald-400">
            <Gift className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Koleksi 3000+ Prompt Premium Guru Kreatif
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Katalog prompt eksklusif siap pakai: STEM, Papercraft 3D, Pop-Up Book, Game Edukasi, LKPD Inkuiri, dan Literasi Tematik.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
            ⭐ 100% Bahasa Indonesia
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
            🖨️ Format Siap Cetak
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
            ⚡ Kompatibel ChatGPT / Claude / Midjourney / Canva
          </span>
        </div>
      </div>

      {/* Search & Tag Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari ribuan prompt berdasarkan tema (Bumi, Hewan, Tata Surya, Budaya, Jam, Fabel)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121815] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition shrink-0 ${
              selectedTag === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-[#121815] text-slate-300 hover:bg-emerald-950/60 border border-emerald-900/60'
            }`}
          >
            Semua Tag ({BONUS_PROMPT_CATALOG.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl font-medium transition shrink-0 ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#121815] text-slate-300 hover:bg-emerald-950/60 border border-emerald-900/60'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Bonus Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#101713] border border-emerald-900/60 hover:border-emerald-700/80 transition-all shadow-lg flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {item.code}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.targetLevel}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Tema: {item.theme}</span>
                </div>
              </div>

              {/* Prompt Preview Snippet */}
              <div className="p-3 rounded-xl bg-[#080d0a] border border-emerald-950 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap select-all">
                {item.promptText}
              </div>

              {/* Tags & Model */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-[#16201b] text-slate-400 text-[10px]"
                  >
                    #{t}
                  </span>
                ))}
                <span className="ml-auto text-[10px] font-semibold text-emerald-300">
                  Target: {item.recommendedAI}
                </span>
              </div>
            </div>

            {/* Actions: COPY & PDF */}
            <div className="flex items-center gap-2 pt-3 border-t border-emerald-900/40">
              <button
                onClick={() => handleCopy(item)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                  copiedId === item.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>PROMPT TERSALIN!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY PROMPT</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadPDF(item)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#17221c] hover:bg-emerald-950/70 text-emerald-300 border border-emerald-800 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

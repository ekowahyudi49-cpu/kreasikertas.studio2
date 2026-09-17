import React, { useState } from 'react';
import { SavedPromptItem, PromptCategory } from '../types';
import {
  Star,
  Copy,
  Check,
  Download,
  Trash2,
  Search,
  Filter,
  FileText,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { downloadPromptAsPDF } from '../services/pdfGenerator';

interface FavoritesViewProps {
  savedPrompts: SavedPromptItem[];
  onDeletePrompt: (id: string) => Promise<void>;
  onSelectCategory: (cat: PromptCategory) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  savedPrompts,
  onDeletePrompt,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = savedPrompts.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.promptText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const handleCopy = async (prompt: SavedPromptItem) => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = (prompt: SavedPromptItem) => {
    downloadPromptAsPDF(prompt);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white">Prompt Favorit Guru</h1>
              <p className="text-xs text-slate-400">
                Tersimpan di Cloud Firestore & tersinkronisasi antar perangkat Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-xl bg-[#121815] border border-emerald-800">
          Total Tersimpan: {savedPrompts.length} Prompt
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari prompt tersimpan berdasarkan tema, mapel, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121815] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#121815] border border-emerald-900/70 text-sm text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Semua Kategori</option>
          <option value="worksheet_essay">Worksheet Essay</option>
          <option value="gunting_tempel">Gunting Tempel</option>
          <option value="papercraft">Papercraft</option>
          <option value="mewarnai">Mewarnai</option>
          <option value="lkpd">LKPD</option>
          <option value="flashcard">Flashcard</option>
          <option value="maze">Maze</option>
          <option value="matching">Matching</option>
          <option value="tracing">Tracing</option>
          <option value="bonus">Bonus Prompt</option>
        </select>
      </div>

      {/* List of Saved Prompts */}
      {filteredPrompts.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#0f1512] border border-emerald-900/40 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Belum Ada Prompt Favorit</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Saat Anda menghasilkan prompt pada menu worksheet atau papercraft, klik ikon bintang atau tombol Simpan untuk menyimpannya ke Cloud Firestore.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('worksheet_essay')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950"
          >
            Buat Prompt Sekarang
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrompts.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#111814] border border-emerald-900/60 hover:border-emerald-700/80 transition shadow-lg space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.grade} • {item.subject} • Tema: {item.theme}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    {item.title}
                  </h3>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      copiedId === item.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'TERSALIN' : 'COPY PROMPT'}</span>
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a251f] hover:bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={() => onDeletePrompt(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition"
                    title="Hapus dari Favorit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prompt Text Preview */}
              <div className="p-3 rounded-xl bg-[#080c0a] border border-emerald-950/80 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap select-all">
                {item.promptText}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Sekolah: {item.schoolName} ({item.teacherName})</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

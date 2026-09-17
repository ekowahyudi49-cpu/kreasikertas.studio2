import React, { useState } from 'react';
import { GeneratedPromptResult } from '../types';
import {
  Copy,
  Check,
  Download,
  Star,
  Sparkles,
  FileText,
  Share2,
  Maximize2,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { downloadPromptAsPDF } from '../services/pdfGenerator';

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onSaveToFavorites: (result: GeneratedPromptResult) => void;
  isSaved?: boolean;
}

export const PromptResultCard: React.FC<PromptResultCardProps> = ({
  result,
  onSaveToFavorites,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(result.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownloadPDF = () => {
    setPdfGenerating(true);
    try {
      downloadPromptAsPDF(result);
    } finally {
      setTimeout(() => setPdfGenerating(false), 800);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0d1310] border border-emerald-800/70 p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/60">
              {result.categoryName}
            </span>
            <span className="text-xs text-slate-400">
              {result.metadata.schoolName} • {result.metadata.teacherName}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {result.title}
          </h3>
        </div>

        {/* Action Buttons: COPY PROMPT & DOWNLOAD PDF */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tombol COPY PROMPT */}
          <button
            id="btn-copy-prompt"
            onClick={handleCopyPrompt}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg ${
              copied
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'PROMPT TERSALIN!' : 'COPY PROMPT'}</span>
          </button>

          {/* Tombol DOWNLOAD HASIL SEBAGAI PDF */}
          <button
            id="btn-download-pdf"
            onClick={handleDownloadPDF}
            disabled={pdfGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#17211c] hover:bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 transition"
          >
            <Download className="w-4 h-4" />
            <span>{pdfGenerating ? 'Menyiapkan...' : 'DOWNLOAD PDF'}</span>
          </button>

          {/* Tombol FAVORIT */}
          <button
            id="btn-save-favorite"
            onClick={() => onSaveToFavorites(result)}
            className={`p-2 rounded-xl border transition ${
              isSaved
                ? 'bg-amber-950/60 text-amber-400 border-amber-600/60'
                : 'bg-[#17211c] text-slate-400 hover:text-amber-400 border-emerald-900/60 hover:border-amber-600/40'
            }`}
            title={isSaved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
          >
            <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Meta Specs Chips */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
        <span className="px-2.5 py-1 rounded-lg bg-[#141c18] border border-emerald-900/60">
          Kelas: <strong className="text-white">{result.metadata.grade}</strong>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141c18] border border-emerald-900/60">
          Mapel: <strong className="text-white">{result.metadata.subject}</strong>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141c18] border border-emerald-900/60">
          Tema: <strong className="text-white">{result.metadata.theme}</strong>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141c18] border border-emerald-900/60">
          Ukuran: <strong className="text-white">{result.metadata.paperSize} ({result.metadata.orientation})</strong>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#141c18] border border-emerald-900/60">
          Target AI: <strong className="text-emerald-400">{result.recommendedModel}</strong>
        </span>
      </div>

      {/* Prompt Box */}
      <div className="relative rounded-xl bg-[#070a08] border border-emerald-950 p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-emerald-400 font-sans font-semibold">
          <span>Prompt Bahasa Indonesia Siap Pakai</span>
          <span className="text-slate-400 font-normal">Disusun Khusus untuk Guru Kreatif</span>
        </div>

        <pre className="whitespace-pre-wrap font-mono select-all overflow-x-auto max-h-[420px] overflow-y-auto">
          {result.promptText}
        </pre>
      </div>

      {/* Footer Instructions for Teacher */}
      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs text-slate-400 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-emerald-300">Cara Penggunaan:</strong> Klik tombol <strong>COPY PROMPT</strong> di atas, lalu tempelkan (Paste) langsung ke <em>ChatGPT, Claude, Gemini</em>, atau ke prompt generator gambar seperti <em>Midjourney / Canva Magic Media</em> untuk menghasilkan materi cetak!
        </div>
      </div>
    </div>
  );
};

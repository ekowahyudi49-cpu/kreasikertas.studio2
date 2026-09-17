import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>PWA Aktif</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-emerald-950/50 transition-all border border-emerald-400/30"
      >
        <Download className="w-4 h-4 text-emerald-100" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-guide-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-emerald-700/60 bg-emerald-950/40 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-900/50 transition"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install di iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-[#121815] border border-emerald-800 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-900/60 text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-base text-white">Pasang di iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="font-bold text-emerald-400 text-sm">1.</span>
                  <p>Buka menu Safari dan ketuk tombol <strong>Share (Bagikan)</strong> di bilah bawah.</p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="font-bold text-emerald-400 text-sm">2.</span>
                  <p>Gulir ke bawah lalu pilih <strong>Add to Home Screen (Tambah ke Layar Utama)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="font-bold text-emerald-400 text-sm">3.</span>
                  <p>Ketuk <strong>Add</strong> di pojok kanan atas. Ikon KREASIKERTAS siap digunakan!</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-semibold text-white transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

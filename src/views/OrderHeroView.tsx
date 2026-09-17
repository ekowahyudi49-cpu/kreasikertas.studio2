import React from 'react';
import { BuyerOrder, PromptCategory } from '../types';
import {
  CheckCircle2,
  Send,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
  School,
  Package,
  CreditCard,
  Copy,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface OrderHeroViewProps {
  order: BuyerOrder;
  onNavigate: (category: PromptCategory) => void;
  onShowToast: (msg: string) => void;
}

export const OrderHeroView: React.FC<OrderHeroViewProps> = ({
  order,
  onNavigate,
  onShowToast,
}) => {
  // WhatsApp confirmation text to admin with 909090 reference
  const adminWhatsAppNumber = '6281290909090'; // Admin WhatsApp reference 909090
  const waMessage = encodeURIComponent(
    `Halo Admin KREASIKERTAS.STUDIO (ID: 909090)!\n\nSaya telah selesai mengisi form di Order Hero:\n• Nomor Order: ${order.id}\n• Nama Pembeli: ${order.buyerName}\n• Email Tertaut: ${order.linkedEmail}\n• No WhatsApp: ${order.whatsappNumber}\n• Sekolah: ${order.schoolName}\n• Paket: ${order.packageType}\n• Total: Rp ${order.amount.toLocaleString('id-ID')}\n• Kode Akses: ${order.accessCode}\n\nMohon konfirmasi dan aktivasi akses penuh generator prompt kreasikertas. Terima kasih!`
  );
  const waUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

  const copyOrderDetails = () => {
    const text = `=== INVOICE ORDER HERO KREASIKERTAS.STUDIO ===\nNomor Order: ${order.id}\nPembeli: ${order.buyerName}\nEmail Tertaut: ${order.linkedEmail}\nWhatsApp: ${order.whatsappNumber}\nSekolah: ${order.schoolName}\nPaket: ${order.packageType}\nTotal: Rp ${order.amount.toLocaleString('id-ID')}\nKode Akses: ${order.accessCode}\nAdmin Verifikator: 909090`;
    navigator.clipboard.writeText(text);
    onShowToast('Data Order Hero disalin ke papan klip!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1c14] via-[#0f241a] to-[#090d0b] border border-emerald-500/50 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ORDER HERO TERVERIFIKASI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat, Pesanan Anda Siap di <span className="text-emerald-400">Order Hero!</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Formulir pembeli telah berhasil diproses dengan <strong className="text-emerald-300">email tertaut</strong> Anda. Segera konfirmasikan ke Admin <strong>(ID: 909090)</strong> atau gunakan langsung modul-modul generator prompt.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 bg-[#08120c] p-4 rounded-xl border border-emerald-800/60 min-w-[200px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nomor Order Hero</span>
            <span className="text-lg font-mono font-black text-emerald-400 tracking-wider">
              {order.id}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
              Status: {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="rounded-2xl bg-[#0e1612] border border-emerald-900/60 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Buyer Details Grid */}
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-emerald-900/40">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Data Pembeli dengan Email Tertaut</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#131d17] border border-emerald-900/40 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email Tertaut (Akun Pembeli)</span>
              </div>
              <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>{order.linkedEmail}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-sans">
                  Tertaut Aktif
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#131d17] border border-emerald-900/40 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nomor WhatsApp / Kontak</span>
              </div>
              <div className="text-sm font-bold text-white">
                {order.whatsappNumber}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#131d17] border border-emerald-900/40 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nama Lengkap Pembeli</span>
              </div>
              <div className="text-sm font-bold text-white">
                {order.buyerName}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#131d17] border border-emerald-900/40 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <School className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sekolah / Lembaga</span>
              </div>
              <div className="text-sm font-bold text-white">
                {order.schoolName || 'SD Muhammadiyah 16 Surabaya'}
              </div>
            </div>
          </div>
        </div>

        {/* Package & Order Hero Details */}
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-emerald-900/40">
            <Package className="w-5 h-5 text-emerald-400" />
            <span>Rincian Paket & Lisensi Order Hero</span>
          </h2>

          <div className="p-5 rounded-xl bg-[#131d17] border border-emerald-800/50 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/30">
              <div>
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Paket Pilihan
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  {order.packageType}
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-xs text-slate-400">Total Investasi</div>
                <div className="text-xl font-black text-emerald-400">
                  Rp {order.amount.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#090d0b] border border-emerald-900/40">
                <div className="text-slate-400">Kode Lisensi Akses:</div>
                <div className="font-mono font-bold text-emerald-300 text-sm mt-0.5">
                  {order.accessCode}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#090d0b] border border-emerald-900/40">
                <div className="text-slate-400">Metode Konfirmasi:</div>
                <div className="font-semibold text-white mt-0.5">
                  {order.paymentMethod}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#090d0b] border border-emerald-900/40">
                <div className="text-slate-400">Waktu Pemesanan:</div>
                <div className="font-semibold text-white mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="text-xs text-slate-300 bg-[#090d0b] p-3 rounded-lg border border-emerald-900/40">
                <strong className="text-emerald-400">Catatan Khusus:</strong> {order.notes}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <a
            id="order-hero-wa-btn"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950 border border-emerald-400/40"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Bukti ke WA Admin (ID: 909090)</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
          </a>

          <button
            id="order-hero-copy-btn"
            onClick={copyOrderDetails}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#142018] hover:bg-[#1a2c22] text-emerald-300 font-semibold text-sm transition border border-emerald-700/60"
          >
            <Copy className="w-4 h-4" />
            <span>Salin Invoice</span>
          </button>

          <button
            id="order-hero-print-btn"
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#142018] hover:bg-[#1a2c22] text-slate-200 font-semibold text-sm transition border border-slate-700/60"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Invoice</span>
          </button>
        </div>
      </div>

      {/* Navigation to Generator Modules */}
      <div className="p-6 rounded-2xl bg-[#0a120e] border border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Siap Membuat Media Ajar Edukasi?</span>
          </h3>
          <p className="text-xs text-slate-400">
            Akses langsung 10 modul generator prompt: Worksheet Essay, LKPD, Papercraft, Flashcard & Mewarnai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="back-to-login-btn"
            onClick={() => onNavigate('login')}
            className="px-4 py-2.5 rounded-xl bg-[#121815] hover:bg-emerald-950/40 text-slate-300 font-medium text-xs border border-emerald-900/60 transition"
          >
            Kembali ke Login
          </button>
          <button
            id="start-generating-btn"
            onClick={() => onNavigate('beranda')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md border border-emerald-400/40 transition"
          >
            <span>Buka Dashboard Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

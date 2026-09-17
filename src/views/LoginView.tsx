import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { PromptCategory, UserProfile } from '../types';
import {
  LogIn,
  ShieldCheck,
  Mail,
  User,
  School,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface LoginViewProps {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  onLoginWithGoogle: () => Promise<void>;
  onSuccessBuyerLogin: (data: { email: string; name: string; schoolName: string }) => void;
  onSuccessAdminLogin: () => void;
  onNavigate: (category: PromptCategory) => void;
  onShowToast: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  user,
  profile,
  onLoginWithGoogle,
  onSuccessBuyerLogin,
  onSuccessAdminLogin,
  onNavigate,
  onShowToast,
}) => {
  // Tab state: 'buyer' for Bagian 1, 'admin' for Bagian 2
  const [activeTab, setActiveTab] = useState<'buyer' | 'admin'>('buyer');

  // ==================== BAGIAN 1: FORM LOGIN PEMBELI ====================
  const [buyerForm, setBuyerForm] = useState({
    buyerName: profile?.teacherName || user?.displayName || 'Eko Wahyudi',
    linkedEmail: user?.email || profile?.email || 'ekowahyudi49@guru.sd.belajar.id',
    schoolName: profile?.schoolName || 'SD Muhammadiyah 16 Surabaya',
  });

  const [buyerError, setBuyerError] = useState<string | null>(null);
  const [isSubmittingBuyer, setIsSubmittingBuyer] = useState(false);

  // Sync if Google user changes
  useEffect(() => {
    if (user?.email) {
      setBuyerForm((prev) => ({
        ...prev,
        linkedEmail: user.email || prev.linkedEmail,
        buyerName: user.displayName || prev.buyerName,
      }));
    }
  }, [user]);

  const handleSubmitBuyerForm = (e: React.FormEvent) => {
    e.preventDefault();
    setBuyerError(null);

    if (!buyerForm.linkedEmail || !buyerForm.linkedEmail.includes('@')) {
      setBuyerError('Harap masukkan Email Tertaut yang valid.');
      return;
    }

    if (!buyerForm.buyerName.trim()) {
      setBuyerError('Nama lengkap pembeli / guru harus diisi.');
      return;
    }

    setIsSubmittingBuyer(true);

    setTimeout(() => {
      setIsSubmittingBuyer(false);
      onShowToast(`Login Pembeli berhasil! Selamat datang, ${buyerForm.buyerName.trim()}.`);
      onSuccessBuyerLogin({
        email: buyerForm.linkedEmail.trim(),
        name: buyerForm.buyerName.trim(),
        schoolName: buyerForm.schoolName.trim(),
      });
    }, 300);
  };

  // ==================== BAGIAN 2: LOGIN ADMIN (ID: 909090) ====================
  const [adminNumber, setAdminNumber] = useState('909090');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isAdminSubmitting, setIsAdminSubmitting] = useState(false);

  const handleSubmitAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    // Validasi nomor admin harus 909090
    if (adminNumber.trim() !== '909090') {
      setAdminError('Nomor ID Admin harus bernilai 909090.');
      return;
    }

    // Validasi password admin
    const validPasswords = ['909090', 'admin9090', 'kreasikertas9090'];

    if (!adminPassword || !validPasswords.includes(adminPassword.trim())) {
      setAdminError('Nomor Admin atau Password tidak sesuai.');
      return;
    }

    setIsAdminSubmitting(true);
    setTimeout(() => {
      setIsAdminSubmitting(false);
      onShowToast('Login Admin 909090 Berhasil!');
      onSuccessAdminLogin();
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Page Title & Explanation */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/50 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>PORTAL MASUK KREASIKERTAS.STUDIO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Halaman Login <span className="text-emerald-400">& Verifikasi Akses</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Silakan pilih jalur akses di bawah ini: <strong>Bagian 1 untuk Pembeli</strong> dengan email tertaut, atau <strong>Bagian 2 untuk Login Admin (909090)</strong>.
        </p>
      </div>

      {/* Two-Part Switcher Tab */}
      <div className="flex p-1.5 rounded-2xl bg-[#0e1612] border border-emerald-900/60 max-w-lg mx-auto">
        <button
          id="tab-login-pembeli"
          onClick={() => setActiveTab('buyer')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'buyer'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-950 border border-emerald-400/50'
              : 'text-slate-400 hover:text-white hover:bg-emerald-950/40'
          }`}
        >
          <User className="w-4 h-4 text-emerald-300" />
          <span>Bagian 1: Login Pembeli</span>
        </button>

        <button
          id="tab-login-admin"
          onClick={() => setActiveTab('admin')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'admin'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-950 border border-emerald-400/50'
              : 'text-slate-400 hover:text-white hover:bg-emerald-950/40'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-300" />
          <span>Bagian 2: Login Admin (909090)</span>
        </button>
      </div>

      {/* ==================== BAGIAN 1: LOGIN PEMBELI ==================== */}
      {activeTab === 'buyer' && (
        <div className="rounded-2xl bg-[#0e1612] border border-emerald-900/60 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-emerald-900/40">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-900/80 border border-emerald-600/40 flex items-center justify-center text-emerald-300 text-xs">
                1
              </span>
              <span>Login Pembeli dengan Email Tertaut</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tautkan akun Google atau masukkan email pembeli Anda untuk mendapatkan akses ke seluruh generator modul prompt.
            </p>
          </div>

          {/* Google Quick Link Banner */}
          <div className="p-4 rounded-xl bg-[#131d17] border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#090d0b] border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Status Akun Google:</span>
                  {user ? (
                    <span className="text-emerald-400 font-normal">
                      Terhubung ({user.email})
                    </span>
                  ) : (
                    <span className="text-slate-400 font-normal">
                      Belum terhubung
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  {user
                    ? 'Akun Google Anda aktif dan terverifikasi di Kreasikertas Studio.'
                    : 'Masuk dengan akun Google untuk sinkronisasi otomatis.'}
                </div>
              </div>
            </div>

            {!user ? (
              <button
                type="button"
                id="link-google-buyer-btn"
                onClick={onLoginWithGoogle}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk Akun Google</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-700/60 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Email Tertaut Siap</span>
              </div>
            )}
          </div>

          {buyerError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{buyerError}</span>
            </div>
          )}

          {/* Form Login Pembeli */}
          <form onSubmit={handleSubmitBuyerForm} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email Tertaut Pembeli *</span>
              </label>
              <input
                id="buyer-email-input"
                type="email"
                required
                value={buyerForm.linkedEmail}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, linkedEmail: e.target.value })
                }
                placeholder="contoh: nama.guru@belajar.id"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 block">
                Email terdaftar yang digunakan untuk mengakses modul & materi kreasikertas.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nama Lengkap Pembeli / Guru *</span>
                </label>
                <input
                  id="buyer-name-input"
                  type="text"
                  required
                  value={buyerForm.buyerName}
                  onChange={(e) =>
                    setBuyerForm({ ...buyerForm, buyerName: e.target.value })
                  }
                  placeholder="Nama Lengkap (misal: Eko Wahyudi)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nama Sekolah / Lembaga</span>
                </label>
                <input
                  id="buyer-school-input"
                  type="text"
                  value={buyerForm.schoolName}
                  onChange={(e) =>
                    setBuyerForm({ ...buyerForm, schoolName: e.target.value })
                  }
                  placeholder="SD Muhammadiyah 16 Surabaya"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="submit-buyer-login-btn"
                disabled={isSubmittingBuyer}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-950 border border-emerald-400/50 transition disabled:opacity-50"
              >
                {isSubmittingBuyer ? (
                  <span>Memproses Masuk...</span>
                ) : (
                  <>
                    <span>Masuk sebagai Pembeli</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================== BAGIAN 2: LOGIN ADMIN ==================== */}
      {activeTab === 'admin' && (
        <div className="rounded-2xl bg-[#0e1612] border border-emerald-900/60 p-6 sm:p-8 shadow-xl space-y-6 max-w-lg mx-auto">
          <div className="space-y-1 pb-4 border-b border-emerald-900/40 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-emerald-400 mx-auto mb-2 shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">
              Bagian 2: Login Admin
            </h2>
            <p className="text-xs text-slate-400">
              Masuk menggunakan <strong>Nomor Admin: 909090</strong>.
            </p>
          </div>

          {adminError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{adminError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitAdminLogin} className="space-y-4">
            {/* Admin Number (909090) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nomor Admin *</span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  ID: 909090
                </span>
              </div>
              <input
                id="admin-number-input"
                type="text"
                required
                value={adminNumber}
                onChange={(e) => setAdminNumber(e.target.value)}
                placeholder="909090"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono font-bold tracking-wider"
              />
            </div>

            {/* Admin Password (Strictly Hidden, NO keterangan password whatsoever) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Password Admin *</span>
              </label>

              {/* Password masked with NO eye/toggle icon, and NO hint/keterangan */}
              <input
                id="admin-password-input"
                type="password"
                required
                autoComplete="current-password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#131d17] border border-emerald-900/60 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono tracking-widest"
              />
            </div>

            {/* Submit Button for Admin */}
            <div className="pt-2">
              <button
                type="submit"
                id="admin-login-submit-btn"
                disabled={isAdminSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-950 border border-emerald-400/50 transition disabled:opacity-50"
              >
                {isAdminSubmitting ? (
                  <span>Memverifikasi Otoritas Admin...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Masuk ke Panel Admin (909090)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

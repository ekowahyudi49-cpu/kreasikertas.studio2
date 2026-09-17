import React, { useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProfile } from '../types';
import { X, User, School, Mail, Shield, Save, LogOut, Check } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FirebaseUser | null;
  profile: UserProfile | null;
  onUpdateProfile: (data: { schoolName: string; teacherName: string }) => Promise<void>;
  onLogout: () => void;
  savedCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  profile,
  onUpdateProfile,
  onLogout,
  savedCount,
}) => {
  const [schoolName, setSchoolName] = useState(profile?.schoolName || 'SD Muhammadiyah 16 Surabaya');
  const [teacherName, setTeacherName] = useState(profile?.teacherName || 'Eko Wahyudi');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateProfile({ schoolName, teacherName });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#101713] border border-emerald-800 p-6 shadow-2xl space-y-5 text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/70 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Profil Guru & Pengaturan Akun</h3>
              <p className="text-xs text-slate-400">KREASIKERTAS.STUDIO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Auth Banner */}
        <div className="p-3 rounded-xl bg-[#141d18] border border-emerald-900/60 flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full ring-2 ring-emerald-500" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-300 font-bold text-sm">
              {teacherName.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate">{teacherName}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1 truncate">
              <Mail className="w-3 h-3 text-emerald-400" />
              <span>{user?.email || 'guru@sdm16surabaya.sch.id'}</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
              {savedCount} Prompt Tersimpan di Cloud Firestore
            </div>
          </div>
        </div>

        {/* Form to update school & teacher defaults */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <School className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nama Sekolah Default</span>
            </label>
            <input
              type="text"
              id="profile-school-input"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#16201b] border border-emerald-900 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nama Guru / Kreator Default</span>
            </label>
            <input
              type="text"
              id="profile-teacher-input"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#16201b] border border-emerald-900 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950 cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Pengaturan Berhasil Disimpan</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-emerald-900/40">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-900/60 text-red-300 hover:text-red-200 text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar dari Akun</span>
          </button>
        </div>
      </div>
    </div>
  );
};

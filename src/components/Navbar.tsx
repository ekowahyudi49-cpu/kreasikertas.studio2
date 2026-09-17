import React from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { Sparkles, User, School, LogIn, Menu, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  onOpenProfile: () => void;
  onLogin: () => void;
  onOpenLoginPage: () => void;
  onToggleSidebar: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  profile,
  onOpenProfile,
  onLogin,
  onOpenLoginPage,
  onToggleSidebar,
  isAdminLoggedIn = false,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-[#090d0b]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/60 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onOpenLoginPage()}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 p-0.5 shadow-lg shadow-emerald-950/60">
              <div className="w-full h-full bg-[#090d0b] rounded-[10px] flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-white">
                  KREASIKERTAS<span className="text-emerald-400">.STUDIO</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-emerald-950 text-emerald-300 border border-emerald-800">
                  PRO
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium leading-none">
                Generator Prompt Edukasi Bahasa Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Center: School Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121815] border border-emerald-900/60 text-xs text-slate-300">
          <School className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-white">{profile?.schoolName || 'SD Muhammadiyah 16 Surabaya'}</span>
          <span className="text-emerald-500">•</span>
          <span className="text-slate-400">{profile?.teacherName || 'Eko Wahyudi'}</span>
        </div>

        {/* Right: PWA Button + Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dedicated Login / Portal Button */}
          <button
            id="nav-login-page-btn"
            onClick={onOpenLoginPage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              isAdminLoggedIn
                ? 'bg-emerald-900/70 border-emerald-400 text-emerald-300 shadow-md'
                : 'bg-[#121815] hover:bg-emerald-950/60 border-emerald-700/60 text-emerald-400'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">
              {isAdminLoggedIn ? 'Admin 909090' : 'Halaman Login'}
            </span>
          </button>

          <PWAInstallButton />

          {user ? (
            <button
              id="user-profile-nav-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121815] hover:bg-emerald-950/40 border border-emerald-800/60 text-slate-200 transition text-xs font-semibold"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Guru'} className="w-6 h-6 rounded-full ring-1 ring-emerald-500" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-emerald-800/80 flex items-center justify-center text-emerald-200">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="hidden sm:inline font-medium text-white max-w-[120px] truncate">
                {profile?.teacherName || user.displayName || 'Eko Wahyudi'}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          ) : (
            <button
              id="login-google-nav-btn"
              onClick={onLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-950 border border-emerald-400/40"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk Google</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

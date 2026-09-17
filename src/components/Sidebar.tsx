import React from 'react';
import { PromptCategory, UserProfile } from '../types';
import {
  Home,
  FileText,
  Scissors,
  Box,
  Palette,
  BookOpen,
  Layers,
  Compass,
  GitCompare,
  PenTool,
  Star,
  Gift,
  LogOut,
  UserCheck,
  Sparkles,
  ChevronRight,
  LogIn,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  currentCategory: PromptCategory;
  onSelectCategory: (cat: PromptCategory) => void;
  savedCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  profile: UserProfile | null;
  onLogout: () => void;
  onOpenProfile: () => void;
  isAdminLoggedIn?: boolean;
  hasActiveOrder?: boolean;
}

interface MenuItem {
  id: PromptCategory;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  desc: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  onSelectCategory,
  savedCount,
  isOpenMobile,
  onCloseMobile,
  profile,
  onLogout,
  onOpenProfile,
  isAdminLoggedIn = false,
  hasActiveOrder = false,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-4 h-4" />,
      desc: 'Semua kategori prompt & statistik',
    },
    {
      id: 'login',
      label: 'Halaman Login',
      icon: <LogIn className="w-4 h-4" />,
      desc: 'Login Pembeli & Admin 909090',
      badge: '2 Bagian',
    },
    ...(isAdminLoggedIn
      ? [
          {
            id: 'admin_panel' as PromptCategory,
            label: 'Panel Admin',
            icon: <ShieldAlert className="w-4 h-4" />,
            desc: 'Panel Otoritas Admin (909090)',
            badge: '909090',
          },
        ]
      : []),
    {
      id: 'worksheet_essay',
      label: 'Worksheet Essay',
      icon: <FileText className="w-4 h-4" />,
      desc: '5–30 soal essay bertingkat',
      badge: '5-30 Soal',
    },
    {
      id: 'gunting_tempel',
      label: 'Gunting Tempel',
      icon: <Scissors className="w-4 h-4" />,
      desc: 'Prompt craft cut & paste',
    },
    {
      id: 'papercraft',
      label: 'Papercraft',
      icon: <Box className="w-4 h-4" />,
      desc: 'Rumah, kendaraan, hewan 3D',
    },
    {
      id: 'mewarnai',
      label: 'Mewarnai',
      icon: <Palette className="w-4 h-4" />,
      desc: 'Coloring pages edukatif',
    },
    {
      id: 'lkpd',
      label: 'LKPD',
      icon: <BookOpen className="w-4 h-4" />,
      desc: 'LKPD Kurikulum Merdeka lengkap',
      badge: 'Lengkap',
    },
    {
      id: 'flashcard',
      label: 'Flashcard',
      icon: <Layers className="w-4 h-4" />,
      desc: 'Prompt Flashcard dua sisi',
    },
    {
      id: 'maze',
      label: 'Maze & Puzzle',
      icon: <Compass className="w-4 h-4" />,
      desc: 'Maze labirin & teka-teki anak',
    },
    {
      id: 'matching',
      label: 'Matching',
      icon: <GitCompare className="w-4 h-4" />,
      desc: 'Lembar mencocokkan garis',
    },
    {
      id: 'tracing',
      label: 'Tracing',
      icon: <PenTool className="w-4 h-4" />,
      desc: 'Latihan garis, huruf & angka',
    },
    {
      id: 'favorit',
      label: 'Favorit',
      icon: <Star className="w-4 h-4" />,
      desc: 'Prompt tersimpan di Cloud Firestore',
      badge: savedCount > 0 ? `${savedCount}` : undefined,
    },
    {
      id: 'bonus',
      label: 'Bonus Prompt',
      icon: <Gift className="w-4 h-4" />,
      desc: '3000+ Prompt Premium Guru',
      badge: '3000+',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-[#0d1310] border-r border-emerald-900/40 p-4 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-1 overflow-y-auto pr-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500/80">
            Menu Dashboard
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentCategory === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-menu-${item.id}`}
                  onClick={() => {
                    onSelectCategory(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-md shadow-emerald-950/60 border border-emerald-500/50'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-950/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`p-1.5 rounded-lg transition ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800/80 text-emerald-400 group-hover:bg-emerald-900/60'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div className="truncate">
                      <div className="font-semibold truncate">{item.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-emerald-900'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User / Creator Card & Logout */}
        <div className="pt-3 mt-2 border-t border-emerald-900/40 space-y-2">
          <div
            onClick={onOpenProfile}
            role="button"
            tabIndex={0}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#121815] border border-emerald-900/60 hover:border-emerald-700 transition cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/80 border border-emerald-600/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
                EW
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {profile?.teacherName || 'Eko Wahyudi'}
                </div>
                <div className="text-[10px] text-emerald-400 truncate">
                  {profile?.schoolName || 'SD Muhammadiyah 16 Sby'}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar / Atur Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
};

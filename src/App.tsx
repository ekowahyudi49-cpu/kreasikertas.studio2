/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PromptCategory,
  GuruInput,
  GeneratedPromptResult,
  SavedPromptItem,
  UserProfile,
  BuyerOrder,
} from './types';
import {
  auth,
  loginWithGoogle,
  logoutUser,
  syncUserProfile,
  getUserProfile,
  savePromptToFirestore,
  getSavedPromptsFromFirestore,
  deleteSavedPromptFromFirestore,
} from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { generateEducationalPrompt } from './services/promptEngine';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GuruInputForm } from './components/GuruInputForm';
import { PromptResultCard } from './components/PromptResultCard';
import { UserProfileModal } from './components/UserProfileModal';
import { OfflineIndicator } from './components/OfflineIndicator';

// Views
import { BerandaView } from './views/BerandaView';
import { FavoritesView } from './views/FavoritesView';
import { BonusPromptsView } from './views/BonusPromptsView';
import { LoginView } from './views/LoginView';
import { OrderHeroView } from './views/OrderHeroView';
import { AdminPanelView } from './views/AdminPanelView';
import { getStoredOrders } from './data/orderData';

export default function App() {
  // Navigation & Category state
  const [currentCategory, setCurrentCategory] = useState<PromptCategory>('beranda');
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  // User & Auth state
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Admin & Order Hero State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [orders, setOrders] = useState<BuyerOrder[]>(() => getStoredOrders());
  const [currentHeroOrder, setCurrentHeroOrder] = useState<BuyerOrder | null>(null);

  // Teacher Defaults
  const [guruInput, setGuruInput] = useState<GuruInput>({
    schoolName: 'SD Muhammadiyah 16 Surabaya',
    teacherName: 'Eko Wahyudi',
    grade: 'SD Kelas 5',
    subject: 'Bahasa Inggris',
    theme: 'Animals & Fruits',
    questionCount: 10,
    paperSize: 'A4',
    orientation: 'Portrait',
    language: 'Indonesia',
    targetAI: 'ChatGPT / Claude / Gemini / Midjourney',
  });

  // Prompt Results & Firestore State
  const [currentResult, setCurrentResult] = useState<GeneratedPromptResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userProf = await getUserProfile(currentUser.uid);
          if (userProf) {
            setProfile(userProf);
            setGuruInput((prev) => ({
              ...prev,
              schoolName: userProf.schoolName || prev.schoolName,
              teacherName: userProf.teacherName || prev.teacherName,
            }));
          }
          // Fetch saved prompts from Firestore
          const items = await getSavedPromptsFromFirestore(currentUser.uid);
          setSavedPrompts(items);
        } catch (err) {
          console.warn('Firestore sync note:', err);
        }
      } else {
        // Fallback local saved prompts if not signed in
        const localSaved = localStorage.getItem('kreasikertas_saved_prompts');
        if (localSaved) {
          try {
            setSavedPrompts(JSON.parse(localSaved));
          } catch {
            setSavedPrompts([]);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Update initial guru inputs based on category for teacher convenience
  useEffect(() => {
    if (currentCategory === 'worksheet_essay') {
      setGuruInput((prev) => ({
        ...prev,
        questionCount: 15,
        subject: prev.subject || 'Bahasa Indonesia',
        theme: prev.theme || 'Literasi Sains & Lingkungan',
      }));
    } else if (currentCategory === 'papercraft') {
      setGuruInput((prev) => ({
        ...prev,
        theme: 'Rumah Adat Nusantara & Miniatur Satwa',
        orientation: 'Landscape',
      }));
    } else if (currentCategory === 'gunting_tempel') {
      setGuruInput((prev) => ({
        ...prev,
        theme: 'Puzzle Anatomi Hewan & Tumbuhan',
      }));
    } else if (currentCategory === 'mewarnai') {
      setGuruInput((prev) => ({
        ...prev,
        theme: 'Fauna Dilindungi Indonesia',
      }));
    } else if (currentCategory === 'lkpd') {
      setGuruInput((prev) => ({
        ...prev,
        subject: 'IPAS',
        theme: 'Siklus Hidup Makhluk Hidup & Ekosistem',
        questionCount: 10,
      }));
    } else if (currentCategory === 'flashcard') {
      setGuruInput((prev) => ({
        ...prev,
        subject: 'Bahasa Inggris',
        theme: 'Animals & Daily Activities',
        questionCount: 20,
        orientation: 'Landscape',
      }));
    } else if (currentCategory === 'maze') {
      setGuruInput((prev) => ({
        ...prev,
        theme: 'Petualangan Sistem Tata Surya',
      }));
    } else if (currentCategory === 'matching') {
      setGuruInput((prev) => ({
        ...prev,
        questionCount: 10,
        theme: 'Pasangan Konsep Sains & Kosakata',
      }));
    } else if (currentCategory === 'tracing') {
      setGuruInput((prev) => ({
        ...prev,
        grade: 'TK B',
        theme: 'Huruf Abjad & Angka 1-20',
        questionCount: 10,
      }));
    }
  }, [currentCategory]);

  // Handle Login with Google
  const handleLogin = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) {
        showToast('Berhasil masuk dengan akun Google!');
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        showToast('Login Google dibatalkan atau terkendala.');
      }
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setProfile(null);
    showToast('Anda telah keluar dari akun.');
  };

  // Handle Profile Update
  const handleUpdateProfile = async (data: { schoolName: string; teacherName: string }) => {
    setGuruInput((prev) => ({
      ...prev,
      schoolName: data.schoolName,
      teacherName: data.teacherName,
    }));

    if (user) {
      await syncUserProfile(user, data);
      setProfile((prev) =>
        prev
          ? { ...prev, ...data, updatedAt: new Date().toISOString() }
          : {
              id: user.uid,
              email: user.email || '',
              displayName: user.displayName || data.teacherName,
              ...data,
              createdAt: new Date().toISOString(),
            }
      );
    }
    showToast('Identitas guru dan sekolah berhasil diperbarui!');
  };

  // Handle Generate Prompt
  const handleGeneratePrompt = (input: GuruInput) => {
    setIsGenerating(true);
    setGuruInput(input);

    setTimeout(() => {
      const result = generateEducationalPrompt(currentCategory, input);
      setCurrentResult(result);
      setIsGenerating(false);
      showToast('Prompt Bahasa Indonesia berhasil digenerate!');
      
      // Auto-scroll to result card smoothly
      const el = document.getElementById('generated-result-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  // Handle Save Prompt to Favorites (Cloud Firestore)
  const handleSaveToFavorites = async (result: GeneratedPromptResult) => {
    const isAlreadySaved = savedPrompts.some(
      (p) => p.title === result.title && p.category === result.category
    );

    if (isAlreadySaved) {
      showToast('Prompt ini sudah ada di daftar Favorit Anda.');
      return;
    }

    if (user) {
      try {
        const id = await savePromptToFirestore(user.uid, {
          title: result.title,
          category: result.category,
          promptText: result.promptText,
          schoolName: result.metadata.schoolName,
          teacherName: result.metadata.teacherName,
          grade: result.metadata.grade,
          subject: result.metadata.subject,
          theme: result.metadata.theme,
          questionCount: result.metadata.questionCount,
          paperSize: result.metadata.paperSize,
          orientation: result.metadata.orientation,
          language: result.metadata.language,
        });

        const newItem: SavedPromptItem = {
          id,
          userId: user.uid,
          title: result.title,
          category: result.category,
          promptText: result.promptText,
          schoolName: result.metadata.schoolName,
          teacherName: result.metadata.teacherName,
          grade: result.metadata.grade,
          subject: result.metadata.subject,
          theme: result.metadata.theme,
          questionCount: result.metadata.questionCount,
          paperSize: result.metadata.paperSize,
          orientation: result.metadata.orientation,
          language: result.metadata.language,
          createdAt: new Date().toISOString(),
        };

        setSavedPrompts((prev) => [newItem, ...prev]);
        showToast('Prompt berhasil disimpan ke Cloud Firestore!');
      } catch (err) {
        console.error('Save to Firestore error', err);
        showToast('Disimpan secara lokal di browser.');
      }
    } else {
      // Local storage fallback
      const newItem: SavedPromptItem = {
        id: 'local_' + Date.now(),
        userId: 'guest',
        title: result.title,
        category: result.category,
        promptText: result.promptText,
        schoolName: result.metadata.schoolName,
        teacherName: result.metadata.teacherName,
        grade: result.metadata.grade,
        subject: result.metadata.subject,
        theme: result.metadata.theme,
        questionCount: result.metadata.questionCount,
        paperSize: result.metadata.paperSize,
        orientation: result.metadata.orientation,
        language: result.metadata.language,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...savedPrompts];
      setSavedPrompts(updated);
      localStorage.setItem('kreasikertas_saved_prompts', JSON.stringify(updated));
      showToast('Prompt disimpan ke Favorit lokal (Masuk Google untuk simpan ke Cloud).');
    }
  };

  // Handle Delete Saved Prompt
  const handleDeletePrompt = async (id: string) => {
    if (user && !id.startsWith('local_')) {
      try {
        await deleteSavedPromptFromFirestore(user.uid, id);
      } catch (err) {
        console.error('Delete from Firestore error', err);
      }
    }

    const updated = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('kreasikertas_saved_prompts', JSON.stringify(updated));
    showToast('Prompt dihapus dari Favorit.');
  };

  // Order Hero & Admin handlers
  const refreshOrders = () => {
    setOrders(getStoredOrders());
  };

  const handleBuyerLoginSuccess = (data: { email: string; name: string; schoolName: string }) => {
    setProfile((prev) => ({
      uid: user?.uid || prev?.uid || 'buyer-user',
      email: data.email,
      teacherName: data.name,
      schoolName: data.schoolName || prev?.schoolName || 'SD Muhammadiyah 16 Surabaya',
      preferredGrades: prev?.preferredGrades || ['Kelas 4', 'Kelas 5'],
      preferredSubjects: prev?.preferredSubjects || ['Tematik Terpadu', 'IPAS'],
      createdAt: prev?.createdAt || new Date().toISOString(),
      lastActive: new Date().toISOString(),
    }));

    if (data.name) {
      setGuruInput((prev) => ({
        ...prev,
        teacherName: data.name,
        schoolName: data.schoolName || prev.schoolName,
      }));
    }

    setCurrentCategory('beranda');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    refreshOrders();
    setCurrentCategory('admin_panel');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Admin 909090 telah keluar dari sesi.');
    setCurrentCategory('login');
  };

  // Category title lookup
  const getCategoryTitle = (cat: PromptCategory): string => {
    switch (cat) {
      case 'login':
        return 'Halaman Login & Verifikasi Akses';
      case 'order_hero':
        return 'Order Hero (Detail Pesanan Pembeli)';
      case 'admin_panel':
        return 'Panel Admin (ID: 909090)';
      case 'worksheet_essay':
        return 'Worksheet Essay (5–30 Soal)';
      case 'gunting_tempel':
        return 'Gunting Tempel (Cut & Paste)';
      case 'papercraft':
        return 'Papercraft 3D (Rumah, Kendaraan, Hewan)';
      case 'mewarnai':
        return 'Coloring Worksheet (Mewarnai Edukatif)';
      case 'lkpd':
        return 'LKPD Lengkap (Kurikulum Merdeka)';
      case 'flashcard':
        return 'Flashcard Dua Sisi';
      case 'maze':
        return 'Maze & Puzzle (Labirin Anak)';
      case 'matching':
        return 'Matching Worksheet (Mencocokkan)';
      case 'tracing':
        return 'Tracing (Garis, Huruf & Angka)';
      case 'favorit':
        return 'Prompt Favorit';
      case 'bonus':
        return '3000+ Bonus Prompt Premium';
      default:
        return 'Beranda';
    }
  };

  return (
    <div className="min-h-screen bg-[#090d0b] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Navigation */}
      <Navbar
        user={user}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLogin={handleLogin}
        onOpenLoginPage={() => setCurrentCategory('login')}
        onToggleSidebar={() => setIsSidebarMobileOpen((prev) => !prev)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 gap-6">
        {/* Sidebar Navigation */}
        <Sidebar
          currentCategory={currentCategory}
          onSelectCategory={(cat) => {
            setCurrentCategory(cat);
            // Reset current result when switching generator tabs if desired
          }}
          savedCount={savedPrompts.length}
          isOpenMobile={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
          profile={profile}
          onLogout={handleLogout}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
          hasActiveOrder={Boolean(currentHeroOrder || orders.length > 0)}
        />

        {/* Main Content Area (Offset for desktop fixed sidebar) */}
        <main className="flex-1 lg:pl-80 max-w-full">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-emerald-400 animate-in fade-in slide-in-from-top-2">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* View Routing */}
          {currentCategory === 'beranda' ? (
            <BerandaView
              onSelectCategory={setCurrentCategory}
              guruInput={guruInput}
              savedCount={savedPrompts.length}
            />
          ) : currentCategory === 'favorit' ? (
            <FavoritesView
              savedPrompts={savedPrompts}
              onDeletePrompt={handleDeletePrompt}
              onSelectCategory={setCurrentCategory}
            />
          ) : currentCategory === 'bonus' ? (
            <BonusPromptsView guruInput={guruInput} />
          ) : currentCategory === 'login' ? (
            <LoginView
              user={user}
              profile={profile}
              onLoginWithGoogle={handleLogin}
              onSuccessBuyerLogin={handleBuyerLoginSuccess}
              onSuccessAdminLogin={handleAdminLoginSuccess}
              onNavigate={setCurrentCategory}
              onShowToast={showToast}
            />
          ) : currentCategory === 'order_hero' ? (
            currentHeroOrder ? (
              <OrderHeroView
                order={currentHeroOrder}
                onNavigate={setCurrentCategory}
                onShowToast={showToast}
              />
            ) : orders.length > 0 ? (
              <OrderHeroView
                order={orders[0]}
                onNavigate={setCurrentCategory}
                onShowToast={showToast}
              />
            ) : (
              <LoginView
                user={user}
                profile={profile}
                onLoginWithGoogle={handleLogin}
                onSuccessBuyerLogin={handleBuyerLoginSuccess}
                onSuccessAdminLogin={handleAdminLoginSuccess}
                onNavigate={setCurrentCategory}
                onShowToast={showToast}
              />
            )
          ) : currentCategory === 'admin_panel' ? (
            isAdminLoggedIn ? (
              <AdminPanelView
                orders={orders}
                onRefreshOrders={refreshOrders}
                onLogoutAdmin={handleAdminLogout}
                onNavigate={setCurrentCategory}
                onShowToast={showToast}
              />
            ) : (
              <LoginView
                user={user}
                profile={profile}
                onLoginWithGoogle={handleLogin}
                onSuccessBuyerLogin={handleBuyerLoginSuccess}
                onSuccessAdminLogin={handleAdminLoginSuccess}
                onNavigate={setCurrentCategory}
                onShowToast={showToast}
              />
            )
          ) : (
            /* Specific Generator Views (Worksheet Essay, Gunting Tempel, Papercraft, etc.) */
            <div className="space-y-6 animate-in fade-in">
              <GuruInputForm
                currentCategory={currentCategory}
                categoryTitle={getCategoryTitle(currentCategory)}
                initialValues={guruInput}
                onGenerate={handleGeneratePrompt}
                isGenerating={isGenerating}
              />

              {/* Generated Result Section */}
              {currentResult && currentResult.category === currentCategory && (
                <div id="generated-result-section" className="scroll-mt-20">
                  <PromptResultCard
                    result={currentResult}
                    onSaveToFavorites={handleSaveToFavorites}
                    isSaved={savedPrompts.some((p) => p.title === currentResult.title)}
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Profile & Account Settings Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
        savedCount={savedPrompts.length}
      />

      {/* Offline Status Banner */}
      <OfflineIndicator />
    </div>
  );
}

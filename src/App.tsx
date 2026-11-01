import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ProfileTab } from './components/ProfileTab';
import { QRHubTab } from './components/QRHubTab';
import { JBAIAgencySection } from './components/JBAIAgencySection';
import { AdminEditorModal } from './components/AdminEditorModal';
import { ShareModal } from './components/ShareModal';
import { QrDetailModal } from './components/QrDetailModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { currentTab, activeTenant } = useApp();

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-[#0a1b42]/40 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="fixed -top-40 right-10 w-96 h-96 rounded-full bg-amber-500/5 pointer-events-none blur-3xl" />
      <div className="fixed bottom-20 left-10 w-80 h-80 rounded-full bg-blue-600/5 pointer-events-none blur-3xl" />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 pt-4 sm:pt-6">
        {currentTab === 'profile' && <ProfileTab />}
        {currentTab === 'qrhub' && <QRHubTab />}
        {currentTab === 'agency' && <JBAIAgencySection />}
      </main>

      {/* Native Bottom Navigation Bar */}
      <BottomNav />

      {/* Interactive Modals */}
      <AdminEditorModal />
      <ShareModal />
      <QrDetailModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

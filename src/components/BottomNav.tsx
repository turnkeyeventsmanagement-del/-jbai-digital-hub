import React from 'react';
import { User, QrCode, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeTenant } = useApp();

  const enabledQRsCount = activeTenant.socialLinks.filter(
    (l) => l.enabled && l.qrEnabled && l.url
  ).length + (activeTenant.upiConfig?.enabled ? 1 : 0);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'qrhub',
      label: 'QR Code Hub',
      icon: <QrCode className="w-5 h-5" />,
      badge: enabledQRsCount > 0 ? enabledQRsCount : undefined,
    },
    {
      id: 'agency',
      label: 'Contact Us',
      icon: <ShieldCheck className="w-5 h-5" />,
      badge: 'JBAI',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#07132a]/90 backdrop-blur-2xl border-t border-amber-500/25 px-4 py-2 safe-area-pb shadow-2xl shadow-black">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-400 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : ''
                  }`}
                >
                  {tab.icon}
                </div>

                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-tight shadow-sm ${
                      tab.id === 'agency'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-black'
                        : 'bg-amber-400 text-slate-950'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-semibold tracking-wide mt-0.5 ${
                  isActive ? 'text-amber-300 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>

              {isActive && (
                <div className="absolute -bottom-1 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm shadow-amber-400/80" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

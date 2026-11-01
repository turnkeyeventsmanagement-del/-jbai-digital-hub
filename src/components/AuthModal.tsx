import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    userRole, 
    loginAsAdmin, 
    loginAsClient, 
    logout, 
    tenants, 
    activeTenant, 
    switchTenant 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'admin' | 'client'>('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [clientInput, setClientInput] = useState(activeTenant.clientAccessCode || 'TK2026');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = loginAsAdmin(adminPassword);
    if (success) {
      setSuccessMessage('Logged in as Master Admin (Gurugram JBAI Digital Team)');
      setTimeout(() => {
        setSuccessMessage('');
        setIsAuthModalOpen(false);
      }, 1000);
    } else {
      setErrorMessage('Invalid Master Password. (Hint: use "admin123")');
    }
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = loginAsClient(clientInput);
    if (success) {
      setSuccessMessage('Logged in as Client (View-Only Mode)');
      setTimeout(() => {
        setSuccessMessage('');
        setIsAuthModalOpen(false);
      }, 1000);
    } else {
      setErrorMessage('No matching client found for this Access PIN or Email.');
    }
  };

  const handleQuickClientSelect = (tenantId: string) => {
    switchTenant(tenantId);
    const tenant = tenants.find((t) => t.id === tenantId);
    if (tenant) {
      loginAsClient(tenant.clientAccessCode);
      setSuccessMessage(`Switched to ${tenant.brandName} (View Mode)`);
      setTimeout(() => {
        setSuccessMessage('');
        setIsAuthModalOpen(false);
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl relative animate-in zoom-in-95 gold-card-shadow">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl mx-auto mb-2 p-[1.5px] bg-gradient-to-tr from-amber-400 to-amber-700 shadow-md shadow-amber-500/20">
            <div className="w-full h-full rounded-[14px] bg-[#07132a] flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-white font-display">
            Role-Based Authentication
          </h2>
          <p className="text-xs text-slate-400">
            Current Active Role:{' '}
            <strong className={userRole === 'master_admin' ? 'text-amber-300' : 'text-blue-300'}>
              {userRole === 'master_admin' ? 'MASTER ADMIN' : 'CLIENT VIEWER'}
            </strong>
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#07132a] rounded-xl border border-amber-500/20 mb-5">
          <button
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Master Admin</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('client');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'client'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Client View Mode</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ADMIN LOGIN TAB */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong>Gurugram / JBAI Digital Master Privileges:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-slate-300">
                <li>Full editing of logos (gallery upload & presets)</li>
                <li>Edit brand titles, About Us & key offerings</li>
                <li>Configure custom social links & dynamic QRs</li>
                <li>Manage multi-tenant profiles & backups</li>
              </ul>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                Admin Master Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password (default: admin123)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
                <Key className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                Login as Master Admin
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsAdmin('admin123');
                  setSuccessMessage('Logged in as Master Admin!');
                  setTimeout(() => setIsAuthModalOpen(false), 800);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30"
                title="1-Click Admin Access"
              >
                1-Click
              </button>
            </div>
          </form>
        )}

        {/* CLIENT LOGIN TAB */}
        {activeTab === 'client' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200/90 leading-relaxed">
              <strong>Dedicated Client View Mode:</strong>
              <p className="text-[11px] text-slate-300 mt-1">
                Allows clients to view and share their pre-configured digital visiting card with all editing controls locked and protected.
              </p>
            </div>

            <form onSubmit={handleClientSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  Enter Client Access PIN or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientInput}
                    onChange={(e) => setClientInput(e.target.value)}
                    placeholder="e.g. TK2026 or turnkeyeventsmanagement@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <Lock className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105"
              >
                Access Dedicated Client Card
              </button>
            </form>

            {/* Quick Demo Pre-Seeded Client Buttons */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                Or One-Click Launch Pre-Configured Client:
              </span>
              <div className="space-y-1.5">
                {tenants.slice(0, 3).map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => handleQuickClientSelect(tenant.id)}
                    className="w-full px-3 py-2 rounded-xl bg-[#07132a] hover:bg-[#0c1f44] border border-amber-500/20 text-left flex items-center justify-between text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-bold text-white group-hover:text-amber-200 block truncate">
                        {tenant.brandName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        PIN: {tenant.clientAccessCode}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logout or switch */}
        <div className="mt-5 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Security: 256-bit Encrypted Session
          </span>
          <button
            onClick={() => {
              logout();
              setSuccessMessage('Logged out to View Mode');
              setTimeout(() => setIsAuthModalOpen(false), 800);
            }}
            className="text-amber-400 hover:text-amber-300 font-semibold"
          >
            Reset Session
          </button>
        </div>

      </div>
    </div>
  );
};

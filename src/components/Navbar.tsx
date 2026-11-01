import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Settings, 
  Share2, 
  Plus, 
  ChevronDown, 
  Sparkles,
  Download,
  RotateCcw,
  LogIn,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    tenants,
    activeTenantId,
    activeTenant,
    userRole,
    switchTenant,
    setRoleManually,
    setIsAdminEditorOpen,
    setIsShareModalOpen,
    setIsAuthModalOpen,
    createNewTenant,
    resetAllToDefaults
  } = useApp();

  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [isNewTenantPromptOpen, setIsNewTenantPromptOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const isAdmin = userRole === 'master_admin';

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    createNewTenant(newBrandName.trim(), newCategory.trim());
    setNewBrandName('');
    setNewCategory('');
    setIsNewTenantPromptOpen(false);
    setIsAdminEditorOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/20 backdrop-blur-xl shadow-lg shadow-black/40">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          
          {/* Logo & Hub Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-[1.5px] shadow-md shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-[#07132c] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-xs text-amber-300 tracking-wider">JBAI</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-semibold tracking-wide text-white truncate font-display">
                  JBAI DIGITAL HUB
                </h1>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Gurugram
                </span>
              </div>
              <p className="text-[10px] text-amber-200/70 truncate hidden sm:block">
                Multi-Tenant Visiting Card & Dynamic QR Platform
              </p>
            </div>
          </div>

          {/* Center / Tenant Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsTenantDropdownOpen(!isTenantDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1d40]/80 hover:bg-[#132756] border border-amber-500/30 text-xs text-slate-100 transition-all shadow-sm"
              title="Switch Client Profile"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium truncate max-w-[130px] sm:max-w-[200px]">
                {activeTenant.brandName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-amber-400 transition-transform ${isTenantDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isTenantDropdownOpen && (
              <div 
                className="absolute right-0 sm:left-0 mt-2 w-72 glass-panel rounded-xl shadow-2xl border border-amber-500/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-1.5 border-b border-amber-500/20 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">
                    Switch Client Tenant
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {tenants.length} Profiles
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto py-1">
                  {tenants.map((tenant) => (
                    <button
                      key={tenant.id}
                      onClick={() => {
                        switchTenant(tenant.id);
                        setIsTenantDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between gap-2 hover:bg-amber-500/10 transition-colors ${
                        tenant.id === activeTenantId ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs truncate">{tenant.brandName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{tenant.businessCategory}</div>
                      </div>
                      {tenant.id === activeTenantId && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-400/30 shrink-0">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {isAdmin && (
                  <div className="pt-2 mt-1 border-t border-amber-500/20 px-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setIsTenantDropdownOpen(false);
                        setIsNewTenantPromptOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium border border-amber-500/40 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New Client Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            
            {/* Role indicator & Switcher */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isAdmin 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 border border-amber-400 shadow-sm shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
              }`}
              title="Click to switch between Master Admin & Client View"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden sm:inline">Admin Mode</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-300" />
                  <span className="hidden sm:inline">Client View</span>
                </>
              )}
            </button>

            {/* Admin Edit Trigger */}
            {isAdmin && (
              <button
                onClick={() => setIsAdminEditorOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-semibold shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                title="Edit Current Client & QR Links"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Edit Profile & QRs</span>
              </button>
            )}

            {/* Quick Share Modal */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-1.5 rounded-lg bg-[#0e1d40] hover:bg-[#15295c] border border-amber-500/30 text-amber-300 transition-colors"
              title="Share Visiting Card"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Backdrop for dropdown */}
        {isTenantDropdownOpen && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsTenantDropdownOpen(false)}
          />
        )}
      </header>

      {/* New Client Modal */}
      {isNewTenantPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Create New Client Profile</h3>
                <p className="text-xs text-slate-400">Add a new business to JBAI Multi-Tenant Hub</p>
              </div>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  Brand / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Heritage Caterers"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09142b] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  Business Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Catering & Hospitality"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09142b] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewTenantPromptOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  Create & Configure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

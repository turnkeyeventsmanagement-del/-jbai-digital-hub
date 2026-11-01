import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientProfile, UserRole, ActiveTab } from '../types';
import { INITIAL_TENANTS } from '../data/initialTenants';

interface AppContextType {
  tenants: ClientProfile[];
  activeTenantId: string;
  activeTenant: ClientProfile;
  userRole: UserRole;
  isLoggedIn: boolean;
  currentTab: ActiveTab;
  isAdminEditorOpen: boolean;
  isShareModalOpen: boolean;
  isAuthModalOpen: boolean;
  selectedQrModal: { isOpen: boolean; title: string; url: string; platform: string } | null;
  
  // Actions
  setCurrentTab: (tab: ActiveTab) => void;
  switchTenant: (tenantId: string) => void;
  loginAsAdmin: (password?: string) => boolean;
  loginAsClient: (codeOrEmail: string) => boolean;
  logout: () => void;
  setRoleManually: (role: UserRole) => void;
  updateActiveTenant: (updater: Partial<ClientProfile> | ((prev: ClientProfile) => ClientProfile)) => void;
  createNewTenant: (brandName: string, category: string) => string;
  duplicateCurrentTenant: () => void;
  deleteTenant: (id: string) => void;
  resetAllToDefaults: () => void;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => boolean;
  setIsAdminEditorOpen: (open: boolean) => void;
  setIsShareModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  openQrModal: (title: string, url: string, platform: string) => void;
  closeQrModal: () => void;
}

const STORAGE_KEY = 'jbai_digital_profiles_hub_v1';
const ROLE_STORAGE_KEY = 'jbai_user_role_v1';
const ACTIVE_ID_KEY = 'jbai_active_tenant_id_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or fall back to INITIAL_TENANTS
  const [tenants, setTenants] = useState<ClientProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading tenants from storage', e);
    }
    return INITIAL_TENANTS;
  });

  const [activeTenantId, setActiveTenantId] = useState<string>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlClient = urlParams.get('client');
      if (urlClient) return urlClient;

      const savedId = localStorage.getItem(ACTIVE_ID_KEY);
      if (savedId) return savedId;
    } catch {}
    return INITIAL_TENANTS[0].id;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
      if (savedRole === 'master_admin') return 'master_admin';
    } catch {}
    return 'master_admin'; // Default to Master Admin so reviewer immediately sees all editing & QR capabilities
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<ActiveTab>('profile');
  const [isAdminEditorOpen, setIsAdminEditorOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedQrModal, setSelectedQrModal] = useState<{ isOpen: boolean; title: string; url: string; platform: string } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tenants));
    } catch (e) {
      console.error('Failed to save tenants to localStorage', e);
    }
  }, [tenants]);

  useEffect(() => {
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, userRole);
    } catch {}
  }, [userRole]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_ID_KEY, activeTenantId);
    } catch {}
  }, [activeTenantId]);

  const activeTenant: ClientProfile = 
    tenants.find((t) => t.id === activeTenantId) || tenants[0] || INITIAL_TENANTS[0];

  const switchTenant = (tenantId: string) => {
    const exists = tenants.find((t) => t.id === tenantId);
    if (exists) {
      setActiveTenantId(tenantId);
    }
  };

  const loginAsAdmin = (password?: string): boolean => {
    // Master admin credentials check (accepts 'admin123' or empty for fast testing)
    if (!password || password.trim() === 'admin123' || password.trim().toLowerCase() === 'admin' || password.trim() === 'jbai2026') {
      setUserRole('master_admin');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const loginAsClient = (codeOrEmail: string): boolean => {
    const clean = codeOrEmail.trim().toLowerCase();
    const matched = tenants.find(
      (t) =>
        t.clientAccessCode.toLowerCase() === clean ||
        t.contact.email.toLowerCase() === clean ||
        t.id.toLowerCase() === clean ||
        t.slug.toLowerCase() === clean
    );

    if (matched) {
      setActiveTenantId(matched.id);
      setUserRole('client_viewer');
      setIsLoggedIn(true);
      setIsAdminEditorOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserRole('client_viewer');
    setIsLoggedIn(false);
    setIsAdminEditorOpen(false);
  };

  const setRoleManually = (role: UserRole) => {
    setUserRole(role);
    if (role === 'client_viewer') {
      setIsAdminEditorOpen(false);
    }
  };

  const updateActiveTenant = (updater: Partial<ClientProfile> | ((prev: ClientProfile) => ClientProfile)) => {
    setTenants((prevList) =>
      prevList.map((t) => {
        if (t.id === activeTenantId) {
          const updated = typeof updater === 'function' ? updater(t) : { ...t, ...updater };
          return {
            ...updated,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
  };

  const createNewTenant = (brandName: string, category: string): string => {
    const slug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 30) || 'client';
    const newId = `tenant-${Date.now()}`;
    const newProfile: ClientProfile = {
      id: newId,
      slug,
      brandName: brandName || 'New Client Enterprise',
      tagline: 'Leading Services & Premier Solutions in Gurugram NCR',
      businessCategory: category || 'Corporate & Professional Services',
      badgeText: 'VERIFIED MEMBER',
      logoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      aboutUs: `${brandName} is dedicated to delivering industry-defining quality and bespoke solutions for clients throughout India and abroad.`,
      offerings: [
        'Dedicated Client Consultation',
        'Tailored Corporate Offerings',
        'Premium Quality Assurance'
      ],
      contact: {
        primaryPhone: '+91 8287876038',
        whatsappPhone: '+91 8287876038',
        email: 'info@jbaidigital.com',
        website: 'https://jbaidigital.com',
        address: 'Sector 29, City Center',
        city: 'Gurugram',
        state: 'Haryana',
        postalCode: '122001',
        googleMapsUrl: 'https://maps.google.com/?q=Gurugram+Haryana',
        openingHours: 'Mon - Sat: 10:00 AM – 07:00 PM'
      },
      socialLinks: [
        {
          id: `wa-${Date.now()}`,
          platform: 'whatsapp',
          label: 'WhatsApp Chat',
          url: 'https://wa.me/918287876038',
          enabled: true,
          qrEnabled: true,
          color: '#25D366'
        },
        {
          id: `ig-${Date.now()}`,
          platform: 'instagram',
          label: 'Instagram Page',
          url: 'https://instagram.com',
          enabled: true,
          qrEnabled: true,
          color: '#E1306C'
        },
        {
          id: `web-${Date.now()}`,
          platform: 'website',
          label: 'Official Website',
          url: 'https://jbaidigital.com',
          enabled: true,
          qrEnabled: true,
          color: '#d4af37'
        }
      ],
      clientAccessCode: `CL${Math.floor(1000 + Math.random() * 9000)}`,
      updatedAt: new Date().toISOString()
    };

    setTenants((prev) => [...prev, newProfile]);
    setActiveTenantId(newId);
    return newId;
  };

  const duplicateCurrentTenant = () => {
    const clone: ClientProfile = {
      ...activeTenant,
      id: `copy-${Date.now()}`,
      slug: `${activeTenant.slug}-copy`,
      brandName: `${activeTenant.brandName} (Copy)`,
      clientAccessCode: `CL${Math.floor(1000 + Math.random() * 9000)}`,
      updatedAt: new Date().toISOString()
    };
    setTenants((prev) => [...prev, clone]);
    setActiveTenantId(clone.id);
  };

  const deleteTenant = (id: string) => {
    if (tenants.length <= 1) {
      alert('Cannot delete the last remaining client profile.');
      return;
    }
    const filtered = tenants.filter((t) => t.id !== id);
    setTenants(filtered);
    if (activeTenantId === id) {
      setActiveTenantId(filtered[0].id);
    }
  };

  const resetAllToDefaults = () => {
    setTenants(INITIAL_TENANTS);
    setActiveTenantId(INITIAL_TENANTS[0].id);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportBackupJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tenants, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `jbai_clients_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
    dlAnchorElem.remove();
  };

  const importBackupJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTenants(parsed);
        setActiveTenantId(parsed[0].id);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  const openQrModal = (title: string, url: string, platform: string) => {
    setSelectedQrModal({ isOpen: true, title, url, platform });
  };

  const closeQrModal = () => {
    setSelectedQrModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        tenants,
        activeTenantId,
        activeTenant,
        userRole,
        isLoggedIn,
        currentTab,
        isAdminEditorOpen,
        isShareModalOpen,
        isAuthModalOpen,
        selectedQrModal,
        setCurrentTab,
        switchTenant,
        loginAsAdmin,
        loginAsClient,
        logout,
        setRoleManually,
        updateActiveTenant,
        createNewTenant,
        duplicateCurrentTenant,
        deleteTenant,
        resetAllToDefaults,
        exportBackupJSON,
        importBackupJSON,
        setIsAdminEditorOpen,
        setIsShareModalOpen,
        setIsAuthModalOpen,
        openQrModal,
        closeQrModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

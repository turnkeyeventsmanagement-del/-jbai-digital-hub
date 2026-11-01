import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Upload, 
  Sparkles, 
  Plus, 
  Trash2, 
  Globe, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  FileText, 
  Copy, 
  Download, 
  RotateCcw,
  Check,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClientProfile, SocialLinkConfig } from '../types';

export const AdminEditorModal: React.FC = () => {
  const { 
    activeTenant, 
    updateActiveTenant, 
    isAdminEditorOpen, 
    setIsAdminEditorOpen, 
    duplicateCurrentTenant, 
    deleteTenant, 
    resetAllToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useApp();

  const [activeTab, setActiveTab] = useState<'brand' | 'contact' | 'social_qr' | 'payment' | 'tenants'>('brand');
  const [formData, setFormData] = useState<ClientProfile>({ ...activeTenant });
  const [newOffering, setNewOffering] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  // Update formData whenever activeTenant changes
  React.useEffect(() => {
    setFormData({ ...activeTenant });
  }, [activeTenant.id]);

  if (!isAdminEditorOpen) return null;

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLinkConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) => 
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleAddSocialLink = () => {
    const newLink: SocialLinkConfig = {
      id: `custom-${Date.now()}`,
      platform: 'custom',
      label: 'New Custom Link',
      url: 'https://',
      enabled: true,
      qrEnabled: true,
      color: '#d4af37'
    };
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink]
    }));
  };

  const handleDeleteSocialLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((l) => l.id !== id)
    }));
  };

  const handleAddOffering = () => {
    if (!newOffering.trim()) return;
    setFormData((prev) => ({
      ...prev,
      offerings: [...prev.offerings, newOffering.trim()]
    }));
    setNewOffering('');
  };

  const handleRemoveOffering = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      offerings: prev.offerings.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    updateActiveTenant(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const curatedLogoPresets = [
    { label: 'Royal Gold Crest', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=300&q=80' },
    { label: 'Jewellery Atelier', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80' },
    { label: 'Enterprise AI Hex', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80' },
    { label: 'Modern Geometric', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[92vh] glass-panel rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col overflow-hidden my-auto animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between gap-4 bg-[#07132a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-700 text-slate-950 font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  Master Admin Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Gurugram Core
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Editing tenant: <strong className="text-amber-300">{formData.brandName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-slate-950" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAdminEditorOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Close Editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-amber-500/20 bg-[#091633] flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'brand', label: 'Brand & Logo', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'contact', label: 'Contact Details', icon: <Phone className="w-4 h-4" /> },
            { id: 'social_qr', label: 'Dynamic QR & Socials', icon: <Globe className="w-4 h-4" /> },
            { id: 'payment', label: 'UPI & Access PIN', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'tenants', label: 'Multi-Tenant Hub', icon: <Sparkles className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(92vh-150px)]">
          
          {/* TAB 1: BRAND & LOGO */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              
              {/* Logo & Gallery Upload */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Brand Logo (Gallery File Upload or URL)
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 to-amber-700 shrink-0">
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="w-full h-full object-cover rounded-xl bg-[#050b18]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>

                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload From Device Gallery</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">PNG, JPG, SVG</span>
                    </div>

                    <div>
                      <input
                        type="url"
                        placeholder="Or enter direct image URL..."
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#091738] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-slate-400">Luxury Presets:</span>
                      {curatedLogoPresets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, logoUrl: preset.url })}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Banner */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Visiting Card Cover Image
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Cover Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    placeholder="Cover photo URL..."
                    value={formData.coverUrl || ''}
                    onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#091738] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Brand Names & Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Brand / Company Title *
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Gold Verified Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PREMIUM PARTNER"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Business Category
                  </label>
                  <input
                    type="text"
                    value={formData.businessCategory}
                    onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* About Us */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  About Us / Company Overview
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutUs}
                  onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
                  placeholder="Describe your company's pedigree, vision, and market leadership..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs leading-relaxed focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Key Offerings List */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20 space-y-3">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Key Services & Offerings
                </label>
                
                <div className="space-y-2">
                  {formData.offerings.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.offerings];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, offerings: updated });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#091738] border border-amber-500/20 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOffering(idx)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add new offering item..."
                    value={newOffering}
                    onChange={(e) => setNewOffering(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOffering())}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#091738] border border-amber-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddOffering}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CONTACT DETAILS */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Primary Phone (Calling) *
                  </label>
                  <input
                    type="text"
                    value={formData.contact.primaryPhone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, primaryPhone: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    WhatsApp Calling / Chat Number *
                  </label>
                  <input
                    type="text"
                    value={formData.contact.whatsappPhone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsappPhone: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.contact.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, website: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.contact.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.contact.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, city: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.contact.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, state: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.contact.postalCode}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, postalCode: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Google Maps Pin / Review Link
                  </label>
                  <input
                    type="url"
                    value={formData.contact.googleMapsUrl}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, googleMapsUrl: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mon - Sat: 09:30 AM – 08:00 PM"
                    value={formData.contact.openingHours || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, openingHours: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DYNAMIC QR & SOCIALS */}
          {activeTab === 'social_qr' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <div>
                  <h3 className="text-sm font-bold text-white">Dynamic QR & Social Hub Configuration</h3>
                  <p className="text-xs text-slate-400">
                    Input links for WhatsApp, Facebook, Instagram, YouTube, Website, etc. Dynamic scannable QRs are auto-generated.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Channel</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.socialLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-3.5 rounded-2xl bg-[#07132a] border border-amber-500/25 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={link.platform}
                          onChange={(e) => handleSocialLinkChange(link.id, 'platform', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#091738] border border-amber-500/30 text-amber-300 text-xs font-bold focus:outline-none"
                        >
                          <option value="whatsapp">WhatsApp</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="youtube">YouTube</option>
                          <option value="website">Website</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">X / Twitter</option>
                          <option value="google_reviews">Google Reviews</option>
                          <option value="telegram">Telegram</option>
                          <option value="custom">Custom Link</option>
                        </select>

                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleSocialLinkChange(link.id, 'label', e.target.value)}
                          placeholder="Display Label"
                          className="px-3 py-1.5 rounded-lg bg-[#091738] border border-amber-500/20 text-white text-xs focus:outline-none focus:border-amber-400 min-w-[180px]"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={link.enabled}
                            onChange={(e) => handleSocialLinkChange(link.id, 'enabled', e.target.checked)}
                            className="rounded border-slate-700 text-amber-500 focus:ring-0"
                          />
                          <span>Show on Card</span>
                        </label>

                        <label className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={link.qrEnabled}
                            onChange={(e) => handleSocialLinkChange(link.id, 'qrEnabled', e.target.checked)}
                            className="rounded border-slate-700 text-amber-500 focus:ring-0"
                          />
                          <span>Generate QR</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleDeleteSocialLink(link.id)}
                          className="p-1 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Remove Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* URL Input */}
                    <div>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#091738] border border-amber-500/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Custom greeting for WhatsApp */}
                    {link.platform === 'whatsapp' && (
                      <div className="pt-1">
                        <label className="block text-[10px] uppercase font-bold text-emerald-400 mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Pre-Filled WhatsApp Greeting Message (Auto encoded into QR & Chat)
                        </label>
                        <input
                          type="text"
                          value={link.customMessage || ''}
                          onChange={(e) => handleSocialLinkChange(link.id, 'customMessage', e.target.value)}
                          placeholder="e.g. Hello Turnkey Events, I want to inquire about planning an event."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#06152b] border border-emerald-500/30 text-emerald-200 text-xs focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: UPI & ACCESS PIN */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              
              {/* UPI Payment Configuration */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Instant UPI Direct Payments</h3>
                      <p className="text-xs text-slate-400">Generate a universal BHIM/UPI scannable QR code (GPay, PhonePe, Paytm)</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.upiConfig?.enabled || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        upiConfig: {
                          enabled: e.target.checked,
                          upiId: formData.upiConfig?.upiId || '',
                          payeeName: formData.upiConfig?.payeeName || formData.brandName
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {formData.upiConfig?.enabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        UPI ID / VPA *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. company@icici or 9811223344@upi"
                        value={formData.upiConfig.upiId}
                        onChange={(e) => setFormData({
                          ...formData,
                          upiConfig: {
                            ...formData.upiConfig!,
                            upiId: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#091738] border border-amber-500/30 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        Payee Legal Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Turnkey Events Management LLP"
                        value={formData.upiConfig.payeeName}
                        onChange={(e) => setFormData({
                          ...formData,
                          upiConfig: {
                            ...formData.upiConfig!,
                            payeeName: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#091738] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Client Access Code */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Dedicated Client Access PIN</h3>
                    <p className="text-xs text-slate-400">
                      Clients use this PIN or their email to login securely in View-Only mode without admin edit buttons.
                    </p>
                  </div>
                </div>

                <div className="max-w-xs">
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Client Security Code
                  </label>
                  <input
                    type="text"
                    value={formData.clientAccessCode}
                    onChange={(e) => setFormData({ ...formData, clientAccessCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#091738] border border-amber-500/30 text-amber-300 font-mono font-bold text-sm tracking-widest focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: MULTI-TENANT HUB & BACKUP */}
          {activeTab === 'tenants' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20 space-y-3">
                <h3 className="text-sm font-bold text-white">Client Management Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={duplicateCurrentTenant}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Duplicate This Client</span>
                  </button>

                  <button
                    type="button"
                    onClick={exportBackupJSON}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export Hub Backup (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all client profiles to original demo data? Any unsaved edits will be cleared.')) {
                        resetAllToDefaults();
                        setIsAdminEditorOpen(false);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Reset All to Defaults</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete profile "${activeTenant.brandName}"?`)) {
                        deleteTenant(activeTenant.id);
                        setIsAdminEditorOpen(false);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete This Client</span>
                  </button>
                </div>
              </div>

              {/* JSON Import Section */}
              <div className="p-4 rounded-2xl bg-[#07132a] border border-amber-500/20 space-y-3">
                <h3 className="text-sm font-bold text-white">Import Clients from JSON Backup</h3>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    setImportError('');
                  }}
                  placeholder="Paste previously exported clients JSON string here..."
                  className="w-full px-3 py-2 rounded-xl bg-[#091738] border border-amber-500/20 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />

                {importError && (
                  <p className="text-xs text-red-400">{importError}</p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!importJsonText.trim()) return;
                    const success = importBackupJSON(importJsonText);
                    if (success) {
                      setImportJsonText('');
                      setImportError('');
                      alert('Clients imported successfully!');
                      setIsAdminEditorOpen(false);
                    } else {
                      setImportError('Invalid JSON format. Please verify the exported backup structure.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Import Database
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-amber-500/20 bg-[#07132a] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Changes persist instantly to localStorage & session cache.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminEditorOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Profile</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

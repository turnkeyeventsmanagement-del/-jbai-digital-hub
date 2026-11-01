import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  UserPlus, 
  Share2, 
  Globe, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Star, 
  MapPin, 
  Clock, 
  CreditCard, 
  Check, 
  ExternalLink, 
  QrCode, 
  Sparkles, 
  Award,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { downloadVCard } from '../utils/vcard';
import { SocialLinkConfig } from '../types';

export const ProfileTab: React.FC = () => {
  const { 
    activeTenant, 
    userRole, 
    setIsAdminEditorOpen, 
    setIsShareModalOpen, 
    openQrModal, 
    setCurrentTab 
  } = useApp();

  const [savedContact, setSavedContact] = useState(false);

  const handleSaveContact = () => {
    downloadVCard(activeTenant);
    setSavedContact(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#fbeea4', '#aa771c', '#ffffff']
      });
    } catch {}
    setTimeout(() => setSavedContact(false), 3000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-[#25D366]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E1306C]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-[#FF0000]" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-[#1DA1F2]" />;
      case 'google_reviews':
        return <Star className="w-4 h-4 text-[#FBBC05]" />;
      case 'website':
        return <Globe className="w-4 h-4 text-amber-300" />;
      default:
        return <ExternalLink className="w-4 h-4 text-slate-300" />;
    }
  };

  const primaryPhoneClean = activeTenant.contact.primaryPhone.replace(/\s+/g, '');
  const whatsappPhoneClean = (activeTenant.contact.whatsappPhone || activeTenant.contact.primaryPhone).replace(/[^0-9]/g, '');

  const enabledSocialLinks = activeTenant.socialLinks.filter((l) => l.enabled && l.url);

  return (
    <div className="space-y-6 pb-24">
      
      {/* Client View Notification Banner */}
      {userRole === 'client_viewer' && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-200 text-xs shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Viewing authenticated client card. Editing controls are locked.</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
            Verified
          </span>
        </div>
      )}

      {/* Main Visiting Card Card */}
      <div className="relative rounded-3xl glass-panel border border-amber-500/35 overflow-hidden gold-card-shadow">
        
        {/* Cover Photo / Background Header */}
        <div className="relative h-36 sm:h-44 w-full bg-gradient-to-r from-[#07132a] via-[#0c1f4a] to-[#081530] overflow-hidden">
          {activeTenant.coverUrl && (
            <img
              src={activeTenant.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover opacity-35 mix-blend-luminosity filter blur-[0.5px]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07132a]/60 to-[#07132a]" />
          
          {/* Top Badge */}
          {activeTenant.badgeText && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/50 text-[10px] font-extrabold uppercase tracking-widest text-amber-300 shadow-lg">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeTenant.badgeText}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="relative px-5 pb-6 pt-0">
          
          {/* Logo Container */}
          <div className="relative -mt-16 sm:-mt-20 mb-4 flex justify-between items-end">
            <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-amber-300 via-amber-500 to-amber-700 shadow-2xl shadow-black/80">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[14px] bg-[#07132a] overflow-hidden flex items-center justify-center p-1">
                <img
                  src={activeTenant.logoUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=300&q=80'}
                  alt={activeTenant.brandName}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
            </div>

            {/* Admin Edit Shortcut */}
            {userRole === 'master_admin' && (
              <button
                onClick={() => setIsAdminEditorOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Edit Brand</span>
              </button>
            )}
          </div>

          {/* Brand Info */}
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display gold-text-gradient tracking-wide">
              {activeTenant.brandName}
            </h2>
            <p className="text-sm font-medium text-amber-200/90 leading-snug">
              {activeTenant.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/25">
                {activeTenant.businessCategory}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {activeTenant.contact.city}, {activeTenant.contact.state}
              </span>
            </div>
          </div>

          {/* Quick Action Matrix (4 Gold Luxury Buttons) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 my-6">
            
            {/* Call */}
            <a
              href={`tel:${primaryPhoneClean}`}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#091738] hover:bg-[#0e214d] border border-amber-500/30 text-amber-300 transition-all hover:scale-105 active:scale-95 group shadow-md"
            >
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25 transition-colors mb-1">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[11px] font-bold text-white tracking-wide">Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappPhoneClean}?text=${encodeURIComponent(
                activeTenant.socialLinks.find((s) => s.platform === 'whatsapp')?.customMessage ||
                `Hello ${activeTenant.brandName}, I found your digital profile via JBAI Hub.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#091738] hover:bg-[#0e214d] border border-emerald-500/30 text-emerald-300 transition-all hover:scale-105 active:scale-95 group shadow-md"
            >
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25 transition-colors mb-1">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[11px] font-bold text-white tracking-wide">WhatsApp</span>
            </a>

            {/* Save Contact vCard */}
            <button
              onClick={handleSaveContact}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 group shadow-md ${
                savedContact 
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                  : 'bg-gradient-to-b from-amber-400/20 to-amber-600/20 border-amber-400/50 text-amber-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 group-hover:bg-amber-400/30 transition-colors mb-1">
                {savedContact ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <span className="text-[11px] font-bold text-white tracking-wide">
                {savedContact ? 'Saved!' : 'Save'}
              </span>
            </button>

            {/* Share Card */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#091738] hover:bg-[#0e214d] border border-amber-500/30 text-amber-300 transition-all hover:scale-105 active:scale-95 group shadow-md"
            >
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25 transition-colors mb-1">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[11px] font-bold text-white tracking-wide">Share</span>
            </button>
          </div>

          {/* Social Media & Action Hub */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-display">
                <Globe className="w-3.5 h-3.5" />
                <span>Connected Channels & Social Profiles</span>
              </h3>
              <button
                onClick={() => setCurrentTab('qrhub')}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>View All QRs</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {enabledSocialLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-3 rounded-xl bg-[#081530]/75 hover:bg-[#0c1f44] border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center justify-between gap-2 group"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 min-w-0 flex-1"
                  >
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5 shrink-0 group-hover:scale-105 transition-transform">
                      {getPlatformIcon(link.platform)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-100 truncate block group-hover:text-amber-200">
                        {link.label}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    </div>
                  </a>

                  {/* QR view shortcut */}
                  {link.qrEnabled && (
                    <button
                      onClick={() => openQrModal(link.label, link.url, link.platform)}
                      className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors shrink-0"
                      title="View dynamic QR code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* About Us Card */}
          {activeTenant.aboutUs && (
            <div className="my-6 p-4 rounded-2xl bg-[#081530]/60 border border-amber-500/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 font-display">
                About {activeTenant.brandName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {activeTenant.aboutUs}
              </p>
            </div>
          )}

          {/* Key Offerings / Specialties */}
          {activeTenant.offerings && activeTenant.offerings.length > 0 && (
            <div className="my-6 p-4 rounded-2xl bg-[#081530]/60 border border-amber-500/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 font-display">
                Key Specializations & Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTenant.offerings.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <div className="mt-0.5 p-0.5 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UPI Direct Payment (If enabled) */}
          {activeTenant.upiConfig?.enabled && activeTenant.upiConfig.upiId && (
            <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#081530] to-amber-500/15 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    Instant UPI Payments
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {activeTenant.upiConfig.payeeName || activeTenant.brandName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 block truncate">
                    {activeTenant.upiConfig.upiId}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const upiString = `upi://pay?pa=${activeTenant.upiConfig!.upiId}&pn=${encodeURIComponent(activeTenant.upiConfig!.payeeName || activeTenant.brandName)}&cu=INR`;
                  openQrModal(`UPI Payment: ${activeTenant.brandName}`, upiString, 'upi');
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Pay QR</span>
              </button>
            </div>
          )}

          {/* Location & Contact Information */}
          <div className="my-6 p-4 rounded-2xl bg-[#081530]/60 border border-amber-500/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display">
              Office Location & Hours
            </h3>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">{activeTenant.contact.address}</p>
                <p>{activeTenant.contact.city}, {activeTenant.contact.state} - {activeTenant.contact.postalCode}</p>
              </div>
            </div>

            {activeTenant.contact.openingHours && (
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{activeTenant.contact.openingHours}</span>
              </div>
            )}

            {activeTenant.contact.googleMapsUrl && (
              <div className="pt-2">
                <a
                  href={activeTenant.contact.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            )}
          </div>

          {/* Quick Agency Infrastructure Bar */}
          <div className="mt-8 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Digital Infrastructure managed by <strong className="text-amber-300">JBAI Digital Market</strong></span>
            </div>
            <button
              onClick={() => setCurrentTab('agency')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Agency Details & Contact</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

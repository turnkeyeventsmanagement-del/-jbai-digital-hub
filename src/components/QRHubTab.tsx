import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Sparkles, 
  Filter, 
  Share2,
  MessageSquare,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Star,
  CreditCard,
  PlusCircle,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateQRCodeDataUrl, downloadDataUrlAsImage } from '../utils/qr';
import { SocialLinkConfig } from '../types';

interface QRCardItem {
  id: string;
  title: string;
  platform: string;
  url: string;
  category: 'social' | 'messenger' | 'business' | 'payment';
  color: string;
}

export const QRHubTab: React.FC = () => {
  const { 
    activeTenant, 
    userRole, 
    setIsAdminEditorOpen, 
    openQrModal, 
    setIsShareModalOpen 
  } = useApp();

  const [qrImages, setQrImages] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Assemble all QR items
  const qrItems: QRCardItem[] = [];

  // 1. Master Digital Card QR (Encodes current profile URL)
  const currentCardUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?client=${activeTenant.id}` 
    : `https://jbaidigital.com/?client=${activeTenant.id}`;

  qrItems.push({
    id: 'master-card-qr',
    title: `${activeTenant.brandName} - Digital Card`,
    platform: 'card',
    url: currentCardUrl,
    category: 'business',
    color: '#d4af37'
  });

  // 2. All enabled social & contact links with qrEnabled = true
  activeTenant.socialLinks.forEach((link) => {
    if (link.enabled && link.qrEnabled && link.url) {
      let category: 'social' | 'messenger' | 'business' | 'payment' = 'social';
      if (link.platform === 'whatsapp' || link.platform === 'telegram') category = 'messenger';
      else if (link.platform === 'website' || link.platform === 'google_reviews') category = 'business';

      qrItems.push({
        id: link.id,
        title: link.label,
        platform: link.platform,
        url: link.url,
        category,
        color: link.color || '#d4af37'
      });
    }
  });

  // 3. UPI QR (if enabled)
  if (activeTenant.upiConfig?.enabled && activeTenant.upiConfig.upiId) {
    const upiString = `upi://pay?pa=${activeTenant.upiConfig.upiId}&pn=${encodeURIComponent(
      activeTenant.upiConfig.payeeName || activeTenant.brandName
    )}&cu=INR`;

    qrItems.push({
      id: 'upi-qr',
      title: `Pay via UPI (${activeTenant.upiConfig.payeeName || activeTenant.brandName})`,
      platform: 'upi',
      url: upiString,
      category: 'payment',
      color: '#10B981'
    });
  }

  // Generate QR images whenever qrItems change
  useEffect(() => {
    let isMounted = true;
    const generateAll = async () => {
      const results: Record<string, string> = {};
      for (const item of qrItems) {
        const url = await generateQRCodeDataUrl(item.url, {
          width: 380,
          margin: 2,
          darkColor: '#050b18',
          lightColor: '#ffffff'
        });
        results[item.id] = url;
      }
      if (isMounted) {
        setQrImages(results);
      }
    };

    generateAll();
    return () => {
      isMounted = false;
    };
  }, [activeTenant.id, activeTenant.updatedAt]);

  const copyUrl = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (dataUrl: string, name: string) => {
    const safeName = `${activeTenant.brandName.replace(/\s+/g, '_')}_${name.replace(/[^a-zA-Z0-9]/g, '_')}_QR.png`;
    downloadDataUrlAsImage(dataUrl, safeName);
  };

  const filteredItems = qrItems.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'card':
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-[#25D366]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E1306C]" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-[#FF0000]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-[#1DA1F2]" />;
      case 'google_reviews':
        return <Star className="w-4 h-4 text-[#FBBC05]" />;
      case 'upi':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      default:
        return <Globe className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header Info Banner */}
      <div className="rounded-3xl p-6 glass-panel border border-amber-500/30 gold-card-shadow relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/25 mb-2">
              <QrCode className="w-3.5 h-3.5" />
              Dynamic QR Code & Social Hub
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display gold-text-gradient">
              Scan, Connect & Share Instantly
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Each connected social platform, WhatsApp channel, and direct digital profile card generates an auto-updating, high-contrast scannable QR code ready for print or digital display.
            </p>
          </div>

          {userRole === 'master_admin' && (
            <button
              onClick={() => setIsAdminEditorOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 shrink-0 transition-transform hover:scale-105"
            >
              <Settings className="w-4 h-4" />
              <span>Configure Links & QRs</span>
            </button>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-5 pt-4 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All QRs' },
              { id: 'business', label: 'Card & Web' },
              { id: 'messenger', label: 'WhatsApp' },
              { id: 'social', label: 'Social Channels' },
              { id: 'payment', label: 'UPI / Pay' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-[#081530] text-slate-300 hover:text-white border border-amber-500/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Counter */}
          <span className="text-xs text-slate-400">
            Showing <strong className="text-amber-300">{filteredItems.length}</strong> scannable QRs
          </span>
        </div>
      </div>

      {/* QR Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const qrDataUrl = qrImages[item.id];
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl glass-panel border border-amber-500/25 p-4 flex flex-col justify-between hover:border-amber-500/60 transition-all duration-200 group hover:shadow-xl hover:shadow-black/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-xl bg-[#07132a] border border-amber-500/30 shrink-0">
                    {getPlatformIcon(item.platform)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate group-hover:text-amber-200">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      {item.platform.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
                  Scannable
                </span>
              </div>

              {/* Scannable QR Graphic Container */}
              <div 
                onClick={() => openQrModal(item.title, item.url, item.platform)}
                className="relative my-2 p-3 bg-white rounded-xl shadow-inner flex items-center justify-center cursor-pointer group/qr overflow-hidden"
                title="Click to view full screen"
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={item.title}
                    className="w-44 h-44 object-contain transition-transform group-hover/qr:scale-105"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-slate-500 text-xs">
                    Generating scannable QR...
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/qr:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity text-white">
                  <Maximize2 className="w-6 h-6 text-amber-300" />
                  <span className="text-xs font-bold text-amber-200">Tap to Zoom</span>
                </div>
              </div>

              {/* URL Preview */}
              <div className="text-[10px] text-slate-400 truncate mb-3 px-1 font-mono">
                {item.url}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-amber-500/15">
                
                {/* Fullscreen / Scan */}
                <button
                  onClick={() => openQrModal(item.title, item.url, item.platform)}
                  className="px-2 py-1.5 rounded-lg bg-[#07132a] hover:bg-[#0c1f44] border border-amber-500/20 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zoom</span>
                </button>

                {/* Download PNG */}
                <button
                  onClick={() => qrDataUrl && handleDownload(qrDataUrl, item.platform)}
                  disabled={!qrDataUrl}
                  className="px-2 py-1.5 rounded-lg bg-[#07132a] hover:bg-[#0c1f44] border border-amber-500/20 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                  title="Download PNG for Print"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => copyUrl(item.url, item.id)}
                  className="px-2 py-1.5 rounded-lg bg-[#07132a] hover:bg-[#0c1f44] border border-amber-500/20 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                  title="Copy Direct Link"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 rounded-3xl glass-panel border border-dashed border-amber-500/30 p-8">
          <QrCode className="w-12 h-12 text-amber-400/50 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No QR Codes Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            No QR codes match the current filter or search criteria.
          </p>
        </div>
      )}

      {/* Admin Quick Tips Card */}
      {userRole === 'master_admin' && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 via-[#07132a] to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">
                Admin Tip: Real-Time Dynamic QR Regeneration
              </span>
              <span className="text-slate-300">
                Any changes you make to social links, WhatsApp greetings, or UPI IDs instantly regenerate all client QR codes without altering print layouts.
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAdminEditorOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0"
          >
            Open QR Dashboard
          </button>
        </div>
      )}

    </div>
  );
};

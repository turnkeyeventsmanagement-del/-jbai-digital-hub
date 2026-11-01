import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  MessageSquare, 
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateQRCodeDataUrl, downloadDataUrlAsImage } from '../utils/qr';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, activeTenant } = useApp();
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?client=${activeTenant.id}`
    : `https://jbaidigital.com/?client=${activeTenant.id}`;

  useEffect(() => {
    if (isShareModalOpen) {
      generateQRCodeDataUrl(shareUrl, {
        width: 400,
        margin: 2,
        darkColor: '#050b18',
        lightColor: '#ffffff'
      }).then(setQrUrl);
    }
  }, [isShareModalOpen, shareUrl]);

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeTenant.brandName,
          text: `Connect with ${activeTenant.brandName} - ${activeTenant.tagline}`,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Connect with *${activeTenant.brandName}* (${activeTenant.businessCategory}):\n${activeTenant.tagline}\n\n👉 View Digital Card: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl text-center relative animate-in zoom-in-95 gold-card-shadow">
        
        {/* Close Button */}
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="w-12 h-12 rounded-2xl mx-auto mb-3 p-[1.5px] bg-gradient-to-tr from-amber-300 to-amber-600 shadow-lg shadow-amber-500/20">
          <div className="w-full h-full rounded-[14px] bg-[#07132a] flex items-center justify-center text-amber-300">
            <Share2 className="w-5 h-5" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white font-display">
          Share Digital Visiting Card
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Scan with phone camera or tap NFC to view <strong className="text-amber-300">{activeTenant.brandName}</strong>
        </p>

        {/* QR Code Graphic */}
        <div className="my-5 p-3 bg-white rounded-2xl shadow-inner max-w-[220px] mx-auto border-2 border-amber-400">
          {qrUrl ? (
            <img src={qrUrl} alt="Card QR" className="w-full h-full object-contain" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-500">
              Generating scannable QR...
            </div>
          )}
        </div>

        {/* Share Link Input */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#07132a] border border-amber-500/25 mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 px-2.5 py-1 text-xs text-slate-300 bg-transparent truncate font-mono focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-amber-500/25 transition-colors"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Device Share</span>
          </button>
        </div>

        {qrUrl && (
          <button
            onClick={() => downloadDataUrlAsImage(qrUrl, `${activeTenant.brandName}_Digital_Card_QR.png`)}
            className="w-full mt-2 py-2 text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center justify-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res QR for Print</span>
          </button>
        )}

      </div>
    </div>
  );
};

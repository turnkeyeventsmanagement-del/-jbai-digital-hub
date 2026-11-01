import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateQRCodeDataUrl, downloadDataUrlAsImage } from '../utils/qr';

export const QrDetailModal: React.FC = () => {
  const { selectedQrModal, closeQrModal, activeTenant } = useApp();
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedQrModal?.url) {
      generateQRCodeDataUrl(selectedQrModal.url, {
        width: 480,
        margin: 2,
        darkColor: '#050b18',
        lightColor: '#ffffff'
      }).then(setDataUrl);
    }
  }, [selectedQrModal?.url]);

  if (!selectedQrModal?.isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedQrModal.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const safeTitle = `${activeTenant.brandName}_${selectedQrModal.title.replace(/[^a-zA-Z0-9]/g, '_')}_QR.png`;
    downloadDataUrlAsImage(dataUrl, safeTitle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl text-center relative animate-in zoom-in-95 gold-card-shadow">
        
        {/* Close Button */}
        <button
          onClick={closeQrModal}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider mb-2">
          <QrCode className="w-3.5 h-3.5" />
          <span>Dynamic QR Code</span>
        </div>

        <h3 className="text-base font-bold text-white font-display">
          {selectedQrModal.title}
        </h3>
        <p className="text-[11px] text-slate-300 mt-0.5">
          Scan with any mobile camera or QR reader
        </p>

        {/* High-Contrast QR Code Display */}
        <div className="my-5 p-4 bg-white rounded-2xl shadow-2xl max-w-[240px] mx-auto border-4 border-amber-400">
          {dataUrl ? (
            <img src={dataUrl} alt={selectedQrModal.title} className="w-full h-full object-contain" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
              Generating scannable QR...
            </div>
          )}
        </div>

        {/* URL Box */}
        <div className="p-2 rounded-xl bg-[#07132a] border border-amber-500/20 text-[11px] font-mono text-slate-300 truncate mb-4">
          {selectedQrModal.url}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Download PNG</span>
          </button>

          <a
            href={selectedQrModal.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0c1e45] hover:bg-[#122c66] text-amber-300 font-bold text-xs border border-amber-500/30 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Link</span>
          </a>
        </div>

        <div className="mt-3">
          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Destination URL'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

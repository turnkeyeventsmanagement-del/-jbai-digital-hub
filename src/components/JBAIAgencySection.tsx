import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const JBAIAgencySection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryBusiness, setInquiryBusiness] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const agencyPhone = '+91 8287876038';
  const cleanPhone = '918287876038';
  const agencyEmailPrimary = 'info@jbaidigital.com';
  const agencyEmailSecondary = 'spectrum events / turnkeyeventsmanagement@gmail.com';
  const agencyLocation = 'Delhi, Gurugram, NCR | PAN INDIA';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryBusiness.trim()) return;

    const message = `Hello JBAI Digital Team, My name is ${inquiryName.trim()} from "${inquiryBusiness.trim()}". I want to order a custom JBAI Multi-Tenant Digital Profile & QR Hub. Additional Note: ${inquiryNote.trim() || 'Please share portfolio and pricing.'}`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Locked Agency Banner Card */}
      <div className="relative rounded-3xl p-6 md:p-8 glass-panel border border-amber-500/40 shadow-2xl overflow-hidden gold-card-shadow">
        
        {/* Subtle decorative gold glow circles */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* Agency Security Badge */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display">
              Official Service Provider
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-amber-500/40 text-[10px] text-amber-200">
            <Lock className="w-3 h-3 text-amber-400" />
            <span className="font-semibold tracking-wide">Locked Agency Core</span>
          </div>
        </div>

        {/* Brand Header */}
        <div className="text-center md:text-left md:flex items-center gap-6 mb-6">
          <div className="mx-auto md:mx-0 w-20 h-20 rounded-2xl p-[2px] bg-gradient-to-tr from-amber-300 via-amber-500 to-amber-700 shadow-xl shadow-amber-500/20 shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#07132a] flex flex-col items-center justify-center text-center p-2">
              <Sparkles className="w-5 h-5 text-amber-400 mb-0.5 animate-pulse" />
              <span className="text-xs font-black tracking-widest text-amber-300 font-display">JBAI</span>
              <span className="text-[8px] text-slate-400 tracking-tight uppercase">Digital</span>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-1">
              <Award className="w-3 h-3" />
              Gurugram & Delhi NCR Infrastructure
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display gold-text-gradient">
              JBAI Digital Market
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Architects of premium digital visiting cards, dynamic QR ecosystems, and experiential branding solutions for enterprises across PAN India.
            </p>
          </div>
        </div>

        {/* Immutable Agency Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
          
          {/* WhatsApp & Calling */}
          <div className="p-4 rounded-2xl bg-[#09152e]/80 border border-amber-500/25 hover:border-amber-500/50 transition-all flex items-start justify-between gap-3 group">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                  WhatsApp / Calling Number
                </span>
                <span className="text-sm font-bold text-white tracking-wide">
                  {agencyPhone}
                </span>
                <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                  Instant Support & Gurugram Hotline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}?text=Hello%20JBAI%20Digital%20Market,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <button
                onClick={() => copyToClipboard(agencyPhone, 'phone')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy Number"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Email Address */}
          <div className="p-4 rounded-2xl bg-[#09152e]/80 border border-amber-500/25 hover:border-amber-500/50 transition-all flex items-start justify-between gap-3 group">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                  Official Email & Desk
                </span>
                <span className="text-sm font-bold text-white tracking-wide truncate block">
                  {agencyEmailPrimary}
                </span>
                <p className="text-[11px] text-amber-300/80 font-medium mt-0.5 truncate">
                  {agencyEmailSecondary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`mailto:${agencyEmailPrimary}?subject=Inquiry%20regarding%20Digital%20Profile%20Hub`}
                className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
                title="Send Email"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => copyToClipboard(agencyEmailPrimary, 'email')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location & Coverage */}
          <div className="p-4 rounded-2xl bg-[#09152e]/80 border border-amber-500/25 md:col-span-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                  Operating Hub & Territory
                </span>
                <span className="text-sm font-bold text-white">
                  {agencyLocation}
                </span>
                <p className="text-[11px] text-blue-300 mt-0.5">
                  Gurugram Executive Office • Delhi Central Operations • Pan-India Digital Dispatch
                </p>
              </div>
            </div>

            <div className="shrink-0 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              Always Active
            </div>
          </div>
        </div>

        {/* Interactive Inquire Form for new Client Cards */}
        <div className="mt-8 pt-6 border-t border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Request a Custom Visiting Card & QR Hub For Your Brand
            </h3>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Connect directly with Gurugram / JBAI Digital Master engineering team to launch a branded tenant with custom NFC integration.
          </p>

          <form onSubmit={handleInquirySubmit} className="space-y-3 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                  Business / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spectrum Grand Resorts"
                  value={inquiryBusiness}
                  onChange={(e) => setInquiryBusiness(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Specific Requirements / Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Need 5 employee digital cards with Instagram & WhatsApp QR codes"
                value={inquiryNote}
                onChange={(e) => setInquiryNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#07132a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Routes directly to WhatsApp +91 8287876038
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send WhatsApp Inquiry</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                Opening WhatsApp chat with JBAI Digital Market (+91 8287876038)...
              </div>
            )}
          </form>
        </div>

        {/* Footer Policy and Locking Statement */}
        <div className="mt-8 pt-4 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} JBAI Digital Market • All Rights Reserved.
          </span>
          <span className="text-amber-400/80 font-medium">
            Core Agency Registry ID: JBAI-DEL-GGN-2026-PAN
          </span>
        </div>
      </div>
    </div>
  );
};

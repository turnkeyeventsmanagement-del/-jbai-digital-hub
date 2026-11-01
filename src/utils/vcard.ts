import { ClientProfile } from '../types';

export function generateVCardString(profile: ClientProfile): string {
  const cleanPhone = profile.contact.primaryPhone.replace(/\s+/g, '');
  const cleanWhatsApp = profile.contact.whatsappPhone.replace(/\s+/g, '');

  const vCardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.brandName}`,
    `ORG:${profile.brandName}`,
    `TITLE:${profile.tagline || profile.businessCategory}`,
    `TEL;TYPE=WORK,VOICE:${cleanPhone}`,
    cleanWhatsApp ? `TEL;TYPE=CELL,VOICE:${cleanWhatsApp}` : '',
    `EMAIL;TYPE=PREF,INTERNET:${profile.contact.email}`,
    `URL:${profile.contact.website || window.location.href}`,
    `ADR;TYPE=WORK:;;${profile.contact.address};${profile.contact.city};${profile.contact.state};${profile.contact.postalCode};India`,
    `NOTE:${profile.aboutUs.replace(/\n/g, ' ')} | Digital Card by JBAI Digital Market`,
    'END:VCARD'
  ].filter(Boolean);

  return vCardLines.join('\r\n');
}

export function downloadVCard(profile: ClientProfile): void {
  const vcardText = generateVCardString(profile);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.brandName.replace(/[^a-zA-Z0-9]/g, '_')}_Contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

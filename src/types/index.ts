export type UserRole = 'master_admin' | 'client_viewer';

export interface SocialLinkConfig {
  id: string;
  platform: 'whatsapp' | 'instagram' | 'facebook' | 'youtube' | 'website' | 'linkedin' | 'twitter' | 'google_reviews' | 'phone' | 'email' | 'telegram' | 'custom';
  label: string;
  url: string;
  enabled: boolean;
  qrEnabled: boolean;
  color?: string;
  customMessage?: string; // for whatsapp
}

export interface ClientProfile {
  id: string;
  slug: string;
  brandName: string;
  tagline: string;
  businessCategory: string;
  logoUrl: string;
  coverUrl?: string;
  badgeText: string;
  aboutUs: string;
  offerings: string[];
  contact: {
    primaryPhone: string;
    whatsappPhone: string;
    email: string;
    website: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    googleMapsUrl: string;
    openingHours?: string;
  };
  socialLinks: SocialLinkConfig[];
  upiConfig?: {
    enabled: boolean;
    upiId: string;
    payeeName: string;
  };
  themeAccent?: string;
  clientAccessCode: string; // for client direct login
  updatedAt: string;
}

export type ActiveTab = 'profile' | 'qrhub' | 'agency';

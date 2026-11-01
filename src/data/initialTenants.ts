import { ClientProfile } from '../types';

export const INITIAL_TENANTS: ClientProfile[] = [
  {
    id: 'turnkey-events',
    slug: 'turnkey-events',
    brandName: 'Turnkey Events Gurugram',
    tagline: 'Luxury Weddings, Experiential MICE & Corporate Summits',
    businessCategory: 'Event Management & Experiential Marketing',
    badgeText: 'PREMIUM PARTNER',
    logoUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=300&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    aboutUs: 'Turnkey Events is an industry-leading event architecture agency in Gurugram NCR. We curate high-octane corporate conferences, destination weddings, product launches, and gala evenings with seamless execution and creative excellence.',
    offerings: [
      'Royal Destination Weddings & Decor',
      'Corporate Summits & Global Conclaves',
      'High-End Audio Visual & 3D Stagecraft',
      'Celebrity Artist & Talent Management',
      'VIP Hospitality & Protocol Logistics'
    ],
    contact: {
      primaryPhone: '+91 8287876038',
      whatsappPhone: '+91 8287876038',
      email: 'turnkeyeventsmanagement@gmail.com',
      website: 'https://turnkeyevents.in',
      address: 'Level 5, Horizon Center, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122002',
      googleMapsUrl: 'https://maps.google.com/?q=Golf+Course+Road+Gurugram',
      openingHours: 'Mon - Sat: 09:30 AM – 08:00 PM'
    },
    socialLinks: [
      {
        id: 'wa-1',
        platform: 'whatsapp',
        label: 'Direct WhatsApp Concierge',
        url: 'https://wa.me/918287876038',
        enabled: true,
        qrEnabled: true,
        color: '#25D366',
        customMessage: 'Hello Turnkey Events, I want to inquire about planning an event.'
      },
      {
        id: 'ig-1',
        platform: 'instagram',
        label: 'Instagram Gallery (@turnkeyevents)',
        url: 'https://instagram.com/turnkeyevents',
        enabled: true,
        qrEnabled: true,
        color: '#E1306C'
      },
      {
        id: 'yt-1',
        platform: 'youtube',
        label: 'Watch Event Highlights & Aftermovies',
        url: 'https://youtube.com/@turnkeyevents',
        enabled: true,
        qrEnabled: true,
        color: '#FF0000'
      },
      {
        id: 'web-1',
        platform: 'website',
        label: 'Official Web Portal',
        url: 'https://turnkeyevents.in',
        enabled: true,
        qrEnabled: true,
        color: '#d4af37'
      },
      {
        id: 'fb-1',
        platform: 'facebook',
        label: 'Facebook Community',
        url: 'https://facebook.com/turnkeyeventsgurugram',
        enabled: true,
        qrEnabled: true,
        color: '#1877F2'
      },
      {
        id: 'li-1',
        platform: 'linkedin',
        label: 'LinkedIn Corporate Page',
        url: 'https://linkedin.com/company/turnkey-events',
        enabled: true,
        qrEnabled: true,
        color: '#0A66C2'
      },
      {
        id: 'gmap-1',
        platform: 'google_reviews',
        label: 'Rate & Review on Google Maps',
        url: 'https://g.page/r/turnkey-events-gurugram/review',
        enabled: true,
        qrEnabled: true,
        color: '#FBBC05'
      }
    ],
    upiConfig: {
      enabled: true,
      upiId: 'turnkeyevents@icici',
      payeeName: 'Turnkey Events Management'
    },
    clientAccessCode: 'TK2026',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'aura-jewels',
    slug: 'aura-jewels',
    brandName: 'Aura Luxury Jewels',
    tagline: 'Handcrafted Heritage Polki & Certified Diamond Solitaires',
    businessCategory: 'Haute Fine Jewellery',
    badgeText: 'HERITAGE ATELIER',
    logoUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    aboutUs: 'Aura Luxury Jewels celebrates timeless Indian royalty combined with contemporary European craftsmanship. Every single diamond is GIA & IGI certified, handpicked for exceptional luster.',
    offerings: [
      'Bespoke Bridal Polki Sets',
      'Certified Solitaire Rings & Bands',
      'Art Deco Chokers & Layered Necklaces',
      'Private Diamond Consultation Lounge'
    ],
    contact: {
      primaryPhone: '+91 9876543210',
      whatsappPhone: '+91 9876543210',
      email: 'concierge@aurajewels.in',
      website: 'https://aurajewels.in',
      address: 'Galleria Market, DLF Phase IV',
      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122009',
      googleMapsUrl: 'https://maps.google.com/?q=Galleria+Market+Gurugram',
      openingHours: 'Tue - Sun: 11:00 AM – 08:30 PM (Closed Mondays)'
    },
    socialLinks: [
      {
        id: 'wa-aura',
        platform: 'whatsapp',
        label: 'VIP Jewellery Concierge',
        url: 'https://wa.me/919876543210',
        enabled: true,
        qrEnabled: true,
        color: '#25D366',
        customMessage: 'Hello Aura Jewels, I would like to book a private viewing session.'
      },
      {
        id: 'ig-aura',
        platform: 'instagram',
        label: 'Instagram Showcase (@aurajewels)',
        url: 'https://instagram.com/aurajewels',
        enabled: true,
        qrEnabled: true,
        color: '#E1306C'
      },
      {
        id: 'web-aura',
        platform: 'website',
        label: 'View Lookbook & Catalog',
        url: 'https://aurajewels.in',
        enabled: true,
        qrEnabled: true,
        color: '#d4af37'
      },
      {
        id: 'gmap-aura',
        platform: 'google_reviews',
        label: 'Client Testimonials on Google',
        url: 'https://g.page/r/aurajewels/review',
        enabled: true,
        qrEnabled: true,
        color: '#FBBC05'
      }
    ],
    upiConfig: {
      enabled: false,
      upiId: 'aurajewels@hdfcbank',
      payeeName: 'Aura Luxury Jewels LLP'
    },
    clientAccessCode: 'AURA88',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'apex-tech',
    slug: 'apex-tech',
    brandName: 'Apex Enterprise AI',
    tagline: 'Autonomous AI Agents & Next-Gen Cloud Infrastructure',
    businessCategory: 'Enterprise Technology & AI SaaS',
    badgeText: 'VERIFIED TECH HUBS',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    aboutUs: 'Apex Enterprise AI engineers scalable cloud microservices, LLM agent ecosystems, and automated data pipelines for Fortune 500 enterprises and hypergrowth startups.',
    offerings: [
      'Custom LLM Fine-Tuning & Multi-Agent Workflows',
      'Multi-Cloud Kubernetes & DevOps Migration',
      'Real-Time Predictive Analytics Dashboards',
      'Zero-Trust Enterprise Security Audits'
    ],
    contact: {
      primaryPhone: '+91 124 4567890',
      whatsappPhone: '+91 8287876038',
      email: 'solutions@apexenterprise.ai',
      website: 'https://apexenterprise.ai',
      address: 'Tower B, DLF Cyber City, Building 10',
      city: 'Gurugram',
      state: 'Haryana',
      postalCode: '122002',
      googleMapsUrl: 'https://maps.google.com/?q=DLF+Cyber+City+Gurugram',
      openingHours: 'Mon - Fri: 09:00 AM – 07:00 PM'
    },
    socialLinks: [
      {
        id: 'wa-apex',
        platform: 'whatsapp',
        label: 'Fast Enterprise Tech Support',
        url: 'https://wa.me/918287876038',
        enabled: true,
        qrEnabled: true,
        color: '#25D366'
      },
      {
        id: 'li-apex',
        platform: 'linkedin',
        label: 'LinkedIn Tech Insights',
        url: 'https://linkedin.com/company/apex-enterprise-ai',
        enabled: true,
        qrEnabled: true,
        color: '#0A66C2'
      },
      {
        id: 'web-apex',
        platform: 'website',
        label: 'Developer Documentation & Sandbox',
        url: 'https://apexenterprise.ai',
        enabled: true,
        qrEnabled: true,
        color: '#d4af37'
      },
      {
        id: 'tw-apex',
        platform: 'twitter',
        label: 'Follow on X (@apexai_hq)',
        url: 'https://x.com/apexai_hq',
        enabled: true,
        qrEnabled: true,
        color: '#1DA1F2'
      }
    ],
    clientAccessCode: 'APEX01',
    updatedAt: new Date().toISOString()
  }
];

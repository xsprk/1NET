import { Platform, PlatformConfig } from './types';

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  youtube: {
    name: 'YouTube',
    icon: 'ri-youtube-fill',
    color: 'text-red-500',
    supports: { video: true, audio: true, image: true }
  },
  tiktok: {
    name: 'TikTok',
    icon: 'ri-tiktok-fill',
    color: 'text-black',
    supports: { video: true, audio: true, image: true }
  },
  facebook: {
    name: 'Facebook',
    icon: 'ri-facebook-fill',
    color: 'text-blue-600',
    supports: { video: true, audio: true, image: true }
  },
  pinterest: {
    name: 'Pinterest',
    icon: 'ri-pinterest-fill',
    color: 'text-red-600',
    supports: { video: true, audio: false, image: true }
  },
  twitter: {
    name: 'X (Twitter)',
    icon: 'ri-twitter-x-fill',
    color: 'text-black',
    supports: { video: true, audio: true, image: true }
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'ri-whatsapp-fill',
    color: 'text-green-500',
    supports: { video: true, audio: true, image: true }
  },
  instagram: {
    name: 'Instagram',
    icon: 'ri-instagram-fill',
    color: 'text-pink-500',
    supports: { video: true, audio: true, image: true }
  }
};

export const detectPlatform = (url: string): Platform | null => {
  const patterns = {
    youtube: /(?:youtube\.com|youtu\.be)/i,
    tiktok: /tiktok\.com/i,
    facebook: /facebook\.com|fb\.watch/i,
    pinterest: /pinterest\.com/i,
    twitter: /twitter\.com|x\.com/i,
    whatsapp: /whatsapp\.com/i,
    instagram: /instagram\.com/i
  };

  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(url)) {
      return platform as Platform;
    }
  }
  return null;
};
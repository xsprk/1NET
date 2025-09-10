import { Platform, PlatformConfig } from './types';

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    icon: 'ri-instagram-fill',
    color: 'text-pink-500',
    supports: { video: true, audio: true, image: true }
  },
  youtube: {
    name: 'YouTube',
    icon: 'ri-youtube-fill',
    color: 'text-red-500',
    supports: { video: true, audio: true, image: true }
  },
  facebook: {
    name: 'Facebook',
    icon: 'ri-facebook-fill',
    color: 'text-blue-600',
    supports: { video: true, audio: true, image: true }
  },
  twitter: {
    name: 'X (Twitter)',
    icon: 'ri-twitter-x-fill',
    color: 'text-black',
    supports: { video: true, audio: true, image: true }
  }
};

export const detectPlatform = (url: string): Platform | null => {
  const patterns = {
    instagram: /instagram\.com/i,
    youtube: /(?:youtube\.com|youtu\.be)/i,
    facebook: /facebook\.com|fb\.watch/i,
    twitter: /twitter\.com|x\.com/i
  };

  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(url)) {
      return platform as Platform;
    }
  }
  return null;
};

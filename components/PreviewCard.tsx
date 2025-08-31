'use client';

import { motion } from 'framer-motion';
import { MediaInfo } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/platforms';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/lib/storage';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import Image from 'next/image';

interface PreviewCardProps {
  media: MediaInfo;
  onDownload: (media: MediaInfo) => void;
}

export default function PreviewCard({ media, onDownload }: PreviewCardProps) {
  const { t, settings } = useApp();
  const [isFav, setIsFav] = useState(false);
  const platformConfig = PLATFORM_CONFIGS[media.platform];

  useEffect(() => {
    setIsFav(isFavorite(media.id));
  }, [media.id]);

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFromFavorites(media.id);
    } else {
      addToFavorites(media);
    }
    setIsFav(!isFav);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="relative w-full h-48">
        <Image
          src={media.thumbnail}
          alt={media.title}
          fill
          className="object-cover object-top"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/70 px-3 py-1 rounded-full">
          <i className={`${platformConfig.icon} text-white w-4 h-4 flex items-center justify-center`}></i>
          <span className="text-white text-sm font-medium">{platformConfig.name}</span>
        </div>
        <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded-full">
          <span className="text-white text-sm font-medium">{media.duration}</span>
        </div>
        <button
          onClick={handleFavoriteToggle}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <i className={`${isFav ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600 dark:text-gray-400'} w-5 h-5 flex items-center justify-center`}></i>
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{media.title}</h3>
        
        {media.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{media.description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center space-x-2">
            <i className="ri-user-line w-4 h-4 flex items-center justify-center"></i>
            <span>{media.author}</span>
          </span>
          <span className="flex items-center space-x-2">
            <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
            <span>{media.views}</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="flex items-center space-x-2">
            <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
            <span>{media.uploadDate}</span>
          </span>
        </div>

        <button
          onClick={() => onDownload(media)}
          className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-colors whitespace-nowrap cursor-pointer hover:opacity-90"
          style={{ backgroundColor: settings.primaryColor }}
        >
          <div className="flex items-center justify-center space-x-2">
            <i className="ri-download-2-line w-5 h-5 flex items-center justify-center"></i>
            <span>{t('chooseFormat')}</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
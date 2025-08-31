
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { detectPlatform, PLATFORM_CONFIGS } from '@/lib/platforms';
import { useApp } from '@/lib/context';

interface URLInputProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export default function URLInput({ onSubmit, loading = false }: URLInputProps) {
  const { t, settings } = useApp();
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setUrl(value);
    const platform = detectPlatform(value);
    setDetectedPlatform(platform);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const isValidUrl = detectedPlatform !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="ri-link text-gray-400 w-5 h-5 flex items-center justify-center"></i>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t('inputPlaceholder')}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            style={{ 
              focusBorderColor: settings.primaryColor,
              borderColor: isValidUrl ? settings.primaryColor : undefined
            }}
            disabled={loading}
          />
          {detectedPlatform && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <i className={`${PLATFORM_CONFIGS[detectedPlatform as keyof typeof PLATFORM_CONFIGS].icon} ${PLATFORM_CONFIGS[detectedPlatform as keyof typeof PLATFORM_CONFIGS].color} w-4 h-4 flex items-center justify-center`}></i>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {PLATFORM_CONFIGS[detectedPlatform as keyof typeof PLATFORM_CONFIGS].name}
                </span>
              </div>
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!isValidUrl || loading}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 whitespace-nowrap cursor-pointer ${
            isValidUrl && !loading
              ? 'hover:scale-105'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ 
            backgroundColor: isValidUrl && !loading ? settings.primaryColor : '#9CA3AF'
          }}
          whileHover={isValidUrl && !loading ? { scale: 1.02 } : {}}
          whileTap={isValidUrl && !loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t('analyzing')}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <i className="ri-download-2-line w-5 h-5 flex items-center justify-center"></i>
              <span>{t('analyzeButton')}</span>
            </div>
          )}
        </motion.button>
      </form>

      <div className="mt-6 grid grid-cols-4 md:grid-cols-7 gap-4">
        {Object.entries(PLATFORM_CONFIGS).map(([platform, config]) => (
          <div key={platform} className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <i className={`${config.icon} ${config.color} w-6 h-6 flex items-center justify-center`}></i>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{config.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}


'use client';

import { motion } from 'framer-motion';
import { MediaInfo, DownloadFormat } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/platforms';
import { useState } from 'react';
import { useApp } from '@/lib/context';

interface FormatSelectorProps {
  media: MediaInfo;
  onDownload: (format: DownloadFormat) => void;
  onClose: () => void;
}

export default function FormatSelector({ media, onDownload, onClose }: FormatSelectorProps) {
  const { t, settings } = useApp();
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat | null>(null);
  const platformConfig = PLATFORM_CONFIGS[media.platform];

  const formats: DownloadFormat[] = [
    ...(platformConfig.supports.video ? [
      { type: 'video' as const, quality: 'hd' as const, extension: 'mp4', size: '~50MB' },
      { type: 'video' as const, quality: 'sd' as const, extension: 'mp4', size: '~25MB' }
    ] : []),
    ...(platformConfig.supports.audio ? [
      { type: 'audio' as const, quality: 'high' as const, extension: 'mp3', size: '~8MB' }
    ] : []),
    ...(platformConfig.supports.image ? [
      { type: 'image' as const, quality: 'high' as const, extension: 'jpg', size: '~2MB' }
    ] : [])
  ];

  const handleDownload = () => {
    if (selectedFormat) {
      onDownload(selectedFormat);
    }
  };

  const getFormatIcon = (format: DownloadFormat) => {
    switch (format.type) {
      case 'video': return 'ri-video-line';
      case 'audio': return 'ri-music-line';
      case 'image': return 'ri-image-line';
      default: return 'ri-file-line';
    }
  };

  const getQualityLabel = (format: DownloadFormat) => {
    switch (format.quality) {
      case 'hd': return 'HD (1080p)';
      case 'sd': return 'SD (720p)';
      case 'high': return t('highQuality');
      case 'medium': return t('mediumQuality');
      case 'low': return t('lowQuality');
      default: return format.quality;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('chooseFormat')}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <i className={`${platformConfig.icon} ${platformConfig.color} w-5 h-5 flex items-center justify-center`}></i>
              <span className="font-medium text-gray-900 dark:text-white">{platformConfig.name}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{media.title}</h3>
          </div>

          <div className="space-y-3 mb-6">
            {formats.map((format, index) => (
              <div
                key={index}
                onClick={() => setSelectedFormat(format)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedFormat === format
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <i className={`${getFormatIcon(format)} text-gray-600 dark:text-gray-400 w-5 h-5 flex items-center justify-center`}></i>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {t(format.type)} - {getQualityLabel(format)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format.extension.toUpperCase()} • {format.size}
                      </div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedFormat === format
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedFormat === format && (
                      <i className="ri-check-line text-white w-3 h-3 flex items-center justify-center"></i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleDownload}
              disabled={!selectedFormat}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedFormat
                  ? 'text-white hover:opacity-90'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
              style={{ backgroundColor: selectedFormat ? settings.primaryColor : undefined }}
            >
              {t('download')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

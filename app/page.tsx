
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import URLInput from '@/components/URLInput';
import PreviewCard from '@/components/PreviewCard';
import FormatSelector from '@/components/FormatSelector';
import DownloadSection from '@/components/DownloadSection';
import MotionWrapper from '@/components/MotionWrapper';
import { MediaInfo, DownloadFormat } from '@/lib/types';
import { detectPlatform } from '@/lib/platforms';
import { fetchMediaInfo } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApp } from '@/lib/context';

export default function Home() {
  const { t, settings } = useApp();
  const [loading, setLoading] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [showFormatSelector, setShowFormatSelector] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const platform = detectPlatform(url);
      if (!platform) {
        throw new Error(t('unsupportedPlatform'));
      }
      
      const info = await fetchMediaInfo(url, platform);
      setMediaInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('linkAnalysisError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (media: MediaInfo) => {
    setShowFormatSelector(true);
  };

  const handleFormatSelect = (format: DownloadFormat) => {
    setSelectedFormat(format);
    setShowFormatSelector(false);
  };

  const handleDownloadComplete = () => {
    setSelectedFormat(null);
    setMediaInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <MotionWrapper>
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <i className="ri-download-2-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </MotionWrapper>
        </div>

        <MotionWrapper delay={0.2}>
          <URLInput onSubmit={handleUrlSubmit} loading={loading} />
        </MotionWrapper>

        {error && (
          <MotionWrapper delay={0.3}>
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-error-warning-line text-red-500 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-red-700 dark:text-red-400 font-medium">{t('error')}</span>
                </div>
                <p className="text-red-600 dark:text-red-300 mt-1">{error}</p>
              </div>
            </div>
          </MotionWrapper>
        )}

        {mediaInfo && (
          <MotionWrapper delay={0.4}>
            <div className="mt-12 max-w-md mx-auto">
              <PreviewCard 
                media={mediaInfo} 
                onDownload={handleDownload}
              />
            </div>
          </MotionWrapper>
        )}

        <MotionWrapper delay={0.5}>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('featuresTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-speed-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('fastEfficient')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('fastEfficiientDesc')}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('securePrivate')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('securePrivateDesc')}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-settings-3-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('multipleFormats')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('multipleFormatsDesc')}</p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </main>

      <Footer />

      {showFormatSelector && mediaInfo && (
        <FormatSelector
          media={mediaInfo}
          onDownload={handleFormatSelect}
          onClose={() => setShowFormatSelector(false)}
        />
      )}

      {selectedFormat && mediaInfo && (
        <DownloadSection
          media={mediaInfo}
          format={selectedFormat}
          onComplete={handleDownloadComplete}
        />
      )}
    </div>
  );
}

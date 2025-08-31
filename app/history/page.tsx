
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HistoryList from '@/components/HistoryList';
import MotionWrapper from '@/components/MotionWrapper';
import { DownloadHistory } from '@/lib/types';
import { getDownloadHistory, saveDownloadHistory, getFavorites } from '@/lib/storage';
import { useApp } from '@/lib/context';

export default function HistoryPage() {
  const { t, settings } = useApp();
  const [history, setHistory] = useState<DownloadHistory[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalDownloads: 0,
    totalSize: '0 MB',
    mostUsedPlatform: 'YouTube'
  });

  useEffect(() => {
    setMounted(true);
    const loadData = () => {
      const historyData = getDownloadHistory();
      const favoritesData = getFavorites();
      
      setHistory(historyData);
      setFavorites(favoritesData);
      
      // Calculate statistics
      const totalDownloads = historyData.length;
      const platformCounts = historyData.reduce((acc, item) => {
        acc[item.mediaInfo.platform] = (acc[item.mediaInfo.platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const mostUsedPlatform = Object.entries(platformCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'YouTube';
      
      setStats({
        totalDownloads,
        totalSize: `${(totalDownloads * 25).toFixed(1)} MB`,
        mostUsedPlatform
      });
    };

    loadData();
  }, []);

  const clearHistory = () => {
    if (confirm(t('clearHistory') + ' ?')) {
      saveDownloadHistory([]);
      setHistory([]);
    }
  };

  const handleRedownload = (item: DownloadHistory) => {
    console.log('Redownloading:', item);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MotionWrapper>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('downloadHistory')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your downloads and favorites
            </p>
          </div>
        </MotionWrapper>

        {/* Statistics */}
        <MotionWrapper delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${settings.primaryColor}20` }}
                >
                  <i 
                    className="ri-download-2-line w-6 h-6 flex items-center justify-center"
                    style={{ color: settings.primaryColor }}
                  ></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDownloads}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total downloads</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <i className="ri-hard-drive-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSize}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total size</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <i className="ri-star-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.mostUsedPlatform}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Preferred platform</p>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Tabs */}
        <MotionWrapper delay={0.2}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'history'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{ backgroundColor: activeTab === 'history' ? settings.primaryColor : 'transparent' }}
              >
                {t('downloadHistory')} ({history.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{ backgroundColor: activeTab === 'favorites' ? settings.primaryColor : 'transparent' }}
              >
                {t('favorites')} ({favorites.length})
              </button>
            </div>

            {activeTab === 'history' && history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap cursor-pointer"
              >
                {t('clearHistory')}
              </button>
            )}
          </div>
        </MotionWrapper>

        {/* Content */}
        <MotionWrapper delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {activeTab === 'history' ? (
              history.length > 0 ? (
                <HistoryList history={history} onRedownload={handleRedownload} />
              ) : (
                <div className="p-12 text-center">
                  <i className="ri-download-2-line w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4 flex items-center justify-center"></i>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noHistory')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your downloads will appear here</p>
                </div>
              )
            ) : (
              favorites.length > 0 ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                      <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover object-top rounded-lg mb-3" />
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <i className="ri-heart-line w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4 flex items-center justify-center"></i>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorites</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your favorite content will appear here</p>
                </div>
              )
            )}
          </div>
        </MotionWrapper>
      </main>

      <Footer />
    </div>
  );
}

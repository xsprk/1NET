'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { PLATFORM_CONFIGS } from '@/lib/platforms';

export default function Footer() {
  const { t, settings } = useApp();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <i className="ri-download-2-line text-white w-6 h-6 flex items-center justify-center"></i>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">MediaDownloader</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t('subtitle')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  {t('history')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Plateformes supportées</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {Object.entries(PLATFORM_CONFIGS).map(([platform, config]) => (
                <li key={platform} className="flex items-center space-x-2">
                  <i className={`${config.icon} ${config.color} w-4 h-4 flex items-center justify-center`}></i>
                  <span>{config.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

       <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 1NE Networks. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
}

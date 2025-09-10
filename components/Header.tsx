'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import ThemeCustomizer from './ThemeCustomizer';

export default function Header() {
  const pathname = usePathname();
  const { t, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: '/', icon: 'ri-home-line' },
    { name: t('history'), href: '/history', icon: 'ri-history-line' },
    { name: t('about'), href: '/about', icon: 'ri-information-line' },
    { name: 'Documentation', href: '/documentation', icon: 'ri-file-text-line' }
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <div 
  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
  style={{ backgroundColor: settings.primaryColor }}
>
  <span className="text-lg">1NE</span>
</div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Networks</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  style={pathname === item.href ? { backgroundColor: settings.primaryColor } : {}}
                >
                  <i className={`${item.icon} w-4 h-4 flex items-center justify-center`}></i>
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <button
                onClick={() => setIsThemeOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <i className="ri-settings-3-line w-4 h-4 flex items-center justify-center"></i>
                <span>{t('settings')}</span>
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-6 h-6 flex items-center justify-center`}></i>
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      pathname === item.href
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    style={pathname === item.href ? { backgroundColor: settings.primaryColor } : {}}
                  >
                    <i className={`${item.icon} w-4 h-4 flex items-center justify-center`}></i>
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <button
                  onClick={() => {
                    setIsThemeOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <i className="ri-settings-3-line w-4 h-4 flex items-center justify-center"></i>
                  <span>{t('settings')}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <ThemeCustomizer isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
    </>
  );
}

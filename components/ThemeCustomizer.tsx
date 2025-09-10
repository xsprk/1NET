'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_COLORS = [
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#10B981' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' }
];

export default function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const { settings, updateSettings, t } = useApp();
  const [customColor, setCustomColor] = useState(settings.primaryColor);

  if (!isOpen) return null;

  const handleColorChange = (color: string) => {
    setCustomColor(color);
    updateSettings({ primaryColor: color });
  };

  const handleThemeToggle = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  const handleLanguageChange = () => {
  updateSettings({ language: 'en' });
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings')}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-300"></i>
            </button>
          </div>

          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('language')}</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
  onClick={handleLanguageChange}
  className={`p-3 rounded-xl border-2 transition-all text-sm font-medium cursor-pointer ${
    settings.language === 'en'
      ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
      : 'border-gray-300 dark:border-gray-600'
  }`}
>
  English 
</button>
            </div>
          </div>

        
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('theme')}</h3>
            <button
              onClick={handleThemeToggle}
              className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <i className={`${settings.theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'} w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-300`}></i>
                <span className="text-gray-700 dark:text-gray-300">
                  {settings.theme === 'dark' ? t('darkMode') : t('lightMode')}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                settings.theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                  settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </button>
          </div>

          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('primaryColor')}</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.value)}
                  className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                    settings.primaryColor === color.value
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Couleur personnalisée</span>
            </div>
          </div>

         
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Aperçu</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  <i className="ri-download-2-line text-white w-4 h-4 flex items-center justify-center"></i>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">MediaDownloader</span>
              </div>
              <button
                className="w-full py-2 px-4 rounded-lg text-white font-medium text-sm whitespace-nowrap"
                style={{ backgroundColor: settings.primaryColor }}
              >
                {t('download')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

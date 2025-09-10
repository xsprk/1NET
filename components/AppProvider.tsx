'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AppContext, AppSettings, Language, Theme, getTranslation } from '@/lib/context';

interface AppProviderProps {
  children: ReactNode;
}

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'light',
  primaryColor: '#6366F1'
};

const THEME_COLORS = {
  primary: '#6366F1',
  secondary: '#10B981',
  accent: '#F59E0B',
  lightBg: '#F9FAFB',
  darkBg: '#111827'
};

export default function AppProvider({ children }: AppProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Charger les paramètres depuis localStorage
    const savedSettings = localStorage.getItem('media-downloader-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    
    // Détecter la langue du navigateur
    const browserLang: Language = 'en';
    if (!savedSettings) {
      setSettings(prev => ({ ...prev, language: browserLang }));
    }
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Sauvegarder les paramètres
      localStorage.setItem('media-downloader-settings', JSON.stringify(settings));
      
      // Appliquer le thème
      applyTheme(settings);
    }
  }, [settings, mounted]);

  const applyTheme = (settings: AppSettings) => {
    const root = document.documentElement;
    
    // Appliquer les couleurs
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--secondary-color', THEME_COLORS.secondary);
    root.style.setProperty('--accent-color', THEME_COLORS.accent);
    
    // Appliquer le mode sombre/clair
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-color', THEME_COLORS.darkBg);
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-color', THEME_COLORS.lightBg);
    }
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const t = getTranslation(settings.language);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ settings, updateSettings, t }}>
      {children}
    </AppContext.Provider>
  );
}

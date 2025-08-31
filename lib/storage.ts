import { DownloadHistory, MediaInfo } from './types';

export const STORAGE_KEYS = {
  HISTORY: 'media-downloader-history',
  FAVORITES: 'media-downloader-favorites',
  SETTINGS: 'media-downloader-settings'
};

export const getDownloadHistory = (): DownloadHistory[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveDownloadHistory = (history: DownloadHistory[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving download history:', error);
  }
};

export const addToHistory = (item: DownloadHistory): void => {
  const history = getDownloadHistory();
  const updatedHistory = [item, ...history.filter(h => h.id !== item.id)].slice(0, 100);
  saveDownloadHistory(updatedHistory);
};

export const getFavorites = (): MediaInfo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: MediaInfo[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addToFavorites = (media: MediaInfo): void => {
  const favorites = getFavorites();
  const updatedFavorites = [media, ...favorites.filter(f => f.id !== media.id)];
  saveFavorites(updatedFavorites);
};

export const removeFromFavorites = (mediaId: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(f => f.id !== mediaId);
  saveFavorites(updatedFavorites);
};

export const isFavorite = (mediaId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(f => f.id === mediaId);
};
export interface MediaInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  platform: Platform;
  url: string;
  description?: string;
  author?: string;
  views?: string;
  uploadDate?: string;
}

export type Platform = 'instagram' | 'youtube' | 'facebook' | 'twitter';

export interface DownloadFormat {
  type: 'video' | 'audio' | 'image';
  quality: 'hd' | 'sd' | 'high' | 'medium' | 'low';
  extension: string;
  size?: string;
  url?: string;
}

export interface DownloadHistory {
  id: string;
  mediaInfo: MediaInfo;
  format: DownloadFormat;
  downloadedAt: string;
  status: 'completed' | 'failed' | 'pending';
  fileSize?: string;
  downloadUrl?: string;
  error?: string; // Ajouté pour gérer les erreurs dans l'historique
}

export interface PlatformConfig {
  name: string;
  icon: string;
  color: string;
  supports: {
    video: boolean;
    audio: boolean;
    image: boolean;
  };
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  downloadUrl?: string;
}

export interface DownloadProgress {
  percentage: number;
  status: 'preparing' | 'downloading' | 'completed' | 'error';
  speed?: string;
  eta?: string;
}

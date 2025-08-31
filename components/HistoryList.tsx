
'use client';

import { motion } from 'framer-motion';
import { DownloadHistory } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/platforms';
import Image from 'next/image';

interface HistoryListProps {
  history: DownloadHistory[];
  onRedownload: (history: DownloadHistory) => void;
}

export default function HistoryList({ history, onRedownload }: HistoryListProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'ri-check-line text-green-500';
      case 'failed': return 'ri-error-warning-line text-red-500';
      case 'pending': return 'ri-time-line text-yellow-500';
      default: return 'ri-file-line text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  
  if (!history || !Array.isArray(history) || history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-history-line text-gray-400 dark:text-gray-500 w-8 h-8 flex items-center justify-center"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No History</h3>
        <p className="text-gray-600 dark:text-gray-400">Your downloads will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {history.map((item, index) => {
       
          if (!item || !item.mediaInfo || !item.format) {
            return null;
          }

          const platformConfig = PLATFORM_CONFIGS[item.mediaInfo.platform] || {
            name: 'Unknown',
            icon: 'ri-global-line',
            color: 'text-gray-500'
          };

          return (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start space-x-4">
                <Image
                  src={item.mediaInfo.thumbnail || '/placeholder.jpg'}
                  alt={item.mediaInfo.title || 'Media content'}
                  className="w-20 h-20 rounded-lg object-cover object-top flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCA0MEwyNCAzMkMyNCAzMC44OTU0IDI0Ljg5NTQgMzAgMjYgMzBMMzAgMzBDMzEuMTA0NiAzMCAzMiAzMC44OTU0IDMyIDMyTDMyIDQwTDI0IDQwWiIgZmlsbD0iI0Q1RDlERCIvPgo8cGF0aCBkPSJNNDggNDBMNDggMzJDNDggMzAuODk1NCA0OC44OTU0IDMwIDUwIDMwTDU0IDMwQzU1LjEwNDYgMzAgNTYgMzAuODk1NCA1NiAzMkw1NiA0MEw0OCA0MFoiIGZpbGw9IiNENUQ5REQiLz4KPHBhdGggZD0iTTI0IDU2TDI0IDQ4QzI0IDQ2Ljg5NTQgMjQuODk1NCA0NiAyNiA0NkwzMCA0NkMzMS4xMDQ2IDQ2IDMyIDQ2Ljg5NTQgMzIgNDhMMzIgNTZMMjQgNTZaIiBmaWxsPSIjRDVEOUREIi8+CjxwYXRoIGQ9Ik00OCA1Nkw0OCA0OEM0OCA0Ni44OTU0IDQ4Ljg5NTQgNDYgNTAgNDZMNTQgNDZDNTUuMTA0NiA0NiA1NiA0Ni44OTU0IDU2IDQ4TDU2IDU2TDQ4IDU2WiIgZmlsbD0iI0Q1RDlERCIvPgo8L3N2Zz4K';
                  }}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className={`${platformConfig.icon} ${platformConfig.color} w-4 h-4 flex items-center justify-center`}></i>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{platformConfig.name}</span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.downloadedAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.mediaInfo.title || 'Untitled'}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center space-x-1">
                      <i className="ri-file-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{(item.format.type || 'unknown').toUpperCase()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="ri-hard-drive-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{(item.format.extension || 'unknown').toUpperCase()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="ri-database-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{item.format.size || 'Unknown size'}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className={`${getStatusIcon(item.status)} w-4 h-4 flex items-center justify-center`}></i>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => onRedownload(item)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <div className="flex items-center space-x-1">
                        <i className="ri-download-2-line w-4 h-4 flex items-center justify-center"></i>
                        <span>Redownload</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-amber-900/20 animate-in slide-in-from-bottom-2"
    >
      <WifiOff className="w-4 h-4 animate-pulse" />
      <span>Offline Mode — All QR tools work 100% locally in your browser.</span>
    </div>
  );
};

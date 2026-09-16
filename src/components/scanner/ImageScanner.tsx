import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { QRScannerService } from '../../services/qr/scanner.service';
import { QRScanResult } from '../../types/qr.types';
import { APP_CONFIG } from '../../config/app.config';

interface ImageScannerProps {
  onScanSuccess: (result: QRScanResult) => void;
}

export const ImageScanner: React.FC<ImageScannerProps> = ({ onScanSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    // Create temporary preview for visual feedback
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      const result = await QRScannerService.scanImageFile(file);
      onScanSuccess(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to decode QR code from this image.');
    } finally {
      setIsProcessing(false);
      // Revoke preview after processing completes
      setTimeout(() => {
        URL.revokeObjectURL(localUrl);
        setPreviewUrl(null);
      }, 4000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset file input value so selecting the same file triggers change again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center">
      {/* Upload Dropzone Container */}
      <div
        id="image-upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/30 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload QR code image file. Drag and drop or press enter to browse."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
          id="qr-image-file-input"
          aria-label="Upload QR code image"
        />

        {/* Processing State */}
        {isProcessing ? (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mb-3" />
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Analyzing QR Code...
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Decoding pixels locally in browser
            </p>
          </div>
        ) : (
          <>
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-4 shadow-sm">
              <UploadCloud className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Upload QR Code Image
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Drag and drop your QR code image here, or{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold underline">
                browse files
              </span>
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span>Supports PNG, JPG, JPEG, WEBP</span>
              <span>•</span>
              <span>Max {APP_CONFIG.limits.maxImageFileSizeMB}MB</span>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-200/60 dark:border-emerald-900/40">
              <span>🔒 100% Client-side: Image is never sent to a server</span>
            </div>
          </>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="mt-4 w-full max-w-xl lg:max-w-2xl rounded-xl bg-red-50 p-4 text-left text-xs text-red-800 dark:bg-red-950/30 dark:text-red-300 border border-red-200 dark:border-red-900/30 animate-in fade-in flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Detection failed</p>
            <p className="mt-0.5">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

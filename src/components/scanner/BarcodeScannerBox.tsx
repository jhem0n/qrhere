import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  Upload,
  AlertCircle,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Flashlight,
  FlashlightOff,
  SwitchCamera,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import { BarcodeScannerService } from '../../services/barcode/barcode-scanner.service';
import { cameraService } from '../../services/camera/camera.service';
import { QRScanResult, CameraDevice } from '../../types/qr.types';

interface BarcodeScannerBoxProps {
  onScanSuccess?: (result: QRScanResult) => void;
}

export const BarcodeScannerBox: React.FC<BarcodeScannerBoxProps> = ({ onScanSuccess }) => {
  const [method, setMethod] = useState<'camera' | 'image'>('camera');
  const [result, setResult] = useState<QRScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isScanningRef = useRef(false);
  const isDecodingRef = useRef(false);
  const isStartingRef = useRef(false);
  const lastScanTimeRef = useRef(0);
  const lastScannedRef = useRef<{ text: string; time: number } | null>(null);

  // Stop camera helper - cleanly releases hardware tracks and cancels scanning loop
  const stopCamera = useCallback(() => {
    isStartingRef.current = false;
    isScanningRef.current = false;
    isDecodingRef.current = false;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    cameraService.stopCamera();
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCameraLoading(false);
    setIsTorchOn(false);
  }, []);

  // Ensure camera streams are always torn down on unmount or tab backgrounding
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopCamera();
      }
    };

    const handleUnload = () => {
      stopCamera();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handleUnload);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handleUnload);
      window.removeEventListener('beforeunload', handleUnload);
      stopCamera();
    };
  }, [stopCamera]);

  // Handle successful scan with duplicate suppression
  const handleSuccess = useCallback(
    (scanRes: QRScanResult) => {
      const now = Date.now();
      // Debounce identical scans within 2000ms
      if (
        lastScannedRef.current &&
        lastScannedRef.current.text === scanRes.rawText &&
        now - lastScannedRef.current.time < 2000
      ) {
        return;
      }
      lastScannedRef.current = { text: scanRes.rawText, time: now };

      stopCamera();
      setResult(scanRes);
      setError(null);
      if (onScanSuccess) {
        onScanSuccess(scanRes);
      }
    },
    [stopCamera, onScanSuccess]
  );

  // Decode a frame from the live video
  const decodeFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isDecodingRef.current) return;
    const video = videoRef.current;
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) return;

    isDecodingRef.current = true;
    try {
      const canvas = canvasRef.current;
      const vWidth = video.videoWidth;
      const vHeight = video.videoHeight;

      // Scale to optimal dimensions (max 1024px) for efficient recognition without memory bloat
      const MAX_DIM = 1024;
      let targetW = vWidth;
      let targetH = vHeight;
      if (targetW > MAX_DIM || targetH > MAX_DIM) {
        const scale = Math.min(MAX_DIM / targetW, MAX_DIM / targetH);
        targetW = Math.max(1, Math.round(targetW * scale));
        targetH = Math.max(1, Math.round(targetH * scale));
      }

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, targetW, targetH);
      const decoded = await BarcodeScannerService.scanCanvas(canvas);

      if (decoded && decoded.text) {
        const formatted = BarcodeScannerService.formatScanResult(
          decoded.text,
          'camera',
          decoded.format
        );
        handleSuccess(formatted);
      }
    } catch {
      // Ignore routine scan misses
    } finally {
      isDecodingRef.current = false;
    }
  }, [handleSuccess]);

  // Frame scanning loop - active only when camera is streaming
  const scanLoop = useCallback(() => {
    if (!isScanningRef.current || !videoRef.current || !canvasRef.current) {
      return;
    }

    const now = performance.now();
    // Throttle scan rate to ~6-7 FPS (every 160ms) to ensure smooth 60fps UI and preserve battery
    if (now - lastScanTimeRef.current >= 160) {
      lastScanTimeRef.current = now;
      if (!isDecodingRef.current) {
        decodeFrame();
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanLoop);
  }, [decodeFrame]);

  // Start live camera - invoked ONLY upon explicit user interaction
  const startCamera = async (deviceId?: string, faceMode: 'environment' | 'user' = facingMode) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      setError(null);
      setCameraLoading(true);

      const stream = await cameraService.startCamera({
        deviceId,
        facingMode: faceMode,
      });

      const video = videoRef.current;
      if (!video) {
        throw new Error('Video preview element is not available. Please refresh and try again.');
      }

      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      video.muted = true;

      try {
        await video.play();
      } catch (playErr) {
        console.warn('Camera video play warning:', playErr);
      }

      setCameraActive(true);
      setCameraLoading(false);

      // Refresh capabilities
      const availableDevices = await cameraService.getAvailableCameras();
      setDevices(availableDevices);
      setHasTorch(cameraService.hasTorchCapability());

      // Start continuous scan loop
      isScanningRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(scanLoop);
    } catch (err: any) {
      stopCamera();
      setError(err?.message || 'Unable to access your device camera. Please check browser permissions.');
    } finally {
      isStartingRef.current = false;
      setCameraLoading(false);
    }
  };

  // Capture frame manually (Method 2: "click Capture to take a picture")
  const handleManualCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setError(null);
    try {
      await decodeFrame();
      if (!result) {
        // If immediate decode didn't find a code, display helpful guidance
        setError(
          'Barcode not detected. Try moving closer, improving lighting, or uploading a clearer image.'
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Torch
  const handleToggleTorch = async () => {
    const nextState = !isTorchOn;
    const success = await cameraService.setTorch(nextState);
    if (success) {
      setIsTorchOn(nextState);
    }
  };

  // Switch Camera
  const handleSwitchCamera = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    stopCamera();
    await startCamera(undefined, nextMode);
  };

  // Handle Image File Upload (Method 1)
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const scanRes = await BarcodeScannerService.scanImageFile(file);
      handleSuccess(scanRes);
    } catch (err: any) {
      setError(
        err?.message ||
          'Barcode not detected. Try moving closer, improving lighting, or uploading a clearer image.'
      );
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCopy = () => {
    if (!result?.rawText) return;
    navigator.clipboard.writeText(result.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanAgain = () => {
    lastScannedRef.current = null;
    setResult(null);
    setError(null);
  };

  const isDangerousOrBlocked =
    result && !result.isSafeUrl && (result.warning !== undefined || result.type === 'url');

  return (
    <div className="w-full max-w-2xl md:max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
      {result ? (
        /* Result Output Panel */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {result.barcodeFormat || 'Barcode'} Detected
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                Via {result.source}
              </span>
              {isDangerousOrBlocked ? (
                <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Unsafe Scheme</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Safe</span>
                </span>
              )}
            </div>
            <button
              onClick={handleScanAgain}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scan Another Barcode</span>
            </button>
          </div>

          {/* Security alert for blocked/unsafe schemes */}
          {isDangerousOrBlocked && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3"
            >
              <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Action & Execution Strictly Blocked for Safety</p>
                <p className="text-xs leading-relaxed text-rose-800 dark:text-rose-300">
                  {result.warning || 'Dangerous or unauthorized protocol detected. Automated navigation is disabled.'}
                </p>
              </div>
            </div>
          )}

          {/* Security advisory for safe links with nuances */}
          {result.isSafeUrl && result.warning && (
            <div
              role="status"
              className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold">Security Advisory</p>
                <p className="leading-relaxed opacity-90">{result.warning}</p>
              </div>
            </div>
          )}

          {/* Safe URL Destination Information */}
          {result.isSafeUrl && result.parsedUrl && (
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-semibold mb-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Target Destination:</span>
                <span className="font-mono text-blue-700 dark:text-blue-200">
                  {result.displayHostname || 'Web URL'}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Validated URL using {result.urlScheme || 'https:'} protocol.
              </p>
            </div>
          )}

          {/* Decoded Barcode Content (Text Only, never raw HTML) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Decoded Content
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {result.rawText.length} characters
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 font-mono text-sm sm:text-base break-all text-slate-900 dark:text-white select-all">
              {result.rawText}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-semibold text-sm transition cursor-pointer shadow-xs min-h-[44px]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Data'}</span>
            </button>

            {/* Render Safe Open Link ONLY if validated safe URL */}
            {result.isSafeUrl && result.parsedUrl && !isDangerousOrBlocked && (
              <a
                href={result.parsedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Open Link</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              type="button"
              onClick={handleScanAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Scan Again</span>
            </button>
          </div>
        </div>
      ) : (
        /* Scanner Input Panel */
        <div>
          {/* Method Tabs */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              type="button"
              id="barcode-tab-camera"
              onClick={() => {
                setMethod('camera');
                setError(null);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                method === 'camera'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Camera Scanner</span>
            </button>

            <button
              type="button"
              id="barcode-tab-upload"
              onClick={() => {
                setMethod('image');
                stopCamera();
                setError(null);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer min-h-[44px] ${
                method === 'image'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div className="flex-1">
                <p className="font-semibold">Scan Notice</p>
                <p className="mt-0.5 text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Method 1: Camera Scanner */}
          {method === 'camera' && (
            <div className="space-y-4">
              {!cameraActive ? (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-xs">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Position the barcode inside the frame.
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
                    Supports 1D barcodes (EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, ITF, Codabar) and 2D barcodes (QR Code, Data Matrix).
                  </p>
                  <button
                    type="button"
                    onClick={() => startCamera()}
                    disabled={cameraLoading}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-sm disabled:opacity-50 min-h-[48px]"
                  >
                    {cameraLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Starting camera...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4" />
                        <span>Open Camera</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Status Indicator */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Scanning...</span>
                  </div>

                  {/* Barcode Targeting Guide Frame */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="relative w-4/5 max-w-sm h-36 sm:h-44 rounded-xl border-2 border-blue-500/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
                      {/* Red laser guide line */}
                      <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-0.5 bg-red-500/80 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                      <div className="absolute -bottom-7 left-0 right-0 text-center">
                        <span className="text-[11px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full">
                          Position the barcode inside the frame.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Camera Controls Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
                    <div className="flex items-center gap-2">
                      {hasTorch && (
                        <button
                          type="button"
                          onClick={handleToggleTorch}
                          className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                          aria-label="Toggle flashlight"
                        >
                          {isTorchOn ? <Flashlight className="w-4 h-4 text-amber-400" /> : <FlashlightOff className="w-4 h-4" />}
                        </button>
                      )}
                      {devices.length > 1 && (
                        <button
                          type="button"
                          onClick={handleSwitchCamera}
                          className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                          aria-label="Switch camera"
                        >
                          <SwitchCamera className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Capture button (As described in Method 2 of reference guide) */}
                    <button
                      type="button"
                      onClick={handleManualCapture}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition cursor-pointer shadow-md flex items-center gap-1.5 min-h-[44px]"
                    >
                      {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      <span>Capture</span>
                    </button>

                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold backdrop-blur transition cursor-pointer min-h-[44px]"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Method 2: Image Upload */}
          {method === 'image' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                id="barcode-image-file-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Upload Barcode Image
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
                  Drag and drop a photo or screenshot of any 1D or 2D barcode, or click the button below to browse your files.
                </p>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-sm disabled:opacity-50 min-h-[48px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Decoding Barcode...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Offscreen Canvas for Frame Capture */}
          <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

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
  ShieldAlert,
} from 'lucide-react';
import { BarcodeScannerService } from '../../services/barcode/barcode-scanner.service';
import { cameraService } from '../../services/camera/camera.service';
import { QRScanResult, CameraDevice } from '../../types/qr.types';

export type CameraStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'error';

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
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle');
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasTorch, setHasTorch] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isScanningRef = useRef(false);
  const isStartingRef = useRef(false);
  const isDecodingRef = useRef(false);
  const lastScanTimeRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera helper - cleanly releases hardware tracks and scanning loop
  const handleStopCamera = useCallback(() => {
    isStartingRef.current = false;
    isScanningRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    cameraService.stopCamera();
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsTorchOn(false);
    setCameraStatus('idle');
  }, []);

  // Ensure camera streams release on tab backgrounding or unmount
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        handleStopCamera();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', handleStopCamera);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleStopCamera);
      handleStopCamera();
    };
  }, [handleStopCamera]);

  // Handle successful scan
  const handleSuccess = useCallback(
    (scanRes: QRScanResult) => {
      handleStopCamera();
      setResult(scanRes);
      setError(null);
      if (onScanSuccess) {
        onScanSuccess(scanRes);
      }
    },
    [handleStopCamera, onScanSuccess]
  );

  // Continuous frame scanning loop
  const scanLoop = useCallback(async () => {
    if (!isScanningRef.current || !videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const now = performance.now();

    // Throttle frame processing to every ~160ms for smooth 60fps UI and low CPU usage
    if (
      now - lastScanTimeRef.current >= 160 &&
      video.readyState >= 2 &&
      video.videoWidth > 0 &&
      video.videoHeight > 0 &&
      !isDecodingRef.current
    ) {
      lastScanTimeRef.current = now;
      isDecodingRef.current = true;
      try {
        const decoded = await BarcodeScannerService.scanVideoOrCanvas(video, canvasRef.current);
        if (decoded && decoded.text) {
          handleSuccess(
            BarcodeScannerService.formatScanResult(
              decoded.text,
              'camera',
              decoded.format
            )
          );
          return;
        }
      } catch {
        // Normal scan miss while seeking or moving
      } finally {
        isDecodingRef.current = false;
      }
    }

    if (isScanningRef.current) {
      animationFrameRef.current = requestAnimationFrame(scanLoop);
    }
  }, [handleSuccess]);

  // Start live camera
  const handleStartCamera = async (overrideDeviceId?: string, faceMode: 'environment' | 'user' = facingMode) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    setError(null);
    setCameraStatus('requesting');

    try {
      const targetDeviceId = overrideDeviceId || selectedDeviceId || undefined;
      const stream = await cameraService.startCamera({
        deviceId: targetDeviceId,
        facingMode: faceMode,
      });

      // Allow 1 tick if needed for video element mount
      let video = videoRef.current;
      if (!video) {
        await new Promise((r) => setTimeout(r, 60));
        video = videoRef.current;
      }

      if (!video) {
        throw new Error('Video preview element is not available. Please refresh and try again.');
      }

      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;

      try {
        await video.play();
      } catch (playErr) {
        console.warn('Camera video play warning:', playErr);
      }

      setCameraStatus('active');

      const availableDevices = await cameraService.getAvailableCameras();
      setDevices(availableDevices);
      setHasTorch(cameraService.hasTorchCapability());

      // Start continuous scanning loop
      isScanningRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(scanLoop);
    } catch (err: any) {
      handleStopCamera();
      const isDenied = cameraService.isPermissionDenied(err);
      const friendlyMsg = cameraService.humanizeCameraError(err);
      setError(friendlyMsg);
      setCameraStatus(isDenied ? 'denied' : 'error');
    } finally {
      isStartingRef.current = false;
    }
  };

  // Capture frame manually
  const handleManualCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Camera video feed is still initializing. Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      const decoded = await BarcodeScannerService.scanVideoOrCanvas(video, canvasRef.current);
      if (decoded && decoded.text) {
        handleSuccess(
          BarcodeScannerService.formatScanResult(
            decoded.text,
            'camera',
            decoded.format
          )
        );
      } else {
        setError('No barcode detected in this frame. Make sure the barcode is well-lit, centered inside the box, and in focus.');
      }
    } catch {
      setError('Could not decode barcode from current frame. Please try again.');
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
    handleStopCamera();
    setTimeout(() => {
      handleStartCamera(undefined, nextMode);
    }, 120);
  };

  // Handle Image File Upload
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const scanRes = await BarcodeScannerService.scanImageFile(file);
      handleSuccess(scanRes);
    } catch (err: any) {
      setError(err?.message || 'Could not decode barcode from this image. Please try a clearer picture.');
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
    setResult(null);
    setError(null);
    setCameraStatus('idle');
  };

  const isStreamingOrRequesting = cameraStatus === 'active' || cameraStatus === 'requesting';

  return (
    <div className="w-full max-w-2xl md:max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm">
      {result ? (
        /* Result Output Panel */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {result.barcodeFormat || 'Barcode'} Detected
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                Via {result.source}
              </span>
            </div>
            <button
              onClick={handleScanAgain}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scan Another Barcode</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Decoded Content
            </label>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 font-mono text-sm sm:text-base break-all text-slate-900 dark:text-white select-all">
              {result.rawText}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-semibold text-sm transition cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Data'}</span>
            </button>

            {result.type === 'url' && result.parsedUrl && (
              <a
                href={result.parsedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-xs"
              >
                <span>Open Link</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              type="button"
              onClick={handleScanAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition cursor-pointer"
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
                handleStopCamera();
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
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div className="flex-1">
                <p className="font-semibold text-rose-900 dark:text-rose-200">Scan Notice</p>
                <p className="mt-0.5 text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Method 1: Camera Scanner */}
          {method === 'camera' && (
            <div className="space-y-4">
              {/* STATE 1: Idle Screen - Matches Reference UI */}
              {cameraStatus === 'idle' && (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-xs">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Position the barcode inside the frame.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mb-6 leading-relaxed">
                    Supports 1D barcodes (EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, ITF, Codabar) and 2D barcodes (QR Code, Data Matrix).
                  </p>
                  <button
                    type="button"
                    onClick={() => handleStartCamera()}
                    aria-label="Open Camera to scan barcode"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-sm min-h-[44px]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera</span>
                  </button>
                </div>
              )}

              {/* STATE 2: Permission Denied */}
              {cameraStatus === 'denied' && (
                <div
                  role="alert"
                  className="p-6 sm:p-8 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/30 text-center flex flex-col items-center justify-center animate-in fade-in duration-200"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300 mb-4">
                    <ShieldAlert className="h-7 w-7" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-rose-900 dark:text-rose-200">
                    Camera Permission Denied
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-rose-700 dark:text-rose-300 max-w-md leading-relaxed">
                    Camera access was blocked by your browser. To scan barcodes with your camera, please click the lock or camera icon in your address bar and change permissions to Allow.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleStartCamera()}
                      className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer min-h-[44px]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Again</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMethod('image');
                        setError(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer min-h-[44px]"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Barcode Image Instead</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3: General Camera Error */}
              {cameraStatus === 'error' && (
                <div
                  role="alert"
                  className="p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 text-center flex flex-col items-center justify-center animate-in fade-in duration-200"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300 mb-4">
                    <AlertCircle className="h-7 w-7" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-amber-900 dark:text-amber-200">
                    Unable to Connect to Camera
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-amber-800 dark:text-amber-300 max-w-md leading-relaxed">
                    {error || 'Could not start camera on this device. Please verify camera settings and try again.'}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleStartCamera()}
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer min-h-[44px]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Camera</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMethod('image');
                        setError(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer min-h-[44px]"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Barcode Image Instead</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 4: Live Viewfinder (Active or Requesting) */}
              {isStreamingOrRequesting && (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center shadow-lg border border-slate-800">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                  />

                  {/* Loading Overlay when requesting camera */}
                  {cameraStatus === 'requesting' && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20 p-6 text-center">
                      <Loader2 className="w-9 h-9 animate-spin text-blue-400 mb-3" />
                      <p className="text-base font-semibold">Starting camera...</p>
                      <p className="text-xs text-slate-300 mt-1 max-w-xs">
                        Please allow camera access in your browser prompt to begin scanning
                      </p>
                    </div>
                  )}

                  {/* Active Reticle and Controls */}
                  {cameraStatus === 'active' && (
                    <>
                      {/* Barcode Targeting Guide Frame */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="relative w-4/5 max-w-sm h-36 sm:h-44 rounded-xl border-2 border-blue-500/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
                          {/* Red laser guide line */}
                          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-0.5 bg-red-500/80 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                          <div className="absolute -bottom-7 left-0 right-0 text-center">
                            <span className="text-[11px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full">
                              Align barcode inside box
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
                              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur transition cursor-pointer"
                              aria-label="Toggle flashlight"
                            >
                              {isTorchOn ? <Flashlight className="w-4 h-4 text-amber-400" /> : <FlashlightOff className="w-4 h-4" />}
                            </button>
                          )}
                          {devices.length > 1 && (
                            <button
                              type="button"
                              onClick={handleSwitchCamera}
                              className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur transition cursor-pointer"
                              aria-label="Switch camera"
                            >
                              <SwitchCamera className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Capture button */}
                        <button
                          type="button"
                          onClick={handleManualCapture}
                          disabled={isProcessing}
                          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-md flex items-center gap-1.5"
                        >
                          {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                          <span>Capture</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleStopCamera}
                          className="px-3 py-2 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur transition cursor-pointer"
                        >
                          Stop
                        </button>
                      </div>
                    </>
                  )}
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
                  Drag and drop a photo or screenshot of any barcode, or click the button below to browse your files.
                </p>
                <button
                  type="button"
                  aria-label="Upload barcode image from device"
                  disabled={isProcessing}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition cursor-pointer shadow-sm disabled:opacity-50"
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

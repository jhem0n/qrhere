import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Flashlight,
  FlashlightOff,
  SwitchCamera,
  AlertCircle,
  Loader2,
  ShieldAlert,
  RotateCcw,
  Upload,
} from 'lucide-react';
import { cameraService } from '../../services/camera/camera.service';
import { QRScannerService } from '../../services/qr/scanner.service';
import { QRScanResult, CameraDevice } from '../../types/qr.types';

export type CameraStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'error';

interface CameraScannerProps {
  onScanSuccess: (result: QRScanResult) => void;
  onSwitchToUpload?: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  onScanSuccess,
  onSwitchToUpload,
}) => {
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [error, setError] = useState<string | null>(null);
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

  // Stop camera helper - cleanly releases hardware tracks and cancels scanning loop
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
    setStatus('idle');
  }, []);

  // Ensure camera streams are ALWAYS torn down on unmount or tab backgrounding (Zero Persistence)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        handleStopCamera();
      }
    };

    const handleUnload = () => {
      handleStopCamera();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handleUnload);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handleUnload);
      window.removeEventListener('beforeunload', handleUnload);
      handleStopCamera();
    };
  }, [handleStopCamera]);

  // Frame scanning loop - active only when video is streaming with valid frame dimensions
  const scanLoop = useCallback(() => {
    if (!isScanningRef.current || !videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Decode frame once video has valid frame data loaded
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
      const decoded = QRScannerService.scanVideoFrame(video, canvas);
      if (decoded && decoded.text) {
        // QR Code detected! Release camera and emit result
        handleStopCamera();
        const result = QRScannerService.formatScanResult(decoded.text, 'camera');
        onScanSuccess(result);
        return;
      }
    }

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(scanLoop);
  }, [handleStopCamera, onScanSuccess]);

  // Start camera handler - explicitly called ONLY when the user clicks "Start Camera"
  const handleStartCamera = async (overrideDeviceId?: string) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    setError(null);
    setStatus('requesting');

    try {
      const targetDeviceId = overrideDeviceId || selectedDeviceId || undefined;
      const stream = await cameraService.startCamera({
        deviceId: targetDeviceId,
        facingMode,
      });

      const video = videoRef.current;
      if (!video) {
        throw new Error('Video display element is unavailable. Please refresh and try again.');
      }

      // Connect MediaStream to the video element
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true'); // Required for iOS Safari
      video.muted = true;

      // Wait for playback to begin
      try {
        await video.play();
      } catch (playErr) {
        console.warn('Camera video play warning:', playErr);
      }

      setStatus('active');
      setHasTorch(cameraService.hasTorchCapability());

      // Refresh available camera devices now that permission was granted
      const availableDevices = await cameraService.getAvailableCameras();
      setDevices(availableDevices);

      // Start scanning loop
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
      setStatus(isDenied ? 'denied' : 'error');
    } finally {
      isStartingRef.current = false;
    }
  };

  // Switch facing mode (Front/Back)
  const handleSwitchFacing = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (status === 'active') {
      handleStopCamera();
      setTimeout(() => {
        setFacingMode(nextMode);
        handleStartCamera();
      }, 150);
    }
  };

  // Toggle Torch/Flashlight
  const handleToggleTorch = async () => {
    const targetState = !isTorchOn;
    const ok = await cameraService.setTorch(targetState);
    if (ok) {
      setIsTorchOn(targetState);
    }
  };

  const isStreamingOrRequesting = status === 'active' || status === 'requesting';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden offscreen canvas used strictly for pixel math */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* STATE 1: Camera Inactive / Idle State (Initial Screen before user clicks Start Camera) */}
      {status === 'idle' && (
        <div className="w-full max-w-xl lg:max-w-2xl rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 p-8 sm:p-12 text-center flex flex-col items-center justify-center transition-all">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-5 shadow-sm">
            <Camera className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Camera QR Scanner
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Scan any QR code using your webcam or smartphone camera. All video processing runs
            100% locally in your browser with zero data uploaded.
          </p>

          {/* Privacy Guarantee Badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-200/60 dark:border-emerald-900/40">
            <span>🔒 Privacy protected: Video never leaves your device</span>
          </div>

          <button
            type="button"
            id="start-camera-btn"
            onClick={() => handleStartCamera()}
            className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-700 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer min-h-[48px]"
          >
            <Camera className="w-5 h-5" />
            <span>Start Camera</span>
          </button>
        </div>
      )}

      {/* STATE 2: Camera Permission Denied */}
      {status === 'denied' && (
        <div
          role="alert"
          className="w-full max-w-xl lg:max-w-2xl rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center animate-in fade-in duration-200"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300 mb-4">
            <ShieldAlert className="h-7 w-7" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-rose-900 dark:text-rose-200">
            Camera Permission Denied
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-rose-700 dark:text-rose-300 max-w-md leading-relaxed">
            Camera access was blocked by your browser. To scan QR codes using your camera, please allow camera permissions in your browser or site settings.
          </p>

          <div className="mt-3 p-3 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-rose-200/60 dark:border-rose-900/30 text-left text-xs text-rose-800 dark:text-rose-300 max-w-md">
            <p className="font-semibold mb-1">How to enable camera:</p>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300">
              <li>Click the camera or lock icon in your browser address bar.</li>
              <li>Change the camera permission setting to <strong>Allow</strong>.</li>
              <li>Click the <strong>Try Again</strong> button below.</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="retry-camera-btn"
              onClick={() => handleStartCamera()}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            {onSwitchToUpload && (
              <button
                type="button"
                id="switch-to-upload-btn"
                onClick={onSwitchToUpload}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer min-h-[44px]"
              >
                <Upload className="w-4 h-4" />
                <span>Upload QR Image Instead</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* STATE 3: General Camera Error (No camera, hardware in use, etc.) */}
      {status === 'error' && (
        <div
          role="alert"
          className="w-full max-w-xl lg:max-w-2xl rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center animate-in fade-in duration-200"
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
              id="retry-camera-btn"
              onClick={() => handleStartCamera()}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Camera</span>
            </button>

            {onSwitchToUpload && (
              <button
                type="button"
                id="switch-to-upload-btn"
                onClick={onSwitchToUpload}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer min-h-[44px]"
              >
                <Upload className="w-4 h-4" />
                <span>Upload QR Image Instead</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* STATE 4: Live Viewfinder / Active or Requesting Camera */}
      <div
        className={`w-full max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center ${
          isStreamingOrRequesting ? 'block' : 'hidden'
        }`}
      >
        <div className="relative w-full aspect-4/3 sm:aspect-16/10 max-h-[520px] rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
          {/* Live Video Element (no static autoPlay to avoid eager browser heuristics) */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />

          {/* Loading Overlay when requesting camera or switching */}
          {status === 'requesting' && (
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20 p-6 text-center">
              <Loader2 className="w-9 h-9 animate-spin text-blue-400 mb-3" />
              <p className="text-base font-semibold">Starting camera...</p>
              <p className="text-xs text-slate-300 mt-1 max-w-xs">
                Please allow camera access in your browser prompt to begin scanning
              </p>
            </div>
          )}

          {/* Viewfinder Reticle Overlay & Controls (active when streaming) */}
          {status === 'active' && (
            <>
              {/* Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-2 border-dashed border-white/70 rounded-2xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-xl -mt-1 -ml-1" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-xl -mt-1 -mr-1" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-xl -mb-1 -ml-1" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-xl -mb-1 -mr-1" />

                  {/* Animated Scanning Laser Line */}
                  <div className="absolute left-2 right-2 h-0.5 bg-blue-400 shadow-[0_0_8px_#38bdf8] animate-bounce opacity-85" />
                </div>
              </div>

              {/* Live status badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Scanning live...</span>
              </div>

              {/* In-viewfinder Controls (Torch, Flip) */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                {hasTorch && (
                  <button
                    type="button"
                    onClick={handleToggleTorch}
                    className={`p-2.5 rounded-full backdrop-blur-md transition cursor-pointer ${
                      isTorchOn
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                    aria-label={isTorchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
                    title="Toggle Flashlight"
                  >
                    {isTorchOn ? (
                      <Flashlight className="w-4 h-4" />
                    ) : (
                      <FlashlightOff className="w-4 h-4" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSwitchFacing}
                  className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition cursor-pointer"
                  aria-label="Switch camera direction"
                  title="Switch Camera (Front/Rear)"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom instruction */}
              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="inline-block bg-black/60 backdrop-blur-xs text-white/90 text-xs px-3.5 py-1.5 rounded-full">
                  Align QR code within the frame
                </span>
              </div>
            </>
          )}
        </div>

        {/* Device switcher dropdown if multiple cameras detected */}
        {devices.length > 1 && (
          <div className="w-full mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1">
            <label htmlFor="camera-select" className="font-medium">
              Camera:
            </label>
            <select
              id="camera-select"
              value={selectedDeviceId || ''}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedDeviceId(id);
                handleStartCamera(id);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              {devices.map((device, idx) => (
                <option key={device.deviceId || idx} value={device.deviceId}>
                  {device.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Camera Action Buttons */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            id="stop-camera-btn"
            onClick={handleStopCamera}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs min-h-[44px]"
          >
            <CameraOff className="w-4 h-4" />
            <span>Stop Camera</span>
          </button>
        </div>
      </div>
    </div>
  );
};

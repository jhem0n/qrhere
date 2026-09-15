import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Flashlight,
  FlashlightOff,
  SwitchCamera,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cameraService } from '../../services/camera/camera.service';
import { QRScannerService } from '../../services/qr/scanner.service';
import { QRScanResult, CameraDevice } from '../../types/qr.types';

interface CameraScannerProps {
  onScanSuccess: (result: QRScanResult) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onScanSuccess }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // Stop camera helper - cleanly releases hardware tracks and cancels loop
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
    setIsActive(false);
    setIsLoading(false);
    setIsTorchOn(false);
  }, []);

  // Ensure camera streams are ALWAYS torn down on unmount or tab backgrounding (Zero Camera Persistence)
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

  // Frame scanning loop - active only when video is playing with valid frame dimensions
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

  // Start camera handler - handles permission prompt and video attachment reliably
  const handleStartCamera = async (overrideDeviceId?: string) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    setError(null);
    setIsLoading(true);

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
      video.setAttribute('autoplay', 'true');
      video.muted = true;

      // Wait for playback to begin
      try {
        await video.play();
      } catch (playErr) {
        console.warn('Camera video play warning:', playErr);
      }

      setIsActive(true);
      setIsLoading(false);
      setHasTorch(cameraService.hasTorchCapability());

      // Refresh available camera devices
      const availableDevices = await cameraService.getAvailableCameras();
      setDevices(availableDevices);

      // Start scanning loop
      isScanningRef.current = true;
      animationFrameRef.current = requestAnimationFrame(scanLoop);
    } catch (err: any) {
      handleStopCamera();
      setError(
        err?.message ||
          'Could not start camera. Please ensure camera permission is enabled and try again.'
      );
    } finally {
      setIsLoading(false);
      isStartingRef.current = false;
    }
  };

  // Switch facing mode (Front/Back)
  const handleSwitchFacing = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (isActive) {
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

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden offscreen canvas used strictly for pixel math */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Camera Inactive State: Explicit CTA Card */}
      {!isActive && !isLoading && (
        <div className="w-full max-w-lg rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 p-8 text-center flex flex-col items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-4 shadow-sm">
            <Camera className="h-8 w-8" />
          </div>

          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Camera QR Scanner
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Scan any QR code using your webcam or smartphone camera. All video processing runs
            locally in your browser.
          </p>

          {/* Privacy Note */}
          <div className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            🔒 Privacy protected: Video never leaves your device
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 w-full flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-left text-xs text-red-800 dark:bg-red-950/30 dark:text-red-300 border border-red-200 dark:border-red-900/30"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to access camera</p>
                <p className="mt-0.5">{error}</p>
                <p className="mt-1.5 text-[11px] text-red-700 dark:text-red-400">
                  Tip: If permission was denied, click the camera icon in your browser address bar to allow access, then click Start Camera again.
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            id="start-camera-btn"
            onClick={() => handleStartCamera()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>Start Camera</span>
          </button>
        </div>
      )}

      {/* Viewfinder Container: Always mounted in DOM so videoRef is reliably connected */}
      <div
        className={`w-full max-w-lg flex flex-col items-center ${
          isActive || isLoading ? 'block' : 'hidden'
        }`}
      >
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
          {/* Live Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />

          {/* Loading Overlay when requesting camera or switching */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20 p-6 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-3" />
              <p className="text-sm font-medium">Starting camera...</p>
              <p className="text-xs text-slate-400 mt-1">
                Please allow camera access when prompted by your browser
              </p>
            </div>
          )}

          {/* Viewfinder Reticle Overlay & Controls (active when streaming) */}
          {isActive && !isLoading && (
            <>
              {/* Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-white/60 rounded-2xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-xl -mt-1 -ml-1" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-xl -mt-1 -mr-1" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-xl -mb-1 -ml-1" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-xl -mb-1 -mr-1" />

                  {/* Animated Scanning Laser Line */}
                  <div className="absolute left-2 right-2 h-0.5 bg-blue-400 shadow-[0_0_8px_#38bdf8] animate-bounce opacity-80" />
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
                    className={`p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
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
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition cursor-pointer"
                  aria-label="Switch camera direction"
                  title="Switch Camera (Front/Rear)"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom instruction */}
              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="inline-block bg-black/60 backdrop-blur-xs text-white/90 text-xs px-3 py-1 rounded-full">
                  Align QR code within the frame
                </span>
              </div>
            </>
          )}
        </div>

        {/* Device switcher dropdown if multiple cameras detected */}
        {devices.length > 1 && (
          <div className="w-full mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
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
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
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
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <CameraOff className="w-3.5 h-3.5" />
            <span>Stop Camera</span>
          </button>
        </div>
      </div>
    </div>
  );
};

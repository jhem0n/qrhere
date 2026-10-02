import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { TypeChips } from './TypeChips';
import { PresetStrip } from './PresetStrip';
import { DynamicForm } from './DynamicForm';
import { DesignTabs } from './DesignTabs';
import { PreviewCard } from './PreviewCard';
import { MobileStickyBar } from './MobileStickyBar';
import { PdfModal } from './PdfModal';
import { RecentDesignsModal } from './RecentDesignsModal';
import { QRDesignState, ScannabilityResult } from '../../types/generator.types';
import { getQRType } from '../../data/qrTypes';
import { generateQRMatrix } from '../../lib/qr/matrix';
import { renderSvg } from '../../lib/qr/renderSvg';
import { evaluateScannability, runRealDecodeTest } from '../../lib/qr/checks';
import { STYLE_PRESETS } from '../../lib/qr/presets';
import {
  createDefaultDesignState,
  decodeDesignFromHash,
  saveRecentDesign,
} from '../../lib/state/designStore';

interface MasterGeneratorProps {
  initialTypeId?: string;
}

export const MasterGenerator: React.FC<MasterGeneratorProps> = ({ initialTypeId = 'url' }) => {
  // 1. Initial State Resolution (Hash > InitialType > Default)
  const [state, setState] = useState<QRDesignState>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const decoded = decodeDesignFromHash(window.location.hash);
      if (decoded) return decoded;
    }
    return createDefaultDesignState(initialTypeId);
  });

  // Keep type synchronized if route props change
  useEffect(() => {
    if (initialTypeId && state.type !== initialTypeId) {
      const nextType = getQRType(initialTypeId);
      setState((prev) => ({
        ...prev,
        type: initialTypeId,
        fields: { ...nextType.defaultValues },
      }));
    }
  }, [initialTypeId]);

  // 2. Undo / Redo History Stack
  const [history, setHistory] = useState<QRDesignState[]>([state]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushState = useCallback((newState: QRDesignState) => {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex((prev) => prev + 1);
    setState(newState);
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setState(history[newIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setState(history[newIdx]);
    }
  };

  // Keyboard shortcut listener for Ctrl+Z / Ctrl+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Partial State Updater
  const handleStateChange = (updates: Partial<QRDesignState>) => {
    const next = { ...state, ...updates };
    pushState(next);
  };

  const handleFieldsChange = (newFields: Record<string, any>) => {
    const next = { ...state, fields: newFields };
    pushState(next);
  };

  // 3. Payload and Matrix Calculation
  const currentTypeDef = useMemo(() => getQRType(state.type), [state.type]);
  const rawPayload = useMemo(() => currentTypeDef.buildPayload(state.fields), [currentTypeDef, state.fields]);

  const matrix = useMemo(() => {
    try {
      return generateQRMatrix(rawPayload, state.ecc);
    } catch {
      return generateQRMatrix('https://qrhere.online', state.ecc);
    }
  }, [rawPayload, state.ecc]);

  // 4. SVG Rendering
  const rendered = useMemo(() => {
    return renderSvg(matrix, state);
  }, [matrix, state]);

  // 5. Scannability Analysis & Optical Decode Verification
  const baseScannability = useMemo(() => {
    return evaluateScannability(state, matrix);
  }, [state, matrix]);

  const [decodedState, setDecodedState] = useState<{
    decodedSuccessfully: boolean | null;
    decodedText?: string;
    decodeError?: string;
  }>({
    decodedSuccessfully: null,
  });

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      const res = await runRealDecodeTest(rendered.svgString);
      if (active) {
        setDecodedState({
          decodedSuccessfully: res.success,
          decodedText: res.decodedText,
          decodeError: res.error,
        });
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [rendered.svgString]);

  const fullScannability: ScannabilityResult = useMemo(() => ({
    ...baseScannability,
    decodedSuccessfully: decodedState.decodedSuccessfully,
    decodedText: decodedState.decodedText,
    decodeError: decodedState.decodeError,
  }), [baseScannability, decodedState]);

  // Auto-save to recent designs (debounced 3s)
  const saveTimeoutRef = useRef<any>(null);
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveRecentDesign(state, rendered.svgString);
    }, 3000);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [state, rendered.svgString]);

  // One-click Preset Handler
  const handleApplyPreset = (presetId: string) => {
    const found = STYLE_PRESETS.find((p) => p.id === presetId);
    if (!found) return;

    const next: QRDesignState = {
      ...state,
      fg: found.colors.fg,
      bg: found.colors.bg,
      gradient: found.colors.gradient || { on: false, from: found.colors.fg, to: found.colors.fg, angle: 45, kind: 'linear' },
      body: found.style.body,
      eyeOuter: found.style.eyeOuter,
      eyeInner: found.style.eyeInner,
      frame: {
        ...state.frame,
        id: found.frameId || state.frame.id,
        color: found.frameColor || found.colors.fg,
      },
    };
    pushState(next);
  };

  // "Fix it for me" Actions
  const handleFixIssue = (action: string) => {
    switch (action) {
      case 'fix-contrast':
        handleStateChange({
          fg: '#000000',
          bg: '#ffffff',
          transparent: false,
          gradient: { ...state.gradient, on: false },
        });
        break;
      case 'swap-colors':
        handleStateChange({
          fg: state.bg,
          bg: state.fg,
          gradient: { ...state.gradient, on: false },
        });
        break;
      case 'raise-ecc-h':
        handleStateChange({ ecc: 'H' });
        break;
      case 'reduce-logo-size':
        handleStateChange({
          logo: { ...state.logo, size: 20 },
          ecc: 'H',
        });
        break;
      case 'set-margin-3':
        handleStateChange({ margin: 3 });
        break;
      default:
        break;
    }
  };

  const handleResetDesign = () => {
    if (confirm('Reset custom styling to defaults?')) {
      const reset = createDefaultDesignState(state.type);
      pushState(reset);
    }
  };

  // Modals state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Preview scroll target for mobile
  const previewRef = useRef<HTMLDivElement>(null);
  const handleScrollToPreview = () => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* 1. Horizontal Type Selector Chips */}
      <TypeChips
        currentType={state.type}
        onSelectType={(newType) => {
          if (newType !== state.type) {
            const nextDef = getQRType(newType);
            handleStateChange({
              type: newType,
              fields: { ...nextDef.defaultValues },
            });
          }
        }}
      />

      {/* 2. One-click Quick Presets & Utilities Toolbar */}
      <PresetStrip
        state={state}
        onApplyPreset={handleApplyPreset}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleResetDesign}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* 3. Main Generator Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form & Design Studio Tabs */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6">
          <DynamicForm
            typeDef={currentTypeDef}
            values={state.fields}
            onChange={handleFieldsChange}
            rawPayload={rawPayload}
          />

          <DesignTabs state={state} onChange={handleStateChange} />
        </div>

        {/* Right Column: Live Vector Preview Card (Sticky on desktop) */}
        <div ref={previewRef} className="lg:col-span-5 xl:col-span-5">
          <PreviewCard
            svgString={rendered.svgString}
            rawPayload={rawPayload}
            state={state}
            scannability={fullScannability}
            onFixIssue={handleFixIssue}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Sticky Bar with Live Thumbnail & Quick Download */}
      <MobileStickyBar
        svgString={rendered.svgString}
        scannability={fullScannability}
        onDownload={() => {
          const btn = document.querySelector('button:has-text("Download PNG")') as HTMLElement;
          if (btn) btn.click();
        }}
        onScrollToPreview={handleScrollToPreview}
      />

      {/* Modals */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        svgString={rendered.svgString}
        defaultLabel={state.frame.text || currentTypeDef.name}
      />

      <RecentDesignsModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onRestoreDesign={(restored) => pushState(restored)}
      />
    </div>
  );
};

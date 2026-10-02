import { QRDesignState } from '../../types/generator.types';
import { getQRType } from '../../data/qrTypes';

export function createDefaultDesignState(typeId = 'url'): QRDesignState {
  const typeDef = getQRType(typeId);
  return {
    type: typeId,
    fields: { ...typeDef.defaultValues },
    fg: '#000000',
    bg: '#ffffff',
    transparent: false,
    gradient: {
      on: false,
      from: '#1F5BFF',
      to: '#7A3CFF',
      angle: 45,
      kind: 'linear',
    },
    body: 'square',
    eyeOuter: 'square',
    eyeInner: 'square',
    eyeColors: {
      on: false,
      outer: '#000000',
      inner: '#000000',
    },
    logo: {
      src: null,
      preset: null,
      size: 22,
      knockout: true,
      mask: 'round',
    },
    bgImage: null,
    frame: {
      id: 'none',
      text: 'SCAN ME',
      textColor: '#ffffff',
      color: '#1F5BFF',
      fontWeight: '700',
    },
    size: 1024,
    margin: 2,
    ecc: 'M',
  };
}

const STORAGE_KEY_RECENT = 'qrhere_recent_designs_v2';

export interface SavedDesignRecord {
  id: string;
  name: string;
  date: string;
  thumbnailSvg?: string;
  state: QRDesignState;
}

export function saveRecentDesign(state: QRDesignState, thumbnailSvg?: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT);
    let list: SavedDesignRecord[] = raw ? JSON.parse(raw) : [];

    const newRecord: SavedDesignRecord = {
      id: 'des-' + Date.now(),
      name: `${getQRType(state.type).name} (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      date: new Date().toLocaleDateString(),
      thumbnailSvg,
      state,
    };

    // Filter out identical or keep max 10
    list = [newRecord, ...list.slice(0, 9)];
    localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save design to localStorage:', err);
  }
}

export function getRecentDesigns(): SavedDesignRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearRecentDesigns(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_RECENT);
  } catch {}
}

export function encodeDesignToHash(state: QRDesignState): string {
  try {
    const json = JSON.stringify(state);
    return btoa(encodeURIComponent(json));
  } catch {
    return '';
  }
}

export function decodeDesignFromHash(hashString: string): QRDesignState | null {
  try {
    if (!hashString) return null;
    const clean = hashString.replace(/^#d=|^#/, '');
    const json = decodeURIComponent(atob(clean));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

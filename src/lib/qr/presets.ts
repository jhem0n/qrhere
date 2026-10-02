import { QRDesignState } from '../../types/generator.types';

export interface StylePreset {
  id: string;
  name: string;
  badge?: string;
  colors: {
    fg: string;
    bg: string;
    gradient?: { on: boolean; from: string; to: string; angle: number; kind: 'linear' | 'radial' };
  };
  style: {
    body: QRDesignState['body'];
    eyeOuter: QRDesignState['eyeOuter'];
    eyeInner: QRDesignState['eyeInner'];
  };
  frameId?: string;
  frameColor?: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'classic',
    name: 'Classic Black',
    colors: {
      fg: '#000000',
      bg: '#ffffff',
      gradient: { on: false, from: '#000000', to: '#000000', angle: 45, kind: 'linear' },
    },
    style: {
      body: 'square',
      eyeOuter: 'square',
      eyeInner: 'square',
    },
    frameId: 'none',
  },
  {
    id: 'brand',
    name: 'Brand Blue',
    badge: 'Popular',
    colors: {
      fg: '#1F5BFF',
      bg: '#ffffff',
      gradient: { on: true, from: '#1F5BFF', to: '#1648D6', angle: 45, kind: 'linear' },
    },
    style: {
      body: 'rounded',
      eyeOuter: 'rounded',
      eyeInner: 'circle',
    },
    frameId: 'bottom-banner',
    frameColor: '#1F5BFF',
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      fg: '#0284c7',
      bg: '#f0f9ff',
      gradient: { on: true, from: '#0284c7', to: '#0d9488', angle: 135, kind: 'linear' },
    },
    style: {
      body: 'dots',
      eyeOuter: 'circle',
      eyeInner: 'circle',
    },
    frameId: 'pill',
    frameColor: '#0284c7',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      fg: '#e11d48',
      bg: '#fff1f2',
      gradient: { on: true, from: '#e11d48', to: '#f97316', angle: 45, kind: 'linear' },
    },
    style: {
      body: 'classy',
      eyeOuter: 'leaf',
      eyeInner: 'diamond',
    },
    frameId: 'gradient-border',
    frameColor: '#e11d48',
  },
  {
    id: 'neon',
    name: 'Neon Cyber',
    colors: {
      fg: '#06b6d4',
      bg: '#090d16',
      gradient: { on: true, from: '#06b6d4', to: '#a855f7', angle: 90, kind: 'linear' },
    },
    style: {
      body: 'extra-rounded',
      eyeOuter: 'circle',
      eyeInner: 'star',
    },
    frameId: 'phone-badge',
    frameColor: '#06b6d4',
  },
  {
    id: 'forest',
    name: 'Forest Emerald',
    colors: {
      fg: '#059669',
      bg: '#f0fdf4',
      gradient: { on: true, from: '#059669', to: '#15803d', angle: 45, kind: 'linear' },
    },
    style: {
      body: 'rounded',
      eyeOuter: 'leaf',
      eyeInner: 'circle',
    },
    frameId: 'bottom-banner',
    frameColor: '#059669',
  },
  {
    id: 'mono',
    name: 'Modern Slate',
    colors: {
      fg: '#334155',
      bg: '#f8fafc',
      gradient: { on: false, from: '#334155', to: '#334155', angle: 45, kind: 'linear' },
    },
    style: {
      body: 'diamond',
      eyeOuter: 'square',
      eyeInner: 'diamond',
    },
    frameId: 'card-shadow',
    frameColor: '#334155',
  },
  {
    id: 'rounded-pro',
    name: 'Soft Rounded',
    badge: 'Modern',
    colors: {
      fg: '#4f46e5',
      bg: '#ffffff',
      gradient: { on: true, from: '#4f46e5', to: '#7c3aed', angle: 135, kind: 'linear' },
    },
    style: {
      body: 'extra-rounded',
      eyeOuter: 'rounded',
      eyeInner: 'flower',
    },
    frameId: 'pill',
    frameColor: '#4f46e5',
  },
];

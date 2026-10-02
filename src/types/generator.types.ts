export type QRBodyShape =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'diamond'
  | 'extra-rounded'
  | 'vertical'
  | 'horizontal'
  | 'small-squares';

export type QREyeOuterShape = 'square' | 'rounded' | 'circle' | 'leaf' | 'dotted';

export type QREyeInnerShape = 'square' | 'circle' | 'star' | 'diamond' | 'heart' | 'flower';

export type QREccLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRGradient {
  on: boolean;
  from: string;
  to: string;
  angle: number;
  kind: 'linear' | 'radial';
}

export interface QREyeColors {
  on: boolean;
  outer: string;
  inner: string;
}

export interface QRLogoConfig {
  src: string | null;
  preset: string | null;
  size: number; // 10 to 30 %
  knockout: boolean;
  mask: 'round' | 'square';
}

export interface QRFrameConfig {
  id: string; // 'none' | 'bottom-banner' | 'top-banner' | 'pill' | ...
  text: string;
  textColor: string;
  color: string;
  fontWeight?: string;
  icon?: string;
}

export interface QRDesignState {
  type: string;
  fields: Record<string, any>;
  fg: string;
  bg: string;
  transparent: boolean;
  gradient: QRGradient;
  body: QRBodyShape;
  eyeOuter: QREyeOuterShape;
  eyeInner: QREyeInnerShape;
  eyeColors: QREyeColors;
  logo: QRLogoConfig;
  bgImage: { src: string | null; opacity: number } | null;
  frame: QRFrameConfig;
  size: number;
  margin: number;
  ecc: QREccLevel;
}

export interface ScannabilityResult {
  score: 'excellent' | 'good' | 'risky' | 'fail';
  scoreLabel: string;
  contrastRatio: number;
  isContrastSufficient: boolean;
  isInverted: boolean;
  logoCoveragePercent: number;
  isLogoTooLarge: boolean;
  isLogoBlocked: boolean;
  isEccSufficientForLogo: boolean;
  isDense: boolean;
  hasEnoughQuietZone: boolean;
  decodedSuccessfully: boolean | null; // null if pending
  decodedText?: string;
  decodeError?: string;
  issues: {
    id: string;
    level: 'error' | 'warning' | 'info';
    message: string;
    canFix: boolean;
    fixAction?: string;
  }[];
}

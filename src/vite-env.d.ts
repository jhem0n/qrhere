/// <reference types="vite/client" />

declare module 'bwip-js' {
  export function toSVG(options: {
    bcid: string;
    text: string;
    scale?: number;
    height?: number;
    includetext?: boolean;
    textxalign?: string;
    barcolor?: string;
    backgroundcolor?: string;
    paddingwidth?: number;
    paddingheight?: number;
    [key: string]: any;
  }): string;
  export function toCanvas(canvas: any, options: any): void;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

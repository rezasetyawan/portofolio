/// <reference types="astro/client" />

declare module "ascii-magic-art/pieces/campfire-under-stars.js" {
  export interface AsciiFrame {
    text: string;
    color: string;
    palette?: Record<string, string>;
  }
  export const meta: {
    slug: string;
    name: string;
    category: string;
    note: string;
    tags: string[];
    cols: number;
    rows: number;
    fps: number;
    palette: Record<string, string>;
  };
  export default function create(): (t: number) => string | AsciiFrame;
}

declare module "ascii-magic-art/runtime/player.js" {
  export function frameText(frame: string | { text: string }): string;
  export function play(
    pre: HTMLElement,
    mod: { meta: Record<string, unknown>; default: () => (t: number) => unknown },
    opts?: {
      speed?: number;
      still?: boolean;
      dom?: boolean;
      t0?: number;
      maxFps?: number;
    }
  ): () => void;
}

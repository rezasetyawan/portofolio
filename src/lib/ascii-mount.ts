import { play } from "ascii-magic-art/runtime/player.js";

export interface AsciiModule {
  meta: Record<string, unknown>;
  default: () => (t: number) => unknown;
}

export function mountAsciiPiece(root: HTMLElement, mod: AsciiModule) {
  const stage = root.querySelector<HTMLElement>("[data-ascii-stage]");
  const pre = root.querySelector<HTMLElement>("[data-ascii-pre]");
  const toggleBtn = root.querySelector<HTMLButtonElement>("[data-ascii-toggle]");
  if (!stage || !pre) return;

  const speed = parseFloat(root.dataset.asciiSpeed || "1") || 1;
  const pauseLabel = root.dataset.pauseLabel || "[ pause ]";
  const resumeLabel = root.dataset.resumeLabel || "[ wake ]";
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const syncFontSize = () => {
    const avail = stage.clientWidth;
    if (avail <= 0) return;
    pre.style.fontSize = "8px";
    const measured = pre.scrollWidth;
    if (measured > 0) {
      const px = Math.floor(((avail / measured) * 8) * 2) / 2;
      pre.style.fontSize = `${Math.max(3.5, px)}px`;
    }
  };

  syncFontSize();

  let paused = prefersReduced;
  let stop: (() => void) | null = null;

  const syncButton = () => {
    if (!toggleBtn) return;
    toggleBtn.setAttribute("aria-pressed", String(paused));
    toggleBtn.textContent = paused ? resumeLabel : pauseLabel;
  };

  const startPlayer = () => {
    stop?.();
    stop = play(pre, mod, { dom: true, speed, still: paused });
    syncButton();
  };

  startPlayer();

  if (typeof ResizeObserver !== "undefined") {
    let lastWidth = stage.clientWidth;
    const ro = new ResizeObserver(() => {
      const nextWidth = stage.clientWidth;
      if (nextWidth === lastWidth) return;
      lastWidth = nextWidth;
      syncFontSize();
    });
    ro.observe(stage);
  }

  toggleBtn?.addEventListener("click", () => {
    paused = !paused;
    startPlayer();
  });
}

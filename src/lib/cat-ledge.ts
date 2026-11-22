import { Grid, palette, KEYS, clamp } from "ascii-magic-art/lib/kit.js";

const P = [
  "#383842", // 0: ledge dim
  "#5a5a66", // 1: ledge tuft
  "#d98234", // 2: ginger dark
  "#f4b462", // 3: ginger fur
  "#a8b4cc", // 4: silver-grey fur
  "#e4e4e7", // 5: white/tuxedo fur
  "#ff9a2a", // 6: eye / fish treat / yarn
  "#ffe6a8", // 7: sleepy z / heart / calico
];

export const meta = {
  slug: "cat-ledge",
  name: "Camp Cats",
  category: "animals",
  note: "Six interactive ASCII cats walking, sleeping, and playing along the bottom of the page.",
  cols: 100,
  rows: 6,
  fps: 16,
  palette: palette(P),
};

const WALK_RIGHT = [
  ["~     /\\_/\\ ", " \\___( o.o)", " / \\   / \\ "],
  [" ~    /\\_/\\ ", " \\___( o.o)", "  / |  | \\ "],
];

const WALK_LEFT = [
  [" /\\_/\\     ~", "(o.o )___/ ", " / \\   / \\ "],
  [" /\\_/\\    ~ ", "(o.o )___/ ", "  / |  | \\ "],
];

const HAPPY_RIGHT = [
  ["~     /\\_/\\ ", " \\___( ^.^)", " / \\   / \\ "],
  [" ~    /\\_/\\ ", " \\___( ^.^)", "  / |  | \\ "],
];

const HAPPY_LEFT = [
  [" /\\_/\\     ~", "(^.^ )___/ ", " / \\   / \\ "],
  [" /\\_/\\    ~ ", "(^.^ )___/ ", "  / |  | \\ "],
];

const SLEEP_CAT = [
  [" /\\_/\\   ", " (-.- )  ", " (░▒░)~~ "],
  [" /\\_/\\   ", " (-.- )  ", " (░▒░)~_ "],
  [" /\\_/\\   ", " (-.- ) ~", " (░▒░)~/ "],
];

const KITTEN_SLEEP = [
  [" /\\_/\\ ", " (-.-) ", " (░░)~ "],
  [" /\\_/\\ ", " (-.-) ", " (░░)_ "],
];

const SIT_CAT = [
  ["  /\\_/\\ ", " ( o.o )", "~~(░▒░) "],
  ["  /\\_/\\ ", " ( o.o )", "~_(░▒░) "],
];

const SIT_BLINK = [
  ["  /\\_/\\ ", " ( -.- )", "~~(░▒░) "],
  ["  /\\_/\\ ", " ( -.- )", "~_(░▒░) "],
];

const SIT_HAPPY = [
  ["  /\\_/\\ ", " ( ^.^ )", "~~(░▒░) "],
  ["  /\\_/\\ ", " ( ^.^ )", "~_(░▒░) "],
];

interface CatWalker {
  x: number;
  dir: 1 | -1;
  speed: number;
  furKey: string;
  eatingUntil: number;
  happyUntil: number;
}

interface Treat {
  x: number;
  eatenAt: number | null;
  expiresAt: number;
}

const state = {
  lastT: 0,
  treats: [] as Treat[],
  yarn: null as { x: number; vx: number; expiresAt: number } | null,
  walkers: [
    { x: 24, dir: 1, speed: 6.5, furKey: KEYS[3], eatingUntil: 0, happyUntil: 0 },
    { x: 52, dir: -1, speed: 5.2, furKey: KEYS[5], eatingUntil: 0, happyUntil: 0 },
    { x: 70, dir: -1, speed: 7.4, furKey: KEYS[2], eatingUntil: 0, happyUntil: 0 },
  ] as CatWalker[],
};

export function dropTreat(x?: number) {
  const pos = clamp(Math.round(x ?? 26 + Math.random() * 48), 24, 78);
  state.treats.push({
    x: pos,
    eatenAt: null,
    expiresAt: state.lastT + 14,
  });
  if (state.treats.length > 5) state.treats.shift();
}

export function tossYarn(x?: number) {
  const startX = clamp(Math.round(x ?? 50), 25, 75);
  const dir = Math.random() > 0.5 ? 1 : -1;
  state.yarn = {
    x: startX,
    vx: dir * 16,
    expiresAt: state.lastT + 10,
  };
}

function drawCat(
  g: Grid,
  x0: number,
  y0: number,
  sprite: string[],
  bodyKey: string,
  eyeKey: string
) {
  for (let dy = 0; dy < sprite.length; dy++) {
    const row = sprite[dy];
    for (let dx = 0; dx < row.length; dx++) {
      const ch = row[dx];
      if (ch === " ") continue;
      const isEye = dy === 1 && (ch === "o" || ch === "-" || ch === "^");
      g.set(x0 + dx, y0 + dy, ch, isEye ? eyeKey : bodyKey);
    }
  }
}

export default function create() {
  const { cols, rows } = meta;
  const g = new Grid(cols, rows);
  const K_DIM = KEYS[0];
  const K_LEDGE = KEYS[1];
  const K_GINGER = KEYS[3];
  const K_SILVER = KEYS[4];
  const K_EYE = KEYS[6];
  const K_CREAM = KEYS[7];

  return (t: number) => {
    const dt = state.lastT > 0 ? Math.min(0.1, Math.max(0, t - state.lastT)) : 0;
    state.lastT = t;
    g.clear();

    // Grass / stone bottom ledge
    for (let x = 0; x < cols; x++) {
      const tuft = x % 7 === 0 ? "," : x % 11 === 0 ? "." : "─";
      g.set(x, rows - 1, tuft, tuft === "─" ? K_DIM : K_LEDGE);
    }

    // Expire old treats and yarn
    state.treats = state.treats.filter((tr) => t <= tr.expiresAt);
    if (state.yarn && t > state.yarn.expiresAt) state.yarn = null;

    // Yarn physics
    if (state.yarn) {
      state.yarn.x += state.yarn.vx * dt;
      if (state.yarn.x <= 24) {
        state.yarn.x = 24;
        state.yarn.vx = Math.abs(state.yarn.vx);
      } else if (state.yarn.x >= 80) {
        state.yarn.x = 80;
        state.yarn.vx = -Math.abs(state.yarn.vx);
      }
      const bounceY = Math.abs(Math.sin(t * 7)) > 0.55 ? 3 : 4;
      g.set(Math.round(state.yarn.x), bounceY, "●", K_EYE);
    }

    // Draw uneaten fish treats
    for (const tr of state.treats) {
      if (tr.eatenAt === null) {
        g.text(tr.x - 1, 4, "><>", K_EYE);
      }
    }

    const fedRecently = state.treats.some((tr) => tr.eatenAt !== null);

    // 1) Sleeping silver tabby on the far left (x=2..10)
    const wag1 = Math.floor(t * 2) % SLEEP_CAT.length;
    drawCat(g, 2, 2, SLEEP_CAT[wag1], K_SILVER, K_CREAM);
    const zLife1 = (t * 0.4) % 1;
    g.set(
      Math.round(7 + zLife1 * 2),
      Math.round(1.5 - zLife1 * 1.5),
      fedRecently ? "♥" : zLife1 > 0.5 ? "Z" : "z",
      fedRecently ? K_EYE : K_CREAM
    );

    // 2) Sleeping cream kitten curled beside it (x=12..18)
    const wagK = Math.floor(t * 1.5 + 1) % KITTEN_SLEEP.length;
    drawCat(g, 12, 2, KITTEN_SLEEP[wagK], K_CREAM, K_EYE);
    const zLife2 = ((t * 0.35) + 0.5) % 1;
    g.set(
      Math.round(15 + zLife2 * 1.5),
      Math.round(1.5 - zLife2 * 1.2),
      fedRecently ? "♥" : "z",
      fedRecently ? K_EYE : K_CREAM
    );

    // 3-5) Three patrolling / playing / eating cats (x=22..72)
    for (const w of state.walkers) {
      let nearestTreat: Treat | null = null;
      let nearestDist = Infinity;
      for (const tr of state.treats) {
        if (tr.eatenAt !== null) continue;
        const d = Math.abs(tr.x - 6 - w.x);
        if (d < nearestDist) {
          nearestDist = d;
          nearestTreat = tr;
        }
      }

      let targetX: number | null = null;
      let speedMult = 1;
      if (nearestTreat) {
        targetX = nearestTreat.x - 6;
        speedMult = 1.8;
      } else if (state.yarn) {
        targetX = state.yarn.x - 6;
        speedMult = 2.0;
      }

      if (t < w.eatingUntil) {
        // Munching in place
      } else if (targetX !== null) {
        const diff = targetX - w.x;
        if (Math.abs(diff) <= 2) {
          if (nearestTreat && nearestTreat.eatenAt === null) {
            nearestTreat.eatenAt = t;
            nearestTreat.expiresAt = t + 3;
            w.eatingUntil = t + 2.2;
            w.happyUntil = t + 3.2;
          } else if (state.yarn) {
            state.yarn.vx = (w.dir || 1) * 18;
            w.happyUntil = t + 1.5;
          }
        } else {
          w.dir = diff > 0 ? 1 : -1;
          w.x = clamp(w.x + w.dir * w.speed * speedMult * dt, 22, 72);
        }
      } else {
        w.x += w.dir * w.speed * dt;
        if (w.x <= 22) {
          w.x = 22;
          w.dir = 1;
        } else if (w.x >= 72) {
          w.x = 72;
          w.dir = -1;
        }
      }

      const cx = Math.round(w.x);
      const step = Math.floor(t * (5 * speedMult)) % 2;
      const isHappy = t < w.happyUntil || t < w.eatingUntil;
      const sprites = isHappy
        ? w.dir > 0
          ? HAPPY_RIGHT
          : HAPPY_LEFT
        : w.dir > 0
          ? WALK_RIGHT
          : WALK_LEFT;
      const hopY = state.yarn && Math.abs(state.yarn.x - (cx + 6)) < 6 ? 1 : 2;
      drawCat(g, cx, hopY, sprites[step], w.furKey, K_EYE);
      if (t < w.eatingUntil) {
        g.text(cx + 3, 1, "nom", K_CREAM);
      } else if (t < w.happyUntil) {
        g.set(cx + 5, 1, "♥", K_EYE);
      }
    }

    // 6) Sitting cat on the far right (x=88..95)
    const blink = (t % 3.8) > 3.55;
    const wag2 = Math.floor(t * 1.8) % 2;
    const sitSprite = state.yarn || fedRecently ? SIT_HAPPY : blink ? SIT_BLINK : SIT_CAT;
    drawCat(g, 88, 2, sitSprite[wag2], K_GINGER, K_EYE);

    return g.frame();
  };
}

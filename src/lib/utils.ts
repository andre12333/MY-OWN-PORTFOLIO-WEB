export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Lighten a hex color by `amount` (0–1). Returns hex. */
export function lightenColor(hex: string, amount: number): string {
  const c = hex.replace("#", "");
  const r = Math.min(255, parseInt(c.substring(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(c.substring(2, 4), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(c.substring(4, 6), 16) + Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

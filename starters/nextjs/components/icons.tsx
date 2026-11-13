// One icon set, one stroke weight. Decorative icons are aria-hidden; buttons that are only an icon get an aria-label.
type P = { d: string; className?: string };
export function Icon({ d, className = "icon" }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
export const CHECK = "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM8 12l3 3 5-6";
export const CHEVRON = "m6 9 6 6 6-6";
export const ARROW = "m9 6 6 6-6 6";
export const GLOBE = "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18";

export function Logo() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2" y="11" width="4" height="7" rx="1" fill="currentColor" opacity=".35" />
      <rect x="8" y="6" width="4" height="12" rx="1" fill="currentColor" opacity=".65" />
      <rect x="14" y="2" width="4" height="16" rx="1" fill="var(--action)" />
    </svg>
  );
}

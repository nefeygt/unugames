/** Minimal inline icons (stroke = currentColor). Decorative: always aria-hidden. */
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const ArrowUpRightIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDownIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const ArrowLeftIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const MenuIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronLeftIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const ChevronRightIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const PauseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M9 5v14M15 5v14" />
  </svg>
);

export const PlayIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 5v14l12-7Z" />
  </svg>
);

/** LinkedIn "in" glyph, simplified (filled). */
export const LinkedInIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
    <path d="M6.5 8.75h-3v11.5h3zM5 3.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM20.5 13.3c0-3.05-1.63-4.8-4.1-4.8-1.45 0-2.4.75-2.85 1.5v-1.25h-3v11.5h3v-6.2c0-1.45.7-2.4 1.95-2.4 1.15 0 1.95.8 1.95 2.4v6.2h3.05z" />
  </svg>
);

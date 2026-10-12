import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Colors point at the CSS variables in app/globals.css, so the palette lives in
 * one place. Contrast ratios for every text/background pair are listed there.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1160px" },
    },
    extend: {
      colors: {
        warm: "var(--bg-warm)",
        sky: "var(--bg-sky)",
        aqua: "var(--bg-aqua)",
        mist: "var(--bg-mist)",
        silver: "var(--bg-silver)",
        line: "var(--line)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        teal: {
          DEFAULT: "var(--teal)",
          hover: "var(--teal-hover)",
          soft: "var(--teal-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
        glow: "var(--inner-glow)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--body)",
            "--tw-prose-headings": "var(--ink)",
            "--tw-prose-links": "var(--teal)",
            "--tw-prose-bold": "var(--ink)",
            "--tw-prose-bullets": "var(--muted)",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;

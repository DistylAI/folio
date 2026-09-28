import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";
import tailwindcssAnimate from "tailwindcss-animate";

// Tailwind v3 config for the Folio tokens in content/folio-tokens.css.
// The utility names are the same as the semantic names in the toolkit-ui
// tokens preset (shared/ui/tailwind.tokens.preset.ts, toolkit@df5dfcda89), so
// a class means the same thing in Folio and in toolkit-ui. The legacy --dtk-*
// color scales are not included. Each utility reads a canonical --color-*
// token; color-mix keeps opacity modifiers (bg-inverse/50) working on hex
// tokens.
function token(name: string) {
  return `color-mix(in srgb, var(--color-${name}) calc(<alpha-value> * 100%), transparent)`;
}

export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  // Toast and alert pages build some status classes from strings at runtime,
  // so the scanner cannot see every class.
  safelist: [
    {
      pattern: /^(bg|text|border)-(destructive|success|warning|info)$/,
    },
  ],
  theme: {
    // Replace the Tailwind palette so raw palette classes (text-gray-500) do
    // not exist.
    colors: {
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      accentColor: {
        primary: token("background-primary"),
      },
      backgroundColor: {
        accent: token("background-accent"),
        "accent-foreground": token("text-default"),
        background: token("background-default"),
        border: token("border-default"),
        card: token("background-default"),
        destructive: token("feedback-danger"),
        "destructive-foreground": token("text-inverse"),
        "destructive-subtle": token("background-danger"),
        foreground: token("text-default"),
        info: token("feedback-info"),
        "info-foreground": token("text-inverse"),
        "info-subtle": token("background-info"),
        input: token("border-default"),
        inverse: token("background-inverse"),
        muted: token("background-subtle"),
        "muted-foreground": token("text-subtle"),
        popover: token("background-default"),
        primary: token("background-primary"),
        "primary-foreground": token("text-inverse"),
        "primary-subtle": token("background-primary-subtle"),
        secondary: token("background-secondary"),
        sidebar: token("background-subtle"),
        "sidebar-accent": token("background-secondary"),
        "sidebar-border": token("border-default"),
        "sidebar-foreground": token("text-default"),
        "sidebar-primary": token("background-inverse"),
        success: token("feedback-success"),
        "success-foreground": token("text-inverse"),
        "success-subtle": token("background-success"),
        warning: token("feedback-warning"),
        "warning-foreground": token("text-inverse"),
        "warning-subtle": token("background-warning"),
      },
      borderColor: {
        DEFAULT: token("border-default"),
        background: token("background-default"),
        border: token("border-default"),
        "border-strong": token("border-strong"),
        "border-subtle": token("border-subtle"),
        destructive: token("border-danger"),
        foreground: token("text-default"),
        info: token("border-info"),
        input: token("border-default"),
        muted: token("background-subtle"),
        "muted-foreground": token("text-subtle"),
        primary: token("border-primary"),
        "primary-foreground": token("text-inverse"),
        ring: token("border-primary"),
        secondary: token("background-secondary"),
        "sidebar-border": token("border-default"),
        success: token("border-success"),
        warning: token("border-warning"),
      },
      boxShadowColor: {
        primary: token("border-primary"),
      },
      divideColor: {
        border: token("border-default"),
        info: token("feedback-info"),
      },
      fill: {
        foreground: token("text-default"),
        muted: token("background-subtle"),
        "muted-foreground": token("text-subtle"),
        primary: token("background-primary"),
      },
      gradientColorStops: {
        background: token("background-default"),
        muted: token("background-subtle"),
        primary: token("background-primary"),
      },
      outlineColor: {
        ring: token("border-primary"),
      },
      ringColor: {
        DEFAULT: token("border-primary"),
        background: token("background-default"),
        border: token("border-default"),
        destructive: token("border-danger"),
        foreground: token("text-default"),
        primary: token("border-primary"),
        ring: token("border-primary"),
        "sidebar-ring": token("border-primary"),
        warning: token("feedback-warning"),
      },
      ringOffsetColor: {
        background: token("background-default"),
        card: token("background-default"),
      },
      stroke: {
        border: token("border-default"),
      },
      textColor: {
        "accent-foreground": token("text-default"),
        background: token("background-default"),
        border: token("border-default"),
        "card-foreground": token("text-default"),
        destructive: token("text-danger"),
        "destructive-foreground": token("text-inverse"),
        disabled: token("text-disabled"),
        foreground: token("text-default"),
        info: token("text-info"),
        "info-foreground": token("text-inverse"),
        input: token("border-default"),
        inverse: token("text-inverse"),
        "muted-foreground": token("text-subtle"),
        "popover-foreground": token("text-default"),
        primary: token("text-primary"),
        "primary-foreground": token("text-inverse"),
        "secondary-foreground": token("text-default"),
        "sidebar-accent-foreground": token("text-default"),
        "sidebar-foreground": token("text-default"),
        "sidebar-primary-foreground": token("text-inverse"),
        success: token("text-success"),
        "success-foreground": token("text-inverse"),
        warning: token("text-warning"),
        "warning-foreground": token("text-inverse"),
      },
      textDecorationColor: {
        border: token("border-default"),
        info: token("feedback-info"),
      },
      borderRadius: {
        lg: "var(--radius-md)",
        md: "calc(var(--radius-md) - 2px)",
        sm: "calc(var(--radius-md) - 4px)",
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-collapsible-content-height)", opacity: "1" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        "collapsible-up": "collapsible-up 160ms cubic-bezier(0.16, 1, 0.3, 1)",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  // Same plugins as toolkit-ui, so the animate-in / fade-* / zoom-* / slide-*
  // classes and the @container queries in the shadcn components work unchanged.
  plugins: [tailwindcssAnimate, containerQueries],
} satisfies Config;

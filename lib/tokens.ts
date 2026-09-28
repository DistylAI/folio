// Folio token data for the Tokens page.
// Values mirror content/folio-tokens.css; scripts/check-tokens.mjs fails the
// build when they drift.

export type ColorToken = {
  name: string;
  cssVar: string;
  utility: string;
  // Optional full utility set (bg/text/border). Feedback tokens are used in all
  // three contexts, so the swatch lists each; other groups fall back to `utility`.
  utilities?: string[];
  light: string;
  dark: string;
  usage: string;
};

export type ColorGroup = {
  id: string;
  title: string;
  description: string;
  tokens: ColorToken[];
};

// Parent heading the color groups render under on the Tokens page.
export const colorParentTitle = "Color";

export const colorGroups: ColorGroup[] = [
  {
    id: "background",
    title: "Backgrounds",
    description: "Surface fills, from the main canvas to brand and feedback tints.",
    tokens: [
      { name: "background.default", cssVar: "--color-background-default", utility: "bg-background", light: "#FFFFFF", dark: "#0F1117", usage: "Main page / app background" },
      { name: "background.subtle", cssVar: "--color-background-subtle", utility: "bg-muted", light: "#F9FAFB", dark: "#141820", usage: "Sidebars, off-white surfaces" },
      { name: "background.secondary", cssVar: "--color-background-secondary", utility: "bg-secondary", light: "#F3F4F6", dark: "#1F2937", usage: "Secondary surfaces, hover states" },
      { name: "background.primary-subtle", cssVar: "--color-background-primary-subtle", utility: "bg-primary-subtle", light: "#EFEDFD", dark: "#1A1733", usage: "Brand-tinted surfaces" },
      { name: "background.accent", cssVar: "--color-background-accent", utility: "bg-accent", light: "#F3F4F6", dark: "#1E1B4B", usage: "Hover and highlight surfaces" },
      { name: "background.primary", cssVar: "--color-background-primary", utility: "bg-primary", light: "#5D4EE7", dark: "#7C6FF7", usage: "Primary brand fills, buttons" },
      { name: "background.inverse", cssVar: "--color-background-inverse", utility: "bg-inverse", light: "#0F1117", dark: "#F9FAFB", usage: "Dark surfaces" },
      { name: "background.danger", cssVar: "--color-background-danger", utility: "bg-destructive-subtle", light: "#FEF2F2", dark: "#450A0A", usage: "Error background tints" },
      { name: "background.success", cssVar: "--color-background-success", utility: "bg-success-subtle", light: "#F0FDF4", dark: "#052E16", usage: "Success background tints" },
      { name: "background.warning", cssVar: "--color-background-warning", utility: "bg-warning-subtle", light: "#FFFBEB", dark: "#451A03", usage: "Warning background tints" },
      { name: "background.info", cssVar: "--color-background-info", utility: "bg-info-subtle", light: "#EFF6FF", dark: "#172554", usage: "Info background tints" },
    ],
  },
  {
    id: "text",
    title: "Text",
    description: "Foreground colors for copy, labels, and states.",
    tokens: [
      { name: "text.default", cssVar: "--color-text-default", utility: "text-foreground", light: "#0F1117", dark: "#F9FAFB", usage: "Body text, primary content" },
      { name: "text.subtle", cssVar: "--color-text-subtle", utility: "text-muted-foreground", light: "#6B7280", dark: "#9CA3AF", usage: "Secondary text, placeholders" },
      { name: "text.primary", cssVar: "--color-text-primary", utility: "text-primary", light: "#5D4EE7", dark: "#7C6FF7", usage: "Brand text, links, active labels" },
      { name: "text.inverse", cssVar: "--color-text-inverse", utility: "text-inverse", light: "#FFFFFF", dark: "#0F1117", usage: "Text on dark / filled backgrounds" },
      { name: "text.disabled", cssVar: "--color-text-disabled", utility: "text-disabled", light: "#D1D5DB", dark: "#4B5563", usage: "Disabled text only" },
      { name: "text.danger", cssVar: "--color-text-danger", utility: "text-destructive", light: "#B91C1C", dark: "#F87171", usage: "Error messages" },
      { name: "text.success", cssVar: "--color-text-success", utility: "text-success", light: "#15803D", dark: "#4ADE80", usage: "Success messages" },
      { name: "text.warning", cssVar: "--color-text-warning", utility: "text-warning", light: "#B45309", dark: "#FBBF24", usage: "Warning messages" },
      { name: "text.info", cssVar: "--color-text-info", utility: "text-info", light: "#1D4ED8", dark: "#60A5FA", usage: "Info messages" },
    ],
  },
  {
    id: "border",
    title: "Borders",
    description: "Outlines, separators, and focus rings.",
    tokens: [
      { name: "border.default", cssVar: "--color-border-default", utility: "border-border", light: "#E5E7EB", dark: "#374151", usage: "Standard borders, input outlines" },
      { name: "border.subtle", cssVar: "--color-border-subtle", utility: "border-border-subtle", light: "#F3F4F6", dark: "#1F2937", usage: "Light separators" },
      { name: "border.strong", cssVar: "--color-border-strong", utility: "border-border-strong", light: "#9CA3AF", dark: "#6B7280", usage: "Emphasized borders" },
      { name: "border.primary", cssVar: "--color-border-primary", utility: "border-primary", light: "#5D4EE7", dark: "#7C6FF7", usage: "Focused / active inputs" },
      { name: "border.danger", cssVar: "--color-border-danger", utility: "border-destructive", light: "#EF4444", dark: "#F87171", usage: "Error state borders" },
      { name: "border.success", cssVar: "--color-border-success", utility: "border-success", light: "#15803D", dark: "#4ADE80", usage: "Valid / success borders" },
      { name: "border.warning", cssVar: "--color-border-warning", utility: "border-warning", light: "#B45309", dark: "#FBBF24", usage: "Warning state borders" },
      { name: "border.info", cssVar: "--color-border-info", utility: "border-info", light: "#3B82F6", dark: "#60A5FA", usage: "Info state borders" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Canonical status colors — use these for every status state.",
    tokens: [
      { name: "feedback.info", cssVar: "--color-feedback-info", utility: "bg-info", light: "#3B82F6", dark: "#60A5FA", usage: "All info states" },
      { name: "feedback.success", cssVar: "--color-feedback-success", utility: "bg-success", light: "#15803D", dark: "#4ADE80", usage: "All success states" },
      { name: "feedback.warning", cssVar: "--color-feedback-warning", utility: "bg-warning", light: "#B45309", dark: "#FBBF24", usage: "All warning states" },
      { name: "feedback.danger", cssVar: "--color-feedback-danger", utility: "bg-destructive", light: "#EF4444", dark: "#F87171", usage: "All error / destructive states" },
    ],
  },
  {
    id: "chart",
    title: "Chart",
    description:
      "Data series colors for charts. Use in order, from chart-1 to chart-10. The values are the same in light and dark. Never use feedback or primary tokens for neutral data series.",
    tokens: [
      { name: "chart.1", cssVar: "--color-chart-1", utility: "var(--color-chart-1)", light: "#7C6FF7", dark: "#7C6FF7", usage: "First data series" },
      { name: "chart.2", cssVar: "--color-chart-2", utility: "var(--color-chart-2)", light: "#38BDF8", dark: "#38BDF8", usage: "Second data series" },
      { name: "chart.3", cssVar: "--color-chart-3", utility: "var(--color-chart-3)", light: "#34D399", dark: "#34D399", usage: "Third data series" },
      { name: "chart.4", cssVar: "--color-chart-4", utility: "var(--color-chart-4)", light: "#FB923C", dark: "#FB923C", usage: "Fourth data series" },
      { name: "chart.5", cssVar: "--color-chart-5", utility: "var(--color-chart-5)", light: "#EC4899", dark: "#EC4899", usage: "Fifth data series" },
      { name: "chart.6", cssVar: "--color-chart-6", utility: "var(--color-chart-6)", light: "#2A9D90", dark: "#2A9D90", usage: "Sixth data series" },
      { name: "chart.7", cssVar: "--color-chart-7", utility: "var(--color-chart-7)", light: "#16A249", dark: "#16A249", usage: "Seventh data series" },
      { name: "chart.8", cssVar: "--color-chart-8", utility: "var(--color-chart-8)", light: "#E963A6", dark: "#E963A6", usage: "Eighth data series" },
      { name: "chart.9", cssVar: "--color-chart-9", utility: "var(--color-chart-9)", light: "#A855F7", dark: "#A855F7", usage: "Ninth data series" },
      { name: "chart.10", cssVar: "--color-chart-10", utility: "var(--color-chart-10)", light: "#2E4C6B", dark: "#2E4C6B", usage: "Tenth data series" },
    ],
  },
];

export type RadiusToken = { name: string; utility: string; value: string };

export const radiusTokens: RadiusToken[] = [
  { name: "radius.none", utility: "rounded-none", value: "0px" },
  { name: "radius.sm", utility: "rounded-sm", value: "4px" },
  { name: "radius.md", utility: "rounded-lg", value: "8px" },
  { name: "radius.lg", utility: "rounded-xl", value: "12px" },
  { name: "radius.xl", utility: "rounded-2xl", value: "16px" },
  { name: "radius.full", utility: "rounded-full", value: "9999px" },
];

export type SpacingToken = { name: string; utility: string; px: number };

export const spacingTokens: SpacingToken[] = [
  { name: "space.1", utility: "p-1", px: 4 },
  { name: "space.2", utility: "p-2", px: 8 },
  { name: "space.3", utility: "p-3", px: 12 },
  { name: "space.4", utility: "p-4", px: 16 },
  { name: "space.6", utility: "p-6", px: 24 },
  { name: "space.8", utility: "p-8", px: 32 },
  { name: "space.12", utility: "p-12", px: 48 },
  { name: "space.16", utility: "p-16", px: 64 },
];

export type TypeScaleToken = {
  px: number;
  token: string;
  weight: number;
  weightLabel: string;
  sample: string;
};

// The 8 canonical Folio named text styles, ordered strictly px-descending
// (nothing above 20px). Each row renders at the token's real size/weight.
export const typeScale: TypeScaleToken[] = [
  { px: 20, token: "text-large", weight: 400, weightLabel: "Regular", sample: "Largest display text" },
  { px: 18, token: "text-lead", weight: 600, weightLabel: "Semibold", sample: "Section headers and leads" },
  { px: 16, token: "text-title", weight: 500, weightLabel: "Medium", sample: "Card and component titles" },
  { px: 16, token: "text-body", weight: 400, weightLabel: "Regular", sample: "Body and paragraph copy" },
  { px: 14, token: "text-small", weight: 500, weightLabel: "Medium", sample: "Secondary and muted copy" },
  { px: 14, token: "text-description", weight: 400, weightLabel: "Regular", sample: "Helper and description copy" },
  { px: 12, token: "text-caption", weight: 400, weightLabel: "Regular", sample: "Captions, labels, metadata" },
  { px: 12, token: "text-label", weight: 500, weightLabel: "Medium", sample: "Compact form labels" },
];

export const fontWeights = [
  { weight: 400, label: "Regular" },
  { weight: 500, label: "Medium" },
  { weight: 600, label: "Semibold" },
  { weight: 700, label: "Bold" },
];

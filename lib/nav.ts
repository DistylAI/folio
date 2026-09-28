// Single source of truth for site navigation, shared by the desktop Sidebar
// and the mobile drawer menu so the two never drift.

export type NavSection = { id: string; label: string };
// An item is either a page link (href) or a collapsible group of child pages
// (children, no href of its own). sections are in-page anchors for a page.
export type NavItem = {
  href?: string;
  label: string;
  sections?: NavSection[];
  children?: NavItem[];
};
export type NavGroup = { section: string; items: NavItem[] };

export const nav: NavGroup[] = [
  {
    section: "Overview",
    items: [{ href: "/", label: "Introduction" }],
  },
  {
    section: "Components",
    items: [
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/alert", label: "Alert" },
      { href: "/components/alert-dialog", label: "Alert Dialog" },
      { href: "/components/aspect-ratio", label: "Aspect Ratio" },
      { href: "/components/avatar", label: "Avatar" },
      { href: "/components/badge", label: "Badge & Tag" },
      { href: "/components/box", label: "Box" },
      { href: "/components/breadcrumb", label: "Breadcrumb" },
      { href: "/components/button", label: "Button" },
      { href: "/components/button-group", label: "Button Group" },
      { href: "/components/calendar", label: "Calendar" },
      { href: "/components/card", label: "Card" },
      { href: "/components/carousel", label: "Carousel" },
      {
        label: "Charts",
        children: [
          { href: "/components/area-chart", label: "Area Chart" },
          { href: "/components/bar-chart", label: "Bar Chart" },
          { href: "/components/chart-tooltip", label: "Chart Tooltip" },
          { href: "/components/line-chart", label: "Line Chart" },
          { href: "/components/pie-chart", label: "Pie Chart" },
          { href: "/components/radar-chart", label: "Radar Chart" },
          { href: "/components/radial-chart", label: "Radial Chart" },
        ],
      },
      { href: "/components/checkbox", label: "Checkbox" },
      { href: "/components/collapsible", label: "Collapsible" },
      { href: "/components/combobox", label: "Combobox" },
      { href: "/components/command", label: "Command" },
      { href: "/components/context-menu", label: "Context Menu" },
      { href: "/components/conversational-ui", label: "Conversational UI" },
      { href: "/components/data-table", label: "Data Table" },
      { href: "/components/date-picker", label: "Date Picker" },
      { href: "/components/dialog", label: "Dialog" },
      { href: "/components/drawer", label: "Drawer" },
      { href: "/components/dropdown-menu", label: "Dropdown Menu" },
      { href: "/components/empty-state", label: "Empty State" },
      { href: "/components/field", label: "Field" },
      { href: "/components/file-tree", label: "File Tree" },
      { href: "/components/grid", label: "Grid" },
      { href: "/components/hover-card", label: "Hover Card" },
      { href: "/components/input", label: "Input" },
      { href: "/components/input-group", label: "Input Group" },
      { href: "/components/input-otp", label: "Input OTP" },
      { href: "/components/item", label: "Item" },
      { href: "/components/kbd", label: "Keyboard Input" },
      { href: "/components/label", label: "Label" },
      { href: "/components/menubar", label: "Menubar" },
      { href: "/components/navigation-menu", label: "Navigation Menu" },
      { href: "/components/pagination", label: "Pagination" },
      { href: "/components/popover", label: "Popover" },
      { href: "/components/progress", label: "Progress" },
      { href: "/components/radio-group", label: "Radio Group" },
      { href: "/components/resizable", label: "Resizable" },
      { href: "/components/scroll-area", label: "Scroll Area" },
      { href: "/components/select", label: "Select" },
      { href: "/components/separator", label: "Separator" },
      { href: "/components/sheet", label: "Sheet" },
      { href: "/components/sidebar", label: "Sidebar" },
      { href: "/components/skeleton", label: "Skeleton" },
      { href: "/components/slider", label: "Slider" },
      { href: "/components/spinner", label: "Spinner" },
      { href: "/components/stack", label: "Stack" },
      { href: "/components/switch", label: "Switch" },
      { href: "/components/table", label: "Table" },
      { href: "/components/tabs", label: "Tabs" },
      { href: "/components/textarea", label: "Textarea" },
      { href: "/components/toast", label: "Toast" },
      { href: "/components/toggle", label: "Toggle" },
      { href: "/components/toggle-group", label: "Toggle Group" },
      { href: "/components/tooltip", label: "Tooltip" },
    ],
  },
  {
    section: "Foundations",
    items: [
      {
        href: "/tokens",
        label: "Tokens",
        sections: [
          { id: "background", label: "Backgrounds" },
          { id: "text", label: "Text" },
          { id: "border", label: "Borders" },
          { id: "feedback", label: "Feedback" },
          { id: "chart", label: "Chart" },
          { id: "radius", label: "Radius" },
          { id: "spacing", label: "Spacing" },
          { id: "typescale", label: "Type Scale" },
        ],
      },
      {
        href: "/foundations/icons",
        label: "Icons",
        sections: [
          { id: "library", label: "Library" },
          { id: "sizing", label: "Sizing" },
          { id: "color", label: "Color" },
          { id: "usage", label: "Usage" },
          { id: "browse", label: "Browse" },
        ],
      },
      {
        href: "/foundations/typography",
        label: "Typography",
        sections: [
          { id: "scale", label: "Type scale" },
          { id: "weights", label: "Weights" },
          { id: "context", label: "In context" },
          { id: "mono", label: "Monospace" },
        ],
      },
      {
        href: "/guidelines",
        label: "Guidelines",
        sections: [
          { id: "component-semantics", label: "Component semantics" },
          { id: "full-specification", label: "Full specification" },
        ],
      },
    ],
  },
  {
    section: "Status",
    items: [
      { href: "/status/changelog", label: "Changelog" },
      { href: "/status/components", label: "Component status" },
      {
        href: "/audit",
        label: "Codebase Audit",
        sections: [
          { id: "executive-summary", label: "Executive Summary" },
          { id: "dark-mode-status", label: "Dark Mode Status" },
          { id: "token-inventory", label: "Token Inventory" },
          { id: "violations-summary", label: "Violations Summary" },
          { id: "component-inventory", label: "Component Inventory" },
          { id: "component-semantic-violations", label: "Semantic Violations" },
          { id: "drift-map", label: "Drift Map" },
          { id: "debt-priority", label: "Debt Priority" },
          { id: "rebrand-readiness", label: "Rebrand Readiness" },
        ],
      },
    ],
  },
];

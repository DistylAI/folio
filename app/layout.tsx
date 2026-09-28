import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { FolioToaster } from "@/components/FolioToaster";

export const metadata: Metadata = {
  title: {
    default: "Folio -- Distyl AI Design System",
    template: "%s · Folio",
  },
  description:
    "Folio v1.2 -- the canonical design system for Distyl AI. Tokens, component rules, and the current codebase audit.",
};

// Set the theme before first paint to avoid a flash of the wrong theme.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('folio-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <TooltipProvider>
          <div className="flex min-h-screen w-full max-w-[1400px]">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <MobileNav />
              <main className="min-w-0 flex-1 px-4 py-10 md:px-10 lg:px-16">
                <div className="mx-auto w-full max-w-3xl">{children}</div>
              </main>
            </div>
          </div>
          <FolioToaster />
        </TooltipProvider>
      </body>
    </html>
  );
}

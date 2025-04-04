import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Website",
  description: "Generated by Next.js",
};

// Inline script to set the initial theme before React hydration
const setInitialTheme = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      }
    } catch (e) {
      // Fail silently if localStorage isn't available
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This script runs immediately on page load to set the theme */}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

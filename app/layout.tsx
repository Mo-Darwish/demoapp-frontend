import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
        {/* Toast notifications */}
        {/** @ts-ignore */}
        <div id="toaster-root">
          {/* Import Toaster dynamically to avoid SSR issues if needed */}
          {/* If you use a custom Toaster, import it from components/ui/toaster */}
          {/* If you use Sonner, import from components/ui/sonner */}
          {/* Here, we use your custom Toaster */}
          {require("@/components/ui/toaster").Toaster()}
        </div>
      </body>
    </html>
  );
}

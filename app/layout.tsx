import type { Metadata } from "next";
import "./globals.css";

import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HYW Global LLC",
    template: "%s | HYW Global LLC",
  },
  description:
    "HYW Global LLC delivers cloud connectivity, IP transit, internet exchange, and DYC network platforms.",
  keywords: [
    "HYW Global LLC",
    "IP Transit",
    "Internet Exchange",
    "Cloud Computing",
    "DYC Switch",
    "DYC Router",
    "CXIX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

import { isLocale, siteUrl } from "@/lib/site";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");
  const locale = isLocale(headerLocale) ? headerLocale : "en";

  return (
    <html
      lang={locale}
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

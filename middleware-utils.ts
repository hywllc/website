import type { NextRequest } from "next/server";

import type { Locale } from "@/lib/site";

const zhCountries = new Set(["CN", "HK", "MO", "TW", "SG"]);
const botPattern =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|curl|wget/i;

export function isPublicAssetPath(pathname: string) {
  return pathname.startsWith("/_next") || /\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$/i.test(pathname);
}

export function detectPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "zh" || cookieLocale === "en") {
    return cookieLocale;
  }

  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country") ||
    "";

  if (zhCountries.has(country.toUpperCase())) {
    return "zh";
  }

  return request.headers.get("accept-language")?.toLowerCase().includes("zh")
    ? "zh"
    : "en";
}

export function isBotRequest(request: NextRequest) {
  return botPattern.test(request.headers.get("user-agent") ?? "");
}

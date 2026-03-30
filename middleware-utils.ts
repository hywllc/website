import type { NextRequest } from "next/server";

import type { Locale } from "@/lib/site";

const zhCountries = new Set(["CN", "HK", "MO", "TW", "SG"]);

export function isPublicAssetPath(pathname: string) {
  return /\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$/i.test(pathname);
}

export function detectLocaleFromRequest(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale === "zh" || cookieLocale === "en") {
    return cookieLocale;
  }

  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    "";

  if (zhCountries.has(country.toUpperCase())) {
    return "zh";
  }

  return request.headers.get("accept-language")?.toLowerCase().includes("zh")
    ? "zh"
    : "en";
}

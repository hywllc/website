import { cookies, headers } from "next/headers";

import { isLocale, type Locale } from "@/lib/site";

const zhCountries = new Set(["CN", "HK", "MO", "TW", "SG"]);

export async function detectPreferredLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  const country =
    headerStore.get("x-vercel-ip-country") ||
    headerStore.get("cf-ipcountry") ||
    headerStore.get("cloudfront-viewer-country") ||
    "";

  if (zhCountries.has(country.toUpperCase())) {
    return "zh";
  }

  return headerStore.get("accept-language")?.toLowerCase().includes("zh")
    ? "zh"
    : "en";
}

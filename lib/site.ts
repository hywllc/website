import { en } from "@/lib/content-en";
import { zh } from "@/lib/content-zh";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hywglobal.com";

export type GlobeLocation = {
  slug: string;
  coordinates: [number, number];
  labelOffset: [number, number];
  labels: Record<Locale, string>;
  meta: Record<Locale, string>;
};

export type PartnerLogo = {
  name: string;
  short: string;
  category: string;
};

const dictionaries = { en, zh } as const;
export type Dictionary = (typeof dictionaries)[Locale];

export const networkLocations: GlobeLocation[] = [
  {
    slug: "shanghai",
    coordinates: [121.4737, 31.2304],
    labelOffset: [42, -18],
    labels: { en: "Shanghai", zh: "上海" },
    meta: { en: "China", zh: "中国" },
  },
  {
    slug: "taipei",
    coordinates: [121.5654, 25.033],
    labelOffset: [38, -2],
    labels: { en: "Taipei", zh: "台北" },
    meta: { en: "Taiwan, China", zh: "中国台北" },
  },
  {
    slug: "hong-kong",
    coordinates: [114.1694, 22.3193],
    labelOffset: [40, 18],
    labels: { en: "Hong Kong", zh: "香港" },
    meta: { en: "China", zh: "中国香港" },
  },
  {
    slug: "tokyo",
    coordinates: [139.6917, 35.6895],
    labelOffset: [36, -38],
    labels: { en: "Tokyo", zh: "东京" },
    meta: { en: "Japan", zh: "日本" },
  },
  {
    slug: "frankfurt",
    coordinates: [8.6821, 50.1109],
    labelOffset: [-136, -28],
    labels: { en: "Frankfurt", zh: "法兰克福" },
    meta: { en: "Germany", zh: "德国" },
  },
  {
    slug: "new-york",
    coordinates: [-74.006, 40.7128],
    labelOffset: [-134, -6],
    labels: { en: "New York", zh: "纽约" },
    meta: { en: "United States", zh: "美国" },
  },
  {
    slug: "montreal",
    coordinates: [-73.5673, 45.5017],
    labelOffset: [-132, -42],
    labels: { en: "Montreal", zh: "蒙特利尔" },
    meta: { en: "Canada", zh: "加拿大" },
  },
];

export const partnerLogos: PartnerLogo[] = [
  { name: "LatticeOne", short: "LO", category: "Transit" },
  { name: "MetroFiber", short: "MF", category: "Metro" },
  { name: "CloudHarbor", short: "CH", category: "Cloud" },
  { name: "NorthGrid", short: "NG", category: "Peering" },
  { name: "AeroLink", short: "AL", category: "Carrier" },
  { name: "CoreLumen", short: "CL", category: "Datacenter" },
  { name: "WaveStack", short: "WS", category: "Edge" },
  { name: "TransitForge", short: "TF", category: "Backbone" },
  { name: "Atlas Route", short: "AR", category: "Routing" },
  { name: "OceanIX", short: "OX", category: "Exchange" },
];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "zh";
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getStructuredData(locale: Locale, page: "home" | "partners") {
  const dictionary = getDictionary(locale);
  const path = page === "home" ? `/${locale}` : `/${locale}/partners`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HYW Global LLC",
    url: `${siteUrl}${path}`,
    description:
      page === "home"
        ? dictionary.meta.description
        : dictionary.partnersPage.metaDescription,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    publisher: {
      "@type": "Organization",
      name: "HYW Global LLC",
      url: siteUrl,
      sameAs: ["https://cxix.net"],
    },
  };
}

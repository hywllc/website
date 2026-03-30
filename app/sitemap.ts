import type { MetadataRoute } from "next";

import { locales, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/partners"];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${siteUrl}/en${route}`,
          zh: `${siteUrl}/zh${route}`,
        },
      },
    })),
  );
}

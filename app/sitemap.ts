import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          zh: `${siteUrl}/zh`,
        },
      },
    },
    {
      url: `${siteUrl}/partners`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/partners`,
          zh: `${siteUrl}/zh/partners`,
        },
      },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          zh: `${siteUrl}/zh`,
        },
      },
    },
    {
      url: `${siteUrl}/zh/partners`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/partners`,
          zh: `${siteUrl}/zh/partners`,
        },
      },
    },
  ];
}

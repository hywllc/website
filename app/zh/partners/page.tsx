import type { Metadata } from "next";

import { PartnersPageContent } from "@/components/partners-page-content";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "合作伙伴",
  description:
    "了解 HYW Global LLC 的合作模式，包括对等互联、IX 接入、IP Transit 与 DYC 网络硬件相关合作。",
  alternates: {
    canonical: "/zh/partners",
    languages: {
      en: "/partners",
      zh: "/zh/partners",
      "x-default": "/partners",
    },
  },
};

export default function ZhPartnersPage() {
  return (
    <SiteShell locale="zh">
      <PartnersPageContent locale="zh" canonicalPath="/zh/partners" />
    </SiteShell>
  );
}

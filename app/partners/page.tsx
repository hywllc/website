import type { Metadata } from "next";

import { PartnersPageContent } from "@/components/partners-page-content";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Partners | HYW Global LLC",
  description:
    "Partner with HYW Global LLC for peering, IX connectivity, IP Transit, and DYC network equipment collaboration.",
  alternates: {
    canonical: "/partners",
    languages: {
      en: "/partners",
      zh: "/zh/partners",
      "x-default": "/partners",
    },
  },
};

export default function PartnersPage() {
  return (
    <SiteShell locale="en">
      <PartnersPageContent locale="en" canonicalPath="/partners" />
    </SiteShell>
  );
}

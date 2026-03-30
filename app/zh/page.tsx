import { HomePageContent } from "@/components/home-page-content";
import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "HYW Global LLC 中文站",
  description:
    "HYW Global LLC 提供对等互联、IP Transit、互联网交换中心服务以及 DYC 网络设备产品。",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      zh: "/zh",
      "x-default": "/",
    },
  },
};

export default function ZhHomePage() {
  return (
    <SiteShell locale="zh">
      <HomePageContent locale="zh" canonicalPath="/zh" />
    </SiteShell>
  );
}

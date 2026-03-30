"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/site";

type HtmlLangSyncProps = {
  locale: Locale;
};

export function HtmlLangSync({ locale }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return null;
}

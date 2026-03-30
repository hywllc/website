"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

import { localeLabels, type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

function toLocalizedPath(pathname: string, targetLocale: Locale) {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const isZhPath = normalized === "/zh" || normalized.startsWith("/zh/");
  const suffix = isZhPath ? normalized.slice(3) || "/" : normalized;

  if (targetLocale === "zh") {
    return suffix === "/" ? "/zh" : `/zh${suffix}`;
  }

  return suffix || "/";
}

type LocaleSwitcherProps = {
  locale: Locale;
  className?: string;
  variant?: "default" | "dark";
};

export function LocaleSwitcher({
  locale,
  className,
  variant = "default",
}: LocaleSwitcherProps) {
  const pathname = usePathname() || (locale === "zh" ? "/zh" : "/");
  const dark = variant === "dark";
  const localeOptions: Locale[] = ["en", "zh"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1 backdrop-blur-xl",
        dark
          ? "border border-white/10 bg-white/[0.04] shadow-[0_10px_30px_-20px_rgba(255,255,255,0.35)]"
          : "border border-slate-200/70 bg-white/85 shadow-sm",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          dark ? "text-white/58" : "text-slate-500",
        )}
      >
        <Languages className="size-4" />
      </div>
      {localeOptions.map((target) => {
        const href = toLocalizedPath(pathname, target);

        return (
          <Link
            key={target}
            href={href}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors",
              locale === target
                ? dark
                  ? "bg-white text-black"
                  : "bg-primary text-primary-foreground"
                : dark
                  ? "text-white/68 hover:bg-white/[0.08] hover:text-white"
                  : "text-slate-600 hover:bg-slate-100",
            )}
          >
            {localeLabels[target]}
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Languages } from "lucide-react";

import { localeLabels, type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

const SWITCHER_ANIMATION_MS = 460;

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

type PendingSwitch = {
  from: Locale;
  target: Locale;
};

export function LocaleSwitcher({
  locale,
  className,
  variant = "default",
}: LocaleSwitcherProps) {
  const pathname = usePathname() || (locale === "zh" ? "/zh" : "/");
  const router = useRouter();
  const dark = variant === "dark";
  const localeOptions: Locale[] = ["en", "zh"];
  const [pendingSwitch, setPendingSwitch] = useState<PendingSwitch | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentLocaleRef = useRef(locale);
  const currentPathnameRef = useRef(pathname);
  const hash = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("hashchange", onStoreChange);
      window.addEventListener("popstate", onStoreChange);

      return () => {
        window.removeEventListener("hashchange", onStoreChange);
        window.removeEventListener("popstate", onStoreChange);
      };
    },
    () => window.location.hash,
    () => "",
  );
  const search = typeof window === "undefined" ? "" : window.location.search;
  const activeSwitch = pendingSwitch?.from === locale ? pendingSwitch : null;
  const displayLocale = activeSwitch?.target ?? locale;
  const activeIndex = displayLocale === "zh" ? 1 : 0;

  useEffect(() => {
    currentLocaleRef.current = locale;
    currentPathnameRef.current = pathname;
  }, [locale, pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleDelayedNavigation(
    event: React.MouseEvent<HTMLAnchorElement>,
    target: Locale,
    href: string,
    isCurrentLocale: boolean,
  ) {
    if (
      isCurrentLocale ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setPendingSwitch({ from: locale, target });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const sourceLocale = locale;
    const sourcePathname = pathname;
    timeoutRef.current = setTimeout(() => {
      if (
        currentLocaleRef.current !== sourceLocale ||
        currentPathnameRef.current !== sourcePathname
      ) {
        timeoutRef.current = null;
        return;
      }

      startTransition(() => {
        router.push(href);
      });
      timeoutRef.current = null;
    }, SWITCHER_ANIMATION_MS);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1 backdrop-blur-xl",
        dark
          ? "border border-white/14 bg-white/[0.06] shadow-[0_12px_28px_-22px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.14)]"
          : "border border-white/55 bg-white/54 shadow-[0_12px_26px_-22px_rgba(15,23,42,0.24),inset_0_1px_0_rgba(255,255,255,0.6)]",
        className,
      )}
      style={{ "--locale-switcher-duration": `${SWITCHER_ANIMATION_MS}ms` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          dark ? "text-white/58" : "text-slate-500",
        )}
      >
        <Languages className="size-4" />
      </div>
      <div className="relative grid grid-cols-2 rounded-full p-0.5">
        <div
          aria-hidden="true"
          className={cn(
            "locale-switcher-thumb pointer-events-none absolute inset-y-0.5 left-0.5 z-0 w-[calc(50%-2px)] rounded-full border",
            dark
              ? "border-white/20 bg-white/[0.14] shadow-[0_10px_20px_-16px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.24)]"
              : "border-white/70 bg-white/66 shadow-[0_10px_18px_-16px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.64)]",
          )}
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {localeOptions.map((target) => {
          const href = `${toLocalizedPath(pathname, target)}${search}${hash}`;
          const isCurrentLocale = locale === target;
          const isVisibleActive = displayLocale === target;

          return (
            <Link
              key={target}
              href={href}
              aria-current={isCurrentLocale ? "page" : undefined}
              lang={target === "zh" ? "zh-CN" : "en"}
              onClick={(event) => handleDelayedNavigation(event, target, href, isCurrentLocale)}
              className={cn(
                "relative z-10 flex min-w-[3.4rem] items-center justify-center rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300",
                isVisibleActive
                  ? dark
                    ? "text-white"
                    : "text-slate-950"
                  : dark
                    ? "text-white/72 hover:text-white"
                    : "text-slate-600 hover:text-slate-900",
              )}
            >
              {localeLabels[target]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

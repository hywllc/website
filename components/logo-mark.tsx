import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoMarkProps = {
  href?: string;
  compact?: boolean;
  className?: string;
  inverse?: boolean;
};

export function LogoMark({
  href = "/",
  compact = false,
  className,
  inverse = false,
}: LogoMarkProps) {
  const content = (
    <div className={cn("flex items-center gap-3 whitespace-nowrap", className)}>
      <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#0d2447,#2aa0b6)] text-white shadow-lg shadow-cyan-950/20">
        <svg
          viewBox="0 0 48 48"
          className="absolute inset-0 h-full w-full opacity-65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 32C16 20 24 16 40 14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M9 38C18 24 27 20 39 20"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="16" cy="20" r="1.8" fill="currentColor" />
          <circle cx="28" cy="16" r="1.8" fill="currentColor" />
          <circle cx="36" cy="13" r="1.8" fill="currentColor" />
        </svg>
        <span className="relative font-heading text-sm font-semibold tracking-[0.2em]">
          HYW
        </span>
      </div>
      {!compact ? (
        <div className="min-w-0">
          <div
            className={cn(
              "font-heading text-lg font-semibold tracking-[0.12em] uppercase whitespace-nowrap",
              inverse ? "text-white" : "text-slate-900",
            )}
          >
            HYW Global LLC
          </div>
          <div
            className={cn(
              "text-xs tracking-[0.24em] uppercase whitespace-nowrap",
              inverse ? "text-white/55" : "text-slate-500",
            )}
          >
            Transit . Exchange . Infrastructure
          </div>
        </div>
      ) : null}
    </div>
  );

  return <Link href={href}>{content}</Link>;
}

import { cn } from "@/lib/utils";
import type { PartnerLogo } from "@/lib/site";

type PartnerMarqueeProps = {
  logos: PartnerLogo[];
  compact?: boolean;
};

function LogoWordmark({
  logo,
  compact = false,
}: {
  logo: PartnerLogo;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-[184px] items-center justify-center rounded-full border border-white/8 bg-white/[0.045] px-7 py-5 text-center transition-colors hover:bg-white/[0.07]",
        compact && "min-w-[168px] px-6 py-4",
      )}
    >
      <div className="space-y-1">
        <div
          className={cn(
            "font-heading text-base font-semibold tracking-[0.16em] text-white/92 uppercase",
            compact && "text-sm",
          )}
        >
          {logo.name}
        </div>
        <div
          className={cn(
            "text-[10px] tracking-[0.24em] text-white/38 uppercase",
            compact && "text-[9px]",
          )}
        >
          {logo.category}
        </div>
      </div>
    </div>
  );
}

export function PartnerMarquee({
  logos,
  compact = false,
}: PartnerMarqueeProps) {
  const pivot = Math.ceil(logos.length / 2);
  const firstRow = logos.slice(0, pivot);
  const secondRow = logos.slice(pivot);

  return (
    <div className="space-y-4 overflow-hidden mask-fade">
      <div className="flex gap-4 whitespace-nowrap partner-track">
        {[...firstRow, ...firstRow, ...firstRow].map((logo, index) => (
          <LogoWordmark
            key={`${logo.name}-${index}`}
            logo={logo}
            compact={compact}
          />
        ))}
      </div>
      <div className="flex gap-4 whitespace-nowrap partner-track-reverse">
        {[...secondRow, ...secondRow, ...secondRow].map((logo, index) => (
          <LogoWordmark
            key={`${logo.name}-reverse-${index}`}
            logo={logo}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

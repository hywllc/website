import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
      )}
    >
      <div className={cn("section-tag", inverse && "border-white/15 bg-white/5 text-cyan-100")}>
        {eyebrow}
      </div>
      <h2 className={cn("text-3xl font-semibold sm:text-4xl", inverse ? "text-white" : "text-slate-900")}>
        {title}
      </h2>
      <p className={cn("text-sm leading-7 sm:text-base", inverse ? "text-cyan-50/80" : "text-slate-600")}>
        {description}
      </p>
    </div>
  );
}

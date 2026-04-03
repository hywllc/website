import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "liquid-glass-button group/button inline-flex shrink-0 items-center justify-center rounded-full border text-sm font-medium tracking-[0.01em] whitespace-nowrap outline-none select-none focus-visible:border-white/60 focus-visible:ring-4 focus-visible:ring-white/20 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive/70 aria-invalid:ring-4 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-white/34 bg-white/22 text-slate-950 hover:bg-white/28",
        outline:
          "border-white/26 bg-white/12 text-slate-900 hover:bg-white/18 aria-expanded:bg-white/18",
        secondary:
          "border-white/38 bg-white/28 text-slate-950 hover:bg-white/34 aria-expanded:bg-white/34",
        ghost:
          "border-white/18 bg-white/7 text-slate-900 hover:bg-white/12 aria-expanded:bg-white/12",
        destructive:
          "border-red-200/42 bg-destructive/14 text-red-950 hover:bg-destructive/20 focus-visible:border-destructive/55 focus-visible:ring-destructive/20",
        link: "border-white/22 bg-white/10 text-primary hover:bg-white/16",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4.5 has-data-[icon=inline-start]:pl-4.5",
        icon: "size-10",
        "icon-xs":
          "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

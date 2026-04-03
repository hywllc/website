import Link from "next/link";
import { Menu } from "lucide-react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Dictionary, Locale } from "@/lib/site";

const sectionLinks = [
  { key: "services", id: "services" },
  { key: "globe", id: "globe" },
  { key: "cxix", id: "cxix" },
  { key: "products", id: "products" },
  { key: "partners", id: "partners" },
  { key: "contact", id: "contact" },
] as const;

function homeHref(locale: Locale) {
  return locale === "zh" ? "/zh" : "/";
}

function partnersHref(locale: Locale) {
  return locale === "zh" ? "/zh/partners" : "/partners";
}

function sectionHref(locale: Locale, id: string) {
  return `${homeHref(locale)}#${id}`;
}

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <LogoMark href={homeHref(locale)} inverse />

        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {sectionLinks.map((link) => (
            <Link
              key={link.key}
              href={sectionHref(locale, link.id)}
              className="whitespace-nowrap text-sm font-medium text-white/68 transition-colors hover:text-white"
            >
              {dictionary.nav[link.key]}
            </Link>
          ))}
          <Link
            href={partnersHref(locale)}
            className="whitespace-nowrap text-sm font-medium text-white/68 transition-colors hover:text-white"
          >
            {dictionary.nav.partnerPage}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher locale={locale} variant="dark" />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher locale={locale} variant="dark" className="hidden sm:inline-flex" />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/18 bg-white/[0.08] text-white hover:bg-white/[0.12]"
                />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[22rem] border-l-white/60 bg-background/98 px-6"
            >
              <SheetHeader>
                <SheetTitle>
                  <LogoMark href={homeHref(locale)} compact />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-5">
                <LocaleSwitcher locale={locale} />
                {sectionLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={sectionHref(locale, link.id)}
                    className="text-base font-medium text-slate-700"
                  >
                    {dictionary.nav[link.key]}
                  </Link>
                ))}
                <Link href={partnersHref(locale)} className="text-base font-medium text-slate-700">
                  {dictionary.nav.partnerPage}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

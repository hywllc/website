import Link from "next/link";

import { LogoMark } from "@/components/logo-mark";
import type { Dictionary, Locale } from "@/lib/site";

function homeHref(locale: Locale) {
  return locale === "zh" ? "/zh" : "/";
}

function partnersHref(locale: Locale) {
  return locale === "zh" ? "/zh/partners" : "/partners";
}

function sectionHref(locale: Locale, id: string) {
  return `${homeHref(locale)}#${id}`;
}

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200/75 bg-white/65">
      <div className="container-shell flex flex-col gap-8 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <LogoMark href={homeHref(locale)} />
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            {dictionary.footer.description}
          </p>
        </div>
        <div className="grid gap-6 text-sm text-slate-600 sm:grid-cols-3">
          <div>
            <div className="font-semibold text-slate-900">HYW Global LLC</div>
            <div className="mt-2 space-y-2">
              <div>{dictionary.footer.service1}</div>
              <div>{dictionary.footer.service2}</div>
              <div>{dictionary.footer.service3}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Links</div>
            <div className="mt-2 space-y-2">
              <Link href={sectionHref(locale, "services")} className="block hover:text-slate-900">
                {dictionary.nav.services}
              </Link>
              <Link href={partnersHref(locale)} className="block hover:text-slate-900">
                {dictionary.nav.partnerPage}
              </Link>
              <Link
                href="https://cxix.net"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-slate-900"
              >
                cxix.net
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-900">
              {dictionary.footer.localeLabel}
            </div>
            <div className="mt-2 space-y-2">
              <div>{dictionary.footer.localeDescription}</div>
              <div>{dictionary.footer.languageHint}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

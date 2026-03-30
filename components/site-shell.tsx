import { HtmlLangSync } from "@/components/html-lang-sync";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, type Locale } from "@/lib/site";

type SiteShellProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const dictionary = getDictionary(locale);

  return (
    <div className="relative overflow-hidden">
      <HtmlLangSync locale={locale} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(65,153,198,0.22),transparent_55%)]" />
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>{children}</main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}

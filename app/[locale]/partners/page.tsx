import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Handshake,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { notFound } from "next/navigation";

import { PartnerMarquee } from "@/components/partner-marquee";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import {
  getDictionary,
  getStructuredData,
  isLocale,
  locales,
  partnerLogos,
  type Locale,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type PartnerPageProps = {
  params: Promise<{ locale: string }>;
};

const programIcons = [Handshake, Layers3, ShieldCheck];
const valueIcons = [Network, Cable, Waypoints];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PartnerPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.partnersTitle,
    description: dictionary.partnersPage.metaDescription,
    alternates: {
      canonical: `/${locale}/partners`,
      languages: {
        en: "/en/partners",
        zh: "/zh/partners",
        "x-default": "/en/partners",
      },
    },
  };
}

export default async function PartnersPage({ params }: PartnerPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const structuredData = getStructuredData(locale as Locale, "partners");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="container-shell pt-10 pb-14 sm:pt-16 sm:pb-18">
        <div className="panel-dark hero-grid overflow-hidden rounded-[2.4rem] p-7 sm:p-9 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="section-tag border-white/15 bg-white/5 text-cyan-100">
                {dictionary.partnersPage.eyebrow}
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {dictionary.partnersPage.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-cyan-50/80 sm:text-lg">
                {dictionary.partnersPage.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="https://cxix.net"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-full bg-white px-7 text-base text-primary hover:bg-white/90",
                  )}
                >
                  {dictionary.partnersPage.primaryCta}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={`/${locale}`}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "h-12 rounded-full border-white/15 bg-white/5 px-7 text-base text-white hover:bg-white/10",
                  )}
                >
                  {dictionary.partnersPage.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="space-y-5">
              <PartnerMarquee logos={partnerLogos} compact />
              <div className="grid gap-4 sm:grid-cols-3">
                {dictionary.partnersPage.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-white/10 bg-black/12 px-5 py-5"
                  >
                    <div className="text-3xl font-semibold text-white">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.22em] text-cyan-100/70">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-14 sm:py-18">
        <SectionHeading
          eyebrow={dictionary.partnersPage.valueEyebrow}
          title={dictionary.partnersPage.valueTitle}
          description={dictionary.partnersPage.valueDescription}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {dictionary.partnersPage.values.map((item, index) => {
            const Icon = valueIcons[index];
            return (
              <Card
                key={item.title}
                className="glass-panel border-white/55 bg-white/82"
              >
                <CardContent className="space-y-5 p-6">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-14 sm:py-18">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="glass-panel rounded-[2rem] border-white/55 bg-white/82 p-6 sm:p-8">
            <SectionHeading
              eyebrow={dictionary.partnersPage.programEyebrow}
              title={dictionary.partnersPage.programTitle}
              description={dictionary.partnersPage.programDescription}
              align="left"
            />
            <div className="mt-8 space-y-4">
              {dictionary.partnersPage.programs.map((program, index) => {
                const Icon = programIcons[index];
                return (
                  <div
                    key={program.title}
                    className="rounded-[1.5rem] border border-slate-200/75 bg-slate-950/[0.03] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {program.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel-dark rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow={dictionary.partnersPage.processEyebrow}
              title={dictionary.partnersPage.processTitle}
              description={dictionary.partnersPage.processDescription}
              align="left"
              inverse
            />
            <div className="mt-8 space-y-4">
              {dictionary.partnersPage.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/7 p-5"
                >
                  <div className="text-xs font-semibold tracking-[0.24em] text-cyan-100/65 uppercase">
                    0{index + 1}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-cyan-50/80">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pt-14 pb-20 sm:pt-18 sm:pb-24">
        <div className="panel-dark overflow-hidden rounded-[2.3rem] p-7 sm:p-9 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="section-tag border-white/15 bg-white/5 text-cyan-100">
                {dictionary.partnersPage.logoEyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {dictionary.partnersPage.logoTitle}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-cyan-50/80 sm:text-base">
                {dictionary.partnersPage.logoDescription}
              </p>
            </div>
            <div className="space-y-4">
              <PartnerMarquee logos={partnerLogos} />
              <div className="grid gap-4 sm:grid-cols-2">
                {dictionary.partnersPage.highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/7 p-5"
                  >
                    <div className="flex items-center gap-3 text-cyan-100">
                      <Sparkles className="size-5" />
                      <div className="text-lg font-semibold text-white">
                        {highlight.title}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-cyan-50/80">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

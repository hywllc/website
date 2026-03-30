import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CloudCog,
  Cpu,
  Database,
  Globe2,
  Handshake,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { notFound } from "next/navigation";

import { OrbitGlobe } from "@/components/orbit-globe";
import { PartnerMarquee } from "@/components/partner-marquee";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getDictionary,
  getStructuredData,
  isLocale,
  locales,
  networkLocations,
  partnerLogos,
  type Locale,
} from "@/lib/site";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const serviceIcons = [CloudCog, Network, Cpu];
const valueIcons = [Globe2, ShieldCheck, Database];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        "x-default": "/en",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const structuredData = getStructuredData(locale as Locale, "home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,rgba(6,10,16,1)_0%,rgba(5,8,13,1)_100%)]" />
        <div className="pointer-events-none absolute inset-y-[-6%] right-[-45%] w-[160vw] opacity-92 sm:right-[-28%] sm:w-[125vw] lg:right-[-14%] lg:w-[72rem] xl:right-[-8%] xl:w-[82rem] 2xl:w-[92rem]">
          <OrbitGlobe
            locations={networkLocations}
            locale={locale as Locale}
            variant="hero"
            className="h-full w-full justify-center scale-[1.55] sm:scale-[1.4] lg:scale-[1.58]"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.58)_46%,rgba(0,0,0,0.24)_68%,rgba(0,0,0,0)_100%)]" />

        <div className="container-shell relative z-10 flex min-h-[92vh] flex-col justify-center pt-24 pb-14 sm:pt-28 sm:pb-16 lg:min-h-[100vh]">
          <div className="max-w-3xl space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="section-tag border-white/12 bg-white/5 text-white shadow-none">
                {dictionary.hero.eyebrow}
              </Badge>
              {dictionary.hero.heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-white/60 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
                {dictionary.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                {dictionary.hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}/partners`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full border border-white/14 bg-white px-7 text-base text-black hover:bg-white/92",
                )}
              >
                {dictionary.hero.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#globe"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 rounded-full border-white/12 bg-white/[0.03] px-7 text-base text-white hover:bg-white/[0.08]",
                )}
              >
                {dictionary.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="mt-14 max-w-5xl rounded-[2rem] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-sm sm:p-6">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
              <div className="space-y-4">
                <p className="text-sm font-medium tracking-[0.28em] text-white/50 uppercase">
                  {dictionary.hero.networkCardLabel}
                </p>
                <h2 className="max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
                  {dictionary.hero.networkCardTitle}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
                  {dictionary.hero.networkCardDescription}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dictionary.hero.networkMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="text-xl font-semibold text-white">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/46">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {dictionary.hero.stats.map((stat) => (
                <Card
                  key={stat.value}
                  className="border-white/8 bg-transparent text-white shadow-none"
                >
                  <CardContent className="space-y-2 px-5 py-5">
                    <div className="text-3xl font-semibold text-white">
                      {stat.value}
                    </div>
                    <p className="text-sm leading-6 text-white/62">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="container-shell py-14 sm:py-18">
        <SectionHeading
          eyebrow={dictionary.services.eyebrow}
          title={dictionary.services.title}
          description={dictionary.services.description}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {dictionary.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Card
                key={service.title}
                className="glass-panel overflow-hidden border-white/55 bg-white/80"
              >
                <CardContent className="space-y-5 p-6 sm:p-7">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">
                      {service.description}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-2xl bg-slate-950/[0.03] px-4 py-3"
                      >
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-12 sm:py-18">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(145deg,rgba(6,12,22,0.98),rgba(10,28,48,0.96))] p-7 shadow-[0_40px_90px_-46px_rgba(8,15,36,0.95)] sm:p-8">
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,215,145,0.16),transparent_22%)]" />
            <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(180deg,rgba(3,10,20,0.16),rgba(3,10,20,0.02))]" />
            <div className="relative space-y-5">
              <Badge className="border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-100 uppercase shadow-none">
                {dictionary.architecture.eyebrow}
              </Badge>
              <h2 className="max-w-xl text-3xl font-semibold text-white sm:text-4xl">
                {dictionary.architecture.title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                {dictionary.architecture.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {dictionary.architecture.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-3xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm"
                  >
                    <div className="text-xs font-semibold tracking-[0.24em] text-cyan-100/72 uppercase">
                      0{index + 1}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {dictionary.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <Card
                  key={value.title}
                  className="glass-panel h-full border-white/55 bg-white/80"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="globe" className="container-shell py-14 sm:py-18">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={dictionary.locations.eyebrow}
              title={dictionary.locations.title}
              description={dictionary.locations.description}
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dictionary.locations.points.map((item) => (
                <div
                  key={item.city}
                  className="glass-panel rounded-[1.5rem] px-5 py-5"
                >
                  <div className="text-xs font-semibold tracking-[0.24em] text-cyan-700 uppercase">
                    {item.region}
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-slate-900">
                    {item.city}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-dark overflow-hidden rounded-[2rem] p-6 sm:p-7">
            <OrbitGlobe
              locations={networkLocations}
              locale={locale as Locale}
              detailed
            />
          </div>
        </div>
      </section>

      <section id="cxix" className="container-shell py-14 sm:py-18">
        <div className="glass-panel overflow-hidden rounded-[2rem] border-white/50 bg-white/80">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="section-tag">{dictionary.cxix.eyebrow}</Badge>
              <div className="space-y-4">
                <h2 className="max-w-2xl text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {dictionary.cxix.title}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-slate-600">
                  {dictionary.cxix.description}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dictionary.cxix.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-slate-200/70 bg-slate-950/[0.03] px-5 py-4"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel-dark rounded-[1.75rem] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.24em] text-cyan-100/65 uppercase">
                    {dictionary.cxix.cardLabel}
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-white">
                    central X
                  </div>
                </div>
                <div className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-cyan-100/80">
                  cxix.net
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-cyan-50/78">
                {dictionary.cxix.cardDescription}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {dictionary.cxix.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/10 bg-black/12 px-4 py-4"
                  >
                    <div className="text-2xl font-semibold text-white">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-100/65">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="https://cxix.net"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 h-12 rounded-full bg-white text-primary hover:bg-white/90",
                )}
              >
                {dictionary.cxix.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="container-shell py-14 sm:py-18">
        <SectionHeading
          eyebrow={dictionary.products.eyebrow}
          title={dictionary.products.title}
          description={dictionary.products.description}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {dictionary.products.items.map((product, index) => (
            <Card
              key={product.title}
              className="glass-panel overflow-hidden border-white/55 bg-white/82"
            >
              <CardContent className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="rounded-[1.8rem] bg-[linear-gradient(145deg,rgba(14,46,86,0.07),rgba(86,184,199,0.12))] p-5">
                  <Image
                    src={index === 0 ? "/switch-line.svg" : "/router-line.svg"}
                    alt={product.imageAlt}
                    width={560}
                    height={380}
                    className="h-auto w-full"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.24em] text-cyan-700 uppercase">
                      {product.label}
                    </div>
                    <h3 className="mt-3 text-3xl font-semibold text-slate-900">
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">
                    {product.description}
                  </p>
                  <div className="space-y-3 text-sm text-slate-700">
                    {product.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-slate-200/70 bg-slate-950/[0.03] px-4 py-3"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="partners" className="container-shell py-14 sm:py-18">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={dictionary.partners.eyebrow}
              title={dictionary.partners.title}
              description={dictionary.partners.description}
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dictionary.partners.items.map((item) => (
                <div
                  key={item.title}
                  className="glass-panel rounded-[1.5rem] px-5 py-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                      <Handshake className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/partners`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "mt-8 h-12 rounded-full border-primary/20 bg-white/75 px-7 text-base text-primary hover:bg-white",
              )}
            >
              {dictionary.partners.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="panel-dark overflow-hidden rounded-[2rem] p-6 sm:p-7">
            <PartnerMarquee logos={partnerLogos} />
          </div>
        </div>
      </section>

      <section id="contact" className="container-shell pt-14 pb-20 sm:pt-18 sm:pb-24">
        <div className="panel-dark relative overflow-hidden rounded-[2.4rem] p-7 sm:p-9 lg:p-12">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(250,215,145,0.18),transparent_55%)] lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="section-tag border-white/15 bg-white/5 text-cyan-100">
                {dictionary.cta.eyebrow}
              </Badge>
              <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                {dictionary.cta.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-cyan-50/80">
                {dictionary.cta.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dictionary.cta.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/7 p-5 backdrop-blur"
                >
                  <div className="text-xs font-semibold tracking-[0.24em] text-cyan-100/65 uppercase">
                    {card.label}
                  </div>
                  <div className="mt-3 text-xl font-semibold text-white">
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-cyan-50/80">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

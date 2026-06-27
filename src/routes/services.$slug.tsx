import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/data/services";
import { ServiceAnimation } from "@/components/service-animation";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { ScrollGlobe } from "@/components/ui/landing-page";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { UIUXMockup } from "@/components/ui/ui-ux-mockup";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { DigitalMarketingPage } from "@/components/ui/digital-marketing-page";
import { BrandingSolutionsPage } from "@/components/ui/branding-solutions-page";
import { MobileAppAnimatedHero } from "@/components/ui/mobile-app-animated-hero";
import { CustomWebApplicationsPage } from "@/components/ui/custom-web-applications-page";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    return {
      meta: [
        { title: `${s?.title ?? "Service"} — TS Tech Studio` },
        { name: "description", content: s?.description ?? "" },
        { property: "og:title", content: `${s?.title ?? "Service"} — TS Tech Studio` },
        { property: "og:description", content: s?.tagline ?? "" },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: s
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: s.title,
                description: s.description,
                provider: { "@type": "Organization", name: "TS Tech Studio" },
              }),
            },
          ]
        : [],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block text-brand">
        ← Back to services
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const isMobileApp = service.slug === "mobile-app-development";
  const isWebsiteDev = service.slug === "website-development";
  const isUiUxDesign = service.slug === "ui-ux-design";
  const isDigitalMarketing = service.slug === "digital-marketing";
  const isBrandingSolutions = service.slug === "branding-solutions";
  const isCustomWebApps = service.slug === "custom-web-applications";

  // Bulletproof GSAP refresh for the entire page to guarantee pin spacers calculate correctly
  useEffect(() => {
    // Wait for a tiny tick to ensure all child components have fully mounted and registered their ScrollTriggers
    const timeout = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeout);
  }, [service.slug]);

  const websiteDevelopmentSections = [
    {
      id: "hero",
      badge: service.category,
      title: service.title,
      subtitle: service.tagline,
      description: service.description,
      align: "left" as const,
      actions: [
        {
          label: "Request this service",
          variant: "primary" as const,
          onClick: () => (window.location.href = "/contact"),
        },
      ],
    },
    {
      id: "features-1",
      badge: "What's included",
      title: "Core Services",
      description:
        "From marketing sites to complex custom web applications, we provide end-to-end development.",
      align: "center" as const,
      features: service.features.slice(0, 3).map((f: string) => ({
        title: f,
        description: `Custom tailored ${f.toLowerCase()} to elevate your digital presence.`,
      })),
    },
    {
      id: "features-2",
      badge: "Advanced Solutions",
      title: "Scalable Platforms",
      subtitle: "Built to perform",
      description: "We focus on building scalable architectures that grow alongside your business.",
      align: "left" as const,
      features: service.features.slice(3).map((f: string) => ({
        title: f,
        description: `High-performance ${f.toLowerCase()} designed for maximum conversion.`,
      })),
    },
    {
      id: "cta",
      badge: "Get Started",
      title: "Ready to build?",
      subtitle: "Let's create together",
      description:
        "Contact us today to discuss your next website project and see how we can help you achieve your goals.",
      align: "center" as const,
      actions: [
        {
          label: "Request this service",
          variant: "primary" as const,
          onClick: () => (window.location.href = "/contact"),
        },
        {
          label: "View Portfolio",
          variant: "secondary" as const,
          onClick: () => (window.location.href = "/services"),
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {isWebsiteDev ? (
        <ScrollGlobe sections={websiteDevelopmentSections} className="pt-20" />
      ) : isMobileApp ? (
        <>
          <MobileAppAnimatedHero />
          <CinematicHero
            brandName="TS Tech"
            tagline1="Native-feel apps,"
            tagline2="every platform."
            cardHeading={service.title}
            cardDescription={service.description}
            metricValue={100}
            metricLabel="Apps Built"
            ctaHeading="Start your project."
            ctaDescription="Contact us to build your mobile application."
            features={service.features}
          />
          {/* Spacer to prevent GSAP pinning cutoffs at absolute document bottom */}
          <div className="h-[15vh] w-full bg-transparent pointer-events-none" />
        </>
      ) : isUiUxDesign ? (
        <div className="flex flex-col bg-[#1c1c1c] text-white">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl md:text-5xl font-semibold text-white px-4">
                  {service.tagline} <br />
                  <span className="text-5xl md:text-[6rem] font-bold mt-2 leading-none text-white block">
                    {service.title}
                  </span>
                </h1>
                <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto px-4">
                  {service.description}
                </p>
              </>
            }
          >
            <UIUXMockup />
          </ContainerScroll>
          <div className="w-full relative z-20 -mt-24 md:-mt-32 pb-8">
            <SplineSceneBasic />
          </div>

          <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 w-full relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8">What's included</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.features.map((f: string) => (
                <li
                  key={f}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-4 shadow-xl"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-500 text-white">
                    <Check className="size-4" />
                  </span>
                  <span className="text-lg text-blue-100/90 font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : isDigitalMarketing ? (
        <DigitalMarketingPage service={service} />
      ) : isBrandingSolutions ? (
        <BrandingSolutionsPage service={service} />
      ) : isCustomWebApps ? (
        <CustomWebApplicationsPage service={service} />
      ) : (
        <div className="mx-auto max-w-6xl px-4 pt-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All services
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                {service.category}
              </span>
              <h1 className="mt-4 flex items-center gap-3 text-4xl font-bold">
                <span>{service.icon}</span> {service.title}
              </h1>
              <p className="mt-3 text-lg text-gradient font-medium">{service.tagline}</p>
              <p className="mt-4 text-muted-foreground">{service.description}</p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                Request this service <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-glow">
              <ServiceAnimation type={service.animation} className="h-56" />
            </div>
          </div>
        </div>
      )}

      {!isMobileApp &&
        !isWebsiteDev &&
        !isUiUxDesign &&
        !isDigitalMarketing &&
        !isBrandingSolutions &&
        !isCustomWebApps && (
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mt-16">
              <h2 className="text-2xl font-bold">What's included</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.features.map((f: string) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-brand text-brand-foreground">
                      <Check className="size-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}

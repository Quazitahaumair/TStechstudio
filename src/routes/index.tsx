import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Check,
  Code2,
  Globe,
  Headphones,
  LayoutDashboard,
  Palette,
  PenTool,
  Rocket,
  ShoppingCart,
  Sparkles,
  Star,
  Workflow,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import WhyChooseUs from "@/components/ui/why-choose-us";
import StickyTabs from "@/components/ui/sticky-section-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TS Tech Studio - Modern Software Agency" },
      {
        name: "description",
        content:
          "TS Tech Studio builds premium websites, e-commerce platforms, web applications, UI/UX systems, and custom software for growing businesses.",
      },
      { property: "og:title", content: "TS Tech Studio - Modern Software Agency" },
      {
        property: "og:description",
        content:
          "Premium digital solutions for restaurants, hotels, local businesses, and startups.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  slug?: string;
  to?: string;
};

type ProjectCard = {
  title: string;
  category: string;
  tech: string[];
  metric: string;
  gradient: string;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const services: ServiceCard[] = [
  {
    title: "Website Development",
    description:
      "High-converting marketing sites, corporate websites, and landing pages built for speed and trust.",
    icon: Globe,
    slug: "website-development",
  },
  {
    title: "Mobile App Development",
    description:
      "High-performance native and cross-platform mobile applications built for seamless user experiences.",
    icon: Smartphone,
    slug: "mobile-app-development",
  },
  {
    title: "Web Applications",
    description:
      "Custom dashboards, portals, and internal tools designed around your workflows and operations.",
    icon: LayoutDashboard,
    slug: "custom-web-applications",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software systems that streamline business processes and create real operational leverage.",
    icon: Code2,
    slug: "custom-web-applications",
  },
  {
    title: "UI/UX Design",
    description:
      "Modern product experiences, wireframes, and design systems that make every interaction feel premium.",
    icon: Palette,
    slug: "ui-ux-design",
  },
  {
    title: "Maintenance & Support",
    description:
      "Reliable updates, monitoring, and support to keep your website fast, secure, and evolving.",
    icon: Headphones,
    to: "/contact",
  },
];

const portfolio: ProjectCard[] = [
  {
    title: "Restaurant Website",
    category: "Booking, menu, and reservations",
    tech: ["Next.js", "SEO", "Reservation Flow"],
    metric: "Faster bookings",
    gradient: "from-teal-500/35 via-cyan-500/20 to-slate-950",
  },
  {
    title: "Hotel Booking Website",
    category: "Luxury stays with room availability",
    tech: ["UI/UX", "Booking Engine", "Responsive"],
    metric: "Higher direct inquiries",
    gradient: "from-sky-500/35 via-cyan-500/20 to-slate-950",
  },
  {
    title: "E-Commerce Store",
    category: "Elegant storefront built to convert",
    tech: ["Shop", "Payments", "Analytics"],
    metric: "More sales, less friction",
    gradient: "from-cyan-500/35 via-teal-500/20 to-slate-950",
  },
  {
    title: "Business Management System",
    category: "Operations dashboard for scale",
    tech: ["Dashboards", "Automations", "Reports"],
    metric: "Smarter daily operations",
    gradient: "from-indigo-500/35 via-sky-500/20 to-slate-950",
  },
];

const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description: "We understand your goals, audience, and the business problem we need to solve.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Planning",
    description: "We define the structure, scope, timeline, and the right stack for the project.",
    icon: Workflow,
  },
  {
    step: "03",
    title: "Design",
    description: "We craft a premium visual direction with strong hierarchy and conversion focus.",
    icon: PenTool,
  },
  {
    step: "04",
    title: "Development",
    description: "We build fast, scalable interfaces with clean code and production-ready quality.",
    icon: Blocks,
  },
  {
    step: "05",
    title: "Testing",
    description: "We review performance, responsiveness, accessibility, and every key interaction.",
    icon: BarChart3,
  },
  {
    step: "06",
    title: "Launch",
    description:
      "We deploy, verify, and hand over a polished digital product that is ready to grow.",
    icon: Rocket,
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "I wanted a professional website for my Al-Imam Dates, Honey & Attar business, and TS Tech Studio exceeded my expectations. They created a beautiful, modern, and user-friendly website that perfectly represents my brand. Highly recommended!",
    name: "Halyal Makhtum Sahab",
    role: "Owner",
    company: "Al-Imam",
  },
  {
    quote:
      "I wanted several improvements and customizations for my existing Shopify website, and TS Tech Studio handled everything perfectly. The final result was clean, fast, and exactly what I was looking for. Great experience working with them!",
    name: "Mohammad Farooq",
    role: "Owner",
    company: "Mukhlis",
  },
  {
    quote:
      "I wanted a stylish and professional website for my clothing business, Stylein Mens Wear. TS Tech Studio created a beautiful website with an attractive design that perfectly matches my brand. I am very satisfied with their work.",
    name: "Adam",
    role: "Founder",
    company: "Stylein Mens Wear",
  },
];

function Home() {
  return (
    <>
      <PrismaHero />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#6B7280] sm:text-lg">{subtitle}</p>
    </div>
  );
}

const serviceImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
];

function ServicesSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const servicesWithImages = services.map((service, i) => ({
    ...service,
    imgSrc: serviceImages[i],
  }));

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 30,
      opacity: 0,
    },
  };

  return (
    <section ref={timelineRef} className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      {/* Animated header */}
      <div className="mx-auto max-w-3xl text-center">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488]"
        >
          What We Do
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl"
        >
          Helping Businesses Succeed Through Technology
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-base leading-7 text-[#6B7280] sm:text-lg"
        >
          We design and build premium digital experiences that help businesses look sharper, convert
          better, and grow with confidence.
        </TimelineContent>
      </div>

      {/* Animated service cards */}
      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {servicesWithImages.map((service, index) => {
          const linkProps = service.slug
            ? { to: "/services/$slug" as const, params: { slug: service.slug } }
            : service.to
              ? { to: service.to as "/contact" }
              : null;

          const cardInner = (
            <motion.div
              transition={{ staggerChildren: 0.03 }}
              whileHover="hover"
              className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-xl bg-slate-200"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${service.imgSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/75" />

              {/* Progressive blur at bottom */}
              <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 h-[30%] w-full"
                blurIntensity={0.5}
              />

              {/* Content */}
              <div className="relative z-20 flex h-full flex-col justify-between p-5 text-white">
                <ArrowRight className="ml-auto size-6 transition-transform duration-500 group-hover:-rotate-45" />
                <div>
                  <h3 className="flex flex-wrap text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{service.description}</p>
                </div>
              </div>
            </motion.div>
          );

          return (
            <TimelineContent
              key={service.title}
              as="div"
              animationNum={index + 3}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="transition-all"
            >
              {linkProps ? (
                <Link
                  {...linkProps}
                  className="block w-full h-full no-underline hover:no-underline"
                >
                  {cardInner}
                </Link>
              ) : (
                cardInner
              )}
            </TimelineContent>
          );
        })}
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return <WhyChooseUs />;
}

const stepDetails: Record<string, { deliverables: string[]; image: string }> = {
  "01": {
    deliverables: [
      "Project Goals Matrix",
      "User Journey Flowmaps",
      "System Requirements Doc",
      "Competitive Landscape Study",
    ],
    image:
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=80",
  },
  "02": {
    deliverables: [
      "Tech Stack Architecture",
      "Database Schema Design",
      "Interactive Sitemap",
      "Detailed Project Milestone Timeline",
    ],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  },
  "03": {
    deliverables: [
      "High-Fidelity Wireframes",
      "Interactive Design Prototype",
      "Tailored Color Palette & Typography",
      "Component-Based UI Library",
    ],
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80",
  },
  "04": {
    deliverables: [
      "Responsive Frontend Layouts",
      "Optimized Backend APIs",
      "Standard Database Setup",
      "Clean Git Repository & Branches",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  },
  "05": {
    deliverables: [
      "Cross-Browser Validation",
      "Lighthouse Performance & SEO Audit",
      "Mobile UI Responsiveness Tests",
      "End-to-End User Flow Checks",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  },
  "06": {
    deliverables: [
      "Domain & Hosting Configurations",
      "Production-Ready Build Assets",
      "Analytics & Conversion Tracking Setup",
      "User Training & Handoff Checklist",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
};

function StepContent({
  stepNumber,
  title,
  description,
  deliverables,
  imageUrl,
  icon: Icon,
}: {
  stepNumber: string;
  title: string;
  description: string;
  deliverables: string[];
  imageUrl: string;
  icon: LucideIcon;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 items-center text-left">
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm lg:text-xs font-semibold tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
            <Icon className="size-3.5" />
            Step {stepNumber}
          </span>
        </div>
        <h3 className="text-3xl lg:text-2xl font-semibold text-white tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-slate-400 text-lg lg:text-base leading-relaxed mb-6">{description}</p>
        <div className="border-t border-white/10 pt-6">
          <p className="text-sm lg:text-xs font-semibold text-teal-400 uppercase tracking-wider mb-4">
            Key Deliverables
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base lg:text-sm text-slate-300">
                <Check className="size-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
        <div className="relative group w-full max-w-sm">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500/20 to-indigo-500/20 opacity-30 blur-lg transition duration-500 group-hover:opacity-50" />
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 backdrop-blur-sm shadow-2xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-[200px] sm:h-[250px] object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  return (
    <section
      id="process-section-root"
      className="relative bg-black pt-12 pb-4 border-t border-white/10"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">Process</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Our Development Process
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            A clean and transparent workflow keeps projects organized, efficient, and easy to trust.
          </p>
        </div>
      </div>

      <StickyTabs
        mainNavHeight="4rem"
        rootClassName="bg-transparent text-white relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-0 pb-8"
        navSpacerClassName="h-0 bg-transparent"
        sectionClassName="w-[92%] max-w-4xl mx-auto bg-transparent sticky top-[5.5rem] mb-12 relative"
        stickyHeaderContainerClassName="w-full z-10"
        headerContentWrapperClassName="bg-black border-t border-x border-white/10 shadow-lg"
        headerContentLayoutClassName="px-6 py-4"
        titleClassName="my-0 text-lg font-semibold leading-none md:text-xl text-teal-400"
        contentLayoutClassName="w-full bg-zinc-900 border-b border-x border-white/10 px-6 py-8 lg:py-16 lg:px-10 shadow-xl min-h-[360px] lg:min-h-[380px] flex items-center"
      >
        {process.map((step) => {
          const details = stepDetails[step.step];
          return (
            <StickyTabs.Item
              key={step.step}
              title={`Step ${step.step}: ${step.title}`}
              id={`step-${step.step}`}
            >
              <StepContent
                stepNumber={step.step}
                title={step.title}
                description={step.description}
                deliverables={details.deliverables}
                imageUrl={details.image}
                icon={step.icon}
              />
            </StickyTabs.Item>
          );
        })}
        <StickyTabs.Item title="blank" id="ready-to-build">
          <div className="w-full h-full" />
        </StickyTabs.Item>
      </StickyTabs>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "10+", label: "Projects Delivered" },
    { value: "10+", label: "Happy Clients" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-[1.75rem] border border-[#E5E7EB] bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(15,23,42,0.12)]"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <p className="font-display text-4xl font-semibold text-[#111827] sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#6B7280]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="border-y border-[#E5E7EB] bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by business owners"
          subtitle="Real feedback from teams that wanted a stronger digital presence and a smoother way to grow."
          centered
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-[1.75rem] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.12)]"
            >
              <div className="flex gap-1 text-[#0D9488]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-7 text-[#6B7280]">
                "{item.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div>
                  <p className="font-medium text-[#111827]">{item.name}</p>
                  <p className="text-sm text-[#9CA3AF]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services, Service } from "@/data/services";
import { renderCanvas, cleanUpCanvas } from "@/components/ui/canvas";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — TS Tech Studio" },
      {
        name: "description",
        content:
          "Website development, mobile apps, UI/UX design, digital marketing, and branding services from TS Tech Studio.",
      },
      { property: "og:title", content: "Services — TS Tech Studio" },
      {
        property: "og:description",
        content: "End-to-end digital solutions designed to help your business grow.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const serviceImages: Record<string, string> = {
  "website-development":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  "mobile-app-development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
  "ui-ux-design":
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop",
  "digital-marketing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  "branding-solutions":
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
  "custom-web-applications":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
};

const serviceGradients: Record<string, string> = {
  "website-development": "from-teal-800 to-cyan-950",
  "mobile-app-development": "from-indigo-800 to-purple-950",
  "ui-ux-design": "from-rose-800 to-pink-950",
  "digital-marketing": "from-sky-800 to-blue-950",
  "branding-solutions": "from-amber-800 to-orange-950",
  "custom-web-applications": "from-emerald-800 to-teal-950",
};

interface AccordionItemProps {
  service: Service;
  index: number;
  isActive: boolean;
  setActiveIndex: (index: number) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  service,
  index,
  isActive,
  setActiveIndex,
}) => {
  const imageUrl = serviceImages[service.slug] || "";
  const gradient = serviceGradients[service.slug] || "from-zinc-800 to-zinc-900";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (isMobile) {
      if (!isActive) {
        e.preventDefault();
        setActiveIndex(index);
        const target = e.currentTarget;

        // Scroll once at start of transition
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }, 50);

        // Scroll again near completion to lock exact center position
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }, 250);
      }
    } else {
      if (!isActive) {
        e.preventDefault();
        setActiveIndex(index);
      }
    }
  };

  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      onClick={handleClick}
      onMouseEnter={() => setActiveIndex(index)}
      className={`
        group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer block transition-all duration-300 md:duration-700 ease-in-out bg-gradient-to-br ${gradient} shadow-lg
        ${isActive ? "flex-grow flex-1 min-w-[280px] sm:min-w-[400px]" : "w-[60px] shrink-0"}
      `}
    >
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = "none";
          }}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-between p-5 text-white z-10">
        {/* Top bar of card */}
        <div className="flex items-center justify-between w-full">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            {service.category}
          </span>
          <div className="bg-white/10 backdrop-blur-md size-9 rounded-full flex items-center justify-center border border-white/10 text-lg shrink-0">
            {service.icon}
          </div>
        </div>

        {/* Inactive state content */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-xs font-semibold tracking-wider uppercase opacity-75 whitespace-nowrap select-none -rotate-90 origin-center animate-fade-in">
              {service.title}
            </span>
          </div>
        )}

        {/* Active state content */}
        {isActive && (
          <div className="mt-auto space-y-3 animate-fade-in">
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight">{service.title}</h3>
            <p className="text-teal-300 text-xs sm:text-sm font-semibold">{service.tagline}</p>
            <p className="text-gray-200 text-xs sm:text-sm line-clamp-3 leading-relaxed">
              {service.description}
            </p>

            {/* Features list */}
            <div className="pt-2 border-t border-white/10">
              <ul className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-gray-300">
                {service.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-1">
                    <span className="text-teal-400 font-bold">✓</span>
                    <span className="line-clamp-1">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center text-xs font-bold text-teal-300">
              <span className="inline-flex items-center gap-1 hover:text-teal-200">
                Learn More <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const isScrollable = el.scrollWidth > el.clientWidth;
      if (!isScrollable) return;

      const isAtLeft = el.scrollLeft <= 0 && e.deltaY < 0;
      const isAtRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;

      if (!isAtLeft && !isAtRight) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 0.8;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  React.useEffect(() => {
    renderCanvas();
    return () => {
      cleanUpCanvas();
    };
  }, []);

  return (
    <div
      className="bg-white dark:bg-black font-sans w-full min-h-screen relative"
      style={{ background: "linear-gradient(160deg, #F8FAFC 0%, #F0FDFA 100%)" }}
    >
      <section className="relative overflow-hidden w-full pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col items-center justify-center border-b border-border/50">
        <canvas
          className="pointer-events-none absolute inset-0 mx-auto w-full h-full"
          id="canvas"
        />
        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          {/* Hero text box with borders */}
          <div className="w-full max-w-5xl px-2 mb-8 animate-rise [animation-delay:150ms]">
            <div className="relative mx-auto border border-border/80 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-[2px] p-8 md:p-16">
              <h1 className="select-none text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                Complete Platform for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-400 to-emerald-500">
                  Digital Excellence
                </span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                End-to-end digital solutions designed to help your business grow online — from
                concept to launch and beyond. Explore our interactive categories below.
              </p>

              {/* Available indicator */}
              <div className="mt-6 flex items-center justify-center gap-1.5">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                <p className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                  Available Now
                </p>
              </div>
            </div>
          </div>

          {/* Stats & Call to Action */}
          <div className="flex flex-col items-center gap-6 z-10 w-full animate-rise [animation-delay:300ms]">
            <div className="flex flex-wrap justify-center gap-3.5">
              {[
                { val: "6+", label: "Services" },
                { val: "10+", label: "Projects" },
                { val: "99%", label: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-5 py-3 shadow-sm text-left min-w-[110px]"
                >
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{s.val}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-8 py-3.5 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl text-sm"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#services-list"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services-list")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center bg-white/80 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-border/80 dark:border-white/10 font-semibold px-8 py-3.5 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
              >
                View Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion container */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div id="services-list" className="w-full overflow-hidden relative z-10">
          <div
            ref={scrollRef}
            className="flex flex-row items-center justify-start gap-3 overflow-x-auto p-4 no-scrollbar scroll-smooth w-full"
          >
            {services.map((service, index) => (
              <AccordionItem
                key={service.slug}
                service={service}
                index={index}
                isActive={index === activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
            {/* Gutter spacer at the end to prevent horizontal scroll padding ignore cutting */}
            <div className="w-6 sm:w-12 shrink-0 h-4" />
          </div>
        </div>
      </section>
    </div>
  );
}

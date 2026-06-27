import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/data/services";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";
import BlurText from "@/components/ui/blur-text";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Testimonials — TS Tech Studio" },
      {
        name: "description",
        content:
          "What our clients say about working with TS Tech Studio, and the digital solutions we've shipped.",
      },
      { property: "og:title", content: "Testimonials — TS Tech Studio" },
      { property: "og:description", content: "What our clients say about working with us." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

type Filter = ServiceCategory | "All";

const avatars: Record<string, string> = {
  "al-imam-dates":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  "mukhlis-shopify":
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  "stylein-mens-wear":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
};

// Construct the columns dynamically based on the filtered list of items
const getColumns = (items: Project[]) => {
  if (items.length === 0) return [[], []];
  if (items.length === 1) return [[items[0]], []];

  const col1: Project[] = [];
  const col2: Project[] = [];

  items.forEach((item, index) => {
    if (index % 2 === 0) col1.push(item);
    else col2.push(item);
  });

  return [col1, col2];
};

const ProjectsColumn = (props: {
  className?: string;
  projects: Project[];
  duration?: number;
  reverse?: boolean;
}) => {
  // If we only have 1 or 2 items, adjust repeat settings so the marquee works smoothly
  const repeatCount = props.projects.length <= 2 ? 4 : 2;

  return (
    <div className={props.className}>
      <motion.ul
        initial={{
          translateY: props.reverse ? "-50%" : "0%",
        }}
        animate={{
          translateY: props.reverse ? "0%" : "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {Array.from({ length: repeatCount }).map((_, index) => (
          <React.Fragment key={index}>
            {props.projects.map(({ slug, title, client, category, summary, tags }) => (
              <motion.li
                key={`${index}-${slug}`}
                aria-hidden={index > 0 ? "true" : "false"}
                tabIndex={index > 0 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(13, 148, 136, 0.08), 0 10px 10px -5px rgba(13, 148, 136, 0.04), 0 0 0 1px rgba(13, 148, 136, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(13, 148, 136, 0.08), 0 10px 10px -5px rgba(13, 148, 136, 0.04), 0 0 0 1px rgba(13, 148, 136, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="p-8 rounded-[1.75rem] border border-slate-200/60 shadow-xl bg-white max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30"
              >
                <blockquote className="m-0 p-0">
                  <p className="text-slate-600 leading-relaxed font-normal m-0 text-sm">
                    "{summary}"
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-500 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <footer className="flex items-center gap-3 mt-5">
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight leading-4 text-slate-900 text-sm">
                        {client}
                      </cite>
                      <span className="text-[11px] leading-4 tracking-tight text-slate-400 mt-0.5">
                        {category} Project
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showRest, setShowRest] = useState(false);
  const filters: Filter[] = ["All", ...SERVICE_CATEGORIES];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const [col1, col2, col3] = getColumns(visible);

  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background Sparkles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="tsparticlesportfolio"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={45}
          className="w-full h-full"
          particleColor="#0D9488"
          speed={0.8}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <header className="text-center flex flex-col items-center justify-center">
          <BlurText
            text="What our clients say"
            delay={60}
            animateBy="words"
            direction="bottom"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D9488] justify-center"
          />
          <BlurText
            text="Testimonials"
            delay={80}
            animateBy="letters"
            direction="top"
            className="mt-2 text-4xl font-bold sm:text-5xl text-slate-900 tracking-tight justify-center"
          />
          <BlurText
            text="Discover how growing brands, restaurants, hotels, and startups succeed and streamline their operations with TS Tech Studio."
            delay={20}
            animateBy="words"
            direction="bottom"
            className="mx-auto mt-4 max-w-2xl text-slate-500 text-sm sm:text-base leading-relaxed justify-center"
            onAnimationComplete={() => setShowRest(true)}
          />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showRest ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(!showRest && "pointer-events-none")}
        >
          <div
            className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[640px] overflow-hidden"
            role="region"
            aria-label="Scrolling Client Testimonials"
          >
            {col1.length > 0 && <ProjectsColumn projects={col1} duration={col1.length * 9} />}
            {col2.length > 0 && (
              <ProjectsColumn
                projects={col2}
                className="hidden md:block"
                duration={col2.length * 11}
                reverse
              />
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-brand font-medium hover:text-[#2dd4bf] transition-colors"
            >
              Read the full case studies <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

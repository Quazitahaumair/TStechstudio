import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Database, Cloud, Globe, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import IntegrationHero from "@/components/ui/integration-hero";

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — TS Tech Studio" },
      {
        name: "description",
        content:
          "The modern and powerful technology stack we use to build secure, scalable, and responsive digital products.",
      },
      { property: "og:title", content: "Technologies — TS Tech Studio" },
      { property: "og:description", content: "Explore our modern development stack." },
      { property: "og:url", content: "/technologies" },
    ],
    links: [{ rel: "canonical", href: "/technologies" }],
  }),
  component: TechnologiesPage,
});

type TechCategory = "Frontend" | "Backend" | "Database" | "Cloud" | "Hosting";

interface TechItem {
  name: string;
  category: TechCategory;
  description: string;
  gradient: string;
  borderGlow: string;
  badgeColor: string;
}

const techStack: TechItem[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    description: "Component-based library for building dynamic and interactive user interfaces.",
    gradient: "from-sky-500/20 to-blue-500/5",
    borderGlow: "group-hover:border-sky-500/30",
    badgeColor: "bg-sky-500/10 text-sky-600",
  },
  {
    name: "Angular",
    category: "Frontend",
    description: "Enterprise-ready framework for structured and scalable web applications.",
    gradient: "from-red-500/20 to-orange-500/5",
    borderGlow: "group-hover:border-red-500/30",
    badgeColor: "bg-red-500/10 text-red-600",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Typed superset of JavaScript, preventing compile-time bugs and ensuring structure.",
    gradient: "from-blue-600/20 to-indigo-500/5",
    borderGlow: "group-hover:border-blue-600/30",
    badgeColor: "bg-blue-600/10 text-blue-600",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "The native programming language powering dynamic behavior across the modern web.",
    gradient: "from-yellow-500/20 to-amber-500/5",
    borderGlow: "group-hover:border-yellow-500/30",
    badgeColor: "bg-yellow-500/10 text-amber-600",
  },
  {
    name: "HTML5",
    category: "Frontend",
    description: "The markup standard providing semantic structure for clean, accessible interfaces.",
    gradient: "from-orange-500/20 to-red-500/5",
    borderGlow: "group-hover:border-orange-500/30",
    badgeColor: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "CSS3 & Tailwind",
    category: "Frontend",
    description: "Modern layout styling engines ensuring fully responsive, adaptive UI designs.",
    gradient: "from-teal-500/20 to-cyan-500/5",
    borderGlow: "group-hover:border-teal-500/30",
    badgeColor: "bg-teal-500/10 text-teal-600",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime built on V8, serving high-concurrency connections efficiently.",
    gradient: "from-green-500/20 to-emerald-500/5",
    borderGlow: "group-hover:border-green-500/30",
    badgeColor: "bg-green-500/10 text-green-600",
  },
  {
    name: "Express",
    category: "Backend",
    description: "Minimalist web framework for Node.js, providing robust tooling for REST APIs.",
    gradient: "from-neutral-500/20 to-slate-500/5",
    borderGlow: "group-hover:border-neutral-500/30",
    badgeColor: "bg-neutral-500/10 text-neutral-600",
  },
  {
    name: "NestJS",
    category: "Backend",
    description: "Progressive Node.js framework for building efficient, reliable, and testable backend systems.",
    gradient: "from-red-600/20 to-rose-500/5",
    borderGlow: "group-hover:border-red-600/30",
    badgeColor: "bg-red-600/10 text-red-600",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Powerful, open-source object-relational database system with high data integrity.",
    gradient: "from-blue-700/20 to-indigo-600/5",
    borderGlow: "group-hover:border-blue-700/30",
    badgeColor: "bg-blue-700/10 text-blue-700",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Document-oriented NoSQL database designed for fast development and dynamic schemas.",
    gradient: "from-green-600/20 to-lime-600/5",
    borderGlow: "group-hover:border-green-600/30",
    badgeColor: "bg-green-600/10 text-green-700",
  },

  // Cloud
  {
    name: "AWS Cloud",
    category: "Cloud",
    description: "Broad, secure cloud infrastructure platform offering scalable computing, networking, and security.",
    gradient: "from-orange-400/20 to-amber-500/5",
    borderGlow: "group-hover:border-orange-400/30",
    badgeColor: "bg-orange-400/10 text-orange-600",
  },
  {
    name: "Google Cloud (GCP)",
    category: "Cloud",
    description: "Global cloud platform with leading analytics, container management (GKE), and machine learning.",
    gradient: "from-blue-500/20 to-red-500/5",
    borderGlow: "group-hover:border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Microsoft Azure",
    category: "Cloud",
    description: "Flexible enterprise-grade cloud solution for integration, serverless logic, and identity services.",
    gradient: "from-sky-600/20 to-indigo-500/5",
    borderGlow: "group-hover:border-sky-600/30",
    badgeColor: "bg-sky-600/10 text-sky-600",
  },

  // Hosting
  {
    name: "Vercel",
    category: "Hosting",
    description: "The optimal hosting platform for Next.js, static assets, and edge serverless deployment.",
    gradient: "from-neutral-900/20 to-neutral-700/5",
    borderGlow: "group-hover:border-neutral-950/30",
    badgeColor: "bg-neutral-900/10 text-neutral-800",
  },
  {
    name: "Netlify",
    category: "Hosting",
    description: "Fast web platform for deploying modern static and Jamstack architectures with serverless functions.",
    gradient: "from-teal-400/20 to-cyan-500/5",
    borderGlow: "group-hover:border-teal-400/30",
    badgeColor: "bg-teal-400/10 text-teal-600",
  },
  {
    name: "Render",
    category: "Hosting",
    description: "Cloud application platform to host web servers, background jobs, cron tasks, and databases in one interface.",
    gradient: "from-indigo-500/20 to-violet-500/5",
    borderGlow: "group-hover:border-indigo-500/30",
    badgeColor: "bg-indigo-500/10 text-indigo-600",
  },
  {
    name: "Amazon Web Services (AWS)",
    category: "Hosting",
    description: "Full virtual server instances (EC2) and container clusters (ECS/EKS) for large-scale custom application environments.",
    gradient: "from-yellow-600/20 to-amber-600/5",
    borderGlow: "group-hover:border-yellow-600/30",
    badgeColor: "bg-yellow-600/10 text-amber-700",
  },
];

const categoryIcons: Record<TechCategory, any> = {
  Frontend: Cpu,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  Hosting: Globe,
};

const categoryStyles: Record<
  TechCategory,
  { gradient: string; activeBorder: string; hoverBg: string; text: string; bgTint: string }
> = {
  Frontend: {
    gradient: "from-sky-500/20 to-blue-500/5",
    activeBorder: "border-sky-500/30",
    hoverBg: "hover:bg-sky-500/[0.02]",
    text: "text-sky-600",
    bgTint: "bg-sky-500/10",
  },
  Backend: {
    gradient: "from-green-500/20 to-emerald-500/5",
    activeBorder: "border-green-500/30",
    hoverBg: "hover:bg-green-500/[0.02]",
    text: "text-green-600",
    bgTint: "bg-green-500/10",
  },
  Database: {
    gradient: "from-blue-700/20 to-indigo-600/5",
    activeBorder: "border-blue-700/30",
    hoverBg: "hover:bg-blue-700/[0.02]",
    text: "text-blue-700",
    bgTint: "bg-blue-700/10",
  },
  Cloud: {
    gradient: "from-orange-400/20 to-amber-500/5",
    activeBorder: "border-orange-400/30",
    hoverBg: "hover:bg-orange-400/[0.02]",
    text: "text-orange-600",
    bgTint: "bg-orange-400/10",
  },
  Hosting: {
    gradient: "from-indigo-500/20 to-violet-500/5",
    activeBorder: "border-indigo-500/30",
    hoverBg: "hover:bg-indigo-500/[0.02]",
    text: "text-indigo-600",
    bgTint: "bg-indigo-500/10",
  },
};

function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | null>("Frontend");

  const categories: TechCategory[] = ["Frontend", "Backend", "Database", "Cloud", "Hosting"];

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <IntegrationHero />

      <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-24 sm:pb-28">
        {/* Main Interactive Columns Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[480px] w-full items-stretch select-none">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat];
          const style = categoryStyles[cat];
          const isActive = activeCategory === cat;
          const columnTech = techStack.filter((tech) => tech.category === cat);

          return (
            <div
              key={cat}
              onMouseEnter={() => {
                if (!isActive) {
                  setActiveCategory(cat);
                }
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveCategory(cat);
                }
              }}
              className={cn(
                "rounded-[2rem] border transition-all duration-500 flex flex-col overflow-hidden relative group",
                isActive
                  ? "flex-[3.5] border-teal-500/30 bg-white shadow-xl p-8 cursor-default"
                  : "flex-[0.7] border-border bg-slate-50/50 hover:bg-slate-100/80 cursor-pointer p-6 items-center justify-center text-center lg:min-w-[80px]"
              )}
            >
              {/* Glow backdrop on hover */}
              <div
                className={cn(
                  "absolute -right-20 -top-20 size-48 rounded-full bg-gradient-to-br blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                  style.gradient
                )}
              />

              {isActive ? (
                // Active column full view
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col h-full w-full"
                >
                  {/* Active Header */}
                  <div 
                    className="flex items-center justify-between border-b border-slate-100 pb-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(null);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn("grid size-12 place-items-center rounded-2xl", style.bgTint, style.text)}>
                        <Icon className="size-6" />
                      </span>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Category</span>
                        <h2 className="text-xl font-bold tracking-tight text-slate-800">{cat}</h2>
                      </div>
                    </div>
                    
                    <button
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCategory(null);
                      }}
                    >
                      Close ✕
                    </button>
                  </div>

                  {/* Sub-grid list of tech items */}
                  <div 
                    className="mt-6 flex-1 overflow-y-auto pr-1 grid gap-4 sm:grid-cols-2 max-h-[320px] lg:max-h-[340px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {columnTech.map((tech) => (
                      <div
                        key={tech.name}
                        className="rounded-2xl border border-slate-100 bg-[#FDFDFD] p-5 shadow-sm hover:border-[#0D9488]/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800">{tech.name}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-slate-500">{tech.description}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-end">
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            Production ready <ArrowRight className="size-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Inactive column compact vertical bar
                <div className="flex lg:flex-col items-center justify-between lg:justify-between h-full w-full gap-4 lg:py-6">
                  {/* Icon */}
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[#CCFBF1] group-hover:text-[#0D9488] transition-colors duration-300")}>
                    <Icon className="size-5" />
                  </span>

                  {/* Vertical category label on desktop, normal row text on mobile */}
                  <div className="lg:my-auto shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-800 transition-colors duration-300 lg:[writing-mode:vertical-lr] lg:rotate-180">
                      {cat}
                    </span>
                  </div>

                  {/* Count badge */}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 group-hover:bg-slate-200/60 group-hover:text-slate-600 transition-all duration-300">
                    {columnTech.length}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Consult section */}
      <div className="mt-20 rounded-[2.5rem] border border-border/80 bg-slate-50 p-8 sm:p-12 text-center relative overflow-hidden group">
        <div className="absolute -inset-10 bg-gradient-to-tr from-[#2DD4BF]/5 to-[#0ea5e9]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <h2 className="text-3xl font-semibold text-[#111827] tracking-tight">Need a custom technical stack?</h2>
        <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          We construct architecture tailored specifically for your app constraints. Let's align on a plan that fulfills your scale, security, and project timeline goals.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-sm shadow-teal-500/20"
          >
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

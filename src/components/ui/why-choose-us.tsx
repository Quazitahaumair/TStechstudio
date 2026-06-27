import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Palette,
  ShieldCheck,
  Target,
  BarChart3,
  Headphones,
  MessageSquare,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import SpotlightCard from "@/components/ui/spotlight-card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
  spotlightColor: string;
  label: string;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: "Modern & Responsive Design",
    description:
      "Pixel-perfect interfaces for every screen — from mobile to 4K. First impressions matter and yours will be flawless.",
    iconColor: "text-[#0D9488]",
    iconBg: "bg-[#0D9488]/10",
    spotlightColor: "rgba(13, 148, 136, 0.06)",
    label: "Design",
  },
  {
    icon: ShieldCheck,
    title: "Fast & Secure Development",
    description:
      "Performance-optimized, security-hardened code. Your site loads instantly and your customers trust it completely.",
    iconColor: "text-[#4F46E5]",
    iconBg: "bg-[#4F46E5]/10",
    spotlightColor: "rgba(79, 70, 229, 0.06)",
    label: "Security",
  },
  {
    icon: Target,
    title: "Business-Focused Solutions",
    description:
      "Every decision tied to your goals. We build to convert, retain, and grow — not just to ship something fast.",
    iconColor: "text-[#D97706]",
    iconBg: "bg-[#D97706]/10",
    spotlightColor: "rgba(217, 119, 6, 0.06)",
    label: "Strategy",
  },
  {
    icon: BarChart3,
    title: "Scalable Architecture",
    description:
      "Systems built to handle growth without breaking. From your first 100 visitors to your millionth, we've got it covered.",
    iconColor: "text-[#059669]",
    iconBg: "bg-[#059669]/10",
    spotlightColor: "rgba(5, 150, 105, 0.06)",
    label: "Growth",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "A reliable partner available post-launch to monitor, maintain, and evolve your product as your business scales.",
    iconColor: "text-[#DB2777]",
    iconBg: "bg-[#DB2777]/10",
    spotlightColor: "rgba(219, 39, 119, 0.06)",
    label: "Support",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "No black boxes. Clear timelines, honest updates, and full visibility into every milestone of your project.",
    iconColor: "text-[#EA580C]",
    iconBg: "bg-[#EA580C]/10",
    spotlightColor: "rgba(234, 88, 12, 0.06)",
    label: "Clarity",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[#EFE6D5] bg-[#F5EDE0] py-12 sm:py-16 px-4"
    >
      {/* ── Ambient depth glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#2DD4BF]/6 blur-[130px]" />
        <div className="absolute -bottom-20 left-0 h-[350px] w-[450px] rounded-full bg-[#0D9488]/4 blur-[110px]" />
        <div className="absolute -bottom-10 right-0 h-[300px] w-[400px] rounded-full bg-[#DB2777]/3 blur-[100px]" />
      </div>

      {/* ── Subtle dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #0D9488 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-[#0D9488]/20 bg-[#0D9488]/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0D9488]">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Why Businesses Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-brand">TS Tech Studio</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6B7280] sm:text-lg">
            We combine strategy, design, and engineering into a partner experience that feels
            premium from first call to final launch.
          </p>

          <div
            className="mx-auto mt-8 h-px w-36"
            style={{
              background: "linear-gradient(90deg, transparent, #0D9488, transparent)",
            }}
          />
        </motion.div>

        {/* ── SpotlightCard Grid ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={cardVariants}>
                <SpotlightCard
                  spotlightColor={feature.spotlightColor}
                  className="h-full border-[#EFE6D5] bg-white p-7 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 hover:border-[#0D9488]/30 hover:shadow-md"
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 inline-flex items-center justify-center rounded-xl p-3.5 ${feature.iconBg} transition-transform duration-300`}
                  >
                    <Icon className={`size-5 ${feature.iconColor}`} />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${feature.iconColor}`}
                  >
                    {feature.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-[1.05rem] font-semibold leading-snug text-[#111827] mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-7 text-[#6B7280]">{feature.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-6 h-px w-12 rounded-full opacity-50 mx-auto"
                    style={{
                      background: feature.iconColor.replace("text-[", "").replace("]", ""),
                    }}
                  />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0D9488] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0F766E] hover:scale-[1.02] hover:shadow-[0_0_32px_-8px_rgba(45,212,191,0.5)]"
          >
            Start Your Project <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-[#EFE6D5] bg-white px-8 py-3.5 text-sm font-semibold text-neutral-600 transition-all duration-300 hover:border-[#0D9488] hover:text-[#0D9488] hover:bg-[#F5EDE0]"
          >
            Learn About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

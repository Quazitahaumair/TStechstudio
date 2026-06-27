import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Type, Box, Package, LayoutTemplate } from "lucide-react";

export function BrandingSolutionsPage({ service }: { service: any }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.2 },
  };

  return (
    <div className="w-full bg-[#000000] text-slate-50 font-sans selection:bg-violet-500/30">
      {/* HERO SECTION */}
      <section className="relative min-h-[100vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 overflow-hidden pt-40 pb-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-[1px] bg-violet-500" />
            <span className="text-sm font-medium tracking-[0.2em] text-violet-400 uppercase">
              Identity · Packaging
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[1.05]"
          >
            {service.title || "Branding Solutions"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed"
          >
            {service.description ||
              "Memorable brand systems — from logo design to full corporate identity — that communicate trust and quality."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-violet-500 hover:text-white transition-colors duration-300"
            >
              Start a Project
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* APPROACH SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#000000] relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl">
              The strategic spine your visuals will hang on. We learn the soul before we touch the
              surface.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16"
          >
            {[
              {
                title: "Discovery & Strategy",
                desc: "Workshops, audits, audience deep-dives. We learn the soul before we touch the surface.",
                num: "01",
              },
              {
                title: "Foundation",
                desc: "Positioning, story, naming. The strategic spine your visuals will hang on.",
                num: "02",
              },
              {
                title: "Design & Implementation",
                desc: "Identity systems, motion, packaging, web. Every detail intentional.",
                num: "03",
              },
              {
                title: "Launch & Beyond",
                desc: "Guidelines, templates, training. We make sure the brand lives beyond the launch.",
                num: "04",
              },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="group flex flex-col relative">
                <div className="absolute -left-4 top-0 text-6xl md:text-8xl font-bold text-white/[0.03] group-hover:text-white/[0.05] transition-colors -z-10">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-colors">
                  <span className="text-sm font-medium">{step.num}</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Built to Last
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every touchpoint meticulously crafted for impact and longevity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Compass,
                title: "Timeless Identity",
                desc: "Marks built to last decades, not trends.",
              },
              {
                icon: Type,
                title: "Brand Voice",
                desc: "Names with sound, story and SEO.",
              },
              {
                icon: Package,
                title: "Packaging",
                desc: "Shelf-stopping, hand-feel-first design.",
              },
              {
                icon: LayoutTemplate,
                title: "Design Systems",
                desc: "Templates, motion, content engines.",
              },
              {
                icon: Box,
                title: "Digital Presence",
                desc: "Editorial, performant, conversion-led.",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-colors flex flex-col items-start ${i === 3 ? "md:col-span-2 lg:col-span-1" : i === 4 ? "md:col-span-3 lg:col-span-2" : ""}`}
              >
                <div className="p-4 rounded-2xl bg-white/5 mb-6 text-violet-400">
                  <feat.icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 font-light">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 {...fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Ready to stand out?
          </motion.h2>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-lg font-medium bg-white text-black px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Let's talk <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

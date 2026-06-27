import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Code2,
  Palette,
  Headphones,
  Award,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
  Star,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
} from "framer-motion";
import { Link } from "@tanstack/react-router";

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "Web Development",
      description:
        "We craft high-converting marketing sites, corporate websites, and landing pages that load fast, rank well, and build trust with every visitor.",
      position: "left",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "E-Commerce",
      description:
        "Premium storefronts with smooth checkout flows, product management, and strong sales performance built to convert visitors into loyal customers.",
      position: "left",
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "Web Applications",
      description:
        "Custom dashboards, portals, and internal tools designed around your workflows — built to scale with your business and streamline operations.",
      position: "left",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "Custom Software",
      description:
        "Tailored software systems that automate business processes, eliminate bottlenecks, and create real operational leverage for growing teams.",
      position: "right",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "UI/UX Design",
      description:
        "Modern product experiences, wireframes, and design systems that make every interaction feel premium, intuitive, and conversion-focused.",
      position: "right",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#2DD4BF]" />,
      title: "Support & Maintenance",
      description:
        "Reliable updates, monitoring, and ongoing support to keep your digital products fast, secure, and continuously improving after launch.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Award />, value: 10, label: "Projects Delivered", suffix: "+" },
    { icon: <Users />, value: 10, label: "Happy Clients", suffix: "+" },
    { icon: <Calendar />, value: 3, label: "Years Experience", suffix: "+" },
    { icon: <TrendingUp />, value: 99, label: "Satisfaction Rate", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-gradient-to-b from-[#F0FDFA] to-[#F8FAFC] text-[#111827] overflow-hidden relative"
    >
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#0D9488]/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2DD4BF]/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#0D9488]/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#2DD4BF]/30"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-[#0D9488] font-medium mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            DISCOVER OUR STORY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">About Us</h2>
          <motion.div
            className="w-24 h-1 bg-[#0D9488]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-[#111827]/70 leading-relaxed"
          variants={itemVariants}
        >
          We are a passionate team of developers and designers dedicated to building
          modern, results-driven digital products. With attention to detail and a
          commitment to quality, we help businesses grow with confidence online.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((s) => s.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-md overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
                  alt="TS Tech Studio — Developer at work"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link to="/portfolio">
                    <motion.span
                      className="bg-white text-[#0D9488] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Our Portfolio <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 border-4 border-[#2DD4BF] rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating accent circles */}
              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#0D9488]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#2DD4BF]/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0D9488]"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2DD4BF]"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((s) => s.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 bg-[#0F172A] text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">Ready to build something great?</h3>
            <p className="text-white/70">
              Let's turn your idea into a premium digital product.
            </p>
          </div>
          <Link to="/contact">
            <motion.span
              className="inline-flex bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-3 rounded-lg items-center gap-2 font-medium transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- ServiceItem ---
interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: Variants;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#0D9488] bg-[#0D9488]/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#0D9488]/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-[#111827] group-hover:text-[#0D9488] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-[#111827]/70 leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-[#0D9488] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

// --- StatCounter ---
interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white border border-slate-100/90 p-6 rounded-xl flex flex-col items-center text-center group hover:shadow-md transition-all duration-300 shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#111827]/5 flex items-center justify-center mb-4 text-[#0D9488] group-hover:bg-[#0D9488]/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-slate-800 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-slate-500 font-medium text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#0D9488] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

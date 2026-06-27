"use client";

import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Zap,
} from "lucide-react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export const products = [
  {
    title: "CloudERP Enterprise",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "SaaS Analytics Engine",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "OmniChannel CRM Portal",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "CareFlow Patient Portal",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "SecurePay Merchant Desk",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "LogiRoute Fleet Console",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "EduLearn LMS System",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "DevOps Cluster Portal",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "StockFlow Warehouse Hub",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "AIPower LLM Playground",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "TalentMatch ATS",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "RealEstate Client Desk",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "SyncCollab Workspace",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "TeleDoc Virtual Clinic",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Marketo Campaign Manager",
    link: "/contact",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
];

export function CustomWebApplicationsPage({ service }: { service: any }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" },
  } as const;

  const features = [
    {
      title: "SaaS Platforms",
      description:
        "Multi-tenant architectures built for scale, containing subscription models, robust user permissions, and custom features.",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Admin Dashboards",
      description:
        "Intelligent analytics panels with real-time charting, interactive tables, and complete user and resource management controls.",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Client Portals",
      description:
        "Secure, customized client-facing environments enabling seamless interactions, file sharing, and self-service features.",
      icon: Globe,
      color: "from-teal-500 to-emerald-500",
    },
    {
      title: "API Integrations",
      description:
        "Highly integrated system architectures connecting third-party services, webhooks, and custom APIs efficiently and securely.",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const benefits = [
    {
      title: "Enterprise Grade Security",
      desc: "Robust authentication, end-to-end data encryption, and compliance-ready deployment setups.",
      icon: Lock,
    },
    {
      title: "High Performance Databases",
      desc: "Optimized SQL and NoSQL database schemas built for high availability and low latency query execution.",
      icon: Database,
    },
  ];

  return (
    <div className="w-full bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Parallax Hero Animation Section */}
      <section className="relative z-10 w-full">
        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />
        <HeroParallax
          products={products}
          title={service.title}
          description={service.description}
        />
      </section>

      {/* Details & Features Grid Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#030712] border-t border-slate-900 z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-20 text-center max-w-3xl mx-auto">
            <span className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase">
              Robust Core Modules
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 mb-6">
              Tailored to your workflow.
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              We specialize in engineering robust custom solutions that address complex business requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative rounded-3xl border border-slate-800/80 bg-slate-950/40 p-8 hover:border-blue-500/30 hover:bg-slate-950/80 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start gap-6">
                    <div className={`rounded-2xl p-4 bg-slate-900 border border-slate-800 shadow-md text-white`}>
                      <Icon className="size-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Architecture Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#020617] relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase">
              Architecture & Scaling
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 mb-6">
              Engineered for absolute performance
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              We design software architectures that handle heavy loads, dynamic traffic spikes, and strict data security mandates with ease.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="rounded-lg p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{benefit.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{benefit.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Developer Tools & Stack
            </h3>
            
            <div className="space-y-6">
              {[
                { name: "Frontend", tech: "React, Next.js / Vite, Tailwind CSS, Framer Motion" },
                { name: "Backend APIs", tech: "Node.js, Express, Fastify, GraphQL, REST API" },
                { name: "Database Systems", tech: "PostgreSQL, MongoDB, Redis Caching, Prisma" },
                { name: "Infrastructure & Security", tech: "Docker, AWS, Vercel, OAuth / JWT, HTTPS" },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="text-xs text-blue-400 font-mono uppercase tracking-wider mb-1">{item.name}</div>
                  <div className="text-sm text-slate-300 font-medium">{item.tech}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#030712] z-20 border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
              Ready to construct your application?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Partner with us to build custom web applications optimized for speed, scalability, and robust user experiences.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

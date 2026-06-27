"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Search,
  ThumbsUp,
  TrendingUp,
  PenTool,
  Instagram,
  Linkedin,
  ChevronDown,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DigitalMarketingPage({ service }: { service: any }) {
  // Reusable motion variants for entrance only (no continuous floating)
  const floatVariant = (delay: number = 0) => ({
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay,
    },
  });

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[75vh] w-full pt-20 pb-16 px-4 md:px-8 lg:px-16 flex items-center justify-center">
        {/* Fresh, Light, Attractive Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] right-[5%] w-[700px] h-[700px] bg-purple-300/30 rounded-full blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle at center, #0f172a 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col items-start text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-violet-700 uppercase shadow-sm"
            >
              <Rocket className="size-3.5" /> MARKETING
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-slate-900"
            >
              Digital <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                Marketing
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold mt-2 text-slate-800"
            >
              Growth that's <span className="text-indigo-600">measurable.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 max-w-md leading-relaxed"
            >
              Data-led campaigns that put your brand in front of the right audience and drive
              measurable business results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-bold text-white shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all hover:scale-105 hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)]"
              >
                <Rocket className="size-5" /> REQUEST THIS SERVICE
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Dashboard Mockup Composition (Light Theme) */}
          <div className="relative w-full flex flex-col gap-6 lg:pl-10 mt-12 lg:mt-0">
            {/* Main Center Dashboard (Parent) */}
            <motion.div
              animate={floatVariant(0)}
              className="relative z-20 w-full rounded-2xl border border-white bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-slate-800">Campaign Performance</span>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                  This Month <ChevronDown className="size-3" />
                </div>
              </div>

              <div className="mb-2 text-xs font-medium text-slate-500">Total Conversions</div>
              <div className="text-4xl font-extrabold text-slate-900 mb-2">12,540</div>
              <div className="flex items-center gap-2 mb-8">
                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold">
                  ↑ 28.6%
                </span>
                <span className="text-slate-400 text-xs font-medium">vs last month</span>
              </div>

              {/* Fake Line Chart */}
              <div className="w-full h-32 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between border-t border-b border-slate-100 py-4">
                  <div className="w-full h-px bg-slate-100" />
                  <div className="w-full h-px bg-slate-100" />
                  <div className="w-full h-px bg-slate-100" />
                </div>
                {/* SVG Line */}
                <svg
                  viewBox="0 0 400 100"
                  className="w-full h-full overflow-visible z-10 relative"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="lineGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,80 L 40,70 L 80,90 L 120,60 L 160,40 L 200,50 L 240,20 L 280,30 L 320,10 L 360,30 L 400,0"
                    fill="none"
                    stroke="url(#lineGradLight)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dots */}
                  <circle cx="160" cy="40" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="240" cy="20" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="320" cy="10" r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>

            {/* Children Row */}
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Child 1: Website Traffic */}
              <motion.div
                animate={floatVariant(0.2)}
                className="w-full rounded-xl border border-white bg-white/90 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-medium text-slate-500 mb-1">Website Traffic</div>
                  <div className="text-xl font-extrabold text-slate-900">23,785</div>
                  <div className="text-emerald-500 text-[10px] font-bold mb-4">↑ 18.3%</div>
                </div>
                <svg
                  viewBox="0 0 100 30"
                  className="w-full h-8 overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,25 L 20,15 L 40,20 L 60,5 L 80,10 L 100,0"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Child 2: Leads Generated */}
              <motion.div
                animate={floatVariant(0.4)}
                className="w-full rounded-xl border border-white bg-white/90 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-medium text-slate-500 mb-1">Leads Generated</div>
                  <div className="text-xl font-extrabold text-slate-900">8,631</div>
                  <div className="text-emerald-500 text-[10px] font-bold mb-4">↑ 24.7%</div>
                </div>
                <svg
                  viewBox="0 0 100 30"
                  className="w-full h-8 overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,20 L 20,25 L 40,10 L 60,15 L 80,5 L 100,0"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Child 3: Top Channels */}
              <motion.div
                animate={floatVariant(0.6)}
                className="w-full rounded-xl border border-white bg-white/90 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] p-4 flex flex-col justify-between"
              >
                <div className="text-[10px] font-medium text-slate-500 mb-2">Top Channels</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="relative w-10 h-10 drop-shadow-sm shrink-0">
                    {/* Simple CSS Donut Chart */}
                    <div
                      className="absolute inset-0 rounded-full border-[4px] border-[#3b82f6]"
                      style={{
                        clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-[4px] border-[#8b5cf6]"
                      style={{ clipPath: "polygon(50% 50%, 50% 0, 0 0, 0 50%)" }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-[4px] border-slate-200"
                      style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
                    />
                  </div>
                  <div className="space-y-1 text-[8px] font-medium text-slate-600">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-sm" /> Organic
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-sm" /> Paid
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 shadow-sm" /> Social
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Icons (Glassmorphic Orbs) */}
            <motion.div
              animate={floatVariant(2)}
              className="absolute -top-6 -left-6 z-30 w-14 h-14 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center text-slate-800"
            >
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                G
              </span>
            </motion.div>

            <motion.div
              animate={floatVariant(2.5)}
              className="absolute top-[40%] -right-6 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center"
            >
              <span className="text-2xl font-extrabold text-[#3b82f6]">∞</span>
            </motion.div>

            <motion.div
              animate={floatVariant(3)}
              className="absolute -bottom-6 right-8 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_-5px_rgba(236,72,153,0.3)] flex items-center justify-center"
            >
              <Instagram className="size-5 text-pink-500 drop-shadow-sm" />
            </motion.div>

            <motion.div
              animate={floatVariant(1.2)}
              className="absolute top-[40%] -left-8 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center text-[#3b82f6]"
            >
              <span className="font-extrabold text-lg drop-shadow-sm">in</span>
            </motion.div>

            {/* Simulated 3D Megaphone */}
            <motion.div
              animate={floatVariant(0.8)}
              className="absolute -bottom-10 left-10 z-30 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 backdrop-blur-2xl border border-white shadow-[0_15px_40px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center"
            >
              <Megaphone
                className="size-10 text-blue-600 rotate-[-15deg] drop-shadow-md"
                fill="currentColor"
                fillOpacity={0.2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHAT'S INCLUDED SECTION --- */}
      <section className="relative w-full py-24 px-4 md:px-8 lg:px-16 z-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-violet-600 text-xs font-bold tracking-widest uppercase mb-4">
            What's Included
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
            We take care of everything
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            End-to-end digital marketing solutions focused on visibility, engagement and measurable
            growth.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
            <div className="mb-6 rounded-2xl p-5 bg-gradient-to-br from-violet-50 to-white border border-violet-100 shadow-sm transition-transform group-hover:scale-110">
              <Search className="size-8 text-violet-600" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">SEO Optimization</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">
              Improve your search rankings and drive qualified organic traffic to your website.
            </p>
            <ArrowRight className="size-5 mt-6 text-violet-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
            <div className="mb-6 rounded-2xl p-5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm transition-transform group-hover:scale-110">
              <ThumbsUp className="size-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Social Media</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">
              Build your brand, engage your audience and grow your community across platforms.
            </p>
            <ArrowRight className="size-5 mt-6 text-indigo-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
            <div className="mb-6 rounded-2xl p-5 bg-gradient-to-br from-fuchsia-50 to-white border border-fuchsia-100 shadow-sm transition-transform group-hover:scale-110">
              <TrendingUp className="size-8 text-fuchsia-600" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Performance</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">
              Maximize ROI with targeted ads that drive conversions and real business results.
            </p>
            <ArrowRight className="size-5 mt-6 text-fuchsia-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>

          {/* Feature 4 */}
          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
            <div className="mb-6 rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm transition-transform group-hover:scale-110">
              <PenTool className="size-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900">Content Strategy</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">
              Create valuable content that attracts, engages and converts your audience.
            </p>
            <ArrowRight className="size-5 mt-6 text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </div>
      </section>
    </div>
  );
}

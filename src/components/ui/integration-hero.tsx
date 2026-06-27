"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const ICONS_ROW1 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
];

const ICONS_ROW2 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "https://cdn.simpleicons.org/vercel/ffffff",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  "https://cdn.simpleicons.org/render/ffffff",
];

// Utility to repeat icons enough times
const repeatedIcons = (icons: string[], repeat = 4) =>
  Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/40">
      <LampContainer className="min-h-[110svh] md:min-h-[800px] w-full">
        {/* Light grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Content wrapper */}
        <div className="relative w-full text-center z-10 px-4">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-slate-300 to-slate-500 py-4 px-4 w-full"
          >
            Engineered with Modern Technologies
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed text-center px-4 w-full"
          >
            We leverage industry-leading frameworks, runtimes, and cloud infrastructure to deliver high-performance digital solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-6 flex justify-center gap-4"
          >
            <Link to="/contact">
              <Button
                variant="default"
                className="px-6 py-3 rounded-full bg-gradient-brand text-white font-medium hover:opacity-90 shadow-md shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                Start building <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </LampContainer>

      {/* Carousel (Placed below the LampContainer) */}
      <div className="pb-24 md:pb-16 bg-slate-950 w-full overflow-hidden relative z-10 -mt-48 md:-mt-44">
        {/* Row 1 */}
        <div className="flex gap-10 whitespace-nowrap animate-scroll-left w-max">
          {repeatedIcons(ICONS_ROW1, 6).map((src, i) => (
            <div
              key={i}
              className="h-16 w-16 flex-shrink-0 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-center transition-transform hover:scale-110 duration-300"
            >
              <img src={src} alt="tech icon" className="h-10 w-10 object-contain" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-10 whitespace-nowrap mt-6 animate-scroll-right w-max">
          {repeatedIcons(ICONS_ROW2, 6).map((src, i) => (
            <div
              key={i}
              className="h-16 w-16 flex-shrink-0 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-center transition-transform hover:scale-110 duration-300"
            >
              <img src={src} alt="tech icon" className="h-10 w-10 object-contain" />
            </div>
          ))}
        </div>

        {/* Fade overlays */}
        <div className="absolute left-0 top-0 h-full w-24 sm:w-48 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-24 sm:w-48 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 35s linear infinite;
        }
      `}} />
    </div>
  );
}

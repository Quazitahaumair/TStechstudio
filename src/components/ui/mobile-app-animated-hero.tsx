"use client";

import React, { useEffect, useRef } from "react";
import {
  BatteryMedium,
  Signal,
  Wifi,
  Smartphone,
  Cpu,
  Layers,
  Globe,
  Watch,
  SmartphoneNfc,
  Gamepad2,
  Code,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const mobileAppServices = [
  {
    title: "Android App Development",
    icon: Cpu,
    description:
      "Our android app developers have proven expertise in developing robust Android applications for diverse business domains. We adhere to a user-centric approach for developing Android apps that helps businesses deliver services on the go.",
  },
  {
    title: "iOS App Development",
    icon: Smartphone,
    description:
      "As a leading iOS app development agency, we create iOS and iPhone mobile apps that evolve with your business goals. Our iOS mobile solutions empower businesses to accelerate their digital transformation journey and achieve measurable outcomes.",
  },
  {
    title: "Flutter App Development",
    icon: Layers,
    description:
      "Hire our Google-certified Flutter app developers to leverage the benefits of a single codebase for creating mobile apps for various platforms. Our experts create mobile apps with Flutter that deliver native-like app performance and experience to users.",
  },
  {
    title: "PWA Development",
    icon: Globe,
    description:
      "Our progressive web app development services are aligned for seamlessly connecting businesses with their clients. We ensure your PWA is fast, secure, and optimized to deliver native-like experiences on both mobile and desktop platforms.",
  },
  {
    title: "Wearable App Development",
    icon: Watch,
    description:
      "Our developers go beyond the limits of digital innovations to develop AI-powered wearable apps that transform health tracking into personalized insights. With a team of expert app developers, we create robust wearable apps that offer immersive design and intuitive app experience.",
  },
  {
    title: "Cross-Platform App Development",
    icon: SmartphoneNfc,
    description:
      "We create seamless cross-platforms mobile apps through a single codebase that runs flawlessly on various platforms. Our cross-platform apps deliver native-like experiences on every platform, while ensuring significant cost savings.",
  },
  {
    title: "Mobile Game Development",
    icon: Gamepad2,
    description:
      "We at TS Tech Studio are dedicated to delivering captivating and immersive mobile game app development services for both Android and iOS platforms. Our apps deliver an engaging user experience that attracts and retains gamers.",
  },
  {
    title: "Native Mobile App Development",
    icon: Code,
    description:
      "Our native mobile app solutions offer optimized user experience with an easy-to-use interface and maximum security. Our team of native app development experts create bespoke solutions tailored to your business goals, for iOS and Android platforms.",
  },
];

export function MobileAppAnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 400vh scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Crucial for responsive and dynamic values
        },
      });

      // 1. Text fades up and out
      tl.to(
        textRef.current,
        {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // 2. Phones POP UP (scale from 0.7 to 1, fade from 0 to 1)
      tl.fromTo(
        trackWrapperRef.current,
        {
          scale: 0.7,
          opacity: 0,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // 3. Horizontal Scroll
      // Calculate exactly how far to scroll the track dynamically
      tl.to(
        trackRef.current,
        {
          x: () => {
            if (!trackRef.current) return 0;
            const trackWidth = trackRef.current.scrollWidth;
            const windowWidth = window.innerWidth;
            const scrollDistance = trackWidth - windowWidth;
            return -Math.max(0, scrollDistance);
          },
          duration: 3,
          ease: "none", // Linear movement for scrolling
        },
        1,
      );

      // 4. Parallax 3D tilt applied DURING the horizontal scroll
      const phones = gsap.utils.toArray(".ultra-phone-container");
      tl.to(
        phones,
        {
          rotationY: -15,
          rotationX: 5,
          z: -50,
          duration: 3,
          ease: "none",
        },
        1,
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#000000] overflow-hidden flex items-center justify-start"
    >
      {/* Intro Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none"
      >
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-4 text-center">
          Mobile Mastery.
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl text-center leading-relaxed">
          Posh aesthetics meets unparalleled engineering. <br />
          <span className="text-white/40 mt-4 block">
            Scroll to experience our mobile capabilities.
          </span>
        </p>
      </div>

      {/* Pop Up Phone Track Wrapper */}
      <div
        ref={trackWrapperRef}
        className="w-full h-full flex items-center justify-start overflow-visible z-20 absolute inset-0"
      >
        {/* The Track that horizontally scrolls */}
        {/* We use pl-[calc(50vw-130px)] to perfectly center the first phone (260px wide / 2 = 130px) */}
        {/* and pr-[calc(50vw-130px)] to perfectly center the last phone. */}
        <div
          ref={trackRef}
          className="flex gap-16 md:gap-24 items-center will-change-transform perspective-[1500px]"
          style={{
            paddingLeft: "calc(50vw - 130px)",
            paddingRight: "calc(50vw - 130px)",
          }}
        >
          {mobileAppServices.map((service, idx) => (
            <UltraRealisticPhone key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UltraRealisticPhone({
  service,
  index,
}: {
  service: (typeof mobileAppServices)[0];
  index: number;
}) {
  const themes = [
    { bg: "from-blue-500 to-indigo-600", accent: "bg-blue-500/20", shadow: "shadow-blue-500/20" },
    {
      bg: "from-purple-500 to-pink-600",
      accent: "bg-purple-500/20",
      shadow: "shadow-purple-500/20",
    },
    {
      bg: "from-emerald-400 to-teal-500",
      accent: "bg-emerald-500/20",
      shadow: "shadow-emerald-500/20",
    },
    {
      bg: "from-orange-400 to-red-500",
      accent: "bg-orange-500/20",
      shadow: "shadow-orange-500/20",
    },
    { bg: "from-cyan-400 to-blue-500", accent: "bg-cyan-500/20", shadow: "shadow-cyan-500/20" },
    { bg: "from-rose-400 to-red-500", accent: "bg-rose-500/20", shadow: "shadow-rose-500/20" },
  ];
  const t = themes[index % themes.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    // Responsive outer container defining actual document flow width. Base 260px width matches 130px padding math.
    <div className="ultra-phone-container relative shrink-0 flex items-center justify-center group transform-style-3d will-change-transform w-[260px] h-[530px]">
      {/* Scaled Inner Wrapper to keep 340x700 hardware absolutely aligned but visibly responsive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-[0.75] origin-center flex items-center justify-center">
        {/* Outer Glow based on theme */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-b ${t.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[80px] -z-20 pointer-events-none`}
        />

        {/* The Physical Device (Fixed 340x700 inside scale wrapper) */}
        <div className="relative w-[340px] h-[700px] rounded-[3.5rem] bg-[#1a1a1c] p-[2px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1),inset_0_0_0_1px_rgba(255,255,255,0.2)]">
          {/* Hardware Buttons */}
          {/* Action Button */}
          <div className="absolute top-[130px] -left-[3px] w-[3px] h-[22px] bg-gradient-to-b from-[#555] to-[#222] rounded-l-[3px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.3)]" />
          {/* Volume Up */}
          <div className="absolute top-[175px] -left-[3px] w-[3px] h-[50px] bg-gradient-to-b from-[#444] to-[#111] rounded-l-[3px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
          {/* Volume Down */}
          <div className="absolute top-[240px] -left-[3px] w-[3px] h-[50px] bg-gradient-to-b from-[#444] to-[#111] rounded-l-[3px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
          {/* Power Button */}
          <div className="absolute top-[190px] -right-[3px] w-[3px] h-[75px] bg-gradient-to-b from-[#555] to-[#222] rounded-r-[3px] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.3)]" />

          {/* Antenna Bands */}
          <div className="absolute top-[60px] -left-[2px] w-[2px] h-[4px] bg-[#111]" />
          <div className="absolute top-[60px] -right-[2px] w-[2px] h-[4px] bg-[#111]" />

          {/* Inner Screen Bezel */}
          <div className="relative w-full h-full rounded-[3.4rem] bg-black p-[12px] shadow-[inset_0_0_0_2px_#333,inset_0_0_20px_rgba(0,0,0,1)]">
            {/* Display Surface */}
            <div className="relative w-full h-full rounded-[3rem] bg-[#050505] overflow-hidden flex flex-col z-10 isolate">
              {/* Screen Glare (Glass Reflection) */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent -rotate-45 pointer-events-none z-50 transform translate-y-[-20%] group-hover:translate-y-[20%] transition-transform duration-1000 ease-in-out" />

              {/* Dynamic Island */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[125px] h-[36px] bg-black rounded-full z-50 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15),0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-between px-3">
                {/* Camera Lens */}
                <div className="w-[14px] h-[14px] rounded-full bg-[#111] shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] ml-auto relative overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-[3px] h-[3px] bg-blue-400/50 rounded-full blur-[1px]" />
                </div>
              </div>

              {/* iOS Status Bar */}
              <div className="absolute top-[18px] left-0 w-full px-8 flex justify-between items-center z-40 text-white font-medium text-[13px] tracking-tighter">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 opacity-80">
                  <Signal className="w-3.5 h-3.5" strokeWidth={3} />
                  <Wifi className="w-3.5 h-3.5" strokeWidth={3} />
                  <BatteryMedium className="w-5 h-5" strokeWidth={2.5} />
                </div>
              </div>

              {/* App Interface (Glassmorphic Design) */}
              <div className="relative w-full h-full pt-20 px-5 pb-10 flex flex-col bg-gradient-to-b from-[#0a0a0a] to-[#000000] z-20">
                {/* Dynamic Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">
                      Service {num}
                    </span>
                    <h3
                      className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${t.bg} tracking-tight leading-none`}
                    >
                      {service.title.split(" ")[0]} <br />{" "}
                      <span className="text-white">
                        {service.title.substring(service.title.indexOf(" ") + 1)}
                      </span>
                    </h3>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.bg} flex items-center justify-center shadow-lg ${t.shadow} border border-white/20 shrink-0`}
                  >
                    <service.icon className="w-6 h-6 text-white drop-shadow-md" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Description Card (Frosted Glass) */}
                <div className="relative flex-1 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-6 flex flex-col shadow-2xl overflow-hidden group-hover:bg-white/[0.05] transition-colors duration-500">
                  {/* Decorative background blur inside card */}
                  <div
                    className={`absolute -top-10 -right-10 w-32 h-32 ${t.accent} rounded-full blur-[40px] pointer-events-none`}
                  />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                        <span className="text-xs">✨</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white/80">
                        Premium Quality
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                      <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed tracking-tight">
                        {service.description}
                      </p>
                    </div>

                    <button
                      className={`mt-4 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${t.bg} text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg ${t.shadow} transform hover:scale-[1.02] transition-transform active:scale-[0.98]`}
                    >
                      Explore Service
                    </button>
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-40 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Scaled Wrapper */}
    </div>
  );
}

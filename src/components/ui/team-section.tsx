import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Bug, Zap, Sparkles, Layers } from "lucide-react";

const Lanyard = lazy(() => import("@/components/ui/lanyard/lanyard"));

function createCardTexture(
  name: string,
  isFront: boolean,
  accentColor: string,
  avatarImg: HTMLImageElement | null,
): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  const width = 800;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const S = width / 1200; // Scale factor

  // Enable high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const fontStack =
    '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
  const displayFontStack =
    '"Sora", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

  if (isFront) {
    // Front Face — Full Bleed Avatar with name overlay at bottom
    if (avatarImg) {
      const imgW = avatarImg.width;
      const imgH = avatarImg.height;
      const scale = Math.max(width / imgW, height / imgH);
      const dw = imgW * scale;
      const dh = imgH * scale;
      const dx = (width - dw) / 2;
      const dy = (height - dh) / 2;
      ctx.drawImage(avatarImg, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(0, 0, width, height);
    }

    // Gradient overlay at bottom for name legibility
    const textBgGradient = ctx.createLinearGradient(0, height - 700 * S, 0, height);
    textBgGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    textBgGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
    textBgGradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
    ctx.fillStyle = textBgGradient;
    ctx.fillRect(0, height - 700 * S, width, 700 * S);

    // Subtle border drawn on top of the image
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 24 * S;
    ctx.strokeRect(30 * S, 30 * S, 1140 * S, 1740 * S);

    // Thin accent line at top
    ctx.fillStyle = accentColor;
    ctx.fillRect(30 * S, 30 * S, 1140 * S, 12 * S);

    // Subtle glossy overlay on top of the image

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = `${4 * S}px`;
    ctx.font = `bold ${96 * S}px ${displayFontStack}`;
    ctx.textAlign = "center";
    ctx.fillText(name.toUpperCase(), 600 * S, 1600 * S);
    ctx.letterSpacing = "0px";
  } else {
    // Back Face Layout
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#f8fafc");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 24 * S;
    ctx.strokeRect(30 * S, 30 * S, 1140 * S, 1740 * S);

    ctx.fillStyle = accentColor;
    ctx.fillRect(30 * S, 30 * S, 1140 * S, 12 * S);

    // Centered QR Code on back face (no logo text)
    const qrSize = 340;
    const qrX = 600 - qrSize / 2;
    const qrY = 900 - qrSize / 2;
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(qrX * S, qrY * S, qrSize * S, qrSize * S);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect((qrX + 20) * S, (qrY + 20) * S, 80 * S, 80 * S);
    ctx.fillRect((qrX + qrSize - 100) * S, (qrY + 20) * S, 80 * S, 80 * S);
    ctx.fillRect((qrX + 20) * S, (qrY + qrSize - 100) * S, 80 * S, 80 * S);
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect((qrX + 40) * S, (qrY + 40) * S, 40 * S, 40 * S);
    ctx.fillRect((qrX + qrSize - 80) * S, (qrY + 40) * S, 40 * S, 40 * S);
    ctx.fillRect((qrX + 40) * S, (qrY + qrSize - 80) * S, 40 * S, 40 * S);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect((qrX + 50) * S, (qrY + 50) * S, 20 * S, 20 * S);
    ctx.fillRect((qrX + qrSize - 70) * S, (qrY + 50) * S, 20 * S, 20 * S);
    ctx.fillRect((qrX + 50) * S, (qrY + qrSize - 70) * S, 20 * S, 20 * S);

    for (let x = qrX + 100; x < qrX + qrSize - 100; x += 20) {
      for (let y = qrY + 100; y < qrY + qrSize - 100; y += 20) {
        if (Math.random() > 0.5) {
          ctx.fillRect(x * S, y * S, 16 * S, 16 * S);
        }
      }
    }

    ctx.fillStyle = "#94a3b8";
    ctx.font = `${32 * S}px ${fontStack}`;
    ctx.fillText("If found, return to TS Tech Studio Headquarters.", 600 * S, 1600 * S);
  }

  return canvas.toDataURL("image/png");
}

function MemberCard({ member, index }: { member: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Trigger slide-down when the card starts climbing above 75% of screen height
      if (rect.top < window.innerHeight * 0.75) {
        setShowDetails(true);
      } else {
        setShowDetails(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full relative">
      {/* Lanyard container — restricted max-width to ensure alignment in grid columns */}
      <motion.div
        className="relative w-full max-w-[450px] h-[600px] flex justify-center items-center z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      >
        {isMobile ? (
          <div className="w-[300px] h-[450px] rounded-2xl overflow-hidden relative shadow-lg border border-slate-200/50 bg-[#cbd5e1] group/csscard transition-all duration-500 hover:shadow-glow hover:-translate-y-2">
            <img
              src="/avatar.png"
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/csscard:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-center">
              <h4 className="text-xl font-bold text-white tracking-wide uppercase">
                {member.name}
              </h4>
              <p className="text-xs text-[#2DD4BF] font-semibold tracking-wider mt-1">
                {member.role}
              </p>
            </div>
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: member.color === "indigo" ? "#4f46e5" : "#059669" }}
            />
          </div>
        ) : member.textures ? (
          <Suspense
            fallback={
              <div className="w-[300px] h-[450px] bg-slate-800/10 backdrop-blur-md border border-slate-700/20 rounded-2xl flex flex-col justify-center items-center gap-4 animate-pulse">
                <Layers className="w-12 h-12 text-slate-400/50 animate-bounce" />
                <span className="text-sm font-medium text-slate-500">Loading 3D Scene...</span>
              </div>
            }
          >
            <Lanyard
              position={[0, 0, 13.5]}
              gravity={[0, -40, 0]}
              frontImage={member.textures.front}
              backImage={member.textures.back}
              imageFit="cover"
              className="w-full h-full"
            />
          </Suspense>
        ) : (
          <div className="w-[300px] h-[450px] bg-slate-800/10 backdrop-blur-md border border-slate-700/20 rounded-2xl flex flex-col justify-center items-center gap-4 animate-pulse">
            <Layers className="w-12 h-12 text-slate-400/50 animate-bounce" />
            <span className="text-sm font-medium text-slate-500">Loading 3D Badge...</span>
          </div>
        )}
      </motion.div>

      {/* Vertical connecting line — length grows on scroll */}
      <motion.div
        animate={showDetails ? { height: 16, opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[2px] bg-gradient-to-b from-[#0D9488]/40 to-transparent -mt-24 mb-1 z-0 origin-top"
      />

      {/* Profile details — clean, centered, borderless text lines sliding down on scroll */}
      <motion.div
        initial={{ y: -60, opacity: 0, scaleY: 0.92 }}
        animate={
          showDetails ? { y: 0, opacity: 1, scaleY: 1 } : { y: -60, opacity: 0, scaleY: 0.92 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
        className="w-full max-w-[420px] text-center flex flex-col items-center select-none z-10 relative -mt-20"
      >
        <div className="flex flex-col items-center gap-1 mb-2">
          <span className={`p-1.5 rounded-lg ${member.accentBg} mb-1 shadow-sm`}>
            {member.icon}
          </span>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-[#0D9488]">{member.role}</p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 px-4 max-w-[380px]">
          {member.desc}
        </p>

        {/* Skill badges */}
        <div className="mb-4 flex flex-col items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Core Competencies
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 px-4 max-w-[380px]">
            {member.skills.map((skill: string) => (
              <span
                key={skill}
                className="text-xs font-semibold px-2.5 py-1 bg-slate-100/80 text-slate-600 rounded-md border border-slate-200/40 hover:bg-slate-200/60 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[360px] border-t border-slate-200/60 pt-3 flex items-center justify-center px-4">
          <span className="text-xs text-slate-400 font-medium">Exp: 2+ Years</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeamSection() {
  const [tahaTextures, setTahaTextures] = useState<{ front: string; back: string } | null>(null);
  const [sharikhTextures, setSharikhTextures] = useState<{ front: string; back: string } | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    const loadAndRender = async () => {
      let img: HTMLImageElement | null = null;
      try {
        img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.src = "/avatar.png";
          image.onload = () => resolve(image);
          image.onerror = (e) => reject(e);
        });
      } catch (err) {
        console.error("Failed to load avatar image", err);
      }

      if (!active) return;

      const updateTextures = () => {
        setTahaTextures({
          front: createCardTexture("Quazi Taha", true, "#059669", img),
          back: createCardTexture("Quazi Taha", false, "#059669", img),
        });

        setSharikhTextures({
          front: createCardTexture("Shaikh Sharikh", true, "#4f46e5", img),
          back: createCardTexture("Shaikh Sharikh", false, "#4f46e5", img),
        });
      };

      updateTextures();

      // Redraw textures once custom fonts (Sora, Inter) are loaded by the browser
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          if (active) {
            updateTextures();
          }
        });
      }
    };

    loadAndRender();

    return () => {
      active = false;
    };
  }, []);

  const members = [
    {
      role: "Full Stack Developer",
      desc: "Full Stack developer with 2+ years of Industry experience, building robust architectures and responsive interfaces.",
      skills: [
        "Angular / React / Next.js",
        "Node.js / Express",
        "Javascript / TypeScript",
        "Mongodb / PostgreSQL",
        "Angular Material / Tailwind CSS",
        "Three.js / Canvas",
      ],
      textures: tahaTextures,
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      color: "emerald",
      badgeBorder: "border-emerald-500/20 hover:border-emerald-500/40",
      accentBg: "bg-emerald-500/10 text-emerald-400",
      accentGlow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    },
    {
      role: "Software Tester",
      desc: "Software Tester with 2+ years of industry experience, ensuring application quality, performance, and bulletproof automation.",
      skills: [
        "QA Automation",
        "Cypress / Playwright",
        "Selenium",
        "API Testing",
        "CI/CD Pipelines",
        "Performance Testing",
      ],
      textures: sharikhTextures,
      icon: <Bug className="w-5 h-5 text-indigo-400" />,
      color: "indigo",
      badgeBorder: "border-indigo-500/20 hover:border-indigo-500/40",
      accentBg: "bg-indigo-500/10 text-indigo-400",
      accentGlow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    },
  ];

  return (
    <section className="w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF5] to-[#F6F1E5] text-[#111827] overflow-hidden relative border-t border-slate-200/60">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.span
            className="text-[#0D9488] font-semibold text-sm tracking-widest mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
            MEET THE EXPERTS
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-light text-center mb-4 text-slate-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Core Team
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#0D9488]"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-center max-w-2xl mx-auto mt-6 text-[#111827]/70 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hover and drag the 3D identity badges to see them swing in real-time physics. We build
            next-generation web applications with precision and testing rigour.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {members.map((member, index) => (
            <MemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

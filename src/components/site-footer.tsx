import { Github, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/technologies", label: "Technologies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "GitHub", icon: Github, href: "https://github.com" },
];

export function SiteFooter() {
  return (
    <footer className="mt-0 border-t border-white/[0.08] bg-[#0F172A]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo-white.png"
              alt="TS Tech Studio Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              TS Tech Studio
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Building digital solutions that deliver results for restaurants, hotels, local
            businesses, startups, and growing teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-[#2DD4BF]/30 hover:bg-[#2DD4BF]/10 hover:text-white"
                >
                  <Icon className="size-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="transition-colors hover:text-white" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]">
            Let us help
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Ready to create a stronger digital presence? Start with a quick call and we will map the
            best path forward.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TS Tech Studio. All rights reserved.</p>
          <p className="font-medium text-white">Building Digital Solutions That Deliver Results</p>
        </div>
      </div>
    </footer>
  );
}

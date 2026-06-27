import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Home, Briefcase, Star, User, Mail, Cpu } from "lucide-react";
import { MenuBar } from "@/components/ui/glow-menu";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: Briefcase,
    label: "Services",
    href: "/services",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: Cpu,
    label: "Technologies",
    href: "/technologies",
    gradient:
      "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(79,70,229,0.06) 50%, rgba(67,56,202,0) 100%)",
    iconColor: "text-indigo-500",
  },
  {
    icon: User,
    label: "About",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "/contact",
    gradient:
      "radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(225,29,72,0.06) 50%, rgba(190,24,74,0) 100%)",
    iconColor: "text-rose-500",
  },
];

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/technologies", label: "Technologies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isProcessActive, setIsProcessActive] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 24);
      const el = document.getElementById("process-section-root");
      if (el) {
        const rect = el.getBoundingClientRect();
        setIsProcessActive(rect.top <= 96 && rect.bottom >= 96);
      } else {
        setIsProcessActive(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";
  const isTechnologies = pathname === "/technologies";
  const isMobileApp = pathname === "/services/mobile-app-development";
  const isWebsiteDev = pathname === "/services/website-development";
  const isUiUxDesign = pathname === "/services/ui-ux-design";
  const isDigitalMarketing = pathname === "/services/digital-marketing";
  const isBrandingSolutions = pathname === "/services/branding-solutions";
  const isCustomWebApps = pathname === "/services/custom-web-applications";
  const shouldHideHeader = isTechnologies && isAtTop;
  const isHeaderDark = (isHome && isAtTop) || isProcessActive || isWebsiteDev || isUiUxDesign || isMobileApp || isBrandingSolutions || isCustomWebApps;

  const activeItem = menuItems.find((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  })?.label || "Home";

  return (
    <header
      className={`z-50 fixed left-0 right-0 top-0 transition-all duration-300 ease-in-out border-b ${shouldHideHeader
        ? "opacity-0 -translate-y-full pointer-events-none bg-transparent border-transparent"
        : isAtTop || isProcessActive || isMobileApp || isWebsiteDev || isUiUxDesign || isDigitalMarketing || isBrandingSolutions || isCustomWebApps
          ? "bg-transparent border-transparent translate-y-0"
          : "border-[#E5E7EB] bg-[rgba(255,251,245,0.88)] backdrop-blur-md shadow-sm translate-y-0"
        }`}
    >
      <div className="mx-auto flex h-20 sm:h-24 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex h-full items-center -ml-8 sm:-ml-16" onClick={() => setOpen(false)}>
          <img
            src={isHeaderDark ? "/logo-white.png" : "/logo-black.png"}
            alt="TS Tech Studio"
            className="h-[160px] sm:h-[195px] w-auto object-contain transition-all duration-300 translate-y-[2px] sm:translate-y-[4px]"
          />
        </Link>

        <div className="hidden items-center gap-4 md:flex translate-y-[2px] sm:translate-y-[4px]">
          <MenuBar items={menuItems} activeItem={activeItem} isHeaderDark={isHeaderDark} />
        </div>

        <button
          className={`inline-flex items-center justify-center rounded-full p-2 transition-colors duration-300 md:hidden ${isHeaderDark
            ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
            : "border border-[#E5E7EB] bg-white text-foreground hover:bg-[#f0fdfa]"
            }`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-80" : "max-h-0"
          } ${isAtTop ? "bg-[rgba(255,251,245,0.98)]" : "bg-[rgba(255,251,245,0.98)] backdrop-blur-md"}`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 pt-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-lg font-medium transition-colors text-[#6b7280] hover:bg-[#f0fdfa] hover:text-[#0d9488]"
              activeProps={{ className: "text-[#0d9488]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

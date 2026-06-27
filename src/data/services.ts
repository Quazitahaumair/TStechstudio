export type ServiceCategory = "Web" | "Mobile" | "Design" | "Marketing" | "Branding";

export interface Service {
  slug: string;
  icon: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  features: string[];
  animation: "browser" | "phone" | "design" | "rocket" | "brand" | "network";
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Web",
  "Mobile",
  "Design",
  "Marketing",
  "Branding",
];

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "🌐",
    title: "Website Development",
    category: "Web",
    tagline: "High-performance sites that convert.",
    description:
      "We build fast, secure, and responsive websites engineered for growth — from marketing sites to complex custom web applications.",
    features: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "E-Commerce Websites",
      "Custom Web Applications",
    ],
    animation: "browser",
  },
  {
    slug: "mobile-app-development",
    icon: "📱",
    title: "Mobile App Development",
    category: "Mobile",
    tagline: "Native-feel apps, every platform.",
    description:
      "Cross-platform and native mobile applications crafted for performance, polish, and a delightful user experience.",
    features: [
      "Android App Development",
      "iOS App Development",
      "Flutter App Development",
      "PWA Development",
      "Wearable App Development",
      "Cross-Platform App Development",
      "Mobile Game Development",
      "Native Mobile App Development",
    ],
    animation: "phone",
  },
  {
    slug: "ui-ux-design",
    icon: "🎨",
    title: "UI/UX Design",
    category: "Design",
    tagline: "Interfaces people love to use.",
    description:
      "Research-driven design that turns complex flows into intuitive, beautiful interfaces — from wireframes to polished prototypes.",
    features: [
      "Website Design",
      "Mobile App Design",
      "Dashboard Design",
      "Wireframing & Prototyping",
    ],
    animation: "design",
  },
  {
    slug: "digital-marketing",
    icon: "🚀",
    title: "Digital Marketing",
    category: "Marketing",
    tagline: "Growth that's measurable.",
    description:
      "Data-led campaigns that put your brand in front of the right audience and drive measurable business results.",
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Performance Marketing",
      "Content Strategy",
    ],
    animation: "rocket",
  },
  {
    slug: "branding-solutions",
    icon: "🎯",
    title: "Branding Solutions",
    category: "Branding",
    tagline: "Identities that stand out.",
    description:
      "Memorable brand systems — from logo design to full corporate identity — that communicate trust and quality.",
    features: ["Logo Design", "Brand Identity", "Marketing Materials", "Corporate Branding"],
    animation: "brand",
  },
  {
    slug: "custom-web-applications",
    icon: "⚙️",
    title: "Custom Web Applications",
    category: "Web",
    tagline: "Tailored software for your workflow.",
    description:
      "Scalable, secure web applications built around your unique business logic — dashboards, portals, and internal tools.",
    features: ["SaaS Platforms", "Admin Dashboards", "Client Portals", "API Integrations"],
    animation: "network",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

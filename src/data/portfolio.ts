import type { ServiceCategory } from "./services";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ServiceCategory;
  summary: string;
  tags: string[];
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "al-imam-dates",
    title: "Al-Imam Dates, Honey & Attar Website",
    client: "Halyal Makhtum Sahab",
    category: "Web",
    summary:
      "I wanted a professional website for my Al-Imam Dates, Honey & Attar business, and TS Tech Studio exceeded my expectations. They created a beautiful, modern, and user-friendly website that perfectly represents my brand. Highly recommended!",
    tags: ["E-Commerce", "Web Development", "UI/UX"],
    accent: "from-emerald-500/30 to-teal-500/10",
  },
  {
    slug: "mukhlis-shopify",
    title: "Mukhlis Website Customizations",
    client: "Mohammad Farooq",
    category: "Web",
    summary:
      "I wanted several improvements and customizations for my existing Shopify website, and TS Tech Studio handled everything perfectly. The final result was clean, fast, and exactly what I was looking for. Great experience working with them!",
    tags: ["Shopify", "Customization", "Speed Optimization"],
    accent: "from-sky-500/30 to-cyan-500/10",
  },
  {
    slug: "stylein-mens-wear",
    title: "Stylein Mens Wear Clothing Website",
    client: "Adam",
    category: "Design",
    summary:
      "I wanted a stylish and professional website for my clothing business, Stylein Mens Wear. TS Tech Studio created a beautiful website with an attractive design that perfectly matches my brand. I am very satisfied with their work.",
    tags: ["Web Design", "Responsive Layout", "Branding"],
    accent: "from-rose-500/30 to-pink-500/10",
  },
];

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: ServiceCategory;
  cover: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  stack: string[];
  quote: { text: string; author: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "al-imam-dates",
    title: "Al-Imam E-Commerce Brand Launch",
    client: "Al-Imam",
    category: "Web",
    cover: "from-emerald-500/30 to-teal-500/10",
    challenge:
      "Al-Imam Dates, Honey & Attar needed an elegant, modern digital presence to sell their premium, organic products online and reach a wider customer base.",
    approach: [
      "Designed a high-end, responsive web layout matching their traditional organic brand identity.",
      "Built a custom product listing flow with category filter tabs for Dates, Honey, and Attar.",
      "Configured easy product inquiry call-to-action paths to drive online orders.",
      "Optimized load speeds to ensure a seamless shopping experience on mobile devices.",
    ],
    results: [
      { label: "Client satisfaction", value: "100%" },
      { label: "Mobile load speed", value: "1.2s" },
      { label: "Inquiry conversion", value: "+45%" },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    quote: {
      text: "They created a beautiful, modern, and user-friendly website that perfectly represents my brand. Highly recommended!",
      author: "Halyal Makhtum Sahab, Owner",
    },
  },
  {
    slug: "mukhlis-shopify",
    title: "Shopify Performance Boost for Mukhlis",
    client: "Mukhlis",
    category: "Web",
    cover: "from-sky-500/30 to-cyan-500/10",
    challenge:
      "Mukhlis's existing Shopify store suffered from slow page speeds, poor responsiveness, and outdated layouts that hindered mobile sales.",
    approach: [
      "Conducted a full-site code audit to eliminate heavy script bottlenecks.",
      "Created modern, customized section elements to enrich the theme layout.",
      "Optimized product media files to significantly drop page loading sizes.",
      "Refined checkout and cart flows for a fast, frictionless checkout.",
    ],
    results: [
      { label: "Page speed boost", value: "+55%" },
      { label: "Conversion rate", value: "+24%" },
      { label: "Bounce rate drop", value: "-18%" },
    ],
    stack: ["Shopify Liquid", "Liquid Customization", "Speed Optimization", "Tailwind CSS"],
    quote: {
      text: "The final result was clean, fast, and exactly what I was looking for. Great experience working with them!",
      author: "Mohammad Farooq, Owner",
    },
  },
  {
    slug: "stylein-mens-wear",
    title: "Stylein Mens Wear Brand Design",
    client: "Stylein Mens Wear",
    category: "Design",
    cover: "from-rose-500/30 to-pink-500/10",
    challenge:
      "Stylein Mens Wear wanted a bold, premium clothing store design that could showcase their catalog and capture the attention of style-conscious customers.",
    approach: [
      "Designed a highly visual clothing portfolio section with sleek hover animations.",
      "Created clean, bold typography matching the streetwear design language.",
      "Built custom layout galleries for catalog navigation.",
      "Configured seamless mobile adaptability for on-the-go browsing.",
    ],
    results: [
      { label: "Visual interactions", value: "Sleek" },
      { label: "Catalog engagement", value: "+38%" },
      { label: "Design approval", value: "Perfect" },
    ],
    stack: ["UI/UX Design", "Responsive Layouts", "Vite", "Framer Motion"],
    quote: {
      text: "TS Tech Studio created a beautiful website with an attractive design that perfectly matches my brand. I am very satisfied.",
      author: "Adam, Founder",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

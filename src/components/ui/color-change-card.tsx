import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

// --- Types ---
interface ServiceColorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imgSrc: string;
  slug?: string;
  to?: string;
}

// --- Letter animation variants ---
const letterVariants: Variants = {
  hover: {
    y: "-50%",
  },
};

// --- Animated Letter ---
function AnimatedLetter({ letter }: { letter: string }) {
  return (
    <div className="inline-block h-[32px] overflow-hidden font-semibold text-2xl leading-tight">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.45 }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
}

// --- Single Card ---
function ServiceColorCard({ title, description, imgSrc, slug, to }: ServiceColorCardProps) {
  const cardContent = (
    <motion.div
      transition={{ staggerChildren: 0.03 }}
      whileHover="hover"
      className="group relative h-56 w-full cursor-pointer overflow-hidden rounded-none bg-slate-200"
    >
      {/* Background image — greyscale on desktop, color on mobile & hover */}
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/75" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-5 text-white">
        <ArrowRight className="ml-auto size-6 transition-transform duration-500 group-hover:-rotate-45" />
        <div>
          <h3 className="flex flex-wrap text-white">
            {title.split("").map((letter, index) => (
              <AnimatedLetter letter={letter === " " ? "\u00A0" : letter} key={index} />
            ))}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  if (slug) {
    return (
      <Link
        to="/services/$slug"
        params={{ slug }}
        className="block w-full h-full no-underline hover:no-underline"
      >
        {cardContent}
      </Link>
    );
  }

  if (to) {
    return (
      <Link to={to} className="block w-full h-full no-underline hover:no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// --- Grid wrapper ---
interface ColorChangeCardsProps {
  services: ServiceColorCardProps[];
}

export default function ColorChangeCards({ services }: ColorChangeCardsProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceColorCard key={service.title} {...service} />
      ))}
    </div>
  );
}

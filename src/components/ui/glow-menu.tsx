"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface MenuItem {
  icon: LucideIcon | React.FC<any>;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
  isHeaderDark?: boolean;
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
} as const;

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
} as const;

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
} as const;

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
} as const;

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, isHeaderDark = false, ...props }, ref) => {
    // Check dark mode state from document element class list
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    React.useEffect(() => {
      if (typeof document !== "undefined") {
        setIsDarkTheme(document.documentElement.classList.contains("dark"));
      }
    }, []);

    return (
      <motion.nav
        ref={ref as any}
        className={cn(
          "p-1 relative overflow-visible",
          className
        )}
        initial="initial"
        whileHover="hover"
        {...(props as any)}
      >
        <ul className="flex items-center gap-2 relative z-10">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            return (
              <motion.li key={item.label} className="relative">
                <Link
                  to={item.href}
                  activeOptions={{ exact: item.href === "/" }}
                  onClick={() => onItemClick?.(item.label)}
                  className="block w-full"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl text-lg font-medium",
                        isActive
                          ? isHeaderDark
                            ? "text-white font-semibold"
                            : "text-foreground font-semibold"
                          : isHeaderDark
                            ? "text-white/70 group-hover:text-white"
                            : "text-muted-foreground group-hover:text-foreground"
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive
                            ? isHeaderDark
                              ? "text-white"
                              : item.iconColor
                            : isHeaderDark
                              ? "text-white/70"
                              : "text-foreground",
                          isHeaderDark ? "group-hover:text-white" : `group-hover:${item.iconColor}`
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl text-lg font-medium",
                        isActive
                          ? isHeaderDark
                            ? "text-white font-semibold"
                            : "text-foreground font-semibold"
                          : isHeaderDark
                            ? "text-white/70 group-hover:text-white"
                            : "text-muted-foreground group-hover:text-foreground"
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive
                            ? isHeaderDark
                              ? "text-white"
                              : item.iconColor
                            : isHeaderDark
                              ? "text-white/70"
                              : "text-foreground",
                          isHeaderDark ? "group-hover:text-white" : `group-hover:${item.iconColor}`
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  }
);

MenuBar.displayName = "MenuBar";

"use client";
import React, { useRef, type RefObject, type ElementType } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface TimelineContentProps {
  children: React.ReactNode;
  as?: ElementType;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  className?: string;
  customVariants?: Record<string, unknown>;
  [key: string]: unknown;
}

export function TimelineContent({
  children,
  as: Tag = "div",
  animationNum,
  timelineRef,
  className,
  customVariants,
  ...props
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    root: undefined,
  });

  const MotionComponent = motion.create(Tag as keyof HTMLElementTagNameMap) as React.ComponentType<
    Record<string, unknown>
  >;

  const variants = customVariants || defaultVariants;

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={animationNum}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default TimelineContent;

"use client" 

import React, { Children, isValidElement, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface StickyTabItemProps {
  title: string;
  id: string | number;
  children: React.ReactNode;
}

const StickyTabItem: React.FC<StickyTabItemProps> = () => {
  return null;
};
StickyTabItem.displayName = 'StickyTabItem';
(StickyTabItem as any).isStickyTabItem = true;

interface StickyTabsProps {
  children: React.ReactNode;
  mainNavHeight?: string;
  rootClassName?: string;
  navSpacerClassName?: string;
  sectionClassName?: string;
  stickyHeaderContainerClassName?: string;
  headerContentWrapperClassName?: string;
  headerContentLayoutClassName?: string;
  titleClassName?: string;
  contentLayoutClassName?: string;
}

const StickyTabs: React.FC<StickyTabsProps> & { Item: React.FC<StickyTabItemProps> } = ({
  children,
  mainNavHeight = '6em',
  rootClassName = "bg-black text-white",
  navSpacerClassName = "border-b border-white/15 bg-black",
  sectionClassName = "bg-[#131313]",
  stickyHeaderContainerClassName = "shadow-lg",
  headerContentWrapperClassName = "border-b border-t border-white/15 bg-black",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8",
  titleClassName = "my-0 text-2xl font-medium leading-none md:text-3xl lg:text-4xl",
  contentLayoutClassName = "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);

  // HMR-safe filter for child elements
  const items = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false;
    const type = child.type as any;
    return (
      type === StickyTabItem ||
      type?.displayName === 'StickyTabItem' ||
      type?.name === 'StickyTabItem' ||
      type?.isStickyTabItem === true ||
      (child.props && typeof child.props === 'object' && 'title' in child.props && 'id' in child.props)
    );
  }) as React.ReactElement<StickyTabItemProps>[];

  const scrollTravel = 550; // Pixels to scroll to switch each card
  const lastCardStickyDistance = 450; // Pixels the blank card stays sticky to transition smoothly
  const [containerHeight, setContainerHeight] = useState(500);

  // Keep containerHeight in sync dynamically with actual rendered height
  useEffect(() => {
    if (!stickyContainerRef.current) return;
    
    const updateHeight = () => {
      if (stickyContainerRef.current) {
        setContainerHeight(stickyContainerRef.current.offsetHeight);
      }
    };
    
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    lastScrollTopRef.current = window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = scrollTop > lastScrollTopRef.current;
        lastScrollTopRef.current = scrollTop;

        const containerRect = containerRef.current.getBoundingClientRect();
        const stickyThreshold = 88; // Matches top-[5.5rem] in tailwind
        const S = stickyThreshold - containerRect.top;

        let newActiveIndex = 0;

        if (S < 0) {
          newActiveIndex = 0;
        } else if (S < scrollTravel) {
          newActiveIndex = 0;
        } else if (S < scrollTravel * 2) {
          newActiveIndex = 1;
        } else if (S < scrollTravel * 3) {
          newActiveIndex = 2;
        } else if (S < scrollTravel * 4) {
          newActiveIndex = 3;
        } else if (S < scrollTravel * 5) {
          newActiveIndex = 4;
        } else {
          // Determine the threshold for blank card based on scroll direction
          // If scrolling down, blank card triggers at scrollTravel * 6 (3300px).
          // If scrolling up, blank card is removed when we scroll up even 10-20% of the screen (e.g. 100px from bottom).
          const blankCardThreshold = isScrollingDown 
            ? scrollTravel * 6 
            : (scrollTravel * 6 + lastCardStickyDistance - 100);

          if (S < blankCardThreshold) {
            newActiveIndex = 5;
          } else {
            newActiveIndex = 6;
          }
        }

        newActiveIndex = Math.max(0, Math.min(items.length - 1, newActiveIndex));
        setActiveIndex((prev) => (prev !== newActiveIndex ? newActiveIndex : prev));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items.length]);

  // Calculate total height of StickyTabs dynamically
  const totalHeight = ((items.length - 1) * scrollTravel) + containerHeight + 88 + lastCardStickyDistance;

  return (
    <div 
      ref={containerRef} 
      className={clsx("relative overflow-visible", rootClassName)}
      style={{ height: `${totalHeight}px` }}
    >
      {/* Cards Stack Container */}
      <div
        ref={stickyContainerRef}
        className={clsx(
          "w-[92%] max-w-4xl mx-auto overflow-visible sticky top-[5.5rem] z-10 pointer-events-none h-[540px] lg:h-[500px]"
        )}
      >
        {items.map((item, index) => {
          const { title, id, children: itemContent } = item.props;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isFuture = index > activeIndex;

          const isBlankCard = title === "blank" || title === "";

          return (
            <motion.div
              key={id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : isPast ? 0.95 : 0,
                scale: isActive ? 1 : isPast ? 0.96 - (activeIndex - index) * 0.015 : 0.95,
                y: isActive ? 0 : isPast ? -6 * (activeIndex - index) : 80,
                pointerEvents: isActive ? "auto" : "none",
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                zIndex: index,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              className="overflow-visible w-full flex flex-col"
            >
              {isBlankCard ? (
                <div className="w-full h-full bg-black flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400/80 mb-2">
                    Process
                  </p>
                  <p className="text-sm text-slate-400/90 tracking-wide max-w-xs leading-relaxed font-medium">
                    A structured workflow designed to build premium digital products with speed and trust.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={clsx(
                      "flex flex-col",
                      stickyHeaderContainerClassName
                    )}
                  >
                    <div className={clsx(headerContentWrapperClassName)}>
                      <div className={clsx(headerContentLayoutClassName)}>
                        <div className="flex items-center justify-between">
                          <h2 className={clsx(titleClassName)}>
                            {title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={clsx(
                      contentLayoutClassName, 
                      "flex-1"
                    )}
                  >
                    {itemContent}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>


    </div>
  );
};

StickyTabs.Item = StickyTabItem;

export default StickyTabs;


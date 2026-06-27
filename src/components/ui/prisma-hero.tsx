import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";

/* ---------------- WordsPullUp Subcomponent ---------------- */
interface WordsPullUpSpanProps {
  word: string;
  i: number;
  isInView: boolean;
  showAsterisk: boolean;
  isLast: boolean;
}

const WordsPullUpSpan = ({ word, i, isInView, showAsterisk, isLast }: WordsPullUpSpanProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls
        .start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
        })
        .then(() => {
          controls.start({
            y: [0, -8, 0],
            transition: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            },
          });
        });
    }
  }, [isInView, controls, i]);

  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={controls}
      className="inline-block relative"
      style={{ marginRight: isLast ? 0 : "0.25em" }}
    >
      {word}
      {showAsterisk && isLast && (
        <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
      )}
    </motion.span>
  );
};

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <WordsPullUpSpan
            key={i}
            word={word}
            i={i}
            isInView={isInView}
            showAsterisk={showAsterisk}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle Subcomponent ---------------- */
interface WordsPullUpMultiStyleSpanProps {
  w: { word: string; className?: string };
  i: number;
  isInView: boolean;
}

const WordsPullUpMultiStyleSpan = ({ w, i, isInView }: WordsPullUpMultiStyleSpanProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls
        .start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
        })
        .then(() => {
          controls.start({
            y: [0, -8, 0],
            transition: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            },
          });
        });
    }
  }, [isInView, controls, i]);

  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={controls}
      className={`inline-block ${w.className ?? ""}`}
      style={{ marginRight: "0.25em" }}
    >
      {w.word}
    </motion.span>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <WordsPullUpMultiStyleSpan key={i} w={w} i={i} isInView={isInView} />
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  return (
    <section className="h-[100dvh] lg:h-screen w-full">
      <div className="relative h-full w-full overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 sm:px-6 sm:pb-2 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 pb-0 sm:gap-5 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-primary/95 sm:text-xl md:text-2xl font-medium"
                style={{ lineHeight: 1.5, color: "rgba(225, 224, 204, 0.95)" }}
              >
                We help startups, local businesses, and growing brands build premium websites,
                e-commerce platforms, and custom software that produce real business results.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="self-start animate-fade-in"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-4 rounded-full bg-primary py-2 pl-7 pr-2 text-lg font-bold text-black transition-all hover:gap-5 sm:text-xl"
                >
                  Get Free Consultation
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                    <ArrowRight className="h-5 w-5" style={{ color: "#E1E0CC" }} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };

"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export const HeroParallax = ({
  products,
  title,
  description,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  title?: string;
  description?: string;
}) => {
  const half = Math.ceil(products.length / 2);
  const firstRow = products.slice(0, half);
  const secondRow = products.slice(half);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-x-clip antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] will-change-transform"
    >
      <Header title={title} description={description} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="will-change-transform"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 will-change-transform">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 will-change-transform">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight">
        {title ?? (
          <>
            The Ultimate <br /> development studio
          </>
        )}
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-slate-300">
        {description ??
          "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products."}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 will-change-transform"
    >
      <div className="block h-full w-full relative rounded-2xl overflow-hidden group-hover/product:shadow-2xl transition-shadow pointer-events-none select-none">
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-2xl transition-opacity duration-300"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-lg transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};

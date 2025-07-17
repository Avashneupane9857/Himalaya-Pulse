import { p1, p2, p1_part2 } from "../assets";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";

// Type definitions
interface Product {
  title: string;
  content: string;
  img: string;
  img2?: string;
}

interface ImageTransitionProps {
  img1: string;
  img2: string;
  alt: string;
  interval?: number;
  transitionDuration?: number;
}

// Constants
const TRANSITION_INTERVAL = 2000; // 3 seconds
const TRANSITION_DURATION = 0.8;

const products: Product[] = [
  {
    title: "Himalaya Pulse - HEALIFERA",
    content:
      "Healifera is an organic mix of beneficial plants, mainly Moringa leaves powder, rich in vitamins, minerals, amino acids, and antioxidants. It helps fight inflammation, lower blood sugar and cholesterol. Known as a Super Food it offers many health benefits. Stevia, a natural sweetener, is added for taste. Healifera is derived from Moringa Oleifera.",
    img: p1,
    img2: p1_part2,
  },
  {
    title: "Himalaya Pulse - Shilajit",
    content:
      "Shilajit is a naturally found organic mineral compound found in the Himalayan Ranges of Nepal, India, Afghanistan and elsewhere. Himalaya Pulse - Shilajit is naturally sourced from the mountainous regions of Nepal and is thoroughly processed for consumption with lab reports from ISO Certified Laboratory and Research Centre. Shilajit has many beneficial factors such as aging, heart health, energy boost, boosts testosterone, supports fertility etc.",
    img: p2,
  },
];

const ImageTransition: React.FC<ImageTransitionProps> = ({
  img1,
  img2,
  alt,
  interval = TRANSITION_INTERVAL,
  transitionDuration = TRANSITION_DURATION,
}) => {
  const [currentImage, setCurrentImage] = useState<0 | 1>(0);

  const toggleImage = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(toggleImage, interval);
    return () => clearInterval(intervalId);
  }, [toggleImage, interval]);

  const transitionProps = useMemo(
    () => ({
      duration: transitionDuration,
      ease: "easeInOut" as const,
    }),
    [transitionDuration]
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.img
        key={`img1-${currentImage}`}
        className="absolute inset-0 w-full h-full object-contain"
        src={img1}
        alt={`${alt}-1`}
        initial={{ opacity: currentImage === 0 ? 0 : 1 }}
        animate={{ opacity: currentImage === 0 ? 1 : 0 }}
        transition={transitionProps}
        loading="lazy"
      />
      <motion.img
        key={`img2-${currentImage}`}
        className="absolute inset-0 w-[110%] h-[110%] object-contain -top-[5%] -left-[5%]"
        src={img2}
        alt={`${alt}-2`}
        initial={{ opacity: currentImage === 1 ? 0 : 1 }}
        animate={{ opacity: currentImage === 1 ? 1 : 0 }}
        transition={transitionProps}
        loading="lazy"
      />
    </div>
  );
};

const Products: React.FC = () => {
  const location = useLocation();

  // Memoize the product index parsing
  const productIndex = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const index = parseInt(queryParams.get("i") || "0");
    return isNaN(index) ? 0 : Math.max(0, Math.min(index, products.length - 1));
  }, [location.search]);

  const currentProduct = products[productIndex];
  const isHealifera = productIndex === 0;

  // Early return if product doesn't exist
  if (!currentProduct) {
    return (
      <div className="flex flex-col h-auto sm:h-[100vh] overflow-y-hidden justify-between">
        <Navbar isHome={false} />
        <div className="flex items-center justify-center flex-1">
          <p className="text-primary text-lg">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto sm:h-[100vh] overflow-y-hidden justify-between">
      <Navbar isHome={false} />
      <div
        id="products"
        className={`${styles.paddingX} py-2 w-full h-[550px] sm:h-auto flex flex-col gap-2`}
      >
        <motion.h1
          variants={textVariant(0.2)}
          className={`${styles.sectionHeadText} h-[20%] text-primary font-semibold ml-4`}
        >
          {currentProduct.title}
        </motion.h1>

        <motion.div
          variants={fadeIn("right", "spring", 0.7, 0.5)}
          className="w-full flex sm:h-[40vh] flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-around items-center"
        >
          <div className="w-[80%] sm:w-[50%] h-[90%]">
            {isHealifera && currentProduct.img2 ? (
              <ImageTransition
                img1={currentProduct.img}
                img2={currentProduct.img2}
                alt="healifera-product"
              />
            ) : (
              <img
                className="w-full h-full object-contain"
                src={currentProduct.img}
                alt={`${currentProduct.title} product`}
                loading="lazy"
              />
            )}
          </div>

          <div className="w-[80%] sm:w-[57%]">
            <p className="text-primary sm:leading-loose sm:tracking-wider">
              {currentProduct.content}
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SectionWrapper(Products);

import { ArrowRight, ArrowDown, Truck, RefreshCcw, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import heroImagelg from "@/assets/model1024.webp";
import heroImageSm from "@/assets/model480.webp";
import heroImageMd from "@/assets/model768.webp";

const carouselItems = [
  { text: "Featured: Summer Collection", color: "bg-amber-100" },
  { text: "New Arrivals: Elegant Essentials", color: "bg-blue-100" },
  { text: "Limited Time: 40% Off Select Styles", color: "bg-green-100" },
];

const HeroSection = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 pb-8 pt-4 sm:min-h-[calc(100vh-5rem)] lg:pb-16 lg:pt-8">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column: Text content */}
          <div className="order-2 lg:order-1">
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Elevate Your Wardrobe
              <span className="mt-2 block text-3xl sm:text-4xl lg:text-5xl">
                Exclusive Styles for Every Occasion
              </span>
            </h1>

            <div className="mb-6 h-1 w-24 bg-gray-200"></div>

            <p className="mb-8 max-w-prose text-pretty text-lg text-gray-600 sm:text-xl">
              Discover timeless elegance with our new collection – Limited Time
              Offer!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products" className="inline-flex">
                <button className="group flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-gray-700 hover:to-gray-900 sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="w-full rounded-full border-2 border-gray-300 px-6 py-2 text-lg font-medium text-gray-600 transition-colors duration-300 hover:bg-gray-100 sm:w-auto">
                View Latest Arrivals
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-gray-500 sm:grid-cols-3">
              <div className="flex items-center justify-center sm:justify-start">
                <Truck className="mr-2 h-5 w-5" />
                Free Shipping
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <RefreshCcw className="mr-2 h-5 w-5" />
                Easy Returns
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Lock className="mr-2 h-5 w-5" />
                Secure Payments
              </div>
            </div>
          </div>

          {/* Right column: Image and carousel */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-md">
              {/* Loading placeholder */}
              <div
                className={`aspect-[3/4] w-full rounded-lg bg-gray-200 transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Actual image */}
              <img
                src={heroImageMd}
                alt="Model wearing premium clothing"
                className={`absolute inset-0 h-full w-full rounded-lg object-cover shadow-2xl transition-all duration-300 hover:scale-105 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsImageLoaded(true)}
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"
                srcSet={`${heroImageSm} 480w, ${heroImageMd} 768w,${heroImagelg} 1024w`}
              />

              <div className="absolute -bottom-6 left-1/2 w-5/6 -translate-x-1/2 transform">
                <div
                  className={`rounded-full p-2 text-center font-semibold shadow-lg transition-all duration-300 sm:p-4 ${carouselItems[carouselIndex].color}`}
                >
                  {carouselItems[carouselIndex].text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform animate-bounce sm:block">
        <ArrowDown className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8" />
      </div>
    </section>
  );
};

export default HeroSection;

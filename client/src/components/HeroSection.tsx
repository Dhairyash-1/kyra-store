import { ArrowRight, ArrowDown, Truck, RefreshCcw, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/model.png";

const carouselItems = [
  { text: "Featured: Summer Collection", color: "bg-amber-100" },
  { text: "New Arrivals: Elegant Essentials", color: "bg-blue-100" },
  { text: "Limited Time: 40% Off Select Styles", color: "bg-green-100" },
];

export default function HeroSection() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 sm:max-h-screen">
      {/* Background pattern */}
      {/* <div className="absolute inset-0 bg-[url('/linen-texture.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-[url('/stitching-pattern.svg')] opacity-5"></div> */}

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between px-4 py-16 lg:flex-row">
        {/* Left column: Text content */}
        <div className="mb-12 lg:mb-0 lg:w-1/2">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Elevate Your Wardrobe
            <span className="mt-2 block text-3xl md:text-4xl lg:text-5xl">
              Exclusive Styles for Every Occasion
            </span>
          </h1>
          <div className="mb-6 h-1 w-24 bg-gray-200"></div>
          <p className="mb-8 text-xl text-gray-600">
            Discover timeless elegance with our new collection – Limited Time
            Offer!
          </p>
          <div className="space-y-4">
            <Link to={"/products"}>
              <button className="group flex items-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:from-gray-700 hover:to-gray-900">
                Shop Now
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="rounded-full border-2 border-gray-300 px-6 py-2 text-lg font-medium text-gray-600 transition-colors duration-300 hover:bg-gray-100">
              View Latest Arrivals
            </button>
          </div>
          <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Free Shipping
            </div>
            <div className="flex items-center">
              <RefreshCcw className="mr-2 h-5 w-5" />
              Easy Returns
            </div>
            <div className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Secure Payments
            </div>
          </div>
        </div>

        {/* Right column: Image and carousel */}
        <div className="relative lg:w-1/3">
          <div className="relative w-full overflow-hidden  rounded-lg from-gray-50 to-gray-100 shadow-2xl transition-transform duration-300 hover:scale-105">
            <img
              src={heroImage}
              alt="Model wearing premium clothing"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 w-5/6 -translate-x-1/2 transform">
            <div
              className={`rounded-full p-2 text-center font-semibold sm:p-4 ${carouselItems[carouselIndex].color}`}
            >
              {carouselItems[carouselIndex].text}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 transform animate-bounce sm:bottom-6">
        <ArrowDown className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8" />
      </div>
    </section>
  );
}

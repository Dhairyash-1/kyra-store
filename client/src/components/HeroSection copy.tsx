import { ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const highlights = ["New Arrivals", "Summer Collection", "Best Sellers"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-[#131118]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-2/3 w-2/3 -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#131118]/5"></div>
        <div className="absolute bottom-0 right-0 h-2/3 w-2/3 translate-x-1/4 translate-y-1/4 rounded-full bg-[#131118]/5"></div>
      </div>
      <div className="container relative mx-auto flex flex-col items-center justify-between px-4 py-24 sm:px-6 lg:flex-row lg:px-8 lg:py-20">
        <div
          className={`space-y-8 text-left transition-all duration-1000 ease-out lg:w-1/2 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your{" "}
            <span className="relative text-[#131118]">
              Style
              <span className="absolute bottom-0 left-0 h-2 w-full bg-[#131118]/20"></span>
            </span>
          </h1>
          <p className="max-w-xl text-lg font-light text-[#131118]/80 sm:text-xl md:text-2xl">
            Discover our curated collection of timeless elegance and
            contemporary fashion.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#131118] px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-[#131118]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#131118] focus:ring-offset-2 focus:ring-offset-white">
              <span className="relative flex items-center">
                Shop Now
                <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button className="group inline-flex items-center justify-center rounded-full border-2 border-[#131118] px-8 py-3 text-lg font-medium text-[#131118] transition-all duration-300 ease-out hover:bg-[#131118] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#131118] focus:ring-offset-2 focus:ring-offset-white">
              <span className="relative flex items-center">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
        <div
          className={`mt-10 transition-all delay-300 duration-1000 ease-out lg:mt-0 lg:w-2/5 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square w-full">
            <div
              className={`absolute inset-0 rounded-full border-[24px] border-[#131118]/10 transition-all duration-500 ${
                isHovered ? "scale-105" : ""
              }`}
            ></div>
            <div
              className={`absolute inset-[24px] rounded-full border-[16px] border-[#131118]/20 transition-all duration-500 ${
                isHovered ? "scale-110" : ""
              }`}
            ></div>
            <div
              className={`group absolute inset-[40px] flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#131118] transition-all duration-500 ${
                isHovered ? "scale-105 shadow-lg" : ""
              }`}
            >
              <div className="text-center">
                <p
                  className={`mb-2 text-3xl font-bold text-white transition-all duration-300 ${
                    isHovered ? "-translate-y-2 transform" : ""
                  }`}
                >
                  {highlights[activeIndex]}
                </p>
                <p
                  className={`flex items-center justify-center text-lg text-white/70 transition-all duration-300 ${
                    isHovered ? "translate-y-2 transform" : ""
                  }`}
                >
                  Explore Now
                  <ChevronRight
                    className={`ml-1 h-5 w-5 transition-all duration-300 ${
                      isHovered ? "translate-x-1 transform" : ""
                    }`}
                  />
                </p>
              </div>
            </div>
            <div
              className={`absolute inset-0 rounded-full border-2 border-[#131118]/30 transition-all duration-500 ${
                isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 focus:outline-none ${
              index === activeIndex
                ? "w-8 bg-[#131118]"
                : "bg-[#131118]/30 hover:bg-[#131118]/50"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${highlights[index]}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

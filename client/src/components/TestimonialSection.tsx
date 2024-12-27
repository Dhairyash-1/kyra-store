import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

import TestimonialCard from "./TestimonialCard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

import { testimonials } from "@/constants";

const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between sm:flex-row">
          <div className="relative mb-8 sm:mb-0">
            <h2 className="text-4xl font-bold text-black">Customer Stories</h2>
            <div className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full bg-black" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => api?.scrollPrev()}
              className={`rounded-full border-2 border-black p-3 transition-all duration-300 hover:bg-black hover:text-white ${
                current === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:scale-110"
              }`}
              disabled={current === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className={`rounded-full border-2 border-black p-3 transition-all duration-300 hover:bg-black hover:text-white ${
                current === count
                  ? "cursor-not-allowed opacity-50"
                  : "hover:scale-110"
              }`}
              disabled={current === count}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <div className="group h-full">
                  <TestimonialCard {...item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;

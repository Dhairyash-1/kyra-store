import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
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
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const handleNext = () => {
    api?.scrollNext();
  };

  const handlePrev = () => {
    api?.scrollPrev();
  };

  return (
    <section className="mt-24 w-full bg-gray-5 p-2 pb-8 lg:px-20">
      <Carousel setApi={setApi} orientation="horizontal">
        <div className="my-12 flex items-start justify-between">
          <h1 className="text-2xl font-normal text-dark-90 xs:text-3xl md:text-4xl">
            What our Customers say
          </h1>
          <div className="flex gap-4">
            <button
              aria-label="move backward"
              onClick={handlePrev}
              className={`flex-center cursor-pointer rounded-lg bg-white-20 p-[12px] text-dark-500 hover:bg-dark-500 hover:text-white  ${
                current === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              disabled={current === 1}
            >
              <ArrowLeftIcon size={22} />
            </button>
            <button
              aria-label="move forward"
              onClick={handleNext}
              className={`flex-center cursor-pointer rounded-lg bg-white-20 p-[12px] text-dark-500 hover:bg-dark-500 hover:text-white   ${
                current === count ? "pointer-events-none opacity-50" : ""
              }`}
              disabled={current === count}
            >
              <ArrowRightIcon size={22} />
            </button>
          </div>
        </div>

        <CarouselContent className="flex h-full  items-stretch py-4">
          {testimonials.map((item) => (
            <CarouselItem
              key={item.id}
              className="h-full flex-grow sm:basis-1/2  lg:basis-1/3"
            >
              <TestimonialCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
export default TestimonialSection;

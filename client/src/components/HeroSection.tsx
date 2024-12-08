import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import image from "../assets/women.jpg";

export default function Component() {
  return (
    <section className="flex-center relative mt-4 max-h-[calc(100vh-80px)] w-full bg-white-10 px-8 py-16 lg:px-20">
      <div className="container mx-auto flex flex-col-reverse items-center justify-center gap-6 md:flex-row md:gap-0 lg:items-center">
        <div className="flex-1 space-y-10 text-center sm:text-start md:w-1/2">
          <div className="space-y-4">
            <h2 className="text-3xl font-normal text-gray-800 md:text-4xl">
              Effortless Essentials
            </h2>
            <h1 className="text-5xl font-extrabold text-gray-900 md:text-6xl">
              The New Collection
            </h1>
            <p className="mt-4 text-3xl font-normal text-gray-900 md:text-4xl">
              UPTO 40% OFF
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden h-[400px] flex-1 overflow-hidden md:block md:w-1/2 lg:block lg:h-[500px]">
          <img
            src={image}
            className="mx-auto h-full w-auto rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}

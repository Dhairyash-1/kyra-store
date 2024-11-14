import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

import CategoryCard from "./CategoryCard";
import { productCategories } from "../constants/index";

interface CategoryType {
  id: number;
  title: string;
  href: string;
  image: string;
}

const ShopCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(1);
  const [visibleCategories, setVisibleCategories] = useState<CategoryType[]>(
    []
  );
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setScreenSize(1);
      } else if (screenSize < 768) {
        setScreenSize(2);
      } else if (screenSize < 1024) {
        setScreenSize(3);
      } else {
        setScreenSize(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const start = currentIndex;
    const end = start + screenSize;
    setVisibleCategories(productCategories.slice(start, end));
    setIsNextDisabled(currentIndex + screenSize >= productCategories.length);
    setIsPrevDisabled(currentIndex === 0);
  }, [currentIndex, screenSize]);

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "right" && !isNextDisabled) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "left" && !isPrevDisabled) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="mt-24 w-full lg:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium text-dark-90 md:text-4xl">
          Shop by Categories
        </h1>
        <div className="flex gap-4">
          <button
            className={`flex-center cursor-pointer rounded-lg bg-white-20 p-[12px] text-dark-500  hover:bg-dark-500 hover:text-white ${
              isPrevDisabled ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => handleArrowClick("left")}
          >
            <ArrowLeftIcon size={22} className="font-normal" />
          </button>
          <button
            className={`flex-center cursor-pointer rounded-lg bg-white-20 p-[12px] text-dark-500  hover:bg-dark-500 hover:text-white ${
              isNextDisabled ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => handleArrowClick("right")}
          >
            <ArrowRightIcon size={22} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 py-14 transition duration-500 ease-in-out sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <div key={category.id} className="animate-slide-in-from-left">
            <CategoryCard
              title={category.title}
              href={category.href}
              image={category.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopCategory;

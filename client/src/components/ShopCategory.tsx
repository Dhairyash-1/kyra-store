import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

import { useGetTrendingCategoriesQuery } from "@/services/categoryApi";

interface CategoryStateType {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
  parentId: null | number;
}

const ShopCategory = () => {
  const { data, isLoading } = useGetTrendingCategoriesQuery();
  const shopCategories = data?.data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(1);
  const [visibleCategories, setVisibleCategories] = useState<
    CategoryStateType[]
  >([]);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 414) {
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
    if (!shopCategories || shopCategories.length === 0) return;
    setVisibleCategories(shopCategories.slice(start, end));
    setIsNextDisabled(currentIndex + screenSize >= shopCategories.length);
    setIsPrevDisabled(currentIndex === 0);
  }, [currentIndex, screenSize, shopCategories]);

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "right" && !isNextDisabled) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "left" && !isPrevDisabled) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="mt-24 w-full lg:px-20">
      <div className="flex items-start justify-between">
        <h1 className=" text-2xl font-medium text-dark-90 xs:text-3xl md:text-4xl">
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
      <div className="grid grid-cols-1 gap-8 py-14 transition duration-500 ease-in-out xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-slide-in-from-left">
                <CategoryCardSkeleton />
              </div>
            ))
          : visibleCategories.map((category) => {
              const isParentCategory = category.parentId === null;
              const hrefUrl = isParentCategory
                ? `/products?categories=${category.slug}`
                : `/products?subcategories=${category.slug}`;
              return (
                <div key={category.id} className="animate-slide-in-from-left">
                  <CategoryCard
                    title={category.name}
                    href={hrefUrl}
                    image={category.imageUrl}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default ShopCategory;

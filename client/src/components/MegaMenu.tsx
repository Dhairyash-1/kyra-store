import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetAllCategoryQuery } from "@/services/categoryApi";
import { transformMenuCategories } from "@/utils/helper";

interface SubCategoryProp {
  category: string;
  items: any[];
  setNavOpen?: (state: boolean) => void;
}

const SubCategory = ({ category, items, setNavOpen }: SubCategoryProp) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-base font-normal text-dark-500"
      >
        {category}
        <ChevronDown
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transform overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-2 pb-3 pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/products?subcategories=${item.slug}`}
                className="text-sm text-gray-600 hover:text-dark-500"
                onClick={() => {
                  if (setNavOpen) {
                    setNavOpen(false);
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const MegaMenu = ({
  setNavOpen,
}: {
  setNavOpen?: (state: boolean) => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useGetAllCategoryQuery();

  // const menuCategories = {
  //   Men: [
  //     "T-Shirts",
  //     "Casual Shirts",
  //     "Formal Shirts",
  //     "Jackets",
  //     "Blazers & Coats",
  //   ],
  //   Women: [
  //     "Kurtas & Suits",
  //     "Sarees",
  //     "Ethnic Wear",
  //     "Lehenga Cholis",
  //     "Jackets",
  //   ],
  //   Footwear: [
  //     "Flats",
  //     "Casual Shoes",
  //     "Heels",
  //     "Boots",
  //     "Sports Shoes & Floaters",
  //   ],
  //   Kids: [
  //     "T-Shirts",
  //     "Shirts",
  //     "Jeans",
  //     "Trousers",
  //     "Party Wear",
  //     "Innerwear & Thermal",
  //   ],
  // };

  const menuCategories = data?.data ? transformMenuCategories(data?.data) : {};
  return (
    <>
      {/* overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-dark-500 bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      {/* Desktop Mega Menu */}
      <div className="hidden md:block">
        <button
          // onMouseEnter={() => setIsMenuOpen(true)}
          className="flex items-center gap-1 text-base font-medium text-dark-500"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Shop
          {isMenuOpen ? (
            <ChevronUp className={`h-4 w-4`} />
          ) : (
            <ChevronDown className={`h-4 w-4`} />
          )}
        </button>

        {/* Desktop Mega Menu Content - Centered */}

        {isMenuOpen && (
          <div
            className="absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 transform bg-white opacity-100 shadow-lg transition-all duration-300 ease-in-out lg:w-[900px]"
            // onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {Object.entries(menuCategories).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-4 text-lg font-medium text-dark-500">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/products?subcategories=${item.slug}`}
                            className="text-sm text-gray-600 hover:text-dark-500"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Mega Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex w-full items-center justify-between py-3 text-2xl font-medium text-gray-700"
        >
          <span>Shop</span>
          <ChevronDown
            className={`h-6 w-6 transform transition-transform duration-200 ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile Categories Accordion */}
        <div
          className={`transform overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 pl-4">
            {Object.entries(menuCategories).map(([category, items]) => (
              <SubCategory
                key={category}
                category={category}
                items={items}
                setNavOpen={setNavOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;

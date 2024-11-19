import { ChevronDown, ChevronUp, Minus, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useGetAllCategoryQuery } from "@/services/categoryApi";

const CategoryFilter = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [subCategoryState, setSubCategoryState] = useState<{
    [key: string]: boolean;
  }>({});
  const { data, isLoading } = useGetAllCategoryQuery();

  const toggleSubCategory = (categoryName: string) => {
    setSubCategoryState((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const categories = data?.data;

  return (
    <div className="pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Product Categories</h1>
        <button onClick={() => setToggleFilter((prev) => !prev)}>
          {toggleFilter ? (
            <ChevronDown size={24} strokeWidth={1.5} />
          ) : (
            <ChevronUp size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {!isLoading && !toggleFilter && (
        <div className="mt-4 flex flex-col gap-4">
          {categories?.map((category) => (
            <div key={category.name} className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="font-normal">{category.name}</span>
                </div>

                {category.children && category?.children?.length > 0 && (
                  <button onClick={() => toggleSubCategory(category.name)}>
                    {subCategoryState[category.name] ? (
                      <Minus size={24} strokeWidth={1.5} />
                    ) : (
                      <PlusIcon size={24} strokeWidth={1.5} />
                    )}
                  </button>
                )}
              </div>

              {/* Show subcategories if expanded */}
              {subCategoryState[category.name] &&
                category.children &&
                category?.children?.length > 0 && (
                  <div className="ml-6 mt-2 flex flex-col gap-2">
                    {category?.children?.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox />
                        <span className="font-normal">{subcategory.name}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

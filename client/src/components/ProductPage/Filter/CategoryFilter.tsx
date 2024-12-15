import { ChevronDown, ChevronUp, Minus, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { useGetFilterCategoryQuery } from "@/services/categoryApi";

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [subCategoryState, setSubCategoryState] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  const { data, isLoading } = useGetFilterCategoryQuery();
  const categories = data?.data;

  const toggleSubCategory = (categoryName: string) => {
    setSubCategoryState((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((cat) => cat !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleSubcategoryToggle = (subcategorySlug: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategorySlug)
        ? prev.filter((sub) => sub !== subcategorySlug)
        : [...prev, subcategorySlug]
    );
  };
  useEffect(() => {
    const categoriesFromUrl = searchParams.get("categories")?.split(",") || [];
    const subcategoriesFromUrl =
      searchParams.get("subcategories")?.split(",") || [];

    setSelectedCategories(categoriesFromUrl);
    setSelectedSubcategories(subcategoriesFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    if (selectedSubcategories.length > 0) {
      params.set("subcategories", selectedSubcategories.join(","));
    } else {
      params.delete("subcategories");
    }

    setSearchParams(params);
  }, [
    selectedCategories,
    selectedSubcategories,
    searchParams,
    setSearchParams,
  ]);

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
                  <Checkbox
                    checked={selectedCategories.includes(category.slug)}
                    onClick={() => handleCategoryToggle(category.slug)}
                  />
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
                        <Checkbox
                          checked={selectedSubcategories.includes(
                            subcategory.slug
                          )}
                          onClick={() =>
                            handleSubcategoryToggle(subcategory.slug)
                          }
                        />
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

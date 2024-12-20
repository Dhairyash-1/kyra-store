import { useState } from "react";

import SortSelect from "../SortSelect";
import { FilterButton } from "./Filter/FilterButton";
import { FilterModal } from "./Filter/FilterModal";

const ProductToolBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  // const isTablet = useMediaQuery("(min-width: 768px)");

  const handleApplyFilters = () => {
    // Logic to apply filters
    setActiveFilters(1); // Example: set to 3 active filters
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    // Logic to clear filters
    setActiveFilters(0);
  };

  return (
    <div className="mb-4 flex items-center justify-between lg:justify-end">
      <>
        <FilterButton
          onClick={() => setIsFilterOpen(true)}
          activeFilters={activeFilters}
        />
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </>
      <SortSelect />
    </div>
  );
};

export default ProductToolBar;

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { useGetProductSizesQuery } from "@/services/productApi";

interface Size {
  id: number;
  name: string;
  productCount: number;
}

const SizeOption = ({
  size,
  isSelected,
  onChange,
}: {
  size: Size;
  isSelected: boolean;
  onChange: (sizeName: string, isChecked: boolean) => void;
}) => (
  <div key={size.id} className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Checkbox
        checked={isSelected}
        onCheckedChange={(isChecked) => onChange(size.name, !!isChecked)}
      />
      <span className="font-normal">{size.name}</span>
    </div>
    <span className="text-sm text-dark-90">({size.productCount})</span>
  </div>
);

const SizeFilter = () => {
  const { data } = useGetProductSizesQuery();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizes = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    const currentSizes = searchParams.getAll("size");
    if (JSON.stringify(currentSizes) !== JSON.stringify(selectedSizes)) {
      searchParams.delete("size");
      selectedSizes.forEach((size) => searchParams.append("size", size));
      setSearchParams(searchParams);
    }
  }, [selectedSizes, searchParams, setSearchParams]);

  const handleSizeChange = (sizeName: string, isChecked: boolean) => {
    setSelectedSizes((prev) =>
      isChecked ? [...prev, sizeName] : prev.filter((name) => name !== sizeName)
    );
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Filter By Size</h1>
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>
          {isFilterOpen ? (
            <ChevronUp size={24} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Size options */}
      {isFilterOpen && (
        <div className="mt-4 flex flex-col gap-4">
          {sizes
            .filter((size) => size.productCount > 0)
            .map((size) => (
              <SizeOption
                key={size.id}
                size={size}
                isSelected={selectedSizes.includes(size.name)}
                onChange={handleSizeChange}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;

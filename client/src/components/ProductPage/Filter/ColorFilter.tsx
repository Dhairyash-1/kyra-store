import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetProductColorsQuery } from "@/services/productApi";

interface Color {
  id: number;
  name: string;
  hexCode: string;
  productCount: number;
}

const ColorOption = ({
  color,
  isSelected,
  onSelect,
}: {
  color: Color;
  isSelected: boolean;
  onSelect: (colorName: string) => void;
}) => (
  <div
    key={color.id}
    onClick={() => onSelect(color.name)}
    className="flex cursor-pointer items-center justify-between"
  >
    <div className="flex items-center gap-2">
      <div
        className="h-5 w-5 rounded-sm"
        style={{ backgroundColor: color.hexCode }}
      ></div>
      <span>{color.name}</span>
      {isSelected && (
        <span className="h-3 w-3 rounded-full border bg-black"></span>
      )}
    </div>
    <span className="text-sm text-dark-90">({color.productCount})</span>
  </div>
);

const ColorFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useGetProductColorsQuery();
  const colors = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    const previousColor = searchParams.get("color");
    if (previousColor !== selectedColor) {
      if (selectedColor) {
        searchParams.set("color", selectedColor);
      } else {
        searchParams.delete("color");
      }
      setSearchParams(searchParams);
    }
  }, [selectedColor, searchParams, setSearchParams]);

  const handleColorSelect = (colorName: string) => {
    setSelectedColor((prev) => (prev === colorName ? "" : colorName));
  };

  return (
    <div className="py-6">
      {/* Header with toggle button */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Filter By Color</h1>
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>
          {isFilterOpen ? (
            <ChevronUp size={24} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Color options */}
      {isFilterOpen && (
        <div className="mt-4 flex flex-col gap-4">
          {colors
            .filter((color) => color.productCount > 0)
            .map((color) => (
              <ColorOption
                key={color.id}
                color={color}
                isSelected={selectedColor === color.name}
                onSelect={handleColorSelect}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;

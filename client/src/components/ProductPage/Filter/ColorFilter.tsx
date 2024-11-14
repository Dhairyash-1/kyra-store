import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

type ColorOption = {
  name: string;
  colorCode: string;
  count: number;
};

const colorOptions: ColorOption[] = [
  { name: "Red", colorCode: "#f23939", count: 10 },
  { name: "Blue", colorCode: "#1491f7", count: 7 },
  { name: "Green", colorCode: "#27da72", count: 5 },
  { name: "Black", colorCode: "#181a19", count: 13 },
  { name: "Pink", colorCode: "#ec1169", count: 15 },
  // Add more colors as needed
];

const ColorFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      {/* Header with toggle button */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Filter By Color</h1>
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>
          {!isFilterOpen ? (
            <ChevronDown size={24} strokeWidth={1.5} />
          ) : (
            <ChevronUp size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Color options */}
      {isFilterOpen && (
        <div className="mt-4 flex flex-col gap-4">
          {colorOptions.map((color) => (
            <div key={color.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-5 w-5 rounded-sm"
                  style={{ backgroundColor: color.colorCode }}
                ></div>
                <span>{color.name}</span>
              </div>
              <span className="text-sm text-dark-90">({color.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;

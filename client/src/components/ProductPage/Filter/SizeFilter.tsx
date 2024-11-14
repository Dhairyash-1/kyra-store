import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

interface SizeOption {
  name: string;
  count: number;
}

const sizeOption: SizeOption[] = [
  {
    name: "S",
    count: 5,
  },
  {
    name: "M",
    count: 9,
  },
  {
    name: "L",
    count: 18,
  },
  {
    name: "XL",
    count: 12,
  },
  {
    name: "XXL",
    count: 3,
  },
];

const SizeFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="py-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-base font-bold">Filter By Size</h1>
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>
          {isFilterOpen ? (
            <ChevronUp size={24} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
      {isFilterOpen && (
        <div className="mt-4 flex flex-col gap-4">
          {sizeOption.map((size) => (
            <div key={size.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="font-normal">{size.name}</span>
              </div>
              <span className="text-sm text-dark-90">({size.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;

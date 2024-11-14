import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Slider } from "@/components/ui/slider";

const PriceFilter = () => {
  const [price, setPrice] = useState([0, 2000]);
  const [togglePriceFilter, setTogglePriceFilter] = useState(false);
  return (
    <div className="flex flex-col py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Filter By Price</h1>
        <button onClick={() => setTogglePriceFilter((prev) => !prev)}>
          {togglePriceFilter ? (
            <ChevronDown size={24} strokeWidth={1.5} />
          ) : (
            <ChevronUp size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
      {!togglePriceFilter && (
        <div className="mt-4 flex flex-col gap-3">
          <h1>
            Price: ${price[0]} - $ {price[1]}
          </h1>
          <DualRangeSlider
            value={price}
            onValueChange={setPrice}
            step={1}
            max={price[1]}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;

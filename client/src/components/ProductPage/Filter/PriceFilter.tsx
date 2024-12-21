import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DualRangeSlider } from "@/components/ui/dual-range-slider";

const PriceFilter = () => {
  const [price, setPrice] = useState([0, 3000]);
  const [togglePriceFilter, setTogglePriceFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedPrice, setDebouncedPrice] = useState(price);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(price);
    }, 500);

    // Cleanup the timeout on component unmount or when price changes
    return () => clearTimeout(handler);
  }, [price]);

  useEffect(() => {
    if (debouncedPrice) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        low: debouncedPrice[0].toString(),
        high: debouncedPrice[1].toString(),
      });
    }
  }, [debouncedPrice, searchParams, setSearchParams]);

  return (
    <div className="flex flex-col py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold">Filter By Price</h1>
        <button
          aria-label={togglePriceFilter ? "close filter" : "expand filter"}
          onClick={() => setTogglePriceFilter((prev) => !prev)}
        >
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
            Price: ₹{price[0]} - ₹{price[1]}
          </h1>
          <DualRangeSlider
            value={price}
            onValueChange={setPrice}
            step={1}
            max={3000} // Adjust based on your price range
          />
        </div>
      )}
    </div>
  );
};
export default PriceFilter;

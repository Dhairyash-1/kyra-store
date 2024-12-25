import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { useState } from "react";

import { Button } from "./ui/button";

const CouponInput = () => {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <Collapsible
      className="mb-4"
      open={isDiscountOpen}
      onOpenChange={setIsDiscountOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start  px-4 text-sm text-muted-foreground hover:no-underline"
        >
          {isDiscountOpen ? "- Hide" : "+ Apply"} discount code
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <label
          htmlFor="coupon"
          className="mb-2 block text-xs font-normal text-dark-80 sm:text-sm"
        >
          Enter Discount Code
        </label>
        {isError && <p className="mb-1 text-red-500">invaild coupone code</p>}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
          <input
            type="text"
            id="coupon"
            placeholder="Enter coupon code"
            className="flex-grow rounded-md border border-gray-300 px-3 py-2 
                   text-sm text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-500 sm:rounded-l-md
                   sm:rounded-r-none sm:py-3 sm:text-base"
          />
          <button
            onClick={() => setIsError(true)}
            className="hover:bg-dark-600 w-full  border border-dark-500 bg-dark-500 
                   px-4 py-2 text-sm text-white transition-colors duration-300 focus:outline-none
                   focus:ring-2 focus:ring-dark-500 sm:w-auto
                   sm:rounded-r-md sm:py-3 sm:text-base"
          >
            Apply
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CouponInput;

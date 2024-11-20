import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

import { Separator } from "@/components/ui/separator";

const Filter = () => {
  return (
    <div className="hidden lg:col-span-1 lg:block">
      <CategoryFilter />
      <Separator />
      <PriceFilter />
      <Separator />
      {/* <ColorFilter />
      <Separator />
      <SizeFilter /> */}
    </div>
  );
};

export default Filter;

import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleValueChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">Sort By</p>
      <div className="w-fit">
        <Select defaultValue="newest" onValueChange={handleValueChange}>
          <SelectTrigger className="flex items-center space-x-1 border-none bg-transparent p-0 shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>

          <SelectContent className="mt-2 w-32 rounded-md border border-gray-200 bg-white text-sm font-medium shadow-lg">
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            {/* <SelectItem value="rating">Rating</SelectItem> */}
            <SelectItem value="newest">Latest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortSelect;

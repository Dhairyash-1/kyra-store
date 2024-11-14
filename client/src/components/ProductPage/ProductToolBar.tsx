import { LayoutGridIcon, LayoutListIcon, ListIcon } from "lucide-react";

import SortSelect from "../SortSelect";

const ProductToolBar = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LayoutGridIcon />
        <ListIcon />
        <div>
          <p>Showing 1-16 of 72 result</p>
        </div>
      </div>

      <SortSelect />
    </div>
  );
};

export default ProductToolBar;

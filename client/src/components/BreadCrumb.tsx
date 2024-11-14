import { ChevronRight } from "lucide-react";

const BreadCrumb = () => {
  return (
    <div className="flex">
      <p className="flex text-sm font-normal">
        Shop <ChevronRight strokeWidth={1.5} size={20} /> All Products
      </p>
    </div>
  );
};

export default BreadCrumb;

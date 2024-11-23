import { ChevronRight } from "lucide-react";

const BreadCrumb = ({ path }: { path?: string }) => {
  return (
    <div className="flex">
      <p className="flex text-sm font-normal">
        Shop <ChevronRight strokeWidth={1.5} size={20} /> All Products{" "}
        {path && (
          <>
            <ChevronRight strokeWidth={1.5} size={20} /> <span>{path}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default BreadCrumb;

import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbPropType {
  breadcrumbs: { label: string; path: string }[];
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbPropType) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-0 font-normal text-dark-90">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={index} className="flex items-center jtext-sm">
            {index !== 0 && <ChevronRightIcon className="mx-0 h-5 w-5" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="line-clamp-1">{breadcrumb.label}</span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="hover:underline line-clamp-1"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

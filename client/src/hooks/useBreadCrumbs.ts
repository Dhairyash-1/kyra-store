import { useLocation } from "react-router-dom";

const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label =
      value === "products"
        ? "Products"
        : value.charAt(0).toUpperCase() + value.slice(1);
    return { label, path };
  });

  return [{ label: "Shop", path: "/" }, ...breadcrumbs];
};
export default useBreadcrumbs;

import BreadCrumb from "@/components/BreadCrumb";
import Filter from "@/components/ProductPage/Filter/Filter";
import ProductContainer from "@/components/ProductPage/ProductContainer";

const Products = () => {
  return (
    <div className="mt-8 md:px-20">
      <BreadCrumb />
      <div className="mt-8 grid gap-8   lg:grid-cols-4 lg:gap-12">
        <Filter />
        <ProductContainer />
      </div>
    </div>
  );
};

export default Products;

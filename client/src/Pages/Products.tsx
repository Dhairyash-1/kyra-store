import BreadCrumb from "@/components/BreadCrumb";
import Filter from "@/components/ProductPage/Filter/Filter";
import ProductContainer from "@/components/ProductPage/ProductContainer";
import TrustIndicators from "@/components/TrustIndicators";

const Products = () => {
  return (
    <section className="mt-8 lg:px-16 xl:px-20">
      <BreadCrumb />
      <div className="mt-8 grid gap-8  lg:grid-cols-4 lg:gap-12">
        <Filter />
        <ProductContainer />
      </div>
      <TrustIndicators />
    </section>
  );
};

export default Products;

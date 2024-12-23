import BreadCrumb from "@/components/BreadCrumb";
import Filter from "@/components/ProductPage/Filter/Filter";
import ProductContainer from "@/components/ProductPage/ProductContainer";
import TrustIndicators from "@/components/TrustIndicators";
import useBreadcrumbs from "@/hooks/useBreadCrumbs";

const Products = () => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <section className="mt-8 lg:px-16 xl:px-20">
      <BreadCrumb breadcrumbs={breadcrumbs} />
      <div className="mt-8 grid gap-8  lg:grid-cols-4 lg:gap-12">
        <Filter />
        <ProductContainer />
      </div>
      <TrustIndicators />
    </section>
  );
};

export default Products;

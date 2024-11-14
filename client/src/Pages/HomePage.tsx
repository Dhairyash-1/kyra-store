import BestSeller from "@/components/BestSeller";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ShopCategory from "@/components/ShopCategory";
import TestimonialSection from "@/components/TestimonialSection";
import TrustIndicators from "@/components/TrustIndicators";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ShopCategory />
      <BestSeller />
      <TestimonialSection />
      <TrustIndicators />
    </>
  );
};

export default HomePage;

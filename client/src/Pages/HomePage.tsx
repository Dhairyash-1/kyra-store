import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full bg-white px-4">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;

import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 xs:px-6 sm:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

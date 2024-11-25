import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden ">
      <Navbar />
      <main className="mx-auto my-0 flex w-full max-w-[1600px] flex-col  bg-white px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

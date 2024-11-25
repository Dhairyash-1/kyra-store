import { Outlet } from "react-router-dom";

import ProfileMenu from "@/components/ProfileMenu";

const MyProfileLayout = () => {
  return (
    <section className="mt-20 flex flex-col md:px-20">
      <h1 className="text-4xl font-normal text-primary-500">My Profile</h1>
      <div className="mt-12 flex gap-12 ">
        <ProfileMenu />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default MyProfileLayout;

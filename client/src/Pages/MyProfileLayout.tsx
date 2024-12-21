import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import ProfileMenu from "@/components/profile/ProfileMenu";

const titleMap: { [key: string]: string } = {
  "/profile": "My Profile",
  "/orders": "My Orders",
  "/wishlists": "My Wishlist",
  "/manage-address": "Manage Address",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

const MyProfileLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <section className="mt-20 flex flex-col lg:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-primary-500 md:text-4xl">
          {titleMap[location.pathname]}
        </h1>
        <button
          aria-label="menu open icon"
          onClick={() => setIsMenuOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="mt-12 flex gap-12">
        <ProfileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default MyProfileLayout;

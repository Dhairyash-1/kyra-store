import {
  BellIcon,
  HeartIcon,
  MapPinIcon,
  PackageIcon,
  SettingsIcon,
  UserRoundIcon,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { RootState } from "@/store/store";

const menuLinks = [
  {
    id: 1,
    name: "Personal Information",
    icon: <UserRoundIcon />,
    href: "/profile",
  },
  { id: 2, name: "My Orders", icon: <PackageIcon />, href: "/orders" },
  { id: 3, name: "My Wishlists", icon: <HeartIcon />, href: "/wishlists" },
  {
    id: 4,
    name: "Manage Addresses",
    icon: <MapPinIcon />,
    href: "/manage-address",
  },

  { id: 6, name: "Notifications", icon: <BellIcon />, href: "/notifications" },
  { id: 7, name: "Settings", icon: <SettingsIcon />, href: "/settings" },
];

interface ProfileMenuProp {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMenu = ({ isOpen, onClose }: ProfileMenuProp) => {
  const { name, profileImage } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`
        fixed left-0 top-0 z-50 h-full w-[260px] border-[1.5px] border-[#e7e7e8] 
        bg-white py-4 shadow-sm transition-transform duration-300 lg:static
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between px-5 lg:hidden">
          <h2 className="font-bold">Profile Menu</h2>
          <button onClick={onClose} aria-label="close menu" className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-5 py-5">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profileImage} alt="user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h5 className="font-normal">Hello 👋</h5>
            <span className="text-lg font-bold capitalize">{name}</span>
          </div>
        </div>

        <div className="flex flex-col">
          {menuLinks.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                to={item.href}
                key={item.id}
                onClick={() => onClose()} // Close menu on mobile after clicking
                className={`flex gap-3 p-4 text-base font-normal hover:bg-dark-500 hover:text-white ${
                  isActive ? "bg-dark-500 text-white" : ""
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;

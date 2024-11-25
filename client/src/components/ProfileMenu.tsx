import {
  BellIcon,
  CreditCardIcon,
  HeartIcon,
  MapPinIcon,
  PackageIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { RootState } from "@/store/store";

const menuLinks = [
  {
    id: 1,
    name: "Personal Information",
    icon: <UserRoundIcon />,
    href: "/profile",
  },
  { id: 2, name: "My Orders", icon: <PackageIcon />, href: "/my-orders" },
  { id: 3, name: "My Wishlists", icon: <HeartIcon />, href: "/wishlists" },
  {
    id: 4,
    name: "Manage Addresses",
    icon: <MapPinIcon />,
    href: "/manage-address",
  },
  {
    id: 5,
    name: "Saved Cards",
    icon: <CreditCardIcon />,
    href: "/saved-cards",
  },
  { id: 6, name: "Notifications", icon: <BellIcon />, href: "/notifications" },
  { id: 7, name: "Settings", icon: <SettingsIcon />, href: "/settings" },
];

const ProfileMenu = () => {
  const { name, profileImage } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <div className=" w-[260px] border-[1.5px] border-[#e7e7e8] py-4 shadow-sm">
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
              className={`flex gap-3 p-4 text-base font-normal hover:bg-dark-500 hover:text-white ${
                isActive ? "bg-dark-500 text-white" : ""
              }`}
            >
              {" "}
              {item.icon} {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileMenu;

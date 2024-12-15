import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { updateAuthStatus } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/services/authApi";

const ProfileDropdown = ({ children }: { children: ReactNode }) => {
  const [logout] = useLogoutMutation();
  const dispatach = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatach(
        updateAuthStatus({
          isAuthenticated: false,
          userId: null,
          role: null,
          isLoading: false,
          name: "",
          profileImage: "",
        })
      );
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-40 space-y-1 rounded-sm border bg-white-80 px-2 py-3 shadow-md ">
        <Link to="/profile">
          <DropdownMenuItem className="text-sm ">My Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-sm " onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

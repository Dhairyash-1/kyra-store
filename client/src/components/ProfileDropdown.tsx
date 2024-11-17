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
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatach = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatach(
        updateAuthStatus({
          isAuthenticated: false,
          userId: null,
          isLoading: false,
        })
      );
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-40 space-y-1 rounded-sm bg-white-80 px-2 py-4 shadow-xl">
        <Link to="/profile">
          <DropdownMenuItem>My Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

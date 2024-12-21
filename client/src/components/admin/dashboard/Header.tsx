import { Bell, Search } from "lucide-react";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Logo */}
      <div className="flex w-64 items-center">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="ml-2 text-xl font-bold text-gray-800">KyraStore</span>
      </div>

      {/* Search Bar */}
      <div className="mx-4 flex flex-1">
        <Input
          placeholder="Search products..."
          className="border-gray-300 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500"
        />
        <Button className="ml-2 bg-blue-600 text-white hover:bg-blue-700">
          Search
        </Button>
      </div>

      {/* Notification and User Account */}
      <div className="flex items-center">
        <Button
          aria-label="notification"
          variant="ghost"
          className="text-gray-800"
        >
          <Bell />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="ml-4 flex items-center text-gray-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                D
              </div>
              <span className="ml-2">Dhairyash Gupta</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

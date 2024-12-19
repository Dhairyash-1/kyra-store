import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin/",
    isActive: true,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Discounts",
    icon: Box,
    href: "/admin/discounts",
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/admin/reports",
  },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar
      variant="sidebar"
      className="absolute bottom-0 h-full !bg-blue-500 shadow-md"
    >
      {/* <SidebarHeader className="border-b border-border/50  p-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            width={28}
            height={28}
            className="dark:invert"
          />
          {!isCollapsed && (
            <span className="text-2xl font-semibold">KyraStore</span>
          )}
        </Link>
      </SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-12 text-base hover:bg-accent/90 data-[active=true]:bg-gray-20"
                    >
                      <Link to={item.href}>
                        <item.icon className="h-8 w-8" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute bottom-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

import { Outlet } from "react-router-dom";

import { DashboardHeader } from "@/components/admin/dashboard/Header";
import { DashboardShell } from "@/components/admin/dashboard/Shell";
import { AppSidebar } from "@/components/admin/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col ">
      <DashboardHeader />
      <SidebarProvider className="relative flex flex-1 gap-2">
        <AppSidebar />
        <main className="flex-1 space-y-4 p-6 ">{<Outlet />}</main>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;

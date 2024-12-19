import { useState } from "react";

import { AppSidebar } from "./Sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="relative flex-1 space-y-4 p-8 pt-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

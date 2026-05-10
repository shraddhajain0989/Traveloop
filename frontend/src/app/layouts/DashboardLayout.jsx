import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/navigation/Navbar";
import { Sidebar } from "@/shared/components/navigation/Sidebar";
import { Breadcrumbs } from "@/shared/components/navigation/Breadcrumbs";
import { useTheme } from "@/app/providers/ThemeProvider";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen bg-[#f7f8fb] text-ink dark:bg-[#0f1117] dark:text-slate-100 transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="min-w-0 flex-1">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto w-full max-w-[1130px] px-5 py-7 sm:px-8">
            <div className="sr-only">
              <Breadcrumbs />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

export function MinimalLayout() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Outlet />
    </main>
  );
}


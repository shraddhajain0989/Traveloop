import { Outlet } from "react-router-dom";

export function ErrorLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <Outlet />
    </main>
  );
}


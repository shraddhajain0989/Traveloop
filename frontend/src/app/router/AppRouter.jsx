import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { MinimalLayout } from "@/app/layouts/MinimalLayout";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { PublicRoute } from "@/app/router/PublicRoute";
import { routeConfig } from "@/app/router/routeConfig";
import { LoadingScreen } from "@/shared/components/feedback/LoadingScreen";
import { Button } from "@/shared/components/ui/Button";

function renderRoute({ path, element: Component }) {
  return <Route element={<Component />} key={path} path={path} />;
}

function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-700">404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink">This itinerary is off map.</h1>
        <p className="mt-3 text-slate-500">Return to your dashboard and keep planning.</p>
        <Button className="mt-6" onClick={() => window.location.assign("/dashboard")}>
          Back to dashboard
        </Button>
      </section>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>{routeConfig.public.map(renderRoute)}</Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route element={<Navigate replace to="/dashboard" />} index />
            {routeConfig.protected.map(renderRoute)}
          </Route>
        </Route>

        <Route element={<MinimalLayout />}>{routeConfig.shared.map(renderRoute)}</Route>
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
}


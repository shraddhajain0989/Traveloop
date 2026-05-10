import { lazy } from "react";
import { ROUTES } from "@/shared/constants/routes";

export const pages = {
  LoginPage: lazy(() => import("@/features/auth/pages/LoginPage")),
  SignupPage: lazy(() => import("@/features/auth/pages/SignupPage")),
  ForgotPasswordPage: lazy(() => import("@/features/auth/pages/ForgotPasswordPage")),
  DashboardPage: lazy(() => import("@/features/dashboard/pages/DashboardPage")),
  MyTripsPage: lazy(() => import("@/features/trips/pages/MyTripsPage")),
  CreateTripPage: lazy(() => import("@/features/trips/pages/CreateTripPage")),
  TripDetailsPage: lazy(() => import("@/features/trips/pages/TripDetailsPage")),
  ItineraryBuilderPage: lazy(() => import("@/features/trips/pages/ItineraryBuilderPage")),
  BudgetDashboardPage: lazy(() => import("@/features/budget/pages/BudgetDashboardPage")),
  PackingChecklistPage: lazy(() => import("@/features/checklist/pages/PackingChecklistPage")),
  ActivitySearchPage: lazy(() => import("@/features/activities/pages/ActivitySearchPage")),
  DiscoverCitiesPage: lazy(() => import("@/features/discover/pages/DiscoverCitiesPage")),
  NotesJournalPage: lazy(() => import("@/features/notes/pages/NotesJournalPage")),
  ProfilePage: lazy(() => import("@/features/profile/pages/ProfilePage")),
  SettingsPage: lazy(() => import("@/features/settings/pages/SettingsPage")),
  AdminDashboardPage: lazy(() => import("@/features/admin/pages/AdminDashboardPage")),
  SharedItineraryPage: lazy(() => import("@/features/shared-itinerary/pages/SharedItineraryPage")),
};

export const routeConfig = {
  public: [
    { path: ROUTES.LOGIN, element: pages.LoginPage },
    { path: ROUTES.SIGNUP, element: pages.SignupPage },
    { path: ROUTES.FORGOT_PASSWORD, element: pages.ForgotPasswordPage },
  ],
  protected: [
    { path: ROUTES.DASHBOARD, element: pages.DashboardPage },
    { path: ROUTES.TRIPS, element: pages.MyTripsPage },
    { path: ROUTES.CREATE_TRIP, element: pages.CreateTripPage },
    { path: ROUTES.TRIP_DETAILS, element: pages.TripDetailsPage },
    { path: ROUTES.ITINERARY, element: pages.ItineraryBuilderPage },
    { path: ROUTES.DISCOVER, element: pages.DiscoverCitiesPage },
    { path: ROUTES.BUDGET, element: pages.BudgetDashboardPage },
    { path: ROUTES.CHECKLIST, element: pages.PackingChecklistPage },
    { path: ROUTES.ACTIVITIES, element: pages.ActivitySearchPage },
    { path: ROUTES.NOTES, element: pages.NotesJournalPage },
    { path: ROUTES.PROFILE, element: pages.ProfilePage },
    { path: ROUTES.SETTINGS, element: pages.SettingsPage },
    { path: ROUTES.ADMIN, element: pages.AdminDashboardPage },
  ],
  shared: [{ path: ROUTES.SHARED_ITINERARY, element: pages.SharedItineraryPage }],
};

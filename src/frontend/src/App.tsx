import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { BrowsePage } from "./pages/BrowsePage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { RegisterStudentPage } from "./pages/RegisterStudentPage";
import { RegisterTeacherPage } from "./pages/RegisterTeacherPage";

// ── Root Layout ──────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

// ── Routes ───────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: BrowsePage,
});

const registerStudentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register-student",
  component: RegisterStudentPage,
});

const registerTeacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register-teacher",
  component: RegisterTeacherPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

// ── Router ───────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  browseRoute,
  registerStudentRoute,
  registerTeacherRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}

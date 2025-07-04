import { createBrowserRouter, Outlet } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthPageLayout from "./pages/AuthPages/AuthPageLayout";
import SignIn from "./pages/AuthPages/SignIn";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import OTPVerification from "./pages/AuthPages/OTPVerification";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";
import CreatePassword from "./pages/AuthPages/CreatePassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import OrderManagement from "./pages/Orders/OrderManagement";
import UserManagement from "./pages/Users/UserManagement";
import UserDetails from "./pages/Users/UserDetails";
import Analytics from "./pages/Analytics/Analytics";
import SubAdmins from "./pages/SubAdmins/SubAdmins";
import SubAdminDetails from "./pages/SubAdmins/SubAdminDetails";
import EditSubAdminProfile from "./pages/SubAdmins/EditSubAdminProfile";
import Notifications from "./pages/Notifications/Notifications";
import { ProtectedRoute, RedirectIfAuthenticated } from "./helpers/helpers.functions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout><Outlet /></AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "users/:id",
        element: <UserDetails onBack={() => window.history.back()} />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "admins",
        element: <SubAdmins />,
      },
      {
        path: "admins/:id",
        element: <SubAdminDetails onBack={() => window.history.back()} />,
      },
      {
        path: "admins/:id/edit",
        element: <EditSubAdminProfile onBack={() => window.history.back()} />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  // Auth routes that should redirect if authenticated
  {
    element: (
      <RedirectIfAuthenticated>
        <AuthPageLayout><Outlet /></AuthPageLayout>
      </RedirectIfAuthenticated>
    ),
    children: [
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/auth/create-new-password",
        element: <CreateNewPassword />,
      },
      {
        path: "/auth/create-password",
        element: <CreatePassword />,
      },
    ],
  },
  // OTP verification route - no auth check
  {
    element: <AuthPageLayout><Outlet /></AuthPageLayout>,
    children: [
      {
        path: "/auth/otp-verification",
        element: <OTPVerification />,
      },
    ],
  },
]);

export default router;

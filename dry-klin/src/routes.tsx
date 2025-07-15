import { createBrowserRouter, Outlet } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthPageLayout from "./pages/AuthPages/AuthPageLayout";
import SignIn from "./pages/AuthPages/SignIn";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";
import CreatePassword from "./pages/AuthPages/CreatePassword";
import CustomerRegistration from "./pages/AuthPages/CustomerRegistration";
import Dashboard from "./pages/Dashboard/Dashboard";
import OrderManagement from "./pages/Orders/OrderManagement";
import UserManagement from "./pages/Users/UserManagement";
import UserDetails from "./pages/Users/UserDetails";
import Analytics from "./pages/Analytics/Analytics";
import SubAdmins from "./pages/SubAdmins/SubAdmins";
import SubAdminDetails from "./pages/SubAdmins/SubAdminDetails";
import EditSubAdminProfile from "./pages/SubAdmins/EditSubAdminProfile";
import Notifications from "./pages/Notifications/Notifications";
import ServicePartners from "./pages/ServicePartners/ServicePartners";
import AddServicePartner from "./pages/ServicePartners/AddServicePartner";
import AddDeliveryAgent from "./pages/DeliveryAgents/AddDeliveryAgent";
import ServiceTypes from "./pages/ServiceTypes/ServiceTypes";
import ViewServiceTypes from "./pages/ServiceTypes/ViewServiceTypes";
import Services from "./pages/Services/Services";
import AddServiceType from './pages/ServiceTypes/AddServiceType';
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
      {
        path: "service-partners",
        element: <ServicePartners />,
      },
      {
        path: "service-partners/add",
        element: <AddServicePartner />,
      },

      {
        path: "delivery-agents/add",
        element: <AddDeliveryAgent />,
      },
      {
        path: "service-types",
        element: <ServiceTypes />,
      },
      {
        path: "service-types/view",
        element: <ViewServiceTypes />,
      },
      {
        path: "service-types/add",
        element: <AddServiceType />,
      },
      {
        path: "services",
        element: <Services />,
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
      {
        path: "/auth/customer-registration/:customerId",
        element: <CustomerRegistration />,
      },
    ],
  },

]);

export default router;

import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import ContactPage from "./pages/site/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import UserDashboard from "./pages/user/UserDashboardV2";
import BookRepairPage from "./pages/user/BookRepairPage";
import ServiceProvidersPage from "./pages/user/ServiceProvidersPage";
import MyRepairRequestsPage from "./pages/user/MyRepairRequestsPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserRequestDetailsPage from "./pages/user/UserRequestDetailsPage";
import PriceConfirmationPage from "./pages/user/PriceConfirmationPage";
import RatingReviewPage from "./pages/user/RatingReviewPage";
import UserNotificationsPage from "./pages/user/UserNotificationsPage";
import RepairHistoryPage from "./pages/user/RepairHistoryPage";
import UserSettingsPage from "./pages/user/UserSettingsPage";
import ProviderDashboard from "./pages/provider/ProviderDashboardV2";
import IncomingRequestsPage from "./pages/provider/IncomingRequestsPage";
import MyJobsPage from "./pages/provider/MyJobsPage";
import PickupDeliveryPage from "./pages/provider/PickupDeliveryPage";
import PriceProposalPage from "./pages/provider/PriceProposalPage";
import ProviderProfilePage from "./pages/provider/ProviderProfilePage";
import ProviderRequestDetailsPage from "./pages/provider/ProviderRequestDetailsPage";
import ProviderReviewsPage from "./pages/provider/ProviderReviewsPage";
import ProviderNotificationsPage from "./pages/provider/ProviderNotificationsPage";
import ProviderSettingsPage from "./pages/provider/ProviderSettingsPage";
import AdminDashboard from "./pages/admin/AdminDashboardV3";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProvidersPage from "./pages/admin/AdminProvidersPage";
import AdminRequestsPage from "./pages/admin/AdminRequestsPage";
import AdminRequestDetailsPage from "./pages/admin/AdminRequestDetailsPage";
import AdminSupportPage from "./pages/admin/AdminSupportPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import { useAuth } from "./context/AuthContext";
import { getDefaultRouteForUser, resolveRole } from "./utils/authRouting";

const ProtectedRoute = ({ children, allowed }) => {
  const { authUser } = useAuth();
  if (!authUser) return <Navigate to="/login" replace />;

  const resolvedRole = resolveRole(authUser);
  if (!allowed.includes(resolvedRole)) {
    return <Navigate to={getDefaultRouteForUser(authUser)} replace />;
  }

  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { authUser } = useAuth();

  if (authUser) {
    return <Navigate to={getDefaultRouteForUser(authUser)} replace />;
  }

  return children;
};

const DashboardRedirect = () => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRouteForUser(authUser)} replace />;
};

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/platform" element={<Navigate to="/#platform" replace />} />
    <Route path="/details" element={<Navigate to="/#platform" replace />} />
    <Route path="/services" element={<Navigate to="/#services" replace />} />
    <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
    <Route path="/faq" element={<Navigate to="/#faq" replace />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/dashboard" element={<DashboardRedirect />} />
    <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
    <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
    <Route path="/provider-signup" element={<PublicOnlyRoute><SignupPage providerMode /></PublicOnlyRoute>} />
    <Route path="/user" element={<ProtectedRoute allowed={["user"]}><UserDashboard /></ProtectedRoute>} />
    <Route path="/user/book" element={<ProtectedRoute allowed={["user"]}><BookRepairPage /></ProtectedRoute>} />
    <Route path="/user/providers" element={<ProtectedRoute allowed={["user"]}><ServiceProvidersPage /></ProtectedRoute>} />
    <Route path="/user/requests" element={<ProtectedRoute allowed={["user"]}><MyRepairRequestsPage /></ProtectedRoute>} />
    <Route path="/user/profile" element={<ProtectedRoute allowed={["user"]}><UserProfilePage /></ProtectedRoute>} />
    <Route path="/user/requests/:id" element={<ProtectedRoute allowed={["user"]}><UserRequestDetailsPage /></ProtectedRoute>} />
    <Route path="/user/requests/:id/price" element={<ProtectedRoute allowed={["user"]}><PriceConfirmationPage /></ProtectedRoute>} />
    <Route path="/user/requests/:id/review" element={<ProtectedRoute allowed={["user"]}><RatingReviewPage /></ProtectedRoute>} />
    <Route path="/user/history" element={<ProtectedRoute allowed={["user"]}><RepairHistoryPage /></ProtectedRoute>} />
    <Route path="/user/notifications" element={<ProtectedRoute allowed={["user"]}><UserNotificationsPage /></ProtectedRoute>} />
    <Route path="/user/settings" element={<ProtectedRoute allowed={["user"]}><UserSettingsPage /></ProtectedRoute>} />
    <Route path="/provider" element={<ProtectedRoute allowed={["provider"]}><ProviderDashboard /></ProtectedRoute>} />
    <Route path="/provider/incoming" element={<ProtectedRoute allowed={["provider"]}><IncomingRequestsPage /></ProtectedRoute>} />
    <Route path="/provider/jobs" element={<ProtectedRoute allowed={["provider"]}><MyJobsPage /></ProtectedRoute>} />
    <Route path="/provider/pickup-delivery" element={<ProtectedRoute allowed={["provider"]}><PickupDeliveryPage /></ProtectedRoute>} />
    <Route path="/provider/reviews" element={<ProtectedRoute allowed={["provider"]}><ProviderReviewsPage /></ProtectedRoute>} />
    <Route path="/provider/notifications" element={<ProtectedRoute allowed={["provider"]}><ProviderNotificationsPage /></ProtectedRoute>} />
    <Route path="/provider/profile" element={<ProtectedRoute allowed={["provider"]}><ProviderProfilePage /></ProtectedRoute>} />
    <Route path="/provider/settings" element={<ProtectedRoute allowed={["provider"]}><ProviderSettingsPage /></ProtectedRoute>} />
    <Route path="/provider/requests/:id" element={<ProtectedRoute allowed={["provider"]}><ProviderRequestDetailsPage /></ProtectedRoute>} />
    <Route path="/provider/requests/:id/pricing" element={<ProtectedRoute allowed={["provider"]}><PriceProposalPage /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute allowed={["admin"]}><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute allowed={["admin"]}><AdminUsersPage /></ProtectedRoute>} />
    <Route path="/admin/providers" element={<ProtectedRoute allowed={["admin"]}><AdminProvidersPage /></ProtectedRoute>} />
    <Route path="/admin/requests" element={<ProtectedRoute allowed={["admin"]}><AdminRequestsPage /></ProtectedRoute>} />
    <Route path="/admin/requests/:id" element={<ProtectedRoute allowed={["admin"]}><AdminRequestDetailsPage /></ProtectedRoute>} />
    <Route path="/admin/support" element={<ProtectedRoute allowed={["admin"]}><AdminSupportPage /></ProtectedRoute>} />
    <Route path="/admin/reviews" element={<ProtectedRoute allowed={["admin"]}><AdminReviewsPage /></ProtectedRoute>} />
    <Route path="/admin/notifications" element={<ProtectedRoute allowed={["admin"]}><AdminNotificationsPage /></ProtectedRoute>} />
    <Route path="/admin/profile" element={<ProtectedRoute allowed={["admin"]}><AdminProfilePage /></ProtectedRoute>} />
    <Route path="/admin/settings" element={<ProtectedRoute allowed={["admin"]}><AdminSettingsPage /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

import { Route, Routes } from "react-router-dom";
import SignUppage from "./pages/signuppage";
import Loginpage from "./pages/loginpage";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import FloatingShape from "./components/floatingshape";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage ";
import ResetPasswordPage from "./pages/ResetPasswordPage";

//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isverified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

//redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isverified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-black via-purple-900 to-black flex items-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-purple-300"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={10}
      />

      <FloatingShape
        color="bg-purple-300"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-purple-300"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUppage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Loginpage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

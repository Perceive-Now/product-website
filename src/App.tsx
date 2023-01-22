import { Route, Routes } from "react-router-dom";

//
import AuthLayout from "./layouts/auth";
import DefaultLayout from "./layouts/default";

//
import HomePage from "./pages/homepage";

import LoginPage from "./pages/authentication/login";

// Password
import ResetPasswordPage from "./pages/authentication/reset-password";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

// Signup confirmation and profile completion
import ConfirmSignup from "./pages/authentication/signup/confirm";
import CompleteSignup from "./pages/authentication/signup/complete";

//
import HelpPage from "./pages/miscs/help";
import FeedbackPage from "./pages/miscs/feedback";

import DashboardPage from "./pages/product/dashboard";

//
import PageNotFound404 from "./pages/404";

/**
 *
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/signup/confirm" element={<ConfirmSignup />} />

        {/* All the routes below are protected */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* Need to ask for profile details before allowing to use */}
          <Route path="/signup/complete" element={<CompleteSignup />} />

          {/* Actual product pages */}
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;

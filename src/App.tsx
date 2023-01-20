import { Route, Routes } from "react-router-dom";

//
import AuthLayout from "./layouts/auth";
import DefaultLayout from "./layouts/default";

//
import HomePage from "./pages/homepage";

import LoginPage from "./pages/authentication/login";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

import HelpPage from "./pages/miscs/help";
import FeedbackPage from "./pages/miscs/feedback";

import DashboardPage from "./pages/product/dashboard";

// Innovate AI pages
import TrendsPage from "./pages/product/innovate-ai/trends";
import SummaryPage from "./pages/product/innovate-ai/summary";
import InsightsPage from "./pages/product/innovate-ai/insights";

import HawkEyePage from "./pages/product/innovate-ai/hawk-eye";
import HawkEyeHomeSection from "./pages/product/innovate-ai/hawk-eye/home";
import HawkEyeFundersSection from "./pages/product/innovate-ai/hawk-eye/sections/funders";
import HawkEyePatentsSection from "./pages/product/innovate-ai/hawk-eye/sections/patents";
import HawkEyeExpertsSection from "./pages/product/innovate-ai/hawk-eye/sections/experts";
import HawkEyeUniversitiesSection from "./pages/product/innovate-ai/hawk-eye/sections/universities";
import HawkEyePublicationsSection from "./pages/product/innovate-ai/hawk-eye/sections/publications";

// Advanced Search pages
import PatentsPage from "./pages/product/advanced-search/patents";
import PatentsProfilePage from "./pages/product/advanced-search/patents/profile";

import PublicationsPage from "./pages/product/advanced-search/publications";
import PublicationProfilePage from "./pages/product/advanced-search/publications/profile";

import UniversitiesPage from "./pages/product/advanced-search/universities";

import ExpertsPage from "./pages/product/advanced-search/experts";
import ExpertsProfilePage from "./pages/product/advanced-search/experts/profile";

import FundersPage from "./pages/product/advanced-search/funders";
import FunderProfilePage from "./pages/product/advanced-search/funders/profile";

//
import ConfirmSignup from "./pages/authentication/signup/confirm";
import CompleteSignup from "./pages/authentication/signup/complete";

//
import PageNotFound404 from "./pages/404";
import UniversityPage from "./pages/product/advanced-search/universities/profile";

/**
 *
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/signup/confirm" element={<ConfirmSignup />} />

        {/* All the routes below are protected */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* Need to ask for profile details before allowing to use */}
          <Route path="/signup/complete" element={<CompleteSignup />} />

          {/* Actual product pages */}
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/trends" element={<TrendsPage />} />

            {/* Hawk eye page section starts here */}
            <Route path="/hawk-eye-view" element={<HawkEyePage />}>
              <Route path="/hawk-eye-view" element={<HawkEyeHomeSection />} />
              <Route path="/hawk-eye-view/publications" element={<HawkEyePublicationsSection />} />
              <Route path="/hawk-eye-view/patents" element={<HawkEyePatentsSection />} />
              <Route path="/hawk-eye-view/experts" element={<HawkEyeExpertsSection />} />
              <Route path="/hawk-eye-view/universities" element={<HawkEyeUniversitiesSection />} />
              <Route path="/hawk-eye-view/funders" element={<HawkEyeFundersSection />} />
            </Route>
            {/* Hawk eye page section end here */}

            <Route path="/summary" element={<SummaryPage />} />

            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/publications/profile/:id" element={<PublicationProfilePage />} />

            {/* Patents page section starts here */}
            <Route path="/patents" element={<PatentsPage />} />
            <Route path="/patents/profile/:id" element={<PatentsProfilePage />} />
            {/* Patents page section end here */}

            <Route path="/experts" element={<ExpertsPage />} />
            <Route path="/experts/profile/:id" element={<ExpertsProfilePage />} />

            <Route path="/funders" element={<FundersPage />} />
            <Route path="/funders/profile/:id" element={<FunderProfilePage />} />

            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/universities/profile/:id" element={<UniversityPage />} />

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

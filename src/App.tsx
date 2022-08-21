import { Route, Routes } from "react-router-dom";

//
import DefaultLayout from "./layouts/default";

//
import HomePage from "./pages/homepage";

import LoginPage from "./pages/authentication/login";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

import DashboardPage from "./pages/product/dashboard";
import InsightsPage from "./pages/product/insights";
import TrendsPage from "./pages/product/trends";

// Hawk-eye pages
import HawkEyePage from "./pages/product/hawk-eye";
import HawkEyeHomeSection from "./pages/product/hawk-eye/home";
import HawkEyeFundersSection from "./pages/product/hawk-eye/sections/funders";
import HawkEyePatentsSection from "./pages/product/hawk-eye/sections/patents";
import HawkEyeExpertsSection from "./pages/product/hawk-eye/sections/experts";
import HawkEyeUniversitiesSection from "./pages/product/hawk-eye/sections/universities";
import HawkEyePublicationsSection from "./pages/product/hawk-eye/sections/publications";

// Patents pages
import PatentsPage from "./pages/product/patents";
import PatentsProfile from "./pages/product/patents/profile";

import SummaryPage from "./pages/product/summary";
import PublicationsPage from "./pages/product/publications";
import ExpertsPage from "./pages/product/experts";
import FundersPage from "./pages/product/funders";
import UniversitiesPage from "./pages/product/universities";

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

        {/* All the routes below are protected */}
        <Route path="/" element={<HomePage />} />

        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/trends" element={<TrendsPage />} />

          {/* Hawk eye page section starts here */}
          <Route path="/hawk-eye-view" element={<HawkEyePage />}>
            <Route path="/hawk-eye-view" element={<HawkEyeHomeSection />} />
            <Route
              path="/hawk-eye-view/publications"
              element={<HawkEyePublicationsSection />}
            />
            <Route
              path="/hawk-eye-view/patents"
              element={<HawkEyePatentsSection />}
            />
            <Route
              path="/hawk-eye-view/experts"
              element={<HawkEyeExpertsSection />}
            />
            <Route
              path="/hawk-eye-view/universities"
              element={<HawkEyeUniversitiesSection />}
            />
            <Route
              path="/hawk-eye-view/funders"
              element={<HawkEyeFundersSection />}
            />
          </Route>
          {/* Hawk eye page section end here */}

          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/publications" element={<PublicationsPage />} />

          {/* Patents page section starts here */}
          <Route path="/patents" element={<PatentsPage />} />
          <Route path="/patents/profile/:id" element={<PatentsProfile />} />
          {/* Patents page section end here */}

          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/funders" element={<FundersPage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
        </Route>

        {/* 404 not found */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;

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
import HawkEyePage from "./pages/product/hawk-eye";
import SummaryPage from "./pages/product/summary";
import PublicationsPage from "./pages/product/publications";
import PatentsPage from "./pages/product/patents";
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
          <Route path="/hawk-eye-view" element={<HawkEyePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/patents" element={<PatentsPage />} />
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

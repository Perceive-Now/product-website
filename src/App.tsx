import { Route, Routes } from "react-router-dom";

//
import DefaultLayout from "./layouts/default";

//
import HomePage from "./pages/homepage";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";

import DashboardPage from "./pages/dashboard";
import InsightsPage from "./pages/insights";
import TrendsPage from "./pages/trends";
import HawkEyePage from "./pages/hawk-eye";
import SummaryPage from "./pages/summary";
import PublicationsPage from "./pages/publications";
import PatentsPage from "./pages/patents";
import ExpertsPage from "./pages/experts";
import FundersPage from "./pages/funders";
import UniversitiesPage from "./pages/universities";

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

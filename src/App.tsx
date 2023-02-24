import { Route, Routes } from "react-router-dom";

//
import AuthLayout from "./layouts/auth";
import DefaultLayout from "./layouts/default";
import AccountLayout from "./layouts/account";

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

// Product dashboard
import DashboardPage from "./pages/product/dashboard";

// Deep search - Patent
import PatentListPage from "./pages/product/deep-search/patents/list";
import PatentDetailPage from "./pages/product/deep-search/patents/detail";

// Deep search - Publication
import PublicationListPage from "./pages/product/deep-search/publications/list";
import PublicationDetailPage from "./pages/product/deep-search/publications/detail";

// Deep search - Companies
import DeepSearchCompaniesListPage from "./pages/product/deep-search/companies/list";
import DeepSearchCompanyPatenPage from "./pages/product/deep-search/companies/patent";

// Deep search - Inventors
import DeepSearchInventorsListPage from "./pages/product/deep-search/inventors/list";
import DeepSearchInventorPage from "./pages/product/deep-search/inventors/detail";

//
import DeepSearchUniversityListPage from "./pages/product/deep-search/university/list";
import DeepSearchAcademicPage from "./pages/product/deep-search/university/detail/detail";

//
import DeepSearchFundersListPage from "./pages/product/deep-search/funders/list";
import DeepSearchFunderPage from "./pages/product/deep-search/funders/detail";

//
import UserProfilePage from "./pages/account/userProfile";

//
import PageNotFound404 from "./pages/404";
import CompanyProfilePage from "./pages/account/companyProfile.tsx";

//
import { WelcomePage } from "./components/@signup-complete";
import IpPortfolioPage from "./pages/account/ipPortfolio";

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
          <Route path="/welcome/success" element={<WelcomePage />} />

          {/* Actual product pages */}
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Deep Search pages */}
            <Route path="/deep-search/patents" element={<PatentListPage />} />
            <Route path="/deep-search/patents/:id" element={<PatentDetailPage />} />

            <Route path="/deep-search/publications" element={<PublicationListPage />} />
            <Route path="/deep-search/publications/:id" element={<PublicationDetailPage />} />

            <Route path="/deep-search/companies" element={<DeepSearchCompaniesListPage />} />
            <Route path="/deep-search/companies/patent" element={<DeepSearchCompanyPatenPage />} />

            <Route path="/deep-search/inventors" element={<DeepSearchInventorsListPage />} />
            <Route path="/deep-search/inventor/:type" element={<DeepSearchInventorPage />} />

            <Route path="/deep-search/university" element={<DeepSearchUniversityListPage />} />
            <Route path="/deep-search/university/:type" element={<DeepSearchAcademicPage />} />

            <Route path="/deep-search/funders" element={<DeepSearchFundersListPage />} />
            <Route path="/deep-search/funders/:id" element={<DeepSearchFunderPage />} />

            {/* Account section */}
            <Route element={<AccountLayout />}>
              <Route path="/account/user-profile" element={<UserProfilePage />} />
              <Route path="/account/company-profile" element={<CompanyProfilePage />} />
              <Route path="/account/ip-portfolio" element={<IpPortfolioPage />} />
            </Route>

            {/* Miscs pages */}
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

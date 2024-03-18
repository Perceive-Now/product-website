import { Route, Routes } from "react-router-dom";

//
// import AuthLayout from "./layouts/auth";
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

// import EmergingTechnologiesAnalytics from "./pages/product/emerging-technology/analytics";
// import EmergingTechnologyListPage from "./pages/product/emerging-technology/list";

// import PatentListPage from "./pages/product/pro/patents/list";
// import PatentDetailPage from "./pages/product/pro/patents/detail";

// // Deep search - Publication
// import PublicationListPage from "./pages/product/pro/publications/list";
// import PublicationDetailPage from "./pages/product/pro/publications/detail";

// // Deep search - Companies
// import DeepSearchCompaniesListPage from "./pages/product/pro/companies/list";
// import DeepSearchCompanyPatenPage from "./pages/product/pro/companies/patent";

// // Deep search - Inventors
// import DeepSearchInventorsListPage from "./pages/product/pro/inventors/list";
// import DeepSearchInventorPage from "./pages/product/pro/inventors/detail";

// //
// import DeepSearchUniversityListPage from "./pages/product/pro/university/list";
// // import DeepSearchAcademicPage from "./pages/product/pro/university/detail/detail";

// //
// import DeepSearchFundersListPage from "./pages/product/pro/funders/list";
// import DeepSearchFunderPage from "./pages/product/pro/funders/detail";

//
import UserProfilePage from "./pages/account/userProfile";

//
import PageNotFound404 from "./pages/404";
import CompanyProfilePage from "./pages/account/companyProfile.tsx";

//
import { WelcomePage } from "./components/@signup-complete";
import IpPortfolioPage from "./pages/account/ipPortfolio";
// import PatentAnalyticPage from "./pages/product/pro/patents/analytics";
// import PublicationAnalyticPage from "./pages/product/pro/publications/analytics";
// import CompanyAnalyticPage from "./pages/product/pro/companies/analytics";
// import UniversityAnalyticPage from "./pages/product/pro/university/analytics";
// import FunderAnalyticPage from "./pages/product/pro/funders/analytics";
// import InventorAnalyticPage from "./pages/product/pro/inventors/analytics";

// import CompanyPublicationDetailPage from "./pages/product/pro/companies/publication";
// import UniversityPatentDetailPage from "./pages/product/pro/university/patent";
// import UniversityPublicationDetailPage from "./pages/product/pro/university/publication";
// import FunderProjectDetailPage from "./pages/product/pro/funders/project-detail";

// import IPLandscaping from "./pages/product/ip-landscaping";
// import IPSummaryReport from "./pages/product/ip-landscaping/Summary-report";
import IPFullReport from "./pages/product/ip-landscaping/Full-report";
import MALicensing from "./pages/product/m&a-licensing";
import ProductLayout from "./layouts/product-layout";
import IPAnalysis from "./pages/product/ip-landscaping/ip-analysis/ip-analysis";
import IPSummaryReport from "./pages/product/ip-landscaping/Summary-report";
import SignupPage from "./pages/authentication/signup";
import AuthDefaultLayout from "./layouts/auth/default";
import VerificationConfirm from "./pages/authentication/signup/confirmation";

/**
 *
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerificationConfirm />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/signup/confirm" element={<ConfirmSignup />} />

        {/* All the routes below are protected */}
        {/* <Route element={<AuthLayout />}> */}

        {/* Need to ask for profile details before allowing to use */}
        <Route path="/signup/complete" element={<CompleteSignup />} />
        <Route path="/welcome/success" element={<WelcomePage />} />

        {/* Actual product pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route element={<ProductLayout />}>
            <Route path="/ip-analysis" element={<IPAnalysis />} />
            <Route path="/ip-analysis/summary" element={<IPSummaryReport />} />
          </Route>
          <Route path="/ip-analysis/full-report" element={<IPFullReport />} />

          <Route path="/m&a-licensing" element={<MALicensing />} />

          {/* <Route path="/emerging-technologies" element={<EmergingTechnologiesAnalytics />} />
          <Route path="/emerging-technologies/list" element={<EmergingTechnologyListPage />} /> */}

          {/* Deep Search pages */}
          {/* <Route path="/patents" element={<PatentAnalyticPage />} />
          <Route path="/patents/table" element={<PatentListPage />} />
          <Route path="/patents/:id" element={<PatentDetailPage />} />

          <Route path="/publications" element={<PublicationAnalyticPage />} />
          <Route path="/publications/table" element={<PublicationListPage />} />
          <Route path="/publications/:id" element={<PublicationDetailPage />} />

          <Route path="/companies" element={<CompanyAnalyticPage />} />
          <Route path="/companies/table" element={<DeepSearchCompaniesListPage />} />
          <Route path="/companies/patent/:id" element={<DeepSearchCompanyPatenPage />} />
          <Route path="/companies/publication/:id" element={<CompanyPublicationDetailPage />} />

          <Route path="/inventors" element={<InventorAnalyticPage />} />
          <Route path="/inventors/table" element={<DeepSearchInventorsListPage />} />
          <Route path="/inventors/:type" element={<DeepSearchInventorPage />} />

          <Route path="/universities" element={<UniversityAnalyticPage />} />
          <Route path="/universities/table" element={<DeepSearchUniversityListPage />} /> */}
          {/* <Route path="/universities/:type" element={<DeepSearchAcademicPage />} /> */}
          {/* <Route path="/universities/patent/:id" element={<UniversityPatentDetailPage />} />
          <Route
            path="/universities/publication/:id"
            element={<UniversityPublicationDetailPage />}
          />

          <Route path="/funders" element={<FunderAnalyticPage />} />
          <Route path="/funders/table" element={<DeepSearchFundersListPage />} />
          <Route path="/funders/:id" element={<DeepSearchFunderPage />} />
          <Route path="/funders/project/:id" element={<FunderProjectDetailPage />} /> */}

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
        {/* </Route> */}
        {/* 404 not found */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;

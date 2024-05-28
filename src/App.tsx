import { Route, Routes } from "react-router-dom";

//
// import AuthLayout from "./layouts/auth";
import DefaultLayout from "./layouts/default";
// import AccountLayout from "./layouts/account";

//
// import HomePage from "./pages/homepage";

import LoginPage from "./pages/authentication/login";

// Password
import ResetPasswordPage from "./pages/authentication/reset-password";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

// Signup confirmation and profile completion
// import ConfirmSignup from "./pages/authentication/signup/confirm";
// import CompleteSignup from "./pages/authentication/signup/complete";

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
// import UserProfilePage from "./pages/account/userProfile";

//
import PageNotFound404 from "./pages/404";
// import CompanyProfilePage from "./pages/account/companyProfile.tsx";

//
import { WelcomePage } from "./components/@signup-complete";

import ProductLayout from "./layouts/product-layout";
import AuthDefaultLayout from "./layouts/auth/default";
import AuthLayout from "./layouts/auth";
// import IpPortfolioPage from "./pages/account/ipPortfolio";
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
import IPAnalysis from "./pages/product/ip-landscaping/ip-analysis/ip-analysis";
// import IPSummaryReport from "./pages/product/ip-landscaping/Summary-report";
import VerificationConfirm from "./pages/authentication/signup/confirmation";
import UserDetails from "./pages/authentication/signup/user-details";
import SignupPage from "./pages/authentication/signup";
import KnowNow from "./pages/product/chat";
import KnowNowIP from "./pages/product/ip-know-now";
import Stream from "./pages/stream/stream";
import UserProfile from "./pages/my-account/profile";
import MyReport from "./pages/my-account/my-reports";

import Payment from "./components/@report-chat/ip-analysis/use-case/payment";
import StayTuned from "./components/default";
import Setting from "./pages/my-account/setting";
import InteractionMethod from "./pages/product/product-new/interaction-method/interaction-method";
import UploadAttachementsMethod from "./pages/product/product-new/upload-attachements-page/upload-attachments-page";
import Landing from "./pages/product/product-new/landing/landing";
import ProductLayoutNew from "./pages/product/product-new/product-layout/product-layout-new";

/**
 *
 */
function App() {
  return (
    // <div className="App">
    <div>
      <Routes>
        <Route path="/verify-email" element={<VerificationConfirm />} />
        <Route path="/stream" element={<Stream />} />

        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* <Route path="/signup/confirm" element={<ConfirmSignup />} /> */}

        {/* All the routes below are protected */}
        <Route element={<AuthLayout />}>
          <Route path="/user-registration" element={<UserDetails />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Need to ask for profile details before allowing to use */}
          {/* <Route path="/signup/complete" element={<CompleteSignup />} /> */}

          <Route path="/welcome/success" element={<WelcomePage />} />

          {/* Actual product pages */}
          <Route element={<ProductLayout />}>
            <Route path="/payment" element={<Payment />} />
            <Route path="/stay-tuned" element={<StayTuned />} />

            {/* <Route path="/market-research" element={<IPAnalysis />} />
            <Route path="/market-intelligence" element={<IPAnalysis />} />
            <Route path="/ip-analysis/summary" element={<IPSummaryReport />} /> */}
          </Route>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<IPAnalysis />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-reports" element={<MyReport />} />
            <Route path="/setting" element={<Setting />} />

            {/* ProductLayoutNew */}
            <Route element={<ProductLayoutNew />}>
              <Route path="/landing" element={<Landing />} />
              <Route path="/interaction-method" element={<InteractionMethod />} />
              <Route path="/upload-attachments" element={<UploadAttachementsMethod />} />
            </Route>

            {/* Know-now */}
            <Route path="/know-now/ip-analysis" element={<KnowNowIP />} />
            <Route path="/know-now/market-intelligence" element={<KnowNow />} />

            <Route path="/ip-analysis/analytics" element={<IPFullReport />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/m&a-licensing" element={<MALicensing />} />

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

{
  /* <Route path="/emerging-technologies" element={<EmergingTechnologiesAnalytics />} />
          <Route path="/emerging-technologies/list" element={<EmergingTechnologyListPage />} /> */
}

{
  /* Deep Search pages */
}
{
  /* <Route path="/patents" element={<PatentAnalyticPage />} />
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
          <Route path="/universities/table" element={<DeepSearchUniversityListPage />} /> */
}
{
  /* <Route path="/universities/:type" element={<DeepSearchAcademicPage />} />{/* <Route path="/emerging-technologies" element={<EmergingTechnologiesAnalytics />} />
          <Route path="/emerging-technologies/list" element={<EmergingTechnologyListPage />} /> */
}

{
  /* Deep Search pages */
}
{
  /* <Route path="/patents" element={<PatentAnalyticPage />} />
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
          <Route path="/universities/table" element={<DeepSearchUniversityListPage />} /> */
}
{
  /* <Route path="/universities/:type" element={<DeepSearchAcademicPage />} /> */
}
{
  /* <Route path="/universities/patent/:id" element={<UniversityPatentDetailPage />} />
          <Route
            path="/universities/publication/:id"
            element={<UniversityPublicationDetailPage />}
          />

          <Route path="/funders" element={<FunderAnalyticPage />} />
          <Route path="/funders/table" element={<DeepSearchFundersListPage />} />
          <Route path="/funders/:id" element={<DeepSearchFunderPage />} /> */
}
{
  /* <Route path="/universities/patent/:id" element={<UniversityPatentDetailPage />} />
          <Route
            path="/universities/publication/:id"
            element={<UniversityPublicationDetailPage />}
          />

          <Route path="/funders" element={<FunderAnalyticPage />} />
          <Route path="/funders/table" element={<DeepSearchFundersListPage />} />
          <Route path="/funders/:id" element={<DeepSearchFunderPage />} />
          <Route path="/funders/project/:id" element={<FunderProjectDetailPage />} /> */
}

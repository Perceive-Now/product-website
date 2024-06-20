import { Route, Routes } from "react-router-dom";

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

// Signup confirmation and profile completion
// import ConfirmSignup from "./pages/authentication/signup/confirm";
// import CompleteSignup from "./pages/authentication/signup/complete";

//
// import AuthLayout from "./layouts/auth";

import DefaultLayout from "./layouts/default";

// Password
import ResetPasswordPage from "./pages/authentication/reset-password";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

//
import HelpPage from "./pages/miscs/help";
import FeedbackPage from "./pages/miscs/feedback";

// Product dashboard
import DashboardPage from "./pages/product/dashboard";

//
import PageNotFound404 from "./pages/404";

//
import AuthDefaultLayout from "./layouts/auth/default";
import AuthLayout from "./layouts/auth";

// Auth
import VerificationConfirm from "./pages/authentication/signup/confirmation";
import UserDetails from "./pages/authentication/signup/user-details";
import SignupPage from "./pages/authentication/signup";
import LoginPage from "./pages/authentication/login";

// Account
import UserProfile from "./pages/my-account/profile";
import MyReport from "./pages/my-account/my-reports";
import Setting from "./pages/my-account/setting";

// Payment
import StayTuned from "./components/default";
import Payment from "./components/@report-chat/ip-analysis/use-case/payment";

import { WelcomePage } from "./components/@signup-complete";

// knownow
import KnowNowIP from "./pages/product/know-now/ip-analysis";
import MarketIntelligenceKnowNow from "./pages/product/know-now/market-intelligence";

// analytics
import IPFullReport from "./pages/product/ip-landscaping/Full-report";

// Report
import UseCasePage from "./pages/product/use-case";
import Landing from "./pages/product/landing/landing";
import ReportPage from "./pages/product/report-q&a";
import QuickPromptPage from "./pages/product/quick-prompt/quick-prompt-page";

import InteractionMethod from "./pages/product/interaction-method/interaction-method";
import UploadAttachmentsPage from "./pages/product/upload-attachements-page/upload-attachments-page";
import DraftReports from "./pages/product/draft-reports/draft-reports";

import ReportSectionStateManagementService from "./layouts/report-section-state-management-service/report-section-state-management-service";

import { EReportSectionPageIDs } from "./stores/draft";
import KnowNowPage from "./pages/product/know-now";
import ShareKnowNowPage from "./pages/product/share";

/**
 *
 */
function App() {
  return (
    // <div className="App">
    <div>
      <Routes>
        <Route path="/verify-email" element={<VerificationConfirm />} />

        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Authentication Route */}
        <Route element={<AuthLayout />}>
          <Route path="/user-registration" element={<UserDetails />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Actual product pages */}
          {/* <Route element={<ProductLayout />}></Route> */}

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Landing />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/stay-tuned" element={<StayTuned />} />

            {/* Account */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-reports" element={<MyReport />} />
            <Route path="/setting" element={<Setting />} />

            {/* Report-section */}
            <Route element={<ReportSectionStateManagementService />}>
              <Route path="/draft-reports" element={<DraftReports />} />

              <Route path={`/${EReportSectionPageIDs.UseCases}`} element={<UseCasePage />} />

              <Route
                path={`/${EReportSectionPageIDs.InteractionMethod}`}
                element={<InteractionMethod />}
              />
              <Route path={`/${EReportSectionPageIDs.QA}`} element={<ReportPage />} />
              <Route
                path={`/${EReportSectionPageIDs.UploadAttachments}`}
                element={<UploadAttachmentsPage />}
              />
              <Route
                path={`/${EReportSectionPageIDs.UploadQuickPrompts}`}
                element={<QuickPromptPage />}
              />
            </Route>
            {/* Know-now */}
            <Route path="/start-conversation" element={<KnowNowPage />} />

            <Route path="/know-now/ip-analysis/:id" element={<KnowNowIP />} />
            <Route path="/know-now/ip-analysis" element={<KnowNowIP />} />

            <Route
              path="/know-now/market-intelligence/:id"
              element={<MarketIntelligenceKnowNow />}
            />
            <Route path="/know-now/market-intelligence" element={<MarketIntelligenceKnowNow />} />

            {/* Share */}
            <Route path="/share/know-now/market-intelligence/:id" element={<ShareKnowNowPage />} />
            <Route path="/share/know-now/ip-analysis/:id" element={<ShareKnowNowPage />} />

            {/*Graph */}
            <Route path="/ip-analysis/analytics" element={<IPFullReport />} />

            {/* Previous graph and code */}
            <Route path="/dashboard" element={<DashboardPage />} />

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

import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/default";

// Password
import ResetPasswordPage from "./pages/authentication/reset-password";
import ForgotPasswordPage from "./pages/authentication/forgot-password";

//
import HelpPage from "./pages/miscs/help";
import FeedbackPage from "./pages/miscs/feedback";

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
import MyReports from "./pages/my-account/reports";
import Setting from "./pages/my-account/setting";
import Basics from "./pages/my-account/basics";
import Preferences from "./pages/my-account/preferences";
import MyUsers from "./pages/my-account/my-users";
import AddUser from "./pages/my-account/my-users/add-user";
import EditUser from "./pages/my-account/my-users/edit-user";
import QuickReports from "./pages/my-account/my-reports/quick-report";
import AdminReports from "./pages/my-account/admin-reports";
import ReportMangement from "./pages/my-account/my-reports";
// Payment
import StayTunedPage from "./pages/stay-tuned";
import Payment from "./components/@report/use-case/payment";

import { WelcomePage } from "./components/@signup-complete";

// knownow
import KnowNowIP from "./pages/product/know-now/ip-analysis";
import MarketIntelligenceKnowNow from "./pages/product/know-now/market-intelligence";

//VC Report
import VCProduct from "./pages/product/vc-product";

// analytics
import IPFullReport from "./pages/product/analytics/Full-report";

// Report
import UseCasePage from "./pages/product/use-case";
import Landing from "./pages/product/landing/landing";
import QuickPromptPage from "./pages/product/quick-prompt/quick-prompt-page";

//
import InteractionMethod from "./pages/product/interaction-method/interaction-method";
import UploadAttachmentsPage from "./pages/product/upload-attachements-page/upload-attachments-page";
import DraftReports from "./pages/product/draft-reports/draft-reports";

//
import ReportSectionStateManagementService from "./layouts/report-section-state-management-service/report-section-state-management-service";

//
import { EReportSectionPageIDs } from "./stores/draft";
import KnowNowPage from "./pages/product/know-now";
import ShareKnowNowPage from "./pages/product/share";

// Demo
import GenerateMarketReport from "./components/@report-generate/market-report-generate";
import ReportDetailedQAPage from "./pages/product/report-q&a/report-page";
import OrganizationSettings from "./pages/authentication/signup/organization-settings";
import ProfileSetup from "./pages/authentication/signup/profile-setup";
import UserPlan from "./pages/authentication/signup/user-plan";
import PaymentScreen from "./pages/authentication/signup/payment";
import TeamMangementScreen from "./pages/authentication/signup/team-mangement";
import ReviewConfirmationScreen from "./pages/authentication/signup/review-and-confirmation";
import VerificationSuccess from "./pages/authentication/signup/verification-success";
import Finish from "./pages/authentication/signup/finish";
// import MadLibEditor from "./test";

/**
 *
 */
function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthDefaultLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerificationConfirm />} />
          <Route path="/signup/confirm" element={<VerificationConfirm />} />
          <Route path="/signup/success" element={<VerificationSuccess />} />
          <Route path="/signup/organization-setting" element={<OrganizationSettings />} />
          <Route path="/signup/profile" element={<ProfileSetup />} />
          <Route path="/signup/plan" element={<UserPlan />} />
          <Route path="/signup/payment" element={<PaymentScreen />} />
          <Route path="/signup/team" element={<TeamMangementScreen />} />
          <Route path="/signup/review" element={<ReviewConfirmationScreen />} />
          <Route path="/signup/finish" element={<Finish />} />
        </Route>

        {/* Share */}
        <Route path="/share/know-now/market-intelligence/:id" element={<ShareKnowNowPage />} />
        <Route path="/share/know-now/ip-analysis/:id" element={<ShareKnowNowPage />} />

        {/* Authentication Route */}
        <Route element={<AuthLayout />}>
          <Route path="/user-registration" element={<UserDetails />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Actual product pages */}

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Landing />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/stay-tuned" element={<StayTunedPage />} />

            {/* Account */}
            <Route path="/profile" element={<Basics />} />
            <Route path="/my-reports" element={<ReportMangement />} />
            <Route path="/reports" element={<MyReports />} />
            <Route path="/quick-reports" element={<QuickReports />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/my-users" element={<MyUsers />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/admin-reports" element={<AdminReports />} />

            {/* Report-section */}
            <Route element={<ReportSectionStateManagementService />}>
              <Route path="/draft-reports" element={<DraftReports />} />

              <Route path={`/${EReportSectionPageIDs.UseCases}`} element={<UseCasePage />} />

              <Route
                path={`/${EReportSectionPageIDs.InteractionMethod}`}
                element={<InteractionMethod />}
              />
              <Route path={`/${EReportSectionPageIDs.QA}`} element={<ReportDetailedQAPage />} />
              <Route
                path={`/${EReportSectionPageIDs.UploadAttachments}`}
                element={<UploadAttachmentsPage />}
              />
              <Route
                path={`/${EReportSectionPageIDs.UploadQuickPrompts}`}
                element={<QuickPromptPage />}
              />
            </Route>
            <Route path="/generate-market-report" element={<GenerateMarketReport />} />

            {/* Know-now */}
            <Route path="/start-conversation" element={<KnowNowPage />} />

            <Route path="/know-now/ip-analysis/:id" element={<KnowNowIP />} />
            <Route path="/know-now/ip-analysis" element={<KnowNowIP />} />

            <Route
              path="/know-now/market-intelligence/:id"
              element={<MarketIntelligenceKnowNow />}
            />
            <Route path="/know-now/market-intelligence" element={<MarketIntelligenceKnowNow />} />

            {/* VC-report */}
            <Route path="/vc-product" element={<VCProduct />} />

            {/*Graph */}
            <Route path="/analytics" element={<IPFullReport />} />

            {/* Miscs pages */}
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";

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
import ChatComponent from "./pages/product/know-now/chat-test";
import MarketIntelligenceKnowNowSocket from "./pages/product/know-now/socket";

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
            {/*  */}
            <Route path="/chat" element={<MarketIntelligenceKnowNowSocket />} />
            <Route path="/chats" element={<ChatComponent />} />

            {/* <Route path="/chat" element={<MarketIntelligenceKnowNowSocket />} /> */}
            {/* <Route path="/chats" element={<ChatComponent />} /> */}

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

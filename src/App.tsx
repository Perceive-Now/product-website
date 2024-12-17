import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { QuestionMarkIcon } from "./components/icons";
import SpeakerIcon from "./components/icons/upload-attachments/speaker-icon";
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
import AdminProjects from "./pages/my-account/admin-projects";
import AdminReports from "./pages/my-account/admin-projects/admin-reports";
import ReportMangement from "./pages/my-account/my-reports";
import MyProjects from "./pages/my-account/my-projects";
import AdminUploadReport from "./pages/my-account/admin-projects/upload-projects";
import AdminDashboard from "./pages/my-account/admin-projects/landing";
import DetailedReport from "./pages/my-account/admin-projects/detailed-report";

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
// import MadLibEditor from "./test";

/**
 *
 */

const messages = [
  {
    heading: "Did You Know?",
    msg: "Your subscription gives you unlimited projects and updates. Start now and make the most of it!",
    icon: "QuestionMarkIcon",
  },
  {
    heading: "Quick Tip",
    msg: "Your subscription unlocks unlimited project changes—make the most of it!",
    icon: "",
  },
  {
    heading: "Did You Know?",
    msg: "Your plan includes endless revisions. Keep refining your projects to perfection!",
    icon: "QuestionMarkIcon",
  },
  {
    heading: "Quick Tip",
    msg: "There are no extra charges for additional projects or updates. Utilize this to its fullest!",
    icon: "",
  },
  {
    heading: "Did You Know?",
    msg: "Take advantage of unlimited updates to refine your projects and achieve the best results.",
    icon: "QuestionMarkIcon",
  },
];

function App() {
  const location = useLocation();

  // useEffect(() => {
  //   messages.forEach((message, index) => {
  //     setTimeout(() => {
  //       console.log("ajaaaa", message.msg);
  //       // toast.success(message, {
  //       //   duration: 5000, // Duration of toast visibility
  //       //   position: "bottom-right", // Position of the toast
  //       //   style: {
  //       //     marginBottom: "30px", // Add margin between consecutive toasts
  //       //   },
  //       // });
  //       toast.custom((t) => (
  //         <div
  //           className={`${
  //             t.visible ? "animate-enter" : "animate-leave"
  //           } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mb-10`}
  //         >
  //           <div className="flex-1 w-0 p-2">
  //             <div className="flex items-start">
  //               <div className="flex-shrink-0 pt-0.5">
  //                 {message.icon === "QuestionMarkIcon" ? <QuestionMarkIcon /> : <SpeakerIcon />}
  //               </div>
  //               <div className="ml-3 flex-1">
  //                 <p className="text-sm font-bold text-gray-900">{message.heading}</p>
  //                 <p className="mt-1 text-sm text-gray-500">{message.msg}</p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex border-l border-gray-200">
  //             <button
  //               onClick={() => toast.dismiss(t.id)}
  //               className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       ));
  //     }, index * 30000);
  //   });
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/verify-email" element={<VerificationConfirm />} />
        <Route path="/signup/organization-setting" element={<OrganizationSettings />} />
        <Route path="/signup/profile" element={<ProfileSetup />} />
        <Route path="/signup/plan" element={<UserPlan />} />

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
            <Route path="/stay-tuned" element={<StayTunedPage />} />

            {/* Account */}
            <Route path="/profile" element={<Basics />} />
            <Route path="/my-reports/:id" element={<ReportMangement />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/reports" element={<MyReports />} />
            <Route path="/quick-reports/:id?" element={<QuickReports />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/my-users" element={<MyUsers />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/add-user" element={<AddUser />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-projects/:id" element={<AdminProjects />} />
            <Route path="/admin-reports/:id" element={<AdminReports />} />
            <Route path="/upload-report/:id" element={<AdminUploadReport />} />
            <Route path="/detailed-report" element={<DetailedReport />} />

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

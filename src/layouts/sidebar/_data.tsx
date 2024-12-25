import type { ReactElement } from "react";

//

import NewChatIcon from "../../components/icons/side-bar/new-chat";
import NewReportIcon from "../../components/icons/side-bar/new-report";
import ReportsListIcon from "src/components/icons/side-bar/reports-list";
// import IndustriesIcon from "src/components/icons/side-bar/industries-icon";

import healthcareIcon from "src/assets/sidebar/Industries/healthcare";
import MA from "src/assets/sidebar/Industries/ma";
import Web3 from "src/assets/sidebar/Industries/web3";
import IpAttorney from "src/assets/sidebar/Industries/ipattorney";
import TTO from "src/assets/sidebar/Industries/TTO";
import VC from "src/assets/sidebar/Industries/vc";
import Firm from "src/assets/sidebar/Industries/firm";

import IpInsights from "src/assets/sidebar/knowNow/ip-insight";
import marketResearch from "src/assets/sidebar/knowNow/market-research";
import ReportsSidebarIcon from "src/assets/sidebar/report";
import KnowNowIcon from "src/assets/sidebar/knowNowIcon";
import Home from "src/components/icons/sidenav/home";
import NewReport from "src/components/icons/sidenav/newreport";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Home",
    key: "home",
    icon: Home,
    to: "/",
  },
  {
    title: "New Report",
    key: "new-report",
    icon: NewReport,
    to: "/vc-product",
  },
  // {
  //   title: "Know Now",
  //   key: "knownow",
  //   classname:"mb-1",
  //   icon: KnowNowIcon,
  //   to:"/start-conversation"
  // },
  {
    title: "Report Management",
    key: "reportManagement",
    classname:"mb-1",
    icon: NewReportIcon,
    to:"/my-projects"
  },
  // {
  //   title: "New Conversation",
  //   key: "new-chat",
  //   icon: NewChatIcon,
  //   to: "/start-conversation",
  // },
  // {
  //   title: "New Report",
  //   key: "new-report",
  //   icon: NewReportIcon,
  //   to: "/new-report",
  // },
  // {
  //   title: "Reports",
  //   key: "reports",
  //   icon: ReportsListIcon,
  //   to: "/reports-list",
  // },
  // {
  //   title: "Draft",
  //   key: "draft",
  //   icon: DraftIcon,
  //   to: "/draft-reports",
  // },

  // {
  //   title: "Know Now",
  //   key: "knownow",
  //   classname:"sidebar-knownow",
  //   icon: KnowNowIcon,
  //   subList: [
  //     { title: "IP Insights", key: "ip-insights", to: "/know-now/ip-analysis/", icon: IpInsights, classname:'sidebar-ip' },
  //     { title: "Market Research", key: "market-research", to: "/know-now/market-intelligence/", icon: marketResearch ,classname:'sidebar-mi'},
  //   ],
  // },
  // {
  //   title: "Industries",
  //   key: "industries",
  //   classname:"sidebar-industries",
  //   icon: ReportsSidebarIcon,
  //   subList: [
  //     { title: "Venture Capital", key: "venture-capital", to: "/vc-product", icon: VC , classname:'sidebar-vc'},
  //     { title: "Market and IP Research Firms", key: "market-firms", to: "#", icon: Firm, classname:'sidebar-firm' },
  //     { title: "Healthcare", key: "healthcare", to: "#", icon: healthcareIcon , classname:'sidebar-healthcare'},
  //     { title: "M&A", key: "m&a", to: "#", icon: MA ,classname:'sidebar-ma'},
  //     { title: "Web3", key: "web3", to: "#", icon: Web3 ,classname:'sidebar-web3'},
  //     { title: "IP Attorney", key: "ipattorney", to: "#", icon: IpAttorney,classname:'sidebar-ipattorny' },
  //     { title: "Technology Tranfer Office", key: "tto", to: "#", icon: TTO,classname:'sidebar-tto' },
  //   ],
  // },
  // {
  //   title: "New Report",
  //   key: "new-report",
  //   icon: NewReportIcon,
  //   subList: [
  //     { title: "New Report", key: "venture-capital",to: "/new-report",icon: ReportsListIcon , classname:'sidebar-vc'},
  //   ]
  // }
];

export interface ISidebarItem {
  title: string;
  key: string,
  icon: ReactElement;
  to: string;
}

export interface ISidebarListItem {
  title: string;
  key: string;
  icon?: any;
  to?: string;
  classname?:string;
  children?: ISidebarListItem[];
  subList?: ISidebarListItem[];
}

export { sidebarItems };

import type { ReactElement } from "react";

//
import {
  // ExpertsIcon,
  FundersIcon,
  PatentsIcon,
  PublicationsIcon,
  UniversitiesIcon,
  DashboardIcon,
  //
  TechnologyIcon,
  CompaniesIcon,
  // Universities2Icon,
  // SummaryIcon,
  // SimilarityIcon,
  // MascotIcon,
} from "../../icons";
import ChatIcon from "../../icons/sidenav/chat";
import InventorIcon from "../../icons/sidenav/inventors";
import PortfolioIcon from "../../icons/sidenav/portfolio";
import ClaimIcon from "../../icons/sidenav/claim";
import SummarizeIcon from "../../icons/sidenav/summarize";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Home",
    key: "home",
    icon: <DashboardIcon />,
    to: "/",
  },
  {
    title: "Chat with our AI",
    key: "chat-with-our-ai",
    icon: <ChatIcon />,
    to: "/chat",
  },
  {
    title: "Emerging Technologies",
    key: "emerging-technology",
    icon: <TechnologyIcon />,
    to: "/emerging-technologies",
  },
  {
    title: "Pro",
    key: "pro",
    children: [
      // {
      //   title: "Emerging technology",
      //   key: "emerging-technology",
      //   icon: <TechnologyIcon />,
      //   to: "/#",
      // },
      {
        title: "Patents",
        key: "patents",
        icon: <PatentsIcon />,
        to: "/patents",
      },
      {
        title: "Publications",
        key: "publications",
        icon: <PublicationsIcon />,
        to: "/publications",
      },
      {
        title: "Companies",
        key: "companies",
        icon: <CompaniesIcon />,
        to: "/companies",
      },
      {
        title: "Universities",
        key: "universities",
        icon: <UniversitiesIcon />,
        to: "/universities",
      },
      {
        title: "Inventors",
        key: "inventors",
        icon: <InventorIcon />,
        to: "/inventors",
      },
      {
        title: "Funders",
        key: "funders",
        icon: <FundersIcon />,
        to: "/funders",
      },
    ],
  },
  {
    title: "Premium",
    key: "premium",
    children: [
      {
        title: "Portfolio Protection",
        key: "portfolio-protection",
        icon: <PortfolioIcon />,
        to: "/portfolio-protection",
      },
      {
        title: "M&A Insights",
        key: "m&a-insights",
        icon: <TechnologyIcon />,
        to: "/m&a-insights",
      },
      {
        title: "Claim Check",
        key: "claim-check",
        icon: <ClaimIcon />,
        to: "/claim-check",
      },
      {
        title: "Summarize",
        key: "summarize",
        icon: <SummarizeIcon />,
        to: "/summarize",
      },
    ],
  },
  // {
  //   title: "Diligence 360°",
  //   key: "dilligence-360",
  //   children: [
  //     {
  //       title: "Connected trends",
  //       key: "connected-trends",
  //       children: [
  //         {
  //           title: "Companies",
  //           key: "connected-trend-companies",
  //           icon: <CompaniesIcon />,
  //           to: "/#",
  //         },
  //         {
  //           title: "Universities",
  //           key: "connected-trend-universities",
  //           icon: <Universities2Icon />,
  //           to: "/#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "M&A Insights",
  //       key: "ma-insights",
  //       children: [
  //         {
  //           title: "Companies",
  //           key: "ma-insights-companies",
  //           icon: <CompaniesIcon />,
  //           to: "/#",
  //         },
  //         {
  //           title: "Universities",
  //           key: "ma-insights-universities",
  //           icon: <Universities2Icon />,
  //           to: "/#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Summarize",
  //       key: "summarize",
  //       icon: <SummaryIcon />,
  //       to: "/#",
  //     },
  //     {
  //       title: "Similarity check",
  //       key: "similarity-check",
  //       icon: <SimilarityIcon />,
  //       to: "/#",
  //     },
  //     {
  //       title: "Ask our AI mascot",
  //       key: "ask-our-ai-mascot",
  //       icon: <MascotIcon />,
  //       to: "/#",
  //     },
  //   ],
  // },
];

export interface ISidebarItem {
  title: string;
  icon: ReactElement;
  to: string;
}

export interface ISidebarListItem {
  title: string;
  key: string;
  icon?: ReactElement;
  to?: string;
  children?: ISidebarListItem[];
}

export { sidebarItems };

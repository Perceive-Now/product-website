import type { ReactElement } from "react";

//
import {
  // ExpertsIcon,
  // FundersIcon,
  // PatentsIcon,
  // PublicationsIcon,
  // UniversitiesIcon,
  DashboardIcon,
  //
  // CompaniesIcon,
  // Universities2Icon,
  // SummaryIcon,
  // SimilarityIcon,
  // MascotIcon,
} from "../../icons";
// import HookIcon from "../../icons/sidenav/hook";
// import DOcumentIcon from "../../icons/miscs/document";
// import TechnologyIcon from "../../icons/miscs/Technology";
import BulbIcon from "../../icons/miscs/Bulb";
import PortfolioIcon from "../../icons/sidenav/portfolio";
// import ClaimIcon from "../../icons/sidenav/claim";
// import ChatIcon from "../../icons/sidenav/chat";
// import InventorIcon from "../../icons/sidenav/inventors";
// import PortfolioIcon from "../../icons/sidenav/portfolio";
// import ClaimIcon from "../../icons/sidenav/claim";
// import SummarizeIcon from "../../icons/sidenav/summarize";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Generate new report",
    key: "generate",
    icon: <DashboardIcon />,
    to: "/",
  },
  {
    title: "User info",
    key: "user-info",
    icon: <PortfolioIcon />,
    to: "/info",
  },
  // {
  //   title: "Freedom to operate",
  //   key: "freedom-to-operate",
  //   icon: <HookIcon />,
  //   to: "/patents",
  // },
  {
    title: "Report",
    key: "report",
    icon: <BulbIcon />,
    to: "/reports",
  },
  {
    title: "Settings",
    key: "setting",
    icon: <PortfolioIcon />,
    to: "/setting",
  },
  // {
  //   title: "M&A Licensing",
  //   key: "m&a-licensing",
  //   icon: <DOcumentIcon />,
  //   to: "/m&a-licensing",
  // },
  // {
  //   title: "Technology landscaping",
  //   key: "technology-landscaping",
  //   icon: <TechnologyIcon />,
  //   to: "/b",
  // },
  // {
  //   title: "Competitive intelligence",
  //   key: "competitive-intelligence",
  //   icon: <BulbIcon />,
  //   to: "/c",
  // },
  // {
  //   title: "Infringement analysis",
  //   icon: <PortfolioIcon />,
  //   key: "infringement-analysis",
  //   to: "/infringement-analysis",
  // },
  // {
  //   title: "Database Search",
  //   icon: <ClaimIcon />,
  //   key: "database-search",
  //   to: "/database-search",
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
  to: string;
  children?: ISidebarListItem[];
}

export { sidebarItems };

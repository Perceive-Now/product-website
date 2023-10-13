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
  TechnologyIcon,
  // CompaniesIcon,
  // Universities2Icon,
  // SummaryIcon,
  // SimilarityIcon,
  // MascotIcon,
} from "../../icons";
import ChatIcon from "../../icons/sidenav/chat";
// import InventorIcon from "../../icons/sidenav/inventors";
// import PortfolioIcon from "../../icons/sidenav/portfolio";
// import ClaimIcon from "../../icons/sidenav/claim";
// import SummarizeIcon from "../../icons/sidenav/summarize";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Home",
    key: "home",
    icon: <DashboardIcon />,
    to: "/",
  },
  {
    title: "IP Landscaping",
    key: "ip-landscaping",
    icon: <ChatIcon />,
    to: "/ip-landscaping",
  },
  {
    title: "Freedom to operate",
    key: "freedom-to-operate",
    icon: <TechnologyIcon />,
    to: "/freedom-to-operate",
  },
  {
    title: "IP Licensing opportunities",
    key: "ip-licensing-opportunities",
    icon: <TechnologyIcon />,
    to: "/a",
  },
  {
    title: "Technology landscaping",
    key: "technology-landscaping",
    icon: <TechnologyIcon />,
    to: "/b",
  },
  {
    title: "Competitive intelligence",
    key: "competitive-intelligence",
    icon: <TechnologyIcon />,
    to: "/c",
  },
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

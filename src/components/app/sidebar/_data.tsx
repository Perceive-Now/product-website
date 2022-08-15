import type { ReactElement } from "react";

//
import {
  ExpertsIcon,
  FundersIcon,
  MediationIcon,
  PatentsIcon,
  PreviewIcon,
  PublicationsIcon,
  SummaryIcon,
  TrendsIcon,
  UniversitiesIcon,
  DashboardIcon,
  SettingsIcon,
  LogoutIcon,
} from "../../icons";

const topItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    to: "/dashboard",
  },
];

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Innovate AI",
    key: "innovate-ai",
    children: [
      {
        title: "M&A Insignts",
        icon: <MediationIcon />,
        to: "/insights",
      },
      {
        title: "Trends",
        icon: <TrendsIcon />,
        to: "/trends",
      },
      {
        title: "Hawk-eye view",
        icon: <PreviewIcon />,
        to: "/preview",
      },
      {
        title: "Summarize",
        icon: <SummaryIcon />,
        to: "/summary",
      },
    ],
  },
  {
    title: "Advance Search",
    key: "advance-search",
    children: [
      {
        title: "Publications",
        icon: <PublicationsIcon />,
        to: "/publications",
      },
      {
        title: "Patents",
        icon: <PatentsIcon />,
        to: "/patents",
      },
      {
        title: "Experts",
        icon: <ExpertsIcon />,
        to: "/experts",
      },
      {
        title: "Funders",
        icon: <FundersIcon />,
        to: "/funders",
      },
      {
        title: "Universities",
        icon: <UniversitiesIcon />,
        to: "/universities",
      },
    ],
  },
];

const bottomItems: ISidebarItem[] = [
  {
    title: "Settings",
    icon: <SettingsIcon />,
    to: "/settings",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    to: "/logout",
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
  children: ISidebarItem[];
}

export { topItems, sidebarItems, bottomItems };

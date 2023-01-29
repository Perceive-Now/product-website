import type { ReactElement } from "react";

//
import {
  ExpertsIcon,
  FundersIcon,
  PatentsIcon,
  PublicationsIcon,
  UniversitiesIcon,
  DashboardIcon,
  //
  TechnologyIcon,
  CompaniesIcon,
  Universities2Icon,
} from "../../icons";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon />,
    to: "/dashboard",
  },
  {
    title: "Deep Search",
    key: "deep-search",
    children: [
      {
        title: "Emerging technology",
        key: "emerging-technology",
        icon: <TechnologyIcon />,
        to: "/",
      },
      {
        title: "Publications",
        key: "publications",
        icon: <PublicationsIcon />,
        to: "/deep-search/publications",
      },
      {
        title: "Patents",
        key: "patents",
        icon: <PatentsIcon />,
        to: "/deep-search/patents",
      },
      {
        title: "Companies",
        key: "companies",
        icon: <CompaniesIcon />,
        to: "/deep-search/companies",
      },
      {
        title: "Inventors",
        key: "inventors",
        icon: <ExpertsIcon />,
        to: "/",
      },
      {
        title: "Universities",
        key: "universities",
        icon: <UniversitiesIcon />,
        to: "/",
      },
      {
        title: "Funders",
        key: "funders",
        icon: <FundersIcon />,
        to: "/",
      },
    ],
  },
  {
    title: "Diligence 360°",
    key: "dilligence-360",
    children: [
      {
        title: "Connected trends",
        key: "connected-trends",
        children: [
          {
            title: "Companies",
            key: "connected-trend-companies",
            icon: <CompaniesIcon />,
            to: "/",
          },
          {
            title: "Universities",
            key: "connected-trend-universities",
            icon: <Universities2Icon />,
            to: "/",
          },
        ],
      },
      {
        title: "M&A Insights",
        key: "ma-insights",
        children: [
          {
            title: "Companies",
            key: "ma-insights-companies",
            icon: <CompaniesIcon />,
            to: "/",
          },
          {
            title: "Universities",
            key: "ma-insights-universities",
            icon: <Universities2Icon />,
            to: "/",
          },
        ],
      },
      {
        title: "Summarize",
        key: "summarize",
        to: "/",
      },
      {
        title: "Similarity check",
        key: "similarity-check",
        to: "/",
      },
      {
        title: "Ask our AI mascot",
        key: "ask-our-ai-mascot",
        to: "/",
      },
    ],
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
  to?: string;
  children?: ISidebarListItem[];
}

export { sidebarItems };

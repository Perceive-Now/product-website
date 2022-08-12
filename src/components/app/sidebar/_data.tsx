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
} from "../../icons";

const sidebarItems: ISidebarItem[] = [
  {
    title: "Innovate AI",
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

interface ISidebarItem {
  title: string;
  children: {
    title: string;
    icon: ReactElement;
    to: string;
  }[];
}

export default sidebarItems;

import type { ReactElement } from "react";

//

// import NewChatIcon from "../../icons/side-bar/new-chat";
import NewReportIcon from "../../icons/side-bar/new-report";
import DraftIcon from "../../icons/side-bar/draft-icon";
import ReportsListIcon from "src/components/icons/side-bar/reports-list";
import IndustriesIcon from "src/components/icons/side-bar/industries-icon";

const sidebarItems: ISidebarListItem[] = [
  // {
  //   title: "New Conversation",
  //   key: "new-chat",
  //   icon: NewChatIcon,
  //   to: "/start-conversation",
  // },
  {
    title: "New Report",
    key: "new-report",
    icon: NewReportIcon,
    to: "/new-report",
  },
  // {
  //   title: "Reports",
  //   key: "reports",
  //   icon: ReportsListIcon,
  //   to: "/reports-list",
  // },
  {
    title: "Draft",
    key: "draft",
    icon: DraftIcon,
    to: "/draft-reports",
  },
  {
    title: "Industries",
    key: "industries",
    icon: IndustriesIcon,
    to: "#",
    subList: [
      {
        title: "Venture Capital",
        key: "venture-capital",
        icon: DraftIcon,
        to: "#",
      },
      {
        title: "Biotechnology",
        key: "biotechnology",
        icon: DraftIcon,
        to: "#",
      },
      {
        title: "Pharmaceuticals",
        key: "pharmaceuticals",
        icon: DraftIcon,
        to: "#",
      },
      {
        title: "Healthcare",
        key: "healthcare",
        icon: DraftIcon,
        to: "#",
      },
      {
        title: "Sustainability",
        key: "sustainability",
        icon: DraftIcon,
        to: "#",
      },
      {
        title: "Law",
        key: "law",
        icon: DraftIcon,
        to: "#",
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
  icon?: any;
  to: string;
  children?: ISidebarListItem[];
  subList?: ISidebarListItem[];
}

export { sidebarItems };

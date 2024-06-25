import type { ReactElement } from "react";

//

import NewChatIcon from "../../icons/side-bar/new-chat";
import NewReportIcon from "../../icons/side-bar/new-report";
import DraftIcon from "../../icons/side-bar/draft-icon";

const sidebarItems: ISidebarListItem[] = [
  {
    title: "New Conversation",
    key: "new-chat",
    icon: NewChatIcon,
    to: "/start-conversation",
  },
  {
    title: "New Report",
    key: "new-report",
    icon: NewReportIcon,
    to: "/new-report",
  },
  {
    title: "Draft",
    key: "draft",
    icon: DraftIcon,
    to: "/draft-reports",
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
}

export { sidebarItems };

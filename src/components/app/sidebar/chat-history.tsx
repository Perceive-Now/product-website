import React from "react";
import Dropdown from "../../reusable/dropdown";
import { History } from "./__dummy";
import { ShareIcon } from "../../icons";
import TrashIcon from "../../icons/common/trash";
import PinIcon from "../../icons/common/pin-icon";

const KnowNowHistory = () => {
  const menuItems = [
    {
      label: "Pin",
      icon: <PinIcon className="h-2 w-2" />,
    },
    {
      label: "Delete",
      icon: <TrashIcon className="h-2 w-2" />,
    },
    {
      label: "Share",
      icon: <ShareIcon className="h-2 w-2" />,
    },
  ];
  return (
    <div className="px-0.5 space-y-2">
      <h6>History</h6>
      <div>
        {History.map((h, idx) => (
          <div key={idx * 100} className="flex ">
            <div className="text-sm py-1">
              <span className="line-clamp-1">{h.title}</span>
            </div>
            {/* <button
            type="button"
            className=""
          // onClick={() => setOpen(!open)}
          >
            <VerticalEllipsis />
          </button> */}
            <Dropdown menuItems={menuItems} width="xs" alignment="right" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowNowHistory;

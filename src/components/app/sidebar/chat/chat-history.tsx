/* eslint-disable no-console */
import { useCallback, useEffect, useState } from "react";

import Dropdown from "../../../reusable/dropdown";
//
import { ShareIcon } from "../../../icons";
import TrashIcon from "../../../icons/common/trash";
import PinIcon from "../../../icons/common/pin-icon";
//
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppConfig } from "src/config/app.config";
import toast from "react-hot-toast";
import { useAppDispatch } from "src/hooks/redux";
import { setRemoveConversation } from "src/stores/know-now1";
import classNames from "classnames";

interface Props {
  History: { title: string; chat_id: string }[];
}

const KnowNowHistory = ({ History }: Props) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [path, setPath] = useState("");

  //
  useEffect(() => {
    if (location.pathname.includes("/know-now/ip-analysis")) {
      setPath("/know-now/ip-analysis");
    }
    if (location.pathname.includes("/know-now/market-intelligence")) {
      setPath("/know-now/market-intelligence");
    }
  }, [location.pathname]);

  //
  const onDelete = useCallback(
    async (conversation_id: string) => {
      try {
        const { data } = await axios.post(`${AppConfig.KNOW_NOW_IP_API}/conversation/delete`, {
          conversation_id: conversation_id,
        });
        if (data.success) {
          dispatch(setRemoveConversation(conversation_id));
          if (id === conversation_id) {
            navigate("/start-conversation");
          }
        }
        toast.success("Successfully Deleted");
      } catch (error) {
        toast.error("Server error");
      }
    },
    [dispatch, id, navigate],
  );

  //
  const menuItems = [
    {
      label: "Pin",
      icon: <PinIcon className="h-2 w-2" />,
      action: () => {
        console.log("Pin");
      },
    },
    {
      label: "Delete",
      icon: <TrashIcon className="h-2 w-2" />,
      action: onDelete,
    },
    {
      label: "Share",
      icon: <ShareIcon className="h-2 w-2" />,
      action: () => {
        console.log("share");
      },
    },
  ];

  return (
    <div className="space-y-1">
      <h6 className="text-black">History</h6>
      <div className="h-[calc(100vh-400px)] overflow-y-auto pn_scroller">
        {History.map((h, idx) => (
          <div
            key={idx * 100}
            className={classNames(
              "flex items-center px-0.5",
              id === h.chat_id ? "bg-appGray-200 rounded-md " : "",
            )}
          >
            <Link to={`${path}/${h.chat_id}`}>
              <div className="text-sm py-1">
                <span className="line-clamp-1 text-black">{h.chat_id}</span>
              </div>
            </Link>
            <Dropdown
              menuItems={menuItems}
              width="xs"
              alignment="right"
              conversation_id={h.chat_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowNowHistory;

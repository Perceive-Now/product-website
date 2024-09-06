/* eslint-disable no-console */
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import classNames from "classnames";
import jsCookie from "js-cookie";
import axios from "axios";
import { ShareIcon } from "src/components/icons";
import PinIcon from "src/components/icons/common/pin-icon";
import ArrowDown from "src/components/icons/miscs/ArrowDown";
import DeleteConfirmationModal from "src/components/modal/delete-confirmation";
//

//
import TrashIcon from "../../../components/icons/common/trash";
// import PinIcon from "../../../icons/common/pin-icon";

//
import { AppConfig } from "src/config/app.config";

//
import { useAppDispatch } from "src/hooks/redux";

//
import { setRemoveMarketConversation } from "src/stores/knownow-market";
import { setRemoveIPConversation } from "src/stores/knownow-ip";
import Dropdown from "src/components/reusable/dropdown";
import ShareModal from "src/components/reusable/share-modal";

interface Props {
  History: { title: string; chat_id: string }[];
}

/**
 *
 */

const KnowNowHistory = ({ History }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [path, setPath] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sharePath, setSharePath] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [deleteId, setDeleteId] = useState("");
  const userId = jsCookie.get("user_id");

  //
  useEffect(() => {
    if (location.pathname.includes("/know-now/ip-analysis")) {
      setPath("/know-now/ip-analysis");
    }
    if (location.pathname.includes("/know-now/market-intelligence")) {
      setPath("/know-now/market-intelligence");
    }
  }, [dispatch, location.pathname]);

  //Delete
  const onDelete = useCallback(
    async (conversation_id: string) => {
      try {
        if (location.pathname.includes("/know-now/ip-analysis")) {
          const { data } = await axios.post(`${AppConfig.KNOW_NOW_IP_API}/conversation/delete`, {
            conversation_id: conversation_id,
          });
          if (data.success) {
            dispatch(setRemoveIPConversation(conversation_id));
            if (id === conversation_id) {
              navigate("/start-conversation");
            }
          }
        }
        if (location.pathname.includes("/know-now/market-intelligence")) {
          await axios.delete(`${AppConfig.KNOW_NOW_MARKET_API}/delete/thread`, {
            params: {
              user_id: userId,
              thread_id: conversation_id,
            },
          });
          dispatch(setRemoveMarketConversation(conversation_id));
          if (id === conversation_id) {
            navigate("/start-conversation");
          }
        }
        toast.success("Successfully Deleted");
      } catch (error) {
        console.log(error);
        toast.error("Server error");
      }
    },
    [dispatch, id, location.pathname, navigate, userId],
  );

  //Share
  const onShare = useCallback(
    (conversation_id: string) => {
      console.log(conversation_id);
      setModal(true);
      setSharePath(`/share${path}/${conversation_id}`);
    },
    [path],
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
    // {
    //   label: "Delete",
    //   icon: <TrashIcon className="h-2 w-2" />,
    //   action: onDelete,
    // },
    {
      label: "Delete",
      icon: <TrashIcon className="h-2 w-2" />,
      action: (id: string) => {
        setDeleteModal(true);
        setDeleteId(id);
      },
    },
    {
      label: "Share",
      icon: <ShareIcon className="h-2 w-2" />,
      action: onShare,
    },
  ];

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const indexedHistory = History.map((element, index) => ({ index, element }));
  return (
    <>
      <div className="h-[calc(100vh-400px)] overflow-y-auto pn_scroller">
        {indexedHistory
          .sort((a, b) => a.index - b.index)
          .slice(0, visibleCount)
          .map((h, idx) => (
            <div
              key={idx * 100}
              className={classNames(
                "flex items-center px-0.5 w-full",
                id === h.element.chat_id ? "bg-appGray-200 rounded-md " : "",
              )}
            >
              <Link to={`${path}/${h.element.chat_id}?status=true`} className="grow-0">
                <div className="text-sm py-1 line-clamp-1 ">
                  <p className="line-clamp-1 text-black">{h.element.chat_id}</p>
                </div>
              </Link>
              <Dropdown
                menuItems={menuItems}
                width="xs"
                alignment="right"
                conversation_id={h.element.chat_id}
              />
            </div>
          ))}
        {indexedHistory.length > visibleCount && (
          <button onClick={handleShowMore} className="text-sm flex items-center mt-2 ml-1">
            <ArrowDown className="mr-2" />
            Show More
          </button>
        )}
      </div>
      <ShareModal open={modal} path={sharePath} handleClose={() => setModal(false)} />
      <DeleteConfirmationModal
        open={deleteModal}
        handleDelete={onDelete}
        handleClose={() => setDeleteModal(false)}
        conversation_id={deleteId}
      />
    </>
  );
};

export default KnowNowHistory;

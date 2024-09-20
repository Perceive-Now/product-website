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
import EditIcon from "src/components/icons/miscs/Edit";
import DeleteConfirmationModal from "src/components/modal/delete-confirmation";
import EditTitle from "src/components/@know-now/edit-title";
//

//
import TrashIcon from "../../../components/icons/common/trash";
// import PinIcon from "../../../icons/common/pin-icon";

//
import { AppConfig } from "src/config/app.config";

//
import { useAppDispatch } from "src/hooks/redux";

//
import {
  setRemoveMarketConversation,
  setPinMarketConversation,
  updateMarketThread,
  setTitleMarketConversation,
} from "src/stores/knownow-market";
import { setRemoveIPConversation } from "src/stores/knownow-ip";
import Dropdown from "src/components/reusable/dropdown";
import ShareModal from "src/components/reusable/share-modal";

interface Props {
  History: { title: string; thread_id: number; favorite: boolean }[];
}



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
  const [deleteId, setDeleteId] = useState(0);
  const [renameThreadId, setRenameThreadId] = useState(null);
  const [currentFavorite, setCurrentFavorite] = useState<boolean>(false);

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

  const handleRename = (threadId: any, isPinned: boolean) => {
    setRenameThreadId(threadId);
    setCurrentFavorite(isPinned);
  };

  const handleTitleSubmit = async (newTitle: string) => {
    if (renameThreadId !== null) {
      const { payload }: any = await dispatch(
        updateMarketThread({
          thread_id: renameThreadId,
          user_id: userId,
          favorite: currentFavorite,
          title: newTitle,
        }),
      );

      if (payload.success) {
        dispatch(setTitleMarketConversation({ renameThreadId, newTitle }));
        toast.success("Renamed Successfully");
      } else {
        toast.error("Failed to Rename");
      }
      setRenameThreadId(null);
      setCurrentFavorite(false);
    }
  };

  //Delete
  const onDelete = useCallback(
    async (conversation_id: number) => {
      try {
        if (location.pathname.includes("/know-now/ip-analysis")) {
          // const { data } = await axios.post(`${AppConfig.KNOW_NOW_IP_API}/conversation/delete`, {
          const { data } = await axios.post(`${AppConfig.KNOW_NOW_IP_API}/delete_conversation`, {
            thread_id: conversation_id,
            user_id: userId,
            question: "",
          });
          if (data.success) {
            dispatch(setRemoveIPConversation(conversation_id));
            if (Number(id) === conversation_id) {
              navigate("/start-conversation");
            }
          }
        }

        if (location.pathname.includes("/know-now/market-intelligence")) {
          // await axios.delete(`${AppConfig.KNOW_NOW_MARKET_API}/delete/thread`, {
          await axios.delete(`${AppConfig.KNOW_NOW_MARKET_API}/delete_thread/${conversation_id}`, {
            // conversation_id: conversation_id,
            params: {
              user_id: userId,
            },
          });
          dispatch(setRemoveMarketConversation(conversation_id));

          if (Number(id) == conversation_id) {
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
    (conversation_id: number) => {
      setModal(true);
      setSharePath(`/share${path}/${conversation_id}`);
    },
    [path],
  );

  //Pin
  const onPinned = useCallback(
    async (conversation_id: number, isPinned: boolean) => {
      try {
        let apiUrl: string | undefined;

        if (location.pathname.startsWith("/know-now/ip-analysis")) {
          apiUrl = `${AppConfig.KNOW_NOW_IP_API}/update_favorite`;
        } else if (location.pathname.startsWith("/know-now/market-intelligence")) {
          apiUrl = `${AppConfig.KNOW_NOW_MARKET_API}/update_favorite`;
        }

        if (!apiUrl) {
          return;
        }

        const { payload }: any = await dispatch(
          updateMarketThread({
            thread_id: conversation_id,
            user_id: userId,
            favorite: !isPinned,
            title: "",
          }),
        );

        if (payload.success) {
          dispatch(setPinMarketConversation(conversation_id));
          toast.success(isPinned ? "Successfully Unpinned" : "Successfully Pinned");
        } else {
          toast.error("Failed to Pin");
        }
      } catch (error) {
        console.error("Error while pinning:", error);
        toast.error("Server error");
      }
    },
    [location.pathname, userId],
  );

  //
  const menuItems = (id: number) => [
    {
      label: "Pin",
      icon: <PinIcon className="h-2 w-2" />,
      action: onPinned,
    },
    {
      label: "Delete",
      icon: <TrashIcon className="h-2 w-2" />,
      action: (id: number) => {
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

  const getMenuItems = (threadId: number, isPinned: boolean) => [
    {
      label: isPinned ? "Unpin" : "Pin",
      icon: <PinIcon className="h-2 w-2" />,
      action: () => onPinned(threadId, isPinned),
    },
    {
      label: "Rename",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => handleRename(threadId, isPinned),
    },
    {
      label: "Delete",
      icon: <TrashIcon className="h-2 w-2" />,
      action: () => {
        setDeleteModal(true);
        setDeleteId(threadId);
      },
    },
    {
      label: "Share",
      icon: <ShareIcon className="h-2 w-2" />,
      action: () => onShare(threadId),
    },
  ];

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };


  // const indexedHistory = History.map((element, index) => ({ index, element }));
  const indexedHistory = History.map((element, index) => ({ index, element })).sort(
    (a: any, b: any) => b.element.favorite - a.element.favorite,
  );
  return (
    <>
      <div className="h-[calc(100vh-400px)] overflow-y-auto overflow-x-hidden pn_scroller">
        {indexedHistory.length > 0 &&
          indexedHistory.slice(0, visibleCount).map((h, idx) => (
            <div
              key={idx * 100}
              className={classNames(
                "flex items-center justify-between px-0.5 w-full gap-1",
                Number(id) === h.element.thread_id ? "bg-appGray-200 rounded-md " : "",
              )}
            >
               <div className="flex-0 ml-auto">
              {h.element.favorite && (
                <span className="cursor-pointer">
                  <PinIcon />
                </span>
              )}
              </div>
              {/* <Link to={`${path}/${h.element.thread_id}?status=true`} className="grow-0">
              <div className="text-sm py-1 line-clamp-1">
                <p className="line-clamp-1 text-black">{h.element.title}</p>
              </div>
            </Link> */}
              <Link to={`${path}/${h.element.thread_id}?status=true`} className="grow-0">
                <div className="text-sm py-1 line-clamp-1">
                  {renameThreadId === h.element.thread_id ? (
                    <EditTitle currentTitle={h.element.title} onSubmit={handleTitleSubmit} />
                  ) : (
                    <p className="line-clamp-1 text-black">{h.element.title}</p>
                  )}
                </div>
              </Link>
              <Dropdown
                // menuItems={menuItems}
                menuItems={getMenuItems(h.element.thread_id, h.element.favorite)}
                width="xs"
                alignment="right"
                conversation_id={h.element.thread_id}
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

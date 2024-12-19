import { useState } from "react";
import { Dialog } from "@headlessui/react";

//
import { CrossIcon } from "../../icons";
import FacebookIcon from "../../../assets/images/Facebook.svg";
import LinkedInIcon from "../../../assets/images/LinkedIn.svg";
import TwitterIcon from "../../../assets/images/Twitter.svg";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import jsCookie from "js-cookie";

//
export default function ShareModal({ open, handleClose, path }: ICitationModalProps) {
  const userId = jsCookie.get("user_id");

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const origin = "https://develop.app.perceivenow.ai";
  // "https://develop.app.perceivenow.ai"
  // process.env.NODE_ENV === "development"
  //   ? "https://develop.app.perceivenow.ai"
  //   : window.location.origin;

  // const url = `${origin}${path}?userId=${userId}`;
  const url = path.startsWith("https://") ? path : `${origin}${path}?userId=${userId}`;

  const handleCopyLinkToClipBoard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        /* Success - clipboard success */
        setIsCopied(true);
      },
      () => {
        /* Rejected - clipboard failed */
      },
    );
  };

  const handleCloseAction = () => {
    setIsCopied(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseAction} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>

      <span className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white w-full max-w-[600px] min-w-[500px] p-5 rounded-xl shadow-[7px_9px_14px_0] shadow-[#000]/[0.25]">
          <p className="font-medium mb-4 text-lg">Share link via</p>

          <div className="flex justify-center space-x-4 mb-4">
            <TwitterShareButton title="Perceive Now" hashtags={[""]} url={url}>
              <img src={TwitterIcon} alt="share on twitter" className="w-7 h-7 cursor-pointer" />
            </TwitterShareButton>

            <FacebookShareButton quote="Check it out in Perceive now." url={url}>
              <img src={FacebookIcon} alt="share on facebook" className="w-7 h-7 cursor-pointer" />
            </FacebookShareButton>

            <LinkedinShareButton
              url={url}
              title="Perceive Now"
              summary="Check it out in Perceive now."
            >
              <img src={LinkedInIcon} alt="share on linkedin" className="w-7 h-7 cursor-pointer" />
            </LinkedinShareButton>
          </div>

          <p className="mt-4 font-medium">Or copy link</p>

          <div className="mt-1 border w-full py-1 px-2 pl-0 rounded flex justify-between items-center bg-appGray-100 gap-1">
            <div className="flex-auto truncate">
            <input value={url} className="px-1 mr-1  outline-none w-full bg-transparent border-none" readOnly />
            </div>
            <button
              className="bg-primary-900 text-white cursor-pointer py-[4px] px-2 rounded hover:bg-primary-900 flex-[0_0_100px]"
              onClick={handleCopyLinkToClipBoard}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="text-appGray-600 text-lg mb-1 flex justify-end absolute right-[22px] top-[30px]">
            <CrossIcon width={"20px"} className="cursor-pointer" onClick={handleCloseAction} />
          </div>
        </Dialog.Panel>
      </span>
    </Dialog>
  );
}

interface ICitationModalProps {
  open: boolean;
  path: string;
  handleClose: () => void;
}

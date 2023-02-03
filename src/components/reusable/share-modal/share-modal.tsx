import { useState } from "react";
import { Dialog } from "@headlessui/react";

//
import { CrossIcon } from "../../icons";
import FacebookIcon from "../../../assets/images/Facebook.svg";
import LinkedInIcon from "../../../assets/images/LinkedIn.svg";
import TwitterIcon from "../../../assets/images/Twitter.svg";
import { FacebookShareButton, FacebookShareCount } from "react-share";

//
export default function ShareModal({ open, handleClose, link }: ICitationModalProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyLinkToClipBoard = () => {
    navigator.clipboard.writeText(link).then(
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
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <p className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <span className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white w-100 max-w-[600px] min-w-[500px] p-5 rounded-lg">
          <p>
            <p className="font-medium">Share</p>
            <p className="flex">
              <p className="cursor-pointer mr-1">
                <img src={TwitterIcon} alt="share in twitter" />
              </p>

              <FacebookShareButton url={link}>
                <p className="cursor-pointer mr-1">
                  <img src={FacebookIcon} alt="share in facebook" />
                </p>
              </FacebookShareButton>

              <p className="cursor-pointer mr-1">
                <img src={LinkedInIcon} alt="share in linkedin" />
              </p>
            </p>

            <p className="mt-4">Or copy link</p>

            <p className="mt-1 border w-full py-1 px-2 pl-0 rounded flex">
              <input value={link} className="px-1 mr-1 flex-1" readOnly />
              <button
                className="bg-gray-200 cursor-pointer py-[4px] px-[20px] rounded hover:bg-gray-300"
                onClick={handleCopyLinkToClipBoard}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </p>
          </p>

          <p className="text-primary-600 text-lg mb-1 flex justify-end absolute right-[22px] top-[30px]">
            <CrossIcon width={"20px"} className="cursor-pointer" onClick={handleCloseAction} />
          </p>
        </Dialog.Panel>
      </span>
    </Dialog>
  );
}

interface ICitationModalProps {
  open: boolean;
  link: string;
  handleClose: () => void;
}

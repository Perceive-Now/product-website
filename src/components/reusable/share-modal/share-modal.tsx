import { Dialog } from "@headlessui/react";

//
import { CrossIcon } from "../../icons";

//
export default function ShareModal({ open, handleClose, link }: ICitationModalProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <span className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white w-100 max-w-[600px] p-5 rounded-lg">
            <div>
              <div>Share</div>
              <div></div>

              <div>Or copy link</div>

              <div>
                <input value={link} />
                <button>Copy</button>
              </div>
            </div>

            <div className="text-primary-600 text-lg mb-1 flex justify-end absolute right-[22px] top-[30px]">
              <CrossIcon width={"20px"} className="cursor-pointer" onClick={handleClose} />
            </div>
          </Dialog.Panel>
        </span>
      </Dialog>
    </div>
  );
}

interface ICitationModalProps {
  open: boolean;
  link: string;
  handleClose: () => void;
}

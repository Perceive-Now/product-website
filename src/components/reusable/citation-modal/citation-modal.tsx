import { useState } from "react";
import { Dialog } from "@headlessui/react";

//
import Button from "../button";
import { CrossIcon } from "../../icons";
import dayjs from "dayjs";

//
export default function CitationModal({ author, title, date, publisher }: ICitationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyCitation = () => {
    const citationText = `
      ${author ? `Inventor name: ${author};` : ""}
      ${title ? `title: ${title};` : ""}
      ${publisher ? `Journal Name: ${publisher};` : ""}
      ${date ? `date: ${dayjs(date).format("MMMM DD, YYYY")};` : ""}
    `;
    navigator.clipboard.writeText(citationText).then(
      () => {
        /* Success - clipboard success */
      },
      () => {
        /* Rejected - clipboard failed */
      },
    );
  };

  return (
    <p>
      <span className="underline cursor-pointer" onClick={() => setIsOpen(true)}>
        Generate Citation
      </span>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <span className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white w-100 max-w-[600px] p-5 rounded-lg">
            <div>
              <Dialog.Description className="max-h-[333px]">
                {author && (
                  <div className="grid grid-cols-12 gap-x-2 mb-2">
                    <p className="col-span-4 font-bold text-right">Author name:</p>
                    <p className="col-span-8">{author}</p>
                  </div>
                )}

                {title && (
                  <div className="grid grid-cols-12 gap-x-2 mb-2">
                    <p className="col-span-4 font-bold text-right">Title name:</p>
                    <p className="col-span-8">{title}</p>
                  </div>
                )}

                {publisher && (
                  <div className="grid grid-cols-12 gap-x-2 mb-2">
                    <p className="col-span-4 font-bold text-right">Journal name:</p>
                    <p className="col-span-8">{publisher}</p>
                  </div>
                )}

                {date && (
                  <div className="grid grid-cols-12 gap-x-2 mb-2">
                    <p className="col-span-4 font-bold text-right">Date:</p>
                    <p className="col-span-8">{dayjs(date).format("MMMM DD, YYYY")}</p>
                  </div>
                )}
              </Dialog.Description>

              <div className="flex justify-center mt-3">
                <Button handleClick={handleCopyCitation} type={"secondary"} classname="text-center">
                  Copy citation
                </Button>
              </div>
            </div>

            <div className="text-primary-600 text-lg mb-1 flex justify-end absolute right-[22px] top-[30px]">
              <CrossIcon
                width={"20px"}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </Dialog.Panel>
        </span>
      </Dialog>
    </p>
  );
}

interface ICitationModalProps {
  author?: string;
  publisher?: string;
  date?: string;
  title?: string;
}

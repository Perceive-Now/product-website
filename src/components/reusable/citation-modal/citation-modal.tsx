import { useState } from "react";
import { Dialog } from "@headlessui/react";

//
import Button from "../button";
import { CrossIcon } from "../../icons";

//
export default function CitationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewSource = () => {
    // console.log("copy");
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
                <div className="grid grid-cols-12 gap-x-2 mb-2">
                  <p className="col-span-4 font-bold text-right">Expert name:</p>
                  <p className="col-span-8">Riccardo Privolizzi</p>
                </div>

                <div className="grid grid-cols-12 gap-x-2 mb-2">
                  <p className="col-span-4 font-bold text-right">Title name:</p>
                  <p className="col-span-8">
                    Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device)
                    for COVID-19 diagnosis in primary healthcare centres
                  </p>
                </div>

                <div className="grid grid-cols-12 gap-x-2 mb-2">
                  <p className="col-span-4 font-bold text-right">Journal name:</p>
                  <p className="col-span-8">Sci-Transl Medicine</p>
                </div>

                <div className="grid grid-cols-12 gap-x-2 mb-2">
                  <p className="col-span-4 font-bold text-right">Date:</p>
                  <p className="col-span-8">November 27, 2019</p>
                </div>
              </Dialog.Description>

              <div className="flex justify-center mt-3">
                <Button handleClick={handleViewSource} type="secondary" classname="text-center">
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

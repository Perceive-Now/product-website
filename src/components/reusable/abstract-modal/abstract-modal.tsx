import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

//
import Button from "../button";
import { CrossIcon } from "../../icons";

//
export default function AbstractModal(props: IAbstractModalProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleViewSource = () => {
    if (props.viewPath) {
      navigate(props.viewPath);
    }
  };

  return (
    <p>
      <span className="underline cursor-pointer" onClick={() => setIsOpen(true)}>
        View Abstract
      </span>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <span className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-[600px] p-5 rounded-2xl">
            <Dialog.Title className="text-primary-600 text-lg mb-1 flex justify-between">
              <span className="">{props.data.title}</span>

              <CrossIcon
                width={"70px"}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </Dialog.Title>

            <span className="mb-1">
              <span className="text-appGray-900 font-bold text-lg">{props.type} number:</span>
              <span className="text-lg ml-1">[{props.data.id}]</span>
            </span>

            <Dialog.Description className="mt-2 pr-2 max-h-[333px] overflow-auto scroll-smooth">
              {props.data.abstract || (
                <span className="text-appGray-800 pt-2 block">No abstract available</span>
              )}
            </Dialog.Description>

            <Button
              handleClick={handleViewSource}
              type="secondary"
              classname="w-full text-center mt-3"
            >
              View {props.type}
            </Button>
          </Dialog.Panel>
        </span>
      </Dialog>
    </p>
  );
}

//
interface IAbstractModalData {
  title: string;
  abstract?: string;
  id: string;
}

interface IAbstractModalProps {
  data: IAbstractModalData;
  viewPath?: string;
  type?: "Patent" | "Publication";
}

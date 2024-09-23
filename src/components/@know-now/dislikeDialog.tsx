import React from "react";
import { CrossIcon } from "../icons";
interface DislikeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value:boolean,reason: string) => void;
  onOpenFeedbackModal: () => void;
  id:string
}

const DislikeDialog: React.FC<DislikeDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onOpenFeedbackModal,
  id
}) => {
  if (!isOpen) return null;

  const predefinedReasons = [
    "Information was incorrect",
    "Shouldn't have used Memory",
    "Don't like the style",
    "Not factually correct",
  ];

  const handleReasonClick = (reason: string) => {
    onSubmit(false,reason);
    onClose();
  };

  return (
    <div id={id} className="relative bg-custom-violet border-2 rounded-lg p-1 pl-2 pb-2 max-w-full mt-3">
      <h1 className="text-md font-semibold mb-1 text-black">Tell us more:</h1>
      <button className="absolute top-2 right-2" onClick={onClose}>
        <CrossIcon width="20" />
      </button>
      <div className="flex flex-wrap gap-2">
        {predefinedReasons.map((reason) => (
          <button
            key={reason}
            className="border-2 p-1 hover:bg-primary-800 hover:text-white transition-colors text-sm rounded-md"
            onClick={() => handleReasonClick(reason)}
          >
            {reason}
          </button>
        ))}
        <button
          onClick={() => onOpenFeedbackModal()}
          className="border-2 p-1 hover:bg-primary-800 hover:text-white transition-colors text-sm rounded-md"
        >
          More...
        </button>
      </div>
    </div>
  );
};

export default DislikeDialog;

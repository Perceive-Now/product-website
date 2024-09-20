import React, { useState } from "react";
import { CrossIcon } from "../icons";
import Button from "../reusable/button";
  interface AdditionalFeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: boolean,feedback: string) => void;
    onCloseDialog: () => void;
  }
  const FeedbackModal: React.FC<AdditionalFeedbackModalProps> = ({ isOpen, onClose, onSubmit , onCloseDialog}) => {
  const [customReason, setCustomReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const predefinedReasons = [
    "Information was incorrect",
    "Shouldn't have used Memory",
    "Don't like the style",
    "Not factually correct",
    "Didn't fully follow instructions",
    "Unsafe or problematic",
    "Being Lazy"
  ];

  const handleReasonClick = (reason:string) => {
    setSelectedReason(reason);
    setCustomReason("");
  };

  const handleOtherClick = () => {
    setSelectedReason("Other");
  };

  const handleSubmit = () => {
    const feedback = selectedReason === "Other" ? customReason : selectedReason;
    if (feedback) {
      onSubmit(false,feedback);
      onClose();
      onCloseDialog();
      setCustomReason("");
      setSelectedReason("");
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <CrossIcon width="20" />
        </button>
        <h2 className="text-md font-semibold mb-1">Additional Feedback:</h2>
        <div className="flex flex-wrap gap-2">
          {predefinedReasons.map((reason) => (
            <button
              key={reason}
              className={`border-2 p-1 transition-colors text-sm rounded-md ${
                selectedReason === reason ? "bg-primary-800 text-white" : ""
              }`}
              onClick={() => handleReasonClick(reason)}
            >
              {reason}
            </button>
          ))}
          <button
            className={`border-2 p-1 transition-colors text-sm rounded-md ${
              selectedReason === "Other" ? "bg-primary-800 text-white" : ""
            }`}
            onClick={handleOtherClick}
          >
            Other
          </button>
        </div>
        {selectedReason === "Other" && (
          <textarea
            className="border-2 p-2 rounded-md w-full mt-2"
            placeholder="Feel free to add specific details"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
        <div className="mt-2 flex justify-end">
            <Button handleClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

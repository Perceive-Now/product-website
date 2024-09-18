import { Dialog } from "@headlessui/react";
import { CrossIcon } from "../icons";
import Button from "../reusable/button";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: (id: number) => void;
  conversation_id: number;
}

export default function DeleteConfirmationModal({
  open,
  handleClose,
  handleDelete,
  conversation_id,
}: DeleteModalProps) {
  const handleCloseAction = () => {
    handleClose();
  };

  const handleDeleteAction = () => {
    handleDelete(conversation_id);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseAction} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white w-full max-w-[400px] min-w-[400px] p-5 rounded-xl shadow-[7px_9px_14px_0] shadow-[#000]/[0.25]">
          <p className="text-lg font-bold mb-4">Delete Chat?</p>
          <p>This action will permanently delete the chat.</p>
          <div className="flex gap-2 mt-4">
            <Button type="gray" handleClick={handleCloseAction}>
              Cancel
            </Button>
            <Button type="danger" handleClick={handleDeleteAction}>
              Delete
            </Button>
          </div>
          <button
            type="button"
            className="absolute top-4 right-4 text-appGray-600"
            aria-label="Close"
            onClick={handleCloseAction}
          >
            <CrossIcon width="20px" />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

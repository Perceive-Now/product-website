import { useState } from "react";
import { ActionButton } from "../../@product/publicationItem/publicationItem";
import { ShareIcon } from "../../icons";

//
import ShareModal from "../share-modal";

/**
 *
 */
export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const path = `${window.location.pathname}${window.location.search}`;

  const handleShow = () => {
    setIsOpen(true);
  };

  const handleHide = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ActionButton className="mb-3" handleClick={handleShow}>
        <ShareIcon className="mr-1 flex-shrink-0" />
        <span>Share</span>
      </ActionButton>

      <ShareModal open={isOpen} handleClose={handleHide} path={path} />
    </>
  );
}

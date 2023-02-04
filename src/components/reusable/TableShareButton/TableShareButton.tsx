import { useState } from "react";

//
import Button from "../button";
import ShareModal from "../share-modal";

/**
 *
 */
export default function TableShareButton({ path }: ITableShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleShow = () => {
    setIsOpen(true);
  };

  const handleHide = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button type="secondary" size="small" handleClick={handleShow}>
        Share
      </Button>

      <ShareModal open={isOpen} handleClose={handleHide} path={path} />
    </>
  );
}

interface ITableShareButtonProps {
  path: string;
}

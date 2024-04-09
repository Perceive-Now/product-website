import ThumbsUpIcon from "../icons/common/ThumbsUp";
import ThumbsDownIcon from "../icons/common/ThumbsDown";
import { ShareIcon } from "../icons";
import CopyIcon from "../icons/common/copy";

import PN from "../../assets/images/pn.svg";
import IconButton from "../reusable/icon-button";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface Props {
  answer: string;
}

const QueryAnswer = ({ answer }: Props) => {
  const copyRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, []);

  const copyText = () => {
    // Get the text content of the button
    const buttonText = copyRef.current.textContent;

    // Copy the text to the clipboard
    navigator.clipboard.writeText(buttonText);
    setIsCopied(true);
    // .then(() => {
    //   console.log('Text copied to clipboard:', buttonText);
    //   // Optionally, you can show a success message or perform any other action
    // })
    // .catch((error) => {
    //   console.error('Failed to copy text to clipboard:', error);
    //   // Handle error if copying fails
    // });
  };
  return (
    <div className="flex items-start gap-3">
      <div className="p-1 shrink-0">
        <img className="h-full w-full" src={PN} alt={"Pn"} />
      </div>
      <div>
        <p ref={copyRef} className="text-secondary-800">
          {answer}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <div className="flex items-center gap-2">
            <IconButton color="default">
              <ThumbsUpIcon />
            </IconButton>
            <IconButton color="default">
              <ThumbsDownIcon />
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <IconButton color="default">
              <ShareIcon />
            </IconButton>
            <IconButton onClick={copyText} color="default">
              <CopyIcon className={classNames(isCopied ? "text-black" : "text-[#87888C]")} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryAnswer;

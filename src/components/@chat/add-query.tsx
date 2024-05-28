import SentIcon from "../icons/common/send";
//
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { LoaderIcon } from "react-hot-toast";

interface Props {
  sendQuery: () => void;
  setQuery: (query: string) => void;
  isLoading: boolean;
  query: string;
}

const AddQuery = ({ isLoading, query, sendQuery, setQuery }: Props) => {
  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to auto so the scrollHeight is calculated correctly
      textareaRef.current.style.height = "auto";
      // Set the height to the scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  return (
    <div className="relative flex border border-primary-50 rounded-lg items-center overflow-hidden pl-2 py-1 bg-white">
      <textarea
        rows={1}
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classNames(
          "appearance-none w-full h-full border-none rounded-md placeholder:text-gray-400 pn_scroller focus:border-none focus-visible:border-none focus:outline-none focus:ring-0 pr-6 max-h-[60px]",
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of Enter key
            sendQuery();
          }
        }}
        placeholder="Start your query here"
        disabled={isLoading}
      />
      <div className="absolute right-2">
        <button
          className="bg-appGray-200 rounded-full h-4 w-4 flex items-center justify-center disabled:cursor-not-allowed"
          type="button"
          onClick={sendQuery}
          disabled={isLoading || !query}
        >
          {isLoading ? <LoaderIcon /> : <SentIcon className="h-2 w-2" />}
        </button>
      </div>
    </div>
  );
};

export default AddQuery;

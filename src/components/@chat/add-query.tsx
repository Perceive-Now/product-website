import classNames from "classnames";
import SentIcon from "../icons/common/send";
import { LoaderIcon } from "react-hot-toast";

interface Props {
  sendQuery: () => void;
  setQuery: (query: string) => void;
  isLoading: boolean;
  query: string;
}

const AddQuery = ({ isLoading, query, sendQuery, setQuery }: Props) => {
  return (
    <div className="relative flex border border-primary-50 rounded-lg items-center overflow-hidden pl-2 min-h-[60px] bg-white">
      <textarea
        rows={1}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classNames(
          "appearance-none w-full h-full bg-blac border-none rounded-md placeholder:text-gray-400 pn_scroller focus:border-none focus-visible:border-none focus:outline-none focus:ring-0 ",
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent default behavior of Enter key
            sendQuery();
          }
        }}
        placeholder="Start your query here"
        disabled={isLoading}
      />
      <div className="absolute right-2">
        <button
          className="bg-appGray-200 rounded-full h-4 w-4 flex items-center justify-center"
          type="button"
          onClick={sendQuery}
          disabled={isLoading}
        >
          {isLoading ? <LoaderIcon /> : <SentIcon className="h-2 w-2" />}
        </button>
      </div>
    </div>
  );
};

export default AddQuery;

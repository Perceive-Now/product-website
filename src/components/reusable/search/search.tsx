import { useState } from "react";
import classNames from "classnames";

//
import { SearchIcon } from "../../icons";

/**
 *
 */
export default function Search(props: ISearchProps) {
  const [search, setSearch] = useState(props.initialValue ?? "");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //
    props.onSubmit(search);
  };

  const inputSize = props.size ?? "small";
  const isRequired = props.required ?? false;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder={props.placeholder ?? "Search keywords"}
          className={classNames(
            "pl-3 pr-7 border border-gray-300 rounded-lg w-full",
            "focus:outline-none focus:border-primary-500",
            inputSize === "small" ? "py-1" : "py-2",
            props.className
          )}
          required={isRequired}
        />

        <div className="absolute top-0 right-0 h-full">
          <div className="flex h-full items-center mr-3 ml-2">
            <SearchIcon className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* This won't be shown in the rendered HTML */}
      <button type="submit" className="hidden w-0 h-0">
        Submit
      </button>
    </form>
  );
}

interface ISearchProps {
  required?: boolean;
  className?: string;
  placeholder?: string;
  initialValue?: string;
  size?: "small" | "large";
  onSubmit: (value: string) => void;
}

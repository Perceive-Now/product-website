import { useState } from "react";
import classNames from "classnames";
import AsyncCreateableSelect from "react-select/async-creatable";

//
import { SearchIcon } from "../../icons";

//
import "./search.css";

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

  const filterOptionGroup = (inputValue: string): IFilterOptionGroup[] | [] => {
    // filter the options with respect to inputValue
    // sort the options in ascending order
    // create group object
    // loop through the remaining options
    //// get 1st character of option,
    //// convert to uppercase
    //// compair with Alphabet regex
    //// if alphabet group[key] = [...(group[key] || []), {label: option, value: option}]
    //// else group["#123"] =  [...(group["#123"] || []), {label: option, value: option}]
    // group ={"#123": [], "A":["Apple","Ant"],...}
    // Object.entries(group) create [{label: "#123", options: options},...]

    let filteredKeywords = response.data.filter((keyword) =>
      keyword.toLowerCase().includes(inputValue.toLowerCase())
    );

    let sortedFilteredKeywords = filteredKeywords.sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
    );

    let groupedOptions: IGroupOptions = {};

    sortedFilteredKeywords.forEach((keyword: string) => {
      let firstCharacter = keyword[0];

      if (/^[A-Za-z]$/.test(firstCharacter)) {
        firstCharacter = firstCharacter.toUpperCase();
        groupedOptions[firstCharacter] = [
          ...(groupedOptions[firstCharacter] || []),
          { label: keyword, value: keyword },
        ];
      } else {
        groupedOptions["#123"] = [
          ...(groupedOptions["#123"] || []),
          { label: keyword, value: keyword },
        ];
      }
    });

    return Object.entries(groupedOptions).map(
      (group: [string, IKeywordOption[]]) => {
        let [label, options] = group;
        return { label: label, options: options };
      }
    );
  };
  const fetchOptions = (inputValue: string) => {
    try {
      // add fetch api here
      return new Promise<IFilterOptionGroup[] | []>((resolve) => {
        setTimeout(() => {
          resolve(filterOptionGroup(inputValue));
        }, 10);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const formatGroupLabel = (data: any) => (
    <div>
      <span>{data.label}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <AsyncCreateableSelect
          cacheOptions
          loadOptions={fetchOptions}
          formatCreateLabel={(inputValue: string) => inputValue}
          defaultMenuIsOpen={false}
          isMulti
          // isOptionDisabled={() => selectedOptions.length >= 3}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            LoadingIndicator: () => null,
            ClearIndicator: () => null,
          }}
          formatGroupLabel={formatGroupLabel}
          noOptionsMessage={() => "Type any keyword"}
          className={classNames(props.className)}
          classNamePrefix="custom_search"
          placeholder={props.placeholder ?? "Search keywords"}
        />

        <div
          className="absolute top-0 right-0 h-full cursor-pointer"
          onClick={handleSubmit}
        >
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

// remove once api is received
interface IGroupOptions {
  [key: string]: IKeywordOption[];
}

interface IKeywordOption {
  value: string;
  label: string;
}

interface IFilterOptionGroup {
  label: string;
  options: IKeywordOption[];
}

export const response = {
  data: [
    "COVID-19",
    "diagnosis",
    "public health",
    "virtual reality",
    "pathology",
    "asymptomatic contact",
    "minimally invasive surgery",
    "pneumonia",
    "artificial intelligence",
    "SARS-COV 2",
    "haptic open glove",
    "human computer interaction",
    "RT-PCR",
    "multibody dynamics",
    "Vaccines",
    "therapeutics",
    "antibody tests",
  ],
};

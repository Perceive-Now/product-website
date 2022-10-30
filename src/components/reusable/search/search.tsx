import { useEffect, useState } from "react";
import classNames from "classnames";
import AsyncCreateableSelect from "react-select/async-creatable";
import { ActionMeta, MultiValue } from "react-select";

//
import { SearchIcon } from "../../icons";

//
import "./search.css";

const MAX_KEYWORD = 1;

/**
 *
 */
export default function Search(props: ISearchProps) {
  // const inputSize = props.size ?? "small";
  // const isRequired = props.required ?? false;

  const [selectedKeywords, setSelectedKeywords] = useState(
    props.initialValue ?? null
  );

  //
  useEffect(() => {
    if (props.initialValue) {
      setSelectedKeywords(props.initialValue);
    }
  }, [props.initialValue]);

  const hasKeywordReachedMaxLimit = Boolean(
    (selectedKeywords?.length || 0) >= MAX_KEYWORD
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedKeywords) {
      props.onSubmit(selectedKeywords);
    }
  };

  const generateOptionsGroup = (
    filteredKeywords: string[]
  ): IFilterOptionGroup[] | [] => {
    let sortedFilteredKeywords = filteredKeywords.sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
    );

    let groupedOptions: IGroupOptions = {};

    sortedFilteredKeywords.forEach((keyword: string) => {
      let firstCharacter = keyword[0];
      let isFirstCharacterAlphabet = /^[A-Za-z]$/.test(firstCharacter);

      if (isFirstCharacterAlphabet) {
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
      const fetchKeywords = () => {
        // add fetch api here
        return new Promise<IFilterOptionGroup[] | []>((resolve) => {
          setTimeout(() => {
            let filteredKeywords = response.data.filter((keyword) =>
              keyword.toLowerCase().includes(inputValue.toLowerCase())
            );
            resolve(generateOptionsGroup(filteredKeywords));
          }, 10);
        });
      };
      if (!hasKeywordReachedMaxLimit) {
        return fetchKeywords();
      } else {
        return new Promise<IFilterOptionGroup[] | []>((resolve) => {
          resolve([]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordChange = (
    newValue: MultiValue<IKeywordOption>,
    actionMeta: ActionMeta<IKeywordOption>
  ) => {
    let keywords: IKeywordOption[] = newValue.map((keyword) => {
      return {
        label: keyword.label,
        value: keyword.value || "",
      };
    });
    setSelectedKeywords(keywords);
    if (props.onKeywordsChange) {
      props.onKeywordsChange(keywords);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <AsyncCreateableSelect
          loadOptions={fetchOptions}
          formatCreateLabel={(inputValue: string) => inputValue}
          isMulti
          isOptionDisabled={() => hasKeywordReachedMaxLimit}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            LoadingIndicator: () => null,
            ClearIndicator: () => null,
          }}
          formatGroupLabel={formatGroupLabel}
          noOptionsMessage={() =>
            hasKeywordReachedMaxLimit
              ? `Max keyword limit selected, press enter to search`
              : "Type any keyword and press enter"
          }
          className={classNames(props.className)}
          classNamePrefix="custom_search"
          placeholder={props.placeholder ?? "Search keywords"}
          value={selectedKeywords}
          onChange={handleKeywordChange}
        />

        <div
          className="absolute top-0 right-0 h-full cursor-pointer"
          onClick={handleSubmit}
        >
          <div className="flex h-full items-center mx-2">
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
  initialValue?: IKeywordOption[];
  size?: "small" | "large";
  onSubmit: (value: IKeywordOption[]) => void;
  onKeywordsChange?: (value: IKeywordOption[]) => void;
}

// remove once api is received
interface IGroupOptions {
  [key: string]: IKeywordOption[];
}

export interface IKeywordOption {
  value: string;
  label: string;
}

interface IFilterOptionGroup {
  label: string;
  options: IKeywordOption[];
  value?: string;
}

export const response = {
  data: [
    "COVID19",
    "diagnosis",
    "public health",
    "virtual reality",
    "pathology",
    "asymptomatic contact",
    "minimally invasive surgery",
    "pneumonia",
    "artificial intelligence",
    "SARSCOV 2",
    "haptic open glove",
    "human computer interaction",
    "RTPCR",
    "multibody dynamics",
    "Vaccines",
    "therapeutics",
    "antibody tests",
  ],
};

const formatGroupLabel = (data: any) => (
  <div>
    <span>{data.label}</span>
  </div>
);

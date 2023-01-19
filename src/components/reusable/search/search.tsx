import classNames from "classnames";
import { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import AsyncCreateableSelect from "react-select/async-creatable";

//
import { SearchIcon } from "../../icons";

//
import "./search.css";

const MAX_KEYWORD = 3;

/**
 *
 */
export default function Search(props: ISearchProps) {
  // const inputSize = props.size ?? "small";
  // const isRequired = props.required ?? false;

  const [selectedKeywords, setSelectedKeywords] = useState(props.initialValue ?? null);

  //
  useEffect(() => {
    if (props.initialValue) {
      setSelectedKeywords(props.initialValue);
    }
  }, [props.initialValue]);

  const hasKeywordReachedMaxLimit = !!((selectedKeywords?.length || 0) >= MAX_KEYWORD);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedKeywords) {
      props.onSubmit(selectedKeywords);
    }
  };

  const generateOptionsGroup = (filteredKeywords: string[]): IFilterOptionGroup[] | [] => {
    const sortedFilteredKeywords = filteredKeywords.sort((a, b) =>
      a?.toLowerCase() < b?.toLowerCase() ? -1 : 1,
    );

    const groupedOptions: IGroupOptions = {};

    sortedFilteredKeywords.forEach((keyword: string) => {
      let firstCharacter = keyword[0];
      const isFirstCharacterAlphabet = /^[A-Za-z]$/.test(firstCharacter);

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

    return Object.entries(groupedOptions).map((group: [string, IKeywordOption[]]) => {
      const [label, options] = group;
      return { label: label, options: options };
    });
  };

  const fetchOptions = async (inputValue: string) => {
    if (hasKeywordReachedMaxLimit) return [];

    const filteredKeywords = response.data.filter((keyword) =>
      keyword?.toLowerCase().includes(inputValue?.toLowerCase()),
    );

    return generateOptionsGroup(filteredKeywords);
  };

  const handleKeywordChange = (newValue: MultiValue<IKeywordOption>) => {
    const keywords: IKeywordOption[] = newValue.map((keyword) => {
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
          {...(selectedKeywords?.length
            ? {
                isValidNewOption: (inputValue: string) => {
                  return !!inputValue.length && !hasKeywordReachedMaxLimit;
                },
              }
            : undefined)}
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

        <div className="absolute top-0 right-0 h-full cursor-pointer" onClick={handleSubmit}>
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
    "Gene Therapy",
    "COVID-19",
    "Artificial Intelligence",
    "Augmented reality",
    "Greenwashing",
    "Acoustics",
    "Diversity and Inclusion",
    "Big data",
    "Social Impact",
    "Cancer biology",
    "Global warming",
    "Fluid mechanics",
    "Guided missiles",
    "Ground defense",
    "Decarbonization",
    "Cryptocurrency",
    "Ceramics",
    "Alloys",
    "Heat transfer",
    "Thermodynamics",
    "Clean energy",
    "Fermentation",
    "Polymers",
    "Wireless infrastructure",
    "Titanium economy",
    "M Commerce",
    "Genome",
    "Genetics",
    "Chromosomes",
    "Python",
    "Cyber Security",
    "IOT",
    "Internet",
    "Maths",
    "Calculus",
    "Motor",
    "Computer",
    "Computer Science",
    "Environment",
    "Economics",
    "Digital Media",
    "Sentiment analysis",
    "Google",
    "Facebook",
    "fitness",
    "Ageing",
    "Mutations",
    "cell",
    "Myositis",
    "Dialysis",
  ],
};

const formatGroupLabel = (data: any) => (
  <div>
    <span>{data.label}</span>
  </div>
);

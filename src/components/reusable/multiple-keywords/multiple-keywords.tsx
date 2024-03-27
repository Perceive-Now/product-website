import classNames from "classnames";
import { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import AsyncCreateableSelect from "react-select/async-creatable";

//

//
import "../search/search.css";

const MAX_KEYWORD = 3;

/**
 *
 */
export default function MultiKeywords(props: ISearchProps) {
  // const inputSize = props.size ?? "small";
  // const isRequired = props.required ?? false;
  const [selectedKeywords, setSelectedKeywords] = useState(props.initialValue ?? null);

  //
  useEffect(() => {
    if (props.initialValue?.length) {
      setSelectedKeywords(props.initialValue);
    }
    props.changeKeyword(selectedKeywords);
  }, [props, selectedKeywords]);

  const hasKeywordReachedMaxLimit = !!((selectedKeywords?.length || 0) >= MAX_KEYWORD);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (selectedKeywords) {
  //     props.onSubmit(selectI have integrate the APIs, edKeywords);
  //   }
  // };

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
    props.changeKeyword(keywords.map((k) => k.value));
  };

  return (
    <AsyncCreateableSelect
      isDisabled={props?.isDisabled}
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
      placeholder={props.placeholder ?? "Enter keywords"}
      value={selectedKeywords}
      onChange={handleKeywordChange}
    />
  );
}

interface ISearchProps {
  required?: boolean;
  className?: string;
  placeholder?: string;
  initialValue?: IKeywordOption[];
  size?: "small" | "large";
  onSubmit?: (value: IKeywordOption[]) => void;
  onKeywordsChange?: (value: IKeywordOption[]) => void;
  isDisabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeKeyword: Function;
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
  data: ["Omni"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatGroupLabel = (data: any) => (
  <div>
    <span>{data.label}</span>
  </div>
);

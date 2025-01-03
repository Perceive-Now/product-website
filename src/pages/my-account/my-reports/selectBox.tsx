import React, { useState } from 'react';

interface SelectBoxProps {
  options: string[];
  onChangeValue: (value: string | string[]) => void;
  multiple?: boolean; // New prop to allow multiple selections
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChangeValue, multiple = false }) => {
  const [selectedValue, setSelectedValue] = useState<string | string[] | null>(multiple ? [] : null);

  const handleSelect = (value: string) => {
    if (multiple) {
      // If the value is already selected, remove it; otherwise, add it
      const updatedSelectedValues = selectedValue instanceof Array ? [...selectedValue] : [];
      const index = updatedSelectedValues.indexOf(value);

      if (index > -1) {
        updatedSelectedValues.splice(index, 1); // Remove value
      } else {
        updatedSelectedValues.push(value); // Add value
      }

      setSelectedValue(updatedSelectedValues);
      onChangeValue(updatedSelectedValues);
    } else {
      setSelectedValue(value);
      onChangeValue(value);
    }
  };

  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => {
        const mainText = option.split(' (')[0];
        const bracketText = option.split(' (')[1]?.slice(0, -1);
        const isFirstItem = index === 0;
        const isLastItem = index === options.length - 1;

        const isSelected = multiple
          ? selectedValue instanceof Array && selectedValue.includes(option)
          : selectedValue === option;

        return (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            className={`
              cursor-pointer
              py-1 px-2
              m-0
              max-w-[210px]
              font-nunito
              border-appGray-600
              ${isSelected ? 'bg-primary-800 text-white' : 'bg-transparent text-secondary-800'}
              ${isFirstItem ? 'rounded-l-md border' : ''}
              ${isLastItem ? 'rounded-r-md border-t border-r border-b' : ''}
              ${!(isFirstItem || isLastItem) ? 'border-r border-t border-b' : ''}
              hover:bg-primary-800 hover:text-white hover:border-primary-800
            `}
          >
            <div className="flex items-center justify-center text-base">{mainText}</div>
            {bracketText && <div className="flex items-center justify-center text-xs">({bracketText})</div>}
          </div>
        );
      })}
    </div>
  );
};

export default SelectBox;

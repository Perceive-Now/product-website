import React, { useState } from 'react';

interface SelectBoxProps {
  options: string[];
  onChangeValue: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChangeValue }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChangeValue(value);
  };

  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => {
        const mainText = option.split(' (')[0]; 
        const bracketText = option.split(' (')[1]?.slice(0, -1);
        const isFirstItem = index === 0;
        const isLastItem = index === options.length - 1;
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
              ${selectedValue === option ? 'bg-primary-800 text-white' : 'bg-transparent text-secondary-800'}
              ${isFirstItem ? 'rounded-l-md border' : ''}
              ${isLastItem ? 'rounded-r-md border-t border-r border-b' : ''}
               ${!(isFirstItem || isLastItem ) ? 'border-r border-t border-b' : ''} 
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

import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "src/components/icons";

interface Option {
  label: string;
  value: string;
  showTextBox: boolean;
  desc?: string;
}

interface CheckboxGroupProps {
  options: Option[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  customInput: Record<string, Record<string, string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string, key: string) => void;
  optionKey: string;
}

export const MultiSelectDropdown = (props: CheckboxGroupProps) => {
  const { options, selectedOptions, onChange, customInput, onInputChange, optionKey } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={classNames(
          `mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent 
        flex items-center justify-between border border-neutral-500 rounded  text-sm bg-white
          `,
          "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
        )}
      >
        <span>
          {selectedOptions.length
            ? options
                .filter((opt) => selectedOptions.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : "Select options"}
        </span>
        <ChevronDown />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-neutral-500 rounded shadow-sm p-2">
          {options.map((item) => (
            <div key={item.value} className="mb-1">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value={item.value}
                  checked={selectedOptions.includes(item.value)}
                  onChange={() => handleOptionChange(item.value)}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-secondary-800">{item.label}</span>
                  {item.desc && <span className="text-xs text-secondary-600">{item.desc}</span>}
                </div>
              </label>

              {selectedOptions.includes(item.value) && item.showTextBox && (
                <input
                  type="text"
                  placeholder={`Enter custom text for ${item.label}`}
                  value={customInput?.[optionKey]?.[item.value] || ""}
                  onChange={(e) => onInputChange(e, item.value, optionKey)}
                  className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent mt-1 w-full text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

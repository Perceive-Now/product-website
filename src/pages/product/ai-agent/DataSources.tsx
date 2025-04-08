import React, { useState, useEffect } from "react";
import LayoutIcon from "src/components/icons/miscs/layout";
import AddIcon from "src/components/icons/common/add-icon";
import { useAppSelector, useAppDispatch } from "src/hooks/redux";
import TrashIconTwo from "src/assets/images/TrashTwo.svg";
import BookIcon from "src/assets/images/book.svg";
import SwitchIcon from "src/assets/images/switch.svg";
import { updatePitchdeckData } from "src/stores/vs-product";

interface Props {
  dataSource: any;
  disabled?: boolean;
}
const SourcesData: React.FC<Props> = (props) => {
  const { dataSource, disabled } = props;
  const { DataSources } = useAppSelector((state) => state.VSProduct);
  const dispatch = useAppDispatch();

  console.log("Data Sources  -----", dataSource);
  const dataSourceKeys = Object.keys(dataSource || {}).filter((key) => dataSource[key]?.length);

  const [activeTab, setActiveTab] = useState<string>(dataSourceKeys[0] || "");
  const [items, setItems] = useState<{ [key: string]: string[] }>(dataSource);
  const [newItem, setNewItem] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // setItems(DataSources);
    dispatch(updatePitchdeckData({ searchQueries: { ...items } }));
  }, [items]);

  const itemsToDisplay = items[activeTab] || [];

  const handleDelete = (item: string) => {
    setItems((prevItems) => ({
      ...prevItems,
      [activeTab]: prevItems[activeTab].filter((i) => i !== item),
    }));
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      setItems((prevItems) => ({
        ...prevItems,
        [activeTab]: [...prevItems[activeTab], newItem.trim()],
      }));
      setNewItem("");
      setIsInputVisible(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg w-full mb-[70px] overflow-y-auto ${
        open
          ? "flex-[0_0_100%] sm:flex-[0_0_75%] lg:flex-[0_0_460px] max-w-full lg:max-w-[460px]"
          : "flex-[0_0_100%] sm:flex-[0_0_215px] max-w-full sm:max-w-[215px]"
      }`}
    >
      <div
        className={`p-2 lg:p-4 ${
          open ? "w-full h-full" : "w-full h-auto"
        } bg-opacity-50 rounded-lg`}
      >
        <div className="flex">
          <div className="cursor-pointer py-1">
            <img src={BookIcon} alt="book" className="w-4" />
          </div>
          <div className="ml-2">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Data Sources</h2>
              <div onClick={() => setOpen(!open)} className="cursor-pointer rounded border border-[#DFE3E8] p-1">
                <img src={SwitchIcon} alt="book" className="w-[20px]" />
              </div>
            </div>
            {open && (
              <>
                <h4 className="mb-2 text-sm sm:text-base">
                  Customize sections to suit your needs.
                </h4>
                <p className="mb-2 text-sm sm:text-base">The data sources shown represent only 10% to 20% of those that may appear in the final report. The complete set of sources will be curated by Perceive Now’s proprietary AI agents, tailored to the specific use case, industry context, and client objectives.</p>
                <div className="text-xs sm:text-sm">
                  {dataSourceKeys.map((tab) => (
                    <button
                      key={tab}
                      className={`p-1 text-xs sm:text-sm rounded-lg ${
                        activeTab === tab ? "bg-appGray-200" : ""
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {open && (
          <div className="flex flex-col gap-y-2 h-[90%] lg:max-h-[70vh] lg:h-auto pb-2">
            <div className="h-[50vh] md:h-[70vh] pn_scroller overflow-y-auto p-2">
              {itemsToDisplay.map((item) => (
                <div
                  key={item}
                  className="flex items-center py-1 border border-gray-300 rounded-lg mb-2 p-1 gap-1 justify-between"
                >
                  <a
                    href={item}
                    className="flex-auto break-all leading-tight text-xs sm:text-sm text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item}
                  </a>
                  {disabled ? null : (
                    <button
                      className="text-red-500 flex-[0_0_20px]"
                      onClick={() => handleDelete(item)}
                    >
                      <img src={TrashIconTwo} alt="Delete" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {disabled ? null : (
              <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-1">
                {isInputVisible && (
                  <input
                    type="text"
                    className="border border-gray-300 p-1 rounded-lg flex-grow w-full text-xs sm:text-sm placeholder:text-appGray-600 focus:outline-none focus:ring-0"
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                )}
                <button
                  className={`flex items-center justify-start text-primary-900 ${
                    isInputVisible ? "hidden" : ""
                  }`}
                  onClick={() => setIsInputVisible(!isInputVisible)}
                >
                  {!isInputVisible && (
                    <>
                      <AddIcon color="#442873" size={25} />
                      <span className="text-xs sm:text-sm">Add</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesData;

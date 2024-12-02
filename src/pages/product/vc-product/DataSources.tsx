import React, { useState, useEffect } from "react";
import LayoutIcon from "src/components/icons/miscs/layout";
import AddIcon from "src/components/icons/common/add-icon";
import { useAppSelector , useAppDispatch} from "src/hooks/redux";
import TrashIconTwo from "src/assets/images/TrashTwo.svg";
import { updatePitchdeckData } from "src/stores/vs-product";
const SourcesData: React.FC = () => {
  const { DataSources } = useAppSelector((state) => state.VSProduct);
  const dispatch = useAppDispatch();

  console.log("Data Sources  -----",DataSources);
  const dataSourceKeys = Object.keys(DataSources);

  const [activeTab, setActiveTab] = useState<string>(dataSourceKeys[0] || "");
  const [items, setItems] = useState<{ [key: string]: string[] }>(DataSources);
  const [newItem, setNewItem] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // setItems(DataSources);
    dispatch(updatePitchdeckData({ searchQueries: {...items} }));
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
        open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"
      }`}
    >
      <div className={`p-4 ${open ? "w-full h-full" : "w-full h-auto"} bg-opacity-50 rounded-lg`}>
        <div className="flex">
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <LayoutIcon />
          </div>
          <div className="ml-2">
            <h2 className="text-lg font-semibold">Data Sources</h2>
            {open && (
              <>
                <h4 className="mb-4">Arrange/add sections as your need</h4>
                <div className="text-xs">
                  {dataSourceKeys.map((tab) => (
                    <button
                      key={tab}
                      className={`p-1 text-sm rounded-lg ${activeTab === tab ? "bg-appGray-200" : ""}`}
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
          <>
            <div className="max-h-[50vh] pn_scroller overflow-y-auto p-2">
              {itemsToDisplay.map((item) => (
                <div
                  key={item}
                  className="flex items-center py-1 border border-gray-300 rounded-lg mb-2 p-1 gap-1 justify-between"
                >
                  {/* <span className="flex-auto break-all leading-tight text-sm">{item}</span> */}
                  <a href={item} className="flex-auto break-all leading-tight text-sm text-blue-700" target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>

                  <button className="text-red-500 flex-[0_0_20px]" onClick={() => handleDelete(item)}>
                  <img src={TrashIconTwo} alt="Delete" className="w-2 h-2" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-1">
                {isInputVisible && (
                  <input
                    type="text"
                    className="border border-gray-300 p-1 rounded-lg flex-grow w-full text-sm placeholder:text-appGray-600 focus:outline-none focus:ring-0"
                    placeholder="Add new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                )}
                <button
                  className={`flex items-center justify-start text-primary-900 ${isInputVisible ? 'hidden' : ''}`}
                  onClick={() => setIsInputVisible(!isInputVisible)}
                >
                  {!isInputVisible && (
                    <>
                      <AddIcon color="#442873" size={25} />
                      <span className="">Add</span> 
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SourcesData;

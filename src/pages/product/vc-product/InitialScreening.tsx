import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutIcon from "src/components/icons/miscs/layout";
import TrashIcon from "src/components/icons/common/trash";
import AddIcon from "src/components/icons/common/add-icon";
import DragIcon from "src/components/icons/miscs/DragIcon";
import { useAppSelector } from "src/hooks/redux";
import Select from "react-select";

const ItemType = {
  ITEM: "item",
};

interface DraggableItemProps {
  item: string;
  index: number;
  handleDelete: (item: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, handleDelete, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType.ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover(draggedItem: { index: number }) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="flex items-center mb-2">
      <DragIcon />
      <div className="flex flex-col w-full py-1 border border-gray-300 rounded-lg p-1">
        <div className="flex items-center">
          <span className="bg-appGray-200 p-1 rounded-md mr-1 text-sm flex-[0_0_32px]">h1</span>
          <span className="flex-auto">{item}</span>
          <button className="text-red-500 ml-2 flex-[0_0_20px]" onClick={() => handleDelete(item)}>
            <TrashIcon />
          </button>
        </div>
        {/* <div className="flex justify-between m-0">
      <span><div className="bg-appGray-100 p-1 rounded-md">summary</div></span>
      <span className="ml-4 text-gray-700 text-justify">
      This is a static summary text that provides additional details.
      </span>
    </div> */}
      </div>
    </div>
  );
};

const InitialScreening: React.FC = () => {
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);

  const [activeTab, setActiveTab] = useState<"report" | "scoring">("report");
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState({ value: "h1", label: "h1" });

  const customStyles = {
    control: (provided:any) => ({
      ...provided,
      backgroundColor: '#F5F7FF',
      border: 'none', 
      boxShadow: 'none',
    }),
    menu: (provided:any) => ({
      ...provided,
      marginTop: 0, 
    }),
    option: (provided:any, { isSelected, isFocused }:any) => ({
      ...provided,
      backgroundColor: isFocused ? 'lightgray' : 'white',
      color: isSelected ? 'black' : 'black',
    }),
  };

  const options = [
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "h4", label: "h4" },
  ];

  // const [reportItems, setReportItems] = useState<string[]>([
  //   "Business Model Robustness",
  //   "Financial Forensics",
  //   "Scalability and Expansion Potential",
  //   "Risk and Contingency Planning",
  //   "Technology & Infrastructure Maturity",
  //   "Customer Lifetime Value Analysis",
  //   "Operational Scalability & Efficiency",
  //   "Market Position & Strategic Advantage",
  //   "M&A Potential and Exit Strategy",
  //   "Exit Comparables and Valuation",
  //   "Product Innovation Pipeline",
  //   "Revenue Growth Trajectory",
  //   "Customer Acquisition Strategy",
  //   "Market Penetration Strategy",
  //   "Competitive Threat Assessment",
  //   "Go-to-Market Execution Quality",
  //   "Talent Acquisition and Retention",
  //   "Strategic Vision and Leadership",
  //   "Intellectual Property Strategy",
  //   "Partnership Synergy Potential",
  //   "Data and Analytics Maturity",
  //   "Market Adaptability and Resilience",
  //   "Brand Strength and Market Perception",
  //   "Sales Cycle Efficiency",
  //   "International Expansion Readiness",
  // ]);

  const [reportItems, setReportItems] = useState<string[]>(SidescreenOptions || []);

  const [scoringItems, setScoringItems] = useState<string[]>([
    "Market Size & Growth",
    "Competitive Advantage",
    "Product Edge",
    "Team Excellence",
    "Strategic Execution",
    "Customer Momentum",
    "Revenue Scalability",
    "Operational Discipline",
  ]);

  const [newItem, setNewItem] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const itemsToDisplay = activeTab === "report" ? reportItems : scoringItems;

  const handleDelete = (item: string) => {
    if (activeTab === "report") {
      setReportItems(reportItems.filter((i) => i !== item));
    } else {
      setScoringItems(scoringItems.filter((i) => i !== item));
    }
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      if (activeTab === "report") {
        setReportItems([...reportItems, newItem.trim()]);
      } else {
        setScoringItems([...scoringItems, newItem.trim()]);
      }
      setNewItem("");
      setIsInputVisible(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = Array.from(reportItems);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setReportItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={` border border-gray-300 rounded-lg w-full mb-[70px] overflow-hidden h-[90vh] ${
          open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"
        } `}
      >
        <div className={`p-4 ${open ? "w-full h-full" : "w-full h-auto"} bg-opacity-50 rounded-lg`}>
          <div className="flex">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              <LayoutIcon />
            </div>
            <div className="ml-2">
              <h2 className="text-lg font-semibold">Initial Screening</h2>
              {open && (
                <>
                  <h4 className="mb-4">Arrange/add sections as your need</h4>
                  <div className="text-xs">
                    {/* <button
                      className={`p-1 rounded-lg ${activeTab === "report" ? "bg-appGray-200" : ""}`}
                      onClick={() => setActiveTab("report")}
                    >
                      Report Section
                    </button>
                    <button
                      className={`p-1 rounded-lg ${
                        activeTab === "scoring" ? "bg-appGray-200" : ""
                      }`}
                      onClick={() => setActiveTab("scoring")}
                    >
                      Scoring Parameters
                    </button> */}
                  </div>
                </>
              )}
            </div>
          </div>
          {open && (
            <>
              <div className="h-[90%] pn_scroller overflow-y-auto p-2">
                {activeTab === "report"
                  ? itemsToDisplay.map((item, index) => (
                      <DraggableItem
                        key={item}
                        item={item}
                        index={index}
                        handleDelete={handleDelete}
                        moveItem={moveItem}
                      />
                    ))
                  : scoringItems.map((item) => (
                      <div
                        key={item}
                        className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-2"
                      >
                        <span>
                          <span className="bg-appGray-200 p-1 rounded-md mr-1">h1</span>
                          {item}
                        </span>
                        <button className="text-red-500" onClick={() => handleDelete(item)}>
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-1 ml-4">
                  {isInputVisible && (
                    <>
                      <Select
                        value={selectedOption}
                        onChange={(option: any) => setSelectedOption(option)}
                        options={options}
                        styles={customStyles} 
                        className="basic-single mr-1 text-sm flex-[0_0_82px]"
                        classNamePrefix="select"
                        placeholder="Select an option"
                      />
                      <div className="w-full overflow-hidden flex-auto">
                      <input
                        type="text"
                        className="border border-gray-300 p-1 rounded-lg flex-auto placeholder:text-appGray-600 focus:outline-none focus:ring-0 text-sm w-full"
                        placeholder="Add new item"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      </div>
                    </>
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
    </DndProvider>
  );
};

export default InitialScreening;

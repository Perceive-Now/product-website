import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutIcon from "src/components/icons/miscs/layout";
import TrashIcon from "src/components/icons/common/trash";
import AddIcon from "src/components/icons/common/add-icon";
import DragIcon from "src/components/icons/miscs/DragIcon";
import { useAppSelector } from "src/hooks/redux";

const ItemType = {
  ITEM: "item",
};

interface DraggableItemProps {
  keyName: string;
  summary: string;
  index: number;
  handleDelete: (item: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ keyName, summary, index, handleDelete, moveItem }) => {
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
      <div className="flex flex-col w-full py-1 border border-gray-300 rounded-lg p-2">
        <div className="flex items-center mb-1">
          <span className="bg-appGray-200 p-1 rounded-md mr-1">h1</span>
          {keyName}
          <button className="text-red-500 ml-2" onClick={() => handleDelete(keyName)}>
            <TrashIcon />
          </button>
        </div>
        <div className="flex justify-between m-0">
          <span>
            <div className="bg-appGray-100 p-1 rounded-md">Summary</div>
          </span>
          <span className="ml-4 text-gray-700 text-justify">{summary}</span>
        </div>
      </div>
    </div>
  );
};

const ReportTemplate: React.FC = () => {
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);

  const [open, setOpen] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const reportData = [
    ["Market Opportunity", "Global Smart Home Energy Market", "EcoTech Innovations aims to tap into the $300 billion smart home market with a focus on clean energy, offering a solution to a growing customer base concerned with energy costs and sustainability."],
    ["Competitive Differentiation", "Unique AI-Driven Energy Optimization", "With competitors like Tesla Powerwall, Sunrun, and Vivint Solar, EcoTech sets itself apart through proprietary AI optimization and seamless integration with existing home systems."],
  ];

  const [reportItems, setReportItems] = useState(reportData);

  const handleDelete = (itemKey: string) => {
    setReportItems(reportItems.filter((item) => item[0] !== itemKey));
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      const newReportItem = [newItem.trim(), "New Description", "New Summary Text"];
      setReportItems([...reportItems, newReportItem]);
      setNewItem("");
      setIsInputVisible(false);
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
      <div className={`border border-gray-300 rounded-lg w-full mb-[70px] overflow-y-auto pn_scroller h-[90vh] ${open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"}`}>
        <div className={`p-4 ${open ? "w-full h-full" : "w-full h-auto"} bg-opacity-50 rounded-lg`}>
          <div className="flex">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              <LayoutIcon />
            </div>
            <div className="ml-2">
              <h2 className="text-lg font-semibold">Report Template</h2>
              {open && <h4 className="mb-4">Arrange/add sections as needed</h4>}
            </div>
          </div>
          {open && (
            <div className="h-52 overflow-y-auto p-2">
              {reportItems.map((item, index) => (
                <DraggableItem
                  key={item[0]}
                  keyName={item[0]} // Display first element as key
                  summary={item[2]} // Display third element as summary
                  index={index}
                  handleDelete={handleDelete}
                  moveItem={moveItem}
                />
              ))}
              <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-2 ml-4">
                {isInputVisible ? (
                  <>
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded-lg flex-grow"
                      placeholder="Add new item"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    />
                  </>
                ) : (
                  <span className="flex-grow"> </span>
                )}
                <button
                  className="flex items-center justify-start text-primary-900 ml-2"
                  onClick={() => setIsInputVisible(!isInputVisible)}
                >
                  {!isInputVisible && (
                    <>
                      <AddIcon color="#442873" size={25} />
                      <span className="ml-2">Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default ReportTemplate;

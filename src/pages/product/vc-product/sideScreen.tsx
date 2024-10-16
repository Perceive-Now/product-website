import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutIcon from "src/components/icons/miscs/layout";
import TrashIcon from "src/components/icons/common/trash";
import AddIcon from "src/components/icons/common/add-icon";
import DragIcon from "src/components/icons/miscs/DragIcon";
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
    <div ref={(node) => ref(drop(node))} className="flex items-center">
      <DragIcon />
      <div className="flex w-full justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-2">
        <span>
          <span className="bg-appGray-200 p-1 rounded-md mr-1">h1</span>
          {item}
        </span>
        <button className="text-red-500" onClick={() => handleDelete(item)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const SideScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"report" | "scoring">("report");
  const [open, setOpen] = useState(true);

  const [reportItems, setReportItems] = useState<string[]>(["a", "b", "c", "d"]);
  const [scoringItems, setScoringItems] = useState<string[]>(["1", "2", "3", "4"]);

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
      <div className={`w-full mb-[70px] overflow-y-auto ${open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"} `}>
        <div
          className={`border border-gray-300 p-4 ${open ? "w-full h-full" : "w-full h-auto"
            } bg-opacity-50 rounded-lg`}
        >
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
                    <button
                      className={`p-1 rounded-lg ${activeTab === "report" ? "bg-appGray-200" : ""}`}
                      onClick={() => setActiveTab("report")}
                    >
                      Report Section
                    </button>
                    <button
                      className={`p-1 rounded-lg ${activeTab === "scoring" ? "bg-appGray-200" : ""}`}
                      onClick={() => setActiveTab("scoring")}
                    >
                      Scoring Parameters
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {open && (
            <>
              <div className="h-52 overflow-y-auto p-2">
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
                      className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-2 ml-4"
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
                <div className="flex items-center py-1 border border-gray-300 rounded-lg mb-2 p-2 ml-4">
                  {isInputVisible ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded-lg flex-grow"
                      placeholder="Add new item"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <span className="flex-grow"> </span>
                  )}
                  <button
                    className="flex items-center justify-start text-primary-900 mr-[230px]"
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
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default SideScreen;
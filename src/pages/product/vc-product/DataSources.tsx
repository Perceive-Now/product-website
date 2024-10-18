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
        <span>{item}</span>
        <button className="text-red-500" onClick={() => handleDelete(item)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const DataSources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"organization" | "blog" | "website" | "category4" | "government">("organization");
  const [open, setOpen] = useState(true);
  const [organizationItems, setOrganizationItems] = useState<string[]>([
    "USPTO",
    "EPO",
    "WIPO",
    "https://example4.com",
    "https://example5.com",
    "https://example6.com",
    "https://example7.com",
  ]);
  const [blogItems, setBlogItems] = useState<string[]>([]);
  const [websiteItems, setWebsiteItems] = useState<string[]>([]);
  const [category4Items, setCategory4Items] = useState<string[]>([]);
  const [governmentItems, setGovernmentItems] = useState<string[]>([]);
  
  const [newItem, setNewItem] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const itemsToDisplay = activeTab === "organization" ? organizationItems : 
                         activeTab === "blog" ? blogItems : 
                         activeTab === "website" ? websiteItems : 
                         activeTab === "category4" ? category4Items : 
                         governmentItems;

  const handleDelete = (item: string) => {
    if (activeTab === "organization") {
      setOrganizationItems(organizationItems.filter((i) => i !== item));
    } else if (activeTab === "blog") {
      setBlogItems(blogItems.filter((i) => i !== item));
    } else if (activeTab === "website") {
      setWebsiteItems(websiteItems.filter((i) => i !== item));
    } else if (activeTab === "category4") {
      setCategory4Items(category4Items.filter((i) => i !== item));
    } else {
      setGovernmentItems(governmentItems.filter((i) => i !== item));
    }
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      if (activeTab === "organization") {
        setOrganizationItems([...organizationItems, newItem.trim()]);
      } else if (activeTab === "blog") {
        setBlogItems([...blogItems, newItem.trim()]);
      } else if (activeTab === "website") {
        setWebsiteItems([...websiteItems, newItem.trim()]);
      } else if (activeTab === "category4") {
        setCategory4Items([...category4Items, newItem.trim()]);
      } else {
        setGovernmentItems([...governmentItems, newItem.trim()]);
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
    const updatedItems = Array.from(organizationItems);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setOrganizationItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`border border-gray-300 rounded-lg w-full mb-[70px] overflow-y-auto ${open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"}`}>
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
                    {["organization", "blog", "website", "category4", "government"].map((tab) => (
                      <button
                        key={tab}
                        className={`p-1 rounded-lg ${activeTab === tab ? "bg-appGray-200" : ""}`}
                        onClick={() => setActiveTab(tab as any)}
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
              <div className="h-52 overflow-y-auto p-2">
                {itemsToDisplay.map((item, index) => (
                  <DraggableItem
                    key={item}
                    item={item}
                    index={index}
                    handleDelete={handleDelete}
                    moveItem={moveItem}
                  />
                ))}
                <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-2 ml-4">
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
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default DataSources;

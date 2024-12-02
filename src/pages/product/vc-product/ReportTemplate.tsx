import React, { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutIcon from "src/components/icons/miscs/layout";
import TrashIconTwo from "src/assets/images/TrashTwo.svg";
import AddIcon from "src/components/icons/common/add-icon";
import DragIconTwo from "src/assets/images/DragIconTwo.svg";
import { useAppSelector, useAppDispatch } from "src/hooks/redux";
import { updatePitchdeckData } from "src/stores/vs-product";
import Select from "react-select";
import ArrowDown from "src/components/icons/miscs/ArrowDown";
import ArrowUp from "src/components/icons/miscs/ArrowUp";

const ItemType = {
  ITEM: "item",
};

interface ReportItem {
  title: string;
  summary: string;
  subsections?: Record<string, ReportItem>;
}

interface DraggableItemProps {
  keyName: string;
  summary: string;
  index: number;
  tag: string;
  handleDelete: (item: string) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  indentLevel?: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  keyName,
  summary,
  index,
  tag,
  handleDelete,
  moveItem,
  indentLevel = 0,
}) => {
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const summaryRef = useRef<HTMLSpanElement>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    if (summaryRef.current) {
      const LineClampHeight = 40;
      const contentHeight = summaryRef.current.scrollHeight;
      setShowArrow(contentHeight > LineClampHeight);
    }
  }, [summary]);

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex items-center mb-2"
      style={{ marginLeft: indentLevel * 33 }}
    >
      <img src={DragIconTwo} className="pb-10 cursor-grab" alt="Drag" />
      <div className="flex flex-col w-full py-1 border border-gray-300 rounded-lg p-2">
        <div className="flex items-center mb-1">
          <span className="bg-appGray-200 p-1 rounded-md mr-1">{tag}</span>
          {keyName}
          <div className="flex-grow" />
          <button className="text-red-500" onClick={() => handleDelete(tag)}>
            <img src={TrashIconTwo} alt="Delete" className="w-2 h-2" />
          </button>
        </div>
        <div className="flex justify-between m-0">
          <span>
            <div className="bg-appGray-100 p-1 rounded-md">Summary</div>
          </span>
          <span
            ref={summaryRef}
            className={`ml-4 text-gray-700 text-justify tracking-tighter text-sm ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {summary}
          </span>
          {showArrow && (
            <button onClick={toggleExpand} className="text-primary-900 ml-2 h-3">
              {isExpanded ? <ArrowUp /> : <ArrowDown />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TemplateReport: React.FC = () => {
  // const ReportTemplate: Record<string, ReportItem> = {
  //   "1": {
  //     title: "Executive Summary",
  //     summary:
  //       "An overview of EcoTech Innovations, highlighting the company's mission, product offerings, unique value proposition, and potential impact on the market.",
  //     subsections: {},
  //   },
  //   "2": {
  //     title: "Company Overview",
  //     summary:
  //       "In-depth details about EcoTech Innovations, including its history, leadership team, and strategic vision for the future.",
  //     subsections: {
  //       "2.1": {
  //         title: "Founding Team and Management",
  //         summary:
  //           "Profiles of the CEO, CTO, and COO, detailing their expertise and previous experience in the clean tech industry.",
  //       },
  //       "2.2": {
  //         title: "Mission and Vision",
  //         summary:
  //           "A look at EcoTech's mission to make clean energy accessible and its long-term vision to become a global leader.",
  //       },
  //     },
  //   },
  //   "3": {
  //     title: "Market Analysis",
  //     summary:
  //       "An examination of the smart home energy market, including size, growth rate, and EcoTech's target audience.",
  //     subsections: {
  //       "3.1": {
  //         title: "Current Market Landscape",
  //         summary:
  //           "Evaluation of the existing market dynamics, customer needs, and how EcoTech fits into the current industry environment.",
  //       },
  //       "3.2": {
  //         title: "Competitive Analysis",
  //         summary:
  //           "An analysis of EcoTech's direct competitors, such as Tesla Powerwall and Sunrun, and its competitive edge.",
  //       },
  //     },
  //   },
  //   "4": {
  //     title: "Product Offering",
  //     summary:
  //       "Detailed information about EcoTech's product, key features, and the technology behind it.",
  //     subsections: {
  //       "4.1": {
  //         title: "Product Features",
  //         summary:
  //           "A closer look at the solar-powered smart home energy systems and the AI-driven energy optimization.",
  //       },
  //       "4.2": {
  //         title: "Technology and IP",
  //         summary:
  //           "Discussion of patents filed and proprietary software that provides EcoTech with a competitive advantage.",
  //       },
  //     },
  //   },
  //   "5": {
  //     title: "Customer and Market Validation",
  //     summary: "Data and feedback demonstrating EcoTech's product viability and customer impact.",
  //     subsections: {
  //       "5.1": {
  //         title: "Customer Feedback",
  //         summary:
  //           "Analysis of customer testimonials and the average savings on energy bills reported by users.",
  //       },
  //       "5.2": {
  //         title: "Market Traction",
  //         summary:
  //           "A review of milestones achieved, such as units sold and partnerships with utility providers.",
  //       },
  //     },
  //   },
  //   "6": {
  //     title: "Business Model",
  //     summary:
  //       "Outline of EcoTech's revenue streams, pricing strategy, customer acquisition costs, and lifetime value.",
  //     subsections: {
  //       "6.1": {
  //         title: "Revenue Streams",
  //         summary:
  //           "Breakdown of different revenue channels including direct sales, subscription services, and partnerships.",
  //       },
  //       "6.2": {
  //         title: "Financial Projections",
  //         summary:
  //           "Projected revenue for 2023 and details on the company's burn rate and funding goals.",
  //       },
  //     },
  //   },
  //   "7": {
  //     title: "Go-to-Market Strategy",
  //     summary:
  //       "A strategic plan outlining how EcoTech intends to enter the market and acquire customers.",
  //     subsections: {
  //       "7.1": {
  //         title: "Marketing and Sales",
  //         summary:
  //           "Tactics for direct-to-consumer marketing, partnerships, and B2B commercial installation sales.",
  //       },
  //       "7.2": {
  //         title: "Partnerships and Alliances",
  //         summary:
  //           "Details on existing partnerships and future strategic alliances that will help scale the business.",
  //       },
  //     },
  //   },
  //   "8": {
  //     title: "Operational Plan",
  //     summary: "Insight into EcoTech's manufacturing, operational costs, and efficiency measures.",
  //     subsections: {
  //       "8.1": {
  //         title: "Manufacturing and Scalability",
  //         summary:
  //           "Information on how EcoTech plans to scale manufacturing and the use of funds for this purpose.",
  //       },
  //       "8.2": {
  //         title: "Operational Efficiency",
  //         summary:
  //           "A look into the operational strategies employed to optimize efficiency and reduce costs.",
  //       },
  //     },
  //   },
  // };
  const { ReportTemplate } = useAppSelector((state) => state.VSProduct);
  const dispatch = useAppDispatch();
  const [reportItems, setReportItems] = useState(ReportTemplate);
  const [open, setOpen] = useState(true);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemSummary, setNewItemSummary] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    dispatch(updatePitchdeckData({ reportGenerations: {...reportItems} }));
    console.log("reporrtt",reportItems)
  }, [reportItems]);

  const handleDelete = (itemKey: string) => {
    const deleteItem = (items: Record<string, ReportItem>, keyToDelete: string) => {
      if (items[keyToDelete]) {
        const updatedItems = { ...items };
        delete updatedItems[keyToDelete];
        return updatedItems;
      }

      const updatedItems = { ...items };
      for (const key in updatedItems) {
        const item = updatedItems[key];
        if (item.subsections) {
          const newSubsections = deleteItem(item.subsections, keyToDelete);
          if (newSubsections !== item.subsections) {
            updatedItems[key] = { ...item, subsections: newSubsections };
            return updatedItems;
          }
        }
      }
      return items;
    };

    setReportItems((prevItems:any) => deleteItem(prevItems, itemKey));
  };

  const handleAdd = () => {
    if (newItemTitle.trim() && newItemSummary.trim()) {
      setReportItems((prevItems:any) => ({
        ...prevItems,
        [Object.keys(reportItems).length+1]: { title: newItemTitle, summary: newItemSummary, subsections: {} },
      }));
      setNewItemTitle("");
      setNewItemSummary("");
      setIsInputVisible(false);
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = Object.entries(reportItems);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setReportItems(Object.fromEntries(updatedItems));
  };

  const renderItems = (items: Record<string, ReportItem>, indentLevel = 0) => {
    return Object.entries(items).map(([key, item], index) => (
      <React.Fragment key={key}>
        <DraggableItem
          keyName={item.title}
          summary={item.summary}
          index={index}
          tag={key} 
          handleDelete={handleDelete}
          moveItem={moveItem}
          indentLevel={indentLevel}
        />
        {item.subsections && renderItems(item.subsections, indentLevel + 1)}
      </React.Fragment>
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`border border-gray-300 rounded-lg w-full mb-[70px] overflow-y-auto pn_scroller h-[90vh] ${
          open ? "flex-[0_0_460px] max-w-[460px]" : "max-w-[215px] max-h-[50px]"
        }`}
      >
        <div
          className={`px-1 py-1 ${
            open ? "w-full h-full" : "w-full h-auto"
          } bg-opacity-50 rounded-lg`}
        >
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
            <div className="h-52 overflow-y-auto">
              {renderItems(reportItems)}
              <div className="flex flex-col">
                {isInputVisible ? (
                  <>
                    <div className="flex flex-col py-1 border border-gray-300 rounded-lg mb-2 p-1 ml-3">
                      <div className="flex justify-between items-center mb-2">
                        <input
                          type="text"
                          className="border border-gray-300 bg-transparent p-1 rounded-xs flex-auto placeholder:text-appGray-600 focus:outline-none focus:ring-0 text-sm w-full"
                          placeholder="Add New"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                        />
                      </div>
                      <textarea
                        className="border border-gray-300 bg-transparent p-1 rounded-xs w-full placeholder:text-appGray-600 focus:outline-none focus:ring-0 text-sm"
                        placeholder="Summary"
                        value={newItemSummary}
                        onChange={(e) => setNewItemSummary(e.target.value)}
                      />
                       <button onClick={handleAdd} className="self-end mt-2 text-primary-900 text-md">
                      <AddIcon /> Add Section
                    </button>
                    </div>
                   
                  </>
                ) : (
                  <div className="flex justify-between items-center py-1 border border-gray-300 rounded-lg mb-2 p-1 ml-3">
                  <button
                  className={`flex items-center justify-start text-primary-900 ${isInputVisible ? 'hidden' : ''}`}
                  onClick={() => setIsInputVisible(true)}                >
                  {!isInputVisible && (
                    <>
                      <AddIcon color="#442873" size={25} />
                      <span className="">Add</span>
                    </>
                  )}
                </button>
                </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default TemplateReport;
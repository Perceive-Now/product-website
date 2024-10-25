import React, { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutIcon from "src/components/icons/miscs/layout";
import TrashIconTwo from "src/assets/images/TrashTwo.svg";
import AddIcon from "src/components/icons/common/add-icon";
import DragIconTwo from "src/assets/images/DragIconTwo.svg";
import { useAppSelector } from "src/hooks/redux";
import Select from "react-select";
import ArrowDown from "src/components/icons/miscs/ArrowDown";
import ArrowUp from "src/components/icons/miscs/ArrowUp";

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

const DraggableItem: React.FC<DraggableItemProps> = ({
  keyName,
  summary,
  index,
  handleDelete,
  moveItem,
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (summaryRef.current) {
      const LineClampHeight = 40;
      const contentHeight = summaryRef.current.scrollHeight;
      setShowArrow(contentHeight > LineClampHeight);
    }
  }, [summary]);

  return (
    <div ref={(node) => ref(drop(node))} className="flex items-center mb-2">
      <img src={DragIconTwo} className="pb-10 cursor-grab" alt="Drag" />
      <div className="flex flex-col w-full py-1 border border-gray-300 rounded-lg p-2">
        <div className="flex items-center mb-1">
          <span className="bg-appGray-200 p-1 rounded-md mr-1">h1</span>
          {keyName}
          <div className="flex-grow" />
          <button className="text-red-500" onClick={() => handleDelete(keyName)}>
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
  const { ReportTemplate } = useAppSelector((state) => state.VSProduct);
  console.log("reportsss", ReportTemplate);
  const [open, setOpen] = useState(true);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemSummary, setNewItemSummary] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: "h1", label: "h1" });

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#F5F7FF",
      border: "none",
      boxShadow: "none",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
    }),
    option: (provided: any, { isSelected, isFocused }: any) => ({
      ...provided,
      backgroundColor: isFocused ? "lightgray" : "white",
      color: isSelected ? "black" : "black",
    }),
  };

  const options = [
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "h4", label: "h4" },
  ];

  // const reportData = [
  //   [
  //     "Market Opportunity",
  //     "Global Smart Home Energy Market",
  //     "EcoTech Innovations aims to tap into the $300 billion smart home market with a focus on clean energy, offering a solution to a growing customer base concerned with energy costs and sustainability.",
  //   ],
  //   [
  //     "Competitive Differentiation",
  //     "Unique AI-Driven Energy Optimization",
  //     "With competitors lhrough proprietation with existing home systems.",
  //   ],
  // ];

  const [reportItems, setReportItems] = useState(ReportTemplate);

  const handleDelete = (itemKey: string) => {
    setReportItems(reportItems.filter((item: any) => item[0] !== itemKey));
  };

  const handleAdd = () => {
    if (newItemTitle.trim() && newItemSummary.trim()) {
      const newReportItem = [newItemTitle.trim(), "", newItemSummary.trim()];
      setReportItems([...reportItems, newReportItem]);
      setNewItemTitle("");
      setNewItemSummary("");
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
              {reportItems.map((item: any, index: any) => (
                <DraggableItem
                  key={item[0]}
                  keyName={item[0]}
                  summary={item[2]}
                  index={index}
                  handleDelete={handleDelete}
                  moveItem={moveItem}
                />
              ))}
              <div className="flex flex-col ml-3">
                {isInputVisible ? (
                  <>
                    <div className="flex flex-col py-1 border border-gray-300 rounded-lg mb-2 p-1">
                      <div className="flex justify-between items-center mb-2">
                        <Select
                          value={selectedOption}
                          onChange={(option: any) => setSelectedOption(option)}
                          options={options}
                          styles={customStyles}
                          className="basic-single mr-1 text-sm flex-[0_0_82px] font-semibold"
                          classNamePrefix="select"
                          placeholder="Select an option"
                        />
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
                        rows={3}
                      />
                      <div className="flex justify-end mt-2">
                        <button className="flex items-center text-primary-900" onClick={handleAdd}>
                          <AddIcon color="#442873" size={25} />
                          <span className="text-semibold">Add</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="flex-grow"></span>
                )}

                <button
                  className={`flex items-center border border-gray-300 rounded-lg p-1 justify-start text-primary-900 ${
                    isInputVisible ? "hidden" : ""
                  }`}
                  onClick={() => setIsInputVisible(true)}
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

export default TemplateReport;

// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import LayoutIcon from "src/components/icons/miscs/layout";
// import TrashIcon from "src/components/icons/common/trash";
// import AddIcon from "src/components/icons/common/add-icon";
// import DragIcon from "src/components/icons/miscs/DragIcon";
// import { useAppSelector } from "src/hooks/redux";
// import Select from "react-select";

// const ItemType = {
//   ITEM: "item",
// };

// interface DraggableItemProps {
//   keyName: string;
//   headerType: string;
//   summary: string;
//   index: number;
//   handleDelete: (item: string) => void;
//   moveItem: (fromIndex: number, toIndex: number) => void;
// }

// const DraggableItem: React.FC<DraggableItemProps> = ({
//   keyName,
//   headerType,
//   summary,
//   index,
//   handleDelete,
//   moveItem,
// }) => {
//   const [, ref] = useDrag({
//     type: ItemType.ITEM,
//     item: { index },
//   });

//   const [, drop] = useDrop({
//     accept: ItemType.ITEM,
//     hover(draggedItem: { index: number }) {
//       if (draggedItem.index !== index) {
//         moveItem(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   // Dynamic header rendering based on the headerType
//   const DynamicHeaderTag = `${headerType}` as keyof JSX.IntrinsicElements;

//   return (
//     <div ref={(node) => ref(drop(node))} className="flex items-center mb-2">
//       <DragIcon />
//       <div className="flex flex-col w-full py-1 border border-gray-300 rounded-lg p-2">
//         <div className="flex items-center mb-1">
//           <span className="bg-appGray-200 p-1 rounded-md mr-1">{headerType}</span>
//           <DynamicHeaderTag>{keyName}</DynamicHeaderTag>
//           <button className="text-red-500 ml-2" onClick={() => handleDelete(keyName)}>
//             <TrashIcon />
//           </button>
//         </div>
//         <div className="flex justify-between m-0">
//           <span>
//             <div className="bg-appGray-100 p-1 rounded-md">Summary</div>
//           </span>
//           <span className="ml-4 text-gray-700 text-justify">{summary}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TemplateReport: React.FC = () => {
//   const { ReportTemplate } = useAppSelector((state) => state.VSProduct);
//   const [open, setOpen] = useState(true);
//   const [newItem, setNewItem] = useState(""); // State for the title input
//   const [newSummary, setNewSummary] = useState(""); // State for the summary input
//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [selectedOption, setSelectedOption] = useState({ value: "h1", label: "h1" });

//   const customStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       backgroundColor: "#F5F7FF",
//       border: "none",
//       boxShadow: "none",
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       marginTop: 0,
//     }),
//     option: (provided: any, { isSelected, isFocused }: any) => ({
//       ...provided,
//       backgroundColor: isFocused ? "lightgray" : "white",
//       color: isSelected ? "black" : "black",
//     }),
//   };

//   const options = [
//     { value: "h1", label: "h1" },
//     { value: "h2", label: "h2" },
//     { value: "h3", label: "h3" },
//     { value: "h4", label: "h4" },
//   ];

//   const reportData = [
//     ["h1", "Market Opportunity", "Global Smart Home Energy Market"],
//     ["h2", "Competitive Differentiation", "Unique AI-Driven Energy Optimization"],
//   ];

//   const [reportItems, setReportItems] = useState(reportData);

//   const handleDelete = (itemKey: string) => {
//     setReportItems(reportItems.filter((item: any) => item[1] !== itemKey));
//   };

//   const handleAdd = () => {
//     if (newItem.trim() && newSummary.trim()) {
//       const newReportItem = [
//         selectedOption.value, // Header type like h1, h2
//         newItem.trim(), // Title input
//         newSummary.trim(), // Summary input
//       ];
//       setReportItems([...reportItems, newReportItem]);
//       setNewItem("");
//       setNewSummary("");
//       setIsInputVisible(false);
//     }
//   };

//   const moveItem = (fromIndex: number, toIndex: number) => {
//     const updatedItems = Array.from(reportItems);
//     const [movedItem] = updatedItems.splice(fromIndex, 1);
//     updatedItems.splice(toIndex, 0, movedItem);
//     setReportItems(updatedItems);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div
//         className={`border border-gray-300 rounded-lg w-full mb-[70px] overflow-y-auto pn_scroller h-[90vh] ${
//           open ? "flex-[0_0_460px] max-w-[460px]" : "flex-[0_0_215px] max-w-[215px]"
//         }`}
//       >
//         <div className={`p-4 ${open ? "w-full h-full" : "w-full h-auto"} bg-opacity-50 rounded-lg`}>
//           <div className="flex">
//             <div onClick={() => setOpen(!open)} className="cursor-pointer">
//               <LayoutIcon />
//             </div>
//             <div className="ml-2">
//               <h2 className="text-lg font-semibold">Report Template</h2>
//               {open && <h4 className="mb-4">Arrange/add sections as needed</h4>}
//             </div>
//           </div>
//           {open && (
//             <div className="h-52 overflow-y-auto p-2">
//               {reportItems.map((item: any, index: any) => (
//                 <DraggableItem
//                   key={item[1]} // Use item[1] (title) as key
//                   keyName={item[1]} // Title or key name
//                   headerType={item[0]} // Header tag (h1, h2, etc.)
//                   summary={item[2]} // Summary text
//                   index={index}
//                   handleDelete={handleDelete}
//                   moveItem={moveItem}
//                 />
//               ))}

//               <div className="flex flex-col ml-4">
//                 {isInputVisible ? (
//                   <>
//                     <div className="flex flex-col py-1 border border-gray-300 rounded-lg mb-2 p-1">
//                       <div className="flex justify-between items-center mb-2">
//                         <Select
//                           value={selectedOption}
//                           onChange={(option: any) => setSelectedOption(option)}
//                           options={options}
//                           styles={customStyles}
//                           className="basic-single mr-1 text-sm flex-[0_0_82px] font-semibold"
//                           classNamePrefix="select"
//                           placeholder="Select an option"
//                         />
//                         <input
//                           type="text"
//                           className="border border-gray-300 bg-transparent p-1 rounded-xs flex-auto placeholder:text-appGray-600 focus:outline-none focus:ring-0 text-sm w-full"
//                           placeholder="Add New Title"
//                           value={newItem}
//                           onChange={(e) => setNewItem(e.target.value)}
//                           onKeyDown={(e) => e.key === "Enter" && handleAdd()}
//                         />
//                       </div>

//                       <textarea
//                         className="border border-gray-300 bg-transparent p-1 rounded-xs w-full placeholder:text-appGray-600 focus:outline-none focus:ring-0 text-sm"
//                         placeholder="Add Summary"
//                         value={newSummary}
//                         onChange={(e) => setNewSummary(e.target.value)}
//                         rows={3}
//                       />
//                       <div className="flex justify-end mt-2">
//                         <button className="flex items-center text-primary-900" onClick={handleAdd}>
//                           <AddIcon color="#442873" size={25} />
//                           <span className="text-semibold">Add</span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <span className="flex-grow"></span>
//                 )}

//                 <button
//                   className={`flex items-center justify-start text-primary-900 ${
//                     isInputVisible ? "hidden" : ""
//                   }`}
//                   onClick={() => setIsInputVisible(!isInputVisible)}
//                 >
//                   {!isInputVisible && (
//                     <>
//                       <AddIcon color="#442873" size={25} />
//                       <span className="ml-2">Add</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default TemplateReport;

import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import Modal from "src/components/reusable/modal";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import { useAppDispatch } from "src/hooks/redux";
import { setVSChats } from "src/stores/vs-product";
interface ExtractInfoProps {
  info: string;
  onSendQuery: (query: string, answer: string, file?: File,button?:boolean) => void;
}

const ExtractInfo: React.FC<ExtractInfoProps> = ({ info , onSendQuery,
}) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  // const [formData, setFormData] = useState<Record<string, string>>({});
//   info= `**Company Name:** [EcoTech Innovations]
// **Tagline:** [Empowering homes with clean energy]
// **Mission:** [To make clean energy accessible, affordable, and efficient for everyone.]
// **Founded:** [2021]
// **Location:** [San Francisco, CA]
// **Current Issue:** [Over 70% of homes still rely on non-renewable energy, leading to inefficiencies and high carbon footprints.]
// **Pain Point:** [Homeowners face rising energy costs, while environmental regulations demand more sustainable solutions.]
// **Customer Impact:** [High costs, environmental concerns, lack of easy solutions for energy management.]
// **Product:** [Solar-powered smart home energy systems.]
// **Key Features:** [AI-driven energy optimization., Seamless integration with existing home systems., Scalable for commercial use.]
// **Unique Value Proposition:** [EcoTech reduces energy bills by up to 30%, while enabling homes to lower their carbon emissions.]
// **Market Size:** [$300 billion global smart home market, with a $50 billion subset for clean energy solutions.]
// **Growth Rate:** [8.9% CAGR in the smart home energy management sector.]
// **Target Audience:** [Homeowners and commercial properties looking to reduce energy costs and carbon footprints.]
// **Revenue Streams:** [Direct Sales: Solar-powered systems sold to homeowners and businesses., Subscription: Monthly energy management services via AI-driven software., Partnerships: Partnering with utility companies to provide grid support.]
// **Milestones:** [1,500 units sold in the first 12 months., Partnership with 3 utility providers., $1.2M in annual recurring revenue (ARR) from subscriptions.]
// **Customer Feedback:** [Average customer savings of 25% on energy bills.]
// **Channels:** [Direct-to-consumer via digital marketing., Partnerships with home builders and utility companies., B2B for commercial installations.]
// **Customer Acquisition Cost (CAC):** [$120.]
// **Lifetime Value (LTV):** [$900.]
// **Competitors:** [Tesla Powerwall, Sunrun, Vivint Solar]
// **Differentiation:** [AI-driven optimization and seamless integration with existing home systems give EcoTech a unique edge over competitors.]
// **Revenue:** [$2.5M (2023 projected).]
// **Burn Rate:** [$50k per month.]
// **Funding:** [Currently raising $5M for scaling manufacturing and marketing.]
// **Use of Funds:** [60% manufacturing, 30% marketing, 10% operational costs.]
// **CEO:** [Jane Doe (10+ years in clean tech, ex-SolarCity).]
// **CTO:** [John Smith (AI expert, PhD in Machine Learning).]
// **COO:** [Emily Johnson (Operations lead, previously at Tesla).]
// **Patents:** [2 patents filed for AI optimization algorithms and energy storage technology.]
// **Competitive Edge:** [Proprietary software for real-time energy management.]
// **Near-term Goals:** [Expand into Europe and Asia-Pacific within 18 months.]
// **Long-term Vision:** [Become a global leader in sustainable energy solutions for smart homes.]`
  console.log("infooooooooooooo",info);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  // const parseInfo = (infoString: string) => {
  //   const infoLines = infoString.split("\n").filter((line) => line.trim() !== "");
  //   const infoObject: Record<string, string> = {};

  //   infoLines.forEach((line) => {
  //     const trimmedLine = line.replace(/^- /, "");
  //     const [key, value] = trimmedLine.split(":").map((part) => part.trim());
  //     if (key && value) {
  //       infoObject[key.replace(/[\[\]]/g, "")] = value.replace(/[\[\]]/g, "").trim();
  //     }
  //   });

  //   return infoObject;
  // };


  
    const formatInfoString = (input: string): string => {
      return input.split('\n').map(line => line.trim()).filter(line => line).join('\n\n');
    };

  const parseInfo = (info: string): Record<string, string> => {
    const lines = info.split('\n').filter(line => line);
    const parsedData: Record<string, string> = {};
    lines.forEach(line => {
      const [key, value] = line.split(':').map(part => part.trim());
      if (key && value) {
        const cleanKey = key.replace(/\*\*/g, '').trim();
        const cleanValue = value.replace(/\*\*/g, '').trim();
        parsedData[cleanKey] = cleanValue.replace(/\[|\]/g, ''); // Remove brackets
      }
    });
    return parsedData;
  };

  const [formData, setFormData] = useState<Record<string, string>>(parseInfo(info));
  const [changedData,setChangedData] = useState({});
  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
    setChangedData({
      ...changedData,
      [key]: value
    });
  };



  const infoData = parseInfo(info);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSummary = Object.entries(changedData)
      .map(([key, value]) => `${key} is now updated to ${value}`)
      .join(', ');
  
    console.log("updatedSummary",updatedSummary);
    if(updatedSummary){
    onSendQuery("", updatedSummary,undefined,false);
    // dispatch(
    //   setVSChats({
    //     query: "",
    //     answer: "",
    //     options: ["Yes"],
    //     hasbutton: true,
    //   }),
    // );
    handleModalClose();
  };
}


  // const formatInfo = () => {
  //   return info.split("\n").map((line, index) => {
  //     const regex = /\[(.*?)\]/g;
  //     const parts = line.split(regex);

  //     return (
  //       <div key={index}>
  //         {parts.map((part, idx) => {
  //           if (idx % 2 === 0) {
  //             return part;
  //           } else {
  //             const key = part.trim();
  //             const defaultValue = formData[key] || key;

  //             return (
  //               <input
  //                 key={idx}
  //                 type="text"
  //                 value={defaultValue}
  //                 onChange={(e) => handleChange(key, e.target.value)}
  //                 className="border p-1 rounded-md bg-transparent border-neutral-500 mb-1"
  //               />
  //             );
  //           }
  //         })}
  //       </div>
  //     );
  //   });
  // };

  

  return (
    <>
      <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
        <div className="font-semibold text-md text-end">
          <Switch
            checked={true}
            onChange={() => {
              setModalOpen(true);
            }}
            className={`border border-appGray-500 relative inline-flex items-center h-2 rounded-full w-4 mr-1`}
          >
            <span
              className={`translate-x-0 inline-block w-[12px] h-[12px] transform bg-appGray-500 rounded-full`}
            />
          </Switch>
          Edit Extract
        </div>

                   <Markdown
                      className="markdownWrapper text-secondary-800 text-justify relative bottom-0 duration-500 delay-500  stream-answer text-align"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[
                        [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
                      ]}
                    >
                      {formatInfoString(info)}
                    </Markdown>


      </div>
      {/* <Modal open={modalOpen} handleOnClose={handleModalClose}>
          <div className="bg-foundationOrange-100 p-4 border border-secondary-500 mx-auto rounded-lg">
            <div className="font-bold text-md text-end">
              <Switch
                checked={true}
                onChange={() => {
                  setModalOpen(false);
                }}
                className={`bg-blue-600 relative inline-flex items-center h-2 rounded-full w-4 mr-1`}
              >
                <span
                  className={`translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full`}
                />
              </Switch>
              Edit Extract
            </div>
            <div className="font-bold text-sm">Startup Overview:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Company Name:</span> {infoData["Company Name"]}
        </li>
        <li>
          <span className="font-bold">Tagline:</span> {infoData["Tagline"]}
        </li>
        <li>
          <span className="font-bold">Mission Statement:</span> {infoData["Mission"]}
        </li>
        <li>
          <span className="font-bold">Founded:</span> {infoData["Founded"]}
        </li>
        <li>
          <span className="font-bold">Location:</span> {infoData["Location"]}
        </li>
        <li>
          <span className="font-bold">Problem:</span> {infoData["The Problem"]}
        </li>
        <li>
          <span className="font-bold">Solution:</span> {infoData["The Solution"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Market Insights:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Target Audience:</span> {infoData["Target Audience"]}
        </li>
        <li>
          <span className="font-bold">Market Size:</span> {infoData["Market Size"]}
        </li>
        <li>
          <span className="font-bold">Growth Rate:</span> {infoData["Growth Rate"]}
        </li>
        <li>
          <span className="font-bold">Competitive Landscape:</span> {infoData["Competitors"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Business Model:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Revenue Streams:</span> {infoData["Revenue Streams"]}
        </li>
        <li>
          <span className="font-bold">Cost Structure:</span> {infoData["Burn Rate"]}
        </li>
        <li>
          <span className="font-bold">Partnerships:</span> {infoData["Competitors"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Traction & Milestones:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Traction Milestones:</span> {infoData["Traction Milestones"]}
        </li>
        <li>
          <span className="font-bold">Customer Feedback:</span> {infoData["Customer Feedback"]}
        </li>
        <li>
          <span className="font-bold">CAC:</span> {infoData["CAC"]}
        </li>
        <li>
          <span className="font-bold">LTV:</span> {infoData["LTV"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Financial Overview:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Current Funding:</span> {infoData["Funding Ask"]}
        </li>
        <li>
          <span className="font-bold">Projected Revenue:</span> {infoData["Revenue"]}
        </li>
        <li>
          <span className="font-bold">Use of Funds:</span> {infoData["Use of Funds"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Team:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Founders & Key Team Members:</span> {infoData["Team"]}
        </li>
      </ul>

      <div className="font-bold mt-2 text-sm">Pitch Summary:</div>
      <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
        <li>
          <span className="font-bold">Long-term Vision:</span> {infoData["Long-term Vision"]}
        </li>
        <li>
          <span className="font-bold">Go-to-Market Strategy:</span>{" "}
          {infoData["Go-to-Market Strategy"]}
        </li>
        <li>
          <span className="font-bold">Intellectual Property:</span>{" "}
          {infoData["Intellectual Property"]}
        </li>
        <li>
          <span className="font-bold">Market Expansion:</span> {infoData["Market Expansion"]}
        </li>
      </ul>

            <button className="mt-4 bg-secondary-500 text-white p-2 rounded-full pr-5 pl-5">
              Submit
            </button>
          </div>
        </Modal> */}
      <Modal open={modalOpen} handleOnClose={handleModalClose}>
        <div className="bg-foundationOrange-100 p-4 border border-secondary-500 mx-auto rounded-lg h-[90vh] overflow-y-auto pn_scroller">
          <div className="font-bold text-md text-end">
            <Switch
              checked={true}
              onChange={() => {
                setModalOpen(false);
              }}
              className={`bg-primary-900 relative inline-flex items-center h-2 rounded-full w-4 mr-1 mb-2`}
            >
              <span
                className={`translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full`}
              />
            </Switch>
            Edit Extract
          </div>

                    {Object.entries(formData).map(([key, value]) => (
  <div key={key} className="flex items-center mb-1">
    <label className="font-bold text-sm mr-2 text-nowrap">{key}:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(key, e.target.value)}
      className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
      
    />
  </div>
))}


          <button onClick={handleSubmit} className="mt-4 bg-secondary-500 text-white p-2 rounded-full pr-5 pl-5">
            Submit
          </button>
        </div>
      </Modal>


     
    </>
  );
};

export default ExtractInfo;

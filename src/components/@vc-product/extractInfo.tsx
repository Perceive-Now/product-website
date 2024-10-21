import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import Modal from "src/components/reusable/modal";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
interface ExtractInfoProps {
  info: string;
}

const ExtractInfo: React.FC<ExtractInfoProps> = ({ info }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // console.log("infoo",info);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const parseInfo = (infoString: string) => {
    const infoLines = infoString.split("\n").filter((line) => line.trim() !== "");
    const infoObject: Record<string, string> = {};

    infoLines.forEach((line) => {
      const trimmedLine = line.replace(/^- /, "");
      const [key, value] = trimmedLine.split(":").map((part) => part.trim());
      if (key && value) {
        infoObject[key.replace(/[\[\]]/g, "")] = value.replace(/[\[\]]/g, "").trim();
      }
    });

    return infoObject;
  };

  const infoData = parseInfo(info);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("ajjj")
    // TODO: Submit form data
    console.log("Form data", formData);
    // setModalOpen(false);
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
                      {info}
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
            {[
              "Company Name",
              "Tagline",
              "Mission",
              "Founded",
              "Location",
              "The Problem",
              "The Solution",
            ].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <div className="font-bold mt-2 text-sm">Market Insights:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            {["Target Audience", "Market Size", "Growth Rate", "Competitors"].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <div className="font-bold mt-2 text-sm">Business Model:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            {["Revenue Streams", "Burn Rate", "Competitors"].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <div className="font-bold mt-2 text-sm">Traction & Milestones:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            {["Traction Milestones", "Customer Feedback", "CAC", "LTV"].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <div className="font-bold mt-2 text-sm">Financial Overview:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            {["Funding Ask", "Revenue", "Use of Funds"].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <div className="font-bold mt-2 text-sm">Team:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            <li>
              <span className="font-bold">Founders & Key Team Members:</span>
              <input
                type="text"
                value={infoData["Team"]}
                // onChange={(e) => setInfoData({ ...infoData, "Team": e.target.value })}
                className="ml-2 border border-gray-300 rounded p-1"
              />
            </li>
          </ul>

          <div className="font-bold mt-2 text-sm">Pitch Summary:</div>
          <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
            {[
              "Long-term Vision",
              "Go-to-Market Strategy",
              "Intellectual Property",
              "Market Expansion",
            ].map((field) => (
              <li key={field}>
                <span className="font-bold">{field}:</span>
                <input
                  type="text"
                  value={infoData[field]}
                  // onChange={(e) => setInfoData({ ...infoData, [field]: e.target.value })}
                  className="ml-2 border border-gray-300 rounded p-1"
                />
              </li>
            ))}
          </ul>

          <button className="mt-4 bg-secondary-500 text-white p-2 rounded-full pr-5 pl-5">
            Submit
          </button>
        </div>
      </Modal>


     
    </>
  );
};

export default ExtractInfo;

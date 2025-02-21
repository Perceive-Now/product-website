import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import Modal from "src/components/reusable/modal";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import { useAppDispatch } from "src/hooks/redux";
import { setVSChats, updatePitchdeckData } from "src/stores/vs-product";
interface ExtractInfoProps {
  info: string;
  obj?: any;
  onSendQuery: (
    query: string,
    answer: string,
    file?: File,
    button?: boolean,
    shouldSentPitch?: boolean,
  ) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  query: string;
}

const ExtractInfo: React.FC<ExtractInfoProps> = ({
  info,
  obj,
  onSendQuery,
  modalOpen,
  setModalOpen,
  query,
}) => {
  console.log("infooo", info);
  console.log("obj-----", obj);
  const dispatch = useAppDispatch();
  // const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formatInfoString = (input: string): string => {
    return input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .join("\n\n")
      .replace(/\],?/g, "")
      .replace(/\[|\]/g, "");
  };

  const parseInfo = (info: string): Record<string, string> => {
    const lines = info.split("\n").filter((line) => line);
    const parsedData: Record<string, string> = {};
    lines.forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      if (key && value) {
        const cleanKey = key.replace(/\*\*/g, "").trim();
        const cleanValue = value.replace(/\*\*/g, "").trim();
        if (cleanValue) parsedData[cleanKey] = cleanValue.replace(/\[|\]/g, ""); // Remove brackets
      }
    });
    return parsedData;
  };

  const [formData, setFormData] = useState<Record<string, any>>(obj);

  const [changedData, setChangedData] = useState({});
  // const handleChange = (key: string, value: string) => {
  //   console.log("keyyyyy",key);
  //   setFormData({
  //     ...formData,
  //     [key]: value,
  //   });
  //   setChangedData({
  //     ...changedData,
  //     [key]: value,
  //   });
  // };

  const handleChange = (key: string, value: string, index?: number) => {
    console.log("keyyyyy", key, index);

    if (Array.isArray(formData[key]) && index !== undefined) {
      const updatedArray: any = [...formData[key]];
      updatedArray[index] = value;
      setFormData({
        ...formData,
        [key]: updatedArray,
      });
      setChangedData({
        ...changedData,
        [key]: updatedArray,
      });
    }
  };

  const convertToInfoString = (data: Record<string, string>): string => {
    return Object.entries(data)
      .map(([key, value]) => `**${key}:** [${value}]`)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("sub,itting", JSON.stringify(formData));
    const updateExtract = JSON.stringify(formData);
    dispatch(updatePitchdeckData({ pitchdeckSummary: updateExtract }));
    handleModalClose();
    onSendQuery("", "Submit", undefined, undefined, true);
  };

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
          rehypePlugins={[[rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]]}
        >
          {formatInfoString(query)}
        </Markdown>

        {Object.entries(formData).map(([key, value]) => {
          if (Array.isArray(value) && !value.every((item) => typeof item === "string")) {
            return null;
          }

          return (
            <div key={key}>
              {Array.isArray(value) && value.length > 1 ? (
                <>
                  <div className="font-bold">{key}:</div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    {value.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>
                  <span className="font-bold">{key}:</span> {value}
                </p>
              )}
              <br />
            </div>
          );
        })}
      </div>

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

          {/* {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex items-center mb-1">
              <label className="font-bold text-sm mr-2 text-nowrap">{key}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
              />
            </div>
          ))} */}

          {Object.entries(formData).map(([key, value]) => {
            if (
              Array.isArray(value) &&
              value.length > 1 &&
              !value.every((item) => typeof item === "string")
            ) {
              return null;
            }

            return (
              <>
                {Array.isArray(value) && value.length > 1 ? (
                  <div key={key} className="items-center mb-1">
                    <div className="font-bold text-sm text-start mt-1">{key}:</div>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }} className="mb-2">
                      {value.map((item, index) => (
                        <li key={index} className="mt-1">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChange(key, e.target.value, index)}
                            className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    {value.map((item: any) => (
                      <>
                        {typeof item === "object" ? (
                          <>
                            <div className="font-bold text-sm text-start mt-1 mb-1">{key}:</div>
                            {Object.entries(item).map(
                              ([itemKey, itemValue]: any, itemIndex: number) => (
                                <>
                                  <div key={key} className="flex items-center mb-1">
                                    <label className="font-bold text-sm mr-2 text-nowrap">
                                      {itemKey}:
                                    </label>
                                    <input
                                      type="text"
                                      value={itemValue}
                                      onChange={(e) => {
                                        // handleChange(key, e.target.value, 0);
                                        if (
                                          Array.isArray(formData[key]) &&
                                          itemIndex !== undefined
                                        ) {
                                          const updatedArray: any = JSON.parse(
                                            JSON.stringify(formData[key]),
                                          );
                                          updatedArray[0][itemKey] = e.target.value;
                                          console.log("UPDATEDVALUESS", updatedArray);
                                          setFormData({
                                            ...formData,
                                            [key]: updatedArray,
                                          });
                                          setChangedData({
                                            ...changedData,
                                            [key]: updatedArray,
                                          });
                                        }
                                      }}
                                      className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                                    />
                                  </div>
                                </>
                              ),
                            )}
                          </>
                        ) : (
                          <div key={key} className="flex items-center mb-1">
                            <label className="font-bold text-sm mr-2 text-nowrap">{key}:</label>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleChange(key, e.target.value, 0)}
                              className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </>
                )}
              </>
            );
          })}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-secondary-500 text-white p-2 rounded-full pr-5 pl-5"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ExtractInfo;

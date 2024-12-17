import { useMemo, useState, useRef } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";

//
import EditIcon from "../../../components/icons/miscs/Edit";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { UploadIcon } from "src/components/icons";
import TakeoffScreen from "./takeoffScreen";
/**
 *
 */

const listContent = [
  "PDF (.pdf) - Portable Document Format",
  "Microsoft Excel (.xls, .xlsx)",
  "Microsoft Word (.docx)",
  "Text Files (.txt)",
  "PowerPoint (.ppt,.pptx)",
  "OpenDocument Text (.odt)",
  "Keynote (.key)",
];

const urlContent = [
  "Known Competitor Websites",
  "Relevant Industry Websites",
  "Portfolio Company Websites",
  "Company Website",
  "Other Relevant URLs",
];

const QuickReports = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [reportName, setReportName] = useState<string>("");

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    const fileList = Array.from(files).map((file: any) => file.name);
    setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

  const handlePasteURL = () => {
    if (urlInput) {
      setPastedURLs((prevURLs) => [...prevURLs, urlInput]);
      setUrlInput("");
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    console.log("files", files);
    if (files) {
      const fileList = Array.from(files);
      setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
    }
  };

  const handleSubmit = () => {
    setStep(3);
    const formData: any = {};
    formData.files = uploadedFiles;
    formData.websites = pastedURLs;
    formData.report_name = reportName;

    console.log("formaData------", formData);
  };

  const handleUrlChange = (e: any) => {
    setUrlInput(e.target.value);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (index: number, type: "url" | "file") => {
    if (type === "url") {
      setPastedURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    } else if (type === "file") {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-1">
      <div>
        <h6 className="text-lg font-semibold ml-0">
          Settings &gt; Report management &gt; Quick report
        </h6>
        {step === 1 && (
          <div className="flex justify-start items-center pt-3">
            <Link to="/my-reports">
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        )}
      </div>

      <div className="">
        {step === 1 ? (
            <>
           <div className="flex space-x-4">
            {/* First Part: File Upload and Paste URL */}
            <div className="w-1/2 space-y-4">
              {/* File Upload Box */}
              <div
                className={`border border-appGray-600 rounded-lg h-48 flex justify-center items-center p-10 ${
                  dragging ? "bg-gray-200" : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center text-lg" onClick={handleBrowseClick}>
                  <UploadIcon />
                  <p className="text-center text-base font-bold font-nunito mt-3">
                    Drag and Drop files to upload
                  </p>
                  <p className="text-base py-0.5 font-bold font-nunito">or</p>
                  <p className="text-primary-900 font-bold underline cursor-pointer hover:text-primary-800 transition duration-300 ease-in-out text-base font-nunito">
                    Browse
                  </p>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Paste URL Section */}
              <div>
                <h6 className="font-semibold text-base mb-2">Type or Paste Your URL</h6>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Paste URL here"
                    value={urlInput}
                    onChange={handleUrlChange}
                    className="w-full p-2 rounded-tl-xl rounded-bl-xl border border-appGray-600 focus:border-primary-900 focus:outline-none"
                    />
                  <button
                    className="px-4 bg-primary-900 text-white rounded-br-xl rounded-tr-xl"
                    onClick={handlePasteURL}
                  >
                    Paste
                  </button>
                </div>
              </div>

              {/* Supported Files and URLs */}
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-lg font-semibold font-nunito">Supported file types (up to 40mb)</p>
                  <ul className="list-disc pl-[20px]">
                    {listContent.map((content) => (
                      <li key={content} className="text-xs">
                        {content}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-lg font-semibold font-nunito">Recommended URL</p>
                  <ul className="list-disc pl-[20px]">
                    {urlContent.map((content) => (
                      <li key={content} className="text-xs">
                        {content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Second Part: Added Websites and Urls Listing */}
            <div className="w-1/2 px-15">
              {/* Added Websites */}
              <div className="border border-appGray-600 rounded-lg h-full flex flex-col space-y-4 p-2">
                <div className="rounded-lg p-2">
                  <h6 className="font-semibold mb-1 text-base font-nunito">Added Websites</h6>

                  {pastedURLs.length > 0 ? (
                    <>
                      {pastedURLs.map((url, index) => (
                        <div key={index}>
                          {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-nunito">{url}</p>
                            <TrashIcon
                              className="cursor-pointer"
                              onClick={() => handleDelete(index, "url")}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-gray-500 font-nunito text-center p-3">No websites added yet.</p>
                  )}
                </div>

                {/* Added Reports Listing */}
                <div className="rounded-lg p-2">
                  <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
                  {uploadedFiles.length > 0 ? (
                    <>
                      {uploadedFiles.map((file, index) => (
                        <div key={index}>
                          {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-nunito">{file.name}</p>
                            <TrashIcon
                              className="cursor-pointer"
                              onClick={() => handleDelete(index, "file")}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-gray-500 text-center p-3 font-nunito">No file uploaded yet.</p>
                  )}
                </div>
              </div>
            </div>

           
          </div>
           <div className="max-w-[120px] mt-5">
           <div
             onClick={() => {
               setStep(2);
             }}
             className="cursor-pointer border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
           >
             Next
           </div>
         </div>
         </>
        ) : step === 2 ? (
          <div className="p-3 w-[50%]">
            <label htmlFor="fullName" className="block text-md font-nunito text-secondary-800">
              Name your report
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={reportName}
              onChange={(e: any) => {
                setReportName(e.target.value);
              }}
              required
              placeholder="Report Name"
              className="mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
            />
              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div
                  onClick={handleSubmit}
                  className="cursor-pointer border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  Submit
                </div>
              </div>
          </div>
        ) : (
          <TakeoffScreen />
        )}
      </div>
    </div>
  );
};

export default QuickReports;

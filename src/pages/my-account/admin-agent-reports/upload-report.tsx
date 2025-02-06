import { Link } from "react-router-dom";
import { UploadIcon } from "src/components/icons";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

const UploadAgentReport = () => {
  const listContent = ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "TXT", "CSV", "RTF"];

  return (
    <div className="space-y-[20px] w-full z-10">
      <div>
        <div className="p-1 pl-0">
          <h6 className="text-lg font-semibold ml-0">Admin Agent Report management</h6>
          <div className="flex justify-start items-center pt-3 pl-1">
            <Link to={`/agent-admin-reports/1`}>
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="">
          <div className="flex space-x-4">
            {/* First Part: File Upload and Paste URL */}
            <div className="w-1/2 space-y-4">
              {/* File Upload Box */}
              <h6 className="font-semibold text-base font-nunito">Add Report File</h6>
              <div className="border border-appGray-600 rounded-lg h-[280px] flex justify-center items-center cursor-pointer p-10">
                <div className="flex flex-col items-center text-lg">
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

              {/* Supported Files and URLs */}
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-lg font-semibold font-nunito">
                    Supported file types (up to 200mb)
                  </p>
                  <ul className="list-disc pl-[20px]">
                    {listContent.map((content) => (
                      <li key={content} className="text-xs">
                        {content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-1/2 px-3 flex flex-col">
              <div className="h-[70%] pr-[25%]">
                <div className="border border-appGray-600 rounded-lg h-full flex flex-col px-2 pt-2 pb-[20px]">
                  <div className="rounded-lg p-2 flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
                    <div className="h-[180px] pn_scroller overflow-y-auto pr-1">
                      <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                        No file uploaded yet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h6 className="font-semibold mb-1 text-base font-nunito">
              Report Highlights <span className="text-red-500 ml-0">*</span>
            </h6>
            <input
              id="highlights"
              type="text"
              className="mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent"
              placeholder="Report Highlights"
            />
          </div>

          <div className="max-w-[120px] mt-5 mb-5">
            <button className="cursor-pointer flex justify-center text-center border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAgentReport;

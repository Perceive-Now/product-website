import { useMemo, useState, useRef } from "react";

//
import EditIcon from "../../../components/icons/miscs/Edit";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { UploadIcon } from "src/components/icons";
import jsCookie from "js-cookie";
import { generateKnowIdstring } from "src/utils/helpers";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { API_PROD_URL } from "src/utils/axios";
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

const AdminUploadReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const project_id = urlParams.get("project_id");
  const user_id = urlParams.get("user_id");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = jsCookie.get("user_id");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(id ? 2 : 1);
  const [reportName, setReportName] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        if (isInvalidType || isInvalidSize) {
          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (uploadedFiles.length === 0) {
      toast.error("Upload a file to submit");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    uploadedFiles.forEach((file: File) => {
      formData.append("file", file);
    });

    const threadId = generateKnowIdstring();

    try {
      const response: any = await fetch(
        `${API_PROD_URL}/upload-report-file/${user_id}/${project_id}/${id}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        navigate(`/admin`);
      } else {
        toast.error("Unable to submit report");
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }

    console.log("formData------", formData);
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
    <div className="space-y-[20px] w-full z-10 p-1">
      <div>
        <h6 className="text-lg font-semibold ml-0">
          Settings &gt; Admin Report management &gt; Upload File
        </h6>
        {step === 1 && (
          <div className="flex justify-start items-center pt-3">
            <Link to="/admin-projects">
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-y-auto">
        <div className="">
          <div className="flex space-x-4">
            {/* First Part: File Upload and Paste URL */}
            <div className="w-1/2 space-y-4">
              {/* <div className="mb-1">
                  <label htmlFor="industry" className="block text-md text-secondary-800">
                    Select Report
                  </label>
                  <select
                    id="report"
                    name="report"
                    // value={}
                    // onChange={}
                    required
                    className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
                  >
                    <option value="">Select</option>
                    <option value="founder">xyz</option>
                    <option value="admin">pqr</option>
                    <option value="admin">abc</option>
                  </select>
                </div>

                <div className="mb-1">
                  <label htmlFor="industry" className="block text-md text-secondary-800">
                    Uploaded By 
                  </label>
                  <select
                    id="uploadedBy"
                    name="uploadedBy"
                    // value={}
                    // onChange={}
                    required
                    className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
                  >
                    <option value="">Select</option>
                    <option value="founder">Peter weber</option>
                    <option value="admin">John Lee</option>
                    <option value="admin">Brett coper</option>
                  </select>
                </div> */}

              {/* File Upload Box */}
              <h6 className="font-semibold text-base font-nunito">Upload File</h6>
              <div
                className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
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

            {/* Second Part: Added Websites and Urls Listing */}
            <div className="w-1/2 px-3 flex flex-col">
              {/* Added Websites */}
              <div className="h-full px-15">
                <div className="border border-appGray-600 rounded-lg h-full flex flex-col p-2">
                  {/* Added Reports Listing */}
                  <div className="rounded-lg p-2 flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
                    {uploadedFiles.length > 0 ? (
                      <div className="pn_scroller overflow-y-auto pr-1">
                        {uploadedFiles.map((file, index) => (
                          <div key={index}>
                            {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-nunito">{file.name}</p>
                              <TrashIcon
                                className="cursor-pointer"
                                width={25}
                                onClick={() => handleDelete(index, "file")}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                        No file uploaded yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[120px] mt-5">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer flex justify-center text-center border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
            >
              {loading ? <LoadingIcon width={18} height={18} className="" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadReport;

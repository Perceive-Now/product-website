import { useMemo, useState, useRef } from "react";


//
import { UploadIcon } from "src/components/icons";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import { useParams } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DownloadIcon from "src/components/icons/common/download-icon";
import IconFile from "src/components/icons/side-bar/icon-file";
// import JSZip from "jszip";
// import { saveAs } from 'file-saver';

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

const DetailedReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const itemData = location.state;
  const urlParams = new URLSearchParams(location.search);
  const project_id = urlParams.get("project_id");
  const user_id = urlParams.get("user_id");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length === 1) {
      const file = files[0];
      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;

      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setUploadedFile(file);
      }
    } else {
      toast.error("Please upload only one file.");
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      const file = files[0];
      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;
      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setUploadedFile(file);
      }
    } else {
      toast.error("Please upload only one file.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!uploadedFile) {
      toast.error("Upload a file to submit");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response: any = await fetch(
        `https://templateuserrequirements.azurewebsites.net/upload-report-file/${user_id}/${project_id}/${itemData.report_id}`,
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

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

//   const handleDownload = async () => {
//     // Check if the file_data object has files to download
//     console.log("ooooooooooo")
//     const filesToDownload = Object.keys(itemData.file_data).filter(key => itemData.file_data[key]);
  
//     if (filesToDownload.length > 0) {
//       const zip = new JSZip();
  
//       try {
//         // Loop over the files and add them to the zip
//         for (const fileKey of filesToDownload) {
//           const fileUrl = itemData.file_data[fileKey];
  
//           // Fetch the file if the URL is a remote resource
//           const response = await fetch(fileUrl);
//           if (!response.ok) {
//             throw new Error(`Failed to fetch ${fileKey}`);
//           }
  
//           const fileBlob = await response.blob();
//           zip.file(fileKey, fileBlob); // Add file to the zip with the key as the file name
//         }
  
//         // Generate the zip file asynchronously
//         const content = await zip.generateAsync({ type: "blob" });
  
//         // Trigger the download of the zip file
//         saveAs(content, "files.zip");
  
//         toast.success("Downloading files as zip...");
  
//       } catch (error) {
//         console.error("Error generating zip file:", error);
//         toast.error("Failed to download the zip file.");
//       }
//     } else {
//       toast.error("No files available to download");
//     }
//   };

// const handleDownload = () => {
//     // Check if the file_data object has files to download
//     console.log("ooooooooooo");
  
//     const filesToDownload = Object.keys(itemData.file_data).filter(key => itemData.file_data[key]);
  
//     if (filesToDownload.length > 0) {
//       const zip = new JSZip();
  
//       try {
//         // Loop over the files and add them to the zip
//         for (const fileKey of filesToDownload) {
//           const fileUrl = itemData.file_data[fileKey]; // URL for the file
  
//           // Extract the file name from the URL
//           const fileName = fileUrl.split('/').pop(); 
  
//           if (fileUrl.startsWith("data:")) {
//             // Handle data URIs (base64 encoded files)
//             const [metadata, base64Content] = fileUrl.split(",");
//             const mimeType = metadata.split(";")[0].split(":")[1]; // Get MIME type (e.g., application/pdf, image/jpeg)
            
//             // Create a Blob from the base64 content
//             const fileBlob = new Blob([Uint8Array.from(atob(base64Content), c => c.charCodeAt(0))], { type: mimeType });
//             zip.file(fileName, fileBlob); // Add the file to the zip
  
//           } else {
//             // Handle URLs (remote or local files)
//             // Create a Blob object directly from the URL if it's a valid object URL
//             const fileBlob = new Blob([fileUrl], { type: "application/pdf" }); // Default to PDF if not base64
  
//             zip.file(fileName, fileBlob); // Add the file to the zip
//           }
//         }
  
//         // Generate the zip file asynchronously
//         zip.generateAsync({ type: "blob" }).then((content) => {
//           // Trigger the download of the zip file
//           saveAs(content, "files.zip");
//           toast.success("Downloading files as zip...");
//         });
  
//       } catch (error) {
//         console.error("Error generating zip file:", error);
//         toast.error("Failed to download the zip file.");
//       }
//     } else {
//       toast.error("No files available to download");
//     }
//   };

  return (
    <div className="space-y-[20px] w-full z-10 p-1">
      <div>
        <div className="p-1 pl-0">
          <h6 className="text-lg font-semibold ml-0">
            {" "}
            Admin Report management &gt; {itemData?.report_name}
          </h6>
          <div className="flex justify-start items-center pt-3 pl-1">
              <Link to={`/admin-reports/${project_id}?user_id=${user_id}`}>
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
              <div className="w-full">
                <label htmlFor="fullName" className="block text-md  text-secondary-800">
                  Report Name
                </label>
                <input
                  type="text"
                  value={itemData?.report_name}
                  disabled={true}
                  placeholder="Report Name"
                  className="mt-1 p-[14px] w-full border border-appGray-700 rounded-lg"
                />
              </div>

              <div className="w-full">
                <label htmlFor="fullName" className="block text-md  text-secondary-800">
                  Usecase
                </label>
                <input
                  type="text"
                  value={itemData?.usecase}
                  disabled={true}
                  placeholder="Report Name"
                  className="mt-1 p-[14px] w-full border border-appGray-700 rounded-lg"
                />
              </div>

              {/* File Upload Box */}
              <h6 className="font-semibold text-base font-nunito">Add Report File</h6>
              <div
                className={`border border-appGray-600 rounded-lg h-[280px] flex justify-center items-center cursor-pointer p-10 ${
                  dragging ? "bg-gray-200" : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <IconFile />
                    <p className="text-center text-base font-bold font-nunito">
                      {uploadedFile.name}
                    </p>
                  </div>
                ) : (
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
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
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
              <div className="h-[30%]">
                <h6 className="font-nunito">Questions need to answer</h6>
                <input
                  type="text"
                  disabled={true}
                  value={
                    Array.isArray(itemData?.questions) && itemData.questions.length > 0
                      ? itemData.questions[0]
                      : ""
                  }
                  placeholder="No question asked"
                  className="mt-1 p-[14px] w-full border border-appGray-700 rounded-lg"
                />
                <input
                  type="text"
                  disabled={true}
                  value={
                    Array.isArray(itemData?.questions) && itemData.questions.length > 0
                      ? itemData.questions[1]
                      : ""
                  }
                  required
                  placeholder="No question asked"
                  className="mt-1 p-[14px] w-full border border-appGray-700 rounded-lg"
                />
                <input
                  type="text"
                  disabled={true}
                  value={
                    Array.isArray(itemData?.questions) && itemData.questions.length > 0
                      ? itemData.questions[2]
                      : ""
                  }
                  required
                  placeholder="No question asked"
                  className="mt-1 p-[14px] w-full border border-appGray-700 rounded-lg"
                />
              </div>
              {/* Added Websites */}
              <div className="h-[70%] pr-[28%]">
                <div className="border border-appGray-600 rounded-lg h-full flex flex-col p-2">
                  <div className="rounded-lg p-2 flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito">Added Websites</h6>

                    {itemData.websites && itemData.websites.length > 0 ? (
                      <div className="h-[190px] pn_scroller overflow-y-auto p-1">
                        {itemData.websites.map((url: any, index: number) => (
                          <div key={index}>
                            {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                            <div className="flex justify-between items-center">
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-nunito cursor-pointer text-blue-600"
                              >
                                {url}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 font-nunito text-center p-3 mt-3">
                        No websites added.
                      </p>
                    )}
                  </div>

                  {/* Added Reports Listing */}
                  <div className="rounded-lg p-2 flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito flex items-center">
                      Uploaded files <DownloadIcon className="ml-2 cursor-pointer"/>
                    </h6>

                    {Object.keys(itemData.file_data).length > 0 ? (
                      <div className="h-[190px] pn_scroller overflow-y-auto pr-1">
                        {Object.keys(itemData.file_data).map((key, index) => {
                          const fileUrl = itemData.file_data[key];
                          if (!fileUrl) return null;
                          return (
                            <div key={index}>
                              {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-nunito">{fileUrl}</p>{" "}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                        No file uploaded
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

export default DetailedReport;

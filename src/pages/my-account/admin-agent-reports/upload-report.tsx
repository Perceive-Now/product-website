import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UploadIcon } from "src/components/icons";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

const UploadAgentReport = () => {
  const { userid, threadid } = useParams(); // Get params from URL
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/reportcheck/${userid}/${threadid}`,
      );
      if (response.ok) {
        const data = await response.json();
        // Set uploaded files from the fetched report info
        setUploadedFiles(data.report_info || []);
      } else {
        setError("Failed to fetch uploaded files.");
      }
    } catch {
      setError("Error fetching uploaded files.");
    }
  };

  // Fetch previously uploaded files
  useEffect(() => {
    fetchUploadedFiles();

    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [userid, threadid]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      const response = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/upload_report/${userid}/${threadid}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        setMessage("File uploaded successfully!");
        setSelectedFile(null);
        // Fetch the updated list of uploaded files after a successful upload
        fetchUploadedFiles();
      } else {
        setError("Failed to upload file.");
      }
    } catch {
      setError("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-[20px] w-full z-10">
      <div>
        <div className="p-1 pl-0">
          <h6 className="text-lg font-semibold ml-0">Settings &gt; Admin Agent Report management &gt; Upload File</h6>
          <div className="flex justify-start items-center pt-3 pl-1">
            <Link to={`/agent-admin-reports/${userid}`}>
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="flex space-x-4">
          {/* File Upload Section */}
          <div className="w-1/2 space-y-4">
            <h6 className="font-semibold text-base font-nunito">Add Report File</h6>
            <label className="border border-appGray-600 rounded-lg h-[280px] flex justify-center items-center cursor-pointer p-10">
              <div className="flex flex-col items-center text-lg">
                <UploadIcon />
                <p className="text-center text-base font-bold font-nunito mt-3">
                  Drag and Drop files to upload
                </p>
                <p className="text-base py-0.5 font-bold font-nunito">or</p>
                <span className="text-primary-900 font-bold underline cursor-pointer hover:text-primary-800 transition duration-300 ease-in-out text-base font-nunito">
                  Browse
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </label>

            {selectedFile && (
              <p className="text-sm mt-2 font-semibold">Selected file: {selectedFile.name}</p>
            )}
          </div>

          {/* Uploaded Files Section */}
          <div className="w-1/2 px-3 flex flex-col">
            <div className="h-[70%] pr-[25%]">
              <div className="border border-appGray-600 rounded-lg h-full flex flex-col px-2 pt-2 pb-[20px]">
                <div className="rounded-lg p-2 flex-1">
                  <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded Files</h6>
                  <div className="h-[180px] pn_scroller overflow-y-auto pr-1">
                    {uploadedFiles.length > 0 ? (
                      <ul>
                        {uploadedFiles.map((file: any, index: any) => (
                          <li key={index} className="text-xs text-gray-700 mt-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-blue-600"
                            >
                              {file.filename}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                        No files uploaded yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <div className="max-w-[120px] mt-5 mb-5">
          <button
            className={`cursor-pointer flex justify-center text-center border w-full ${
              uploading ? "bg-gray-400" : "bg-[#442873]"
            } text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito`}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>

        {/* Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default UploadAgentReport;

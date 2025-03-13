import React from "react";

const PitchFile = ({ filename_url }: { filename_url: any }) => {
  const { file_url, original_filename } = filename_url;

  const getFileTypeIcon = (extension: string) => {
    switch (extension) {
      case "jpg":
      case "png":
      case "jpeg":
        return (
          <div className="h-6 w-6 bg-blue-500 rounded text-white flex items-center justify-center">
            🖼️
          </div>
        );
      case "mp4":
      case "mov":
      case "avi":
        return (
          <div className="h-6 w-6 bg-green-500 rounded text-white flex items-center justify-center">
            🎥
          </div>
        );
      case "pdf":
        return (
          <div className="h-6 w-6 bg-red-500 rounded text-white flex items-center justify-center">
            📄
          </div>
        );
      default:
        return (
          <div className="h-6 w-6 bg-gray-500 rounded text-white flex items-center justify-center">
            📄
          </div>
        );
    }
  };

  const getFileExtension = (name: string) => {
    if (!name) {
      return;
    }
    const parts = name.split(".");
    return parts.length > 1 ? parts?.pop()?.toLowerCase() || "" : "unknown";
  };

  const fileExtension = getFileExtension(original_filename);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
      <div className="bg-foundationOrange-100 border-secondary-500 p-2 rounded-2xl rounded-br-none mt-2">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            {fileExtension ? getFileTypeIcon(fileExtension) : null}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-800">{original_filename}</p>
              <p className="text-xs text-gray-500">{fileExtension}</p>
            </div>
          </div>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = file_url;
              link.target = "_blank";
              link.download = original_filename;
              link.click();
            }}
            className="text-blue-600 hover:underline text-sm font-medium ml-4"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PitchFile;

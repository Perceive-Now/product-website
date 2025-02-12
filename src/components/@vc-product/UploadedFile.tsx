import React from "react";

const UploadedFileItem = ({ file }: { file: File }) => {
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
            📁
          </div>
        );
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / 1048576).toFixed(2)} MB`;
  };

  const getFileExtension = (name: string) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts?.pop()?.toLowerCase() || "" : "unknown";
  };

  const fileExtension = getFileExtension(file.name);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        {getFileTypeIcon(fileExtension)}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-800">{file.name}</p>
          <p className="text-xs text-gray-500">
            {fileExtension} · {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(file);
          link.download = file.name;
          link.click();
        }}
        className="text-blue-600 hover:underline text-sm font-medium ml-4"
      >
        Download
      </button>
    </div>
  );
};

export default UploadedFileItem;

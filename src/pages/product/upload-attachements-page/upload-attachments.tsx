import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropZoneContent from "./dropzone-content";
import Button from "../../../components/reusable/button";
import { DustbinIcon } from "../../../components/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import "./border.css";
import {
  EUploadAttachmentsPages,
  incrementStep,
  setCurrentPageId,
  setFilesToUpload,
} from "../../../stores/upload-attachments";
import classNames from "classnames";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: 8,
  borderWidth: 4,
  borderStyle: "dashed",
  borderColor: "#442873",
  backgroundColor: "white",
  outline: "none",
  transition: "border .24s ease-in-out",
} as const;

const focusedStyle = {
  borderColor: "#2196f3",
} as const;

const acceptStyle = {
  borderColor: "#00e676",
} as const;

const rejectStyle = {
  borderColor: "#ff1744",
} as const;

export default function UploadAttachments() {
  const dispatch = useAppDispatch();

  const { filesToUpload } = useAppSelector((state) => state.uploadAttachments);

  const [files, setFiles] = useState<File[]>(filesToUpload);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      // "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      // "application/vnd.apple.keynote": [".key"],
      // "application/vnd.oasis.opendocument.text": [".odt"],
      "text/plain": [".txt"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles((prev) => {
        const filteredFiles = acceptedFiles.filter(
          (file) => !prev.some((prevFile) => prevFile.name === file.name),
        );
        return [...prev, ...filteredFiles];
      });
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  const handleFileDelete = (fileName: string) => {
    setFiles((prev) => {
      return prev.filter((file) => file.name !== fileName);
    });
  };

  const handleContinueBtnClick = async () => {
    dispatch(setFilesToUpload(files));
    dispatch(incrementStep());
    dispatch(setCurrentPageId(EUploadAttachmentsPages.WebsiteLinks));
  };

  return (
    <div className="flex flex-row justify-between gap-x-[150px]">
      {/* DropZone */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <DropZoneContent />
      </div>

      {/* Dropped files */}
      <div className="w-[300px]">
        <p className="text-lg font-bold text-primary-900 mb-1">Uploaded Files</p>
        <div className="space-y-[4px] mb-5">
          {files.map((file) => (
            <div key={file.name}>
              <div className="flex flex-row justify-between gap-x-3">
                <p className="truncate text-xs mb-1">{file.name}</p>
                <div
                  onClick={() => {
                    handleFileDelete(file.name);
                  }}
                  className="cursor-pointer"
                >
                  <DustbinIcon />
                </div>
              </div>
              <div className="w-full bg-gray-200 h-[1px]"></div>
            </div>
          ))}
        </div>
        <Button
          type="optional"
          classname="text-secondary-800 w-full"
          handleClick={handleContinueBtnClick}
          disabled={files.length === 0}
          loading={false}
        >
          <p
            className={classNames("text-secondary-800", {
              "opacity-50": files.length === 0,
            })}
          >
            Continue
          </p>
        </Button>
        <p className="my-3">
          For now, we support only <strong>1 PDF</strong> file type at a time
        </p>
      </div>
    </div>
  );
}

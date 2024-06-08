import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import jsCookie from "js-cookie";
import Button from "../../../components/reusable/button";
import DropZoneContent from "./dropzone-content";
import toast from "react-hot-toast";
import { DustbinIcon } from "../../../components/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  incrementStep,
  setCurrentPageId,
  setIsUploadAttachmentsError,
  setIsUploadAttachmentsSuccess,
  uploadAttachments,
} from "../../../stores/upload-attachments";

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

  const {
    isUploading,
    additionalQuestionIds,
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
  } = useAppSelector((state) => state.uploadAttachments);

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isUploadAttachmentsError) {
      toast.error(message);
      dispatch(setIsUploadAttachmentsError(false));
      return;
    }

    if (isUploadAttachmentsSuccess) {
      if (additionalQuestionIds.length === 0) {
        dispatch(setCurrentPageId(1));
        dispatch(incrementStep());
        dispatch(setIsUploadAttachmentsSuccess(false));
        return;
      }

      if (additionalQuestionIds.length > 0) {
        dispatch(setCurrentPageId(2));
        dispatch(incrementStep());
        dispatch(setIsUploadAttachmentsSuccess(false));
        return;
      }

      return;
    }
  }, [
    isUploadAttachmentsError,
    isUploadAttachmentsSuccess,
    message,
    additionalQuestionIds,
    dispatch,
  ]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "application/vnd.apple.keynote": [".key"],
      "application/vnd.oasis.opendocument.text": [".odt"],
      "text/plain": [".txt"],
    },
    onDrop: (acceptedFiles) => {
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
    dispatch(
      uploadAttachments({
        userId: jsCookie.get("user_id") ?? "",
        reportId: jsCookie.get("session_id") ?? "",
        categoryIds: ["1"] ?? [], // TODO get from usecase redux
        attachments: [...files],
      }),
    );
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
                <div className="cursor-pointer" onClick={() => handleFileDelete(file.name)}>
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
          loading={isUploading}
        >
          <p className="text-secondary-800">Continue</p>
        </Button>
      </div>
    </div>
  );
}

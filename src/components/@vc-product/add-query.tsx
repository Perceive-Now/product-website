import { useState } from "react";
import SentIcon from "../icons/common/send";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { LoaderIcon } from "react-hot-toast";
import { CrossIcon } from "../icons";
import IconFile from "../icons/side-bar/icon-file";
interface Props {
  sendQuery: (query: string, answer: string, file?: File, button?:boolean) => void;
  setanswer: (query: string) => void;
  setQuery: (query: string) => void;
  //   isLoading: boolean;
  query: string;
  answer: string;
}

const AddQuery = ({ query, answer, sendQuery, setanswer,setQuery }: Props) => {
  const textareaRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxSize = 1 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a PDF, PPT, or DOC file.");
        setAttachedFile(null);
        return;
      }

      if (file.size > maxSize) {
        setError("File size exceeds 1MB. Please upload a smaller file.");
        setAttachedFile(null);
        return;
      }

      setError(null);
      setAttachedFile(file);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  return (
    <div className="w-full flex flex-col rounded-lg shadow-inputBox overflow-hidden bg-white relative mb-[70px]">
      <div className="flex items-center p-1">
        <textarea
          ref={textareaRef}
          onChange={(e) => setanswer(e.target.value)}
          value={answer}
          className={classNames(
            "appearance-none leading-tight w-full h-full p-2 border-none rounded-md bg-white placeholder:text-appGray-600 focus:border-none focus-visible:border-none focus:outline-none focus:ring-0",
          )}
          placeholder="Type here"
        />
      </div>

      <div className="bg-appGray-100 rounded-b-lg p-2 flex items-center">
        <button className="inline-flex gitems-center" onClick={handleAttachClick}>
          <IconFile /> <span className="mr-2 ml-1 relative after:w-[12px] after:h-[12px] after:bg-secondary-400 after:rounded-full after:absolute after:top-0 after:-right-2 after:shadow-[0_0_0_6px] after:shadow-[#FFE9C2]">Attach</span>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="file-input hidden" />
        {attachedFile && (
          <div className="flex items-center ml-2">
            <span className="mr-2">{attachedFile.name}</span>
            <button onClick={() => { setAttachedFile(null); }}>
              <CrossIcon className="h-3 w-3 text-red-500" />
            </button>
          </div>
        )}
        {error && (
          <div className="flex items-center ml-2">
            <div className="text-red-500 text-sm mr-2">{error}</div>
          </div>
        )}
        <div className="absolute right-2">
          <button
            className="bg-primary-900 text-white rounded-full h-4 w-4 flex items-center justify-center cursor-pointer"
            type="button"
            onClick={() => { sendQuery(query, answer, attachedFile || undefined), setAttachedFile(null) }}
          >
            <SentIcon className="h-2 w-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuery;

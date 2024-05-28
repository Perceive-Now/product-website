import UploadIcon from "./upload";

const listContent = [
  "PDF (.pdf) - Portable Document Format",
  "Microsoft Word (.doc, .docx)",
  "Microsoft Excel (.xls, .xlsx)",
  "Text Files (.txt)",
  "OpenDocument Text (.odt)",
  "PowerPoint (.ppt, .pptx)",
  "Keynote (.key) ",
];

export default function DropZoneContent() {
  return (
    <div className="flex flex-row justify-center gap-x-5 items-center min-w-[900px] min-h-[400px]">
      <div className="flex flex-col items-center text-lg font-bold">
        <UploadIcon />
        <p>Drag and Drop files to upload</p>
        <p className="text-base">or</p>
        <p className="text-primary-900 underline cursor-pointer hover:text-primary-800 transition duration-300 ease-in-out">
          Browse
        </p>
      </div>
      <div>
        <p className="text-lg font-bold">Supported file types (up to 40mb)</p>
        <ul className="list-disc pl-[20px]">
          {listContent.map((content) => (
            <li key={content} className="text-sm">
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

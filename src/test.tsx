import React, { useState, useRef, useEffect } from "react";

const MadLibEditor: React.FC = () => {
  const [content, setContent] = useState<string>(
    "Instead of [refetching] any [**queries]** for that item and [wasting]",
  );
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = highlightMadLibInputs(content);
    }
  }, [content]);

  const highlightMadLibInputs = (text: string): string => {
    return text.replace(/\[([^\]]+)\]/g, (match, p1) => {
      return `<span class="bg-gray-200 px-1 rounded mx-0.5 inline-block">${p1}</span>`;
    });
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = (e.target as HTMLDivElement).innerText;
    setContent(newContent);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        onPaste={handlePaste}
        className="border border-gray-300 rounded p-3 min-h-[100px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="mt-4">
        <strong className="text-lg font-semibold">Result:</strong>
        <p className="mt-2 p-3 bg-gray-100 rounded">{content}</p>
      </div>
    </div>
  );
};

export default MadLibEditor;

import React, { useRef, useEffect } from "react";

interface EditableContentProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({ initialContent, onContentChange }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  useEffect(() => {
    const handleInput = () => {
      if (contentRef.current) {
        onContentChange(contentRef.current.innerHTML);
      }
    };

    const currentRef = contentRef.current;
    currentRef?.addEventListener("input", handleInput);
    return () => {
      currentRef?.removeEventListener("input", handleInput);
    };
  }, [onContentChange]);

  return (
    <div
      ref={contentRef}
      className="content-editable"
      contentEditable
      suppressContentEditableWarning
    />
  );
};

export default EditableContent;

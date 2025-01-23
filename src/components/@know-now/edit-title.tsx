import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface EditTitleProps {
  currentTitle: string;
  onSubmit: (newTitle: string) => void;
}

const EditTitle: React.FC<EditTitleProps> = ({ currentTitle, onSubmit }) => {
  const [newTitle, setNewTitle] = useState<string>(currentTitle);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(newTitle);
    }
  };

  return (
    <input
      type="text"
      value={newTitle}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={() => onSubmit(newTitle)}
      autoFocus
      style={{ width: '150px' }}
      className="text-black h-3"
      placeholder="Enter new title"
    />
  );
};

export default EditTitle;

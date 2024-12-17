import React, { useState } from 'react';

import IconButton from '../icon-button';
import VerticalEllipsis from 'src/components/icons/common/vertical-ellipsis';
const TableDropdown: React.FC = () => {
  // State to control the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close the dropdown when clicked outside
  // const handleClickOutside = (e: MouseEvent) => {
  //   if (e.target instanceof Node && !e.target.closest('.dropdown-menu')) {
  //     setIsOpen(false);
  //   }
  // };

  // // Attach the event listener to close the dropdown when clicked outside
  // React.useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative inline-block">
      {/* Button to open the dropdown, using the IconButton */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-full border border-solid hover:cursor-pointer hover:shadow-v1 focus:shadow-v1 duration-700 hover:bg-white"
      >
        <VerticalEllipsis className="h-3 w-3 text-white" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div style={{zIndex: 9999}}
          className="dropdown-menu absolute left-[1px] top-[28px] ml-2 w-40 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="p-1">
            {/* Menu Options */}
            <button
              onClick={() => alert('View option clicked')}
              className="group flex rounded-md items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              View
            </button>
            <button
              onClick={() => alert('Download option clicked')}
              className="group flex rounded-md items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default TableDropdown;

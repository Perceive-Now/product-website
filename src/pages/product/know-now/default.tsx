import React, { useState, useEffect } from "react";
import Chat1 from "../../../assets/know-now/chat1";
import Chat2 from "../../../assets/know-now/chat2";
import Chat3 from "../../../assets/know-now/chat3";
import Chat4 from "../../../assets/know-now/chat4";

interface Props {
  setQuery: (query: string) => void;
  question?: string;
}

const knowNowChat = [
  {
    lightIcon: <Chat1 />,
    darkIcon: <Chat1 type="dark" />,
    desc: "See who else is innovating and assess your competitive landscape.",
  },
  {
    lightIcon: <Chat2 />,
    darkIcon: <Chat2 type="dark" />,
    desc: "Identify potential IP roadblocks before you invest time and resources.",
  },
  {
    lightIcon: <Chat3 />,
    darkIcon: <Chat3 type="dark" />,
    desc: "Uncover the latest patents and see what's trending in your field.",
  },
  {
    lightIcon: <Chat4 />,
    darkIcon: <Chat4 type="dark" />,
    desc: "Research similar patents and validate your market potential.",
  },
];

const KnowNowdefault: React.FC<Props> = ({ setQuery, question }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = knowNowChat.findIndex((item) => item.desc === question);
    setSelectedIndex(index !== -1 ? index : null);
  }, [question]);

  const handleClick = (index: number, desc: string) => {
    setSelectedIndex(index);
    setQuery(desc);
  };

  return (
    <div className="w-full md:h-full flex justify-center items-center">
      <div className="w-full xl:w-[700px] mx-auto">
        <div className="font-helvetica text-primary-900 text-[35px] leading-[40px] md:text-[54px] font-[800] md:leading-[64px] flex">
          Hi!
          <br />
          Ready to get started?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          {knowNowChat.map((l, idx) => (
            <div
              key={idx * 23}
              onClick={() => handleClick(idx, l.desc)}
              className={`border-2 rounded-full rounded-br-none flex items-center justify-center px-2 py-2 gap-2 relative cursor-pointer border-primary-900
                ${selectedIndex === idx ? " bg-primary-900" : " bg-white"}`}
            >
              <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]">
                {selectedIndex === idx ? l.darkIcon : l.lightIcon}
              </div>
              <div
                className={`text-[13px] sm:text-sm ${selectedIndex === idx ? "text-white" : "text-secondary-800"}`}
              >
                {l.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default KnowNowdefault;

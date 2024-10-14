import React from "react";
import { useState, useEffect } from "react";
import PN from "../../../assets/images/pn.svg";
interface Props {
  setQuery: (query: string) => void;
  query?: string;
}

const ReportDefault: React.FC<Props> = ({ setQuery, query }) => {
  const [isClicked, setIsClicked] = useState(false);
  const defaultPrompt =
    "Hi there! Let's get started with the diligence process.\nCould you please upload the pitch desk?";

  useEffect(() => {
    if (query === defaultPrompt) setIsClicked(true);
    else setIsClicked(false);
  }, [query]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setQuery(defaultPrompt);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center p-4">
        <div className="mb-3">
          <div className="h-8 w-8 rounded-full bg-appGray-100 flex items-center justify-center">
            <img className="h-5 w-5" src={PN} alt="Pn" />
          </div>
        </div>
        <div
          onClick={handleClick}
          className={`rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer 
          ${isClicked ? "bg-primary-900" : "bg-appGray-100"}`}
        >
          <div className={`text-base leading-tight  ${isClicked ? "text-white" : ""}`}>
            Let's create something amazing!🚀
            <div>I'm here to turn the startup's info into a powerfull, data-driven report</div><br></br>
            <div>Upload the pitch deck, and i'll take it from there!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDefault;
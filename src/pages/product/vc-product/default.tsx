import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PN from "../../../assets/images/pn.svg";
import { setStartTour } from "src/stores/dashboard";
import { useAppDispatch } from "../../../hooks/redux";
// interface Props {
//   setQuery: (query: string) => void;
//   query?: string;
// }

const ReportDefault: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { pathname } = location;

  const defaultPrompt =
    pathname === "/"
      ? `Hey! 👋 Let’s get you familiar with Perceive Now. We'll walk 
       through two main sections: Know Now and Industry Reports. 
       Ready?`
      : `
      Let's create something amazing!🚀
      I'm here to turn the startup's info into a powerful, data-driven report

      Upload the pitch deck, and I'll take it from there!
    `.trim();

  // useEffect(() => {
  //   if (query === defaultPrompt) setIsClicked(true);
  //   else setIsClicked(false);
  // }, [query]);

  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  //   setQuery(defaultPrompt);
  // };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center p-4">
        <div className="mb-3">
          <div className="h-8 w-8 rounded-full bg-appGray-100 flex items-center justify-center">
            <img className="h-5 w-5" src={PN} alt="Pn" />
          </div>
        </div>
        <div
          // onClick={handleClick}
          className={`rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer bg-appGray-100`}
        >
          <div className={`text-base leading-tight`}>
            {defaultPrompt.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line.trim()}
                {index < defaultPrompt.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
        {pathname === "/" && (
          <div className="flex justify-end w-full mt-4">
            <button
              onClick={()=>{dispatch(setStartTour(true));}}
              className="mr-2 px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-primary-900 hover:text-white transition-colors duration-200"
            >
              Sure
            </button>
            <button
              className="px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-primary-900 hover:text-white transition-colors duration-200"
            >
              Skip the tour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDefault;

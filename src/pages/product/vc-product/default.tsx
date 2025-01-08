import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PN from "../../../assets/images/pn.svg";
import { setStartTour } from "src/stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
interface Props {
  // setQuery: (query: string) => void;
  // query?: string;
  finalMessage?: boolean;
  setFinalMessage?: () => void;
}

  const ReportDefault: React.FC<Props> = ({ finalMessage , setFinalMessage}) => {

  const runTour = useAppSelector((state) => state.dashboard.startTour);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = location;

  const defaultPrompt =
    pathname === "/"
      ? `Hey! 👋 Let’s get you familiar with Perceive Now. We'll walk 
       through two main sections: Know Now and Industry Reports. 
       Ready?`
      :  finalMessage ?
      `🎉 Your report will be ready in 24–48 hours. We’ll email you the download link once it’s complete.`
       :
      `Ready to perceive the future? 🚀 

      Start by telling us the name of the startup.
          `.trim();

  // useEffect(() => {
  //   if (query === defaultPrompt) setIsClicked(true);
  //   else setIsClicked(false);
  // }, [query]);

  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  //   setQuery(defaultPrompt);
  // };

  if (runTour) return <></>;

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center p-1 sm:p-4">
        {/* <div className="mb-3">
          <div className="h-8 w-8 rounded-full bg-appGray-100 flex items-center justify-center">
            <img className="h-5 w-5" src={PN} alt="Pn" />
          </div>
        </div> */}
        <div
          // onClick={handleClick}
          className={`rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer bg-appGray-100 w-full sm:w-fit`}
        >
          <div className={`text-[15px] sm:text-base leading-[1.5] sm:leading-tight`}>
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
              onClick={() => {
                dispatch(setStartTour(true));
              }}
              className="mr-2 px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-primary-900 hover:text-white transition-colors duration-200"
            >
              Sure
            </button>
            <button
              onClick={() => navigate("/vc-product")}
              className="px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-primary-900 hover:text-white transition-colors duration-200"
            >
              Skip the tour
            </button>
          </div>
        )}
          {finalMessage && (
          <div className="flex justify-center w-full mt-4">
            <button
              onClick={setFinalMessage}
              className="mr-2 px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-secondary-500 hover:text-white transition-colors duration-200"
            >
              Start another report
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-secondary-500 hover:text-white transition-colors duration-200"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDefault;

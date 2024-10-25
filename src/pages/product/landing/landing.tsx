import React from "react";
import { useState } from "react";
import Button from "../../../components/reusable/button";
import LandingMark from "./landing-mark";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { BGVector0, BGVector1, BGVector2, BGVector3 } from "../../../components/icons";
import Title from "src/components/reusable/title/title";
import ReportDefault from "../vc-product/default";
import AddQuery from "src/components/@vc-product/add-query";
import PN from "../../../assets/images/pn.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setStartTour, setFinishTour } from "src/stores/dashboard";
const stepsList = [
  {
    id: 1,
    title: "Choose Your Use Case",
    description:
      "Select the specific use case that best fits your needs, such as IP Analysis, Market Research, or Competitive Landscape.",
  },
  {
    id: 2,
    title: "Select Interaction Mode",
    description:
      "Choose from guided Q&A, document upload, or quick prompts to provide your requirements.",
  },
  {
    id: 3,
    title: "Enter Details for Your Report",
    description: "Provide all necessary details using your chosen interaction mode.",
  },
  {
    id: 4,
    title: "Get Your Detailed Report in 48 Hours",
    description: "Receive your custom, detailed report within 48 hours via email.",
  },
];

export default function Landing() {
  const runTour = useAppSelector((state) => state.dashboard.startTour);
  const finishTour = useAppSelector((state) => state.dashboard.finishTour);
  const dispatch = useAppDispatch();

  const defaultPrompt = finishTour
    ? `And that’s it! You’re ready to explore. 
       If you need help, I’m always here!`
    : `
    Hey! 👋 Let’s get you familiar with Perceive Now. We'll walk 
     through two main sections: Know Now and Industry Reports. 
     Ready?
  `.trim();

  return (
    // <div className="h-[80vh] flex justify-center items-center">
    //   <div className="flex flex-row w-fit space-x-1 h-[500px] items-end">
    //     <div className="w-full max-w-[340px]  2xl:max-w-[500px] ">
    //       <div className="space-y-2">
    //         <Title text="Create" />
    //         <Title text="Your Perfect Report" />
    //         <Title text="in 4 Easy Steps!" />
    //       </div>

    //       <Link to="/new-report">
    //         <Button type="primary" classname="mt-[20px] w-[300px]">
    //           Continue
    //         </Button>
    //       </Link>

    //       <div className="mt-4 lg:mt-8 xl:mt-12">
    //         <LandingMark />
    //       </div>
    //     </div>

    //     <div className="text-white space-y-1 ">
    //       <StepWrapper className="ml-[0px]">
    //         <ContentWrapper className="justify-start">
    //           <NumberCircle number={1} className="text-primary-900 ml-[30px] mr-1" />
    //           <TextBlock
    //             className="max-w-[270px]"
    //             title={stepsList[0].title}
    //             description={stepsList[0].description}
    //           />
    //         </ContentWrapper>
    //         <BGVector0 className="z-0 row-start-1 col-start-1" />
    //       </StepWrapper>

    //       <StepWrapper className="ml-[30px] xl:ml-[90px]">
    //         <ContentWrapper className="justify-end">
    //           <TextBlock
    //             className="max-w-[225px]"
    //             title={stepsList[1].title}
    //             description={stepsList[1].description}
    //           />
    //           <NumberCircle number={2} className="text-orange-500 mr-[30px] ml-1" />
    //         </ContentWrapper>
    //         <BGVector1 className="z-0 row-start-1 col-start-1" />
    //       </StepWrapper>

    //       <StepWrapper className="ml-[60px] xl:ml-[150px]">
    //         <ContentWrapper className="justify-start">
    //           <NumberCircle number={3} className="text-primary-900 ml-[30px] mr-1" />
    //           <TextBlock
    //             className="max-w-[240px]"
    //             title={stepsList[2].title}
    //             description={stepsList[2].description}
    //           />
    //         </ContentWrapper>
    //         <BGVector2 className="z-0 row-start-1 col-start-1" />
    //       </StepWrapper>

    //       <StepWrapper className="ml-[90px] xl:ml-[210px]">
    //         <ContentWrapper className="justify-end">
    //           <TextBlock
    //             className="max-w-[230px]"
    //             title={stepsList[3].title}
    //             description={stepsList[3].description}
    //           />
    //           <NumberCircle number={4} className="text-orange-500 mr-[30px] ml-1" />
    //         </ContentWrapper>
    //         <BGVector3 className="z-0 row-start-1 col-start-1" />
    //       </StepWrapper>
    //     </div>
    //   </div>
    // </div>
    <div className="h-[calc(100vh-160px)] px-3 w-full mx-auto flex flex-col">
      {!runTour && (
      <div className="flex">
        {/* <ReportDefault /> */}

        <div className="flex-1 flex items-center justify-center mt-5">
          <div className="flex flex-col items-center p-4">
            <div className="mb-3">
              <div className="h-8 w-8 rounded-full bg-appGray-100 flex items-center justify-center">
                <img className="h-5 w-5" src={PN} alt="Pn" />
              </div>
            </div>
            <div
              className={`rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer bg-appGray-100 min-w-[550px]`}
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
            {!finishTour && (
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
                onClick={() => {
                  dispatch(setFinishTour(true));
                }}
                className="px-4 py-2 border border-appGray-200 rounded-xl 
              hover:bg-primary-900 hover:text-white transition-colors duration-200"
              >
                Skip the tour
              </button>
            </div>
            )}
          </div>
        </div>

        {/* <div className="flex-grow">
        {chats && chats.length <= 0 ? (
          <div className="flex flex-row justify-between flex-grow mb-[300px]">
            <ReportDefault setQuery={setQuery} query={query} />
          </div>
        ) : (
          // <div className="flex justify-center items-center h-[650px] mb-5">
          //   <div
          //     ref={chatRef}
          //     className="bg-white rounded-lg p-3 w-[73%] h-[650px] overflow-y-auto pn_scroller shadow-lg"
          //   >
          //     <div className="">
          //       {chats.map((chat, idx) => (
          //         <>
          //           <ChatQuery query={chat.query} />
          //           <QueryAnswer
          //             ido={`chat-[${idx}]`}
          //             query={chat.query}
          //             answer={chat.answer}
          //             isLoading={isLoading}
          //             message_id={chat.id}
          //             hasselected={chat.hasselected || ""}
          //             hasbutton={chat.hasbutton || false}
          //             handleClick={handleClick}
          //           />
          //         </>
          //       ))}
          //     </div>
          //   </div>
          // </div>
        )}
      </div> */}
      </div>
      )}
      <div className="flex items-center justify-center mt-auto w-[800px] ml-[300px]">
      <AddQuery query="" answer="" sendQuery={()=>{console.log("")}} setanswer={()=>{console.log("")}} />
      </div>
    </div>
  );
}

const StepWrapper = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <div className={classNames("grid grid-cols-1 grid-rows-1 items-center max-w-[450px]", className)}>
    {children}
  </div>
);

const ContentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div
    className={classNames(
      "z-10 flex flex-row items-center row-start-1 col-start-1 max-w-[455px]",
      className,
    )}
  >
    {children}
  </div>
);

const NumberCircle = ({ number, className }: { number: number; className: string }) => (
  <div
    className={classNames(
      "w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center font-bold text-4xl",
      className,
    )}
  >
    {number}
  </div>
);

const TextBlock = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) => (
  <div className={classNames(className)}>
    <p className="text-lg font-bold">{title}</p>
    <p className="text-[12.8px] font-semibold">{description}</p>
  </div>
);

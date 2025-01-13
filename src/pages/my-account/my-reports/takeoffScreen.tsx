import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PN from "../../../assets/images/pn.svg";
import RightArrow from "src/components/icons/common/right-arrow";
import messages from "./_constants/messages";
import mainLogo from '../../../assets/images/logo-small.svg';

import backgroundImage from "./_assets/background.png";
import pnCloveSvg from "src/assets/images/pn_clove.svg";

const TakeoffScreen: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<string[]>([]); // Define state type as string[]

  useEffect(() => {
    const randomMessages = () => {
      const randomIndices = new Set<number>();
      while (randomIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        randomIndices.add(randomIndex);
      }
      setCurrentMessages(Array.from(randomIndices).map((index) => messages[index]));
    };

    // Set the initial messages
    randomMessages();

    // Change messages every 5 seconds
    const intervalId = setInterval(randomMessages, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex relative justify-between items-center">
      <div className="my-auto px-3 w-full mx-auto flex flex-col justify-start flex-[1.5]">
        {/* <img
          src={pnCloveSvg}
          alt="Perceive Now"
          className="absolute bottom-0 -left-[18%] w-[80%] h-[80%] opacity-10 z-0"
        /> */}
        <div className="flex justify-between w-full px-6 max-w-[600px] mx-auto py-4 flex-1">
          <div className="flex flex-col ml-6 w-full mt-[25%]">
          <img src={mainLogo} className="w-10" />
            <h1 className="text-[20px] font-bold mb-3 mt-3 font-nunito">
              🎉 Your Report is Almost Ready!
            </h1>
            <p className="text-lg mb-2 font-mulish font-normal">
              Your report will be ready in just 48 hours. If you have any questions or need a hand
              in the meantime, don’t hesitate to ask—we’re here to help! 💬😊 
            </p>
            {/* <p className="text-lg mb-4 font-mulish font-normal">
              If you need a word with us in the meantime - reach out to us.
            </p> */}

            <div className="flex gap-2 justify-start z-10">
              <Link to="/my-projects" className="cursor-pointer z-1">
                <div className="flex items-center justify-center border-4 bg-secondary-500 border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white font-bold">
                  Go Home
                  <RightArrow className="w-2 h-2 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="min-h-screen flex-[1] items-center justify-center w-full p-3"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        <div className="mt-[25%]">
          <div className="flex flex-col gap-4 items-center">
            {currentMessages.map((message, index) => (
              <p key={index} className={`text-gray-800 font-semibold text-lg fade-in`}>
                {message}
              </p>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TakeoffScreen;

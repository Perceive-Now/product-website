import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RightArrow from "src/components/icons/common/right-arrow"; // Ensure this path is correct
import messages from "./_constants/message"; // Adjust this import if necessary
import backgroundImage from "../_assets/background.png"; // Make sure this path is correct

const SignupWelcome: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<string[]>([]);

  useEffect(() => {
    const randomMessages = () => {
      const randomIndices = new Set<number>();
      while (randomIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        randomIndices.add(randomIndex);
      }
      setCurrentMessages(Array.from(randomIndices).map(index => messages[index]));
    };

    // Set the initial messages
    randomMessages();
    
    // Change messages every 5 seconds
    const intervalId = setInterval(randomMessages, 5000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="min-h-screen px-3 w-full mx-auto flex flex-col justify-start flex-[1.5]">
        <div className="flex justify-between w-full px-6 max-w-[600px] py-4 flex-1">
          <div className="flex flex-col ml-6 w-full mt-[25%]">
            <h1 className="text-4xl font-bold mb-3 font-nunito">
              Welcome 🎉
            </h1>
            <p className="text-lg mb-2 font-mulish font-normal">
              We’re excited to get you started. This is the first step in setting up your account.
            </p>
            <p className="text-lg mb-4 font-mulish font-normal">
              You'll be guided through a few simple steps to personalize your experience.
            </p>

            <div className="flex gap-2 justify-end">
              <Link to="/signup/organization-setting"> {/* Change the path as needed */}
                <div className="flex items-center justify-center border-4 bg-secondary-500 border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white font-bold">
                  Let’s get started
                  <RightArrow className="w-2 h-2 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex-[1] items-center justify-center w-full p-3"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        <div className="mt-[25%]">
          <div className="flex flex-col gap-4">
            {currentMessages.map((message, index) => (
              <p key={index} className={`text-gray-800 font-semibold text-lg fade-in`}>
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupWelcome;
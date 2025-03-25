import React, { useState, useEffect } from "react";
import RightArrow from "src/components/icons/common/right-arrow";
import PrimaryButton from "src/components/reusable/button/primary-button";
import pnCloveSvg from "src/assets/images/pn_clove.svg";
import backgroundImage from "./_assets/background.jpeg";
import giftBoxSvg from "./_assets/gift-box.svg";
import tooltips from "./_data/tooltip"; // Import the tooltips array
import { useNavigate } from "react-router-dom";

const ReportSection = () => {
  const navigate = useNavigate();
  const [currentTip, setCurrentTip] = useState(
    tooltips[Math.floor(Math.random() * tooltips.length)],
  );
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentTip(tooltips[Math.floor(Math.random() * tooltips.length)]);
        setFade(false);
      }, 500); // Delay for fade-out animation
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-[1] px-5 py-3 flex-col items-start justify-evenly max-w-full h-[700px]">
        <div>
          <h1 className="text-5xl font-bold text-[#373D3F]">
            Your Report is
            <br /> On It's Way
          </h1>
          <p className="mt-2 text-base font-light">
            Your report will be ready within 24 to 48 hours.
          </p>
          <div className="mt-7 w-full flex justify-end">
            <PrimaryButton text="Go to Home" icon={<RightArrow />} onClick={() => navigate("/")} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 font-light">
          <img src={pnCloveSvg} alt="Clove" className="w-[3rem] h-[3rem]" />
          <div className="text-[15px]">
            If you need a word with us in the meantime -<br /> reach out to us.
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-[1.2] min-h-screen rounded-xl bg-red-50 relative">
        <img src={backgroundImage} alt="background" className="object-cover w-full h-full" />
        <div className="absolute top-0 left-0 right-0 m-auto">
          <img
            src={giftBoxSvg}
            alt="giftbox"
            className="w-[300px] h-[300px] scale-125 m-auto relative"
          />
          {/* <p
            className={`absolute text-sm top-[180px] left-[230px] font-bold m-auto w-[200px] h-[200px] text-[#442873] transition-opacity duration-500 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          > */}
          {/* <p
            className={`absolute text-sm left-0 right-0 top-[60%] font-bold pl-[35px] mx-auto w-[210px] h-[200px] text-[#442873] transition-opacity duration-500 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          > */}
           <p
            className={`absolute text-sm left-[45px] right-0 top-[60%] font-bold mx-auto w-[210px] h-[200px] text-[#442873] transition-opacity duration-500 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentTip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;

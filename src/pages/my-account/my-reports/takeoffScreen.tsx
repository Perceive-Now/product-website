import React from "react";
import { Link } from "react-router-dom";
import PN from "../../../assets/images/pn.svg";

const TakeoffScreen = () => {
  return (
    <div className="h-[calc(100vh-160px)] px-3 w-full mx-auto flex flex-col justify-center items-center">
      <div className="flex items-center justify-between w-full max-w-xl px-6 py-4">
        <div className="flex flex-col ml-6 w-full">
          <div className="h-16 w-16 rounded-full flex mb-2">
            <img className="h-10 w-10" src={PN} alt="Pn" />
          </div>
          <h1 className="text-xl font-semibold mb-3 font-nunito">🎉 Your Report Is On Its Way!</h1>
          <p className="text-base mb-4 font-mulish font-normal">
            Finalizing your report takes up to 48 hours. Got questions or need anything else while
            you wait? We’re just a click away!💬😊
          </p>

          <div className="flex gap-2">
            <Link to="/my-projects">
              <div className="border border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito">
                Go Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeoffScreen;

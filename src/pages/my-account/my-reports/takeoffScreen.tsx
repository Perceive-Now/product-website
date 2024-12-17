import React from 'react'
import { Link } from 'react-router-dom'
import PN from "../../../assets/images/pn.svg";

const TakeoffScreen = () => {
  return (
    <div className="h-[calc(100vh-160px)] px-3 w-full mx-auto flex flex-col justify-center items-center">
    <div className="flex items-center justify-between w-full max-w-xl px-6 py-4">
      <div className="flex flex-col ml-6 w-full">
        <div className="h-16 w-16 rounded-full flex mb-2">
          <img className="h-10 w-10" src={PN} alt="Pn" />
        </div>
        <h1 className="text-xl font-semibold mb-3 font-nunito">
        🎉 Your Report is Almost Ready!
        </h1>
        <p className="text-base mb-4 font-mulish font-normal">
        Your report will be ready in just 48 hours. If you have any questions or need a hand in the meantime, don’t hesitate to ask—we’re here to help! 💬😊
        </p>

        <div className="flex gap-2">
          <Link to="/">
            <div className="border border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito">
              Go to home
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
    )
}

export default TakeoffScreen
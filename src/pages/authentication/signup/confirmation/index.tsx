import EmailIcon from "../../../../components/icons/common/email";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Button from "src/components/reusable/button";
import perceiveNowImage from "src/assets/images/pn.svg";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import quotes from "./_constants/quote";

import pnCloveSvg from "src/assets/images/pn_clove.svg";

import backgroundImage from "../_assets/background.png";

interface IConfirmEmail {
  verification_code: string;
}

const VerificationConfirm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0); // State for current quote index
  const formInitialValue: IConfirmEmail = {
    verification_code: "",
  };

  const formResolver = yup.object().shape({
    verification_code: yup.string().required("Code is required"),
  });

  const {
    formState: { errors },
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        setUser(user);

        if (user?.registration_completed) {
          navigate("/signup/welcome", {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % Math.ceil(quotes.length / 3));
    }, 5000); // Change quote every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleProceed = async () => {
    try {
      if (!user?.registration_completed) {
        toast.error("Please confirm your email address to proceed.", {
          position: "top-right",
        });
        return;
      }
      navigate("/signup/welcome", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again", {
        position: "top-right",
      });
    }
  };

  const getCurrentQuotes = () => {
    const start = quoteIndex * 3;
    return quotes.slice(start, start + 3);
  };

  return (
    <div className="flex relative justify-center items-start min-h-screen bg-gradient-to-b from-white to-[#F7F5FF]">
      <img src={pnCloveSvg} alt="Perceive Now" className="w-[75%] h-[75%] absolute -left-[18%] bottom-0 opacity-10 mt-5" />
      <div className="flex flex-col items-center flex-1 xl:flex-[1.5] xl:max-w-full max-w-[600px]">
        <div className="flex flex-col gap-y-2 min-h-screen bg-gray-200 w-full justify-center xl:pl-[10%]">
          {/* <div>
            <img src={perceiveNowImage} alt="welcome" className="w-[3rem] h-[3rem]" />
          </div> */}
          <h1 className="text-5xl font-bold font-nunito">Great!</h1>

          <p className="text-left text-[#373D3F] font-semibold">
            An email with a confirmation link has been sent to you.
          </p>
          <p className="text-[#373D3F] font-semibold mt-[0.5] cursor-pointer">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://mail.google.com/mail/u/0/#inbox"
              className="text-inherit underline"
            >
              Check your inbox
            </a>{" "}
            and complete your signup process. <span className="underline"
              onClick={handleProceed}
            >Proceed</span>
          </p>

          <div className="flex flex-col text-gray-700 mt-[10%]">
            <p className="">Didn&apos;t receive your email?</p>
            <p className="">
              Check your spam folder or try{" "}
              <a href="#" className="underline text-inherit">
                resending
              </a>
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex-col hidden xl:flex xl:flex-1 justify-center gap-8 xl:min-h-screen p-3"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
      >
        {getCurrentQuotes().map((quote, index) => (
          <p
            key={index}
            className={`text-left font-bold ${index % 2 === 0 ? "text-left" : "text-right"}`}
          >
            {quote}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VerificationConfirm;

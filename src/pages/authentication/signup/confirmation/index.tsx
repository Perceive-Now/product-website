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
          navigate("/signup/success", {
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
      navigate("/signup/success", {
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
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] p-2">
    <div className="max-w-[400px] mt-[30vh] 2xl:mt-[20vh]">
      <div className="flex flex-col gap-y-2">
        <div>
          <img src={perceiveNowImage} alt="welcome" className="w-[3rem] h-[3rem]" />
        </div>
        <p className="text-left text-[#373D3F] font-semibold">
          Great! 🎉 We’ve sent you a link to continue
          <br /> signing up.
        </p>
        <p
          className="text-[#373D3F] font-semibold mt-[0.5] cursor-pointer"
          onClick={() => navigate("/signup/success")}
        >
          📩 Check your inbox!
        </p>
      </div>
      {/* <div className="text-center w-full">
        <p className="text-secondary-800 ">drake@example.com</p>
        <div className="relative w-1/4 mx-auto">
          <input
            type="text"
            className={classNames(
              "block pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-900 peer",
              errors.verification_code
                ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
            )}
            placeholder=" "
          />
        </div>
        <p className="text-center mt-2.5">
          <span>Didn't receive the email?</span>
          <Button type="default" classname="text-primary-500">
            Resend
          </Button>
        </p>
      </div> */}
    </div>
  </div>
  );
};

export default VerificationConfirm;

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

//
import backgroundImage from "../_assets/background.png";
import mailboxSvg from "./_assets/mailbox.svg";
import paperPlaneSvg from "./_assets/paper-plane.svg";
import { Link } from "react-router-dom";

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
    <div className="flex justify-between items-start h-screen lg:h-[calc(100vh-100px)] bg-gradient-to-b from-white to-[#F7F5FF]">
      <div className="flex-[1] flex flex-col justify-center max-w-[400px] mt-[30vh] 2xl:mt-[20vh] mx-auto">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[#373D3F] text-5xl font-bold">Great!</h1>
          <div className="text-center my-4">
            <img src={mailboxSvg} alt="welcome" className="w-[5rem] h-[5rem] mx-auto" />
          </div>
          <p className="text-left text-[#373D3F] font-semibold">
            An email with a confirmation link has been sent to you. Check your inbox and complete
            your signup
          </p>
        </div>

        <div className="flex items-end gap-x-2 mt-10 text-sm">
          <img src={pnCloveSvg} alt="Perceive Now" className="w-[2rem]" />
          Didn&apos;t receive the email? <br />
          Check your spam folder or try resending
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
      <div
        className="flex flex-col flex-[0.5] relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center">
            <img
              src={paperPlaneSvg}
              alt="welcome"
              className="scale-90 absolute left-5 bottom-[25%]"
            />
          </div>
          <div className="absolute bottom-[20%] max-w-lg">
            <p className="text-[#373D3F] text-base font-bold">{getCurrentQuotes()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationConfirm;

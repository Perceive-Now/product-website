import EmailIcon from "../../../../components/icons/common/email";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Button from "src/components/reusable/button";

// image
import perceiveNowImage from "src/assets/images/pn.svg";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface IConfirmEmail {
  verification_code: string;
}

const VerificationConfirm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
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
          navigate("/signup/organization-setting", {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleProceed = async () => {
    try {
      if (!user?.registration_completed) {
        toast.error("Please confirm your email address to proceed.", {
          position: "top-right",
        });
        return;
      }
      navigate("/signup/organization-setting", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again", {
        position: "top-right",
      });
    }
    // navigate("/signup/organization-setting");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-white to-[#F7F5FF] p-2">
      <div className="max-w-[600px] mt-[30vh] 2xl:mt-[20vh]">
        <div className="flex flex-col gap-y-2">
          <div>
            <img src={perceiveNowImage} alt="welcome" className="w-[3rem] h-[3rem]" />
          </div>
          <p className="text-left text-[#373D3F] font-semibold">
            Great! 🎉 We’ve sent you a link to continue
            <br /> signing up.
          </p>
          <p className="text-[#373D3F] font-semibold mt-[0.5] cursor-pointer">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://mail.google.com/mail/u/0/#inbox"
              className="text-inherit hover:underline"
            >
              📩 Check your inbox!
            </a>
          </p>
          <p className="mt-2 text-[#373D3F] font-semibold">
            Confirmed your email address?
            <span
              className="mx-1 underline text-primary-500 cursor-pointer"
              onClick={handleProceed}
            >
              Proceed to the next step
            </span>
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

import EmailIcon from "../../../../components/icons/common/email";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Button from "src/components/reusable/button";

// image
import perceiveNowImage from "src/assets/images/pn.svg";
import { useNavigate } from "react-router-dom";

interface IConfirmEmail {
  verification_code: string;
}

const VerificationConfirm = () => {
  const navigate = useNavigate();
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

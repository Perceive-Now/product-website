import EmailIcon from "../../../../components/icons/common/email";
import Button from "../../../../components/reusable/button";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface IConfirmEmail {
  verification_code: string;
}

const VerificationConfirm = () => {
  const formInitialValue: IConfirmEmail = {
    verification_code: "",
  };

  const formResolver = yup.object().shape({
    username: yup
      .string()
      // .username("Username is required")
      .required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <EmailIcon />
      <p className="text-center text-secondary-800">
        A confirmation link has been sent to the following email address.
        <br />
        Please check your inbox and follow the instruction.
      </p>
      <div className="text-center w-full">
        <p className="text-secondary-800 ">drake@example.com</p>
        <div className="relative w-1/4 mx-auto">
          <input
            type="text"
            className="block pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-900 peer"
            placeholder=" "
          />
        </div>
        <p className="text-center mt-2.5">
          <span>Didn't receive the email?</span>
          <Button type="default" classname="text-primary-500">
            Resend
          </Button>
        </p>
      </div>
    </div>
  );
};

export default VerificationConfirm;

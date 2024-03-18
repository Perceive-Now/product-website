import React from "react";
import EmailIcon from "../../../../components/icons/common/email";
import { Link } from "react-router-dom";
import Button from "../../../../components/reusable/button";

const VerificationConfirm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <EmailIcon />
      <p className="text-center text-secondary-800">
        A confirmation link has been sent to the following email address.
        <br />
        Please check your inbox and follow the instruction.
      </p>
      <div className="text-center">
        <p className="text-secondary-800 ">drake@example.com</p>
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

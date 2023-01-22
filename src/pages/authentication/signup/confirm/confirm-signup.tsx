import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//
import { ErrorIcon, LoadingIcon } from "../../../../components/icons";

//
import axiosInstance from "../../../../utils/axios";

//
import Logo from "../../../../assets/images/logo-small.svg";

//
export default function ConfirmSignup() {
  const navigage = useNavigate();

  //
  const [searchParams] = useSearchParams();
  const [uid, token] = [searchParams.get("uid"), searchParams.get("token")];

  //
  const [status, setStatus] = useState<status>("loading");

  //
  const activateAccount = async () => {
    if (!uid || !token) navigage("/login");

    //
    try {
      await axiosInstance.post("/api/v1/user/activation/", { uid, token });

      //
      toast.success("Your account has been successfully activated!");

      //
      navigage("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      setStatus("error");
    }
  };

  //
  useEffect(() => {
    activateAccount();
  }, []);

  //
  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <div className="w-full max-w-[480px] min-h-[250px] flex flex-col justify-start items-stretch text-center">
        <div className="flex justify-center mb-5">
          <img
            src={Logo}
            width={76}
            height={60}
            alt="PerceiveNow logo"
            className="w-9 h-8 object-contain"
          />
        </div>

        {status === "loading" && (
          <div className="flex flex-col justify-center items-center gap-y-1">
            <p>Please wait while we active your account</p>
            <LoadingIcon width={40} height={40} className="text-primary-600" />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2">
              <p className="text-gray-600">Unable to verify your account</p>
              <p className="leading-5 mt-1 text-gray-700">
                Please make sure to used the link sent by us directly to your mail address!
              </p>
            </div>

            <ErrorIcon width={56} height={56} className="text-red-700" />
          </div>
        )}
      </div>
    </div>
  );
}

//
type status = "loading" | "error" | "success";

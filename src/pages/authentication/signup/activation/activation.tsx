import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../../../assets/images/logo-small.svg";
import { LoadingIcon } from "../../../../components/icons";
import { ErrorIcon } from "../../../../components/icons";
import { activateUser } from "../../../../utils/api/auth";

/**
 *
 */
export default function ActivationPage() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function handleActivation() {
      if (!uid || !token) return alert("User id or token is invalid");

      const response = await activateUser({ uid, token });

      if (response.success) {
        navigate("/login");
      } else {
        setHasError(true);
        alert(response.message);
      }
    }

    handleActivation();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <div className="w-full max-w-[480px] min-h-[250px] flex flex-col justify-between items-stretch text-center">
        <div className="flex justify-center">
          <img
            src={Logo}
            width={76}
            height={60}
            alt="PerceiveNow logo"
            className="w-9 h-8 object-contain"
          />
        </div>
        {hasError ? (
          <div className="flex items-center justify-center flex-col">
            <ErrorIcon className="text-red-500" width={50} height={50} />
            <div className="text-red-500">Something went wrong! Try again</div>
          </div>
        ) : (
          <div>
            <div>Your account is being activated.</div>

            <div className="flex justify-center items-center mt-2">
              <LoadingIcon width={48} height={48} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

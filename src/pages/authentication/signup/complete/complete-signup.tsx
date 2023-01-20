//
import PerceiveLogo from "../../../../assets/images/logo.svg";

//
export default function CompleteSignup() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex w-full px-4 py-3 bg-gray-100">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </div>

      <div className="grow flex justify-center items-center px-4 py-7">
        <p>Actual content here</p>
      </div>
    </div>
  );
}

import { useLocation } from "react-router-dom";
import DiskStepCounter from "./disk-step-counter";

export default function CircularCounter() {
  const location = useLocation();

  let number = 0;

  switch (location.pathname) {
    case "/new-report":
      number = 1;
      break;
    case "/interaction-method":
      number = 2;
      break;
    case "/upload-attachments":
    case "/q&a":
    case "/quick-prompt":
      number = 3;
      break;
    case "/payment":
      number = 4;
      break;
    default:
      break;
  }

  const boolArray = new Array(4).fill(null).map((_, index) => {
    return index < number ? true : false;
  });

  return (
    <>
      {number > 0 && (
        <div className="h-[50px] w-[50px] rounded-full place-items-center overflow-hidden mt-2 grid">
          <div className="col-start-1 row-start-1">
            <DiskStepCounter isPurple={boolArray} />
          </div>
          <div className="col-start-1 row-start-1 w-fit text-purple-600 text-xl font-bold">
            {number}
          </div>
        </div>
      )}
    </>
  );
}

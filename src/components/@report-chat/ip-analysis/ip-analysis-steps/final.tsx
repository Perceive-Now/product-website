import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  activeStep: number;
}

export default function IPFinal({ activeStep }: Props) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeStep === 444) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 1;
          if (nextProgress <= 100) {
            return nextProgress;
          } else {
            clearInterval(interval); // Stop the interval when progress reaches 100%
            navigate("/ip-analysis/full-report"); // Navigate to the next page
            return prevProgress; // Return the current progress (100%) to prevent further updates
          }
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [activeStep, navigate]);

  return (
    <div>
      <p className="text-xl text-gray-600 font-semibold text-center">
        Thank you for providing all the necessary information. I will now proceed with drafting the
        IP validity analysis report for SkinCheck. If you have any additional details or need
        further assistance, feel free to reach out. We'll ensure the report aligns with your
        objectives and the specifics of your invention.
      </p>
      <div className="mt-10">
        <div className="h-[80px] w-[80px] mx-auto">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="text-primary-900"
          />
        </div>
        {/* <CircleLoader percentage={10} /> */}
        {/* <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button> */}
      </div>
    </div>
  );
}

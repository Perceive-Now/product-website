import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/button";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPFinal({ changeActiveStep }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    // setTimeout(() => {
    //   navigate('/ip-landscaping/full-report')
    // }, 10000);
  }, [navigate]);

  const onContinue = useCallback(() => {
    navigate("/ip-landscaping/full-report");
  }, [navigate]);

  return (
    <div>
      <p className="text-xl text-gray-600 font-semibold text-center">
        Thank you for providing all the necessary information. I will now proceed with drafting the
        IP validity analysis report for SkinCheck. If you have any additional details or need
        further assistance, feel free to reach out. We'll ensure the report aligns with your
        objectives and the specifics of your invention.
      </p>
      <div className="">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

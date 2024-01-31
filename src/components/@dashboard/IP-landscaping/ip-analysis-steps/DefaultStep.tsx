import React, { FunctionComponent, useCallback, useState } from "react";
import KeywordSelected from "../KeywordSelected";
import Button from "../../../reusable/button";
import RadioButtons from "../../../reusable/radio-buttons";
import { setIPUseCase } from "../../../../stores/IpSteps";
import { useAppDispatch } from "../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState("ip-validity-analysis");

  const onContinue = useCallback(() => {
    dispatch(setIPUseCase({ label: active }));
    changeActiveStep(1);
  }, [active, changeActiveStep, dispatch]);
  //

  // const handleChange = ()=>{
  const handleChange = useCallback((mode: string) => {
    setActive(mode);
  }, []);

  return (
    <div className="xl:w-[620px h-[600px">
      <KeywordSelected />
      <h4 className="text-gray-600 text-4xl	mt-2.5">
        Please select one of the use cases and answer <br /> the subsequent questions.
      </h4>
      {/* <h6 className="text-secondary-800 mt-2">Let’s add more info to create your report</h6> */}
      <div className="flex mt-7 items-center">
        {
          // radioOptions.map(() => (
          <div>
            <RadioButtons
              options={radioOptions}
              activeMode={active}
              handleModeChange={handleChange}
              classNames={active ? "text-primary-500" : ""}
            />
          </div>
          // ))
        }
      </div>
      <div className="mt-7">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DefaultStep;

const radioOptions = [
  { label: "IP Validity Analysis", value: "ip-validity-analysis" },
  { label: "IP Licensing Opportunities", value: "ip-licensing-opportunity" },
  { label: "IP Landscaping & FTO", value: "ip-landscaping&fto" },
  { label: "Infringement Analysis", value: "infringement-analysis" },
];

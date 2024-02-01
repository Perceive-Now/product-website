import { FunctionComponent, useCallback, useState } from "react";
import KeywordSelected from "../KeywordSelected";
//
import Button from "../../../reusable/button";
import RadioButtons from "../../../reusable/radio-buttons";
//
import { setIPUseCase } from "../../../../stores/IpSteps";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const radio_active =
    useAppSelector((state) => state.ipData.use_case.label) ?? "IP Validity Analysis";
  const [defaultValue] = radioOptions.filter((r) => r.label === radio_active);
  const [active, setActive] = useState(defaultValue.value);
  //
  const onContinue = useCallback(() => {
    const [value] = radioOptions.filter((r) => r.value === active);
    dispatch(setIPUseCase({ label: value.label }));
    changeActiveStep(1);
  }, [active, changeActiveStep, dispatch]);
  //

  const handleChange = useCallback((mode: string) => {
    setActive(mode);
  }, []);

  return (
    <div className="xl:w-[620px h-[600px">
      <KeywordSelected />
      <h4 className="text-gray-600 text-4xl	mt-2.5">
        Please select one of the use cases and answer <br /> the subsequent questions.
      </h4>
      <div className="flex mt-7 items-center">
        {
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

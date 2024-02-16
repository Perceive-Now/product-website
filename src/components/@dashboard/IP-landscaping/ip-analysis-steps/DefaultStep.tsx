import { FunctionComponent, useCallback, useState } from "react";
import KeywordSelected from "../KeywordSelected";
//
import Button from "../../../reusable/button";
import RadioButtons from "../../../reusable/radio-buttons";
//
import { setIPUseCase } from "../../../../stores/IpSteps";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import MultipleCheckbox from "../../../reusable/multiple-checkbox";
import CheckBoxButtons from "../../../reusable/checkbox/checkbox";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const radio_active =
    useAppSelector((state) => state.ipData.use_case.label) ?? "IP Validity Analysis";
  const [defaultValue] = radioOptions.filter((r) => r.label === radio_active);
  // const [active, setActive] = useState<any>({});
  const [selected, setSelected] = useState<any>([]);
  //
  const onContinue = useCallback(() => {
    // const [value] = radioOptions.filter((r) => r.value === active);
    dispatch(setIPUseCase(selected));
    changeActiveStep(1);
  }, [changeActiveStep, dispatch, selected]);
  //

  const handleChange = useCallback((mode: any) => {
    setSelected(mode);
  }, []);

  return (
    <div className="xl:w-[620px h-[600px">
      {/* <KeywordSelected /> */}
      <p className="text-gray-600 text-xl font-semibold">Please select use case for your report.</p>
      <div className="mt-5 items-center">
        <CheckBoxButtons
          options={radioOptions}
          activeModes={selected}
          handleModeChange={handleChange}
          classNames={{
            component: "flex flex-col gap-1",
            label: "font-semibold text-primary-900",
          }}
        />
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

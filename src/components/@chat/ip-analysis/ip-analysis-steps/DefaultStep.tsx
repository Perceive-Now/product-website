import { FunctionComponent, useCallback, useState } from "react";
//
import Button from "../../../reusable/button";
//
import { useAppDispatch } from "../../../../hooks/redux";
import CheckBoxButtons from "../../../reusable/checkbox/checkbox";
import { setUseCase } from "../../../../stores/use-case";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  //
  const onContinue = useCallback(() => {
    if (selected.length > 0) {
      if (selected[0] === "infringement-analysis") {
        jsCookie.set("questionId", String(34));
      } else if (selected[0] === "ip-licensing-opportunity") {
        jsCookie.set("questionId", String(12));
      } else if (selected[0] === "ip-landscaping&fto") {
        jsCookie.set("questionId", String(25));
      } else {
        jsCookie.set("questionId", String(1));
      }

      dispatch(setUseCase({ usecases: selected }));
      changeActiveStep(1);
      setError("");
    } else {
      setError("Please select one of the use cases");
    }
  }, [changeActiveStep, dispatch, selected]);
  //

  // checkbox selection
  const handleChange = useCallback(
    (mode: string[]) => {
      setError("");
      if (mode.includes("all")) {
        if (selected.length >= 4) {
          const filteredOptions = radioOptions.filter(
            (option) => mode.includes(option.value) && option.value !== "all",
          );
          setSelected(filteredOptions.map((option) => option.value));
        } else {
          setSelected(radioOptions.map(({ value }) => value));
        }
      } else {
        if (!mode.includes("all") && selected.length >= 4) {
          setSelected([]);
        } else if (mode.length >= 4) {
          setSelected(radioOptions.map(({ value }) => value));
        } else {
          setSelected(mode);
        }
      }
    },
    [selected],
  );

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
        {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
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
  { label: "Include all use cases", value: "all" },
  { label: "IP Validity Analysis", value: "ip-validity-analysis" },
  { label: "IP Licensing Opportunities", value: "ip-licensing-opportunity" },
  { label: "IP Landscaping & FTO", value: "ip-landscaping&fto" },
  { label: "Infringement Analysis", value: "infringement-analysis" },
];

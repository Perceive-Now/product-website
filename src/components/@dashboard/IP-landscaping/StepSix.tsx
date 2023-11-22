import { FunctionComponent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//
import MultipleCheckbox from "../../reusable/multiple-checkbox";

//
import KeywordSelected from "./KeywordSelected";
import Button from "../../reusable/button";

interface Props {
  changeActiveStep: (steps: number) => void;
}

/**
 *
 */
const StepSix: FunctionComponent<Props> = ({ changeActiveStep }) => {
  //
  const [checkboxValues, setCheckboxValues] = useState({
    industry: false,
    university: false,
    both: false,
  });

  const handleCheckboxChange = (checkboxId: string) => {
    if (checkboxId === "both") {
      setCheckboxValues((prevValues) => {
        const allChecked = !prevValues.both;
        return {
          industry: allChecked,
          university: allChecked,
          both: allChecked,
        };
      });
    } else {
      // If other checkboxes are checked, update only the clicked checkbox
      setCheckboxValues((prevValues) => ({
        ...prevValues,
        [checkboxId]: !prevValues[checkboxId as keyof typeof prevValues],
      }));
    }
  };
  //
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: formInitialValue,
    // resolver: yupResolver(formResolver),
    // mode: "onBlur",
  });

  //
  const onContinue = useCallback(() => {
    changeActiveStep(7);
    // const three_value = {
    //   organization: checkboxValue || [],
    //   competitor: keyword || [],
    // };
    // ;
    // dispatch(setIPOrganization(three_value));
  }, [changeActiveStep]);

  // const onChange = (value: any) => {
  //   setCheckboxValue(value);
  // };

  return (
    <div className="">
      <KeywordSelected />
      <div className="mt-4">
        <h4 className="text-gray-600 text-4xl">
          What is your <b>focus area</b>?
        </h4>
        <p className="text-secondary-800 mb-4">Can be industries, universities or both.</p>
      </div>
      <form onSubmit={handleSubmit(onContinue)}>
        <div className="space-y-2">
          <fieldset className="">
            <div className="flex items-center">
              <input
                id={"industry"}
                checked={checkboxValues.industry}
                onChange={() => handleCheckboxChange("industry")}
                // value={data.value}
                // onChange={handleOnChange}
                // checked={value.some((item) => item.value === data.value && item.label === data.label)}
                type="checkbox"
                className="w-2 h-2 text-primary-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
              />
              <label htmlFor="industry" className="ml-1 text-sm font-medium text-gray-500 ">
                {/* {data.label} */}
                Industry
              </label>
            </div>
          </fieldset>
          <fieldset className="flex items-center">
            <input
              id={"university"}
              checked={checkboxValues.university}
              onChange={() => handleCheckboxChange("university")}
              // value={data.value}
              // onChange={handleOnChange}
              // checked={value.some((item) => item.value === data.value && item.label === data.label)}
              type="checkbox"
              className="w-2 h-2 text-primary-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
            />
            <label htmlFor="university" className="ml-1 text-sm font-medium text-gray-500 ">
              {/* {data.label} */}
              University
            </label>
          </fieldset>
          <fieldset className="flex items-center">
            <input
              id={"both"}
              checked={checkboxValues.both}
              onChange={() => handleCheckboxChange("both")}
              // value={data.value}
              // onChange={handleOnChange}
              // checked={value.some((item) => item.value === data.value && item.label === data.label)}
              type="checkbox"
              className="w-2 h-2 text-primary-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
            />
            <label htmlFor="both" className="ml-1 text-sm font-medium text-gray-500 ">
              {/* {data.label} */}
              Both
            </label>
          </fieldset>
        </div>

        <div className=" gap-x-4 mt-6">
          {/* <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(2)}>
          Go Backyarn
        </Button> */}
          <Button htmlType={"submit"} rounded={"large"}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepSix;

const topics = [
  { label: "Industry", value: "industry" },
  { label: "University", value: "university" },
  { label: "Both", value: "both" },
];

import { FunctionComponent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
//

import Button from "../../reusable/button";
// import DateRangePick from "../../reusable/date-range";
import RadioButtons from "../../reusable/radio-buttons";

//
import KeywordSelected from "./KeywordSelected";

//
//
type selectDate = "recent" | "specific";

// interface IDate {
//   start_date: string;
//   end_date: string;
// }

interface Props {
  changeActiveStep: (steps: number) => void;
}

/**
 *
 */
const StepFive: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const [date, setDate] = useState<selectDate>("recent");
  // const [setValues] = useState<IDate>('');
  //

  const dateOptions = (mode: string) => {
    setDate(mode as selectDate);
  };

  //
  const {
    // register,
    // formState: { errors },
    handleSubmit,
  } = useForm({
    // defaultValues: formInitialValue,
    // resolver: yupResolver(formResolver),
    // mode: "onBlur",
  });

  //
  const onContinue = useCallback(() => {
    //   const objective = values.objective;
    //   const start_date = valueDate?.start_date !== undefined ? valueDate.start_date : "";
    //   const end_date = valueDate?.end_date !== undefined ? valueDate.end_date : "";
    //   const two_values = { objective, start_date, end_date };
    changeActiveStep(6);
    // dispatch(setIPObjectives(two_values));
  }, [changeActiveStep]);

  return (
    <div className="">
      <div>
        <KeywordSelected />
        <div className="mt-4">
          <h4 className="text-gray-600 text-4xl	">
            Which states do you want to cover in this analysis?
          </h4>
        </div>
      </div>
      <form onSubmit={handleSubmit(onContinue)}>
        <fieldset className="mt-3">
          <h6 className="text-secondary-800 mb-4">
            All the related activities in selected period will be included in the report
          </h6>
          <RadioButtons
            activeMode={date}
            handleModeChange={dateOptions}
            options={[
              { label: "Past 10 years", value: "recent" },
              { label: "Custom", value: "specific" },
            ]}
            classNames={"text-sm"}
          />
          {/* <DateRangePick classification={date} getValues={setValues}/> */}
        </fieldset>

        <div className="mt-4">
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

export default StepFive;

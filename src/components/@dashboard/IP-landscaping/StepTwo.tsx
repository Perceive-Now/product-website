import { FunctionComponent, useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import * as yup from "yup";

//
import { IStepTwo } from "../../../@types/entities/IPLandscape";

//
import Button from "../../reusable/button";
import RadioButtons from "../../reusable/radio-buttons";
import DateRangePick from "../../reusable/date-range";
import CountryModal from "./CountryModal";

//
interface Props {
  changeActiveStep: (steps: number) => void;
}
type selectCountry = "all" | "custom";
type selectDate = "recent" | "specific";

/**
 *
 */
const StepTwo: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const [country, setCountry] = useState<selectCountry>("all");
  const [date, setDate] = useState<selectDate>("recent");
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [values, setValues] = useState<any>([]);

  //
  const countryOptions = (mode: string) => {
    if (mode === "custom") {
      setOpen(true);
    }
    setCountry(mode as selectCountry);
  };

  const dateOptions = (mode: string) => {
    setDate(mode as selectDate);
  };

  //
  const formInitialValue: IStepTwo = {
    objectives: "",
    from: "",
    to: "",
  };
  const formResolver = yup.object().shape({
    objectives: yup.string().required("Objectives is required"),
    // from: yup.string().required("Description is required"),
  });

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = useCallback((values: IStepTwo) => {
    console.log(values);
    changeActiveStep(3);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onContinue)}>
        {/* title */}
        <fieldset className="mt-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Objectives*
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={6}
                {...register("objectives")}
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.objectives
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Objectives"
              />
            </div>
          </label>
          {errors.objectives?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.objectives?.message}</div>
          )}
        </fieldset>
        <fieldset className="mt-3">
          <p>Geographical scope (US states of interest for the IP landscape)*</p>
          <RadioButtons
            activeMode={country}
            handleModeChange={countryOptions}
            options={[
              { label: "US all states", value: "all" },
              { label: "Custom", value: "custom" },
            ]}
            classNames={"text-sm"}
          />
        </fieldset>
        <fieldset className="mt-3">
          <p>Relevant time period for the analysis*</p>
          <RadioButtons
            activeMode={date}
            handleModeChange={dateOptions}
            options={[
              { label: "Past 10 years", value: "recent" },
              { label: "Custom", value: "specific" },
            ]}
            classNames={"text-sm"}
          />
          <DateRangePick classification={date} getValues={setValues} />
        </fieldset>

        <div className="flex justify-center gap-x-4 mt-4">
          <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(1)}>
            Go Back
          </Button>
          <Button htmlType={"submit"}>Continue</Button>
        </div>
      </form>
      <CountryModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default StepTwo;

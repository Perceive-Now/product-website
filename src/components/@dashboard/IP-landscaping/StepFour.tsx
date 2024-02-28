import { FunctionComponent, useCallback, useState } from "react";
import RadioButtons from "../../reusable/radio-buttons";
import KeywordSelected from "./KeywordSelected";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../reusable/button";
import { IUSState } from "../../../@types/entities/IPLandscape";
import USStateModal from "./StateModal";
import { ICheckBoxValue } from "../../../@types/utils/IExtras";
import { CrossIcon } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { removeState, setUSStates } from "../../../stores/US-states";

type selectState = "all" | "custom";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const StepFour: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const [states, setStates] = useState<selectState>("all");
  // const [stateInput, setStateInput] = useState<ICheckBoxValue[]>([])
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const stateInput = useAppSelector((state) => state.states.states || []);

  //
  const countryOptions = useCallback(
    (mode: string) => {
      if (mode === "custom") {
        setOpen(true);
      }

      if (stateInput.length === 0) {
        setStates("all");
      }
      setStates(mode as selectState);
    },
    [stateInput],
  );
  //

  const formInitialValue: IUSState = {
    state: [],
  };

  const {
    // register,
    // formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    // resolver: yupResolver(formResolver),
    // mode: "onBlur",
  });
  //
  const onContinue = useCallback(() => {
    changeActiveStep(5);
  }, [changeActiveStep]);

  const getStates = useCallback(
    (states: ICheckBoxValue[]) => {
      // setStateInput(states)
      dispatch(setUSStates(states));
    },
    [dispatch],
  );

  const removeStates = useCallback(
    (value: string | number) => {
      dispatch(removeState(value));
    },
    [dispatch],
  );

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
            Geographical scope (US states of interest for the IP landscape)
          </h6>
          <RadioButtons
            activeMode={states}
            handleModeChange={countryOptions}
            options={[
              { label: "US all states", value: "all" },
              { label: "Custom", value: "custom" },
            ]}
            classNames={"text-sm"}
          />
        </fieldset>
        {states === "custom" && stateInput.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {stateInput.map((state) => (
              <div
                key={state.value}
                className="flex items-center justify-between gap-x-1 border rounded-lg border-gray-600 py-1 px-2 "
              >
                {state.label}
                <button type="button" onClick={() => removeStates(state.value)}>
                  <CrossIcon width={"20px"} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          {/* <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(2)}>
            Go Backyarn
          </Button> */}
          <Button htmlType={"submit"} rounded={"large"}>
            Continue
          </Button>
        </div>
      </form>

      <USStateModal open={open} handleClose={() => setOpen(false)} stateInput={getStates} />
    </div>
  );
};

export default StepFour;

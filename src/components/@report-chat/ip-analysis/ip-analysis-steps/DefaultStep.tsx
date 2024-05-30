import { FunctionComponent, useCallback, useEffect, useState } from "react";
//
import Button from "../../../reusable/button";
//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import CheckBoxButtons from "../../../reusable/checkbox/checkbox";
import { setUseCase } from "../../../../stores/use-case";
// import { useLocation } from "react-router-dom";
import { UseCaseOptions } from "./__use-cases";
import { setSession } from "../../../../stores/session";
import { setUI } from "../../../../stores/UI";
import UseCaseSelectButton from "../../../reusable/usecase-select";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface OptionMappings {
  [key: string]: string;
}

/**
 *
 */
const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  // const { pathname } = useLocation();

  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const [error, setError] = useState("");

  //
  const onContinue = useCallback(() => {
    dispatch(setUI({ home: false }));
    if (selected.length > 0) {
      if (options.includes("ip-validity-analysis")) {
        dispatch(
          setSession({
            session_data: {
              ...sessionDetail,
              question_id: 6,
              active_index: 0,
              step_id: 3,
              use_cases: options,
              is_home: false,
            },
          }),
        );
      } else if (options.includes("ip-licensing-opportunity")) {
        dispatch(
          setSession({
            session_data: {
              ...sessionDetail,
              question_id: 12,
              step_id: 3,
              active_index: 0,
              use_cases: options,
              is_home: false,
            },
          }),
        );
      } else if (options.includes("ip-valuation")) {
        dispatch(
          setSession({
            session_data: {
              ...sessionDetail,
              question_id: 25,
              step_id: 3,
              use_cases: options,
              active_index: 0,
              is_home: false,
            },
          }),
        );
      } else {
        dispatch(
          setSession({
            session_data: {
              ...sessionDetail,
              question_id: 34,
              step_id: 3,
              use_cases: options,
              active_index: 0,
              is_home: false,
            },
          }),
        );
      }

      changeActiveStep(3);
      dispatch(setUseCase({ usecases: options }));
      setSelected([]);

      setError("");
    } else {
      setError("Please select one of the use cases");
    }
  }, [changeActiveStep, dispatch, options, selected.length, sessionDetail]);

  useEffect(() => {
    const optionMappings: OptionMappings = {
      // "freedom-to-operate": "ip-validity-analysis",
      "prior-art-search": "ip-validity-analysis",
      "patent-validity": "ip-validity-analysis",
      "patent-infringement": "ip-validity-analysis",
      "ip-valuation": "ip-valuation",
      "ip-licensing-opportunity": "ip-licensing-opportunity",
      //
      "m&a": "market-research",
      "market-analysis": "market-research",
      "competitive-landscape": "market-research",
      "consumer-landscape": "market-research",
      commercialization: "market-research",
      regulatory: "market-research",
    };

    const newOptions: any[] | ((prevState: string[]) => string[]) = [];

    selected.forEach((option) => {
      const mappedOption = optionMappings[option];
      if (mappedOption && !newOptions.includes(mappedOption)) {
        newOptions.push(mappedOption);
      }
    });

    setOptions(newOptions);
  }, [selected]);
  //

  // checkbox selection
  const handleChange = useCallback(
    (mode: string[]) => {
      setError("");
      // console.log(mode);
      // setSelected(radioOptions.map(({ value }) => value));
      setSelected(mode);

      const matchingIds = UseCaseOptions.filter((r) => mode.includes(r.value)) // Filter to get objects with values in mode array
        .map((r) => r.id);
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            plans: matchingIds,
          },
        }),
      );
      // if (mode.includes("all")) {
      //   if (selected.length >= 4) {
      //     const filteredOptions = radioOptions.filter(
      //       (option) => mode.includes(option.value) && option.value !== "all",
      //     );
      //     setSelected(filteredOptions.map((option) => option.value));
      //   } else {
      //     setSelected(radioOptions.map(({ value }) => value));
      //   }
      // } else {
      //   if (!mode.includes("all") && selected.length >= 4) {
      //     setSelected([]);
      //   } else if (mode.lengOptionMappingsth >= 4) {
      //     setSelected(radioOptions.map(({ value }) => value));
      //   } else {
      //     setSelected(mode);
      //   }
      // }
    },
    [dispatch, sessionDetail],
  );

  return (
    <div className="h-full bg-primary-gradient rounded-lg p-6">
      <p className="text-white text-xl font-semibold ">Please select use case for your report.</p>
      <div className="w-[660px] 2xl:w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="mt-1 items-center">
            <h5 className=" text-secondary-500 mb-1 text-[32px] font-bold font-helvetica">
              IP Analysis
            </h5>
            <div className="space-y-[20px]">
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Pro reports</p>
                <CheckBoxButtons
                  options={UseCaseOptions.filter(
                    (r) => r.reportPlan === "pro" && r.reportType === "ip",
                  )}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Premium reports</p>
                <CheckBoxButtons
                  options={UseCaseOptions.filter(
                    (r) => r.reportType === "ip" && r.reportPlan === "premium",
                  )}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-1">
            <h5 className="text-secondary-500 mb-1 text-[32px] font-bold font-helvetica">
              Market Research & IP
            </h5>
            <div className="space-y-[20px]">
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Pro reports</p>
                <UseCaseSelectButton
                  options={UseCaseOptions.filter(
                    (r) => r.reportType === "market-research" && r.reportPlan === "pro",
                  )}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    // label: "font-semibold text-white",
                  }}
                />
              </div>
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Premium reports</p>
                <UseCaseSelectButton
                  options={UseCaseOptions.filter(
                    (r) => r.reportPlan === "premium" && r.reportType === "market-research",
                  )}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    // label: "font-semibold text-white",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 flex justify-end">
          <Button
            type="optional"
            htmlType={"button"}
            rounded={"small"}
            disabled={error === undefined}
            handleClick={onContinue}
            classname="text-white disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
        {error && <p className="text-danger-500 text-sm mt-2 text-end">{error}</p>}
      </div>

      {/* ----------- */}
      {/* <div className="mt-5 items-center">
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
      </div> */}
    </div>
  );
};

export default DefaultStep;

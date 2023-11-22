import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//
import { IStepThree } from "../../../@types/entities/IPLandscape";
//
import Button from "../../reusable/button";
import { useNavigate } from "react-router-dom";
import MultiKeywords from "../../reusable/multiple-keywords";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setIPOrganization } from "../../../stores/IpSteps";
import MultipleCheckbox from "../../reusable/multiple-checkbox";
import KeywordSelected from "./KeywordSelected";
import classNames from "classnames";
//

interface Props {
  changeActiveStep: (steps: number) => void;
}

/**
 *
 */
const StepThree: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const organization_competitor =
    useAppSelector((state) => state.ipData.organization_competitor) ?? {};

  const [keyword, setKeyword] = useState(organization_competitor.competitor);
  const [checkboxValue, setCheckboxValue] = useState(organization_competitor.organization);

  // useEffect(() => {
  //   setCheckboxValue(organization_competitor.organization)
  //   setKeyword(organization_competitor.competitor)
  // }, [])

  //
  const formInitialValue: IStepThree = {
    objectives: [],
  };
  const formResolver = yup.object().shape({
    // title: yup
    //   .string()
    //   .required("Project title is required"),
    // description: yup.string().required("Description is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  //
  const onContinue = useCallback(
    (values: IStepThree) => {
      changeActiveStep(4);
      const three_value = {
        organization: checkboxValue || [],
        competitor: keyword || [],
      };
      dispatch(setIPOrganization(three_value));
    },
    [changeActiveStep, checkboxValue, dispatch, keyword],
  );

  const onChange = (value: any) => {
    setCheckboxValue(value);
  };

  return (
    <div className="">
      <KeywordSelected />
      <div className="mt-4">
        <h4 className="text-gray-600 text-4xl	">
          What are your <b>objectives</b> for this report?
        </h4>
        <h6 className="text-secondary-800 mt-2">
          Select Objectives from the suggestions or enter below
        </h6>
      </div>
      <form onSubmit={handleSubmit(onContinue)}>
        <fieldset className="">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={3}
                {...register("objectives")}
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.objectives
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Write your objectives and press enter "
              />
            </div>
          </label>
          {errors.objectives?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.objectives?.message}</div>
          )}
        </fieldset>
        {/* <fieldset className="">
          <p>Organizations*</p>
          <div className="flex items-center gap-x-3">
            {...register("objective")}
            <MultipleCheckbox topics={topics} onChange={onChange} value={checkboxValue || []} />
           
          </div>
        </fieldset> */}
        {/* name */}
        {/* <fieldset className="mt-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Competitor’s names
           
            <MultiKeywords
              required
              size="small"
              className="w-full bg-white"
              placeholder={"Enter Competitors Name"}
              changeKeyword={setKeyword}
            />
          </label>
          {errors.competitor?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.competitor?.message}</div>
          )}
        </fieldset> */}
        {/* Date */}

        <div className="flex justify-cente gap-x-4 mt-4">
          {/* <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(2)}>
            Go Back
          </Button> */}
          <Button htmlType={"submit"} rounded={"large"}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;

const topics = [
  { label: "Industry", value: "industry" },
  { label: "University", value: "university" },
  { label: "Both", value: "both" },
];

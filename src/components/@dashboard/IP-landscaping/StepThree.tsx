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
    competitor: [],
    organization: [],
  };
  const formResolver = yup.object().shape({
    // title: yup
    //   .string()
    //   .required("Project title is required"),
    // description: yup.string().required("Description is required"),
  });

  const {
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
      // changeActiveStep(0)}
      const three_value = {
        organization: checkboxValue || [],
        competitor: keyword || [],
      };
      navigate("/ip-landscaping/summary");
      dispatch(setIPOrganization(three_value));
    },
    [checkboxValue, keyword],
  );

  const onChange = (value: any) => {
    setCheckboxValue(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onContinue)}>
        <fieldset className="mt-3">
          <p>Organizations*</p>
          <div className="flex items-center gap-x-3">
            {/* {...register("objective")} */}
            <MultipleCheckbox topics={topics} onChange={onChange} value={checkboxValue || []} />
            {/* <div className="flex items-center">
              <input
                id="industry"
                type="checkbox"
                className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
              />
              <label htmlFor="industry" className="ml-1 text-sm font-medium text-gray-500 ">
                Industry
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="university"
                type="checkbox"
                className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
              />
              <label htmlFor="university" className="ml-1 text-sm font-medium text-gray-500 ">
                University
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="both"
                type="checkbox"
                className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
              />
              <label htmlFor="both" className="ml-1 text-sm font-medium text-gray-500 ">
                Both
              </label>
            </div> */}
          </div>
        </fieldset>
        {/* name */}
        <fieldset className="mt-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Competitor’s names
            {/* <div className="mt-0.5 rounded-md shadow-sm">
              <input
                {...register("competitor")}
                type="text"
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.competitor
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Enter competitor name"
              />
            </div> */}
            <MultiKeywords
              required
              size="small"
              className="w-full bg-white"
              placeholder={"Enter Competitors Name"}
              changeKeyword={setKeyword}
              // initialValue={keyword.map((k) => ({
              //   label: k,
              //   value: k
              // }))}
            />
          </label>
          {errors.competitor?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.competitor?.message}</div>
          )}
        </fieldset>
        {/* Date */}

        <div className="flex justify-center gap-x-4 mt-4">
          <Button htmlType={"button"} type={"secondary"} handleClick={() => changeActiveStep(2)}>
            Go Back
          </Button>
          <Button htmlType={"submit"}>Generate Report</Button>
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

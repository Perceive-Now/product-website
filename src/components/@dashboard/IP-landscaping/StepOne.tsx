import { FunctionComponent, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//
import { IReport } from "../../../@types/entities/IPLandscape";
//
import Button from "../../reusable/button";
import CalendarIcon from "../../icons/miscs/Calendar";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setIPDetail } from "../../../stores/IpSteps";
//

interface Props {
  changeActiveStep: (steps: number) => void;
}

/**
 *
 */
const StepOne: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const report_detail = useAppSelector((state) => state.ipData.report_details) ?? {};

  //
  const currentDate = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const today_date = `${month} ${day}, ${year}`;

  //
  const formInitialValue: IReport = {
    title: report_detail.title !== undefined ? report_detail?.title : "",
    description: report_detail.description !== undefined ? report_detail?.description : "",
    date: today_date,
  };

  const formResolver = yup.object().shape({
    title: yup.string().required("Project title is required"),
    description: yup.string().required("Description is required"),
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
  const onContinue = useCallback((values: IReport) => {
    changeActiveStep(2);
    dispatch(setIPDetail(values));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onContinue)}>
        {/* title */}
        <fieldset className="mt-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Project title*
            <div className="mt-0.5 rounded-md shadow-sm">
              <input
                {...register("title")}
                type="text"
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.title
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Enter your title address"
              />
            </div>
          </label>

          {errors.title?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.title?.message}</div>
          )}
        </fieldset>
        {/* Date */}
        <fieldset className="mt-3">
          <div className=" text-sm font-medium leading-5 text-gray-700 flex items-center gap-x-1">
            Report Created on :
            <div className="flex items-center gap-x-2">
              <span className="font-bold">{today_date}</span>
              <CalendarIcon />
            </div>
          </div>
        </fieldset>
        <fieldset className="mt-3">
          <label className="block text-sm font-medium leading-5 text-gray-700">
            Technology / Sector Description*
            <div className="mt-0.5 rounded-md shadow-sm">
              <textarea
                rows={10}
                {...register("description")}
                className={classNames(
                  "appearance-none block w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                  errors.description
                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
                placeholder="Description"
              />
            </div>
          </label>
          {errors.description?.message && (
            <div className="mt-1 text-xs text-danger-500">{errors.description?.message}</div>
          )}
        </fieldset>
        <div className="text-center mt-4">
          <Button htmlType={"submit"}>Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;

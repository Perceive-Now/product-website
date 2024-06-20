import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setSession } from "../../../stores/session";
import {
  setUseCase,
  setUseCaseIds,
  setUseCasesUploadState,
  uploadUseCases,
} from "../../../stores/use-case";

import { UseCaseOptions, UsecaseOptions } from "./__use-cases";
import UseCaseTab from "./case";

import DefaultProgressBar from "../../../components/reusable/default-progress";
import { reset as resetQA } from "src/stores/Q&A";
import { reset as resetUploadAttachments } from "src/stores/upload-attachments";
import { reset as resetQuickPrompts } from "src/stores/upload-quick-prompt";

interface OptionMappings {
  [key: string]: string;
}

const optionMappings: OptionMappings = {
  "freedom-to-operate": "ip-validity-analysis",
  "prior-art-search": "ip-validity-analysis",
  "patent-validity": "ip-validity-analysis",
  "patent-infringement": "ip-validity-analysis",
  "ip-valuation": "ip-valuation",
  "ip-licensing-opportunity": "ip-licensing-opportunity",
  //
  "m&a": "m&a",
  "market-analysis": "market-analysis",
  "competitive-landscape": "competitive-landscape",
  "consumer-landscape": "consumer-landscape",
  "commercialization-assessment": "commercialization-assessment",
  "regulatory-pathways": "regulatory-pathways",
};

/**
 *
 */
const UseCaseSelect = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const { useCaseIds, isUploading, useCasesUploadState } = useAppSelector(
    (state) => state.usecases,
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [useCaseSelected, setUseCaseSelected] = useState<any>(UseCaseOptions);
  const [useCaseType, setUseCaseType] = useState(UsecaseOptions[0].value);
  const [reports, setReport] = useState<any>([]);

  useEffect(() => {
    if (useCasesUploadState.isUseCaseUploadError) {
      toast.error("Server error");
      dispatch(
        setUseCasesUploadState({
          isUseCaseUploadError: false,
          isUseCaseUploadSuccess: false,
          message: "",
        }),
      );
    }

    if (useCasesUploadState.isUseCaseUploadSuccess) {
      dispatch(
        setUseCasesUploadState({
          isUseCaseUploadError: false,
          isUseCaseUploadSuccess: false,
          message: "",
        }),
      );
      navigation("/interaction-method");
      setSelected([]);
    }
  }, [useCasesUploadState, navigation, dispatch]);

  //
  const onContinue = useCallback(() => {
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
            },
          }),
        );
      }
      dispatch(resetQA());
      dispatch(resetQuickPrompts());
      dispatch(resetUploadAttachments());
      dispatch(
        uploadUseCases({
          userCaseIds: useCaseIds,
          userId: jsCookie.get("user_id") ?? "",
        }),
      );
      dispatch(setUseCase({ usecases: options }));
    } else {
      toast.error("Please select one of the use cases");
    }
  }, [dispatch, options, selected.length, sessionDetail, useCaseIds]);

  useEffect(() => {
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
      setSelected(mode);

      const matchingUseCaseIds = UseCaseOptions.filter((r) => mode.includes(r.value)) // Filter to get objects with values in mode array
        .map((r) => String(r.useCaseId));

      dispatch(setUseCaseIds(matchingUseCaseIds));

      // const reports = UsecaseOptions.find((option) => option.value === useCaseType);
      const reportsList = UseCaseOptions.filter((c) => mode.includes(c.value));
      const matchingIds = UseCaseOptions.filter((r) => mode.includes(r.value)).map((r) => r.id);
      setReport(reportsList);

      sessionStorage.setItem("planIds", JSON.stringify(matchingIds));

      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            plans: matchingIds,
          },
        }),
      );
    },
    [dispatch, sessionDetail],
  );

  const chooseUseCase = useCallback((options: any) => {
    setUseCaseType(options.value);
    setUseCaseSelected(UseCaseOptions);
  }, []);

  return (
    <div className="h-full">
      <p className="text-heroDark-900 text-5xl font-bold">
        Please select use cases for your report
      </p>
      <DefaultProgressBar width={10} />
      <div className="w-full mt-2">
        <div className="flex justify-between bg-appGray-100 p-2 rounded-lg w-full">
          <div className="w-[200px]">
            {UsecaseOptions.map((usecase, idx) => (
              <div key={idx * 99} className="w-full ">
                <button
                  type="button"
                  className={classNames(
                    "py-[12px] px-2 w-full rounded flex justify-start",
                    useCaseType === usecase.value
                      ? "bg-white text-primary-900 font-bold"
                      : "text-secondary-800",
                  )}
                  onClick={() => chooseUseCase(usecase)}
                >
                  {usecase.reportName}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full bg-white px-4  pt-1 pb-8">
            <div className="w-full">
              <UseCaseTab
                UseCaseOptions={useCaseSelected}
                selected={selected}
                handleChange={handleChange}
                reports={reports}
                onContinue={onContinue}
                isUploading={isUploading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseSelect;

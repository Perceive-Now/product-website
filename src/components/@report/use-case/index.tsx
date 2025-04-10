import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setSession } from "../../../stores/session";
import {
  setUseCase,
  setUseCaseIds,
  setUseCasesUploadState,
  uploadUseCases,
} from "../../../stores/use-case";

//
import { UseCaseOptions } from "./__use-cases";
import UseCaseTab from "./case";

//
import { reset as resetQA } from "src/stores/Q&A";
import { reset as resetUploadAttachments } from "src/stores/upload-attachments";
import { reset as resetQuickPrompts } from "src/stores/upload-quick-prompt";
import ProgressBar from "src/pages/product/upload-attachements-page/progress-bar";

//
interface OptionMappings {
  [key: string]: string;
}

/**
 *
 */
const optionMappings: OptionMappings = {
  "freedom-to-operate": "freedom-to-operate",
  "prior-art-search": "ip-validity-analysis",
  "patent-validity": "ip-validity-analysis",
  "ip-validity-analysis": "ip-validity-analysis",
  "patent-infringement": "ip-validity-analysis",
  "ip-valuation": "ip-valuation",
  "ip-licensing-opportunity": "ip-licensing-opportunity",
  //
  "m&a": "m&a",
  "market-potential": "market-potential",
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

  //
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const { useCaseIds, isUploading, useCasesUploadState } = useAppSelector(
    (state) => state.usecases,
  );

  //
  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [reports, setReport] = useState<any>([]);

  //
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
      // if (options.includes("ip-validity-analysis")) {
      //   dispatch(
      //     setSession({
      //       session_data: {
      //         ...sessionDetail,
      //         question_id: 6,
      //         active_index: 0,
      //         step_id: 3,
      //         use_cases: options,
      //       },
      //     }),
      //   );
      // } else if (options.includes("ip-licensing-opportunity")) {
      //   dispatch(
      //     setSession({
      //       session_data: {
      //         ...sessionDetail,
      //         question_id: 12,
      //         step_id: 3,
      //         active_index: 0,
      //         use_cases: options,
      //       },
      //     }),
      //   );
      // } else if (options.includes("ip-valuation")) {
      //   dispatch(
      //     setSession({
      //       session_data: {
      //         ...sessionDetail,
      //         question_id: 25,
      //         step_id: 3,
      //         use_cases: options,
      //         active_index: 0,
      //       },
      //     }),
      //   );
      // } else {
      //   dispatch(
      //     setSession({
      //       session_data: {
      //         ...sessionDetail,
      //         question_id: 34,
      //         step_id: 3,
      //         use_cases: options,
      //         active_index: 0,
      //       },
      //     }),
      //   );
      // }
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

  //
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

  return (
    <div className="h-[calc(100vh-170px)] max-w-[880px] w-full">
      <p className="text-heroDark-900 text-2xl  font-bold pb-1">
        Please select use cases for your report
      </p>
      <ProgressBar />
      <div className="w-full mt-2 h-full">
        <div className="flex justify-between border bg-white h-full  p-2 rounded-lg w-full overflow-auto pn_scroller">
          <div className="w-full bg-white pb-8">
            <div className="w-full">
              <UseCaseTab
                UseCaseOptions={UseCaseOptions}
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

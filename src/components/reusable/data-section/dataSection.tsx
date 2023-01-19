import { PropsWithChildren, ReactElement } from "react";

//
import { LoadingIcon } from "../../icons";
import ApiErrorMessage from "../api-error";

//
import NoKeywordMessage from "../no-keyword";

//
export default function DataSection(
  props: PropsWithChildren<IDataSectionProps>
) {
  //
  const isEmpty = props.keywords.length === 0;
  const isLoading = !isEmpty && props.isLoading;
  const isErrorState = !isLoading && props.isError;

  //
  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      {/* Title */}
      {props.title}

      {/* No keyword message */}
      {isEmpty && (
        <div className="h-[300px] flex justify-center items-center">
          <NoKeywordMessage />
        </div>
      )}

      {/* Loading animation */}
      {isLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <LoadingIcon fontSize={52} />
        </div>
      )}

      {/* Error state */}
      {isErrorState && (
        <div className="h-[300px] flex justify-center items-center">
          <ApiErrorMessage messgae={props.error?.message} />
        </div>
      )}

      {/* Actual data element */}
      {!isEmpty && !isLoading && !isErrorState && <>{props.children}</>}
    </div>
  );
}

//
interface IDataSectionProps {
  title: ReactElement;
  keywords: string[];
  isLoading: boolean;
  isError: boolean;
  error?: any;
}

import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

//
import ApiErrorMessage from "../api-error";
import NoKeywordMessage from "../no-keyword";

//
import { LoadingIcon } from "../../icons";
import { AxiosError } from "axios";

//
export default function DataSection(props: PropsWithChildren<IDataSectionProps>) {
  //
  const isEmpty = props.keywords.length === 0;
  const isLoading = !isEmpty && props.isLoading;
  const isErrorState = !isLoading && props.isError;

  //
  const errorMessage = props.error
    ? props.error instanceof AxiosError && (props.error.response?.status ?? 200) >= 400
      ? "API did not respond!"
      : props.error.message
    : "";

  //
  return (
    <div className={classNames(" pt-1 pb-3 rounded-lg bg-white font-bold", props.className)}>
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
        <div className="h-[300px] flex justify-center items-center text-primary-600">
          <LoadingIcon fontSize={52} />
        </div>
      )}

      {/* Error state */}
      {isErrorState && (
        <div className="h-[300px] flex justify-center items-center">
          <ApiErrorMessage messgae={errorMessage} />
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  className?: string;
}

import { ErrorIcon } from "../../icons";

/**
 *
 */
export default function ApiErrorMessage(props: IErrorMessageProps) {
  const message = props.messgae ?? "Unable to fetch data from the API!";

  return (
    <div className="w-full text-center h-[200px] flex flex-col justify-center items-center">
      <div className="mb-2 text-red-700 drop-shadow">
        <ErrorIcon width={48} height={48} />
      </div>

      <span className="description">{message}</span>
    </div>
  );
}

//
interface IErrorMessageProps {
  messgae?: string;
}

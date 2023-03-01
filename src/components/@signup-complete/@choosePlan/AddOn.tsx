import classNames from "classnames";
import { QuestionIcon } from "../../icons";

/**
 *
 */
export default function AddOn({ id, title, addOnInfo, isAdded, handleClick }: IAddOnProps) {
  return (
    <div key={id} className="col-span-1 flex justify-between pb-2 border-b-2 border-gray-400">
      <span className="text-xl flex">
        <span className="capitalize">{title}</span>

        <QuestionIcon className="ml-1" />
      </span>

      <span>
        <span
          className={classNames(
            "px-3 py-1 rounded-full",
            addOnInfo?.price
              ? "bg-primary-900 text-white cursor-pointer"
              : "bg-primary-100 text-white",
          )}
          onClick={() => {
            if (addOnInfo?.price) {
              handleClick(addOnInfo);
            }
          }}
        >
          {isAdded ? "Added" : "Add"}
        </span>
      </span>
    </div>
  );
}

export interface IAddOnInfo {
  pkid?: string;
  title?: string;
  price?: string;
}

interface IAddOnProps {
  id: string;
  title: string;
  description?: string;
  isAdded: boolean;
  handleClick: (id: IAddOnInfo) => void;
  addOnInfo: IAddOnInfo;
}

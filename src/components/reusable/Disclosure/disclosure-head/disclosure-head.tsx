import classNames from "classnames";

//
import { ChevronDown } from "../../../icons";

/**
 *
 */
export default function DisclosureHead({
  open,
  title,
  description,
}: IDisclosureHead) {
  return (
    <div className="flex text-start">
      <div className="mr-3">
        <ChevronDown
          className={classNames(
            "text-primary-900",
            open ? "rotate-180 transform" : ""
          )}
        />
      </div>

      <div>
        <div className="text-primary-900 font-medium text-xl mb-1">{title}</div>

        <div>{description}</div>
      </div>
    </div>
  );
}

interface IDisclosureHead {
  open: boolean;
  title: string;
  description: string;
}

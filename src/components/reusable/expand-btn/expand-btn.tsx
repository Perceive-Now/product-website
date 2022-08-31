import { Fragment } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "../../icons";

export default function ExpandBtn({
  isExpanded,
  handleExpandToggle,
  secondaryButton,
  onSecondaryButtonAction,
}: IExpandBtn) {
  const hasSecondaryButton = Boolean(secondaryButton);

  const handleSecondaryButtonClick = () => {
    if (onSecondaryButtonAction) {
      onSecondaryButtonAction();
    }
  };

  return (
    <div className="w-full">
      {!isExpanded && (
        <div
          className="w-full cursor-pointer font-medium bg-primary-900 text-white py-[12px] rounded-b-2xl hover:bg-primary-50 hover:text-primary-900"
          onClick={handleExpandToggle}
        >
          <div className="flex justify-center items-center">
            <span className="mr-[12px]">Expand</span>
            <ChevronDown />
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="w-full flex">
          {hasSecondaryButton && (
            <Fragment>
              <div
                onClick={handleExpandToggle}
                className="w-1/2 cursor-pointer font-medium bg-primary-900 hover:bg-primary-50 hover:text-primary-900 text-white py-[12px] rounded-bl-2xl"
              >
                <div className="flex justify-center items-center">
                  <span className="mr-[12px]">Collapse</span>
                  <ChevronUp />
                </div>
              </div>

              <div
                className="w-1/2 cursor-pointer font-medium bg-white text-primary-900 py-[12px] rounded-br-2xl border border-primary-900 hover:border-primary-600 hover:text-primary-600"
                onClick={handleSecondaryButtonClick}
              >
                <div className="flex justify-center items-center">
                  <span className="mr-[12px]">{secondaryButton}</span>
                  <ChevronRight />
                </div>
              </div>
            </Fragment>
          )}

          {!hasSecondaryButton && (
            <div
              className="w-full cursor-pointer font-medium bg-primary-900 hover:bg-primary-50 hover:text-primary-900 text-white py-[12px] rounded-b-2xl"
              onClick={handleExpandToggle}
            >
              <div className="flex justify-center items-center">
                <span className="mr-[12px]">Collapse</span>
                <ChevronUp />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface IExpandBtn {
  isExpanded: boolean;
  handleExpandToggle: () => void;
  secondaryButton?: string;
  onSecondaryButtonAction?: () => void;
}

import { PropsWithChildren } from "react";

//
import { InfoIcon } from "../../icons";

/**
 *
 */
export default function PageTitle(props: PropsWithChildren<IPageTitleProps>) {
  return (
    <div className="py-1">
      <div className="flex justify-between items-center">
        <p className="text-[22px] text-primary-900">{props.title}</p>

        {props.learnMore && !props.info && (
          <div>
            <p className="text-primary-500 cursor-pointer">Learn more</p>
          </div>
        )}

        {props.info && !props.learnMore && (
          <div className="text-primary-900 cursor-pointer">
            <InfoIcon />
          </div>
        )}
      </div>

      {props.subTitle && (
        <p className="mt-1 text-md text-gray-700">
          <span>{props.subTitle}</span>
        </p>
      )}

      {/* Render complex children ?? */}
      {props.children && <div className="mt-1">{props.children}</div>}
    </div>
  );
}

interface IPageTitleProps {
  title: string;
  info?: string;
  subTitle?: string;
  learnMore?: string;
}

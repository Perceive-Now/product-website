import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

//
import { InfoIcon } from "../../icons";
import Tooltip from "../tooltip";

/**
 *
 */
export default function PageTitle(props: PropsWithChildren<IPageTitleProps>) {
  return (
    <div className="py-1">
      <div className="flex justify-between items-center">
        <p className={classNames("text-[22px] text-primary-900", props.titleClass)}>
          {props.title}
        </p>

        {props.learnMore && !props.info && !props.learnHow && !props.sideTitleOption && (
          <Tooltip
            trigger={
              <p className="text-primary-500 cursor-pointer">
                <span>Learn more</span>
              </p>
            }
          >
            {props.learnMore}
          </Tooltip>
        )}

        {props.info && !props.learnMore && !props.learnHow && !props.sideTitleOption && (
          <Tooltip trigger={<InfoIcon />}>{props.info}</Tooltip>
        )}

        {props.learnHow && !props.learnMore && !props.info && !props.sideTitleOption && (
          <div>
            <p className="font-medium text-primary-500 cursor-pointer">Learn How</p>
          </div>
        )}

        {props.sideTitleOption && !props.learnHow && !props.learnMore && !props.info && (
          <div>{props.sideTitleOption}</div>
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
  titleClass?: string;
  info?: string;
  subTitle?: string;
  learnMore?: string;
  learnHow?: boolean;
  sideTitleOption?: ReactNode;
}

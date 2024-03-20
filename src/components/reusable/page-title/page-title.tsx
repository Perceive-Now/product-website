import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

//
import Tooltip from "../popover";
import { InfoIcon } from "../../icons";

/**
 *
 */
export default function PageTitle(props: PropsWithChildren<IPageTitleProps>) {
  return (
    <div className="py-1">
      <div className="flex justify-between items-center">
        {props.title && (
          <p className={classNames("text-lg font-bold text-primary-900", props.titleClass)}>
            {props.title}
          </p>
        )}

        {props.learnMore && !props.info && !props.learnHow && (
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

        {props.info && !props.learnMore && !props.learnHow && (
          <Tooltip trigger={<InfoIcon />}>{props.info}</Tooltip>
        )}

        {props.learnHow && !props.learnMore && !props.info && (
          <div>
            <p className="font-medium text-primary-500 cursor-pointer">Learn How</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-1">
        <p className="text-md text-primary-900 pt-1">
          <span>{props.subTitle ?? ""}</span>
        </p>

        {props.sideTitleOption && <div>{props.sideTitleOption}</div>}
      </div>

      {/* Render complex children ?? */}
      {props.children && <div className="mt-1">{props.children}</div>}
    </div>
  );
}

interface IPageTitleProps {
  title?: string;
  titleClass?: string;
  info?: string;
  subTitle?: string;
  learnMore?: string;
  learnHow?: boolean;
  sideTitleOption?: ReactNode;
}

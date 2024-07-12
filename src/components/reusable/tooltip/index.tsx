import { InfoIcon } from "../../icons";
import ToolTip from "../tool-tip";

interface Props {
  desc: string;
}

export default function PopOverHover({ desc }: Props) {
  return (
    <div className="relative group">
      <ToolTip title={desc}>
        <div className="focus:outline-none group-hover:cursor-pointer">
          <InfoIcon className="h-2 w-2" />
        </div>
      </ToolTip>

      {/* <div className="group-hover:block hidden absolute z-10 w-[540px] left-[18px] -bottom-2 bg-primary-900 rounded-lg shadow-pop border border-primary-900 p-[10px] text-white text-justify">
        {desc}
      </div> */}
    </div>
  );
}

// left-[200px]  2xl:-left-[220px]

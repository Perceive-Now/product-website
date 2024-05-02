import { InfoIcon } from "../../icons";

interface Props {
  desc: string;
}

export default function PopOverHover({ desc }: Props) {
  return (
    <div className="relative group">
      <div className="focus:outline-none group-hover:cursor-pointer">
        <InfoIcon className="h-2 w-2 text-white" />
      </div>

      <div className="group-hover:block hidden absolute z-10 w-[540px]  -left-[240px] bottom-4 bg-primary-900 rounded-lg shadow-pop border border-primary-900 p-[10px] text-white text-justify">
        {desc}
      </div>
    </div>
  );
}

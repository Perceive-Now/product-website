import { InfoIcon } from "../../icons";

interface Props {
  desc: string;
}

export default function PopOverHover({ desc }: Props) {
  return (
    <div className="relative group">
      <div className="focus:outline-none group-hover:cursor-pointer">
        <InfoIcon className="h-2 w-2" />
      </div>

      <div className="group-hover:block hidden absolute z-10 w-[370px]  -left-48 bottom-4 bg-white rounded-lg shadow-pop border border-appGray-200 p-1 text-center">
        {desc}
      </div>
    </div>
  );
}

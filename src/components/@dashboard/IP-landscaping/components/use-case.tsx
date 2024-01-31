import { useAppSelector } from "../../../../hooks/redux";
import Button from "../../../reusable/button";

export default function IPUseCase() {
  const selectedValue = useAppSelector((state) => state.ipData.use_case.label) ?? [];

  return (
    <div className="flex items-center gap-2.5">
      <div>
        <span className="text-gray-500">Use Case :&nbsp;</span>
        <span>{selectedValue}</span>
      </div>
      <div>
        <Button
          type="secondary"
          size="small"
          rounded="medium"
          classname="px-0.5 py-[6px] text-xs font-semibold"
        >
          Change
        </Button>
      </div>
    </div>
  );
}

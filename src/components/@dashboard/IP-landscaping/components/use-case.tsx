import { useCallback } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import Button from "../../../reusable/button";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPUseCase({ changeActiveStep }: Props) {
  const selectedValue = useAppSelector((state) => state.ipData.use_case.label) ?? [];

  const onChange = useCallback(() => {
    changeActiveStep(0);
  }, [changeActiveStep]);

  return (
    <div className="flex items-center gap-2.5">
      <div>
        <span className="text-gray-500">Use Case :&nbsp;</span>
        <span>{selectedValue}</span>
      </div>
      <div>
        <Button
          htmlType="button"
          type="secondary"
          size="small"
          rounded="medium"
          classname="px-0.5 py-[6px] text-xs font-semibold"
          handleClick={onChange}
        >
          Change
        </Button>
      </div>
    </div>
  );
}

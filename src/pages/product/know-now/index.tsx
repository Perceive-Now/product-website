import React, { useCallback, useState } from "react";
import KnowNowdefault from "./default";
import RadioButtons from "src/components/reusable/radio-buttons";
import Button from "src/components/reusable/button";
import { useNavigate } from "react-router-dom";
import { generateKnowId } from "src/utils/helpers";
import { useAppDispatch } from "src/hooks/redux";
import { generateNewId, setChatIds } from "src/stores/know-now1";

const Options = [
  {
    label: "IP Analysis",
    value: "ip",
  },
  {
    label: "Market intelligence",
    value: "ma",
  },
];

const KnowNowPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [mode, setMode] = useState("");

  const handleChnage = useCallback((mode: any) => {
    setMode(mode);
  }, []);

  const onContinue = useCallback(() => {
    const id = generateKnowId();
    dispatch(generateNewId({ id: id }));

    if (mode === "ip") {
      navigate("/know-now/ip-analysis");
    }
    if (mode === "ma") {
      navigate("/know-now/market-intelligence");
    }
  }, [dispatch, mode, navigate]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center pt-10 gap-8">
      <KnowNowdefault />
      <div className="flex flex-col items-center gap-4">
        <div>
          <p className="pb-1 font-semibold">Please select one option to continue</p>
          <RadioButtons
            options={Options}
            activeMode={mode}
            handleModeChange={handleChnage}
            classNames="font-semibold"
          />
        </div>
        <Button handleClick={onContinue} classname="w-[400px]" disabled={!mode}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default KnowNowPage;

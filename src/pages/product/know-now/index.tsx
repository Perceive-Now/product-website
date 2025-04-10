import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

//
import KnowNowdefault from "./default";
import RadioButtons from "src/components/reusable/radio-buttons";
import Button from "src/components/reusable/button";

//
import { useAppDispatch } from "src/hooks/redux";

//
import { generateNewId } from "src/stores/know-now";
import { getMarketThread, resetKnowNowMarket } from "src/stores/knownow-market";

//
import jsCookie from "js-cookie";
import { getIPChat, resetKnowNowIP } from "src/stores/knownow-ip";

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

/**
 *
 */
const KnowNowPage = () => {
  const dispatch = useAppDispatch();

  const userId = jsCookie.get("user_id");

  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const [query, setQuery] = useState<string>("");

  const handleChnage = useCallback((mode: any) => {
    setMode(mode);
  }, []);

  const onContinue = useCallback(() => {
    dispatch(generateNewId({ id: 0 }));

    dispatch(resetKnowNowMarket());
    dispatch(resetKnowNowIP());

    if (mode === "ip") {
      dispatch(getIPChat([{ user_id: userId || "", service_name: "ip" }]))
        .unwrap()
        .then((res) => {
          if (res.success) {
            // toast.success("Successfully get conversations")
          } else {
            // toast.error("Unable to get Conversations")
          }
        });
      // navigate("/know-now/ip-analysis");
      navigate("/know-now/ip-analysis", { state: { question: query } });
    }
    if (mode === "ma") {
      dispatch(getMarketThread(userId || ""));
      // navigate("/know-now/market-intelligence");
      navigate("/know-now/market-intelligence", { state: { question: query } });

    }
  }, [dispatch, mode, navigate, userId, query]);


  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center pt-10 gap-8">
      <KnowNowdefault setQuery={setQuery}/>
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

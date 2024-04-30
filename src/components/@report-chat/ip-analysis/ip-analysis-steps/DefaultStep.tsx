import { FunctionComponent, useCallback, useEffect, useState } from "react";
//
import Button from "../../../reusable/button";
//
import { useAppDispatch } from "../../../../hooks/redux";
import CheckBoxButtons from "../../../reusable/checkbox/checkbox";
import { setUseCase } from "../../../../stores/use-case";
import jsCookie from "js-cookie";
import { useLocation } from "react-router-dom";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface OptionMappings {
  [key: string]: string;
}

interface IOption {
  label: string;
  value: string;
}

const radioOptionsIP = [
  // { label: "Include all use cases", value: "all" },
  {
    label: "Prior art search",
    value: "prior-art-search",
    desc: "Conduct extensive searches to uncover existing inventions and disclosures that relate to your new innovation. This information is crucial for establishing the novelty of your invention and guiding the drafting of robust patent applications.",
    reportType: "pro",
  },
  {
    label: "Patent validity/invalidity",
    value: "patent-validity",
    desc: "Assess the enforceability of a patent’s claims against existing prior art, essential for defending against infringement allegations or challenging a competitor’s patent. Critical insights help fortify your legal and competitive position",
    reportType: "pro",
  },
  {
    label: "Patent Licensing targets",
    value: "ip-licensing-opportunity",
    desc: "Maximize your intellectual property revenue with strategic insights into potential licensing opportunities. This report guides you through selecting and targeting the most lucrative IP licensing deals.",
    reportType: "premium",
  },
  // {
  //   label: "IP valuation ",
  //   value: "ip-valuation",
  //   desc: "",
  // },

  //--------------------- Need to add--------------------
  // {
  //   label: "Freedom to Operate",
  //   value: "freedom-to-operate",
  //   desc: "Minimize legal risks associated with intellectual property infringement with our Freedom to Operate report. It’s crucial for businesses seeking to innovate freely without legal encumbrances.",
  //   reportType: "premium"

  // },

  // {
  //   label: "Patent infringement",
  //   value: "patent-infringement",
  //   desc: "Proactively manage and respond to potential patent infringements with our detailed analysis. This report helps you identify risks early and strategize effectively to protect your intellectual property.",
  //   reportType: "premium"

  // },
];

const radioOptionsMarket = [
  {
    label: "Market Analysis",
    value: "m&a",
    desc: "Dive deep into the dynamics of your target market with this report, which covers current trends and projections to help you anticipate future opportunities and challenges. It’s an essential tool for businesses looking to solidify their market understanding and strategic planning.",
    reportType: "pro",
  },
  {
    label: "Competitive Landscape",
    value: "competitive-landscape",
    desc: "Gain a competitive edge with detailed analyses of your competitors' strengths, weaknesses, and strategic positioning. This report helps you identify potential opportunities for differentiation and anticipate moves by competitors.",
    reportType: "pro",
  },
  {
    label: "Consumer Landscape",
    value: "consumer-landscape",
    desc: "Understand the pulse of your consumer base with insights into behaviors, preferences, and demographics. This report is crucial for tailoring your marketing strategies and product offerings to meet the evolving needs of your customers.",
    reportType: "pro",
  },

  {
    label: "Regulatory Pathways",
    value: "regulatory",
    desc: "Navigate the complexities of industry regulations with our comprehensive guide to compliance. This report is indispensable for ensuring that your business operations and strategies adhere to all relevant legal standards.",
    reportType: "pro",
  },
  // -------Premium------
  {
    label: "M&A Trends and Strategy",
    value: "m&a",
    desc: "Stay ahead in the game of mergers and acquisitions with insights into key events, valuation trends, and strategic approaches. This report is designed for businesses looking to expand through acquisitions or improve their competitive positioning through strategic mergers.",
    reportType: "premium",
  },
  {
    label: "Commercialization Assessment",
    value: "commercialization",
    desc: "Ensure your product's market success with our Commercialization Assessment report, which evaluates market readiness and identifies potential launch hurdles. Ideal for businesses aiming to achieve a smooth and successful product launch.",
    reportType: "premium",
  },
];

const DefaultStep: FunctionComponent<Props> = ({ changeActiveStep }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [, setRadioOptions] = useState<IOption[]>(radioOptionsIP);

  useEffect(() => {
    if (pathname === "/ip-analysis") {
      setRadioOptions(radioOptionsIP);
    }

    if (pathname === "/market-research") {
      setRadioOptions(radioOptionsMarket);
    }
  }, [pathname]);

  //
  const onContinue = useCallback(() => {
    jsCookie.set("commonQuestionId", String(1));
    if (selected.length > 0) {
      if (options.includes("ip-validity-analysis")) {
        jsCookie.set("questionId", String(6));
      } else if (options.includes("ip-licensing-opportunity")) {
        jsCookie.set("questionId", String(12));
      } else if (options.includes("ip-valuation")) {
        jsCookie.set("questionId", String(25));
      } else {
        jsCookie.set("questionId", String(34));
      }

      dispatch(setUseCase({ usecases: options }));
      changeActiveStep(3);
      setSelected([]);

      setError("");
    } else {
      setError("Please select one of the use cases");
    }
  }, [changeActiveStep, dispatch, options, selected]);

  useEffect(() => {
    const optionMappings: OptionMappings = {
      "freedom-to-operate": "ip-validity-analysis",
      "prior-art-search": "ip-validity-analysis",
      "patent-validity": "ip-validity-analysis",
      "patent-infringement": "ip-validity-analysis",
      "m&a": "market-research",
      "market-potential": "market-research",
      "competitive-landscape": "market-research",
      "consumer-landscape": "market-research",
      commercialization: "market-research",
      regulatory: "market-research",
      "ip-licensing-opportunity": "ip-licensing-opportunity",
      "ip-valuation": "ip-valuation",
    };

    const newOptions: any[] | ((prevState: string[]) => string[]) = [];

    selected.forEach((option) => {
      const mappedOption = optionMappings[option];
      if (mappedOption && !newOptions.includes(mappedOption)) {
        newOptions.push(mappedOption);
      }
    });

    setOptions(newOptions);
  }, [selected]);
  //

  // checkbox selection
  const handleChange = useCallback((mode: string[]) => {
    setError("");
    // setSelected(radioOptions.map(({ value }) => value));
    setSelected(mode);
    // if (mode.includes("all")) {
    //   if (selected.length >= 4) {
    //     const filteredOptions = radioOptions.filter(
    //       (option) => mode.includes(option.value) && option.value !== "all",
    //     );
    //     setSelected(filteredOptions.map((option) => option.value));
    //   } else {
    //     setSelected(radioOptions.map(({ value }) => value));
    //   }
    // } else {
    //   if (!mode.includes("all") && selected.length >= 4) {
    //     setSelected([]);
    //   } else if (mode.lengOptionMappingsth >= 4) {
    //     setSelected(radioOptions.map(({ value }) => value));
    //   } else {
    //     setSelected(mode);
    //   }
    // }
  }, []);

  return (
    <div className="xl:w-[620px h-[600px bg-primary-gradient rounded-lg p-6">
      <p className="text-white text-xl font-semibold ">Please select use case for your report.</p>
      <div className="w-[660px] 2xl:w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="mt-1 items-center">
            <h5 className=" text-secondary-500 mb-1 text-[32px] font-bold font-helvetica">
              IP Analysis
            </h5>
            <div className="space-y-[20px]">
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Pro reports</p>
                <CheckBoxButtons
                  options={radioOptionsIP.filter((r) => r.reportType === "pro")}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Premium reports</p>
                <CheckBoxButtons
                  options={radioOptionsIP.filter((r) => r.reportType === "premium")}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-1">
            <h5 className="text-secondary-500 mb-1 text-[32px] font-bold font-helvetica">
              Market Research & IP
            </h5>
            <div className="space-y-[20px]">
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Pro reports</p>
                <CheckBoxButtons
                  options={radioOptionsMarket.filter((r) => r.reportType === "pro")}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
              <div className="space-y-[10px]">
                <p className="text-secondary-500">Premium reports</p>
                <CheckBoxButtons
                  options={radioOptionsMarket.filter((r) => r.reportType === "premium")}
                  activeModes={selected}
                  handleModeChange={handleChange}
                  classNames={{
                    component: "flex flex-col gap-[10px]",
                    label: "font-semibold text-white",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 flex justify-end">
          <Button
            type="optional"
            htmlType={"button"}
            rounded={"small"}
            disabled={error === undefined}
            handleClick={onContinue}
            classname="text-white disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
        {error && <p className="text-danger-500 text-sm mt-2 text-end">{error}</p>}
      </div>

      {/* <div className="mt-5 items-center">
        <CheckBoxButtons
          options={radioOptions}
          activeModes={selected}
          handleModeChange={handleChange}
          classNames={{
            component: "flex flex-col gap-1",
            label: "font-semibold text-primary-900",
          }}
        />
        {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
      </div> */}
    </div>
  );
};

export default DefaultStep;

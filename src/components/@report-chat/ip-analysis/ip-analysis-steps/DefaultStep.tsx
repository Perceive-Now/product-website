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
    label: "IP Licensing targets",
    value: "ip-licensing-opportunity",
    desc: "Identify potential licensing opportunities and strategic partners to enhance IP commercialization. Focus on sectors ripe for innovation and expansion through detailed market analysis.",
  },
  {
    label: "IP valuation ",
    value: "ip-valuation",
    desc: "",
  },
  {
    label: "Freedom to Operate",
    value: "freedom-to-operate",
    desc: "Ensure your business operations can proceed without infringing on the existing IP rights of others. Conduct a thorough assessment of patent landscapes and current market entries for legal clarity.",
  },
  {
    label: "Prior art search",
    value: "prior-art-search",
    desc: "Conduct extensive searches to uncover existing inventions and disclosures that relate to your new innovation. This information is crucial for establishing the novelty of your invention and guiding the drafting of robust patent applications.",
  },
  {
    label: "Patent validity/invalidity",
    value: "patent-validity",
    desc: "Assess the enforceability of a patent’s claims against existing prior art, essential for defending against infringement allegations or challenging a competitor’s patent. Critical insights help fortify your legal and competitive position",
  },
  {
    label: "Patent infringement",
    value: "patent-infringement",
    desc: "Evaluate potential or existing infringement issues by detailed comparison of product features with patented claims. This analysis provides essential guidance for litigation strategies or product design adjustments to avoid legal complications",
  },
];

const radioOptionsMarket = [
  // { label: "Include all use cases", value: "all" },
  { label: "M&A trends and exit comparable", value: "m&a" },
  { label: "Competitive landscape  ", value: "competitive-landscape", desc: "" },
  { label: "Consumer landscape  ", value: "consumer-landscape" },
  { label: "Market potential", value: "market-potential" },
  { label: "Commercialization assessment/Technology readiness level", value: "commercialization" },
  { label: "Regulatory pathways", value: "regulatory" },
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
    <div className="xl:w-[620px h-[600px">
      <p className="text-gray-600 text-xl font-semibold">Please select use case for your report.</p>
      <div className="grid grid-cols-2">
        <div className="mt-1 items-center">
          <h5 className="font-bold text- text-[#373D3F] mb-1">IP</h5>
          <CheckBoxButtons
            options={radioOptionsIP}
            activeModes={selected}
            handleModeChange={handleChange}
            classNames={{
              component: "flex flex-col gap-1",
              label: "font-semibold text-primary-900",
            }}
          />
        </div>
        <div className="mt-1 items-center">
          <h5 className="font-bold text- text-[#373D3F] mb-1">Market analysis</h5>
          <CheckBoxButtons
            options={radioOptionsMarket}
            activeModes={selected}
            handleModeChange={handleChange}
            classNames={{
              component: "flex flex-col gap-1",
              label: "font-semibold text-primary-900",
            }}
          />
          {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
        </div>
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
      <div className="mt-7">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DefaultStep;

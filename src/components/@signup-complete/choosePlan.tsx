//
import { QuestionIcon } from "../icons";
import BriefcasePlanIcon from "../icons/miscs/Briefcase_signup";

//
import AddOn, { IAddOnInfo } from "./@choosePlan/AddOn";
import Button from "../reusable/button";
import DiligenceCard from "./@choosePlan/DiligenceCard";
import TailoredFeature from "./@choosePlan/TailoredFeature";
import ConnectedInsightIcon from "../icons/chooseplan/connectedInsightIcon";
import MAndAIcon from "../icons/chooseplan/MAndAIcon";
import SimilarityCheckIcon from "../icons/chooseplan/SimilarityCheckIcon";
import SummarizeIcon from "../icons/chooseplan/SummarizeIcon";
import MascotIcon from "../icons/chooseplan/MascotIcon";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsAndModules } from "../../utils/api/subscription";
import PageLoading from "../app/pageLoading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setBaseProduct, setSelectedAddOns } from "../../stores/subscription";

//
const diligenceData = [
  {
    icon: <ConnectedInsightIcon />,
    title: "Connected Insights",
    description:
      "Get powerful hidden insights from connected patents, publications, companies, inventors, universities, technologies, and funders.",
  },
  {
    icon: <MAndAIcon />,
    title: "M&A Strategies",
    description:
      "Get AI-picked results for mergers, acquisitions, investment opportunities to automate deal flows and understand your IP positioning.",
  },
  {
    icon: <SimilarityCheckIcon />,
    title: "Similarity check",
    description:
      "Automate prior art search with similarity correlation of your new claims with existing patent claims.",
  },
  {
    icon: <SummarizeIcon />,
    title: "Summarize",
    description:
      "Perform automated summarization and get the highlights from top patents and publications of your choice.",
  },
  {
    icon: <MascotIcon />,
    title: "Ask our AI mascot!s",
    description: "Chat with our AI mascot to get intuitive responses to IP related questions.",
  },
];

//
export default function ChoosePlanStep(props: ISignupStepProps) {
  const pricingMode = "MONTH";
  const dispatch = useAppDispatch();
  const selectedAddons = useAppSelector((state) => state.subscription.selectedAddOns);

  const { data, isLoading } = useQuery(["subscription-plan"], async () => {
    return await getProductsAndModules();
  });

  useEffect(() => {
    if (data) {
      if (data.products.length) {
        if (data.products[0].product_price.length) {
          const product = data.products[0].product_price.find(
            (product) => product.duration === pricingMode,
          );
          if (product) {
            const baseProduct: IAddOnInfo = {
              pkid: product.pkid,
              price: product.price,
              title: data.products[0].product_name,
            };
            dispatch(setBaseProduct(baseProduct));
          }
        }
      }
    }
  }, [data]);

  const handleAddOnClick = (addOnInfo: IAddOnInfo) => {
    const tempSelectedAddons = [...selectedAddons];
    const index = tempSelectedAddons.findIndex((item: IAddOnInfo) => item.pkid === addOnInfo.pkid);
    if (index >= 0) {
      tempSelectedAddons.splice(index, 1);
      dispatch(setSelectedAddOns(tempSelectedAddons));
    } else {
      tempSelectedAddons.push(addOnInfo);
      dispatch(setSelectedAddOns(tempSelectedAddons));
    }
  };

  const handleDiligenceModuleAdd = () => {
    const diligenceModule = data?.modules.find((module) => module.module_name === "Diligence 360");

    if (diligenceModule) {
      const addOn = diligenceModule.module_price?.find(
        (pricing) => pricing.duration === pricingMode,
      );

      const addOnInfo: IAddOnInfo = {
        pkid: addOn?.pkid,
        title: addOn?.module_name,
        price: addOn?.price,
      };

      handleAddOnClick(addOnInfo);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="p-2 md:p-5 w-full lg:max-w-5xl">
      <div className="flex justify-end">
        <div className="flex flex-col items-end">
          <div className="flex">
            <div className={`font-bold text-primary-900`}>Billed Monthly</div>
          </div>
        </div>
      </div>

      {data?.products.map((product) => {
        const productPricing = product.product_price.find(
          (pricing) => pricing.duration === pricingMode,
        );

        const price = productPricing?.price ? productPricing?.price?.split(".")[0] : "";
        return (
          <div key={product.pkid} className="flex justify-between">
            <div className="flex">
              <div className="mr-2">
                <BriefcasePlanIcon />
              </div>

              <div className="flex flex-col">
                <div className="font-bold text-4xl">{product.product_name}</div>

                <div className="text-lg">Quick access Dashboard</div>
              </div>
            </div>

            <div className="flex justify-end flex-col items-end">
              <div className="text-xl">
                <span className="font-bold text-3xl">${price}</span>/ month
              </div>

              <div className="text-gray-600">
                For quick access dashboard to help you track and share insights
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-5">
        <div className="text-2xl font-bold flex">
          Deep Search Add-ons: <QuestionIcon className="ml-1" />
        </div>
        <div>$100 each</div>

        <div className="grid grid-cols-2 gap-3 gap-x-12 mt-3">
          {data?.modules.map((module) => {
            const addOn = module?.module_price?.find((pricing) => pricing.duration === pricingMode);

            const addOnInfo: IAddOnInfo = {
              pkid: addOn?.pkid,
              title: addOn?.module_name,
              price: addOn?.price,
            };

            const isAdded = Boolean(
              selectedAddons.find((item: IAddOnInfo) => item.pkid === addOnInfo.pkid),
            );

            if (module.module_name === "Diligence 360") {
              return null;
            }

            return (
              <AddOn
                key={module.pkid}
                id={module.pkid}
                title={module.module_name}
                // description={addOn.module_description}
                isAdded={isAdded}
                handleClick={handleAddOnClick}
                addOnInfo={addOnInfo}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold">Diligence 360°</div>
            <div className="">For $2000/month you will have access to:</div>
          </div>

          <div>
            <span
              className="px-3 py-1 rounded-full bg-primary-900 text-white cursor-pointer"
              onClick={handleDiligenceModuleAdd}
            >
              {selectedAddons.find((item: IAddOnInfo) => item.title === "Diligence 360")
                ? "Added"
                : "Add"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-3">
          {diligenceData.map((data) => {
            return (
              <DiligenceCard
                key={data.title}
                title={data.title}
                icon={data.icon}
                description={data.description}
              />
            );
          })}
        </div>

        <div className="text-xl mt-3">And much more...</div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
          Go Back
        </Button>

        <Button type="optional" rounded="full" handleClick={() => props.handleNext({})}>
          Continue
        </Button>
      </div>

      <div className="mt-6">
        <TailoredFeature values={props.values} />
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}

export type TBillingMode = "billedMonthly" | "billedAnnually";

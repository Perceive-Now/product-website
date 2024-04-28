import classNames from "classnames";
import Button from "../../../../components/reusable/button";
import { useCallback } from "react";
import { logoutUser } from "../../../../stores/auth";
import { useNavigate } from "react-router-dom";
// import { getProducts } from "../../../../utils/api/product";
// import { useQuery } from "@tanstack/react-query";

// interface Props {
//   changeActiveStep?: (step: number) => void;
// }

const Prcing1 = () => {
  const navigate = useNavigate();

  // const { data: products, isLoading } = useQuery(["get-products"], async () => {
  //   return await getProducts();
  // });

  // // Fetching time period
  // useEffect(() => {
  //   if (!products) return;
  //   //
  // }, [products]);

  const ProductList = [
    {
      id: 1,
      title: "Pro Reports",
      price: "$995 each",
      description:
        "Access a high volume of custom reports and advanced analytics tools for in-depth analysis",
      is_popular: false,
      stripe_product_id: "price_1P9BQEKOLJKi8SxACenoUWUI",
      planDetails: [
        {
          title: "Market Analysis",
          desc: "Understand market dynamics, trends, and projections.",
        },
        {
          title: "Competitive Landscape",
          desc: "Analyze competitor strengths, weaknesses, and positioning.",
        },
        {
          title: "Consumer Landscape",
          desc: "Discover customer behaviors, preferences, and demographics.",
        },
        {
          title: "Commercialization Assessment",
          desc: "Assess market readiness and overcome launch hurdles.",
        },
        {
          title: "Regulatory Pathways:",
          desc: "Navigate regulations and ensure compliance.",
        },
      ],
    },
    {
      id: 1,
      title: "Premium Reports",
      price: "$1995 each",
      description: "Our most powerful model for intuitive analytics and visualization",
      is_popular: true,
      stripe_product_id: "price_1P9BV7KOLJKi8SxARZBihDp2",

      planDetails: [
        {
          title: "IP Licensing Targets",
          desc: "Maximize IP revenue through strategic licensing.",
        },
        {
          title: "Freedom to Operate",
          desc: "Minimize infringement risks and protect your innovation.",
        },
        {
          title: "Prior Art Search:",
          desc: " Verify invention novelty and support patent applications.",
        },
        {
          title: "Patent Validity/Invalidity",
          desc: "Assess patent enforceability for defense or challenge.",
        },
        {
          title: "Patent Infringement",
          desc: "Identify potential infringement cases proactively.",
        },
      ],
    },
  ];

  const onContinue = useCallback(() => {
    logoutUser();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container mx-auto ">
      <div className="border rounded-lg mx-auto">
        <div className="bg-primary-900 text-xl font-helvetica border-b text-center py-4 px-2 text-white rounded-t-lg">
          AGI powered IP and Market reports
        </div>
        <div className="grid grid-cols-2 px-5 gap-10 py-5 pt-16">
          {ProductList?.map((l, idx) => (
            <div
              key={idx * 59}
              className={classNames(
                idx === 1 ? "shadow-right h-[665px relative rounded-t-lg" : "rounded-lg",
                "relative text-center px-4 border  ",
              )}
            >
              {/* {
                  idx === 1 &&
                  <div className="bg-white absolute -bottom-24 h-24 w-[308px] inset-x-0 shadow-right rounded-b-lg" />
                } */}
              <div className="space-y-4 py-5">
                <div className="space-y-2  text-lg h-[160px]">
                  <h6 className="text-primary-900 font-bold ">{l.title}</h6>
                  <p className="text-primary-600 font-semibold">
                    <span>{l.price}</span>
                  </p>
                  <p className="text-[15px] leading-[24px] font-400">{l.description}</p>
                </div>
                <div className="space-y-4">
                  <Button type="secondary" classname="w-full" size="small">
                    Start Free Trial
                  </Button>
                  <div className="space-y-3">
                    {l.planDetails.map((plan) => (
                      <div
                        key={plan.title}
                        className="px-4 py-1.5 flex flex-col justify-center items-center gap-1"
                      >
                        <span className="font-600 shrink-0">{plan.title}</span>
                        <p className="text-sm">{plan.desc}</p>
                        {/* <PopOver desc={plan.desc} /> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id={"continue"} className="mt-5 flex items-center justify-center">
        <Button handleClick={onContinue} htmlType="submit" size="small">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Prcing1;

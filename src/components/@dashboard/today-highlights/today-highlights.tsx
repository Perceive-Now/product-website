import { useNavigate } from "react-router-dom";

//
import { getNumberShortForm } from "../../../utils/helpers";

//
import PageTitle from "../../reusable/page-title";

/*
 *
 **/
export default function TodayHighlights() {
  const navigate = useNavigate();
  // api: /api/v5/dashboard/highlights (get)

  const handleViewAll = (route: string, routeState: any = {}) => {
    navigate(route, {
      state: { ...routeState },
    });
  };

  return (
    <div className="w-100 border bg-white rounded-lg p-3 mt-3">
      <PageTitle
        title="Today's Highlights"
        titleClass="font-bold"
        info="hello world"
      />

      <div className="text-gray-800 text-lg font-medium">
        Global Technology Trends
      </div>

      <div className="mt-3 grid grid-cols-3 gap-x-3  gap-y-3">
        {TodayHighlightsData.map((highlightData, index) => {
          const { route, routeState, isNumberShortForm, valueSuffix } =
            metaInfo[highlightData.name]?? {};

          return (
            <div
              key={index}
              className="px-6 py-3 rounded-2xl flex items-center justify-center"
            >
              <div className="max-w-[240px] w-full">
                <div className="text-center text-md mb-2 capitalize">
                  {highlightData.name}
                </div>

                <div className="text-center text-[28px] mb-2 text-success-500">
                  {valueSuffix}
                  {isNumberShortForm
                    ? getNumberShortForm(highlightData.value)
                    : highlightData.value}
                </div>

                <hr className="border-[#D9D9D9]" />

                <div className="text-center pt-2">
                  <div
                    className="cursor-pointer text-purple-600"
                    onClick={() => handleViewAll(route, routeState)}
                  >
                    View All
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TodayHighlightsData = [
  {
    name: "patents",
    value: 513,
  },
  {
    name: "industry publications",
    value: 2892,
  },
  {
    name: "industry experts",
    value: 32,
  },
  {
    name: "funding",
    value: 25000000000,
  },
  {
    name: "academic publications",
    value: 1092,
  },
  {
    name: "academic experts",
    value: 48,
  },
];

const metaInfo: any = {
  patents: {
    route: "/patents",
  },
  "industry publications": {
    route: "/publications",
    routeState: {
      mode: "industry",
    },
  },
  "industry experts": {
    route: "/experts",
    routeState: {
      mode: "industry",
    },
  },
  funding: {
    route: "/funders",
    routeState: {
      mode: "academic",
    },
    isNumberShortForm: true,
    valueSuffix: "$",
  },
  "academic publications": {
    route: "/publications",
    routeState: {
      mode: "academic",
    },
  },
  "academic experts": {
    route: "/experts",
    routeState: {
      mode: "academic",
    },
  },
};

// import { useSearchParams } from 'react-router-dom';
import SubHeader from "../../../../../components/app/sub-header";
import Search, { IKeywordOption } from "../../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setDashboardSearch } from "../../../../../stores/dashboard";
// import Patents from "../../../../../components/@dashboard/patents";
// import CommonList from "../../../../../components/@dashboard/common-list";
// import { DummyData } from "../../../../../components/@dashboard/common-list/dummy_data";
// import FootprintHeatmap from "../../../../../components/@dashboard/footprint-heatmap";
import Popover from "../../../../../components/reusable/popover";
import { InfoIcon } from "../../../../../components/icons";

const Analytics = () => {
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const paramsClassification: string | null = searchParams.get("mode");

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  // const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");

  // const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };
  return (
    <div>
      <div>
        <SubHeader title={"Funders"} analytics={"/funders"} table={"/funders/table"} />
      </div>
      {/* Search bar */}
      <div className="grid grid-cols-8 mb-1">
        <div className="col-span-7">
          <Search
            required
            size="small"
            className="w-full"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          {keywords.length > 0 ? (
            <p className="mt-[4px]">
              <span>Showing patents for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>
            </p>
          ) : (
            <p className="mt-[4px] text-appGray-900">
              Search keywords e.g. “COVID-19” to see related patents.
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          {/* <Patents key={joinedKeywords} keywords={keywordValue} title={"Funding"} /> */}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h6 className="text-xl font-bold text-primary-900">Recent Funding</h6>
            <Popover trigger={<InfoIcon />}>Info text</Popover>
          </div>
          <div className=" h-[360px] overflow-y-auto">
            {RecentFundingDetails.map((recent, idx) => (
              <div key={idx} className="mt-2 p-1 bg-appGray-100 rounded-lg text-secondary-800">
                <p className="font-normal ">{recent.title}</p>
                <div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 font-bold">Type:</div>
                    <span className="col-span-1 text-appGray-800">{recent.type}</span>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 font-bold">Project lead:</div>
                    <span className="col-span-1 ">{recent.project_lead}</span>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 font-bold">Funding amount:</div>
                    <span className="col-span-1 ">{recent.funding_amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

const RecentFundingDetails = [
  {
    title:
      "Enhancing and Losing Adaptive Capacity in Systems of People and Nature: A Theoretical Framework for Sustainability",
    type: "Grant",
    project_lead: "Brian Walker",
    funding_amount: "1.09 M",
  },
  {
    title:
      "Enhancing and Losing Adaptive Capacity in Systems of People and Nature: A Theoretical Framework for Sustainability",
    type: "Grant",
    project_lead: "John Dansel",
    funding_amount: "400K",
  },
  {
    title:
      "Enhancing and Losing Adaptive Capacity in Systems of People and Nature: A Theoretical Framework for Sustainability",
    type: "Grant",
    project_lead: "John Dansel",
    funding_amount: "400K",
  },
  {
    title:
      "Enhancing and Losing Adaptive Capacity in Systems of People and Nature: A Theoretical Framework for Sustainability",
    type: "Grant",
    project_lead: "John Dansel",
    funding_amount: "400K",
  },
  {
    title:
      "Enhancing and Losing Adaptive Capacity in Systems of People and Nature: A Theoretical Framework for Sustainability",
    type: "Grant",
    project_lead: "John Dansel",
    funding_amount: "400K",
  },
];

// import { useSearchParams } from 'react-router-dom';
import SubHeader from "../../../../../components/app/sub-header";
import Search, { IKeywordOption } from "../../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setDashboardSearch } from "../../../../../stores/dashboard";
// import Patents from "../../../../../components/@dashboard/patents";
// import CommonList from "../../../../../components/@dashboard/common-list";
// import { DummyData } from "../../../../../components/@dashboard/common-list/dummy_data";
import FootprintHeatmap from "../../../../../components/@dashboard/footprint-heatmap";
import { LocationIcon } from "../../../../../components/icons";

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

  const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };
  return (
    <div>
      <div>
        <SubHeader title={"Inventor"} analytics={"/inventors"} table={"/inventors/table"} />
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
          {/* <Patents key={joinedKeywords} keywords={keywordValue} title={"Inventors"} /> */}
        </div>
        <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
          <h6 className="text-xl font-semibold text-primary-900 py-1">Recent Inventors</h6>
          <div className="space-y-2 h-[310px] overflow-y-auto pn_scroller">
            {RecentInventorLists.map((recent, idx) => (
              <div key={idx} className="p-1 bg-appGray-100 rounded-lg text-secondary-800">
                <p className="font-normal ">{recent.title}</p>
                <div className="flex items-center gap-x-1 mt-4">
                  <LocationIcon />
                  <span>{recent.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="">
          <FootprintHeatmap keywords={keywordValue} />
        </div>
        <div className="px-3 py-1 rounded-lg border bg-white border-gray-200 shadow">
          <h6 className="text-xl font-bold text-primary-900 py-1">
            Inventors from selected states
          </h6>
          <div className="space-y-2 h-[310px] overflow-y-auto pn_scroller">
            {RecentInventorLists.map((recent, idx) => (
              <div key={idx} className="p-1 bg-appGray-100 rounded-lg text-secondary-800">
                <p className="font-normal ">{recent.title}</p>
                <div className="flex items-center gap-x-1 mt-4">
                  <LocationIcon />
                  <span>{recent.location}</span>
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

const RecentInventorLists = [
  {
    title: "William Bruce Croft",
    location: "Amherst, US",
  },
  {
    title: "William Bruce Croft",
    location: "Amherst, US",
  },
  {
    title: "William Bruce Croft",
    location: "Amherst, US",
  },
  {
    title: "William Bruce Croft",
    location: "Amherst, US",
  },
  {
    title: "William Bruce Croft",
    location: "Amherst, US",
  },
];

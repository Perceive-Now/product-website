// import { useSearchParams } from 'react-router-dom';
import SubHeader from "../../../../../components/app/sub-header";
import Search, { IKeywordOption } from "../../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setDashboardSearch } from "../../../../../stores/dashboard";
import CommonList from "../../../../../components/@dashboard/common-list";
import { DummyData } from "../../../../../components/@dashboard/common-list/dummy_data";
import FootprintHeatmap from "../../../../../components/@dashboard/footprint-heatmap";
import ExpertsNetwork from "../../../../../components/@dashboard/experts-network";
import ExpertsGraph from "../../../../../components/@dashboard/experts-graph";
import RelatedKeywords from "../../../../../components/@dashboard/related-keywords";

const Analytics = () => {
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const paramsClassification: string | null = searchParams.get("mode");

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");

  const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };
  return (
    <div>
      <div>
        <SubHeader title={"University"} analytics={"/universities"} table={"/universities/table"} />
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
      <div className="mt-3">
        <div className="mt-1">
          <ExpertsNetwork keywords={keywordValue} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-3">
            <FootprintHeatmap keywords={keywordValue} />
          </div>
          <div>
            <h6 className="text-xl font-bold text-primary-900">Companies from selected state</h6>
            <CommonList dataList={DummyData} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 mt-4">
          <div className="col-span-1">
            <ExpertsGraph key={joinedKeywords} keywords={keywordValue} />
          </div>

          <div className="col-span-1">
            <RelatedKeywords
              keywords={keywordValue}
              title={"Technology classification distribution"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

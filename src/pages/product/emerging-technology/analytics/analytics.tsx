// import { useSearchParams } from 'react-router-dom';

import { useRef } from "react";
// import CommonList from "../../../../components/@dashboard/common-list";
// import { DummyData } from "../../../../components/@dashboard/common-list/dummy_data";
import ExpertsGraph from "../../../../components/@dashboard/experts-graph";
// import ExpertsMap from "../../../../components/@dashboard/experts-map";
import ExpertsNetwork from "../../../../components/@dashboard/experts-network";
// import FootprintHeatmap from "../../../../components/@dashboard/footprint-heatmap";
// import Patents from "../../../../components/@dashboard/patents";
import RelatedKeywords from "../../../../components/@dashboard/related-keywords";
import SubHeader from "../../../../components/app/sub-header";
// import PageTitle from "../../../../components/reusable/page-title";
// import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { useAppSelector } from "../../../../hooks/redux";
// import { setDashboardSearch } from "../../../../stores/dashboard";
import AcademicResearchTrends from "../../../../components/@dashboard/academic-research-trends";
import AcademicResearchFundings from "../../../../components/@dashboard/academic-research-fundings";

const Analytics = () => {
  const expertsNetworkRef = useRef<HTMLDivElement>(null);

  // const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const paramsClassification: string | null = searchParams.get("mode");

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  // const keywords = searchedKeywords.map((kwd) => kwd.value);
  // const joinedkeywords = keywords.join(", ");

  //
  const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");

  const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  // const handleSearch = (value: IKeywordOption[]) => {
  //   dispatch(setDashboardSearch(value));
  // };
  return (
    <div>
      <div>
        <SubHeader
          title={"Emerging Technologies"}
          analytics={"/emerging-technologies"}
          table={"/emerging-technologies/list"}
        />
      </div>

      <div className="pt-11 -mt-8" ref={expertsNetworkRef}>
        {/* <PageTitle title="Ip Landscape" titleClass="font-bold" /> */}

        {/* 6th row  */}
        <div className="mt-1">
          <ExpertsNetwork keywords={keywordValue} />
        </div>

        {/* 7th row map */}
        {/* <div className="mt-3">
          <ExpertsMap keywords={keywordValue} />
        </div> */}

        {/* 8th row; expert chart and related keywords */}
        <div className="grid grid-cols-2 gap-x-3 mt-3">
          <div className="col-span-1">
            <ExpertsGraph key={joinedKeywords} keywords={keywordValue} />
          </div>

          <div className="col-span-1">
            <RelatedKeywords keywords={keywordValue} title={"Exploding topics"} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <AcademicResearchTrends key={joinedKeywords} keywords={keywordValue} />
        </div>

        <div className="col-span-1">
          <AcademicResearchFundings key={joinedKeywords} keywords={keywordValue} />
        </div>
      </div>
      {/* Search bar */}
      {/* <div className="grid grid-cols-8 mb-1">
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
      </div> */}
      {/* <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <Patents key={joinedKeywords} keywords={keywordValue} />
        </div>
        <div>
          <h6 className="text-xl font-semibold text-primary-900">New Entrants</h6>
          <CommonList dataList={DummyData} />
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="">
          <FootprintHeatmap keywords={keywordValue} />
        </div>
        <div>
          <h6 className="text-xl font-bold text-primary-900">
            Recent patents from selected states
          </h6>
          <CommonList dataList={DummyData} />
        </div>
      </div> */}
    </div>
  );
};

export default Analytics;

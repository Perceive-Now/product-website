import { useRef } from "react";

//
import Navigator from "../../../components/@dashboard/navigator";

//
import Patents from "../../../components/@dashboard/patents";
import ScholaryPublication from "../../../components/@dashboard/scholary-publication";

//
import AcademicResearchTrends from "../../../components/@dashboard/academic-research-trends";
import AcademicResearchFundings from "../../../components/@dashboard/academic-research-fundings";

//
import ExpertsGraph from "../../../components/@dashboard/experts-graph";
import RelatedKeywords from "../../../components/@dashboard/related-keywords";

//
import ExpertsMap from "../../../components/@dashboard/experts-map";
import ExpertsNetwork from "../../../components/@dashboard/experts-network";

//
import Competitors from "../../../components/@dashboard/competitors";
import CompetetitorMap from "../../../components/@dashboard/competetitor-map";

//
import TodayHighlights from "../../../components/@dashboard/today-highlights";
import TopUniversities from "../../../components/@dashboard/top-universities";
import FootprintHeatmap from "../../../components/@dashboard/footprint-heatmap";

//
import TopFundersList from "../../../components/@dashboard/top-funders-list";
import TopFunderCharts from "../../../components/@dashboard/top-funder-charts";

//
import PageTitle from "../../../components/reusable/page-title";

//
import { useAppSelector } from "../../../hooks/redux";

/**
 *
 */
export default function DashboardPage() {
  const researchRef = useRef<HTMLDivElement>(null);
  const fundingsRef = useRef<HTMLDivElement>(null);
  const expertsNetworkRef = useRef<HTMLDivElement>(null);
  const competitiveLandscapeRef = useRef<HTMLDivElement>(null);

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");

  const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  return (
    <div>
      <Navigator
        competitiveLandscapeRef={competitiveLandscapeRef}
        expertsNetworkRef={expertsNetworkRef}
        researchRef={researchRef}
        fundingsRef={fundingsRef}
      />

      {searchedKeywords.length > 0 && (
        <p className="mb-3">
          <span>Showing results for: </span>
          <span className="font-semibold">{joinedKeywords}</span>
        </p>
      )}

      {/* 1st row charts */}
      <div className="grid grid-cols-2 gap-x-3">
        <div className="col-span-1">
          <ScholaryPublication key={joinedKeywords} keywords={keywordValue} />
        </div>

        <div className="col-span-1">
          {/* <Patents key={joinedKeywords} keywords={keywordValue} title={"Funding"} /> */}
        </div>
      </div>

      {/* 2nd row map */}
      <div className="mt-3">
        <FootprintHeatmap keywords={keywordValue} />
      </div>

      {/* 3rd row map */}
      <div className="mt-3">
        <TodayHighlights keywords={keywordValue} />
      </div>

      {/* Competitor section */}
      <div className="pt-11 -mt-8" ref={competitiveLandscapeRef}>
        <PageTitle title="Companies IP" titleClass="font-bold" />

        {/* 4th row  */}
        <div className="mt-1">
          <Competitors keywords={keywordValue} />
        </div>

        {/* 5th row map */}
        <div className="mt-3">
          <CompetetitorMap keywords={keywordValue} />
        </div>
      </div>

      {/* Expert network section */}
      <div className="pt-11 -mt-8" ref={expertsNetworkRef}>
        <PageTitle title="Inventors Network" titleClass="font-bold" />

        {/* 6th row  */}
        <div className="mt-1">
          <ExpertsNetwork keywords={keywordValue} />
        </div>

        {/* 7th row map */}
        <div className="mt-3">
          <ExpertsMap keywords={keywordValue} />
        </div>

        {/* 8th row; expert chart and related keywords */}
        <div className="grid grid-cols-2 gap-x-3 mt-3">
          <div className="col-span-1">
            <ExpertsGraph key={joinedKeywords} keywords={keywordValue} />
          </div>

          <div className="col-span-1">
            <RelatedKeywords keywords={keywordValue} title="aaa" />
          </div>
        </div>
      </div>

      {/* Academic R&D Section */}
      <div className="pt-11 -mt-8" ref={researchRef}>
        <PageTitle title="Universities" titleClass="font-bold" />

        {/* 9th row */}
        <div className="mt-1">
          <TopUniversities keywords={keywordValue} />
        </div>

        {/* Charts for Academinc R&D */}
        <div className="grid grid-cols-2 gap-x-3 mt-3">
          <div className="col-span-1">
            <AcademicResearchTrends key={joinedKeywords} keywords={keywordValue} />
          </div>

          <div className="col-span-1">
            <AcademicResearchFundings key={joinedKeywords} keywords={keywordValue} />
          </div>
        </div>
      </div>

      {/* Fundign Section */}
      <div className="pt-11 -mt-8" ref={fundingsRef}>
        <PageTitle title="Funding" titleClass="font-bold" />

        {/* 11th row */}
        <div className="grid grid-cols-2 gap-x-3 mt-1">
          <div className="col-span-1">
            <TopFunderCharts key={joinedKeywords} keywords={keywordValue} />
          </div>

          <div className="col-span-1">
            <TopFundersList keywords={keywordValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const competitiveLandscapeRef = useRef(null);
  const expertsNetworkRef = useRef(null);
  const researchRef = useRef(null);
  const fundingsRef = useRef(null);

  //
  const searchedKeywords =
    useAppSelector((state) => state.dashboard?.search) ?? [];

  const joinedKeywords = searchedKeywords
    .map((kwd) => `"${kwd.value}"`)
    .join(", ");

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

      {searchedKeywords && (
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
          <Patents key={joinedKeywords} keywords={keywordValue} />
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

      {/* 4th row  */}
      <div className="pt-15 -mt-12" ref={competitiveLandscapeRef}>
        <PageTitle title="Competitive Landscape" titleClass="font-bold" />

        <div className="mt-1">
          <Competitors keywords={keywordValue} />
        </div>
      </div>

      {/* 5th row map */}
      <div className="mt-3">
        <CompetetitorMap keywords={keywordValue} />
      </div>

      {/* 6th row  */}
      <div className="pt-15 -mt-12" ref={expertsNetworkRef}>
        <PageTitle title="Experts Network" titleClass="font-bold" />

        <div className="mt-1">
          <ExpertsNetwork keywords={keywordValue} />
        </div>
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
          <RelatedKeywords keywords={keywordValue} />
        </div>
      </div>

      {/* 9th row */}
      <div className="pt-15 -mt-12" ref={researchRef}>
        <PageTitle title="Academic R&D" titleClass="font-bold" />

        <div className="mt-1">
          <TopUniversities keywords={keywordValue} />
        </div>
      </div>

      {/* Charts for Academinc R&D */}
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <AcademicResearchTrends
            key={joinedKeywords}
            keywords={keywordValue}
          />
        </div>

        <div className="col-span-1">
          <AcademicResearchFundings
            key={joinedKeywords}
            keywords={keywordValue}
          />
        </div>
      </div>

      {/* 11th row */}
      <div className="pt-15 -mt-12" ref={fundingsRef}>
        <PageTitle title="Funding" titleClass="font-bold" />
      </div>

      <div className="grid grid-cols-2 gap-x-3 mt-1">
        <div className="col-span-1">
          <TopFunderCharts key={joinedKeywords} keywords={keywordValue} />
        </div>

        <div className="col-span-1">
          <TopFundersList keywords={keywordValue} />
        </div>
      </div>
    </div>
  );
}

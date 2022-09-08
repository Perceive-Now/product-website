import { useState } from "react";
import { useLocation } from "react-router-dom";

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
import Competitors from "../../../components/@dashboard/competitors";
import ExpertsNetwork from "../../../components/@dashboard/experts-network";
import TodayHighlights from "../../../components/@dashboard/today-highlights";
import CompetetitorMap from "../../../components/@dashboard/competetitor-map";
import TopUniversities from "../../../components/@dashboard/top-universities";
import FootprintHeatmap from "../../../components/@dashboard/footprint-heatmap";

//
import PageTitle from "../../../components/reusable/page-title";
import { IKeywordOption } from "../../../components/reusable/search";
import TopFundersList from "../../../components/@dashboard/top-funders-list";
import TopFunderCharts from "../../../components/@dashboard/top-funder-charts";

/**
 *
 */
export default function DashboardPage() {
  const location = useLocation();
  const locationState = location.state as ILocationState;

  const [searchKeywords] = useState(locationState?.search ?? []);
  const joinedKeywords = searchKeywords
    .map((kwd) => `"${kwd.value}"`)
    .join(", ");

  return (
    <div>
      {searchKeywords && (
        <p className="mb-3">
          <span>Searching for: </span>
          <span className="font-semibold">{joinedKeywords}</span>
        </p>
      )}

      {/* 1st row charts */}
      <div className="grid grid-cols-2 gap-x-3">
        <div className="col-span-1">
          <ScholaryPublication />
        </div>

        <div className="col-span-1">
          <Patents />
        </div>
      </div>

      {/* 2nd row map */}
      <FootprintHeatmap keywords={searchKeywords.map((kwd) => kwd.value)} />

      {/* 3rd row map */}
      <TodayHighlights />

      {/* 4th row  */}
      <div className="pt-4">
        <PageTitle
          title="Competitive Landscape"
          titleClass="font-bold"
          learnHow={true}
        />
      </div>

      <Competitors />
      {/* 4th row end */}

      {/* 5th row map */}
      <CompetetitorMap keywords={searchKeywords.map((kwd) => kwd.value)} />

      {/* 6th row  */}
      <div className="pt-4">
        <PageTitle
          title="Experts Network"
          titleClass="font-bold"
          learnHow={true}
        />
      </div>
      <ExpertsNetwork keywords={searchKeywords.map((kwd) => kwd.value)} />
      {/* 6th row end */}

      {/* 7th row map */}
      <ExpertsMap keywords={searchKeywords.map((kwd) => kwd.value)} />

      {/* 8th row; expert chart and related keywords */}
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <ExpertsGraph />
        </div>

        <div className="col-span-1">
          <RelatedKeywords />
        </div>
      </div>

      {/* 9th row */}
      <div className="mt-4 mb-2">
        <PageTitle
          learnMore="Learn How"
          title="Academic R&D"
          titleClass="font-bold"
        />
      </div>

      <TopUniversities />

      {/* Charts for Academinc R&D */}
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <AcademicResearchTrends />
        </div>

        <div className="col-span-1">
          <AcademicResearchFundings />
        </div>
      </div>

      {/* 11th row */}
      <div className="mt-4 mb-2">
        <PageTitle
          learnMore="Learn How"
          title="Funding"
          titleClass="font-bold"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <TopFunderCharts />
        </div>

        <div className="col-span-1">
          <TopFundersList keywords={searchKeywords.map((kwd) => kwd.value)} />
        </div>
      </div>
    </div>
  );
}

interface ILocationState {
  search?: IKeywordOption[];
}

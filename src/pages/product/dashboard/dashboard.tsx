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
  const searchedKeywords =
    useAppSelector((state) => state.dashboard?.search) ?? [];

  const joinedKeywords = searchedKeywords
    .map((kwd) => `"${kwd.value}"`)
    .join(", ");

  return (
    <div>
      {searchedKeywords && (
        <p className="mb-3">
          <span>Searching for: </span>
          <span className="font-semibold">{joinedKeywords}</span>
        </p>
      )}

      {/* 1st row charts */}
      <div className="grid grid-cols-2 gap-x-3">
        <div className="col-span-1">
          <ScholaryPublication
            keywords={searchedKeywords.map((kwd) => kwd.value)}
          />
        </div>

        <div className="col-span-1">
          <Patents keywords={searchedKeywords.map((kwd) => kwd.value)} />
        </div>
      </div>

      {/* 2nd row map */}
      <FootprintHeatmap keywords={searchedKeywords.map((kwd) => kwd.value)} />

      {/* 3rd row map */}
      <TodayHighlights keywords={searchedKeywords.map((kwd) => kwd.value)} />

      {/* 4th row  */}
      <div className="pt-4">
        <PageTitle title="Competitive Landscape" titleClass="font-bold" />
      </div>

      <Competitors keywords={searchedKeywords.map((kwd) => kwd.value)} />
      {/* 4th row end */}

      {/* 5th row map */}
      <CompetetitorMap keywords={searchedKeywords.map((kwd) => kwd.value)} />

      {/* 6th row  */}
      <div className="pt-4">
        <PageTitle title="Experts Network" titleClass="font-bold" />
      </div>

      <ExpertsNetwork keywords={searchedKeywords.map((kwd) => kwd.value)} />
      {/* 6th row end */}

      {/* 7th row map */}
      <ExpertsMap keywords={searchedKeywords.map((kwd) => kwd.value)} />

      {/* 8th row; expert chart and related keywords */}
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <ExpertsGraph keywords={searchedKeywords.map((kwd) => kwd.value)} />
        </div>

        <div className="col-span-1">
          <RelatedKeywords
            keywords={searchedKeywords.map((kwd) => kwd.value)}
          />
        </div>
      </div>

      {/* 9th row */}
      <div className="mt-4 mb-1">
        <PageTitle title="Academic R&D" titleClass="font-bold" />
      </div>

      <TopUniversities keywords={searchedKeywords.map((kwd) => kwd.value)} />

      {/* Charts for Academinc R&D */}
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <AcademicResearchTrends
            keywords={searchedKeywords.map((kwd) => kwd.value)}
          />
        </div>

        <div className="col-span-1">
          <AcademicResearchFundings
            keywords={searchedKeywords.map((kwd) => kwd.value)}
          />
        </div>
      </div>

      {/* 11th row */}
      <div className="mt-4 mb-2">
        <PageTitle title="Funding" titleClass="font-bold" />
      </div>
      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div className="col-span-1">
          <TopFunderCharts
            keywords={searchedKeywords.map((kwd) => kwd.value)}
          />
        </div>

        <div className="col-span-1">
          <TopFundersList keywords={searchedKeywords.map((kwd) => kwd.value)} />
        </div>
      </div>
    </div>
  );
}

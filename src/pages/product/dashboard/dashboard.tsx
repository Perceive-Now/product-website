import { useState } from "react";
import { useLocation } from "react-router-dom";

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
        <p>
          <span>Searching for: </span>
          <span className="font-semibold">{joinedKeywords}</span>
        </p>
      )}

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
      <ExpertsNetwork />
      {/* 6th row end */}

      {/* 7th row map */}
      <ExpertsMap keywords={searchKeywords.map((kwd) => kwd.value)} />

      {/* 9th row */}
      <div className="mt-4 mb-2">
        <PageTitle
          learnMore="Learn How"
          title="Academic R&D"
          titleClass="font-bold"
        />
      </div>

      <TopUniversities />
    </div>
  );
}

interface ILocationState {
  search?: IKeywordOption[];
}

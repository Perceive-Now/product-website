import { useState } from "react";
import { useLocation } from "react-router-dom";

//
import PageTitle from "../../../components/reusable/page-title";
import TopUniversities from "../../../components/@dashboard/top-universities";
import FootprintHeatmap from "../../../components/@dashboard/footprint-heatmap";

//
import { IKeywordOption } from "../../../components/reusable/search/search";
import CompetetitorMap from "../../../components/@dashboard/competetitor-map";
import ExpertsMap from "../../../components/@dashboard/experts-map";

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

      {/* 5th row map */}
      <CompetetitorMap keywords={searchKeywords.map((kwd) => kwd.value)} />

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

import { useOutletContext } from "react-router-dom";

//
import PageTitle from "../../../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "../hawk-eye";

/**
 *
 */
export default function HawkEyeFundersSection() {
  const { searchKeywords, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      {searchKeywords && searchKeywords.length > 0 && (
        <p className="text-sm text-gray-700 my-3">
          <span>{count?.funders}</span>
          <span> funders were found for:</span>
          <span> "</span>
          <span className="font-semibold text-gray-900">
            {searchKeywords.map((keywords) => {
              return <span key={keywords.value}> {keywords.value}</span>;
            })}
          </span>
          <span>"</span>
        </p>
      )}

      <PageTitle title="Funders" learnMore="Learn more" />
    </div>
  );
}

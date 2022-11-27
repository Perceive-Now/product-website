import { useOutletContext } from "react-router-dom";

//
import PageTitle from "../../../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "../hawk-eye";

/**
 *
 */
export default function HawkEyePublicationsSection() {
  const { searchKeywords, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      {searchKeywords && searchKeywords.length > 0 && (
        <p className="text-sm text-gray-700 my-3">
          <span>{count?.publications}</span>
          <span> publications were found for:</span>
          <span> "</span>
          <span className="font-semibold text-gray-900"></span>
          <span>"</span>
        </p>
      )}
      <PageTitle title="Publications" learnMore="Learn more" />
    </div>
  );
}

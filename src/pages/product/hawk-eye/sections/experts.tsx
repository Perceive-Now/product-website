import { useOutletContext } from "react-router-dom";

//
import PageTitle from "../../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "../hawk-eye";

/**
 *
 */
export default function HawkEyeExpertsSection() {
  const { searchText, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      <p className="text-sm text-gray-700 my-3">
        <span>{count?.experts}</span>
        <span> experts were found for:</span>
        <span> "</span>
        <span className="font-semibold text-gray-900">{searchText}</span>
        <span>"</span>
      </p>

      <PageTitle title="Experts" learnMore="Learn more" />
    </div>
  );
}

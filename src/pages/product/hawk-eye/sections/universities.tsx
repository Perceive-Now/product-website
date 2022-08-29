import { useOutletContext } from "react-router-dom";

//
import PageTitle from "../../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "../hawk-eye";

/**
 *
 */
export default function HawkEyeUniversitiesSection() {
  const { searchKeywords, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      {searchKeywords && searchKeywords.length > 0 && (
        <p className="text-sm text-gray-700 my-3">
          <span>{count?.universities}</span>
          <span> universities were found for:</span>
          <span> "</span>
          <span className="font-semibold text-gray-900">
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
          </span>
          <span>"</span>
        </p>
      )}

      <PageTitle title="Universities" learnMore="Learn more" />
    </div>
  );
}

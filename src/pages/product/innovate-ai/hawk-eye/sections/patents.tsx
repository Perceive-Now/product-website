import { useOutletContext } from "react-router-dom";

//
import PageTitle from "../../../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "../hawk-eye";

/**
 *
 */
export default function HawkEyePatentsSection() {
  const { searchKeywords, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      {searchKeywords && searchKeywords.length > 0 && (
        <p className="text-sm text-gray-700 my-3">
          <span>{count?.patents}</span>
          <span> patents were found for:</span>
          <span> &quot;</span>
          <span className="font-semibold text-gray-900">
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
          </span>
          <span>&quot;</span>
        </p>
      )}

      <PageTitle title="Patents" learnMore="Learn more" />
    </div>
  );
}

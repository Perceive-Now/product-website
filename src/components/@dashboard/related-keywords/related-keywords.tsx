import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import RelatedKeyword from "../../@product/relatedKeyword";

//
import { getRelatedKeywords } from "../../../utils/api/dashboard";

/**
 *
 */
export default function RelatedKeywords() {
  const { data } = useQuery(["dashboard-most-related-keywords"], async () => {
    return await getRelatedKeywords();
  });

  const allKeywords = data ?? [];

  return (
    <div className="border border-gray-200 rounded-lg shadow h-full w-full py-2 px-3 overflow-y-scroll">
      <PageTitle title="Most Related Keywords" />

      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {allKeywords.map((keyword, index) => (
          <RelatedKeyword keyword={keyword} key={index} />
        ))}
      </div>
    </div>
  );
}

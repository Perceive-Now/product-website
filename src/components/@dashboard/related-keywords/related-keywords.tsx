import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import RelatedKeyword from "../../@product/relatedKeyword";

//
import { getRelatedKeywords } from "../../../utils/api/dashboard";

/**
 *
 */
export default function RelatedKeywords(props: IRelatedKeywordsProps) {
  const { data } = useQuery(
    ["dashboard-most-related-keywords", ...props.keywords],
    async () => {
      return await getRelatedKeywords(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const allKeywords = data ?? [];

  return (
    <div className="border border-gray-200 rounded-lg shadow h-full w-full py-2 px-3 overflow-y-auto">
      <PageTitle title="Most Related Keywords" titleClass="font-semibold" />

      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
        {allKeywords.slice(0, 15).map((keyword, index) => (
          <RelatedKeyword keyword={keyword} key={index} />
        ))}
      </div>
    </div>
  );
}

interface IRelatedKeywordsProps {
  keywords: string[];
}

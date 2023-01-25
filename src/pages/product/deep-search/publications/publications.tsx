import { useQuery } from "@tanstack/react-query";

//
import RelatedKeyword from "../../../../components/@product/relatedKeyword";

//
import { useAppSelector } from "../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../utils/api/dashboard";

//
export default function PublicationListPage() {
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length },
  );

  //
  return (
    <div>
      {keywords.length && (
        <div className="mt-5">
          <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

          <div className="flex flex-wrap gap-1">
            {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
              <RelatedKeyword keyword={keyword} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

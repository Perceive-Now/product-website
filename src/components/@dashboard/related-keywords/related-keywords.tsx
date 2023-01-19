import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import RelatedKeyword from "../../@product/relatedKeyword";

//
import { getRelatedKeywords } from "../../../utils/api/dashboard";

/**
 *
 */
export default function RelatedKeywords(props: IRelatedKeywordsProps) {
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-most-related-keywords", ...props.keywords],
    async () => {
      return await getRelatedKeywords(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const allKeywords = data ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle title="Most Related Keywords" titleClass="font-semibold" />
      }
    >
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
        {allKeywords.slice(0, 15).map((keyword, index) => (
          <RelatedKeyword keyword={keyword} key={index} />
        ))}
      </div>
    </DataSection>
  );
}

interface IRelatedKeywordsProps {
  keywords: string[];
}

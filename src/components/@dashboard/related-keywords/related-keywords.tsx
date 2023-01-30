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
    { enabled: !!props.keywords.length },
  );

  const keywords = Object.entries(data?.cloud_weights ?? {})
    ?.sort((a, b) => b[1] - a[1])
    ?.map((item) => item[0]);

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={<PageTitle title="Most Related Keywords" titleClass="font-semibold" />}
    >
      <div className="mt-2 min-h-[324px]">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {keywords?.slice(0, 15).map((keyword, index) => (
            <RelatedKeyword keyword={keyword} key={index} />
          ))}
        </div>
      </div>
    </DataSection>
  );
}

interface IRelatedKeywordsProps {
  keywords: string[];
}

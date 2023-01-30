import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "react-router-dom";
import { ActionButton } from "../../../../../components/@product/publicationItem/publicationItem";
import {
  BookmarkIcon,
  CitationIcon,
  LoadingIcon,
  ShareIcon,
} from "../../../../../components/icons";
import { getDeepSearchPublicationItemDetail } from "../../../../../utils/api/deep-search/publications";

/**
 *
 */
export default function PublicationDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const decodedId = decodeURIComponent(id ?? "");

  // Getting publication detail
  const { data: publicationData, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (!decodedId) return;
      if (!source) return;

      //
      return await getDeepSearchPublicationItemDetail(source, decodedId);
    },
    enabled: !!decodedId && !!source,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center text-primary-600">
        <LoadingIcon width={40} height={40} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-11 gap-x-5">
      <div className="col-span-9">
        <p className="text-2xl text-primary-900 font-semibold">{publicationData?.title}</p>

        <div className="mt-4 text-gray-700">
          <div className="grid grid-cols-10 gap-x-2 mb-2">
            <p className="col-span-2 font-bold text-right">Journal name:</p>
            <p className="col-span-8">{publicationData?.journal_name ?? "-"}</p>
          </div>

          <div className="grid grid-cols-10 gap-x-2 mb-2">
            <p className="col-span-2 font-bold text-right">Authors Name:</p>
            <p className="col-span-8">{publicationData?.authors?.join(", ")}</p>
          </div>

          <div className="grid grid-cols-10 gap-x-2 mb-2">
            <p className="col-span-2 font-bold text-right">Published:</p>
            <p className="col-span-8">
              {dayjs(publicationData?.published_date).format("MMMM DD, YYYY")}
            </p>
          </div>

          <div className="grid grid-cols-10 gap-x-2 mb-2">
            <p className="col-span-2 font-bold text-right">DOI:</p>
            <p className="col-span-8">{publicationData?.doi_url}</p>
          </div>

          {publicationData?.abstract && (
            <div className="grid grid-cols-10 gap-x-2 mb-2">
              <p className="col-span-2 font-bold text-right">Abstract:</p>
              <p className="col-span-8">{publicationData.abstract}</p>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <div className="mb-4 max-w-[168px]">
          {source === "Open" ? (
            <div className="px-2 py-1 bg-success-500 text-white">Open Access</div>
          ) : (
            <div className="px-2 py-1 bg-danger-500 text-white">Closed Access</div>
          )}
        </div>

        <div>
          <ActionButton className="mb-3">
            <BookmarkIcon className="mr-1" />
            <span>Bookmark</span>
          </ActionButton>

          <ActionButton className="mb-3">
            <CitationIcon className="mr-1" />
            <span>Generate citation</span>
          </ActionButton>

          <ActionButton className="mb-3">
            <ShareIcon className="mr-1" />
            <span>Share</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

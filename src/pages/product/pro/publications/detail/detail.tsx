import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import dayjs from "dayjs";
import { useParams, useSearchParams } from "react-router-dom";
import { ActionButton } from "../../../../../components/@product/publicationItem/publicationItem";
import { BookmarkIcon, CitationIcon, LoadingIcon } from "../../../../../components/icons";
import ShareButton from "../../../../../components/reusable/ShareButton";
import { getDeepSearchPublicationItemDetail } from "../../../../../utils/api/deep-search/publications";
import Breadcrumb from "../../../../../components/reusable/breadcrumb";

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
    <>
      <Breadcrumb breadCrumbs={breadcrumbs} />
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-9">
          <p className="text-2xl text-primary-900 font-semibold">{publicationData?.title}</p>

          <div className="mt-4 text-gray-700">
            <div className="grid grid-cols-10 gap-x-2 mb-2">
              <p className="col-span-2 font-bold text-right">Journal name:</p>
              <p className="col-span-8">{publicationData?.publisher ?? "-"}</p>
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
              <p className="col-span-8">
                <a href={publicationData?.doi_url ?? ""} target="_blank" rel="noreferrer">
                  {publicationData?.doi_url}
                </a>
              </p>
            </div>

            {publicationData?.abstract && (
              <div className="grid grid-cols-10 gap-x-2 mb-2">
                <p className="col-span-2 font-bold text-right">Abstract:</p>
                <p className="col-span-8">{publicationData.abstract}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-3">
          <div className="mb-4">
            <div
              className={classNames(
                "px-2 py-1 text-white",
                source === "Open" ? "bg-success-500" : "bg-danger-500",
              )}
            >
              {source} Access
            </div>
          </div>

          <div>
            <ActionButton className="mb-3">
              <BookmarkIcon className="mr-1 flex-shrink-0" />
              <span>Bookmark</span>
            </ActionButton>

            <ActionButton className="mb-3">
              <CitationIcon className="mr-1 flex-shrink-0" />
              <span>Generate citation</span>
            </ActionButton>

            <ShareButton />
          </div>
        </div>
      </div>
    </>
  );
}

const breadcrumbs = [
  { title: "Publications", link: "/publications" },
  { title: "Publication Details", link: "/patents/1" },
];

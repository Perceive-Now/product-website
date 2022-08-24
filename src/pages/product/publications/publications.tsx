import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

//
import {
  BookmarkIcon,
  CitationIcon,
  ShareIcon,
} from "../../../components/icons";
import RelatedKeyword from "../../../components/reusable/relatedKeyword";

/**
 *
 */
export default function PublicationsPage() {
  const [searchText, setSearchText] = useState<string>("");
  const [publicationsData] = useState<IPublicationData[] | []>([
    {
      title:
        "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
      description:
        "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
      id: 1,
    },
  ]);
  const [relatedKeywords] = useState<string[] | []>([
    "sar-cov 2",
    "miinimally invasive surgery murgery",
  ]);

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(searchValue) => setSearchText(searchValue)} />
      </div>

      {searchText && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">
              Showing trending publications for:
            </span>
            <span> “{searchText}”</span>
          </p>

          <div className="my-3">
            <PageTitle title="Publications" learnMore="Learn more" />
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-9 mr-6">
              {publicationsData.map((publicationData: IPublicationData) => {
                return (
                  <div key={publicationData.id} className="mb-4">
                    <div className="text-xl font-medium text-primary-900 truncate mb-1">
                      {publicationData.title}
                    </div>

                    <div className="text-appGray-900 mb-1 line-clamp-2">
                      {publicationData.description}
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex items-center text-primary-900 font-medium">
                        <BookmarkIcon className="mr-1" /> Bookmark
                      </div>

                      <div className="mr-4 flex items-center text-primary-900 font-medium">
                        <CitationIcon className="mr-1" />
                        Generate citation
                      </div>

                      <div className="mr-4 flex items-center text-primary-900 font-medium">
                        <ShareIcon className="mr-1" />
                        Share
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-span-3">
              <div className="uppercase font-semibold text-primary-900 text-sm mb-2">
                Related keywords
              </div>

              <div className="flex items-start flex-col">
                {relatedKeywords.map((keyword) => (
                  <RelatedKeyword keyword={keyword} key={keyword} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface IPublicationData {
  title: string;
  description: string;
  id: number;
}

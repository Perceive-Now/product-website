import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

//
import RelatedKeyword from "../../../components/reusable/relatedKeyword";
import PublicationItem from "../../../components/reusable/publicationItem";

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
    {
      title:
        "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
      description:
        "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
      id: 2,
    },
    {
      title:
        "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
      description:
        "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
      id: 3,
    },
    {
      title:
        "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
      description:
        "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
      id: 4,
    },
    {
      title:
        "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
      description:
        "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
      id: 5,
    },
  ]);
  const [relatedKeywords] = useState<string[] | []>([
    "sar-cov 2",
    "minimally invasive surgery murgery",
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
                  <PublicationItem
                    data={publicationData}
                    key={publicationData.id}
                  />
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

export interface IPublicationData {
  title: string;
  description: string;
  id: number;
}

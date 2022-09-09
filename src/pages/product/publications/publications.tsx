import { useEffect, useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import Pagination from "../../../components/reusable/pagination";
import RelatedKeyword from "../../../components/@product/relatedKeyword";
import PublicationItem from "../../../components/@product/publicationItem";
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { handleSetDashboardSearch } from "../../../stores/dashboard";

//

/**
 *
 */
export default function PublicationsPage() {
  const dispatch = useAppDispatch();
  const dashboardSearch = useAppSelector((state) => state.dashboard?.search);

  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  //
  useEffect(() => {
    setSearchKeywords(dashboardSearch);
  }, [dashboardSearch]);

  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(handleSetDashboardSearch(value));
  };

  const [publicationsData] = useState<IPublicationData[]>([
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

  const [relatedKeywords] = useState<string[]>([
    "sar-cov 2",
    "minimally invasive surgery murgery",
  ]);

  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchKeywords} onSubmit={handleSearch} />
      </div>

      {searchKeywords && searchKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">
              Showing trending publications for:
            </span>
            ”
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
            ”
          </p>

          <div className="my-3">
            <PageTitle title="Publications" learnMore="Learn more" />
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-9 mr-6">
              {publicationsData.map((publicationData: IPublicationData) => (
                <PublicationItem
                  data={publicationData}
                  key={publicationData.id}
                />
              ))}

              <div className="flex justify-center mt-7">
                <Pagination
                  currentPage={currentPage}
                  totalCount={111}
                  gotoPage={gotoPage}
                />
              </div>
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
  id: number;
  title: string;
  description: string;
}

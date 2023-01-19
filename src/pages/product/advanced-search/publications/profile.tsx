import classNames from "classnames";
import { useState } from "react";
import { ActionButton } from "../../../../components/@product/publicationItem/publicationItem";
import { BookmarkIcon, CitationIcon, InfoIcon, ShareIcon } from "../../../../components/icons";

//
import PageTitle from "../../../../components/reusable/page-title";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDashboardSearch } from "../../../../stores/dashboard";

/**
 *
 */
export default function PublicationPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [publicationData] = useState<IPublicationData>({
    isOpen: true,
    title:
      "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
    published: "November 13, 2020",
    doi: "https://doi.org/10.1016/j.cmi.2020.11.004",
    journalName: "Clinical Microbiology and Infection",
    authors_affiliation: [
      "Eliseo Albert",
      "Felipe Bueno",
      "Dixie Huntley",
      "Estefanía Molla",
      "Miguel Ángel Fernández-Fuentes",
      "Mireia Martínez",
      "Sandrine Poujois",
      "Lorena Forqué",
      "Arantxa Valdivia",
      "Carlos Solano de la Asunción",
      "Josep Ferrer",
      "Javier Colomina",
      "David Navarro",
    ],
    abstract: `We evaluated the Panbio™ COVID-19 AG Rapid Test Device (RAD) for the diagnosis of COVID-19 in symptomatic patients attended in primary healthcare centers (n=412). Overall specificity and sensitivity of RAD was 100% and 79.6%, respectively, taking RT-PCR as the reference. SARS-CoV-2 could not be cultured from specimens yielding RT-PCR+/RAD- results.`,
    fullTextOfPaper: "https://www.sciencedirect.com/science/article/pii/S1198743X20306972",
  });

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  return (
    <div>
      <div className="mb-5 grid grid-cols-12">
        <div className="col-span-8 flex items-center">
          <div className="w-2/3">
            <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
          </div>
          <InfoIcon className="ml-2" />
        </div>

        <div className="col-span-4 flex justify-end	items-center">
          <ReportButtons />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-9 text-appGray-900">
          <div className="mb-3">
            <PageTitle title={publicationData.title} titleClass="font-semibold" />
          </div>

          <div>
            <ProfileProperty title="Published" value={publicationData.published} />

            <ProfileProperty isLink title="DOI" value={publicationData.doi} />

            <ProfileProperty title="Journal name" value={publicationData.journalName} />

            <ProfileProperty
              title="Authors & Affiliation"
              value={publicationData.authors_affiliation.join(", ")}
            />

            <ProfileProperty title="Abstract" value={publicationData.abstract} />

            <ProfileProperty
              isLink
              title="Full Text of the paper"
              value={publicationData.fullTextOfPaper}
            />
          </div>
        </div>

        <div className="col-span-3">
          <span className="mb-3 w-full block">
            <div
              className={classNames(
                "w-full py-1 px-2 text-left text-white",
                publicationData.isOpen ? "bg-success-500" : "bg-danger-500",
              )}
            >
              {publicationData.isOpen ? "Open Access" : "Closed Access"}
            </div>
          </span>

          <div className="flex flex-col">
            <span className="mb-3">
              <ActionButton>
                <BookmarkIcon className="mr-1" /> Bookmark
              </ActionButton>
            </span>

            <span className="mb-3">
              <ActionButton>
                <CitationIcon className="mr-1" />
                Generate citation
              </ActionButton>
            </span>

            <span className="mb-3">
              <ActionButton>
                <ShareIcon className="mr-1" />
                Share
              </ActionButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileProperty(props: IProfilePropertyProps) {
  return (
    <div className="pb-2 grid grid-cols-12">
      <span className="font-bold col-span-3 text-right pr-4">{props.title}:</span>

      {props.isLink && (
        <a href={props.value} target="_blank" rel="noreferrer">
          {props.value}
        </a>
      )}

      {!props.isLink && <span className="col-span-9">{props.value}</span>}
    </div>
  );
}

interface IProfilePropertyProps {
  title: string;
  value: string;
  isLink?: boolean;
}

interface IPublicationData {
  isOpen: boolean;
  title: string;
  published: string;
  doi: string;
  journalName: string;
  authors_affiliation: string[];
  abstract: string;
  fullTextOfPaper: string;
}

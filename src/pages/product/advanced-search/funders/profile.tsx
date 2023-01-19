import { useState } from "react";

//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

//
import { InfoIcon } from "../../../../components/icons";

//
import PublicationItem from "../../../../components/@product/publicationItem/publicationItem";
import PageTitle from "../../../../components/reusable/page-title";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import Pagination from "../../../../components/reusable/pagination";

//
import { setDashboardSearch } from "../../../../stores/dashboard";

//
import { IPublicationItem } from "../../../../utils/api/advance-search";

/**
 *
 */
export default function FunderProfilePage() {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [publicationData] = useState<IFunderData>({
    title:
      "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
    location: "Washington, D.C., United States",
    totalFunding: "83.1 Billion",
    expertise: "???",

    associatedPublications: [
      {
        abstract:
          "1.AbstractBackgroundThe vast majority of the commercially available LFIA is used to detect SARS-CoV-2 antibodies qualitatively. Recently, a novel fluorescence-based LIFA test was developed for quantitative measurement of the total binding antibody units (BAU/mL) against the receptor-binding domain of the SARS-CoV-2 spike protein (S-RBD).AimTo evaluate the performance of the fluorescence LIFA Finecare™ 2019-nCoV S-RBD test along with its reader (Model No.: FS-113).MethodsPlasma from 150 RT-PCR confirmed-positive individuals and 100 pre-pandemic samples were tested by FinCare™ to access sensitivity and specificity. For qualitative and quantitative validation of the FinCar™ measurements, the BAU/mL results of FinCare™ were compared with results of two reference assays: the surrogate virus-neutralizing test (sVNT, GenScript, USA), and the VIDAS®3 automated assay (BioMérieux, France).ResultsFinecare™ showed 92% sensitivity and 100% specificity compared to PCR. Cohen’s Kappa statistic denoted moderate and excellent agreement with sVNT and VIDAS®3, ranging from 0.557 (95% CI: 0.32-0.78) to 0.731 (95% CI: 0.51-0.95), respectively. A strong correlation was observed between Finecare™/sVNT (r=0.7, p<0.0001) and Finecare™/VIDAS®3 (r=0.8, p<0.0001).ConclusionFinecare™ is a reliable assay and can be used as a surrogate to assess binding and neutralizing antibody response post-infection or vaccination, particularly in none or small laboratory settings.",
        doi: "10.1101/2022.01.04.22268717",
        title: [
          "Performance evaluation of novel fluorescent-based lateral immune flow assay (LIFA) for rapid detection and quantitation of total anti-SARS-CoV-2 S-RBD binding antibodies in infected individuals",
        ],
        id: "1",
      },
      {
        abstract:
          "For more than a year and a half, the entire world has been experiencing the COVID-19 pandemic. Only the development of safe and effective vaccines may make the most significant changes in the fight against this infection. The World Health Organization (WHO) and its partners are contributing to accelerated development of vaccines because it is the vaccination along with social distancing and the use of personal protective equipment that is an effective way to prevent the coronavirus disease. This review covers general characteristics of vaccines registered or approved by at least one national regulator, the risks and side effects of the vaccines, as well as approaches to assess the effectiveness of COVID-19 vaccination.",
        doi: "10.51523/2708-6011.2021-18-4-1",
        title: [
          "Current aspects of COVID-19 vaccine prophylaxis: big steps from laboratory to clinical practice",
        ],
        id: "2",
      },
    ],
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

      <div className="grid grid-cols-12">
        <div className="col-span-9 max-w-[870px] text-appGray-900">
          <div className="mb-3">
            <PageTitle title={publicationData.title} titleClass="font-semibold" />
          </div>

          <div>
            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">Location:</span>
              <span className="col-span-9">{publicationData.location}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">Total funding:</span>

              <span className="col-span-9">{publicationData.totalFunding}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">Expertise:</span>
              <span className="col-span-9">{publicationData.expertise}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-2xl text-primary-900 font-medium mb-4">
              Associated list of publications
            </div>

            <div>
              {publicationData.associatedPublications.map((publicationData: IPublicationItem) => (
                <PublicationItem data={publicationData} key={publicationData.id} />
              ))}

              <div className="flex justify-center mt-7">
                <Pagination currentPage={currentPage} totalCount={111} gotoPage={gotoPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IFunderData {
  title: string;
  location: string;
  totalFunding: string;
  expertise: string;
  associatedPublications: IPublicationItem[];
}

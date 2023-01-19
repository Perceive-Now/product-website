import { useState } from "react";

import { InfoIcon } from "../../../../components/icons";

//
import PageTitle from "../../../../components/reusable/page-title";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

/**
 *
 */
export default function PatentsProfilePage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [patentsData] = useState<IPatentsData>({
    title: "Coherent LADAR using intra-pixel quadrature detection",
    patentLink: "https://patents.google.com/patent/EP3268771A1/en",
    abstract: `A frequency modulated (coherent) laser detection and ranging system includes a read-out integrated circuit formed with a two-dimensional array of detector elements each including a photosensitive region receiving both return light reflected from a target and light from a local oscillator, and local processing circuitry sampling the output of the photosensitive region four times during each sample period clock cycle to obtain quadrature components. A data bus coupled to one or more outputs of each of the detector elements receives the quadrature components from each of the detector elements for each sample period and serializes the received quadrature components. A processor coupled to the data bus receives the serialized quadrature components and determines an amplitude and a phase for at least one interfering frequency corresponding to interference between the return light and the local oscillator light using the quadrature components.`,
    details: {
      patentNumber: "100000000",
      patentDate: "2018-06-19",
      patentKind: "B2",
      patentType: "utility",
      patentYear: "2018",
      patentProcessingTime: "null",
    },
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

      <div className="mb-3">
        <PageTitle title={patentsData.title} titleClass="font-semibold" />
      </div>

      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-9 text-appGray-900">
          <div className="mb-3">
            <div className="text-gray-800 mb-2 font-semibold text-xl">Patent link:</div>

            <span>
              <a href={patentsData.patentLink} target="_blank" rel="noreferrer">
                {patentsData.patentLink}
              </a>
            </span>
          </div>

          <div className="mb-3">
            <div className="text-gray-800 mb-2 font-semibold text-xl">Abstract:</div>

            <span>{patentsData.abstract}</span>
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-gray-800 mb-3 font-semibold text-xl">Details:</div>

          <div className="flex flex-col">
            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">Patent number:</div>

              <div>[{patentsData.details.patentNumber}]</div>
            </div>

            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">Patent date:</div>

              <div>{patentsData.details.patentDate}</div>
            </div>

            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">Patent kind:</div>

              <div>{patentsData.details.patentKind}</div>
            </div>

            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">Patent type:</div>

              <div>{patentsData.details.patentType}</div>
            </div>

            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">Patent year:</div>

              <div>{patentsData.details.patentYear}</div>
            </div>

            <div className="flex mb-2">
              <div className="text-gray-800 text-md font-semibold mr-2">
                Patent processing time:
              </div>

              <div>{patentsData.details.patentProcessingTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IPatentsDetail {
  patentNumber: string;
  patentDate: string;
  patentKind: string;
  patentType: string;
  patentYear: string;
  patentProcessingTime: string;
}

interface IPatentsData {
  title: string;
  patentLink: string;
  abstract: string;
  details: IPatentsDetail;
}

import { useState } from "react";
import { InfoIcon } from "../../../../components/icons";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDashboardSearch } from "../../../../stores/dashboard";

/**
 *
 */
export default function UniversityPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  const [universityData] = useState<IUniversityData>({
    title: "University College London",
    location: "London, Great Britain",
    link: "ucl.ac.uk",
    image:
      "https://www.perceivenow.ai/static/media/xenamed.bb80d998fc36a063b261.png",
    patentCount: 108,
    publicationCount: "XXX",
    expertsCount: 57,
    fundingCount: "XXX",
  });

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

      <div>
        <div className="flex items-center">
          <div className="w-[167px] h-[167px]">
            <img
              src={universityData.image}
              alt="university"
              className="w-100"
            />
          </div>

          <div className="ml-3">
            <h1 className="text-primary-900 text-2xl mb-2">
              {universityData.title}
            </h1>

            <p className="text-gray-600 mb-2">{universityData.location}</p>

            <p className="text-primary-900 underline cursor-pointer">
              {universityData.link}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-x-2">
          <div className="col-span-1">
            <Card
              title="Number of Patents"
              value={universityData.patentCount}
            />
          </div>

          <div className="col-span-1">
            <Card
              title="Number of Publications"
              value={universityData.publicationCount}
            />
          </div>

          <div className="col-span-1">
            <Card
              title="Number of Experts"
              value={universityData.expertsCount}
            />
          </div>

          <div className="col-span-1">
            <Card title="Funding" value={universityData.fundingCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: ICardProps) {
  return (
    <div className="p-2 text-center bg-slate-100 shadow">
      <div className="mb-2">
        <span>{title}</span>
      </div>
      <div className="font-bold">
        <span>{value}</span>
      </div>
    </div>
  );
}

interface ICardProps {
  title: string;
  value: number | string;
}

interface IUniversityData {
  title: string;
  location: string;
  link: string;
  image: string;
  patentCount: number | string;
  publicationCount: number | string;
  expertsCount: number | string;
  fundingCount: number | string;
}

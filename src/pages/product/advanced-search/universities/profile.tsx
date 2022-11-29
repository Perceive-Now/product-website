import { InfoIcon } from "../../../../components/icons";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDashboardSearch } from "../../../../stores/dashboard";

import UCLImg from "./ucl.png";

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
            <img src={UCLImg} alt="university" className="w-100" />
          </div>

          <div className="ml-3">
            <h1 className="text-primary-900 text-2xl mb-2">
              University College London
            </h1>
            <p className="text-gray-600 mb-2">London, Great Britain</p>
            <p>
              <span className="text-primary-900 underline cursor-pointer">
                ucl.ac.uk
              </span>
            </p>
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <Card title="Number of Patents" value={108} />
          <Card title="Number of Publications" value={"XXX"} />
          <Card title="Number of Experts" value={57} />
          <Card title="Funding" value={"XXX"} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: ICardProps) {
  return (
    <div className="p-2 text-center flex-grow bg-slate-100">
      <div className="mb-2">{title}</div>

      <div className="font-bold">{value}</div>
    </div>
  );
}

interface ICardProps {
  title: string;
  value: number | string;
}

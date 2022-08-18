import { ReactElement, useState } from "react";

//
import {
  ExpertsIcon,
  FundersIcon,
  PatentsIcon,
  PublicationsIcon,
  UniversitiesIcon,
} from "../../../components/icons";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

/**
 *
 */
export default function HawkEyePage() {
  const [searchText, setSearchText] = useState("");

  const [values] = useState({
    publications: 46,
    experts: 36,
    universities: 3,
    patents: 13,
    funders: 8,
  });

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(value) => setSearchText(value)} />
      </div>

      {searchText && (
        <div className="mt-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing result for:</span>
            <span> "</span>
            <span className="font-semibold">{searchText}</span>
            <span>"</span>
          </p>

          <div className="my-2">
            <PageTitle title="Hawk-eye view" learnMore="Learn more" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SingleSection
              title="Publications"
              value={values.publications}
              icon={<PublicationsIcon width={72} height={72} />}
            />

            <SingleSection
              title="Experts"
              value={values.experts}
              icon={<ExpertsIcon width={72} height={72} />}
            />

            <SingleSection
              title="Universities"
              value={values.universities}
              icon={<UniversitiesIcon width={72} height={72} />}
            />

            <SingleSection
              title="Patents"
              value={values.patents}
              icon={<PatentsIcon width={72} height={72} />}
            />

            <SingleSection
              title="Funders"
              value={values.funders}
              icon={<FundersIcon width={72} height={72} />}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SingleSection(props: ISingleSectionProps) {
  return (
    <div className="py-6 px-3 rounded-lg border border-gray-300 flex flex-wrap items-center shadow hover:bg-primary-50 cursor-pointer">
      <div className="text-primary-900 mr-3">{props.icon}</div>

      <div>
        <p className="mb-1 text-[28px]">{props.value}</p>
        <p className="text-xl">{props.title}</p>
      </div>
    </div>
  );
}

interface ISingleSectionProps {
  icon: ReactElement;
  title: string;
  value: number;
}

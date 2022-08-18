import type { ReactElement } from "react";
import { Link, useOutletContext } from "react-router-dom";

//
import {
  ExpertsIcon,
  FundersIcon,
  PatentsIcon,
  PublicationsIcon,
  UniversitiesIcon,
} from "../../../components/icons";

//
import PageTitle from "../../../components/reusable/page-title";

//
import type { IHawkEyeContext } from "./hawk-eye";

/**
 *
 */
export default function HawkEyeHomeSection() {
  const { searchText, count } = useOutletContext<IHawkEyeContext>();

  return (
    <div>
      {searchText && (
        <div className="mt-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing result for:</span>
            <span> "</span>
            <span className="font-semibold">{searchText}</span>
            <span>"</span>
          </p>

          <div className="my-3">
            <PageTitle title="Hawk-eye view" learnMore="Learn more" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Link to="/hawk-eye-view/publications">
              <SingleSection
                title="Publications"
                value={count?.publications}
                icon={<PublicationsIcon width={72} height={72} />}
              />
            </Link>

            <Link to="/hawk-eye-view/experts">
              <SingleSection
                title="Experts"
                value={count?.experts}
                icon={<ExpertsIcon width={72} height={72} />}
              />
            </Link>

            <Link to="/hawk-eye-view/universities">
              <SingleSection
                title="Universities"
                value={count?.universities}
                icon={<UniversitiesIcon width={72} height={72} />}
              />
            </Link>

            <Link to="/hawk-eye-view/patents">
              <SingleSection
                title="Patents"
                value={count?.patents}
                icon={<PatentsIcon width={72} height={72} />}
              />
            </Link>

            <Link to="/hawk-eye-view/funders">
              <SingleSection
                title="Funders"
                value={count?.funders}
                icon={<FundersIcon width={72} height={72} />}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SingleSection(props: ISingleSectionProps) {
  return (
    <div className="py-6 px-3 rounded-lg border border-gray-300 flex flex-wrap items-center shadow hover:bg-primary-50">
      <div className="text-primary-900 mr-3">{props.icon}</div>

      <div className="text-gray-900">
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

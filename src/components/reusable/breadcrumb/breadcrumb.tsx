import { Link } from "react-router-dom";
import { ChevronRight } from "../../icons";

interface Props {
  breadCrumbs: IBreadCrumb[];
}

interface IBreadCrumb {
  title: string;
  link: string;
}

export function Breadcrumb({ breadCrumbs }: Props) {
  return (
    <div>
      <div className="bg-appGray-200 flex justify-between items-center rounded-md">
        <div className="flex items-center justify-center gap-0.5">
          {breadCrumbs.map((value, idx, arr) => (
            <div key={idx} className="flex items-center gap-x-0.5">
              <Link to={value.link} className="text-lg text-primary-900 fw-600">
                {value.title}
              </Link>

              {idx !== arr.length - 1 && <ChevronRight className="text-primary-900" />}
            </div>
          ))}
          <p className="text-lg text-primary-900 fw-600"></p>
        </div>
      </div>
    </div>
  );
}

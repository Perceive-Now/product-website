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
      <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
        <div className="flex items-center justify-center gap-1 py-1">
          {breadCrumbs.map((value, idx, arr) => (
            <div key={idx} className="flex items-center gap-x-1">
              <Link to={value.link} className="text-lg text-primary-900 fw-600">
                {value.title}
              </Link>

              {idx !== arr.length - 1 && <ChevronRight />}
            </div>
          ))}
          <p className="text-lg text-primary-900 fw-600"></p>
        </div>
      </div>
    </div>
  );
}

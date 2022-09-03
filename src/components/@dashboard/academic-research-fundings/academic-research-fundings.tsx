import { useState } from "react";
import { Link } from "react-router-dom";

//
import PieChart from "../../@product/pie-chart";
import PageTitle from "../../reusable/page-title";

/**
 *
 */
export default function AcademicResearchFundings() {
  const [data, setData] = useState([
    {
      id: "london-college",
      label: "University College London (34%)",
      value: 34,
    },
    { id: "harvard-medical", label: "Harvard Medical School (28%)", value: 28 },
    {
      id: "south-california",
      label: "University of Southern California (22%)",
      value: 22,
    },
    { id: "meth-zurich", label: "METH Zurich (8%)", value: 8 },
    { id: "imperial-college", label: "Imperial College London (8%)", value: 8 },
  ]);

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Aacdemic Research Funding" info="info" />

      <div className="pt-1 flex justify-end gap-x-3">
        <div>Periods</div>

        <div>Switch</div>
      </div>

      <PieChart data={data} />

      <div className="mt-4">
        <span>
          "$ X" amount of funding was received by the top 5 universities with
          the maximum amount of funding in the past 1 year
        </span>
        <span className="ml-1">
          <Link to="#">Read More</Link>
        </span>
      </div>
    </div>
  );
}

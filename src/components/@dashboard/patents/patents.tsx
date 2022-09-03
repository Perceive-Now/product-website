import { useQuery } from "@tanstack/react-query";

//
import PieChart from "../../@product/pie-chart";
import PageTitle from "../../reusable/page-title";

//
import { getPatentsCount } from "../../../utils/api/dashboard";
import { getPatentsPieChart } from "../../../utils/api/charts";

/**
 *
 */
export default function Patents() {
  const { data, isLoading } = useQuery(["patents-pie-chart"], async () => {
    return await getPatentsPieChart();
  });

  const { data: patentCount } = useQuery(
    ["patents-count-for-chart"],
    async () => {
      return await getPatentsCount();
    }
  );

  const finalData = isLoading
    ? []
    : (data ?? []).map((item) => ({
        id: item.name,
        label: `${item.name} (${item.percentage}%)`,
        value: item.value,
      }));

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Patents" info="info" />

      <div className="pt-1 flex justify-end gap-x-3">
        <div>Periods</div>

        <div>Switch</div>
      </div>

      <PieChart data={finalData} />

      <div className="mt-4 text-sm">
        <span className="font-bold">"{patentCount?.patentCount ?? "-"}"</span>
        <span> </span>
        <span>total number of patents were filed in the past</span>
        <span> </span>
        <span className="font-semibold">{patentCount?.yearsElapsed}</span>
        <span> </span>
        <span>years</span>
      </div>
    </div>
  );
}

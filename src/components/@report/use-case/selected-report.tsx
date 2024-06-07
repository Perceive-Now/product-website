import Button from "../../../components/reusable/button";

export interface IReport {
  id: number;
  label: string;
  value: string;
  desc: string;
  reportType: string;
  reportPlan: "pro" | "premium" | any;
  price: number;
}

interface Props {
  reports: any[];
  onContinue: () => void;
}

/**
 *
 */
const SelectedReport = ({ reports, onContinue }: Props) => {
  const totalPrice = reports.reduce((total, item) => {
    if (item.reportPlan === "pro") {
      return total + 995;
    } else if (item.reportPlan === "premium") {
      return total + 1995;
    }
    return total; // In case of an unknown type
  }, 0);

  return (
    <div className="w-full">
      <div className="bg-primary-900 text-white text-lg font-bold p-1 rounded-t-md">
        Selected reports
      </div>
      <div className="bg-appGray-100 border border-appGray-200 p-1 w-full">
        <div className="space-y-1 rounde-b-md w-full">
          {reports.length > 0 ? (
            <>
              {reports.map((report) => (
                <div key={report.id} className="flex justify-between text-base text-secondary-800">
                  <p>{report.label}</p>
                  <p>{report.reportPlan === "premium" ? "$1995" : "$995"}</p>
                </div>
              ))}
            </>
          ) : (
            <div className="text-base text-secondary-800">No use case selected</div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center text-lg font-bold  text-secondary-800 border-t mt-2 py-1">
        <p>Total</p>
        <p>${totalPrice || 0}</p>
      </div>
      <div className="relative mt-2">
        <Button
          type="optional"
          htmlType={"button"}
          rounded={"small"}
          classname="text-black w-full"
          handleClick={onContinue}
          size="small"
        >
          Continue
        </Button>
      </div>
      <div className="bg-appGray-100 p-1 mt-2 rounded text-secondary-800 text-sm">
        Don't worry about paying now. You'll only pay when you're ready to get your report.
      </div>
    </div>
  );
};

export default SelectedReport;

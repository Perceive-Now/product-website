import { useState } from "react";
import Button from "../../reusable/button";
import ReportSlider from "./report-silder";
import Modal from "../../reusable/modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BundleReportModal = ({ open, onClose }: Props) => {
  const [value, setValue] = useState(22); // Initial value

  return (
    <Modal open={open} handleOnClose={onClose}>
      <div className="bg-white w-[720px] px-[80px] pb-[40px] pt-[10px] text-start rounded-lg">
        <div>
          <div className="pb-6 space-y-5">
            <p className="font-semibold">Select number of reports to bundle</p>
            <div className="w-[411px]">
              <ReportSlider setValue={setValue} value={value} />
            </div>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-700 text-secondary-800 font-semibold">
                With <span className="text-3xl text-primary-900 font-bold">{value}</span> Reports
                You save <span className="text-3xl text-primary-900 font-bold">$12,028</span>
              </p>
            </div>
            <Button type="primary" classname="font-600" rounded="small">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BundleReportModal;

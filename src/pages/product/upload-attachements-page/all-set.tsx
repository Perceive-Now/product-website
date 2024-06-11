import ToPayementButton from "./to-payement-button";

export default function AllSet() {
  return (
    <div className="flex flex-col min-w-[900px] min-h-[400px] bg-white rounded-lg w-[900px]">
      <div className="space-y-[20px] p-2">
        <p className="text-secondary-900 font-bold text-[32px]">Great! You're All Set</p>
        <p className="w-[300px] text-secondary-800">
          Thanks for providing the extra details. We now have everything we need to create your
          custom report.
        </p>
        <p className="w-[300px] text-secondary-800">
          Let's move on to creating your final report. Payment is needed to unlock your report.
        </p>
        <ToPayementButton />
      </div>
    </div>
  );
}

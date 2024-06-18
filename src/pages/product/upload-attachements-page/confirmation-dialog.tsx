import Button from "src/components/reusable/button";

export default function ConfirmationDialog() {
  const currentPercentage = 60;
  return;
  <div className="w-full h-full p-4">
    <div>Icon</div>
    <h2>You’re doing great!</h2>
    <p>
      Including more details could make your report even more insightful. You’ve provided about{" "}
      {currentPercentage}% of the relevant information. Aiming for 90% or more will significantly
      enhance your report.
    </p>

    <div className="flex flex-row gap-x-1">
      <Button>Continue to create report</Button>
      <Button>Provide more details</Button>
    </div>
  </div>;
}

import Button from "../reusable/button";

//
export default function PaymentStep(props: ISignupStepProps) {
  return (
    <div className="p-2 md:p-5 w-full lg:max-w-4xl">
      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
          Go Back
        </Button>

        <Button type="optional" rounded="full" handleClick={() => props.handleNext({})}>
          Continue
        </Button>
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
}

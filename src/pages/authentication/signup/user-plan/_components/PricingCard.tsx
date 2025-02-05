import Button from "src/components/reusable/button";

const PricingCard = ({
  title,
  price,
  selected,
  onSelect,
}: {
  title: string;
  price: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div className={`bg-[#F5F7FF] rounded-sm p-6 max-w-[400px] relative`}>
      <h3 className="text-3xl font-semibold mb-2">{title}</h3>
      <Button
        handleClick={onSelect}
        rounded="full"
        classname="w-full my-3"
        type={selected ? "primary" : "secondary"}
      >
        {selected ? "Selected" : "Select"}
      </Button>
      <p className="text-lg mb-4 absolute right-2 top-3">
        <span className="font-bold">${price}</span>/month
      </p>
      <p className="text-sm text-[#000000] mb-4">
        Your essential AI toolkit. Build momentum. You are a founder or an early-stage investor.
      </p>
      <p className="text-base mb-2">Plan Includes: </p>
      <ul className="text-base text-gray-800 space-y-2 mb-6">
        <li>✓ Access to 3 Agents</li>
        <li>✓ Basic report customization</li>
        <li>✓ KnowNow Chat</li>
      </ul>
    </div>
  );
};

export default PricingCard;
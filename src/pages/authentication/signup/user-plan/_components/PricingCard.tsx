import Button from "src/components/reusable/button";

const PricingCard = ({
  title,
  designedFor,
  description,
  selected,
  onSelect,
}: {
  title: string;
  designedFor: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      className={`bg-[#F5F7FF] rounded-md p-4 max-w-[400px] hover:shadow transition-shadow cursor-pointer relative ${
        selected && "border-[1px] border-[#FFA300]"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold mb-2">{title}</h3>

        {selected && <div className="bg-[#FFA300] w-fit h-fit p-1 rounded-md text-sm">Selected</div>}
      </div>
      {/* <Button
        handleClick={onSelect}
        rounded="full"
        classname="w-full my-3"
        type={selected ? "primary" : "secondary"}
      >
        {selected ? "Selected" : "Select"}
      </Button> */}
      {/* <p className="text-lg mb-4 absolute right-2 top-3">
        <span className="font-bold">${price}</span>/month
      </p> */}
      <p className="text-[#757575CC]">Designed for</p>
      <p className="text-xl mb-2 text-[#FFA300]">{designedFor}</p>
      <p className="text-base text-[#000000]">{description}</p>
      {/* <p className="text-base mb-2">Plan Includes: </p>
      <ul className="text-base text-gray-800 space-y-2 mb-6">
        <li>✓ Access to 3 Agents</li>
        <li>✓ Basic report customization</li>
        <li>✓ KnowNow Chat</li>
      </ul> */}
    </div>
  );
};

export default PricingCard;

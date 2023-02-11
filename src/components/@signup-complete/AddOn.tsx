import { QuestionIcon } from "../icons";

/**
 *
 */
export default function AddOn({ id, title, description, isAdded }: IAddOnProps) {
  return (
    <div key={id} className="col-span-1 flex justify-between pb-2 border-b-2 border-gray-400">
      <span className="text-xl flex">
        {title} <QuestionIcon className="ml-1" />
      </span>

      <span>
        <span className="px-3 py-1 rounded-full bg-primary-900 text-white cursor-pointer">
          {isAdded ? "Added" : "Add"}
        </span>
      </span>
    </div>
  );
}

interface IAddOnProps {
  id: number;
  title: string;
  description: string;
  isAdded: boolean;
}

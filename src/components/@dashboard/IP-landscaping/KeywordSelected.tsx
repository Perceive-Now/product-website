import { useAppSelector } from "../../../hooks/redux";

const KeywordSelected = () => {
  const keywords = useAppSelector((state) => state.dashboard.search) ?? [];

  return (
    <div className="flex items-center">
      <span className="text-gray-500">Keyword selected :&nbsp;</span>
      <div className="flex items-center gap-1">
        {keywords.map((keyword, idx, arr) => (
          <span key={idx} className="text-secondary-800">
            "{keyword.value}"{idx !== arr.length - 1 && <span>,&nbsp;</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordSelected;

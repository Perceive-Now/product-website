import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import EditIcon from "../../icons/miscs/Edit";

const KeywordSelected = () => {
  const navigate = useNavigate();
  const keywords = useAppSelector((state) => state.dashboard.search) ?? [];

  return (
    <div className="flex flex-col justify-center items-center p-1">
      <div className="flex items-center gap-1">
        <span className="text-gray-500">Keyword selected</span>
        <button type="button" onClick={() => navigate("/")}>
          <EditIcon />
        </button>
      </div>
      <div className="flex items-center gap-1">
        {keywords.map((keyword, idx, arr) => (
          <span key={idx} className="text-secondary-800">
            "{keyword.value}
            {idx !== arr.length - 1 && <span>,&nbsp;</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordSelected;

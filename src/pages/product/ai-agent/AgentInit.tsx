import { getTimeCurrent } from "src/utils/helpers";

interface Props {
  agentName: string;
  loading?: boolean;
}

export default function DiligenceAgentThinking(props: Props) {
  const { agentName, loading = false } = props;
  return (
    <div className=" w-full bg-white shadow-md rounded-xl p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-purple-600">🟣</span>
          <h2 className="text-gray-900 font-semibold">{agentName}</h2>
        </div>
        <span className="relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:bg-gray-200 before:mr-2 pl-2 text-gray-400 text-sm">
          {getTimeCurrent()}
        </span>
      </div>
      <hr className="border-gray-300 my-4"></hr>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full w-fit mb-3">
        <span className="font-medium">Thinking</span>
        {loading ? (
          <div className="animate-spin h-4 w-4 border-2 border-purple-700 border-t-transparent rounded-full"></div>
        ) : null}
      </div>

      {/* Message Content */}
      {/* <p className="text-gray-700 mb-3">
        Could you please specify the primary objectives for this financial strategy report? Here are
        a few examples to guide you:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
        <li>Identify high-potential sectors or regions for investment</li>
        <li>Forecast financial outcomes for strategic planning</li>
        <li>
          Develop actionable strategies for scaling operations or optimizing resource allocation
        </li>
      </ul>

      <p className="text-gray-700">
        Feel free to share your main goals so we can proceed effectively!
      </p> */}
    </div>
  );
}

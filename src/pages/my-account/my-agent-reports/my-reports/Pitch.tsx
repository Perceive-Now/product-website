import React from "react";
import PitchFile from "./PitchFile";

const PitchDeck = ({
  user_message,
  filename_url,
}: {
  user_message: string;
  filename_url?: any;
}) => {
  if (!user_message) return <p>No data available</p>;

  const parsedData = JSON.parse(user_message);
  const { pitchdeck_summary } = parsedData;
  console.log("pitchdeck_summary", pitchdeck_summary);

  return (
    <>
      {filename_url ? <PitchFile filename_url={filename_url} /> : null}
      {pitchdeck_summary?.pages ? null : (
        <>
          <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
            {/* <h2 className="text-xl font-bold mb-4">Pitch Deck Summary</h2> */}
            {Array.isArray(pitchdeck_summary)
              ? pitchdeck_summary?.map(([title, content]: any, index: any) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="whitespace-pre-line">{content}</p>
                  </div>
                ))
              : typeof pitchdeck_summary === "object" && pitchdeck_summary !== null
              ? Object.values(pitchdeck_summary)?.map(([title, content]: any, index: any) =>
                  typeof title === "object" ? null : (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="whitespace-pre-line">{content}</p>
                    </div>
                  ),
                )
              : null}
          </div>
        </>
      )}
    </>
  );
};

export default PitchDeck;

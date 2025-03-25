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
      {filename_url && Object.keys(filename_url).length ? (
        <PitchFile filename_url={filename_url} />
      ) : null}
      {pitchdeck_summary?.pages ? null : (
        <>
          {Array.isArray(pitchdeck_summary) ? (
            <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
              {pitchdeck_summary?.map(([title, content]: any, index: any) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="whitespace-pre-line">{content}</p>
                </div>
              ))}
            </div>
          ) : typeof pitchdeck_summary === "object" && pitchdeck_summary !== null ? (
            <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
              {Object.values(pitchdeck_summary)?.map(([title, content]: any, index: any) =>
                typeof title === "object" ? null : (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="whitespace-pre-line">{content}</p>
                  </div>
                ),
              )}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default PitchDeck;

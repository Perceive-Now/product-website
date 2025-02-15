import React from "react";

const PitchDeck = ({ user_message }: { user_message: string }) => {
  if (!user_message) return <p>No data available</p>;

  const parsedData = JSON.parse(user_message);
  const { pitchdeck_summary } = parsedData;

  return (
    <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
      <h2 className="text-xl font-bold mb-4">Pitch Deck Summary</h2>
      {pitchdeck_summary?.map(([title, content]: any, index: any) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="whitespace-pre-line">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default PitchDeck;

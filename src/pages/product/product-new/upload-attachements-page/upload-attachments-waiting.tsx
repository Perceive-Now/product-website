import React from "react";
import Button from "../../../../components/reusable/button";

export default function UploadAttachmentsWaiting() {
  const handleContinueBtnClick = () => {
    // TODO handle continue click
  };

  return (
    <div className="flex flex-row justify-between gap-x-[150px]">
      {/* summary */}
      <div className="flex flex-col min-w-[900px] min-h-[400px] bg-white rounded-lg">
        <p className="font-bold text-[32px] text-secondary-900">Here's a sneak peek!</p>
        <p className="font-semibold text-xl text-secondary-800">
          This summary is based on your report, generated by our AI.
        </p>
        <div className="text-gray-600 mt-[20px]">
          {summary.map((item) => (
            <div key={item.heading} className="mb-2">
              <p className="text-base font-bold">
                {item.heading}
                {":"}
              </p>
              <ul className="list-disc pl-[20px] text-sm">
                {item.list.map((content) => (
                  <li key={content} className="text-sm">
                    {content}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[300px] space-y-5">
        {/* await and continue */}
        <>
          <div>
            <p className="font-bold text-lg text-purple-900 mb-1">Ready to see your report?</p>
            <p className="text-secondary-800">
              Everything looks great so far! Let's move on to creating your final report. <br />
              Payment is needed to unlock your report.
            </p>
          </div>
          <Button type="optional" classname="w-full" handleClick={handleContinueBtnClick}>
            <p className="text-secondary-800">Continue</p>
          </Button>
          <p className="cursor-pointer underline text-purple-900">
            If more info is required (temp link)
          </p>
        </>

        {/* continue to ask more questions */}

        <>
          <div>
            <p className="font-bold text-lg text-purple-900 mb-1">Almost There!</p>
            <p className="text-secondary-800">
              We need a bit more information to create your report. <br />
              Please answer a few more questions to complete the details. Once done, we'll generate
              your custom report.
            </p>
          </div>
          <Button type="optional" classname="w-full" handleClick={handleContinueBtnClick}>
            <p className="text-secondary-800">Continue</p>
          </Button>
        </>
      </div>
    </div>
  );
}

const summary = [
  {
    heading: "Prior Art & Novelty",
    list: [
      "We checked existing inventions to see how unique yours is.",
      "There are some similar ones, but yours might be new due to [mention specific features].",
      "We recommend looking closer at specific patents for a deeper dive.",
    ],
  },
  {
    heading: "Licensing Targets",
    list: [
      "Companies in [mention specific industries] could be interested in licensing your tech based on its features and market trends.",
      "We can refine this list with further market analysis.",
    ],
  },

  {
    heading: "Patent Validity (Initial)",
    list: [
      "Our analysis suggests your patent has a good chance of being valid because [brief explanation].",
      "However, a more thorough analysis is recommended for extra confidence.",
    ],
  },
];

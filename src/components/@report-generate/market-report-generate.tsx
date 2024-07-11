import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { questionList } from "src/pages/product/report-q&a/_question";
import { generateKnowId } from "src/utils/helpers";
import Button from "../reusable/button";
import { CompetitiveQuestions, ConsumerQuestions } from "./_market-report-question";

const GenerateMarketReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("gautamjune8e");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState([]);

  const [complete, setComplete] = useState(false);
  // const { questionsList } = useAppSelector((state) => state.QA);

  const marketAnalysisQA = questionList
    .filter((q) => q.usecase === "consumer-landscape")
    .map((q) => `Question: ${q.question}\nAnswer: ${q.answer}`)
    .join("\n\n");

  // console.log(marketAnalysisQA);

  const onLiveChat = useCallback(
    async (file_name: string, case_id: string, sectionIndex: number) => {
      if (sectionIndex >= ConsumerQuestions.length) {
        // All sections processed
        return;
      }

      const section = ConsumerQuestions[sectionIndex].question;
      setIsGenerating(true);
      try {
        const res = await axios.post("http://172.203.243.82:8000/live_chat", {
          data: `${marketAnalysisQA}`,
          file_name: file_name,
          model: "web_gpt4",
          number: case_id,
          text: section,
        });
        setComplete(true);
        console.log(res);
        toast.success(`Report for section ${section[sectionIndex]} is complete`);
        setReportData((prevData) => ({
          ...prevData,
          [section]: res.data.third_party_resp[0],
        }));
        setIsGenerating(false);

        // Call onLiveChat for the next section
        onLiveChat(file_name, case_id, sectionIndex + 1);
      } catch (error) {
        console.log(error);
        setIsGenerating(false);
      }
    },
    [marketAnalysisQA],
  );

  const onGenerateReport = useCallback(async () => {
    onLiveChat(fileName, "2", 0); // Start processing sections from index 0

    // setIsLoading(true);
    // const filename = generateKnowId();
    // setFileName(filename);
    // try {
    //   const res = await axios.post("https://report.api.perceivenow.ai/create_file_usecase", {
    //     file_name: filename,
    //     number: "3",
    //     text: `${marketAnalysisQA}`,
    //   });
    //   if (res.status === 200) {
    //   }
    //   setIsLoading(false);
    //   console.log(res);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.log(error);
    // }
  }, [marketAnalysisQA, onLiveChat]);

  function formtAnswer(report: string) {
    const formattedAnswer = report.replace(/\n/, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return formattedAnswer;
  }

  return (
    <div>
      <h4 className="font-bold text-xl py-2">Use-case: Consumer Report</h4>
      <Button handleClick={onGenerateReport} loading={isLoading}>
        Generate Report
      </Button>
      {(isGenerating || isLoading) && <p>Report is generating! Please wait</p>}

      <div className="space-y-2 mt-4">
        {Object.entries(reportData).map(([section, report], idx) => (
          <div key={idx * 99}>
            <h6 className="text-xl font-bold pb-1">{section}</h6>
            <div
              dangerouslySetInnerHTML={{ __html: formtAnswer(report) }}
              className=" whitespace-pre-wrap "
            />
          </div>
        ))}
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: formattedAnswer }} className=" whitespace-pre-wrap " /> */}
    </div>
  );
};

export default GenerateMarketReport;

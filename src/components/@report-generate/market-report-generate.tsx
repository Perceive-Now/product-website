import { useAppSelector } from "src/hooks/redux";
import { questionList } from "src/pages/product/report-q&a/_question";
import Button from "../reusable/button";
import { useCallback, useState } from "react";
import axios from "axios";
import { generateKnowId } from "src/utils/helpers";
import toast from "react-hot-toast";

const GenerateMarketReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState("");
  // const { questionsList } = useAppSelector((state) => state.QA);

  const marketAnalysisQA = questionList
    .filter((q) => q.usecase === "market-analysis")
    .map((q) => `Question: ${q.question}\nAnswer: ${q.answer}`)
    .join("\n\n");

  // console.log(marketAnalysisQA);

  const onLiveChat = useCallback(
    async (file_name: string, case_id: string) => {
      setIsGenerating(true);
      try {
        const res = await axios.post("http://172.203.243.82:8000/live_chat", {
          file_name: file_name,
          number: case_id,
          data: `${marketAnalysisQA}`,
        });
        // if (res.status === 200) {
        //   const response = await
        // }
        console.log(res);
        toast.success("Report is complete");
        setReportData(res.data.third_party_resp);
        setIsGenerating(false);
      } catch (error) {
        console.log(error);
        setIsGenerating(false);
      }
    },
    [marketAnalysisQA],
  );

  const onGenerateReport = useCallback(async () => {
    setIsLoading(true);
    const filename = generateKnowId();
    setFileName(filename);
    try {
      const res = await axios.post("http://172.203.243.82:8000/create_file_usecase", {
        file_name: filename,
        number: "1",
        text: `${marketAnalysisQA}`,
      });
      if (res.status === 200) {
        onLiveChat(filename, "1");
      }
      setIsLoading(false);

      console.log(res);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  }, [marketAnalysisQA, onLiveChat]);

  return (
    <div>
      <Button handleClick={onGenerateReport} loading={isLoading}>
        Generate Report
      </Button>
      {(isGenerating || isLoading) && <p>Report is generating! Please wait</p>}

      <div dangerouslySetInnerHTML={{ __html: reportData }} />
    </div>
  );
};

export default GenerateMarketReport;

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { questionList } from "src/pages/product/report-q&a/_question";
import Button from "../reusable/button";
import { generateKnowId } from "src/utils/helpers";

const MarketAnalysisSections = [
  {
    id: 1,
    question: "Generate section Significant Trends?",
  },
  {
    id: 2,
    question: "Generate section Emerging Technologies and Innovations?",
  },
  {
    id: 3,
    question: "Generate section Consumer Preferences and Buying Habits?",
  },
  {
    id: 4,
    question: "Generate section Relevant Policies?",
  },
  {
    id: 5,
    question: "Generate section Market Growth and Regional Insights?",
  },
  {
    id: 6,
    question: "Generate section Recent Investments Startups (about 3 years back from till now)?",
  },
  {
    id: 7,
    question: "Generate section Startups working in companion technologies?",
  },
  {
    id: 8,
    question: "Generate section Recent Acquisitions and Mergers of company?",
  },
  {
    id: 9,
    question: "Generate section Recent Investor Exits or IPOs?",
  },
  {
    id: 10,
    question: "Generate section Profitability indicators?",
  },
  {
    id: 11,
    question: "Generate section Emerging technologies & innovations?",
  },
  {
    id: 12,
    question: "Generate section Consumer preferences & buying habits?",
  },
];

const GenerateMarketReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState([]);

  const [complete, setComplete] = useState(false);
  // const { questionsList } = useAppSelector((state) => state.QA);

  const marketAnalysisQA = questionList
    .filter((q) => q.usecase === "market-analysis")
    .map((q) => `Question: ${q.question}\nAnswer: ${q.answer}`)
    .join("\n\n");

  // console.log(marketAnalysisQA);

  const onLiveChat = useCallback(
    async (file_name: string, case_id: string, sectionIndex: number) => {
      if (sectionIndex >= MarketAnalysisSections.length) {
        // All sections processed
        return;
      }

      const section = MarketAnalysisSections[sectionIndex].question;
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
    setIsLoading(true);
    const filename = generateKnowId();
    setFileName(filename);
    try {
      const res = await axios.post("https://report.api.perceivenow.ai/create_file_usecase", {
        file_name: filename,
        number: "1",
        text: `${marketAnalysisQA}`,
      });
      if (res.status === 200) {
        onLiveChat(filename, "1", 0); // Start processing sections from index 0
      }
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [marketAnalysisQA, onLiveChat]);

  const answer =
    "Significant Market Trends:\n\n1. AI and Machine Learning Integration:\n   - AI and machine learning technologies are being increasingly integrated into wearable devices, enhancing the ability to provide personalized health insights and recommendations based on user behavior.\n\n2. Focus on Health-Conscious Consumers:\n   - The target market for wearable technology has become more focused on health-conscious consumers, particularly those who are tech-savvy and value using technology to improve their health and lifestyle.\n\n3. Increased Market Penetration:\n   - Companies are aiming for higher market penetration, with goals like a 5% year-over-year increase in market share, indicating successful strategies in customer acquisition and market expansion.\n\n4. Wearable Device Aesthetics:\n   - The design and aesthetic appeal of wearable devices have become significant factors influencing consumer purchasing decisions, alongside the functionality and accuracy of health tracking.\n\n5. Consumer Feedback-Driven Development:\n   - Consumer feedback is directly shaping the development of new wearable features, such as enhanced sleep tracking and stress management tools, ensuring products meet evolving user needs.\n\n6. Intellectual Property for Product Differentiation:\n   - Intellectual property, including patents related to biometric sensors and machine learning processes, plays a key role in maintaining a competitive edge and differentiating products in the market.\n\n7. Emerging Markets Focus:\n   - Companies are targeting significant customer base expansion in emerging markets, aiming for growth rates higher than in established markets, to tap into new consumer segments.\n\n8. Customer Acquisition and Retention:\n   - Firms are setting specific targets for customer acquisition and retention, using metrics like cost per acquisition, conversion rates, and customer satisfaction scores to measure success.\n\n9. R&D Investment:\n   - Strategic investments in R&D, particularly in AI and machine learning capabilities, are being made in response to projected market growth and consumer demand for advanced technology integration.\n\n10. Regulatory Adaptation:\n   - Companies are closely monitoring regulatory changes in key markets to adapt their compliance strategies, ensuring seamless market entry and sustained operations.\n\nCitations:\n- [2024 Smart Wearables Market Trends](https://www.linkedin.com/pulse/2024-smart-wearables-market-trends-203294-pages-caijf)\n- [2024 IoT And Smart Device Trends](https://www.forbes.com/sites/bernardmarr/2023/10/19/2024-iot-and-smart-device-trends-what-you-need-to-know-for-the-future/)";

  function formtAnswer(report: string) {
    const formattedAnswer = report.replace(/\n/, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return formattedAnswer;
  }

  return (
    <div>
      <h4 className="font-bold text-xl py-2">Use-case: Market Analysis Report</h4>
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

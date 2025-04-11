import { useMemo, useState, useRef, useEffect } from "react";
import "./index.css";
//
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { UploadIcon } from "src/components/icons";
import TakeoffScreen from "./takeoffScreen";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";

import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import SelectBox from "./selectBox";
import axios from "axios";
import { ACTIVITY_COMMENT } from "src/utils/constants";
import { addActivityComment } from "src/stores/vs-product";
import AgentHead from "src/pages/product/ai-agent/AgentHead";
import CustmizationForm, { CheckboxGroup } from "src/pages/product/ai-agent/CustmizationForm";
import DotLoader from "src/components/reusable/dot-loader";
import { API_PROD_URL } from "src/utils/axios";

import StepIcon1 from "./_assets/stepIcon1"
import StepIcon2 from "./_assets/stepIcon2"
import StepIcon3 from "./_assets/stepIcon3"
import StepIcon4 from "./_assets/stepIcon4"
import StepIcon5 from "./_assets/stepIcon5"
import StepIcon6 from "./_assets/stepIcon6"

/**
 *
 */

const options = {
  sectorFocus: [
    { label: "Healthtech", value: "Healthtech", showTextBox: false },
    { label: "Fintech", value: "Fintech", showTextBox: false },
    { label: "AI/ML", value: "AI/ML", showTextBox: false },
    { label: "Climate Tech", value: "Climate Tech", showTextBox: false },
    { label: "SaaS", value: "SaaS", showTextBox: false },
    { label: "Edtech", value: "Edtech", showTextBox: false },
    { label: "Biotech", value: "Biotech", showTextBox: false },
    { label: "Web3", value: "Web3", showTextBox: false },
    { label: "Deep Tech", value: "Deep Tech", showTextBox: false },
    { label: "Enterprise Software", value: "Enterprise Software", showTextBox: false },
    { label: "Consumer Tech", value: "Consumer Tech", showTextBox: false },
    { label: "Industrial Tech", value: "Industrial Tech", showTextBox: false },
    { label: "Mobility", value: "Mobility", showTextBox: false },
    { label: "Cybersecurity", value: "Cybersecurity", showTextBox: false },
    { label: "AgTech", value: "AgTech", showTextBox: false },
    { label: "LegalTech", value: "LegalTech", showTextBox: false },
    { label: "PropTech", value: "PropTech", showTextBox: false },
    { label: "Insurtech", value: "Insurtech", showTextBox: false },
    { label: "Energy", value: "Energy", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  geographicFocus: [
    { label: "North America", value: "North America", showTextBox: false },
    { label: "Europe", value: "Europe", showTextBox: false },
    { label: "Asia-Pacific", value: "Asia-Pacific", showTextBox: false },
    { label: "Middle East", value: "Middle East", showTextBox: false },
    { label: "Latin America", value: "Latin America", showTextBox: false },
    { label: "Africa", value: "Africa", showTextBox: false },
    { label: "Global", value: "Global", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  businessModel: [
    { label: "B2B SaaS", value: "B2B SaaS", showTextBox: false },
    { label: "B2C Platform", value: "B2C Platform", showTextBox: false },
    { label: "Marketplace", value: "Marketplace", showTextBox: false },
    { label: "Direct-to-Consumer", value: "Direct-to-Consumer", showTextBox: false },
    { label: "Hardware-as-a-Service", value: "Hardware-as-a-Service", showTextBox: false },
    { label: "API-first", value: "API-first", showTextBox: false },
    { label: "Subscription", value: "Subscription", showTextBox: false },
    { label: "Freemium", value: "Freemium", showTextBox: false },
    { label: "Licensing", value: "Licensing", showTextBox: false },
    { label: "On-Demand", value: "On-Demand", showTextBox: false },
    { label: "Transaction-Based", value: "Transaction-Based", showTextBox: false },
    { label: "E-commerce", value: "E-commerce", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  preferredStage: [
    { label: "Pre-Seed", value: "Pre-Seed", showTextBox: false },
    { label: "Seed", value: "Seed", showTextBox: false },
    { label: "Series A", value: "Series A", showTextBox: false },
    { label: "Series B", value: "Series B", showTextBox: false },
    { label: "Series C", value: "Series C", showTextBox: false },
    { label: "Growth", value: "Growth", showTextBox: false },
    { label: "Late-stage", value: "Late-stage", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  benchmarkComparison: [
    { label: "Revenue", value: "Revenue", showTextBox: false },
    { label: "Churn", value: "Churn", showTextBox: false },
    { label: "CAC", value: "CAC", showTextBox: false },
    { label: "LTV", value: "LTV", showTextBox: false },
    { label: "Gross Margin", value: "Gross Margin", showTextBox: false },
    { label: "Burn Rate", value: "Burn Rate", showTextBox: false },
    { label: "Growth Rate", value: "Growth Rate", showTextBox: false },
    { label: "Headcount", value: "Headcount", showTextBox: false },
    { label: "Founder Experience", value: "Founder Experience", showTextBox: false },
    { label: "Market Size", value: "Market Size", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: false },
  ],
  companyStage: [
    { label: "Pre-Seed", value: "Pre-Seed", showTextBox: false },
    { label: "Seed", value: "Seed", showTextBox: false },
    { label: "Series A", value: "Series A", showTextBox: false },
    { label: "Series B", value: "Series B", showTextBox: false },
    { label: "Series C", value: "Series C", showTextBox: false },
    { label: "Growth", value: "Growth", showTextBox: false },
    { label: "Late-stage", value: "Late-stage", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
};

export const Texts = [
  "",
  "single page summaries",
  "stakeholder specific reports",
  "investor centric insights",
  "single page summaries",
  "stakeholder specific reports",
  "investor centric insights",
];

const listContent = [
  "PDF (.pdf) - Portable Document Format",
  "Microsoft Excel (.xls, .xlsx)",
  "Microsoft Word (.docx)",
  "Text Files (.txt)",
  "PowerPoint (.ppt,.pptx)",
  "OpenDocument Text (.odt)",
  "Keynote (.key)",
];

const urlContent = [
  "Known Competitor Websites",
  "Relevant Industry Websites",
  "Portfolio Company Websites",
  "Company Website",
  "Other Relevant URLs",
];

interface INewReportValues {
  projectName: string;
}

interface IRequirementValues {
  reportName: string;
  usecase: string;
  questions: Array<string>;
  screeningType: string;
  strategicFitCriteria: string;
  minAnnualRev: number; // Add this field
  minARR: number; // Add this field if needed
  companyName: string; // Add this field if needed
  fundRaised: string; // Add this field if needed
  founderCount: number; // Add this field if needed
  customerTractionSumary: string; // Add this field if needed
  knownRisk: string; // Add this field if needed
  company_website: string; // Add this field if needed
  linkedin_page: string; // Add this field if needed
  Crunchbase: string;
  product_demo: string;
  other_source: string;
  targetOwnership: string;
}

interface ICustomReportValues {
  additional: string;
}

const QuickReports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("ppppppp", location.state);
  const { id } = useParams();
  const urlParams = new URLSearchParams(location.search);
  const project_name = urlParams.get("project");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = jsCookie.get("user_id");
  const [projectId, setProjectId] = useState(id);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [supportFiles, setSupportFiles] = useState<any[]>([]);
  const [capTableFile, setCapTableFile] = useState<File | null>(null);
  const [cusListFile, setCusListFile] = useState<File | null>(null);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [customReport, setCustomReport] = useState({
    report_tone: "",
    no_of_charts: "",
    visual_style: "",
    citations: "",
    format: [],
    additional: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supportInputRef = useRef<HTMLInputElement | null>(null);
  const capTableInputRef = useRef<HTMLInputElement | null>(null);
  const cusListInputRef = useRef<HTMLInputElement | null>(null);

  const [bioInputMode, setBioInputMode] = useState<"file" | "url">("file");
  const [bioFile, setBioFile] = useState<File | null>(null);
  const [bioUrl, setBioUrl] = useState("");
  const [draggingBio, setDraggingBio] = useState(false);
  const bioFileInputRef = useRef<HTMLInputElement | null>(null);

  const [productInputMode, setProductInputMode] = useState<"file" | "url">("file");
  const [productFile, setProductFile] = useState<File | null>(null);
  const [productUrl, setProductUrl] = useState("");
  const [draggingProduct, setDraggingProduct] = useState(false);
  const productFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("id value of the page ===========", id);
    if (id) {
      setStep(2); // If there's an ID in the URL, set step to 2
    } else {
      setStep(1); // Otherwise, set step to 1
    }
  }, []);

  const handleInputFromAnimated = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const AnimatedPlaceholder = ({ className, onClick }: { className: any; onClick: () => void }) => {
    return (
      <div className={classNames(className, "wrapper")} onClick={onClick}>
        <div className="words">
          {Texts.map((text, idx) => (
            <span key={idx * 499} className="text-secondary-800">
              {text}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const changeHighlight = () => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1500);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        if (isInvalidType || isInvalidSize) {
          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
        }, 1500);
        changeHighlight();
      }
    }
    // const fileList = Array.from(files).map((file: any) => file.name);
    // setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

  const handlePasteURL = () => {
    if (urlInput) {
      setPastedURLs((prevURLs) => [...prevURLs, urlInput]);
      setUrlInput("");
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        if (isInvalidType || isInvalidSize) {
          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
        }, 1500);
        changeHighlight();
      }
    }
  };

  const handleSupportDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        return isInvalidType || isInvalidSize;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setSupportFiles((prevFiles: any) => [...prevFiles, ...fileList]);
        }, 1500);
        changeHighlight();
      }
    }
  };

  const handleSupportFileChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        return isInvalidType || isInvalidSize;
      });

      setSupportFiles((prevFiles: any) => {
        const totalFiles = [...prevFiles, ...fileList];
        if (totalFiles.length > 5) {
          toast.error("You can upload a maximum of 5 files.");
          return prevFiles;
        }

        setTimeout(() => {
          changeHighlight(); // Optional visual change
        }, 1500);

        return totalFiles;
      });
      // if (invalidFiles.length > 0) {
      //   toast.error("Invalid file uploaded.");
      // } else {
      //   setTimeout(() => {
      //     setSupportFiles((prevFiles: any) => [...prevFiles, ...fileList]);
      //   }, 1500);
      //   changeHighlight();
      // }
    }
  };

  const handleCapTableFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;

      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setCapTableFile(file);
        }, 1500);
      }
    }
  };

  const handleCusListFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;

      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setCusListFile(file);
        }, 1500);
      }
    }
  };

  const handleCapTableDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file

      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;

      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setCapTableFile(file); // Replace any existing file with this one
        }, 1500);
        changeHighlight();
      }
    }
  };

  const handleCusListDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file

      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const isInvalidType = !allowedTypes.includes(file.type);
      const isInvalidSize = file.size > 200 * 1024 * 1024;

      if (isInvalidType || isInvalidSize) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setCusListFile(file); // Replace any existing file with this one
        }, 1500);
        changeHighlight();
      }
    }
  };

  // code for team bios start
  const handleBioBrowseClick = () => {
    bioFileInputRef.current?.click();
  };

  const handleBioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBioFile(file);
    }
  };

  const handleBioFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingBio(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setBioFile(file);
    }
  };

  // code for team bios end

  // code for product screenshoot start
  const handleProductBrowseClick = () => {
    productFileInputRef.current?.click();
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductFile(file);
    }
  };

  const handleProductFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingProduct(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setProductFile(file);
    }
  };
  // code for team product screenshoot end

  const handleSubmit = async (values: IRequirementValues) => {
    setStep(3);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formInitialValue: INewReportValues = {
    projectName: "",
  };

  const formResolver = yup.object().shape({
    projectName: yup.string().trim().required("Project name is required"),
  });

  const {
    register,
    formState,
    handleSubmit: handleSubmitForm,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const { errors } = formState;

  const projectRequitementInitialValue: IRequirementValues = {
    reportName: "",
    usecase: "",
    questions: ["", "", ""],
    screeningType: "",
    strategicFitCriteria: "",
    minAnnualRev: 0, // Default value for minimum annual revenue
    minARR: 0, // Default value for minimum ARR
    companyName: "", // Default value for company name
    fundRaised: "", // Default value for funding raised
    founderCount: 0, // Default value for number of founders
    customerTractionSumary: "", // Default value for customer traction summary
    knownRisk: "", // Default value for known risks
    company_website: "", // Default value for company website
    linkedin_page: "",
    Crunchbase: "",
    product_demo: "",
    other_source: "",
    targetOwnership: "",
  };

  const projectFormResolver = yup.object().shape({
    reportName: yup.string().trim().required("Report name is required"),
    usecase: yup.string().trim().required("Primary objective is required"),
    screeningType: yup.string().trim().required("Screening Type is required"),
    questions: yup
      .array()
      .of(
        yup
          .string()
          .trim() // Remove leading/trailing spaces
          .required("Question is required"),
      )
      .min(3, "Array must contain at least 3 non-empty strings"), // Minimum 3 valid items
  });

  const {
    setValue,
    register: requirementRegister,
    formState: requirementFormState,
    handleSubmit: handleSubmitFormRequirement,
    getValues: requirementValues,
    control: requirementControl,
    setValue: setRequirementValue,
  } = useForm({
    defaultValues: projectRequitementInitialValue,
    resolver: yupResolver(projectFormResolver),
    mode: "onBlur",
  });

  const { errors: requirementErrors } = requirementFormState;

  const customReportInitialValue: ICustomReportValues = {
    additional: "",
  };

  const customReportFormResolver = yup.object().shape({
    // additional: yup.string().trim().required("Special Request is required"),
  });

  const {
    register: customReportRegister,
    formState: customReportFormState,
    handleSubmit: handleSubmitCustomReport,
    getValues: customReportValues,
    control: customReportControl,
    setValue: setCustomReportValue,
    setFocus,
  } = useForm({
    defaultValues: customReportInitialValue,
    resolver: yupResolver(customReportFormResolver),
    mode: "onBlur",
  });

  const { errors: customReportErrors } = customReportFormState;

  const additionalSummary = useWatch({
    control: customReportControl,
    name: "additional",
  });

  const requirementQuestions = useWatch({
    control: requirementControl,
    name: "questions",
  });

  useEffect(() => {
    if (location.state) {
      setValue("reportName", location.state.report_name || "");
      setValue("usecase", location.state.usecase || "");
      setDisabled(true);
    }
  }, [location.state]);

  const handleSubmitProject = async (values: INewReportValues) => {
    setLoading(true);
    const user_id = userId ?? "";

    const formData = {
      user_id: user_id,
      project_name: values.projectName,
      size: "0KB",
    };

    try {
      const response: any = await fetch(`${API_PROD_URL}/create-project/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // id = data.project_id;
        setProjectId(data.project_id);
        const activityReponse = await addActivityComment(
          userId as string,
          `${ACTIVITY_COMMENT.PROJECT_ADDED} "${values.projectName}"`,
          data.project_id,
        );
        setStep(2);
      } else {
        toast.error("Unable to submit report");
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: any) => {
    setUrlInput(e.target.value);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSupportBrowseClick = () => {
    if (supportInputRef.current) {
      supportInputRef.current.click();
    }
  };

  const handleCapTableBrowseClick = () => {
    if (capTableInputRef.current) {
      capTableInputRef.current.click();
    }
  };

  const handleCusListBrowseClick = () => {
    if (cusListInputRef.current) {
      cusListInputRef.current.click();
    }
  };

  const handleDelete = (index: number, type: "url" | "file" | "capTable") => {
    if (type === "url") {
      setPastedURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    } else if (type === "file") {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "capTable") {
      setSupportFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleReportChange = (field: string, value: any) => {
    setCustomReport((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddMoreQuestions = () => {
    setRequirementValue("questions", [...requirementQuestions, ""]);
  };

  const removeQuestion = (quesIndex: number) => {
    const updatedQuestions = requirementQuestions.filter((ques, index) => index !== quesIndex);
    setRequirementValue("questions", updatedQuestions);
  };

  const handleFinalSubmitProject = async () => {
    setLoading(true);

    const values = requirementValues();

    const dataPayload: Record<string, string[] | any> = {};
    dataPayload.websites = pastedURLs;
    dataPayload.question = values.questions;
    // dataPayload.format = customReport.format;
    dataPayload.config = {
      report_format: {
        selected: selectedOptions.reportFormatOptions,
        other: customInput?.["reportFormatOptions"]?.["Other"] || "",
      },
      citations: {
        selected: selectedOptions.citationsOptions,
        other: customInput?.["citationsOptions"]?.["Other"] || "",
      },
      report_tone: {
        selected: selectedOptions.reportToneOptions,
        other: customInput?.["reportToneOptions"]?.["Other"] || "",
      },
      explainability: {
        selected: selectedOptions.explainabilityOptions,
        other: customInput?.["explainabilityOptions"]?.["Other"] || "",
      },
      audience_focus: {
        enterprise: {
          selected: selectedOptions.audienceFocusOneOptions,
          other: customInput?.["audienceFocusOneOptions"]?.["Other"] || "",
        },
        investors: {
          selected: selectedOptions.audienceFocusTwoOptions,
          other: customInput?.["audienceFocusTwoOptions"]?.["Other"] || "",
        },
      },
      other: additionalSummary,
    };

    dataPayload.classification = {
      screeningType: values.screeningType,
    };
    dataPayload.additional_metadata = {
      strategicFitCriteria: values.strategicFitCriteria,
      sectorFocus: {
        selected: selectedOptions.sectorFocus,
        other: customInput?.["sectorFocus"]?.["Other"] || "",
      },
      geographicFocus: {
        selected: selectedOptions.geographicFocus,
        other: customInput?.["geographicFocus"]?.["Other"] || "",
      },
      businessModel: {
        selected: selectedOptions.businessModel,
        other: customInput?.["businessModel"]?.["Other"] || "",
      },
      preferredStage: {
        selected: selectedOptions.preferredStage,
        other: customInput?.["preferredStage"]?.["Other"] || "",
      },
      minAnnualRev: values.minAnnualRev,
      minARR: values.minARR,
      targetOwnership: values.targetOwnership,
      companyName: values.companyName,
      companyStage: {
        selected: selectedOptions.companyStage,
        other: customInput?.["companyStage"]?.["Other"] || "",
      },
      benchmarkComparison: {
        selected: selectedOptions.benchmarkComparison,
        other: customInput?.["benchmarkComparison"]?.["Other"] || "",
      },
      fundRaised: values.fundRaised,
      founderCount: values.founderCount,
      customerTractionSumary: values.customerTractionSumary,
      knownRisk: values.knownRisk,
      company_website: values.company_website,
      linkedin_page: values.linkedin_page,
      Crunchbase: values.Crunchbase,
      product_demo: values.product_demo,
      other_source: values.other_source,
    };

    if (bioUrl) {
      dataPayload.additional_metadata.bioUrl = bioUrl;
    }

    if (productUrl) {
      dataPayload.additional_metadata.productUrl = productUrl;
    }

    // {
    //   "websites": [
    //     "string"
    //   ],
    //   "question": [
    //     "string"
    //   ],
    //   "classification": {},
    //   "config": {},
    //   "additional_metadata": {}
    // }

    try {
      const response: any = await axios.post(
        `${API_PROD_URL}/upload-files/?user_id=${userId}&project_id=${projectId}&report_name=${values.reportName}&usecase=${values.usecase}`,
        { ...dataPayload },
      );

      if (response.status === 200) {
        await addActivityComment(
          userId as string,
          disabled ? ACTIVITY_COMMENT.REQUIREMENT_UPDATED : ACTIVITY_COMMENT.REQUIREMENT_ADDED,
          projectId as string,
        );
        const allEmpty =
          uploadedFiles.length === 0 &&
          supportFiles.length === 0 &&
          !capTableFile &&
          !cusListFile &&
          pastedURLs.length === 0;

        if (allEmpty) {
          setStep(4);
          return;
        }
        try {
          const uploadPromises: Promise<Response>[] = [];

          const createFormAndUpload = (
            files: File[] | File,
            endpoint: string,
            fieldName = "files",
          ): Promise<Response> => {
            const formData = new FormData();
            if (Array.isArray(files)) {
              files.forEach((file) => formData.append(fieldName, file));
            } else if (files) {
              formData.append(fieldName, files);
            }

            return fetch(
              `${API_PROD_URL}/upload-files/${userId}/${projectId}/${response.data.report_id}?classification=${endpoint}`,
              {
                method: "POST",
                headers: { Accept: "application/json" },
                body: formData,
              },
            );
          };

          if (uploadedFiles.length > 0) {
            uploadPromises.push(createFormAndUpload(uploadedFiles, "Company Diligence"));
          }

          if (supportFiles.length > 0) {
            uploadPromises.push(createFormAndUpload(supportFiles, "Supporting Files"));
          }

          if (capTableFile) {
            uploadPromises.push(createFormAndUpload(capTableFile, "Cap Table"));
          }

          if (cusListFile) {
            uploadPromises.push(createFormAndUpload(cusListFile, "Customer List"));
          }
          if (bioFile) {
            uploadPromises.push(createFormAndUpload(bioFile, "Team Bios"));
          }
          if (productFile) {
            uploadPromises.push(createFormAndUpload(productFile, "Product Screenshots"));
          }

          // if (pastedURLs.length > 0) {
          //   const urlFormData = new FormData();
          //   pastedURLs.forEach((url) => urlFormData.append("urls", url));
          //   uploadPromises.push(
          //     fetch(
          //       `${API_PROD_URL}/upload-links/${userId}/${projectId}/${response.data.report_id}?classification=Linked URLs`,
          //       {
          //         method: "POST",
          //         headers: { Accept: "application/json" },
          //         body: urlFormData,
          //       },
          //     ),
          //   );
          // }

          const responses = await Promise.all(uploadPromises);

          const allSuccess = responses.every((res) => res.ok);

          if (allSuccess) {
            setStep(4);
          } else {
            toast.error("Some files failed to upload");
          }
        } catch (e) {
          console.error("Upload error:", e);
          toast.error("Unexpected error while uploading");
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Unable to submit report", {
          position: "bottom-right",
        });
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }

    // console.log("formData------", formData);
  };

  const handleCheckboxChange = (category: string, value: string, isSingle?: boolean) => {
    const currentSelections = selectedOptions[category] || [];
    const isSelected = currentSelections.includes(value);
    if (isSingle) {
      setSelectedOptions({
        ...selectedOptions,
        [category]: isSelected ? currentSelections.filter((item) => item !== value) : [value],
      });
    } else
      setSelectedOptions({
        ...selectedOptions,
        [category]: isSelected
          ? currentSelections.filter((item) => item !== value)
          : [...currentSelections, value],
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    optionKey: string,
  ) => {
    setCustomInput({
      ...customInput,
      [optionKey]: {
        ...(customInput[optionKey] || {}),
        [field]: e.target.value,
      },
    });
  };

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    sectorFocus: [],
    geographicFocus: [],
    businessModel: [],
    preferredStage: [],
    benchmarkComparison: [],
    companyStage: [],
    reportScopeOptions: [],
    reportFormatOptions: [],
    visualStyleOptions: [],
    chartsOptions: [],
    citationsOptions: [],
    audienceFocusOneOptions: [],
    audienceFocusTwoOptions: [],
    reportToneOptions: [],
    collaborationOptions: [],
    explainabilityOptions: [],
  });

  const [customInput, setCustomInput] = useState<Record<string, Record<string, string>>>({});

  const [highlight, setHighlight] = useState(false);

  return (
    <div className="space-y-[20px] w-full z-10 p-1">
      <div className="flex justify-between">
        
        <div>
          {id ? (
            <div className="p-1 pl-0">
              <div className="flex justify-start items-center pt-3 pl-1">
                <p
                  className="mr-4 text-secondary-800 flex items-center cursor-pointer"
                  onClick={() => {
                    if (step === 3) {
                      setStep(2);
                    } else {
                      // navigate(`/my-reports/${id}?project=${project_name}`, {
                      //   state: { tab: 1 },
                      // });
                      navigate(`/my-projects`);
                    }
                  }}
                >
                  <ArrowLeftIcon className="mr-1" />
                  Back
                </p>
              </div>
            </div>
          ) : (
            <div className="p-1 pl-0">
              <h6 className="text-lg font-semibold ml-0">
                {" "}
                Report management &gt; {step === 1 ? "New Project" : "Project Requirements"}
              </h6>
              <div className="flex justify-start items-center pt-3 pl-1">
                <p
                  className="mr-4 text-secondary-800 flex items-center cursor-pointer"
                  onClick={() => {
                    if (step === 3) {
                      setStep(2);
                    } else {
                      navigate(`/my-projects`);
                    }
                  }}
                >
                  <ArrowLeftIcon className="mr-1" />
                  Back
                </p>
              </div>
            </div>
          )}

          {/* {id && step !== 3 && step !== 4 && (
            <div className="mt-2">
              <Tab.Group defaultIndex={1}>
                <Tab.List className="flex w-[15%] h-[45px]">
                  <Tab
                    onClick={() => {
                      navigate(`/my-reports/${id}`);
                    }}
                    className={({ selected }) =>
                      `w-full text-base px-3 rounded-tl-md rounded-bl-md focus:outline-none font-nunito border-l border-t border-b border-appGray-600 ${
                        selected ? "text-white bg-primary-900" : "text-black"
                      }`
                    }
                  >
                    Reports
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                        selected ? "text-white bg-primary-900" : "text-black"
                      }`
                    }
                  >
                    Requirements
                  </Tab>
                </Tab.List>
              </Tab.Group>
            </div>
          )} */}
        </div>
        <AgentHead agentName="" />
      </div>

      <div className="overflow-y-auto pb-[11%]">
        {step == 2 ? (
          <div className="">
            
            <div className="grid grid-cols-6 p-2 mt-3 border border-gray-300 rounded-xl text-center relative after:h-[1px] after:absolute after:left-[105px] after:right-[105px] after:top-[36px] after:bg-gray-300 after:-z-10">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-primary-900 border-primary-900 bg-appGray-200 `}><StepIcon1/></div>
                  <div className="text-sm font-medium text-secondary-800">Basic Information</div>
                </div> 

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-secondary-800 border-gray-300 bg-white`}><StepIcon2/></div>
                  <div className="text-sm font-medium text-secondary-800">Screening Configuration</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-secondary-800 border-gray-300 bg-white`}><StepIcon3/></div>
                  <div className="text-sm font-medium text-secondary-800">Document Intake</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-secondary-800 border-gray-300 bg-white`}><StepIcon4 /></div>
                  <div className="text-sm font-medium text-secondary-800">Investment Thesis Parameters</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-secondary-800 border-gray-300 bg-white`}><StepIcon5 /></div>
                  <div className="text-sm font-medium text-secondary-800">Supporting Materials</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full border inline-flex items-center justify-center  text-secondary-800 border-gray-300 bg-white`}><StepIcon6 /></div>
                  <div className="text-sm font-medium text-secondary-800">Relevant Links</div>
                </div>
            </div>{/*** Top steps */}

            <form onSubmit={handleSubmitFormRequirement(handleSubmit)}>
              <div className="mt-6">
                <div className="relative">
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Basic Information
                  </h2>
                </div>

                <div className="flex space-x-4 py-2">
                  {/* First Part: File Upload and Paste URL */}
                  <div className="w-1/2 space-y-4">
                    <div className="w-full">
                      <label htmlFor="fullName" className="block text-md  text-secondary-800">
                        Report Name <span className="text-red-500 ml-0">*</span>
                      </label>
                      <input
                        type="text"
                        id="reportName"
                        {...requirementRegister("reportName")}
                        // required
                        placeholder="AI Startup Screening – Q2"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.reportName
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.reportName && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.reportName?.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-1">
                      <label htmlFor="industry" className="block text-md text-secondary-800">
                        Primary Objective <span className="text-red-500 ml-0">*</span>
                      </label>
                      <textarea
                        id="usecase"
                        disabled={disabled}
                        {...requirementRegister("usecase")}
                        placeholder="Identify top 5 companies aligned with our GenAI investment thesis"
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent resize-none",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.usecase
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.usecase && (
                        <div className="mt-0 text-s text-danger-500">
                          {requirementErrors.usecase?.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second Part: Added Websites and Urls Listing */}
                  <div className="w-1/2 px-1 flex flex-col">
                    <label htmlFor="requirement" className="block text-md text-secondary-800 mb-1">
                      Key Questions to Answer <span className="text-red-500 ml-0">*</span>
                    </label>
                    <div className="h-fit">
                      {requirementQuestions?.map((requirement, index) => (
                        <>
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              id={`questions.${index}`}
                              {...requirementRegister(`questions.${index}`)}
                              // {...(index === 0 || index === 1 || index === 2
                              //   ? requirementRegister(`questions.${index}`)
                              //   : {})}
                              // required
                              placeholder={`What companies align best with our AI + workflow focus?`}
                              className={classNames(
                                "mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent resize-none",
                                disabled ? "bg-gray-400 cursor-not-allowed" : "",
                                requirementErrors.questions?.[index]
                                  ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                                  : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                              )}
                            />
                            {requirementQuestions.length > 3 ? (
                              <button
                                type="button"
                                disabled={index === 0 || index === 1 || index === 2}
                                onClick={() => removeQuestion(index)}
                                className="text-red-500 hover:text-red-700 transition duration-300"
                              >
                                {index === 0 || index === 1 || index === 2 ? (
                                  <div className="w-3"></div>
                                ) : (
                                  <TrashIcon className="w-3 h-3" />
                                )}
                              </button>
                            ) : null}
                          </div>
                          <div className="mt-1 text-s text-danger-500">
                            {requirementErrors.questions?.[index]?.message &&
                              requirementErrors.questions[index]?.message}
                          </div>
                        </>
                      ))}
                      {requirementQuestions.length < 10 ? (
                        <div
                          className={`mt-2 mb-2 text-primary-900 font-semibold text-end cursor-pointer ${
                            requirementQuestions.length > 3 ? "mr-5" : ""
                          }`}
                          onClick={handleAddMoreQuestions}
                        >
                          + Add more
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {/* Added Websites */}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Screening Configuration
                  </h2>
                </div>
                <div className="w-full py-2">
                  <label htmlFor="screeningType" className="block text-md  text-secondary-800">
                    Screening Type <span className="text-red-500 ml-0">*</span>
                  </label>
                  <select
                    id="screeningType"
                    {...requirementRegister("screeningType")}
                    // onChange={(e) => setUsecase(e.target.value)}
                    // required
                    className={classNames(
                      "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                      requirementErrors.screeningType
                        ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                  >
                    <option value="">Select</option>
                    <option value="Quick Screening">Quick Screening</option>
                    <option value="In-Depth Screening">In-Depth Screening</option>
                  </select>
                  {requirementErrors.screeningType && (
                    <div className="mt-0 text-s text-danger-500">
                      {requirementErrors.screeningType?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Document Intake
                  </h2>
                </div>
                <div className="w-full py-2">
                  <div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                      <div className="flex-1">
                        <h6 className="font-semibold text-base font-nunito mb-1">
                          Upload Pitch Decks
                        </h6>
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            dragging ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop files to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                        </div>
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="mt-2 mb-2">
                          {/* <p className="text-lg font-semibold font-nunito">
                          Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                          </p> */}
                          <ul className="list-none pl-[20px]">
                            {/* {listContent.map((content) => ( */}
                            <li className="text-xs">
                              Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                            </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
                        <div
                          className={`border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]`}
                        >
                          <div className="rounded-lg p-2 flex-1">
                            {uploadedFiles.length > 0 ? (
                              <div className="h-[180px] pn_scroller overflow-y-auto pr-1">
                                {uploadedFiles.map((file, index) => (
                                  <div key={index}>
                                    {index !== 0 && (
                                      <hr className="my-1 border-1 border-appGray-300" />
                                    )}
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-nunito">{file.name}</p>
                                      <TrashIcon
                                        className="cursor-pointer"
                                        width={25}
                                        onClick={() => handleDelete(index, "file")}
                                      />
                                    </div>
                                  </div>
                                ))}
                                {/* {highlight ? ( */}
                                {/* ) : null} */}
                              </div>
                            ) : highlight ? (
                              <div className="flex items-center justify-center p-5 h-full">
                                <DotLoader />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                                No file uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* File Upload Box */}

                      {/* Paste URL Section */}
                      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="flex-1">
                          <div>
                            <h6 className="font-semibold text-base mb-1 font-nunito">
                              Paste Drive Folder Link
                            </h6>
                            <div className="flex">
                              <input
                                type="text"
                                placeholder="Paste Your URL here"
                                value={urlInput}
                                onChange={handleUrlChange}
                                className="w-full p-2 rounded-tl-xl rounded-bl-xl border border-appGray-600 focus:border-primary-900 focus:outline-none"
                              />
                              <button
                                type="button"
                                className="px-4 bg-primary-900 text-white rounded-br-xl rounded-tr-xl"
                                onClick={handlePasteURL}
                              >
                                Paste
                              </button>
                            </div>
                          </div>

                          {/* Supported Files and URLs */}
                          <div className="mt-4 flex justify-between">
                            <div>
                              {/* <p className="text-lg font-semibold font-nunito">Recommended URL</p> */}
                              <ul className="list-none pl-[20px]">
                                {/* {urlContent.map((content) => ( */}
                                <li className="text-xs">
                                  Link to Google Drive, Dropbox, Box, or Notion folder
                                </li>
                                {/* ))} */}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h6 className="font-semibold mb-1 text-base font-nunito">
                            Added Websites
                          </h6>
                          <div className="border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]">
                            <div className="rounded-lg p-2 flex-1">
                              {pastedURLs.length > 0 ? (
                                <div className="h-[180px] pn_scroller overflow-y-auto p-1">
                                  {pastedURLs.map((url, index) => (
                                    <div key={index}>
                                      {index !== 0 && (
                                        <hr className="my-1 border-1 border-appGray-300" />
                                      )}
                                      <div className="flex justify-between items-center">
                                        <p className="text-sm font-nunito">{url}</p>
                                        <TrashIcon
                                          className="cursor-pointer"
                                          onClick={() => handleDelete(index, "url")}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-gray-500 font-nunito text-center p-3 mt-3">
                                  No websites added yet.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Investment Thesis Parameters
                  </h2>
                </div>

                <div className="flex space-x-4 py-2">
                  {/* First Part: File Upload and Paste URL */}
                  <div className="w-1/2 space-y-4">
                    <div className="w-full">
                      <label
                        htmlFor="strategicFitCriteria"
                        className="block text-md  text-secondary-800"
                      >
                        Strategic Fit Criteria
                      </label>
                      <textarea
                        id="strategicFitCriteria"
                        {...requirementRegister("strategicFitCriteria")}
                        // required
                        placeholder="Enterprise-focused AI tools solving workflow inefficiencies"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.strategicFitCriteria
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.strategicFitCriteria && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.strategicFitCriteria?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="sectorFocus" className="block text-md  text-secondary-800">
                        Sector Focus
                      </label>
                      <CheckboxGroup
                        options={options.sectorFocus}
                        selectedOptions={selectedOptions.sectorFocus}
                        onChange={(value) => handleCheckboxChange("sectorFocus", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="sectorFocus"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="geographicFocus"
                        className="block text-md  text-secondary-800"
                      >
                        Geographic Focus
                      </label>
                      <CheckboxGroup
                        options={options.geographicFocus}
                        selectedOptions={selectedOptions.geographicFocus}
                        onChange={(value) => handleCheckboxChange("geographicFocus", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="geographicFocus"
                      />
                    </div>
                    {/* businessModel */}
                  </div>
                  <div className="w-1/2 space-y-4">
                    {" "}
                    <div className="w-full">
                      <label htmlFor="businessModel" className="block text-md  text-secondary-800">
                        Business Model
                      </label>
                      <CheckboxGroup
                        options={options.businessModel}
                        selectedOptions={selectedOptions.businessModel}
                        onChange={(value) => handleCheckboxChange("businessModel", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="businessModel"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="preferredStage" className="block text-md  text-secondary-800">
                        Preferred Stage
                      </label>
                      <CheckboxGroup
                        options={options.preferredStage}
                        selectedOptions={selectedOptions.preferredStage}
                        onChange={(value) => handleCheckboxChange("preferredStage", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="preferredStage"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="minAnnualRev" className="block text-md  text-secondary-800">
                        Minimum Annual Revenue (USD)
                      </label>
                      <input
                        type="number"
                        id="minAnnualRev"
                        {...requirementRegister("minAnnualRev")}
                        // required
                        placeholder="500000"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.minAnnualRev
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.minAnnualRev && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.minAnnualRev?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="minARR" className="block text-md  text-secondary-800">
                        Minimum ARR (USD)
                      </label>
                      <input
                        type="number"
                        id="minARR"
                        {...requirementRegister("minARR")}
                        // required
                        placeholder="1000000"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.minARR
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.minARR && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.minARR?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="targetOwnership"
                        className="block text-md  text-secondary-800"
                      >
                        Target Ownership Stake (%)
                      </label>
                      <input
                        type="number"
                        id="targetOwnership"
                        {...requirementRegister("targetOwnership")}
                        // required
                        placeholder="15"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.targetOwnership
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.targetOwnership && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.targetOwnership?.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* preferredStage */}
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Company Details
                  </h2>
                </div>

                <div className="flex space-x-4 py-2">
                  {/* First Part: File Upload and Paste URL */}
                  <div className="w-1/2 space-y-4">
                    <div className="w-full">
                      <label htmlFor="companyName" className="block text-md  text-secondary-800">
                        Company Name <span className="text-red-500 ml-0">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        {...requirementRegister("companyName")}
                        // required
                        placeholder="Acme AI Inc"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.companyName
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.companyName && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.companyName?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="companyStage" className="block text-md  text-secondary-800">
                        Company Stage
                      </label>
                      <CheckboxGroup
                        options={options.companyStage}
                        selectedOptions={selectedOptions.companyStage}
                        onChange={(value) => handleCheckboxChange("companyStage", value, true)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="companyStage"
                      />
                    </div>
                    {/* companyStage */}

                    <div className="w-full">
                      <label htmlFor="fundRaised" className="block text-md  text-secondary-800">
                        Funding Raised to Date (USD) <span className="text-red-500 ml-0">*</span>
                      </label>
                      <input
                        type="number"
                        id="fundRaised"
                        {...requirementRegister("fundRaised")}
                        // required
                        placeholder="3,000,000"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.fundRaised
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.fundRaised && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.fundRaised?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="founderCount" className="block text-md  text-secondary-800">
                        Number of Founders
                      </label>
                      <input
                        type="number"
                        id="founderCount"
                        {...requirementRegister("founderCount")}
                        // required
                        placeholder="2"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.founderCount
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.founderCount && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.founderCount?.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="w-full">
                      <label
                        htmlFor="customerTractionSumary"
                        className="block text-md  text-secondary-800"
                      >
                        Customer Traction Summary <span className="text-red-500 ml-0">*</span>
                      </label>
                      <textarea
                        id="customerTractionSumary"
                        {...requirementRegister("customerTractionSumary")}
                        // required
                        placeholder="$200k in ARR, signed 2 Fortune 100 clients"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.customerTractionSumary
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.customerTractionSumary && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.customerTractionSumary?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label htmlFor="knownRisk" className="block text-md  text-secondary-800">
                        Known Risks or Gaps
                      </label>
                      <input
                        type="text"
                        id="knownRisk"
                        {...requirementRegister("knownRisk")}
                        // required
                        placeholder="Single founder, lack of defensible moat"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.knownRisk
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.knownRisk && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.knownRisk?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="benchmarkComparison"
                        className="block text-md  text-secondary-800"
                      >
                        Benchmark Comparisons Requested <span className="text-red-500 ml-0">*</span>
                      </label>
                      <CheckboxGroup
                        options={options.benchmarkComparison}
                        selectedOptions={selectedOptions.benchmarkComparison}
                        onChange={(value) => handleCheckboxChange("benchmarkComparison", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="benchmarkComparison"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Materials start */}
              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Supporting Materials
                  </h2>
                </div>

                {/* cap table field start  */}
                <div className="w-full py-2">
                  <div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                      <div className="flex-1">
                        <h6 className="font-semibold text-base font-nunito mb-1">Cap Table</h6>
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            dragging ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleCapTableDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleCapTableBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop files to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                        </div>
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={capTableInputRef}
                          onChange={handleCapTableFileChange}
                          className="hidden"
                        />
                        <div className="mt-2 mb-2">
                          {/* <p className="text-lg font-semibold font-nunito">
                          Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                          </p> */}
                          <ul className="list-none pl-[20px]">
                            {/* {listContent.map((content) => ( */}
                            <li className="text-xs">
                              Upload Single file (PDF, PPTX, DOCX, Keynote)
                            </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">
                          Uploaded Cap Table file
                        </h6>
                        <div
                          className={`border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]`}
                        >
                          <div className="rounded-lg p-2 flex-1">
                            {capTableFile ? (
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-nunito">{capTableFile.name}</p>
                                <TrashIcon
                                  className="cursor-pointer"
                                  width={25}
                                  onClick={() => setCapTableFile(null)}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                                No file uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{/* File Upload Box */}</div>
                  </div>
                </div>
                {/* cap table field end  */}

                {/* Team Bios start  */}
                <div className="w-full py-2">
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                    {/* Left side - Upload or URL */}
                    <div className="flex-1">
                      <h6 className="font-semibold text-base font-nunito mb-1">
                        Team Bios or LinkedIn URLs
                      </h6>

                      {/* Toggle Mode */}
                      <div className="flex items-center space-x-4 mb-3">
                        <label className="text-sm font-nunito">
                          <input
                            type="radio"
                            name="teamBioInputMode"
                            checked={bioInputMode === "file"}
                            onChange={() => setBioInputMode("file")}
                            className="mr-1"
                          />
                          Upload File
                        </label>
                        <label className="text-sm font-nunito">
                          <input
                            type="radio"
                            name="teamBioInputMode"
                            checked={bioInputMode === "url"}
                            onChange={() => setBioInputMode("url")}
                            className="mr-1"
                          />
                          Enter URL
                        </label>
                      </div>

                      {/* File Upload */}
                      {bioInputMode === "file" && (
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            draggingBio ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDraggingBio(true);
                          }}
                          onDragLeave={() => setDraggingBio(false)}
                          onDrop={handleBioFileDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleBioBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop file to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                          <input
                            type="file"
                            ref={bioFileInputRef}
                            onChange={handleBioFileChange}
                            className="hidden"
                          />
                        </div>
                      )}

                      {/* URL Input */}
                      {bioInputMode === "url" && (
                        <input
                          type="text"
                          value={bioUrl}
                          onChange={(e) => setBioUrl(e.target.value)}
                          className="w-full border border-appGray-600 rounded-lg p-2 font-nunito"
                          placeholder="Paste LinkedIn profile link"
                        />
                      )}

                      {/* Notes */}
                      <div className="mt-2 mb-2">
                        <ul className="list-none pl-[20px]">
                          <li className="text-xs">Upload resumes or paste profile links</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right side - Uploaded data */}
                    <div className="flex-1">
                      <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded Bio</h6>
                      <div className="border border-appGray-600 rounded-lg px-2 pt-2 pb-[20px]">
                        <div className="rounded-lg p-2 flex-1">
                          {bioInputMode === "file" && bioFile ? (
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-nunito">{bioFile.name}</p>
                              <TrashIcon
                                className="cursor-pointer"
                                width={25}
                                onClick={() => setBioFile(null)}
                              />
                            </div>
                          ) : bioInputMode === "url" && bioUrl ? (
                            <div className="flex justify-between items-center">
                              <a
                                href={bioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-900 underline text-sm font-nunito"
                              >
                                {bioUrl}
                              </a>
                              <TrashIcon
                                className="cursor-pointer"
                                width={25}
                                onClick={() => setBioUrl("")}
                              />
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                              No file or link provided yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Team Bios end  */}

                {/* Customer List field start  */}
                <div className="w-full py-2">
                  <div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                      <div className="flex-1">
                        <h6 className="font-semibold text-base font-nunito mb-1">Customer List</h6>
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            dragging ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleCusListDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleCusListBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop files to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                        </div>
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={cusListInputRef}
                          onChange={handleCusListFileChange}
                          className="hidden"
                        />
                        <div className="mt-2 mb-2">
                          {/* <p className="text-lg font-semibold font-nunito">
                          Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                          </p> */}
                          <ul className="list-none pl-[20px]">
                            {/* {listContent.map((content) => ( */}
                            <li className="text-xs">
                              Upload Single file (PDF, PPTX, DOCX, Keynote)
                            </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">
                          Uploaded Cap Table file
                        </h6>
                        <div
                          className={`border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]`}
                        >
                          <div className="rounded-lg p-2 flex-1">
                            {cusListFile ? (
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-nunito">{cusListFile.name}</p>
                                <TrashIcon
                                  className="cursor-pointer"
                                  width={25}
                                  onClick={() => setCusListFile(null)}
                                />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                                No file uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{/* File Upload Box */}</div>
                  </div>
                </div>
                {/* Customer List field end  */}

                {/* Product Screenshots start  */}
                <div className="w-full py-2">
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                    {/* Left side - Upload or URL */}
                    <div className="flex-1">
                      <h6 className="font-semibold text-base font-nunito mb-1">
                        Product Screenshots or Demo Links
                      </h6>

                      {/* Toggle Mode */}
                      <div className="flex items-center space-x-4 mb-3">
                        <label className="text-sm font-nunito">
                          <input
                            type="radio"
                            name="productMode"
                            checked={productInputMode === "file"}
                            onChange={() => setProductInputMode("file")}
                            className="mr-1"
                          />
                          Upload File
                        </label>
                        <label className="text-sm font-nunito">
                          <input
                            type="radio"
                            name="ProductInputMode"
                            checked={productInputMode === "url"}
                            onChange={() => setProductInputMode("url")}
                            className="mr-1"
                          />
                          Enter URL
                        </label>
                      </div>

                      {/* File Upload */}
                      {productInputMode === "file" && (
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            draggingProduct ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDraggingBio(true);
                          }}
                          onDragLeave={() => setDraggingBio(false)}
                          onDrop={handleProductFileDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleProductBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop file to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                          <input
                            type="file"
                            ref={productFileInputRef}
                            onChange={handleProductFileChange}
                            className="hidden"
                          />
                        </div>
                      )}

                      {/* URL Input */}
                      {productInputMode === "url" && (
                        <input
                          type="text"
                          value={productUrl}
                          onChange={(e) => setProductUrl(e.target.value)}
                          className="w-full border border-appGray-600 rounded-lg p-2 font-nunito"
                          placeholder="Paste LinkedIn profile link"
                        />
                      )}

                      {/* Notes */}
                      <div className="mt-2 mb-2">
                        <ul className="list-none pl-[20px]">
                          <li className="text-xs">Optional</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right side - Uploaded data */}
                    <div className="flex-1">
                      <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded Bio</h6>
                      <div className="border border-appGray-600 rounded-lg px-2 pt-2 pb-[20px]">
                        <div className="rounded-lg p-2 flex-1">
                          {productInputMode === "file" && productFile ? (
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-nunito">{productFile.name}</p>
                              <TrashIcon
                                className="cursor-pointer"
                                width={25}
                                onClick={() => setProductFile(null)}
                              />
                            </div>
                          ) : productInputMode === "url" && productUrl ? (
                            <div className="flex justify-between items-center">
                              <a
                                href={productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-900 underline text-sm font-nunito"
                              >
                                {productUrl}
                              </a>
                              <TrashIcon
                                className="cursor-pointer"
                                width={25}
                                onClick={() => setProductUrl("")}
                              />
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                              No file or link provided yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product Screenshots end  */}

                {/* supporting material field start  */}
                <div className="w-full py-2">
                  <div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                      <div className="flex-1">
                        <h6 className="font-semibold text-base font-nunito mb-1">
                          Supporting Materials
                        </h6>
                        <div
                          className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                            dragging ? "bg-gray-200" : ""
                          }`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleSupportDrop}
                        >
                          <div
                            className="flex flex-col items-center text-lg"
                            onClick={handleSupportBrowseClick}
                          >
                            <UploadIcon />
                            <p className="text-center text-base font-bold font-nunito mt-3">
                              Drag and Drop files to upload
                            </p>
                            <p className="text-base py-0.5 font-bold font-nunito">or</p>
                            <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                              Browse
                            </p>
                          </div>
                        </div>
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          multiple
                          ref={supportInputRef}
                          onChange={handleSupportFileChange}
                          className="hidden"
                        />
                        <div className="mt-2 mb-2">
                          {/* <p className="text-lg font-semibold font-nunito">
                          Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                          </p> */}
                          <ul className="list-none pl-[20px]">
                            {/* {listContent.map((content) => ( */}
                            <li className="text-xs">
                              Upload up to 100 files (PDF, PPTX, DOCX, Keynote)
                            </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">
                          Uploaded files Support
                        </h6>
                        <div
                          className={`border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]`}
                        >
                          <div className="rounded-lg p-2 flex-1">
                            {supportFiles.length > 0 ? (
                              <div className="h-[180px] pn_scroller overflow-y-auto pr-1">
                                {supportFiles.map((file, index) => (
                                  <div key={index}>
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-nunito">{file.name}</p>
                                      <TrashIcon
                                        className="cursor-pointer"
                                        width={25}
                                        onClick={() => handleDelete(index, "capTable")}
                                      />
                                    </div>
                                  </div>
                                ))}
                                {/* {highlight ? ( */}
                                {/* ) : null} */}
                              </div>
                            ) : highlight ? (
                              <div className="flex items-center justify-center p-5 h-full">
                                <DotLoader />
                              </div>
                            ) : (
                              <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                                No file uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{/* File Upload Box */}</div>
                  </div>
                </div>
                {/* supporting material field end  */}
              </div>
              {/* Supporting Materials end */}

              {/* Relevant Links start  */}
              <div className="mt-6">
                <div className="relative">
                  
                  <h2 className="bg-white text-primary-900 text-xl font-semibold pb-1 border-b border-gray-300">
                    Relevant Links
                  </h2>
                </div>

                <div className="flex  space-x-4 py-2">
                  {/* First Part: File Upload and Paste URL */}
                  <div className="w-1/2 space-y-4">
                    <div className="w-full">
                      <label
                        htmlFor="company_website"
                        className="block text-md  text-secondary-800"
                      >
                        Company Website <span className="text-red-500 ml-0">*</span>
                      </label>
                      <input
                        type="text"
                        id="company_website"
                        {...requirementRegister("company_website")}
                        // required
                        placeholder="https://acmeai.com"
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.company_website
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.company_website && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.company_website?.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-1">
                      <label htmlFor="linkedin_page" className="block text-md text-secondary-800">
                        LinkedIn Page <span className="text-red-500 ml-0">*</span>
                      </label>
                      <input
                        id="linkedin_page"
                        disabled={disabled}
                        {...requirementRegister("linkedin_page")}
                        placeholder="https://linkedin.com/company/acmeai"
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent resize-none",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.linkedin_page
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.linkedin_page && (
                        <div className="mt-0 text-s text-danger-500">
                          {requirementErrors.linkedin_page?.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-1/2 space-y-4">
                    <div className="w-full">
                      <label htmlFor="crunchbase" className="block text-md  text-secondary-800">
                        Crunchbase / Pitchbook / Dealroom
                      </label>
                      <input
                        type="text"
                        id="Crunchbase"
                        {...requirementRegister("Crunchbase")}
                        // required
                        placeholder=""
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.Crunchbase
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.Crunchbase && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.Crunchbase?.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-1">
                      <label htmlFor="product_demo" className="block text-md text-secondary-800">
                        Product Demo or Landing Page
                      </label>
                      <input
                        id="product_demo"
                        disabled={disabled}
                        {...requirementRegister("product_demo")}
                        placeholder=""
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent resize-none",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.product_demo
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.product_demo && (
                        <div className="mt-0 text-s text-danger-500">
                          {requirementErrors.product_demo?.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second Part: Added Websites and Urls Listing */}
                  <div className="w-full space-y-4">
                    <div className="w-full">
                      <label htmlFor="other_source" className="block text-md  text-secondary-800">
                        Other Source Links
                      </label>
                      <input
                        type="text"
                        id="other_source"
                        {...requirementRegister("other_source")}
                        // required
                        placeholder=""
                        disabled={disabled}
                        className={classNames(
                          "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                          disabled ? "bg-gray-400 cursor-not-allowed" : "",
                          requirementErrors.other_source
                            ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                            : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                        )}
                      />
                      {requirementErrors.other_source && (
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.other_source?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Relevant Links end  */}

              <div className="max-w-[120px] mt-5">
                <button
                  type="submit"
                  // onClick={() => {
                  //   setStep(3);
                  //   window.scrollTo({
                  //     top: 0,
                  //     behavior: "smooth",
                  //   });
                  // }}
                  className="cursor-pointer flex justify-center text-center border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        ) : step === 1 ? (
          <div className="py-3">
            <form onSubmit={handleSubmitForm(handleSubmitProject)}>
              <label htmlFor="fullName" className="block text-md font-nunito text-secondary-800">
                Name your project <span className="text-red-500 ml-0">*</span>
              </label>
              <input
                type="text"
                id="projectName"
                {...register("projectName")}
                placeholder="Project Name"
                className={classNames(
                  "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                  errors.projectName
                    ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
              />
              {errors.projectName?.message && (
                <div className="mt-1 text-s text-danger-500">{errors.projectName?.message}</div>
              )}
              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div
                  role="button"
                  onClick={handleSubmitForm(handleSubmitProject)}
                  className="inline-flex justify-center items-center cursor-pointer border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  {loading ? <LoadingIcon width={18} height={18} className="" /> : "Next"}
                </div>
              </div>
            </form>
          </div>
        ) : step === 3 ? (
          <div className="p-3 w-full">
            <form onSubmit={handleSubmitCustomReport(handleFinalSubmitProject)}>
              <h6 className="text-lg font-semibold ml-0 mb-3">Report Customization</h6>
              <CustmizationForm
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
              {/* <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Report Tone</h6>
                <SelectBox
                  options={[
                    "Analytical (Data-focused, emphasizing metrics and insights)",
                    "Narrative (Storytelling, highlighting trends and key takeaways)",
                    "Strategic (Focused on recommendations and next steps)",
                    "Hybrid (Mix of data, narrative, and recommendations)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("report_tone", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Charts and Visuals</h6>
                <SelectBox
                  options={[
                    "Basic (1-2 per section)",
                    "Analytical (3-4 per section)",
                    "Intuitive (5+ per section)",
                    "Statical (7+ per section)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("no_of_charts", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Visual Style</h6>
                <SelectBox
                  options={[
                    "Simple (Clean and easy to understand)",
                    "Annotated (Explanatory visuals with supporting details)",
                    "Detailed (Explanatory visuals with deep details)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("visual_style", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Citation Style</h6>
                <SelectBox
                  options={[
                    "Inline Links (Clickable web URLs in the text)",
                    "Endnotes (References listed at the end)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("citations", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Format</h6>
                <SelectBox
                  options={[
                    "PDF Report (Static and easy to share)",
                    "Presentation Deck (Ready-to-use slides)",
                    "Word Document (Editable format for custom updates)",
                    "Spreadsheet Summary (Key data in tabular format)",
                  ]}
                  multiple={true}
                  onChangeValue={(value: any) => {
                    handleReportChange("format", value);
                  }}
                />
              </div> */}
              <div className="mt-5">
                <h6 className="font-semibold mb-1 text-base font-nunito">
                  Have any special requests? Let us know what you need, and we’ll tailor the report
                  to fit your goals!
                </h6>
                <div
                  className="relative w-full overflow-hidden bg-white"
                  aria-disabled
                  onClick={handleInputFromAnimated}
                >
                  <input
                    // ref={inputRef}
                    id="specialRequests"
                    type="text"
                    className={classNames(
                      "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                      disabled ? "bg-gray-400 cursor-not-allowed" : "",
                      customReportErrors.additional
                        ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                    placeholder=""
                    {...customReportRegister("additional")}
                  />
                  {customReportErrors.additional && (
                    <div className="mt-1 text-s text-danger-500">
                      {customReportErrors.additional?.message}
                    </div>
                  )}
                  {additionalSummary === "" && (
                    <AnimatedPlaceholder
                      className="absolute top-1 left-2 pt-1 bg-transparent"
                      onClick={() => setFocus("additional")}
                    />
                  )}
                </div>
              </div>

              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div className="max-w-[120px] mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer flex justify-center text-center border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                  >
                    {loading ? <LoadingIcon width={18} height={18} className="" /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <TakeoffScreen />
        )}
      </div>
    </div>
  );
};

export default QuickReports;

import React from "react";

import {
  startupDilligenceImage,
  corporateVentureImage,
  financeStrategyImage,
  fundRaisingImage,
  legalAndComplianceImage,
  marketStrategyImage,
  marketingAndSalesImage,
  portfolioSupportImage,
  productEngineeringImage,
  reportOnAnythingImage,
  technologyAndRndImage,
} from "../../product/ai-agent/landing/_assets";

import startupDilligenceIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/CompanyDilligance.svg";
import corporateVentureIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/VentureCapital.svg";
import financeAndStrategyIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/FinanceStrategy.svg";
import fundRaisingIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/fundraise.svg";
import legalAndComplianceIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/LegalSupport.svg";
import marketStrategyIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/MarketStrategy.svg";
import marketingAndSalesIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/MarketingSales.svg";
import portfolioSupportIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/port.svg";
import productEngineeringIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/ProductEngineering.svg";
import reportOnAnythingIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/ReportAnything.svg";
import technologyAndRndIcon from "../../product/ai-agent/landing/_assets/AgentLanding-Icons/TechnologyR-D.svg";
import AgentHead from "src/pages/product/ai-agent/AgentHead";
import AgentCard from "src/pages/product/ai-agent/landing/_components/AgentCard";


// Custom SVG Icons (replace these with your own SVGs)

const agents = [
  {
    agentName: "Startup Diligence Agent",
    title: "Company Diligence Agent",
    description:
      "Evaluate company to uncover risks, validate potential, and guide informed investment decisions.",
    icon: startupDilligenceIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: startupDilligenceImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Fundraising Strategy Agent",
    title: "Fundraising Strategy Agent",
    description:
      "Optimize portfolio performance through monitoring, diversification, and growth strategies.",
    icon: fundRaisingIcon,
    bgClass: "from-blue-200 to-blue-100",
    className: "",
    backgroundImage: fundRaisingImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Report on Anything Agent",
    title: "Report on Anything Agent",
    description:
      "Generate tailored, data-rich reports for any business need, quickly and accurately.",
    icon: reportOnAnythingIcon,
    bgClass: "from-purple-200 to-pink-100",
    className: "",
    backgroundImage: reportOnAnythingImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Market Strategy Agent",
    title: "Market Strategy Agent",
    description:
      "Analyze trends and develop strategies to unlock market potential and drive growth.",
    icon: marketStrategyIcon,
    bgClass: "from-teal-200 to-blue-100",
    className: "",
    backgroundImage: marketStrategyImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Portfolio Support Agent",
    title: "Portfolio Support Agent",
    description:
      "Optimize portfolio performance through monitoring, diversification, and growth strategies.",
    icon: portfolioSupportIcon,
    bgClass: "from-pink-200 to-purple-100",
    className: "",
    backgroundImage: portfolioSupportImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Technology & R&D Agent",
    title: "Technology & R&D Agent",
    description:
      "Stay ahead with insights on emerging technologies, innovation strategies, and R&D opportunities.",
    icon: technologyAndRndIcon,
    bgClass: "from-yellow-200 to-green-100",
    className: "",
    backgroundImage: technologyAndRndImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Product & Engineering Agent",
    title: "Product & Engineering Agent",
    description:
      "Accelerate product development and engineering with process optimization and market alignment.",
    icon: productEngineeringIcon,
    bgClass: "from-red-200 to-pink-100",
    className: "",
    backgroundImage: productEngineeringImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Corporate Venture Capital Agent",
    title: "Corporate Venture Capital Agent",
    description: "Identify and manage promising startup investments to maximize venture success.",
    icon: corporateVentureIcon,
    bgClass: "from-blue-200 to-purple-100",
    className: "",
    backgroundImage: corporateVentureImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Finance & Strategy Agent",
    title: "Finance & Strategy Agent",
    description:
      "Make confident financial decisions with data-driven analysis and strategic insights.",
    icon: financeAndStrategyIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: financeStrategyImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Marketing & Sales Agent",
    title: "Marketing & Sales Agent",
    description: "Boost revenue by crafting impactful campaigns and closing deals with precision.",
    icon: marketingAndSalesIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "",
    backgroundImage: marketingAndSalesImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Legal & Compliance Agent",
    title: "Legal & Compliance Agent",
    description:
      "Navigate legal and regulatory challenges to ensure compliance and mitigate risks.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: legalAndComplianceImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Prior Art Agent",
    title: "Prior Art Agent",
    description:
      "Protect your idea before it turns up in someone else’s patent.",
    icon: legalAndComplianceIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "",
    backgroundImage: marketingAndSalesImage,
    navLink: "/my-projects"
  },
  {
    agentName: "FTO Agent",
    title: "FTO Agent",
    description:
      "Launch with confidence — no red tape, no regrets.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: financeStrategyImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Patent Licensing Agent",
    title: "Patent Licensing Agent",
    description:
      "Turn unused patents into untapped revenue.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: legalAndComplianceImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Patent Landscape Agent",
    title: "Patent Landscape Agent",
    description:
      "See the full IP battlefield — and your best path through it.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: productEngineeringImage,
    navLink: "/my-projects"
  },
  {
    agentName: "Prosecution History Agent",
    title: "Prosecution History Agent",
    description:
      "Learn from every claim, correction, and curveball — before you file.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: startupDilligenceImage,
    navLink: "/my-projects"
  },
];

export default function AgentsGrid() {
  return (
    <>
    <div className="px-4 pt-2 pb-12">
      <AgentHead agentName="" />
      <h1 className="text-4xl font-bold mb-4">Our Suite of AI Agents</h1>
      <p className="text-lg mb-2">
        Explore our AI agents, each tailored to assist with specific tasks.
      </p>
      <p className="text-lg mb-8">
        <span className="text-orange-500 font-medium">Select</span> the one that best suits your
        needs to get started!
      </p>

      <div className="max-w-[1500px]">

        <h2 className="text-4xl font-bold mb-4">Investors</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-4">
          <div className="col-span-6"><AgentCard agent={agents[0]} /></div>
          <div className="col-span-6"><AgentCard agent={agents[1]} /></div>
          <div className="col-span-7"><AgentCard agent={agents[4]} /></div>
          <div className="col-span-5"><AgentCard agent={agents[7]} /></div>
        </div>

        <h2 className="text-4xl font-bold mb-4">Enterprises</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-4">
          <div className="col-span-5"><AgentCard agent={agents[3]} /></div>
          <div className="col-span-7"><AgentCard agent={agents[6]} /></div>
          <div className="col-span-7"><AgentCard agent={agents[9]} /></div>
          <div className="col-span-5"><AgentCard agent={agents[5]} /></div>
          <div className="col-span-6"><AgentCard agent={agents[8]} /></div>
          <div className="col-span-6"><AgentCard agent={agents[10]} /></div>
          <div className="col-span-12"><AgentCard agent={agents[2]} /></div>
        </div>

        <h2 className="text-4xl font-bold mb-4">IP Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="col-span-6"><AgentCard agent={agents[11]} /></div>
          <div className="col-span-6"><AgentCard agent={agents[12]} /></div>
          <div className="col-span-7"><AgentCard agent={agents[13]} /></div>
          <div className="col-span-5"><AgentCard agent={agents[14]} /></div>
          <div className="col-span-12"><AgentCard agent={agents[15]} /></div>
        </div>

      </div>
    </div>
   
    </>
  );
}

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
} from "./_assets";

import startupDilligenceIcon from "./_assets/AgentLanding-Icons/CompanyDilligance.svg";
import corporateVentureIcon from "./_assets/AgentLanding-Icons/VentureCapital.svg";
import financeAndStrategyIcon from "./_assets/AgentLanding-Icons/FinanceStrategy.svg";
import fundRaisingIcon from "./_assets/AgentLanding-Icons/fundraise.svg";
import legalAndComplianceIcon from "./_assets/AgentLanding-Icons/LegalSupport.svg";
import marketStrategyIcon from "./_assets/AgentLanding-Icons/MarketStrategy.svg";
import marketingAndSalesIcon from "./_assets/AgentLanding-Icons/MarketingSales.svg";
import portfolioSupportIcon from "./_assets/AgentLanding-Icons/port.svg";
import productEngineeringIcon from "./_assets/AgentLanding-Icons/ProductEngineering.svg";
import reportOnAnythingIcon from "./_assets/AgentLanding-Icons/ReportAnything.svg";
import technologyAndRndIcon from "./_assets/AgentLanding-Icons/TechnologyR-D.svg";

import AgentCard from "./_components/AgentCard";
import AgentHead from "../AgentHead";
import StartupModal from "./startup-modal";

// Custom SVG Icons (replace these with your own SVGs)

const agents = [
  {
    agentName: "Startup Diligence Agent",
    title: "Company Diligence Agent",
    description:
      "See the signals others miss — before they become headlines.",
    icon: startupDilligenceIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: startupDilligenceImage,
    agentLink: "company-diligence-agent",
    section_name: "investors",
  },
  {
    agentName: "Fundraising Strategy Agent",
    title: "Fundraising Strategy Agent",
    description:
      "Close your next round with a strategy that sells itself.",
    icon: fundRaisingIcon,
    bgClass: "from-blue-200 to-blue-100",
    className: "",
    backgroundImage: fundRaisingImage,
    agentLink: "fundraising-strategy-agent",
    section_name: "investors",
  },
  {
    agentName: "Report on Anything Agent",
    title: "Report on Anything Agent",
    description:
      "Get answers to any question — no team, no wait time.",
    icon: reportOnAnythingIcon,
    bgClass: "from-purple-200 to-pink-100",
    className: "",
    backgroundImage: reportOnAnythingImage,
    agentLink: "report-on-anything-agent",
    section_name: "investors",
  },
  {
    agentName: "Market Strategy Agent",
    title: "Market Strategy Agent",
    description:
      "Turn trends into traction before the market catches on.",
    icon: marketStrategyIcon,
    bgClass: "from-teal-200 to-blue-100",
    className: "",
    backgroundImage: marketStrategyImage,
    agentLink: "market-strategy-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Portfolio Support Agent",
    title: "Portfolio Support Agent",
    description:
      "Grow your portfolio without growing your headache",
    icon: portfolioSupportIcon,
    bgClass: "from-pink-200 to-purple-100",
    className: "",
    backgroundImage: portfolioSupportImage,
    agentLink: "portfolio-support-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Technology & R&D Agent",
    title: "Technology & R&D Agent",
    description:
      "Stay three steps ahead of what’s coming next.",
    icon: technologyAndRndIcon,
    bgClass: "from-yellow-200 to-green-100",
    className: "",
    backgroundImage: technologyAndRndImage,
    agentLink: "technology-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Product & Engineering Agent",
    title: "Product & Engineering Agent",
    description:
      "Build what the market’s already waiting for.",
    icon: productEngineeringIcon,
    bgClass: "from-red-200 to-pink-100",
    className: "",
    backgroundImage: productEngineeringImage,
    agentLink: "product-engineering-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Corporate Venture Capital Agent",
    title: "Corporate Venture Capital Agent",
    description: "Find your next unicorn — and ride it all the way to ROI",
    icon: corporateVentureIcon,
    bgClass: "from-blue-200 to-purple-100",
    className: "",
    backgroundImage: corporateVentureImage,
    agentLink: "corporate-venture-capital-agent",
    section_name: "investors",
  },
  {
    agentName: "Finance & Strategy Agent",
    title: "Finance & Strategy Agent",
    description:
      "Make every business move a calculated win.",
    icon: financeAndStrategyIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: financeStrategyImage,
    agentLink: "finance-strategy-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Marketing & Sales Agent",
    title: "Marketing & Sales Agent",
    description: "Turn campaigns into conversions — and headlines into revenue.",
    icon: marketingAndSalesIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "",
    backgroundImage: marketingAndSalesImage,
    agentLink: "marketing-sales-agent",
    section_name: "enterprises",
  },
  {
    agentName: "Legal & Compliance Agent",
    title: "Legal & Compliance Agent",
    description:
      "Navigate complexity with confidence — and zero surprises.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: legalAndComplianceImage,
    agentLink: "legal-compliance-agent",
    section_name: "enterprises",
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
    agentLink: "prior-art-agent",
    section_name: "ip_experts",
    disabled: true
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
    agentLink: "fto-agent",
    section_name: "ip_experts",
    disabled: true
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
    agentLink: "patent-licensing-agent",
    section_name: "ip_experts",
    disabled: true
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
    agentLink: "patent-landscape-agent",
    section_name: "ip_experts",
    disabled: true
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
    agentLink: "prosecution-history-agent",
    section_name: "ip_experts",
    disabled: true
  },
];

export default function AgentsGrid() {
  return (
    <>
     <StartupModal/>
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

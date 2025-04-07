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
    agentName: "Startup Diligence",
    title: "Company Diligence Agent",
    description:
      "See the signals others miss — before they become headlines.",
    icon: startupDilligenceIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: startupDilligenceImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Fundraising Strategy",
    title: "Fundraising Strategy Agent",
    description:
      "Close your next round with a strategy that sells itself.",
    icon: fundRaisingIcon,
    bgClass: "from-blue-200 to-blue-100",
    className: "",
    backgroundImage: fundRaisingImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Report on Anything",
    title: "Report on Anything Agent",
    description:
      "Get answers to any question — no team, no wait time.",
    icon: reportOnAnythingIcon,
    bgClass: "from-purple-200 to-pink-100",
    className: "",
    backgroundImage: reportOnAnythingImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Market Strategy",
    title: "Market Strategy Agent",
    description:
      "Turn trends into traction before the market catches on.",
    icon: marketStrategyIcon,
    bgClass: "from-teal-200 to-blue-100",
    className: "",
    backgroundImage: marketStrategyImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Portfolio Support",
    title: "Portfolio Support Agent",
    description:
      "Grow your portfolio without growing your headache.",
    icon: portfolioSupportIcon,
    bgClass: "from-pink-200 to-purple-100",
    className: "",
    backgroundImage: portfolioSupportImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Technology & R&D",
    title: "Technology & R&D Agent",
    description:
      "Stay three steps ahead of what’s coming next.s",
    icon: technologyAndRndIcon,
    bgClass: "from-yellow-200 to-green-100",
    className: "",
    backgroundImage: technologyAndRndImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Product & Engineering",
    title: "Product & Engineering Agent",
    description:
      "Build what the market’s already waiting for",
    icon: productEngineeringIcon,
    bgClass: "from-red-200 to-pink-100",
    className: "",
    backgroundImage: productEngineeringImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Corporate Venture Capital",
    title: "Corporate Venture Capital Agent",
    description: "Find your next unicorn — and ride it all the way to ROI.",
    icon: corporateVentureIcon,
    bgClass: "from-blue-200 to-purple-100",
    className: "",
    backgroundImage: corporateVentureImage,
    navLink: "/my-projects",
    section_name:"investors"
  },
  {
    agentName: "Finance & Strategy",
    title: "Finance & Strategy Agent",
    description:
      "Make every business move a calculated win.",
    icon: financeAndStrategyIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "",
    backgroundImage: financeStrategyImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Marketing & Sales",
    title: "Marketing & Sales Agent",
    description: "Turn campaigns into conversions — and headlines into revenue.",
    icon: marketingAndSalesIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "",
    backgroundImage: marketingAndSalesImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Legal & Compliance Agent",
    title: "Legal & Compliance",
    description:
      "Navigate complexity with confidence — and zero surprises.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: legalAndComplianceImage,
    navLink: "/my-projects",
    section_name: "investors",
  },
  {
    agentName: "Prior Art",
    title: "Prior Art Agent",
    description:
      "Protect your idea before it turns up in someone else’s patent.",
    icon: legalAndComplianceIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "",
    backgroundImage: marketingAndSalesImage,
    navLink: "/my-projects",
    section_name: "ip_experts",
  },
  {
    agentName: "FTO",
    title: "FTO Agent",
    description:
      "Launch with confidence — no red tape, no regrets.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: financeStrategyImage,
    navLink: "/my-projects",
    section_name: "ip_experts",
  },
  {
    agentName: "Patent Licensing",
    title: "Patent Licensing Agent",
    description:
      "Turn unused patents into untapped revenue.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: legalAndComplianceImage,
    navLink: "/my-projects",
    section_name: "ip_experts"
  },
  {
    agentName: "Patent Landscape",
    title: "Patent Landscape Agent",
    description:
      "See the full IP battlefield — and your best path through it.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: productEngineeringImage,
    navLink: "/my-projects",
    section_name: "ip_experts"
  },
  {
    agentName: "Prosecution History",
    title: "Prosecution History Agent",
    description:
      "Learn from every claim, correction, and curveball — before you file.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "",
    backgroundImage: startupDilligenceImage,
    navLink: "/my-projects",
    section_name: "ip_experts"
  },
];

export default function AgentsGrid() {
  return (
    <>
    <div className="px-4 pt-2 pb-12">
      <AgentHead agentName="" />
      <h1 className="text-4xl font-bold mb-4">Deal Flow Screening</h1>
      {/* <p className="text-lg mb-2">
        Explore our AI agents, each tailored to assist with specific tasks.
      </p> */}
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

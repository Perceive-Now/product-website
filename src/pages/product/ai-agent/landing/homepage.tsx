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

import startupDilligenceIcon from "./_assets/AgentLanding-Icons/Company.svg";
import corporateVentureIcon from "./_assets/AgentLanding-Icons/Corporate.svg";
import financeAndStrategyIcon from "./_assets/AgentLanding-Icons/Finance.svg";
import fundRaisingIcon from "./_assets/AgentLanding-Icons/Fundraising.svg";
import legalAndComplianceIcon from "./_assets/AgentLanding-Icons/Legal.svg";
import marketStrategyIcon from "./_assets/AgentLanding-Icons/MarketStrategy.svg";
import marketingAndSalesIcon from "./_assets/AgentLanding-Icons/Marketing.svg";
import portfolioSupportIcon from "./_assets/AgentLanding-Icons/portfolio.svg";
import productEngineeringIcon from "./_assets/AgentLanding-Icons/Product.svg";
import reportOnAnythingIcon from "./_assets/AgentLanding-Icons/ReportAnything.svg";
import technologyAndRndIcon from "./_assets/AgentLanding-Icons/Technology.svg";

import AgentCard from "./_components/AgentCard";
import AgentHead from "../AgentHead";

// Custom SVG Icons (replace these with your own SVGs)

const agents = [
  {
    agentName: "Startup Diligence Agent",
    title: "Company Diligence Agent",
    description:
      "Evaluate company to uncover risks, validate potential, and guide informed investment decisions.",
    icon: startupDilligenceIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "col-span-6 row-span-1",
    backgroundImage: startupDilligenceImage,
    agentLink: "company-diligence-agent",
  },
  {
    agentName: "Fundraising Strategy Agent",
    title: "Fundraising Strategy Agent",
    description:
      "Optimize portfolio performance through monitoring, diversification, and growth strategies.",
    icon: fundRaisingIcon,
    bgClass: "from-blue-200 to-blue-100",
    className: "col-span-1 row-span-1 h-[550px]",
    backgroundImage: fundRaisingImage,
    agentLink: "fundraising-strategy-agent",
  },
  {
    agentName: "Report on Anything Agent",
    title: "Report on Anything Agent",
    description:
      "Generate tailored, data-rich reports for any business need, quickly and accurately.",
    icon: reportOnAnythingIcon,
    bgClass: "from-purple-200 to-pink-100",
    className: "col-span-1 row-span-1 h-full",
    backgroundImage: reportOnAnythingImage,
    agentLink: "report-on-anything-agent",
  },
  {
    agentName: "Market Strategy Agent",
    title: "Market Strategy Agent",
    description:
      "Analyze trends and develop strategies to unlock market potential and drive growth.",
    icon: marketStrategyIcon,
    bgClass: "from-teal-200 to-blue-100",
    className: "col-span-1 row-span-1 h-[550px]",
    backgroundImage: marketStrategyImage,
    agentLink: "market-strategy-agent",
  },
  {
    agentName: "Portfolio Support Agent",
    title: "Portfolio Support Agent",
    description:
      "Optimize portfolio performance through monitoring, diversification, and growth strategies.",
    icon: portfolioSupportIcon,
    bgClass: "from-pink-200 to-purple-100",
    className: "col-span-1 row-span-1 h-[550px]",
    backgroundImage: portfolioSupportImage,
    agentLink: "portfolio-support-agent",
  },
  {
    agentName: "Technology & R&D Agent",
    title: "Technology & R&D Agent",
    description:
      "Stay ahead with insights on emerging technologies, innovation strategies, and R&D opportunities.",
    icon: technologyAndRndIcon,
    bgClass: "from-yellow-200 to-green-100",
    className: "col-span-2 row-span-1",
    backgroundImage: technologyAndRndImage,
    agentLink: "technology-agent",
  },
  {
    agentName: "Product & Engineering Agent",
    title: "Product & Engineering Agent",
    description:
      "Accelerate product development and engineering with process optimization and market alignment.",
    icon: productEngineeringIcon,
    bgClass: "from-red-200 to-pink-100",
    className: "col-span-1 row-span-1 h-[420px]",
    backgroundImage: productEngineeringImage,
    agentLink: "product-engineering-agent",
  },
  {
    agentName: "Corporate Venture Capital Agent",
    title: "Corporate Venture Capital Agent",
    description: "Identify and manage promising startup investments to maximize venture success.",
    icon: corporateVentureIcon,
    bgClass: "from-blue-200 to-purple-100",
    className: "col-span-1 row-span-1 h-[420px]",
    backgroundImage: corporateVentureImage,
    agentLink: "corporate-venture-capital-agent",
  },
  {
    agentName: "Finance & Strategy Agent",
    title: "Finance & Strategy Agent",
    description:
      "Make confident financial decisions with data-driven analysis and strategic insights.",
    icon: financeAndStrategyIcon,
    bgClass: "from-pink-200 to-red-100",
    className: "col-span-1 row-span-1",
    backgroundImage: financeStrategyImage,
    agentLink: "finance-strategy-agent",
  },
  {
    agentName: "Marketing & Sales Agent",
    title: "Marketing & Sales Agent",
    description: "Boost revenue by crafting impactful campaigns and closing deals with precision.",
    icon: marketingAndSalesIcon,
    bgClass: "from-purple-200 to-blue-100",
    className: "col-span-1 row-span-1 h-[450px]",
    backgroundImage: marketingAndSalesImage,
    agentLink: "marketing-sales-agent",
  },
  {
    agentName: "Legal & Compliance Agent",
    title: "Legal & Compliance Agent",
    description:
      "Navigate legal and regulatory challenges to ensure compliance and mitigate risks.",
    icon: legalAndComplianceIcon,
    bgClass: "from-yellow-200 to-orange-100",
    className: "col-span-1 row-span-1 h-[450px]",
    backgroundImage: legalAndComplianceImage,
    agentLink: "legal-compliance-agent",
  },
];

export default function AgentsGrid() {
  return (
    <div className="px-4 pt-2 pb-12">
      <AgentHead agentName="" />
      <h1 className="text-4xl font-bold mb-4">Agents</h1>
      <p className="text-lg mb-2">
        Explore our AI agents, each tailored to assist with specific tasks.
      </p>
      <p className="text-lg mb-8">
        <span className="text-orange-500 font-medium">Select</span> the one that best suits your
        needs to get started!
      </p>

      <div className="max-w-[1500px]">
        {/* startup dilligence to technology and rnd */}
        <div className="flex gap-2">
          <div>
            <AgentCard agent={agents[0]} />
            <div className="flex gap-2 mt-2">
              <AgentCard agent={agents[3]} />

              <AgentCard agent={agents[4]} />
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-2 mb-2">
              <AgentCard agent={agents[1]} />
              <AgentCard agent={agents[2]} />
            </div>

            <AgentCard agent={agents[5]} />
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-2">
              <AgentCard agent={agents[6]} />
              <AgentCard agent={agents[7]} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <AgentCard agent={agents[9]} />

              <AgentCard agent={agents[10]} />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <AgentCard agent={agents[8]} />
          </div>
        </div>
      </div>
    </div>
  );
}

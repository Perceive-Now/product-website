// Define all options for all sections
const allOptions = {
  agents: [
    "Startup diligence",
    "Portfolio support",
    "Fundraising strategy",
    "Market strategy",
    "Technology & R&D",
    "Product & Engineering",
    "Marketing & Sales",
    "Finance & Strategy",
    "Legal & Compliance",
    "Report on Anything",
    "Corporate Development",
  ],
  datasets: [
    "Custom Dataset Integration",
    "Real-Time Market Insights",
    "Predictive Analytics",
    "AI-Augmented Cross-Validation",
    "Historical and Trend Analysis",
    "Hybrid Data Layering",
    "Proprietary Knowledge Graphs",
    "Verified Multi-Source Insights",
  ],
  reportDesignCustomization: [
    "Font & Color Customization",
    "Logo & Branding Integration",
    "Layout & Design Flexibility",
  ],
  reportContentCustomization: [
    "Report Tone",
    "Charts and Visuals",
    "Visual Style",
    "Citation Style",
  ],
  knowNowChat: [
    "Basic Responses",
    "Analytical Insights",
    "Visual Data Representation",
    "Interactive Analysis",
    "Comprehensive Analytics",
    "Real-time Web Search",
    "Predictive Modeling"
  ],
  quickViewReports: [
    "Single-Page Summaries",
    "Simplified Tone",
    "Investor-Centric Insights",
    "Stakeholder-Specific Reports",
  ],
  explainability: [
    "Basic Stat Explanations",
    "Source Citations",
    "Logical Breakdown Layers",
    "Editable Data & Metrics",
    "Advanced Multi-Layered Insights",
    "Forecasting Transparency",
  ],
  templates: [
    "UI-based options for pre-built templates",
    "Semi-customizable templates tailored to professional goals",
    "Fully UI-customizable templates for enterprise-wide insights",
  ],
  dynamicSectionCustomization: [
    "Add/remove key metrics (e.g., market, competitors, funding strategy)",
    "Enhanced customization with UI-based smart options",
    "Fully customizable sections through advanced UI tools",
  ],
  reportFormats: ["pdf", "docx", "csv", "xlsx", "pptx"],
};

const descriptions = {
  agents: [
    "Our AI-powered agents act as your team of specialized experts, delivering in-depth analysis, personalized strategies, and automated reports. Make informed decisions and accelerate your growth.",
  ],
  datasets: [
    "Allows users to upload and integrate their own datasets for analysis.",
    "Provides up-to-date market and real-time industry activity tracking.",
    "AI-powered analysis to forecast trends and predict future scenarios.",
    "Cross-checks data against internal and external sources to ensure accuracy.",
    "Analyzes historical data to identify patterns and predict future outcomes.",
    "Combines static, real-time, and curated datasets for deeper insights.",
    "Vast maps connecting datasets for a broader understanding of market and patent landscapes.",
    "Aggregates insights from multiple trusted sources for enterprise-grade reliability.",
  ],
  reportDesignCustomization: [
    "Customize the look of your reports with specific fonts and color schemes.",
    "Add your logo and branding for a professional, personalized touch.",
    "Fully flexible layouts and advanced design options for unique needs.",
  ],
  reportContentCustomization: [
    "Tailor your reports with customizable tones, visuals, and formats to match your specific needs.",
  ],
  knowNowChat: [
    "Expert AI chat assistant for IP and market analysis.",
  ],
  quickViewReports: [
    "Condensed reports that highlight only the most important details.",
    "Simplifies technical data for easy understanding by all stakeholders.",
    "Reports tailored specifically to the interests of investors.",
    "Designed to address the specific needs of various stakeholders.",
  ],
  explainability: [
    "Understandable explanations of AI-driven outcomes, for transparency and trust",
  ],
  templates: [
    "Our templates are designed to provide you with the most accurate and up-to-date information available.",
    "Our templates are designed to provide you with the most accurate and up-to-date information available.",
    "Our templates are designed to provide you with the most accurate and up-to-date information available.",
  ],
  dynamicSectionCustomization: [
    "Our dynamic section customization options allow you to create reports that reflect your brand and style.",
    "Our dynamic section customization options allow you to create reports that reflect your brand and style.",
    "Our dynamic section customization options allow you to create reports that reflect your brand and style.",
  ],
  reportFormats: [
    "Standard format for easy sharing and printing.",
    "Editable report formats in Word documents.",
    "Exportable data for deeper analysis in spreadsheets.",
    "Advanced spreadsheet format for data manipulation.",
    "Presentation-ready formats for sharing insights.",
  ],
};

export { descriptions };

const subAgentsDescription = {
  agents: {
    "Startup diligence": [
      "Seamlessly evaluate startups, from uncovering risks to making informed investment choices.",
    ],
    "Portfolio support": [
      "Continuously enhance your portfolio by monitoring performance and exploring diversification strategies.",
    ],
    "Fundraising strategy": [
      "Strategically navigate fundraising, from identifying investors to securing essential funding.",
    ],
    "Market strategy": [
      "Comprehensively develop market approaches, from analyzing trends to maximizing product potential.",
    ],
    "Technology & R&D": [
      "Proactively stay ahead with insights into emerging technologies and support for innovation initiatives.",
    ],
    "Product & Engineering": [
      "Efficiently accelerate product development, from optimizing processes to aligning with market demands.",
    ],
    "Marketing & Sales": [
      "Effectively drive revenue growth, from crafting campaigns to closing deals with precision.",
    ],
    "Finance & Strategy": [
      "Confidently make financial decisions through detailed analysis and strategic insights.",
    ],
    "Legal & Compliance": [
      "Easily navigate legal landscapes, from understanding regulations to ensuring compliance.",
    ],
    "Report on Anything": [
      "Instantly access customized, data-rich reports tailored to your business needs.",
    ],
    "Corporate Development": [
      "Strategically invest by identifying promising startups and managing venture capital endeavors.",
    ],
  },
  reportDesignCustomization: {
    "Font & Color Customization": [
      "• Standard and expanded font selections.",
      "• Preset and customizable color schemes.",
    ],
    "Logo & Branding Integration": [
      "• Single and multiple logo placements.",
      "• Integration of various brand assets.",
    ],
    "Layout & Design Flexibility": [
      "• Layout adjustments.",
      "• Complete template restructuring.",
      "• Advanced design elements.",
    ],
  },
  knowNowChat: {
    "Basic Responses": [
      "Delivers straightforward answers to direct questions.",
    ],
    "Analytical Insights": [
      "Provides core insights through targeted analytics.",
    ],
    "Visual Data Representation": [
      "Offers engaging visuals, graphs, trend forecasts, and more.",
    ],
    "Interactive Analysis": [
      "Combines advanced visuals with interactive, data-driven insights.",
    ],
    "Comprehensive Analytics": [
      "Supplies in-depth analysis with interactive tools for strategic decision-making.",
    ],
    "Real-time Web Search": [
      "Access the latest online information, ensuring your analyses are always current and comprehensive.",
    ],
    "Predictive Modeling": [
      "Forecast future market behaviors, aiding in proactive strategy development.",
    ],
  },
  quickViewReports: {
    "Single-Page Summaries": [
      "Concise overviews designed for quick and effective decision-making.",
    ],
    "Simplified Tone": [
      "Friendly, jargon-free narratives that make complex data accessible to everyone.",
    ],
    "Investor-Centric Insights": [
      "Tailored content focusing on key metrics, growth areas, and actionable recommendations for investment success.",
    ],
    "Stakeholder-Specific Reports": [
      "Provide tailored summaries for different stakeholders, ensuring relevance and clarity for diverse audiences.",
    ],
  },
  explainability: {
    "Basic Stat Explanations": [
      "Simplified descriptions of key statistics, making data accessible to everyone.",
    ],
    "Source Citations": [
      "Transparent linking to data origins for credibility and accountability.",
    ],
    "Logical Breakdown Layers": [
      "Multi-step insights that dissect the reasoning behind conclusions.",
    ],
    "Editable Data & Metrics": [
      "Flexibility to add, modify, or adjust data points and metrics to align with specific needs.",
    ],
    "Advanced Multi-Layered Insights": [
      "Comprehensive explanations that provide depth and context for complex data interpretations.",
    ],
    "Forecasting Transparency": [
      "Clear methodologies behind predictions, ensuring trust in forward-looking analytics.",
    ],
  },
};

export {
  subAgentsDescription
}

export default allOptions;

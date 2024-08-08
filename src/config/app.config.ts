export const AppConfig = {
  WEBSITE_URL: process.env.REACT_APP_WEBSITE_URL ?? "https://perceivenow.ai",
  GOOGLE_API_KEY:
    process.env.REACT_APP_GOOGLE_API_KEY ??
    "213396989514-6vmvj5r4mbfe89aeteittrmh3v5f7o7i.apps.googleusercontent.com",
  API_URL: process.env.REACT_APP_API_URL ?? "https://develop.api.perceivenow.ai",
  Auth_CODE:
    process.env.REACT_APP_AUTH_CODE ?? "kETFs1RXmwbP8nbptBg1dnXXwISsjAecJq4aRhIKaJ4VAzFucUcn3Q==",
  STRIPE_PUBLISHABLE_KEY:
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ??
    "pk_test_51P6m3yKOLJKi8SxAZKPvh7XDwjODiC5aZxQ98K2AuyvwvgoGaH6MSaobwMziqChhXFOhnGX2JWd1zkOSDlbMQdHT00ggwAB8KA",
  KNOW_NOW_IP_API: process.env.REACT_APP_KNOW_NOW_IP_API ?? "https://knownow-ip.azurewebsites.net",
  KNOW_NOW_MARKET_API:
    process.env.REACT_APP_KNOW_NOW_MARKET_API ?? "https://percievenowchat2.azurewebsites.net",
  REPORT_API_URL:
    process.env.REACT_APP_REPORT_API_URL ??
    "https://pn-backend-ccd0ardeguh8fwbk.eastus-01.azurewebsites.net",
  APP_URL: process.env.REACT_APP_APP_URL ?? "https://staging.app.perceivenow.ai",
};

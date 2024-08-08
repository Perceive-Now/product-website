import { StrictMode } from "react";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//
import { store } from "./store";

// App's global style
import "./styles/dot-loader.css";
import "./styles/input.scss";
import "./styles/typing.css";

import "./index.css";

// Tooltip styles
import "react-tooltip/dist/react-tooltip.css";

// App
import App from "./App";

//
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppConfig } from "./config/app.config";

// React query client
const queryclient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

/**
 *
 */
const root = createRoot(document.getElementById("root") as HTMLElement);

const googleAPIKey = AppConfig.GOOGLE_API_KEY;

/**
 *
 */
root.render(
  <StrictMode>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={
            googleAPIKey ||
            "213396989514-6vmvj5r4mbfe89aeteittrmh3v5f7o7i.apps.googleusercontent.com"
          }
        >
          <QueryClientProvider client={queryclient}>
            <App />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

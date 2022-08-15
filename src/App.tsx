import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";

//
import HomePage from "./pages/homepage";
import LoginPage from "./pages/login";

import DashboardPage from "./pages/dashboard";

import PageNotFound404 from "./pages/404";

/**
 *
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* All the routes below are protected */}
        <Route path="/" element={<HomePage />} />

        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* 404 not found */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;

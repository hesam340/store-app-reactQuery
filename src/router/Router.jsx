import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default Router;

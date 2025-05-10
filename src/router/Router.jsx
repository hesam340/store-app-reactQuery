import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import { useUser } from "context/UserContext";

function Router() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<HomePage />} />
      <Route
        path="/auth"
        element={user.token ? <Navigate to="/" /> : <AuthPage />}
      />
    </Routes>
  );
}

export default Router;

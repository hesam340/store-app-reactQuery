import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from 'pages/AuthPage';
import HomePage from 'pages/HomePage';
import { getCookie } from 'utils/cookie';

function Router() {
  const token = getCookie();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<HomePage />} />
      <Route
        path="/auth"
        element={token ? <Navigate to="/" /> : <AuthPage />}
      />
    </Routes>
  );
}

export default Router;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import defaultOptions from "configs/reactQuery";
import Router from "router/Router";
import UserProvider from "context/UserContext";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
            <ToastContainer />
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./style/GlobelCol";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Login } from "./pages/Login";
import { AppLayout } from "./ui/AppLayout";
import { ProtectedRoutesHomePage } from "./features/ProtectedRoutes ";
import ProtectedRouterAfterLogIn from "./features/ProtectedRouterAfterLogIn ";
import { Order } from "./pages/Order";
import { OrderInprogress } from "./pages/OrderInprogress";
import Dashboard from "./pages/Dashboard";
import { OrderCompleted } from "./pages/OrderCompleted";
import { Register } from "./features/Authentication/Register";
import CheckDetails from "./pages/CheckDetails";

const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 40 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutesHomePage>
                <AppLayout />
              </ProtectedRoutesHomePage>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="detailsOrder" element={<OrderInprogress />} />
            <Route path="completed" element={<OrderCompleted />} />
            <Route path="completed/:orderId" element={<CheckDetails />} />
          </Route>
          <Route
            path="sign-in"
            element={
              <ProtectedRouterAfterLogIn>
                <Login />
              </ProtectedRouterAfterLogIn>
            }
          />
          <Route
            path="sign-up"
            element={
              <ProtectedRouterAfterLogIn>
                <Register />
              </ProtectedRouterAfterLogIn>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#272727",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

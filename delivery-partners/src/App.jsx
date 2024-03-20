import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./style/GlobelCol";
import { AppLayout } from "./ui/AppLayout";
import { ProtectedRoutesHomePage } from "./features/ProtectedRoutes ";
import ProtectedRouterAfterLogIn from "./features/ProtectedRouterAfterLogIn ";
import { Loader } from "./ui/Loader";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const OrderInprogress = lazy(() => import("./pages/OrderInprogress"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const OrderCompleted = lazy(() => import("./pages/OrderCompleted"));
const CheckDetails = lazy(() => import("./pages/CheckDetails"));
const SignUp = lazy(() => import("./pages/SignUp"));

const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
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
                  <SignUp />
                </ProtectedRouterAfterLogIn>
              }
            />
          </Routes>{" "}
        </Suspense>
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

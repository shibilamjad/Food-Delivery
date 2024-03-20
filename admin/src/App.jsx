import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./style/GlobelCol";
import { lazy, Suspense } from "react";

import { AppLayout } from "./ui/AppLayout";
import { ProtectedRoutesHomePage } from "./features/ProtectedRoutes ";
import ProtectedRouterAfterLogIn from "./features/ProtectedRouterAfterLogIn ";
import { Loader } from "./ui/Loader";

const Menu = lazy(() => import("./pages/Menu"));
const Login = lazy(() => import("./pages/Login"));
const Menus = lazy(() => import("./pages/Menus"));
const Order = lazy(() => import("./pages/Order"));
const Orders = lazy(() => import("./pages/Orders"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Restaurant = lazy(() => import("./pages/Restaurant"));
const NewRestaurants = lazy(() => import("./pages/NewRestaurants"));
const DeliveryBoy = lazy(() => import("./pages/DeliveryBoy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const City = lazy(() => import("./pages/City"));

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
      <ReactQueryDevtools initialIsOpen={false} />

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
              <Route path="order/:orderId" element={<Orders />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:menuId" element={<Menu />} />
              <Route path="restaurants" element={<Restaurant />} />
              <Route path="restaurants/:restaurantId" element={<Menus />} />
              <Route path="deliveryBoys" element={<DeliveryBoy />} />
              <Route path="city" element={<City />} />
              <Route path="new-restaurants" element={<NewRestaurants />} />
              <Route
                path="new-restaurants/:restaurantId"
                element={<NewRestaurants />}
              />
            </Route>
            <Route
              path="sign-in"
              element={
                <ProtectedRouterAfterLogIn>
                  <Login />
                </ProtectedRouterAfterLogIn>
              }
            />
            <Route path="*" element={<PageNotFound />} />
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

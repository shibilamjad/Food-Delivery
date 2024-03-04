import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./style/GlobelCol";

import { Login } from "./pages/Login";
import { AppLayout } from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoutesHomePage } from "./features/ProtectedRoutes ";
import ProtectedRouterAfterLogIn from "./features/ProtectedRouterAfterLogIn ";
import { Menus } from "./pages/Menus";
import { Order } from "./pages/Order";
import { Orders } from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import { Restaurant } from "./pages/Restaurant";
import { NewRestaurants } from "./pages/NewRestaurants";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Register } from "./features/Authentication/Register";

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
      <ReactQueryDevtools initialIsOpen={false} />

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
            <Route path="order/:orderId" element={<Orders />} />
            <Route path="restaurants" element={<Restaurant />} />
            <Route path="restaurants/:restaurantId" element={<Menus />} />
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

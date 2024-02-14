import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./style/GlobelCol";

import { Movies } from "./pages/Movies";
import { Genre } from "./pages/Genre";
import { Login } from "./pages/Login";
import { AppLayout } from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoutesHomePage } from "./features/ProtectedRoutes ";
import ProtectedRouterAfterLogIn from "./features/ProtectedRouterAfterLogIn ";
import { Menus } from "./pages/Menus";
import { MenuUpdateProvider } from "./context/MenuUpdateContext";
import { Order } from "./pages/Order";

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
      <GlobalStyles />
      <MenuUpdateProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ProtectedRoutesHomePage>
                <AppLayout />
                // </ProtectedRoutesHomePage>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Menus />} />
              <Route path="menu" element={<Movies />} />
              <Route path="menu/:menuId" element={<Movies />} />
              <Route path="order" element={<Order />} />
              <Route path="genre" element={<Genre />} />
            </Route>
            <Route
              path="login"
              element={
                // <ProtectedRouterAfterLogIn>
                <Login />
                // </ProtectedRouterAfterLogIn>
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
      </MenuUpdateProvider>
    </QueryClientProvider>
  );
}

export default App;

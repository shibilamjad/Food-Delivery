import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';

import { AppLayout } from './ui/AppLayout';
import { ProtectedRoutesHomePage } from './features/ProtectedRoutes ';
import { ProtectedRouterAfterLogIn } from './features/ProtectedRouterAfterLogIn ';
import { Toaster } from 'react-hot-toast';
import { Loader } from './ui/Loader';

const Restaurants = lazy(() => import('./pages/Restaurants'));
const Menus = lazy(() => import('./pages/Menus'));
const NewOrder = lazy(() => import('./pages/NewOrder'));
const Orders = lazy(() => import('./pages/Orders'));
const Carts = lazy(() => import('./pages/Carts'));
const StatusOrder = lazy(() => import('./pages/StatusOrder'));
const Reviews = lazy(() => import('./pages/Reviews'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Error = lazy(() => import('./pages/Error'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
              <Route index element={<Navigate replace to="restaurant" />} />
              <Route path="/restaurant" element={<Restaurants />} />
              <Route path="/restaurant/:restaurantId" element={<Menus />} />
              <Route path="/menu" element={<Menus />} />
              <Route path="/cart" element={<Carts />} />
              <Route path="/new/order" element={<NewOrder />} />
              <Route path="/order" element={<Orders />} />
              <Route path="/status/:orderId" element={<StatusOrder />} />
              <Route path="/review/:orderId" element={<Reviews />} />
            </Route>
            <Route
              path="/sign-up"
              element={
                <ProtectedRouterAfterLogIn>
                  <SignUp />
                </ProtectedRouterAfterLogIn>
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectedRouterAfterLogIn>
                  <SignIn />
                </ProtectedRouterAfterLogIn>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRouterAfterLogIn>
                  <ForgetPassword />
                </ProtectedRouterAfterLogIn>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#272727',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

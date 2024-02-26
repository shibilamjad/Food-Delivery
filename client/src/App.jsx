import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppLayout } from './ui/AppLayout';
import { Menu } from './features/menu/Menu';
import { CreateOrder } from './features/order/CreateOrder';
import { Order } from './features/order/Order';
import { Register } from './features/user/Register';
import { ProtectedRoutesHomePage } from './features/ProtectedRoutes ';
import { Error } from './ui/Error';
import { Cart } from './features/cart/Cart';
import { Toaster } from 'react-hot-toast';
import { SignIn } from './features/user/SignIn';
import { OrderItem } from './features/order/OrderItem';
import { OrderStatusProvider } from './context/OrderStatusContext';
import { Restaurant } from './features/Restaurant/Restaurant';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <OrderStatusProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ProtectedRoutesHomePage>
                <AppLayout />
                // </ProtectedRoutesHomePage>
              }
            >
              <Route index element={<Navigate replace to="restaurant" />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/restaurant/:restaurantId" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/new" element={<CreateOrder />} />
              <Route path="/order" element={<OrderItem />} />
              <Route path="/status/:orderId" element={<Order />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
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
      </OrderStatusProvider>
    </QueryClientProvider>
  );
}

export default App;
